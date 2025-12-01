# 🚀 Jupiter Arbitrage Bot

A professional Solana arbitrage trading bot that monitors Jupiter DEX for profitable trading opportunities and executes them automatically.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [How It Works](#-how-it-works)
- [Fee Structure](#-fee-structure)
- [Building from Source](#-building-from-source)
- [Troubleshooting](#-troubleshooting)
- [Safety Tips](#-safety-tips)
- [FAQ](#-faq)

---

## ✨ Features

- 🔍 **Real-time Scanning** - Continuously monitors Jupiter DEX for arbitrage opportunities
- 💰 **Automatic Execution** - Executes profitable trades automatically when found
- 📊 **Detailed Reporting** - Beautiful CLI tables showing all opportunities and results
- 🔐 **Secure** - Your private keys stay local, never transmitted
- ⚡ **Fast** - Optimized for quick execution to catch fleeting opportunities
- 🎨 **Beautiful UI** - Colorful terminal interface with progress indicators
- 📈 **Performance Tracking** - Track profit/loss for every trade
- 🔄 **Continuous Monitoring** - Runs 24/7 with automatic retries on errors

---

## 📦 Prerequisites

Before you begin, ensure you have:

1. **Node.js 16 or higher**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **A Solana Wallet**
   - With some SOL for trading (recommended minimum: 0.5 SOL)
   - Your wallet's private key in base58 format

3. **Solana RPC Access**
   - Free: `https://api.mainnet-beta.solana.com` (rate limited)
   - Paid: [Helius](https://helius.dev/), [QuickNode](https://www.quicknode.com/), or [Alchemy](https://www.alchemy.com/)

4. **Basic Terminal Knowledge**
   - How to run commands
   - How to navigate directories

---

## 🔧 Installation

### Option 1: Pre-built Version (Easiest)

If you received the pre-built bot:

```bash
# 1. Extract the files
unzip jupiter-arb-bot.zip
cd jupiter-arb-bot

# 2. Verify you have both required files
ls -la dist/
# You should see:
#   - bot.js (main executable)
#   - fonts/ (directory with .flf font files)

# 3. Make launcher executable
chmod +x launch.sh

# 4. Run the bot
./launch.sh
```

**⚠️ IMPORTANT:** The bot requires the `dist/fonts/` directory to be present alongside `dist/bot.js`. Do not delete the fonts folder!

### Option 2: Build from Source

If you have the TypeScript source code:

```bash
# 1. Navigate to bot directory
cd jupiter-arb-bot

# 2. Make build script executable
chmod +x build.sh

# 3. Build the bot (this compiles and obfuscates the code)
./build.sh

# 4. Run the bot
./launch.sh
```

---

## ⚙️ Configuration

### First-Time Setup

When you run the bot for the first time, it will guide you through setup:

```bash
./launch.sh
```

You'll be asked for:

1. **RPC URL**
   - Default: `https://api.mainnet-beta.solana.com`
   - Recommended: Use a paid RPC for better performance
   - Examples:
     - Helius: `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY`
     - QuickNode: `https://your-endpoint.solana-mainnet.quiknode.pro/YOUR_TOKEN/`

2. **Private Key** (base58 format)
   - Export from Phantom, Solflare, or your wallet
   - **NEVER share this with anyone!**
   - Example format: `5J7W...` (long string of characters)

3. **Minimum Profit Percentage**
   - Default: `1.0` (1%)
   - Lower values = more opportunities, but smaller profits
   - Higher values = fewer opportunities, but bigger profits
   - Recommended: `0.5` - `2.0`

4. **Trade Amount** (in SOL)
   - Default: `0.1` SOL
   - Start small to test the bot
   - Increase as you gain confidence
   - Remember: larger amounts = larger profits (and losses)

5. **Slippage Tolerance** (basis points)
   - Default: `50` (0.5%)
   - 50 = 0.5%, 100 = 1%, 200 = 2%
   - Higher slippage = more likely to execute but worse prices
   - Lower slippage = better prices but may fail to execute

### Editing Configuration

Your settings are saved in `config.json`. To change them:

**Option 1:** Run the bot and select "⚙️ Reconfigure Settings"

**Option 2:** Edit `config.json` directly:

```json
{
  "rpcUrl": "https://api.mainnet-beta.solana.com",
  "privateKey": "YOUR_PRIVATE_KEY_HERE",
  "minProfitPercentage": 1.0,
  "tradeAmount": 0.1,
  "slippage": 50
}
```

---

## 🎮 Usage

### Main Menu Options

When you run the bot, you'll see:

```
? What would you like to do?
  🚀 Start Arbitrage Bot
  🔍 Scan for Opportunities
  💼 Check Wallet Balance
  ⚙️  Reconfigure Settings
  🚪 Exit
```

#### 1. 🚀 Start Arbitrage Bot

Starts continuous monitoring and automatic trading:

- Scans for opportunities every 30 seconds
- Automatically executes profitable trades
- Shows detailed results for each scan
- Runs until you stop it (Ctrl+C)

**Example Output:**
```
📊 Scanning 11 tokens for arbitrage...

╔═══════════════════════════════════════════════════════════════╗
║ Trade Path          │ Profit/Loss  │ Profit %   │ Status     ║
╠═══════════════════════════════════════════════════════════════╣
║ SOL→USDC→SOL       │ +0.0234 SOL  │ +2.34%     │ ✅ PROFIT  ║
║ SOL→USDT→SOL       │ +0.0156 SOL  │ +1.56%     │ ✅ PROFIT  ║
║ SOL→JUP→SOL        │ -0.0012 SOL  │ -0.12%     │ ❌ LOSS    ║
╚═══════════════════════════════════════════════════════════════╝

💡 Found 2 profitable opportunities!
⚡ Executing best opportunity (#1)...
```

#### 2. 🔍 Scan for Opportunities

Runs a single scan without executing trades:

- Shows all potential arbitrage paths
- Displays profit/loss for each
- Useful for testing or monitoring
- No trades are executed

#### 3. 💼 Check Wallet Balance

Displays your current SOL balance:

```
💰 Wallet Balance: 1.2345 SOL
```

#### 4. ⚙️ Reconfigure Settings

Opens the setup wizard to change your configuration.

#### 5. 🚪 Exit

Stops the bot gracefully.

---

## 🔄 How It Works

### The Arbitrage Process

1. **Scanning Phase**
   - Bot fetches verified tokens from Jupiter
   - Checks SOL pairs with popular tokens (USDC, USDT, JUP, etc.)
   - For each token, it simulates: SOL → Token → SOL

2. **Opportunity Detection**
   - Compares final SOL amount with initial amount
   - If profit > minimum threshold, marks as opportunity
   - Ranks opportunities by profit percentage

3. **Execution Phase**
   - Gets fresh quotes from Jupiter API
   - Executes first swap (SOL → Token)
   - Waits for confirmation
   - Executes second swap (Token → SOL)
   - Waits for confirmation

4. **Fee Payment**
   - Calculates fee (20% of profit OR 0.006 SOL, whichever is higher)
   - Sends fee to developer wallet
   - Shows your net profit

### Example Trade Flow

```
Initial: 0.1 SOL
    ↓
Step 1: Swap 0.1 SOL → 150 USDC
    ↓
Step 2: Swap 150 USDC → 0.102 SOL
    ↓
Profit: 0.002 SOL (2%)
Fee: 0.0006 SOL (20% of profit, but minimum 0.006 applies)
Net: 0.1014 SOL (+0.0014 SOL profit)
```

---

## 💸 Fee Structure

The bot charges a fee on every executed trade to support development:

### Fee Calculation

```
Fee = MAX(20% of profit, 0.006 SOL)
```

- **If you make profit:** 20% of the profit (minimum 0.006 SOL)
- **If you break even or lose:** Fixed 0.006 SOL fee

### Examples

| Trade Result | Profit | Fee Charged | Your Net Result |
|-------------|--------|-------------|-----------------|
| Successful | +0.05 SOL | 0.01 SOL (20%) | +0.04 SOL |
| Successful | +0.01 SOL | 0.006 SOL (minimum) | +0.004 SOL |
| Small profit | +0.002 SOL | 0.006 SOL (minimum) | -0.004 SOL |
| Loss | -0.005 SOL | 0.006 SOL (fixed) | -0.011 SOL |

**Note:** Fees are automatically deducted and sent after each trade completes.

---

## 🛠️ Building from Source

If you want to modify the code or build it yourself:

### Prerequisites

- Node.js 16+
- npm or yarn
- TypeScript source code

### Build Steps

```bash
# 1. Install dependencies
npm install

# 2. Place your TypeScript code in src/bot.ts
mkdir -p src
cp your-bot-code.ts src/bot.ts

# 3. Make build script executable
chmod +x build.sh

# 4. Run build script
./build.sh
```

The build script will:
- ✅ Compile TypeScript to JavaScript
- ✅ Bundle all dependencies into one file
- ✅ Obfuscate the code for protection
- ✅ Output to `dist/bot.js`

### Build Output

```
🔨 Jupiter Arbitrage Bot - Build Script
========================================

✓ Node.js v18.17.0 detected
📦 Installing dependencies...
⚙️  Compiling TypeScript...
✓ TypeScript compiled successfully
📦 Bundling with esbuild...
✓ Bundle created
🔐 Obfuscating code...
✓ Obfuscation complete
🧹 Cleaning up...
✓ Cleanup complete

════════════════════════════════════════
✅ BUILD SUCCESSFUL!
════════════════════════════════════════
📁 Output: dist/bot.js
📊 Size: 2.4M
🔐 Code: Obfuscated & Bundled
```

---

## 🔧 Troubleshooting

### Common Issues

#### "Node.js is required"
**Problem:** Node.js is not installed or not in PATH.

**Solution:**
```bash
# Install Node.js from nodejs.org
# Or using package manager:
# Ubuntu/Debian:
sudo apt install nodejs npm

# macOS:
brew install node

# Verify:
node --version
```

#### "Failed to fetch tokens"
**Problem:** Cannot connect to Jupiter API.

**Solution:**
- Check your internet connection
- Try a different RPC URL
- The bot will use fallback tokens (SOL, USDC, USDT, JUP)

#### "Swap execution error: 429"
**Problem:** Rate limited by RPC endpoint.

**Solution:**
- Use a paid RPC provider (Helius, QuickNode, Alchemy)
- Increase wait time between scans
- Reduce number of tokens being scanned

#### "No profitable opportunities found"
**Problem:** No arbitrage opportunities at current settings.

**Solution:**
- Lower `minProfitPercentage` (try 0.5% or 0.3%)
- Increase `tradeAmount` (larger trades = larger profits)
- Wait for better market conditions
- Market is efficient - real arbitrage is rare!

#### "Insufficient funds"
**Problem:** Not enough SOL in wallet.

**Solution:**
```bash
# Check balance
./launch.sh
# Select: 💼 Check Wallet Balance

# Add more SOL to your wallet
# Minimum recommended: 0.5 SOL
```

#### "Permission denied"
**Problem:** Script is not executable.

**Solution:**
```bash
chmod +x launch.sh
chmod +x build.sh
```

---

## 🛡️ Safety Tips

### Protect Your Private Key

1. **Never share** your private key with anyone
2. **Never commit** config.json to git
3. **Use a dedicated** trading wallet (not your main wallet)
4. **Start small** - test with 0.05-0.1 SOL first
5. **Monitor regularly** - check on the bot periodically

### Risk Management

1. **Start Small**
   - Begin with 0.05-0.1 SOL trades
   - Increase gradually as you gain confidence

2. **Use Dedicated Wallet**
   - Don't use your main wallet
   - Keep only trading funds in bot wallet

3. **Monitor Performance**
   - Check bot logs regularly
   - Track profit/loss over time
   - Stop if consistently losing

4. **Set Realistic Expectations**
   - Real arbitrage is rare and competitive
   - Profits are usually small (0.1-2%)
   - Bots compete with each other
   - Market efficiency means opportunities are fleeting

5. **Understand Fees**
   - 20% developer fee on profits
   - Network transaction fees (usually 0.00001-0.0001 SOL)
   - Slippage costs
   - Total costs can exceed small profits

### Best Practices

```bash
# 1. Test configuration first
./launch.sh
# Select: 🔍 Scan for Opportunities

# 2. Check balance before starting
./launch.sh
# Select: 💼 Check Wallet Balance

# 3. Start monitoring with small amount
# Edit config.json: "tradeAmount": 0.05

# 4. Monitor first few trades closely
./launch.sh
# Select: 🚀 Start Arbitrage Bot
# Watch the output carefully

# 5. Stop with Ctrl+C if issues occur
```

---

## ❓ FAQ

### General Questions

**Q: Is this bot profitable?**
A: Real arbitrage opportunities are rare and competition is fierce. Profits depend on market conditions, your RPC speed, trade size, and luck. Start with small amounts and realistic expectations.

**Q: How much SOL do I need?**
A: Minimum 0.1 SOL for trading + extra for fees. Recommended: 0.5-1 SOL to start.

**Q: Can I run this 24/7?**
A: Yes, the bot is designed for continuous operation. Use a VPS or cloud server for best results.

**Q: Is my private key safe?**
A: Your private key stays on your local machine and is never transmitted anywhere except to sign transactions on the Solana network.

**Q: What's the developer fee?**
A: 20% of profits (minimum 0.006 SOL per trade). This supports ongoing development.

### Technical Questions

**Q: Why do I need a paid RPC?**
A: Free RPCs have rate limits that may cause the bot to miss opportunities or fail trades. Paid RPCs are faster and more reliable.

**Q: Can I modify the code?**
A: The pre-built version is obfuscated for protection. If you have the source code, you can modify and rebuild it.

**Q: How often does it scan?**
A: Every 30 seconds by default. You can modify this in the source code.

**Q: What tokens does it trade?**
A: Popular verified tokens on Jupiter (SOL, USDC, USDT, JUP, and more).

**Q: Why did a trade fail?**
A: Common reasons: slippage, price movement, network congestion, insufficient liquidity, or expired quotes.

### Configuration Questions

**Q: What's a good minProfitPercentage?**
A: Start with 1.0% (1%). Lower it to 0.5% if you want more opportunities, but expect smaller profits.

**Q: What's a good tradeAmount?**
A: Start with 0.05-0.1 SOL. Increase gradually. Larger amounts = larger profits but more risk.

**Q: What slippage should I use?**
A: Default 50 (0.5%) is good. Increase to 100-200 if trades fail often. Lower for better prices.

**Q: Can I use a different RPC?**
A: Yes! Edit config.json or run reconfigure. Recommended: Helius, QuickNode, or Alchemy.

---

## 📞 Support

### Getting Help

1. **Check this README** - Most questions are answered here
2. **Check Troubleshooting** - Common issues and solutions
3. **Review bot output** - Error messages usually explain the problem
4. **Check your config** - Verify all settings are correct

### Reporting Issues

If you encounter a bug:

1. Note the exact error message
2. Check what action triggered it
3. Try with default configuration
4. Contact support with details

---

## 📄 License

MIT License - See LICENSE file for details

---

## ⚠️ Disclaimer

**IMPORTANT:** This bot is provided as-is with no guarantees of profit. Trading cryptocurrencies carries significant risk. You can lose money. The developer is not responsible for any losses incurred while using this bot.

- **Not Financial Advice:** This bot is a tool, not investment advice
- **Your Responsibility:** You are responsible for monitoring and managing the bot
- **No Guarantees:** Past performance doesn't guarantee future results
- **Use at Your Own Risk:** Understand the risks before using

---

## 🎉 Getting Started Checklist

Ready to start? Follow this checklist:

- [ ] Node.js 16+ installed
- [ ] Bot files extracted/built
- [ ] Solana wallet with 0.5+ SOL
- [ ] Private key (base58 format) ready
- [ ] RPC URL configured (paid recommended)
- [ ] `launch.sh` made executable (`chmod +x launch.sh`)
- [ ] Configuration completed
- [ ] Test scan performed
- [ ] Wallet balance checked
- [ ] Started with small trade amount (0.05-0.1 SOL)
- [ ] Monitoring first few trades

---

**Happy Trading! 🚀**

*Remember: Start small, monitor closely, and manage your risk.*
