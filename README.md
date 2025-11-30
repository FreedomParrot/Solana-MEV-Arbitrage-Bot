# 🚀 Jupiter Arbitrage Bot

An automated Solana arbitrage trading bot that scans for profitable trading opportunities across Jupiter Exchange routes.

## ⚡ Quick Start

### Requirements

- **Linux** (Ubuntu, Debian, or similar)
- **Node.js 16+** ([Download here](https://nodejs.org/))
- **Solana wallet** with some SOL for trading

### Installation

1. **Extract the package:**
   ```bash
   tar -xzf jupiter-arb-bot_*.tar.gz
   cd jupiter-arb-bot
   ```

2. **Make the script executable:**
   ```bash
   chmod +x jupiter-arb-bot.sh
   ```

3. **Run the bot:**
   ```bash
   ./jupiter-arb-bot.sh
   ```

That's it! No dependencies to install - everything is bundled.

---

## 🎯 First-Time Setup

When you run the bot for the first time, you'll be guided through a setup wizard:

### 1. **RPC URL**
   - Default: `https://api.mainnet-beta.solana.com` (free, rate-limited)
   - **Recommended:** Use a dedicated RPC provider for better performance:
     - [Helius](https://helius.dev/) - Free tier available
     - [QuickNode](https://www.quicknode.com/) - Paid
     - [Alchemy](https://www.alchemy.com/) - Free tier available

### 2. **Private Key**
   - Your Solana wallet private key in **base58 format**
   - ⚠️ **SECURITY WARNING:** Never share your private key!
   - The key will be stored in `config.json` (keep this file secure)

   **How to get your private key:**
   - **Phantom:** Settings → Export Private Key
   - **Solflare:** Settings → Export Wallet → Show Private Key
   - **Solana CLI:** `solana-keygen recover` or check your keypair file

### 3. **Minimum Profit Percentage**
   - Default: `1.0` (1%)
   - The bot only executes trades with profit above this threshold
   - **Recommendation:** Start with 0.5-1% for mainnet

### 4. **Trade Amount**
   - Default: `0.1` SOL
   - Amount to use per arbitrage cycle
   - **Recommendation:** Start with 0.01-0.1 SOL for testing

### 5. **Slippage Tolerance**
   - Default: `50` (0.5%)
   - Higher = more trades execute but potentially less profit
   - Lower = fewer trades but better prices
   - **Recommendation:** 50-100 (0.5%-1%) for volatile markets

---

## 📋 Main Menu Options

After setup, you'll see the main menu:

### 🚀 **Start Arbitrage Bot**
- Continuously scans for profitable opportunities
- Automatically executes profitable trades
- Runs until you press `Ctrl+C`

### 🔍 **Scan for Opportunities**
- One-time scan without executing trades
- Shows all potential arbitrage paths
- Useful for testing settings

### 💼 **Check Wallet Balance**
- Displays your current SOL balance
- Helpful for monitoring profits

### ⚙️ **Reconfigure Settings**
- Change RPC URL, trade amount, slippage, etc.
- Updates saved to `config.json`

### 🚪 **Exit**
- Safely close the bot

---

## 📊 Understanding the Output

### Scan Results Table

```
┌─────────────────┬────────────┬─────────────┬──────────┬────────────┐
│ Trade Path      │ Buy Price  │ Sell Price  │ Profit   │ Status     │
├─────────────────┼────────────┼─────────────┼──────────┼────────────┤
│ SOL→USDC→SOL    │ 1000 USDC  │ 1.015 SOL   │ +0.015   │ ✅ PROFIT  │
│ SOL→JUP→SOL     │ 50 JUP     │ 0.998 SOL   │ -0.002   │ ❌ LOSS    │
└─────────────────┴────────────┴─────────────┴──────────┴────────────┘
```

- **✅ PROFIT** - Exceeds minimum profit threshold
- **⚠️ Low Gain** - Positive but below threshold
- **❌ LOSS** - Would lose money
- **❌ Failed** - No trading route available

### Trade Execution

```
Step 1/2: Swapping SOL → USDC
✓ Swap 1/2 complete: AbC123...

Step 2/2: Swapping USDC → SOL
✓ Swap 2/2 complete: DeF456...

🎉 ARBITRAGE COMPLETE!
💰 Your Net Profit: 0.0135 SOL
```

---

## ⚙️ Configuration File

Settings are stored in `config.json`:

```json
{
  "rpcUrl": "https://api.mainnet-beta.solana.com",
  "privateKey": "your_private_key_here",
  "minProfitPercentage": 1.0,
  "tradeAmount": 0.1,
  "slippage": 50
}
```

You can edit this file directly or use the "Reconfigure Settings" menu option.

---

## 💰 Fees & Costs

### Transaction Fees
- **Solana network fees:** ~0.000005 SOL per transaction
- **Each arbitrage cycle:** 2 transactions (~0.00001 SOL total)

### Developer Fee
- **Current rate:** 0% (disabled in this version)
- **Infrastructure present:** Code can collect 10% of profits if enabled
- **Wallet address:** `G6mVPjapHtHRKWucLbwhcJHKJHG6FVi5yhpm6wJGWYC9`

⚠️ **Note:** While the fee is currently set to 0%, the code infrastructure exists. Review the code if concerned.

---

## 🛡️ Security Best Practices

### 🔐 Protect Your Private Key
- **NEVER** share your private key with anyone
- Keep `config.json` secure and backed up
- Consider using a dedicated trading wallet with limited funds

### 💵 Start Small
- Test with **0.01-0.1 SOL** first
- Verify profitability before scaling up
- Monitor the first 10-20 trades closely

### 🌐 Use Quality RPC
- Free public RPCs are slow and rate-limited
- Dedicated RPC providers offer:
  - Faster transaction processing
  - Better success rates
  - No rate limits

### 📊 Monitor Performance
- Check your wallet balance regularly
- Review transaction history on [Solscan](https://solscan.io/)
- Track profit/loss over time

---

## ❗ Troubleshooting

### "❌ Node.js is not installed"

**Solution:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
```

### "❌ Node.js 16+ required"

**Solution:** Update Node.js to version 16 or higher using the commands above.

### "❌ Error: dist/bot.js not found"

**Solution:**
```bash
# Ensure you extracted the full archive
tar -xzf jupiter-arb-bot_*.tar.gz

# Check files exist
ls -la jupiter-arb-bot.sh dist/bot.js
```

### "⚠️ No profitable opportunities found"

**Possible causes:**
- Market conditions aren't favorable
- `minProfitPercentage` is set too high
- `slippage` tolerance is too low
- RPC is slow (causing stale data)

**Solutions:**
- Lower `minProfitPercentage` to 0.3-0.5%
- Increase `slippage` to 100 (1%)
- Switch to a faster RPC provider
- Wait for better market conditions

### Trades fail frequently

**Possible causes:**
- Network congestion
- Prices moving too fast
- Insufficient SOL for fees

**Solutions:**
- Increase slippage tolerance
- Use a faster RPC
- Ensure you have at least 0.5 SOL in your wallet

### "Failed to fetch tokens"

**Cause:** Jupiter API timeout or rate limiting

**Solution:**
- Check internet connection
- Wait 30 seconds and try again
- Bot falls back to 4 major tokens (SOL, USDC, USDT, JUP)

---

## 📈 Tips for Success

### 1. **Optimize Settings**
   - Start conservative: 1% profit, 0.1 SOL trades
   - Gradually adjust based on results
   - Higher trade amounts = higher absolute profits (but higher risk)

### 2. **Choose the Right Time**
   - High volatility = more opportunities
   - Major news events often create arbitrage chances
   - Avoid extreme gas fee periods

### 3. **Monitor & Adjust**
   - Review first 20 trades carefully
   - Calculate your actual profit rate
   - Adjust `minProfitPercentage` based on success rate

### 4. **Risk Management**
   - Never invest more than you can afford to lose
   - Keep most funds in a separate wallet
   - Set a daily loss limit for yourself

### 5. **Use Quality Infrastructure**
   - Dedicated RPC = faster execution = better profits
   - Good internet connection is critical
   - Consider running on a VPS for 24/7 operation

---

## 🚨 Important Warnings

⚠️ **TRADING RISKS:**
- Arbitrage is **NOT guaranteed profit**
- You can **LOSE MONEY** due to:
  - Slippage exceeding profit margins
  - Failed transactions (you still pay fees)
  - Market volatility
  - Network congestion
  - Smart contract risks

⚠️ **SECURITY RISKS:**
- Your private key is stored in plain text
- Obfuscation does NOT provide complete security
- Anyone with access to your machine can extract keys
- Code contains fee collection infrastructure (currently disabled)

⚠️ **NO WARRANTY:**
- This software is provided "as is"
- No guarantees of profitability
- Use at your own risk
- Always test with small amounts first

---

## 📞 Support & Resources

### Learn More
- **Solana Docs:** https://docs.solana.com/
- **Jupiter Exchange:** https://jup.ag/
- **Arbitrage Strategy:** Research MEV and arbitrage trading

### Tools
- **Solscan:** https://solscan.io/ (Track transactions)
- **Jupiter Analytics:** https://jup.ag/stats (Market data)
- **Birdeye:** https://birdeye.so/ (Token prices)

### Community
- Solana Discord
- Jupiter Discord
- DeFi/MEV research forums

---

## 📜 Version Information

- **Version:** 1.0
- **Build Type:** Standalone (all dependencies bundled)
- **Platform:** Linux
- **Node.js Required:** 16+

---

## 🎓 How It Works

### Arbitrage Strategy

The bot implements **triangular arbitrage** on Solana:

1. **Scan Phase:**
   - Fetches verified token list from Jupiter
   - Checks prices for SOL → Token → SOL paths
   - Calculates potential profit for each route

2. **Execution Phase:**
   - If profit > minimum threshold:
     - Swap SOL for Token (Trade 1)
     - Swap Token back to SOL (Trade 2)
     - Net result: More SOL than you started with

3. **Example:**
   ```
   Start: 1.0 SOL
   Trade 1: 1.0 SOL → 100 USDC
   Trade 2: 100 USDC → 1.015 SOL
   Profit: 0.015 SOL (1.5%)
   ```

### Why Opportunities Exist

- Price differences between DEX aggregators
- Temporary liquidity imbalances
- High volatility creating mispricings
- New token listings
- Large market orders causing slippage

---

## 📝 License

This software is provided for educational and research purposes.

**Disclaimer:** Cryptocurrency trading involves substantial risk of loss. The developers are not responsible for any financial losses incurred through the use of this bot.

---

## 🔄 Updates

To update the bot:
1. Download the latest release
2. Extract to a new directory
3. Copy your `config.json` from the old version
4. Run the new version

**Note:** Always backup your `config.json` before updating.

---

**Ready to start?** Run `./jupiter-arb-bot.sh` and follow the setup wizard!

Good luck, and trade responsibly! 🚀
