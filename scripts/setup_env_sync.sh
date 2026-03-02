#!/bin/bash
set -e

echo "Installing Python dependencies for env sync..."
pip install PyNaCl requests
echo "✓ Dependencies installed"
echo ""
echo "Usage:"
echo "  Export GITHUB_TOKEN first, then run one of:"
echo "  pnpm run sync:env:staging   — sync .env.staging  → GitHub staging environment"
echo "  pnpm run sync:env:prod      — sync .env.production → GitHub production environment"
echo "  pnpm run sync:env:all       — sync both"
