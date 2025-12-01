#!/bin/bash
# Jupiter Arbitrage Bot

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 16+ required: https://nodejs.org/"
    exit 1
fi

# Get script directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if node_modules exists
if [ ! -d "$DIR/node_modules" ]; then
    echo "📦 Installing dependencies..."
    cd "$DIR"
    npm install --silent
fi

# Run the bot
cd "$DIR"
exec node dist/bot.js "$@"
