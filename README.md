# 🚀 Jupiter Arbitrage Bot

Automatic Solana arbitrage trading bot using Jupiter DEX.

---

## 📋 What You Need

1. **Node.js 16+** - [Download here](https://nodejs.org/)
2. **Solana wallet** with some SOL (minimum 0.5 SOL recommended)
3. **Your wallet's private key** (base58 format)

---

## ⚡ Quick Start

### Step 1: Install Node.js

```bash
# Check if you have Node.js
node --version

# If not installed, download from: https://nodejs.org/
```

### Step 2: Download the Bot

```bash
# Download and extract the bot files
# You should have:
#   - launch.sh
#   - dist/bot.js
```

### Step 3: Make it Executable

```bash
chmod +x launch.sh
```

### Step 4: Run the Bot

```bash
./launch.sh
```

---

## ⚙️ First-Time Setup

When you run the bot for the first time, it will ask you:

### 1️⃣ **RPC URL**
```
Enter your Solana RPC URL: https://api.mainnet-beta.solana.com
```
- **Free:** `https://api.mainnet-beta.solana.com` (works but slower)
- **Better:** Get a free RPC from [Helius](https://helius.dev/) or [QuickNode](https://www.quicknode.com/)

### 2️⃣ **Private Key**
```
Enter your wallet private key (base58):
```
- Get this from Phantom, Solflare, or your wallet
- **⚠️ KEEP THIS SECRET!** Never share it with anyone
- Example format: `5J7W8kD9...` (long string)

### 3️⃣ **Minimum Profit**
```
Minimum profit percentage to execute arbitrage: 1.0
```
- **Recommended:** `0.5` to `2.0`
- Lower = more trades but smaller profits
- Higher = fewer trades but bigger profits

### 4️⃣ **Trade Amount**
```
Trade amount per arbitrage (in SOL): 0.1
```
- **Start small:** `0.05` to `0.1` SOL
- Larger amounts = larger profits (but more risk)

### 5️⃣ **Slippage**
```
Slippage tolerance (in basis points, 50 = 0.5%): 50
```
- **Default:** `50` (0.5%)
- Higher if trades keep failing

---

## 🎮 Menu Options

After setup, you'll see:

```
? What would you like to do?
  🚀 Start Arbitrage Bot      ← Run the bot automatically
  🔍 Scan for Opportunities   ← Just look, don't trade
  💼 Check Wallet Balance     ← See your SOL balance
  ⚙️  Reconfigure Settings    ← Change your settings
  🚪 Exit                      ← Stop the bot
```

### 🚀 Start Arbitrage Bot
- Automatically finds and executes profitable trades
- Runs continuously until you stop it (Ctrl+C)
- Shows detailed results for every scan

### 🔍 Scan for Opportunities
- Just scans for arbitrage opportunities
- **Doesn't execute any trades**
- Good for testing your settings

### 💼 Check Wallet Balance
- Shows your current SOL balance

### ⚙️ Reconfigure Settings
- Change any of your initial settings

---

## 💰 Fees

The bot charges a fee on every trade:

- **20% of profit** (minimum 0.006 SOL)
- If you lose money, still pays 0.006 SOL fixed fee

**Examples:**
- Profit 0.05 SOL → Fee 0.01 SOL (20%) → You keep 0.04 SOL
- Profit 0.01 SOL → Fee 0.006 SOL (minimum) → You keep 0.004 SOL
- Loss 0.01 SOL → Fee 0.006 SOL → Total loss 0.016 SOL

---

## 🛑 How to Stop

Press `Ctrl + C` to stop the bot gracefully.

---

## ⚠️ Important Safety Tips

### 🔐 Security
- **Never share your private key** with anyone
- Use a **dedicated trading wallet** (not your main wallet)
- Start with **small amounts** to test

### 📊 Realistic Expectations
- Arbitrage is **rare and competitive**
- Profits are usually **small** (0.1% - 2%)
- You might **lose money** due to fees and failed trades
- This is **not guaranteed profit**

### 💡 Best Practices
1. Start with 0.05-0.1 SOL trades
2. Monitor the first few trades closely
3. Use a paid RPC for better performance
4. Don't expect to get rich quick
5. Only trade what you can afford to lose

---

## 🔧 Troubleshooting

### "Node.js is required"
Install Node.js from [nodejs.org](https://nodejs.org/)

### "No profitable opportunities found"
- Try lowering `minProfitPercentage` to `0.5` or `0.3`
- Wait for better market conditions
- Increase your trade amount

### "Swap execution error"
- Use a better RPC endpoint (paid service)
- Increase slippage tolerance
- Check your internet connection

### "Insufficient funds"
Add more SOL to your wallet (minimum 0.5 SOL recommended)

### Can't run `launch.sh`
```bash
chmod +x launch.sh
./launch.sh
```

---

## 📱 Quick Commands

```bash
# Run the bot
./launch.sh

# Or run directly
node dist/bot.js

# Make executable
chmod +x launch.sh

# Stop the bot
Press Ctrl + C
```

---

## 📁 Files

```
jupiter-arb-bot/
├── launch.sh       ← Run this to start
├── dist/
│   └── bot.js      ← Main bot file
├── config.json     ← Your settings (created after first run)
└── README.md       ← This file
```

---

## ❓ FAQ

**Q: How much money can I make?**  
A: Real arbitrage is rare. Don't expect guaranteed profits. Start small and test.

**Q: Is it safe?**  
A: Your private key stays on your computer. Use a dedicated wallet and start small.

**Q: Do I need to watch it constantly?**  
A: No, but check on it regularly. Stop it if you see consistent losses.

**Q: Can I run it 24/7?**  
A: Yes, but use a VPS or cloud server for best results.

**Q: What if I lose money?**  
A: This is possible! Only trade what you can afford to lose.

---

## ⚠️ Disclaimer

**USE AT YOUR OWN RISK**

- This bot is provided as-is with **no guarantees**
- You can **lose money** trading cryptocurrencies
- The developer is **not responsible** for any losses
- This is **not financial advice**
- **Test with small amounts first**

---

## 🎉 Ready to Start?

```bash
# 1. Make it executable
chmod +x launch.sh

# 2. Run it
./launch.sh

# 3. Follow the setup wizard

# 4. Start trading!
```

**Good luck and trade responsibly! 🚀**
