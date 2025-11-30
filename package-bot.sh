#!/bin/bash
# Package the bot for distribution

if [ ! -f "jupiter-arb-bot.sh" ] || [ ! -f "dist/bot.js" ]; then
    echo "❌ Bot files not found. Run ./build.sh first"
    exit 1
fi

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE="jupiter-arb-bot_${TIMESTAMP}.tar.gz"

tar -czf "$ARCHIVE" jupiter-arb-bot.sh dist/

echo "✅ Package created: $ARCHIVE"
echo ""
echo "To distribute:"
echo "  1. Send $ARCHIVE to users"
echo "  2. Users extract: tar -xzf $ARCHIVE"
echo "  3. Users run: ./jupiter-arb-bot.sh"
