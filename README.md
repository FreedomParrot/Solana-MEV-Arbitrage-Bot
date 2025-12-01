# 🚀 Jupiter Arbitrage Bot

**Automated Solana arbitrage trading bot using Jupiter DEX aggregator**

Find and execute profitable arbitrage opportunities automatically on Solana.

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Configuration Guide](#-configuration-guide)
- [How to Use](#-how-to-use)
- [Understanding Arbitrage](#-understanding-arbitrage)
- [Fee Structure](#-fee-structure)
- [Troubleshooting](#-troubleshooting)
- [Safety & Best Practices](#-safety--best-practices)
- [FAQ](#-faq)
- [Disclaimer](#-disclaimer)

---

## 📦 Prerequisites

### Required

1. **Node.js 16 or higher**
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Solana Wallet**
   - Minimum balance: **0.5 SOL** (0.1 for trading + buffer for fees)
   - Supported wallets: Phantom, Solflare, Sollet, or any Solana wallet

3. **Private Key (Base58 format)**
   - Export from your wallet
   - **⚠️ CRITICAL: Never share this with anyone!**

### Recommended

- **Paid RPC endpoint** for better performance (optional but highly recommended)
  - [Helius](https://helius.dev/) - Free tier available
  - [QuickNode](https://www.quicknode.com/) - Free trial available
  - [Alchemy](https://www.alchemy.com/) - Free tier available

---

## ⚡ Quick Start

### Step 1: Download the Bot

```bash
# Clone the repository
git clone https://github.com/FreedomParrot/Solana-MEV-Arbitrage-bot.git
cd jupiter-arbitrage-bot

# OR download as ZIP and extract
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Bot

```bash
chmod +x bot.sh
./bot.sh
```

**Alternative methods:**
```bash
# If bot.sh doesn't work, try:
node dist/bot.js

# Or compile TypeScript first:
npx tsc
node dist/bot.js
```

### Step 4: Complete Setup Wizard

On first run, you'll be guided through configuration:

1. **RPC URL**: Your Solana network endpoint
2. **Private Key**: Your wallet's private key (base58)
3. **Min Profit %**: Minimum profit threshold (e.g., 1.0%)
4. **Trade Amount**: SOL amount per trade (e.g., 0.1)
5. **Slippage**: Maximum acceptable slippage (e.g., 50 = 0.5%)

---

## ⚙️ Configuration Guide

### Initial Setup Questions

#### 1. Solana RPC URL

**What it is:** The network endpoint your bot uses to communicate with Solana blockchain.

**Options:**
```
Free (slower):
https://api.mainnet-beta.solana.com

Paid (recommended):
https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
https://your-endpoint.solana-mainnet.quiknode.pro/YOUR_TOKEN/
```

**Recommendation:** Start with free RPC for testing. Upgrade to paid for serious trading.

---

#### 2. Private Key (Base58)

**How to get it:**

**From Phantom Wallet:**
1. Open Phantom
2. Settings → Security & Privacy
3. Export Private Key
4. Enter password
5. Copy the key (starts with numbers/letters)

**From Solflare:**
1. Open Solflare
2. Settings → Export Private Key
3. Copy the base58 key

**Format example:** `5Jq7W8kF9...` (long string of characters)

**⚠️ SECURITY:**
- Never share this key
- Never post it online
- Use a dedicated trading wallet
- Keep only trading funds in this wallet

---

#### 3. Minimum Profit Percentage

**What it is:** The bot only executes trades with profit above this threshold.

**Examples:**
- `0.3` = 0.3% minimum profit (more trades, smaller gains)
- `1.0` = 1.0% minimum profit (fewer trades, medium gains)
- `2.0` = 2.0% minimum profit (rare trades, larger gains)

**Recommendation:**
- Beginners: `1.0` - `2.0`
- Advanced: `0.5` - `1.0`
- Testing: `0.3`

**Note:** Lower values = more opportunities but fees may eat profits.

---

#### 4. Trade Amount (SOL)

**What it is:** How much SOL to use per arbitrage cycle.

**Examples:**
- `0.05` SOL = Very safe testing amount
- `0.1` SOL = Good starting amount
- `0.5` SOL = Medium risk/reward
- `1.0+` SOL = Higher profits but more risk

**Recommendation:**
- First time: `0.05` - `0.1` SOL
- After testing: Increase gradually
- Never risk more than you can afford to lose

**Math:**
```
Trade Amount: 0.1 SOL
Profit: 2%
Gross Profit: 0.002 SOL
Fee (20%): 0.0004 SOL
Net Profit: 0.0016 SOL
```

---

#### 5. Slippage Tolerance

**What it is:** Maximum acceptable price change during execution (in basis points).

**Conversion:**
- `50` = 0.5% slippage
- `100` = 1.0% slippage
- `200` = 2.0% slippage

**Examples:**
- Low volatility: `50` (0.5%)
- Normal: `100` (1.0%)
- High volatility: `150` - `200` (1.5% - 2.0%)

**Recommendation:**
- Start with: `50` - `100`
- If trades fail often: Increase to `150` - `200`
- Lower = better prices but may fail
- Higher = more likely to execute but worse prices

---

### Editing Configuration Later

Your settings are saved in `config.json`:

```json
{
  "rpcUrl": "https://api.mainnet-beta.solana.com",
  "privateKey": "YOUR_PRIVATE_KEY_HERE",
  "minProfitPercentage": 1.0,
  "tradeAmount": 0.1,
  "slippage": 50
}
```

**To change settings:**
1. Run the bot and select "⚙️ Reconfigure Settings"
2. OR edit `config.json` directly and restart

---

## 🎮 How to Use

### Main Menu

After setup, you'll see:

```
? What would you like to do?
❯ 🚀 Start Arbitrage Bot
  🔍 Scan for Opportunities
  💼 Check Wallet Balance
  ⚙️  Reconfigure Settings
  🚪 Exit
```

---

### 🚀 Start Arbitrage Bot

**What it does:**
- Continuously scans for arbitrage opportunities
- Automatically executes profitable trades
- Runs until you stop it (Ctrl+C)

**Example output:**
```
📊 Scanning 11 tokens for arbitrage...

╔═══════════════════════════════════════════════════════╗
║ Trade Path       │ Profit/Loss  │ Profit %  │ Status ║
╠═══════════════════════════════════════════════════════╣
║ SOL→USDC→SOL    │ +0.0023 SOL  │ +2.30%    │ ✅ PROFIT ║
║ SOL→USDT→SOL    │ +0.0015 SOL  │ +1.50%    │ ✅ PROFIT ║
║ SOL→JUP→SOL     │ -0.0008 SOL  │ -0.80%    │ ❌ LOSS   ║
╚═══════════════════════════════════════════════════════╝

💡 Found 2 profitable opportunities!
⚡ Executing best opportunity (#1)...

Step 1/2: Swapping SOL → USDC
✓ Swap 1/2 complete

Step 2/2: Swapping USDC → SOL
✓ Swap 2/2 complete

💰 Fee sent: 0.0006 SOL
🎉 ARBITRAGE COMPLETE!
💰 Your Net Profit: +0.0017 SOL

⏳ Waiting 30s before next scan...
```

**How to stop:**
- Press `Ctrl + C`
- Bot will shut down gracefully

---

### 🔍 Scan for Opportunities

**What it does:**
- Scans once for arbitrage opportunities
- Shows all potential trades
- **Does NOT execute any trades**

**Use this for:**
- Testing your configuration
- Checking market conditions
- Seeing opportunities without trading

**Example output:**
```
📊 Scanning 11 tokens for arbitrage...

Found 3 opportunities:
╔════════════════════════════════════════════════╗
║ Token A │ Token B │ Profit      │ Profit %  ║
╠════════════════════════════════════════════════╣
║ SOL     │ USDC    │ 0.0025 SOL  │ 2.50%     ║
║ SOL     │ USDT    │ 0.0018 SOL  │ 1.80%     ║
║ SOL     │ JUP     │ 0.0012 SOL  │ 1.20%     ║
╚════════════════════════════════════════════════╝
```

---

### 💼 Check Wallet Balance

**What it does:**
- Shows your current SOL balance
- Helps you monitor funds

**Example output:**
```
💰 Wallet Balance: 1.2345 SOL
```

---

### ⚙️ Reconfigure Settings

**What it does:**
- Opens the setup wizard again
- Lets you change any settings
- Saves new configuration

---

## 📊 Understanding Arbitrage

### What is Arbitrage?

**Arbitrage** is buying and selling the same asset on different markets to profit from price differences.

**Example:**
```
1. You have: 1 SOL
2. Trade 1 SOL → 150 USDC (on DEX A)
3. Trade 150 USDC → 1.02 SOL (on DEX B)
4. Profit: 0.02 SOL (2%)
```

### How This Bot Works

```
┌─────────────────────────────────────────┐
│ 1. SCAN PHASE                           │
│    - Check SOL pairs (SOL/USDC, etc.)   │
│    - Calculate potential profit         │
│    - Find best opportunity              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 2. EXECUTION PHASE (if profitable)      │
│    - Get fresh quotes                   │
│    - Execute Swap 1: SOL → Token        │
│    - Execute Swap 2: Token → SOL        │
│    - Calculate actual profit            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 3. FEE PAYMENT                          │
│    - Calculate fee (20% or min 0.006)   │
│    - Send fee to developer              │
│    - Show your net profit               │
└─────────────────────────────────────────┘
```

### Why Opportunities are Rare

1. **Market Efficiency**: Prices quickly align across markets
2. **Competition**: Many bots compete for the same opportunities
3. **Network Speed**: Fastest bots get the trades
4. **Fees**: Transaction fees eat small profits
5. **Slippage**: Prices change during execution

**Reality Check:**
- Real arbitrage is RARE
- Most scans find 0 opportunities
- Profits are usually 0.1% - 2%
- You may lose money
- This is NOT easy money

---

## 💰 Fee Structure

### How Fees Work

**Every executed trade charges a fee:**

```
Fee = MAX(20% of profit, 0.006 SOL)
```

**Translation:**
- If you make profit: Pay 20% of profit (minimum 0.006 SOL)
- If you lose or break even: Pay fixed 0.006 SOL

---

### Fee Examples

#### Example 1: Good Profit
```
Trade Amount: 0.5 SOL
Final Amount: 0.51 SOL
Gross Profit: 0.01 SOL (2%)

Fee Calculation:
20% of 0.01 = 0.002 SOL
Minimum fee = 0.006 SOL
Charged: 0.006 SOL (minimum applies)

Your Net: 0.004 SOL profit
```

#### Example 2: Large Profit
```
Trade Amount: 1.0 SOL
Final Amount: 1.05 SOL
Gross Profit: 0.05 SOL (5%)

Fee Calculation:
20% of 0.05 = 0.01 SOL
Minimum fee = 0.006 SOL
Charged: 0.01 SOL (20% is higher)

Your Net: 0.04 SOL profit
```

#### Example 3: Small Profit
```
Trade Amount: 0.1 SOL
Final Amount: 0.102 SOL
Gross Profit: 0.002 SOL (2%)

Fee Calculation:
20% of 0.002 = 0.0004 SOL
Minimum fee = 0.006 SOL
Charged: 0.006 SOL (minimum applies)

Your Net: -0.004 SOL (NET LOSS!)
```

#### Example 4: Loss
```
Trade Amount: 0.1 SOL
Final Amount: 0.095 SOL
Gross Profit: -0.005 SOL (loss)

Fee Calculation:
No profit, so minimum applies
Charged: 0.006 SOL

Your Net: -0.011 SOL (loss + fee)
```

---

### Fee Summary Table

| Gross Profit | Fee (20%) | Minimum Fee | Actual Fee | Your Net |
|--------------|-----------|-------------|------------|----------|
| 0.05 SOL     | 0.01 SOL  | 0.006 SOL   | 0.01 SOL   | +0.04 SOL |
| 0.02 SOL     | 0.004 SOL | 0.006 SOL   | 0.006 SOL  | +0.014 SOL |
| 0.01 SOL     | 0.002 SOL | 0.006 SOL   | 0.006 SOL  | +0.004 SOL |
| 0.005 SOL    | 0.001 SOL | 0.006 SOL   | 0.006 SOL  | -0.001 SOL |
| 0.002 SOL    | 0.0004 SOL| 0.006 SOL   | 0.006 SOL  | -0.004 SOL |
| -0.005 SOL   | N/A       | 0.006 SOL   | 0.006 SOL  | -0.011 SOL |

**Key Insight:** Small profits can turn into net losses after the minimum fee!

---

## 🔧 Troubleshooting

### Installation Issues

#### "Node.js is required"
**Problem:** Node.js not installed or not in PATH

**Solution:**
```bash
# Check if Node.js is installed
node --version

# If not found, install from:
# https://nodejs.org/

# Verify installation
node --version
npm --version
```

#### "npm: command not found"
**Problem:** npm not installed

**Solution:**
```bash
# npm comes with Node.js
# Reinstall Node.js from nodejs.org

# On Linux/Mac, you can also:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### "Cannot find module 'axios'"
**Problem:** Dependencies not installed

**Solution:**
```bash
# Install dependencies
npm install

# If that fails, delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Configuration Issues

#### "Please enter a valid URL"
**Problem:** Invalid RPC URL format

**Solution:**
```bash
# RPC URL must start with http:// or https://

✅ Correct:
https://api.mainnet-beta.solana.com
https://mainnet.helius-rpc.com/?api-key=xyz

❌ Wrong:
api.mainnet-beta.solana.com
mainnet-beta.solana.com
```

#### "Private key is required"
**Problem:** Empty or invalid private key

**Solution:**
```bash
# Make sure you have the BASE58 private key
# It should be a long string like:
# 5J7W8kF9dD2hS...

# NOT the seed phrase (12-24 words)
# NOT the public key
```

---

### Runtime Issues

#### "No profitable opportunities found"
**Problem:** No arbitrage available at current settings

**Solution:**
```bash
# Try lowering minimum profit
# Edit config.json:
"minProfitPercentage": 0.3  # Instead of 1.0

# Or increase trade amount
"tradeAmount": 0.5  # Instead of 0.1

# Or wait - market conditions matter!
```

#### "Swap execution error: 429"
**Problem:** Rate limited by RPC endpoint

**Solution:**
```bash
# Use a paid RPC provider

# Free tier providers:
Helius: https://helius.dev/
QuickNode: https://quicknode.com/
Alchemy: https://alchemy.com/

# Update config.json with new RPC URL
```

#### "Swap execution failed"
**Problem:** Transaction failed on-chain

**Common causes:**
1. **Slippage too low** → Increase slippage to 100-200
2. **Price moved** → Normal, bot will retry
3. **Network congestion** → Wait and try again
4. **Insufficient funds** → Add more SOL

**Solution:**
```bash
# Increase slippage in config.json
"slippage": 150  # Instead of 50

# Check wallet balance
./bot.sh
# Select: Check Wallet Balance
```

#### "Insufficient funds"
**Problem:** Not enough SOL in wallet

**Solution:**
```bash
# Check balance
./bot.sh → Check Wallet Balance

# Add more SOL to your wallet
# Minimum: 0.5 SOL recommended
```

---

### Performance Issues

#### "Bot is too slow"
**Problem:** Free RPC endpoint is slow

**Solution:**
```bash
# Upgrade to paid RPC:

1. Sign up: https://helius.dev/ (free tier)
2. Get your API key
3. Update config.json:
   "rpcUrl": "https://mainnet.helius-rpc.com/?api-key=YOUR_KEY"
4. Restart bot
```

#### "Trades keep failing"
**Problem:** Slow execution / high competition

**Reality:**
- Arbitrage is competitive
- Faster bots win
- Most opportunities disappear in milliseconds
- This is normal

**Improve chances:**
1. Use fastest RPC (paid)
2. Run on VPS near Solana validators
3. Lower minimum profit threshold
4. Increase slippage tolerance

---

## 🛡️ Safety & Best Practices

### 🔐 Security

#### Protect Your Private Key

```bash
✅ DO:
- Use a dedicated trading wallet
- Keep only trading funds in it
- Store private key securely
- Never share it with anyone
- Never commit to git

❌ DON'T:
- Use your main wallet
- Store in cloud/email
- Share screenshots with key
- Post in Discord/Telegram
- Hard-code in public repos
```

#### Add to .gitignore

```bash
# Create .gitignore
cat > .gitignore << EOF
config.json
node_modules/
.env
*.log
EOF
```

---

### 💡 Risk Management

#### Start Small

```bash
Week 1: Trade 0.05 SOL
Week 2: Trade 0.1 SOL (if profitable)
Week 3: Trade 0.2 SOL (if still profitable)
Month 2: Increase gradually

Never risk more than you can afford to lose!
```

#### Monitor Regularly

```bash
# Check bot every few hours
# Track total profit/loss
# Stop if consistent losses
# Adjust settings based on results
```

#### Set Realistic Expectations

```
✅ Realistic:
- Small profits (0.1% - 2%)
- Rare opportunities
- Some losing trades
- Breaking even
- Learning experience

❌ Unrealistic:
- Get rich quick
- 100% profit rate
- Guaranteed income
- No losses
- Easy money
```

---

### 📊 Best Practices

#### Configuration Tips

```json
{
  "Beginners": {
    "minProfitPercentage": 1.5,
    "tradeAmount": 0.05,
    "slippage": 100
  },
  "Intermediate": {
    "minProfitPercentage": 1.0,
    "tradeAmount": 0.2,
    "slippage": 75
  },
  "Advanced": {
    "minProfitPercentage": 0.5,
    "tradeAmount": 0.5,
    "slippage": 50
  }
}
```

#### When to Stop

```bash
Stop the bot if:
❌ Consistent losses (3+ trades)
❌ Wallet balance decreasing
❌ No opportunities for hours
❌ Unexpected errors
❌ You don't understand what it's doing

Restart after:
✅ Reviewing settings
✅ Checking market conditions
✅ Understanding the losses
✅ Adjusting configuration
```

---

## ❓ FAQ

### General Questions

**Q: Can I really make money with this?**
A: Maybe. Arbitrage is competitive and rare. Some days you might make small profits, other days you'll lose. This is NOT guaranteed income. Start small and test.

**Q: How much can I make per day?**
A: Realistically: $0 - $5 per day with 0.1 SOL trades. Some days zero. Real arbitrage is rare and competitive. Don't expect riches.

**Q: Is this a scam?**
A: No. This is open-source software. You can review the code. But it's also not magic - arbitrage is hard and you can lose money.

**Q: Do I need to watch it all the time?**
A: No, but check every few hours. Stop it if you see consistent losses.

**Q: Can I run multiple instances?**
A: Yes, but use different wallets. Running multiple instances with one wallet may cause conflicts.

---

### Technical Questions

**Q: Why do I need a paid RPC?**
A: Free RPCs are slow and rate-limited. In arbitrage, speed matters. Paid RPCs are faster and more reliable, giving you better chances.

**Q: Which RPC provider is best?**
A: For beginners: Helius (free tier). For serious use: QuickNode or Alchemy. Try free tiers first.

**Q: Can I use this on testnet/devnet?**
A: Code is for mainnet only. Testnet has no real arbitrage opportunities.

**Q: How often does it scan?**
A: Every 30 seconds by default. You can modify this in the code.

**Q: What tokens does it trade?**
A: Top verified tokens on Jupiter (SOL, USDC, USDT, JUP, and more). It fetches the list automatically.

**Q: Can I add more tokens?**
A: Yes, modify the code to include more tokens. But more tokens = slower scans.

---

### Trading Questions

**Q: Why am I not finding any opportunities?**
A: This is normal. Real arbitrage is rare. Try:
- Lower `minProfitPercentage` to 0.3
- Use better RPC endpoint
- Increase trade amount
- Wait for volatile markets

**Q: Why do trades keep failing?**
A: Common reasons:
- Slippage too low (increase it)
- Price moved (normal, will retry)
- Network congestion (use better RPC)
- Competition (other bots were faster)

**Q: Why did I lose money on a "profitable" trade?**
A: Slippage! The price shown during scan can change during execution. This is normal in volatile markets.

**Q: What's a good minimum profit percentage?**
A: Start with 1.0-1.5%. Lower it if you're not finding opportunities. But remember: very low values may result in net losses after fees.

**Q: Should I increase my trade amount?**
A: Only if:
✅ You've tested thoroughly
✅ You're seeing consistent profits
✅ You can afford to lose it
❌ Don't increase hoping for quick gains

---

### Safety Questions

**Q: Is my private key safe?**
A: Yes, it stays on your computer. It's only used to sign transactions. But YOU must keep it safe - don't share it.

**Q: Can the developer steal my funds?**
A: No. The code is open-source and you can review it. The only automatic transaction is the fee payment after successful trades.

**Q: What if I lose money?**
A: This is possible and expected. Only trade what you can afford to lose. The bot has no guarantees.

**Q: Can I get my fee back if I lose money?**
A: No. Fees are charged on all executed trades, win or lose. This supports development.

---

## ⚠️ DISCLAIMER

### Important Legal Information

**READ THIS CAREFULLY BEFORE USING THE BOT**

1. **No Guarantees**: This software is provided "as-is" with absolutely no guarantees of profit or performance.

2. **Risk of Loss**: Trading cryptocurrencies is extremely risky. You can lose all your money. Only trade what you can afford to lose completely.

3. **Not Financial Advice**: This bot is a tool, not investment advice. The developers are not financial advisors.

4. **Your Responsibility**: You are solely responsible for:
   - Monitoring the bot
   - Understanding how it works
   - Managing your risk
   - All trading decisions
   - Any losses incurred

5. **No Liability**: The developers are not responsible for:
   - Trading losses
   - Technical issues
   - Network problems
   - Bugs or errors
   - Any damages whatsoever

6. **Fees are Non-Refundable**: All fees charged by the bot are final and non-refundable.

7. **Compliance**: You are responsible for complying with all laws and regulations in your jurisdiction.

8. **Testing Required**: Always test with small amounts first. Never risk more than you can afford to lose.

9. **Market Risks**: Cryptocurrency markets are volatile, unpredictable, and subject to manipulation.

10. **No Support Guarantee**: Community support is provided best-effort. No response time is guaranteed.

### By Using This Bot, You Acknowledge

- ✅ You understand the risks
- ✅ You can afford to lose your trading capital
- ✅ You are responsible for all outcomes
- ✅ You will not hold developers liable for losses
- ✅ You have read and understood this disclaimer

---

## 📞 Support & Community

### Getting Help

1. **Read this README** - Most questions are answered here
2. **Check Troubleshooting** - Common issues and solutions
3. **Review the code** - It's open source
4. **GitHub Issues** - Report bugs or request features

### Reporting Bugs

When reporting issues, include:
- Error message (full text)
- Your Node.js version (`node --version`)
- Operating system
- Steps to reproduce
- Config settings (WITHOUT private key!)

### Contributing

Contributions welcome! Please:
- Fork the repository
- Create a feature branch
- Test thoroughly
- Submit a pull request

---

## 📜 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- Jupiter Aggregator for DEX integration
- Solana ecosystem
- Open source community

---

## 🎉 Final Checklist

Before you start trading, verify:

- [ ] Node.js 16+ installed (`node --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] Bot runs without errors (`./bot.sh`)
- [ ] Have at least 0.5 SOL in wallet
- [ ] Using dedicated trading wallet (not main)
- [ ] Private key secured safely
- [ ] Configuration tested with scan
- [ ] Started with small trade amount (0.05-0.1 SOL)
- [ ] Understand fee structure (20% or 0.006 SOL minimum)
- [ ] Know how to stop the bot (Ctrl+C)
- [ ] Read and understood ALL warnings
- [ ] Understand you can lose money
- [ ] Can afford to lose your trading capital
- [ ] Have realistic expectations

---

**Good luck, and trade responsibly! 🚀**

*Remember: This is a tool, not a money printer. Start small, learn, and never risk more than you can afford to lose.*

---

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Status:** Active Development
