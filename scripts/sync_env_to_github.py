#!/usr/bin/env python3
"""
Sync a .env file to GitHub Actions environment secrets.

Usage:
    GITHUB_TOKEN=<token> python3 scripts/sync_env_to_github.py <environment> <env_file>

Example:
    GITHUB_TOKEN=ghp_xxx python3 scripts/sync_env_to_github.py staging .env.staging
    GITHUB_TOKEN=ghp_xxx python3 scripts/sync_env_to_github.py production .env.production

Requires: pip install PyNaCl requests  (or: pnpm run setup:env)
"""

import os
import sys
import subprocess
from base64 import b64encode

import requests
from nacl import encoding, public


def parse_env_file(filepath: str) -> dict[str, str]:
    """Parse a .env file into a key/value dict, skipping comments and blanks."""
    env_vars: dict[str, str] = {}
    with open(filepath) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            key, _, value = line.partition("=")
            env_vars[key.strip()] = value.strip()
    return env_vars


def get_repo() -> tuple[str, str]:
    """Derive owner/repo from the git remote origin URL."""
    remote = subprocess.check_output(
        ["git", "remote", "get-url", "origin"], text=True
    ).strip()
    # SSH:   git@github.com:owner/repo.git
    # HTTPS: https://github.com/owner/repo.git
    if "github.com:" in remote:
        path = remote.split("github.com:")[1]
    else:
        path = remote.split("github.com/")[1]
    owner, repo = path.rstrip(".git").split("/")
    return owner, repo


def get_public_key(token: str, owner: str, repo: str, environment: str) -> dict:
    url = f"https://api.github.com/repos/{owner}/{repo}/environments/{environment}/secrets/public-key"
    r = requests.get(url, headers=_headers(token))
    r.raise_for_status()
    return r.json()


def encrypt_secret(public_key_b64: str, secret_value: str) -> str:
    """Encrypt secret_value with the repo's public key (libsodium sealed box)."""
    key = public.PublicKey(public_key_b64.encode(), encoding.Base64Encoder())
    sealed = public.SealedBox(key)
    encrypted = sealed.encrypt(secret_value.encode())
    return b64encode(encrypted).decode()


def set_secret(
    token: str,
    owner: str,
    repo: str,
    environment: str,
    name: str,
    value: str,
    key_id: str,
    public_key: str,
) -> None:
    url = f"https://api.github.com/repos/{owner}/{repo}/environments/{environment}/secrets/{name}"
    payload = {
        "encrypted_value": encrypt_secret(public_key, value),
        "key_id": key_id,
    }
    r = requests.put(url, json=payload, headers=_headers(token))
    r.raise_for_status()


def _headers(token: str) -> dict:
    return {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: python3 scripts/sync_env_to_github.py <environment> <env_file>")
        sys.exit(1)

    environment = sys.argv[1]
    env_file = sys.argv[2]

    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("Error: GITHUB_TOKEN environment variable is not set")
        sys.exit(1)

    if not os.path.exists(env_file):
        print(f"Error: env file not found: {env_file}")
        sys.exit(1)

    owner, repo = get_repo()
    env_vars = parse_env_file(env_file)
    key_info = get_public_key(token, owner, repo, environment)

    print(f"Syncing {len(env_vars)} secrets → {environment} environment ({owner}/{repo})\n")

    for name, value in env_vars.items():
        set_secret(token, owner, repo, environment, name, value, key_info["key_id"], key_info["key"])
        print(f"  ✓ {name}")

    print(f"\nDone — {len(env_vars)} secrets synced to '{environment}'")


if __name__ == "__main__":
    main()
