#!/bin/bash

# First-time setup script for environment sync
# This installs GitHub CLI and sets up authentication

set -e

echo "🚀 Setting up GitHub Secrets Sync"
echo ""

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="Linux"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    OS="Windows"
else
    OS="Unknown"
fi

echo "📟 Detected OS: $OS"

# Check if gh is already installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI is already installed"
    gh --version
else
    echo "📦 Installing GitHub CLI..."

    if [[ "$OS" == "macOS" ]]; then
        if command -v brew &> /dev/null; then
            brew install gh
        else
            echo "❌ Homebrew not found. Install from: https://brew.sh/"
            exit 1
        fi
    elif [[ "$OS" == "Linux" ]]; then
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt update
        sudo apt install gh -y
    else
        echo "❌ Please install GitHub CLI manually from: https://cli.github.com/"
        exit 1
    fi
fi

# Check authentication
echo ""
echo "🔐 Checking GitHub authentication..."

if gh auth status &> /dev/null; then
    echo "✅ Already authenticated with GitHub"
else
    echo "🔑 Please authenticate with GitHub..."
    gh auth login
fi

# Check Python
echo ""
echo "🐍 Checking Python..."

if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ $PYTHON_VERSION found"
else
    echo "❌ Python 3 not found. Please install Python 3.6+"
    exit 1
fi

echo ""
echo "============================================================"
echo "✅ Setup Complete!"
echo "============================================================"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Create your environment files:"
echo "   cp .env.example .env.staging"
echo "   cp .env.example .env.production"
echo ""
echo "2. Edit them with real values:"
echo "   nano .env.staging"
echo "   nano .env.production"
echo ""
echo "3. Sync to GitHub:"
echo "   pnpm run sync:env:staging"
echo "   pnpm run sync:env:prod"
echo ""
echo "4. Push code and deploy:"
echo "   git push origin dev     # Deploy to staging"
echo "   git push origin main    # Deploy to production"
echo ""
echo "============================================================"
