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

## ⚙
