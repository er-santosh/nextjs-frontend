#!/usr/bin/env python3
"""
Sync environment variables from .env file to GitHub Secrets
Usage: python3 scripts/sync_env_to_github.py staging .env.staging
"""

import sys
import os
import subprocess
from pathlib import Path

def parse_env_file(file_path):
    """Parse .env file and return dict of variables"""
    env_vars = {}

    with open(file_path, 'r') as f:
        for line in f:
            line = line.strip()

            # Skip empty lines and comments
            if not line or line.startswith('#'):
                continue

            # Split on first = only
            if '=' in line:
                key, value = line.split('=', 1)
                key = key.strip()
                value = value.strip()

                # Remove quotes
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                elif value.startswith("'") and value.endswith("'"):
                    value = value[1:-1]

                env_vars[key] = value

    return env_vars

def set_github_secret(repo, environment, key, value):
    """Set a secret in GitHub using gh CLI"""
    try:
        subprocess.run(
            ['gh', 'secret', 'set', key,
             '--repo', repo,
             '--env', environment,
             '--body', value],
            check=True,
            capture_output=True,
            text=True
        )
        return True
    except subprocess.CalledProcessError as e:
        print(f"   ⚠️  Error: {e.stderr}")
        return False

def main():
    if len(sys.argv) != 3:
        print("Usage: python3 sync_env_to_github.py <environment> <env-file-path>")
        print("Example: python3 sync_env_to_github.py staging .env.staging")
        sys.exit(1)

    environment = sys.argv[1]
    env_file = sys.argv[2]
    repo = subprocess.run(['gh', 'repo', 'view', '--json', 'nameWithOwner', '-q', '.nameWithOwner'], check=True, capture_output=True, text=True).stdout.strip()

    if not Path(env_file).exists():
        print(f"Error: File {env_file} not found")
        sys.exit(1)

    # Check if gh CLI is installed
    try:
        subprocess.run(['gh', '--version'], check=True, capture_output=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Error: GitHub CLI (gh) not found")
        print("Install it from: https://cli.github.com/")
        sys.exit(1)

    print(f"🔐 Syncing environment variables from {env_file}")
    print(f"📦 Repository: {repo}")
    print(f"🌍 Environment: {environment}")
    print()

    env_vars = parse_env_file(env_file)

    success_count = 0
    failed_count = 0

    for key, value in env_vars.items():
        print(f"📤 Setting: {key}", end=" ... ")
        if set_github_secret(repo, environment, key, value):
            print("✅")
            success_count += 1
        else:
            print("❌")
            failed_count += 1

    print()
    print(f"✅ Successfully set: {success_count}")
    if failed_count > 0:
        print(f"❌ Failed: {failed_count}")
    print(f"🔗 View at: https://github.com/{repo}/settings/environments")

if __name__ == "__main__":
    main()
