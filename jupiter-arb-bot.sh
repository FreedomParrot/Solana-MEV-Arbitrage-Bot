#!/bin/bash
# Jupiter Arbitrage Bot - Self-Executing Script

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Install from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js 16+ required. Current: $(node -v)"
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if bot.js exists in dist folder
if [ ! -f "$SCRIPT_DIR/dist/bot.js" ]; then
    echo "❌ Error: dist/bot.js not found"
    echo "Please ensure you have the complete bot package"
    exit 1
fi

TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT
cd "$TEMP_DIR"

echo "📦 Installing dependencies..."
npm install --silent --no-save \
    @solana/web3.js \
    axios \
    bs58 \
    chalk \
    inquirer \
    ora \
    cli-table3 \
    figlet \
    gradient-string > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "⚠️  Some dependencies failed to install, trying to continue..."
fi

echo ""

# Run the bot from its original location
cd "$SCRIPT_DIR"
node dist/bot.js "$@"
EXIT_CODE=$?
exit $EXIT_CODE
