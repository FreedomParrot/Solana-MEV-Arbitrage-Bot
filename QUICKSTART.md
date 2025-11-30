# ⚡ Quick Start Guide

## 🚀 Get Running in 3 Minutes

### Step 1: Extract & Run
```bash
tar -xzf jupiter-arb-bot_*.tar.gz
cd jupiter-arb-bot
chmod +x jupiter-arb-bot.sh
./jupiter-arb-bot.sh
```

### Step 2: Setup Wizard
Answer these questions:
1. **RPC URL:** Press Enter for default (or use Helius/QuickNode)
2. **Private Key:** Paste your Solana wallet private key (base58)
3. **Min Profit:** `1.0` (1% minimum profit)
4. **Trade Amount:** `0.1` (SOL per trade - start small!)
5. **Slippage:** `50` (0.5% slippage tolerance)

### Step 3: Start Trading
From the main menu, choose:
- **Option 1:** Start Arbitrage Bot

That's it! The bot is now running. 🎉

---

## 📊 Recommended Settings

### For Testing (Mainnet)
```
Min Profit:    0.5%
Trade Amount:  0.01 SOL
Slippage:      50 (0.5%)
```

### For Production
```
Min Profit:    0.3-0.8%
Trade Amount:  0.1-1.0 SOL
Slippage:      50-100 (0.5-1%)
```

---

## ⚠️ Critical Reminders

✅ **DO:**
- Start with 0.01-0.1 SOL trades
- Use a dedicated RPC (Helius, QuickNode)
- Monitor first 20 trades closely
- Keep backup of `config.json`

❌ **DON'T:**
- Use your main wallet (create a trading wallet)
- Trade more than you can afford to lose
- Share your private key with anyone
- Expect guaranteed profits

---

## 🆘 Quick Troubleshooting

**No opportunities found?**
→ Lower min profit to 0.3%, increase slippage to 100

**Trades failing?**
→ Switch to a paid RPC provider, increase slippage

**Node.js not installed?**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 💰 Expected Performance

- **Opportunities:** 0-5 per hour (depends on market)
- **Success Rate:** 60-80% (with good RPC)
- **Typical Profit:** 0.3-2% per trade
- **Break-even:** Usually 10-50 trades (due to learning curve)

---

## 📱 Monitor Your Trades

Check transactions on Solscan:
```
https://solscan.io/account/YOUR_WALLET_ADDRESS
```

---

**Need more help?** See the full [README.md](README.md)

**Ready?** Run `./jupiter-arb-bot.sh` now! 🚀
