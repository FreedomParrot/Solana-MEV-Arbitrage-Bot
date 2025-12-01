# 🚀 Jupiter Arbitrage Bot

Automatic Solana arbitrage trading bot for Jupiter DEX.

---

## 📥 Installation

### What You Need:
- **Node.js 16+** ([Download here](https://nodejs.org/))
- **Solana wallet** with 0.5+ SOL
- **Private key** (base58 format)

### Quick Install:

```bash
# 1. Download bot.sh
wget https://github.com/YOUR_USERNAME/YOUR_REPO/raw/main/bot.sh

# 2. Make it executable
chmod +x bot.sh

# 3. Run it
./bot.sh
```

---

## 🎯 First Run

When you run the bot for the first time:

```bash
./bot.sh
```

You'll be asked 5 questions:

### 1. RPC URL
```
Enter your Solana RPC URL: https://api.mainnet-beta.solana.com
```
**Options:**
- Free: `https://api.mainnet-beta.solana.com`
- Better: Get free RPC from [Helius](https://helius.dev/) or [QuickNode](https://quicknode.com/)

### 2. Private Key
```
Enter your wallet private key (base58):
```
- Get from Phantom, Solflare, or your wallet
- **⚠️ NEVER SHARE THIS!**
- Format: `5J7W8kD9...` (long string)

### 3. Minimum Profit
```
Minimum profit percentage: 1.0
```
- Recommended: `0.5` - `2.0`
- Lower = more trades, smaller profits
- Higher = fewer trades, bigger profits

### 4. Trade Amount
```
Trade amount (in SOL): 0.1
```
- Start small: `0.05` - `0.1` SOL
- Larger = more profit but more risk

### 5. Slippage
```
Slippage tolerance (50 = 0.5%): 50
```
- Default: `50` (0.5%)
- Increase if trades fail

---

## 🎮 Using the Bot

After setup, you'll see the menu:

```
? What would you like to do?
  🚀 Start Arbitrage Bot
  🔍 Scan for Opportunities
  💼 Check Wallet Balance
  ⚙️  Reconfigure Settings
  🚪 Exit
```

### 🚀 Start Arbitrage Bot
- Finds and executes profitable trades automatically
- Runs until you press `Ctrl+C`
- Shows results for every scan

### 🔍 Scan for Opportunities
- Only scans, doesn't trade
- Good for testing settings

### 💼 Check Wallet Balance
- Shows your SOL balance

### ⚙️ Reconfigure Settings
- Change your settings anytime

---

## 💰 Fee Structure

**Fee: 20% of profit (minimum 0.006 SOL per trade)**

| Your Profit | Fee Charged | You Keep |
|-------------|-------------|----------|
| 0.05 SOL    | 0.01 SOL    | 0.04 SOL |
| 0.01 SOL    | 0.006 SOL   | 0.004 SOL|
| 0.002 SOL   | 0.006 SOL   | -0.004 SOL (loss)|
| Loss        | 0.006 SOL   | Loss + fee|

---

## ⚠️ Important Warnings

### 🛡️ Security
- **Use a dedicated wallet** (not your main one)
- **Start with small amounts** (0.05-0.1 SOL)
- **Never share your private key**

### 📉 Realistic Expectations
- ❌ This is NOT guaranteed profit
- ❌ You can LOSE money
- ✅ Arbitrage is rare and competitive
- ✅ Profits are usually small (0.1-2%)
- ✅ Fees can exceed small profits

### 💡 Best Practices
1. Test with 0.05 SOL first
2. Monitor first few trades
3. Use paid RPC for better speed
4. Don't expect quick riches
5. Only risk what you can afford to lose

---

## 🔧 Troubleshooting

### "Node.js is required"
**Fix:**
```bash
# Check version
node --version

# If not installed:
# Visit https://nodejs.org/ and install Node.js 16+
```

### "No profitable opportunities found"
**Fix:**
- Lower minimum profit to `0.3` or `0.5`
- Increase trade amount
- Wait for better market conditions

### "Swap execution error"
**Fix:**
- Use a paid RPC endpoint
- Increase slippage to `100` or `150`
- Check internet connection

### "Insufficient funds"
**Fix:**
```bash
# Add more SOL to your wallet
# Minimum recommended: 0.5 SOL
```

### Can't run bot.sh
**Fix:**
```bash
chmod +x bot.sh
./bot.sh
```

---

## 🛑 How to Stop

Press **`Ctrl + C`** to stop the bot safely.

---

## 📱 Quick Commands

```bash
# Run the bot
./bot.sh

# Make executable
chmod +x bot.sh

# Check Node.js version
node --version

# Stop bot
Press Ctrl+C
```

---

## ❓ FAQ

**Q: Is this profitable?**  
A: Not guaranteed. Arbitrage is rare and competitive. Start small.

**Q: How much SOL do I need?**  
A: Minimum 0.5 SOL (0.1 for trading + buffer for fees).

**Q: Is my private key safe?**  
A: Yes, it stays on your computer. Never shared anywhere.

**Q: Can I run 24/7?**  
A: Yes, but use a VPS/cloud server for best results.

**Q: What if I lose money?**  
A: This is possible! Only trade what you can afford to lose.

**Q: Do I need to watch it?**  
A: Check regularly. Stop if you see consistent losses.

---

## 🎉 Getting Started Checklist

- [ ] Node.js 16+ installed
- [ ] Downloaded `bot.sh`
- [ ] Made executable: `chmod +x bot.sh`
- [ ] Have 0.5+ SOL in wallet
- [ ] Have private key ready
- [ ] Started with small trade amount (0.05-0.1 SOL)
- [ ] Using paid RPC (recommended)
- [ ] Understand the risks

---

## ⚠️ DISCLAIMER

**USE AT YOUR OWN RISK**

This bot is provided as-is with **NO GUARANTEES**:
- ❌ No guaranteed profits
- ❌ You can lose money
- ❌ Developer not responsible for losses
- ❌ Not financial advice
- ✅ Test with small amounts first

**Trading cryptocurrencies is risky. Only trade what you can afford to lose.**

---

## 🚀 Ready? Let's Go!

```bash
# 1. Make executable
chmod +x bot.sh

# 2. Run it
./bot.sh

# 3. Follow setup

# 4. Start small and test!
```

**Good luck and trade responsibly! 🎯**

---

## 📞 Support

Having issues? Check:
1. This README's Troubleshooting section
2. You have Node.js 16+ installed
3. Your wallet has enough SOL
4. Your settings are correct

---

**Version 1.0.0** | Single-file standalone bot | No installation required
