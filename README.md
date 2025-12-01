# 🚀 Solana Arbitrage Bot - User Guide

## 📋 Table of Contents
- [What is This Bot?](#what-is-this-bot)
- [System Requirements](#system-requirements)
- [Quick Start Guide](#quick-start-guide)
- [Configuration](#configuration)
- [Using the Bot](#using-the-bot)
- [Understanding Results](#understanding-results)
- [Fees & Payments](#fees--payments)
- [Troubleshooting](#troubleshooting)
- [Important Warnings](#important-warnings)
- [FAQ](#faq)

---

## 🤖 What is This Bot?

The **Solana Arbitrage Bot** automatically finds and executes profitable trading opportunities on the Solana blockchain using Jupiter Exchange. It:

- ✅ Scans for price differences between token pairs every **60 seconds**
- ✅ Automatically executes profitable trades when found
- ✅ Shows detailed reports of all opportunities
- ✅ Manages your wallet and transactions safely
- ✅ Pays a 10% developer fee on profits

**How Arbitrage Works:**
1. Bot buys Token B with SOL at a low price
2. Bot sells Token B back to SOL at a higher price
3. You profit from the price difference (minus fees)

---

## 💻 System Requirements

### Minimum Requirements:
- **Operating System:** Linux (Ubuntu, Debian, etc.) or macOS
- **Node.js:** Version 18 or higher
- **RAM:** 2GB minimum
- **Internet:** Stable connection required
- **Solana Wallet:** With SOL balance for trading

### Recommended:
- **Node.js:** Version 20+
- **RAM:** 4GB+
- **SOL Balance:** At least 0.5 SOL (for trading + fees)

### Check Your Node.js Version:
```bash
node --version
```

If you need to install/upgrade Node.js:
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

---

## 🚀 Quick Start Guide

### Step 1: Download the Bot
You should have received a file named `arb-bot` (Linux/Mac) or `arb-bot.exe` (Windows)

### Step 2: Make it Executable (Linux/Mac only)
```bash
chmod +x arb-bot
```

### Step 3: Run the Bot
```bash
./arb-bot
```

### Step 4: First Time Setup Wizard
On first run, you'll be asked to configure:

1. **RPC URL** - Your Solana node connection
   - Default: `https://api.mainnet-beta.solana.com` (Free, but slow)
   - Recommended: Get a paid RPC from [Helius](https://helius.dev) or [QuickNode](https://quicknode.com)

2. **Private Key** - Your wallet's private key (base58 format)
   - ⚠️ **NEVER SHARE THIS WITH ANYONE!**
   - Get from Phantom: Settings → Show Private Key
   - Get from Solflare: Settings → Export Private Key

3. **Minimum Profit Percentage** - Smallest profit to execute
   - Default: `1.0` (1%)
   - Lower = more trades, but smaller profits
   - Higher = fewer trades, but bigger profits

4. **Trade Amount** - How much SOL per trade
   - Default: `0.1` SOL
   - Start small to test!
   - ⚠️ You need 2-3x this amount in wallet for fees

5. **Slippage Tolerance** - Price movement tolerance
   - Default: `50` (0.5%)
   - Higher = more likely to execute, but less profit
   - Lower = more likely to fail, but more profit

---

## ⚙️ Configuration

### Understanding Settings:

| Setting | What it Does | Recommended Value |
|---------|--------------|-------------------|
| **RPC URL** | Connection to Solana network | Paid RPC (Helius/QuickNode) |
| **Min Profit %** | Minimum profit to trade | 0.5% - 2.0% |
| **Trade Amount** | SOL per arbitrage | 0.05 - 0.5 SOL |
| **Slippage** | Max price change allowed | 50-100 (0.5%-1.0%) |

### Configuration File Location:
Your settings are saved in: `config.json` (in the same folder as the bot)

### Changing Settings:
1. Run the bot: `./arb-bot`
2. Choose: `⚙️ Reconfigure Settings`
3. Enter new values

---

## 📊 Using the Bot

### Main Menu Options:

1. **🚀 Start Arbitrage Bot**
   - Begins automatic scanning and trading
   - Scans every 60 seconds
   - Press `Ctrl+C` to stop safely

2. **🔍 Scan for Opportunities**
   - One-time scan (no trading)
   - Shows current profitable opportunities
   - Good for testing settings

3. **💼 Check Wallet Balance**
   - Shows your current SOL balance
   - Helps monitor profits

4. **⚙️ Reconfigure Settings**
   - Change bot parameters
   - No restart needed

5. **🚪 Exit**
   - Safely close the bot

### Running the Bot:

```bash
./arb-bot
```

Choose option 1: `🚀 Start Arbitrage Bot`

You'll see:
```
🔍 Scan #1 - 2024-01-15 10:30:45
================================================================================

📊 Scanning 50 tokens for arbitrage...

⏳ Progress: 50/50 pairs (100%) - Checking SOL↔USDC...

📈 Detailed Scan Results:
[Table showing all trades checked]

💡 Found 3 profitable opportunities!

⚡ Executing best opportunity (#1)...
```

---

## 📈 Understanding Results

### Scan Results Table:

```
┌──────────────────┬──────────────────┬──────────────────┬──────────────┬────────────────┬────────────┬────────────┐
│ Trade Path       │ Buy Price        │ Sell Price       │ Final Amount │ Profit/Loss    │ Profit %   │ Status     │
├──────────────────┼──────────────────┼──────────────────┼──────────────┼────────────────┼────────────┼────────────┤
│ SOL→USDC→SOL     │ 102.456 USDC     │ 0.1025 SOL       │ 0.1025 SOL   │ +0.0025 SOL    │ +2.5%      │ ✅ PROFIT  │
│ SOL→JUP→SOL      │ 45.678 JUP       │ 0.0995 SOL       │ 0.0995 SOL   │ -0.0005 SOL    │ -0.5%      │ ❌ LOSS    │
└──────────────────┴──────────────────┴──────────────────┴──────────────┴────────────────┴────────────┴────────────┘
```

### Status Meanings:

- **✅ PROFIT** - Meets your minimum profit threshold, will be executed
- **⚠️ Low Gain** - Profitable but below minimum threshold
- **❌ LOSS** - Would lose money, skipped
- **❌ Failed** - No trading route available

### When a Trade Executes:

```
⚡ Executing best opportunity (#1)...

┌────────────────────┬─────────────────────────────────────┐
│ Step               │ Details                             │
├────────────────────┼─────────────────────────────────────┤
│ Trade Path         │ SOL → USDC → SOL                    │
│ Initial Amount     │ 0.1 SOL                             │
│ Expected Profit    │ +0.0025 SOL (2.5%)                  │
│ Developer Fee      │ 0.00025 SOL (10%)                   │
│ Net Profit         │ +0.00225 SOL                        │
└────────────────────┴─────────────────────────────────────┘

✓ Swap 1/2 complete: ABC123...
✓ Swap 2/2 complete: DEF456...

🎉 ARBITRAGE COMPLETE!
💰 Your Net Profit: 0.00225 SOL
```

---

## 💰 Fees & Payments

### Fee Structure:

1. **Developer Fee: 10%** of your profit
   - Automatically sent after successful trades
   - Only charged on profitable trades
   - Example: Profit 0.01 SOL → Fee 0.001 SOL → You keep 0.009 SOL

2. **Network Fees (Gas):**
   - Charged by Solana blockchain
   - Usually 0.00001-0.0001 SOL per transaction
   - Paid from your wallet balance

3. **Jupiter Swap Fees:**
   - Included in slippage tolerance
   - Typically very small (0.1-0.3%)

### Fee Wallet:
```
G6mVPjapHtHRKWucLbwhcJHKJHG6FVi5yhpm6wJGWYC9
```

All developer fees are sent here automatically.

### Example Calculation:
```
Starting SOL: 0.1000
After Trade:  0.1030 (+0.0030 profit)
Developer Fee: 0.0003 (10% of profit)
Network Fees:  0.0001
Your Balance: 0.1026 SOL (+0.0026 net profit)
```

---

## 🔧 Troubleshooting

### Bot Won't Start

**Problem:** Permission denied
```bash
# Solution:
chmod +x arb-bot
```

**Problem:** Node.js version error
```bash
# Check version:
node --version

# If below v18, upgrade:
nvm install 20
nvm use 20
```

### No Opportunities Found

**Possible Causes:**
1. ✅ **Min Profit % too high** - Try lowering to 0.5%
2. ✅ **Bad market conditions** - Wait for more volatility
3. ✅ **Poor RPC connection** - Upgrade to paid RPC

**Solution:**
```bash
# Lower minimum profit percentage
./arb-bot → Reconfigure Settings → Min Profit: 0.5
```

### Trades Failing

**Problem:** "Slippage exceeded"
```bash
# Increase slippage tolerance:
./arb-bot → Reconfigure Settings → Slippage: 100 (1.0%)
```

**Problem:** "Insufficient SOL balance"
```bash
# You need more SOL in wallet
# Minimum: 3x your trade amount
# Example: 0.1 SOL trade = need 0.3 SOL total
```

**Problem:** "Transaction timeout"
```bash
# Your RPC is too slow
# Get faster RPC from Helius or QuickNode
```

### Slow Performance

**Issue:** Scans taking too long

**Solutions:**
1. ✅ Use a paid RPC (Helius, QuickNode)
2. ✅ Reduce trade amount to scan faster
3. ✅ Better internet connection

---

## ⚠️ Important Warnings

### 🔐 Security:

- ❌ **NEVER share your private key with anyone**
- ❌ **NEVER run this bot on untrusted computers**
- ❌ **NEVER share your config.json file**
- ✅ **Always keep your private key secret**
- ✅ **Use a dedicated trading wallet (not your main wallet)**

### 💸 Financial Risks:

- ⚠️ **Trading is risky** - You can lose money
- ⚠️ **Start small** - Test with 0.05-0.1 SOL
- ⚠️ **Never invest more than you can afford to lose**
- ⚠️ **Market conditions change** - Profits are not guaranteed
- ⚠️ **Network fees** - Even failed trades cost gas

### 🤖 Bot Limitations:

- Bot scans every **60 seconds** (not instant)
- Other bots may be faster and take opportunities first
- High gas fees during network congestion
- Not all token pairs have arbitrage opportunities
- Slippage can reduce profits

---

## ❓ FAQ

### Q: How much money can I make?

**A:** It varies greatly based on:
- Market volatility (more = better)
- Your trade amount (larger = more profit per trade)
- Your settings (lower min profit = more trades)
- Network speed (faster RPC = better execution)

Realistic expectations: 0.5% - 5% profit per successful trade

### Q: How often does it find opportunities?

**A:** Depends on market conditions:
- Bull markets: Multiple per hour
- Bear markets: Few per day
- Typical: 5-20 per day with 1% minimum profit

### Q: Can I run it 24/7?

**A:** Yes! Use `screen` or `tmux`:
```bash
# Start a screen session
screen -S arbitrage

# Run bot
./arb-bot

# Detach: Press Ctrl+A then D
# Reattach later: screen -r arbitrage
```

### Q: What if I lose money?

**A:** The bot only executes trades above your minimum profit threshold, but:
- Slippage can reduce profits
- Network fees are unavoidable
- Failed trades still cost gas
- Start small and test thoroughly

### Q: Can I change settings while running?

**A:** No, you must:
1. Stop the bot (Ctrl+C)
2. Restart: `./arb-bot`
3. Choose "Reconfigure Settings"
4. Restart bot

### Q: How do I stop the bot?

**A:** Press `Ctrl+C` - it will stop safely after current scan

### Q: What tokens does it trade?

**A:** The bot scans the top 50 verified tokens from Jupiter, including:
- SOL/USDC
- SOL/USDT
- SOL/JUP
- And many more popular pairs

### Q: Do I need to keep my computer on?

**A:** Yes, the bot must run continuously. Consider:
- Cloud VPS (DigitalOcean, AWS, Linode)
- Raspberry Pi
- Old laptop/computer

### Q: What's the best RPC provider?

**A:**
1. **Helius** - Fast, reliable, generous free tier
2. **QuickNode** - Professional, very fast
3. **Alchemy** - Good balance of speed/price

Free RPC works but is slow and may miss opportunities.

### Q: How do I update the bot?

**A:** You'll receive a new binary file. Simply:
1. Stop old bot (Ctrl+C)
2. Replace `arb-bot` file
3. Run new version: `./arb-bot`

Your config.json settings are preserved.

---

## 📞 Support

### Getting Help:

1. **Read this guide thoroughly**
2. **Check Troubleshooting section**
3. **Contact your bot provider**

### Useful Links:

- **Jupiter Exchange:** https://jup.ag
- **Solana Explorer:** https://solscan.io
- **Helius RPC:** https://helius.dev
- **QuickNode RPC:** https://quicknode.com

---

## 📝 Quick Reference Card

```
START BOT:        ./arb-bot
STOP BOT:         Ctrl+C
CONFIG FILE:      config.json
SCAN INTERVAL:    60 seconds
DEVELOPER FEE:    10% of profits
MIN SOL NEEDED:   0.3 SOL (for 0.1 SOL trades)

RECOMMENDED SETTINGS:
- Min Profit: 0.5% - 2.0%
- Trade Amount: 0.05 - 0.2 SOL
- Slippage: 50-100 (0.5%-1.0%)
- RPC: Paid provider (Helius/QuickNode)
```

---

## 🎯 Best Practices

1. ✅ **Start with small amounts** (0.05-0.1 SOL)
2. ✅ **Use a dedicated trading wallet**
3. ✅ **Monitor first 24 hours closely**
4. ✅ **Use paid RPC for best results**
5. ✅ **Keep SOL balance 3x your trade amount**
6. ✅ **Lower min profit % for more trades**
7. ✅ **Check results daily**
8. ✅ **Withdraw profits regularly**

---

**🚀 Happy Trading! May your arbitrages be profitable!**

*Last Updated: January 2025*
*Bot Version: 1.0*
