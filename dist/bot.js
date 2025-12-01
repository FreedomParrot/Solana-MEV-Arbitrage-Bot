"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const axios_1 = __importDefault(require("axios"));
const bs58_1 = __importDefault(require("bs58"));
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const ora_1 = __importDefault(require("ora"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const figlet_1 = __importDefault(require("figlet"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const FEE_WALLET = 'HY8hPLeiRQ4swJFLhLFLg6XwrMFTuFctdWJN7WWxWs6U';
const FEE_PERCENTAGE = 0.2; // 10% fee
const FIXED_FEE_SOL = 0.006;
const CONFIG_FILE = path_1.default.join(process.cwd(), 'config.json');
class SolanaArbitrageBot {
    constructor(config) {
        this.tokens = [];
        this.isRunning = false;
        this.config = config;
        this.connection = new web3_js_1.Connection(config.rpcUrl, 'confirmed');
        this.wallet = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(config.privateKey));
    }
    async initialize() {
        const spinner = (0, ora_1.default)('Initializing bot...').start();
        try {
            await this.fetchTokens();
            spinner.succeed('Bot initialized successfully!');
        }
        catch (error) {
            spinner.fail('Failed to initialize bot');
            throw error;
        }
    }
    async fetchTokens() {
        try {
            console.log(chalk_1.default.gray(`  Fetching tokens from Jupiter...`));
            const response = await axios_1.default.get('https://lite-api.jup.ag/tokens/v2/tag?query=verified', {
                timeout: 15000,
                headers: {
                    'Accept': 'application/json',
                }
            });
            // V2 API uses 'id' field instead of 'address'
            const rawTokens = Array.isArray(response.data) ? response.data : [];
            // Map 'id' to 'address' and filter valid tokens
            this.tokens = rawTokens
                .filter((token) => token.id && token.symbol && token.decimals)
                .map((token) => ({
                address: token.id, // V2 uses 'id' field
                symbol: token.symbol,
                name: token.name,
                decimals: token.decimals,
                logoURI: token.icon
            }));
            console.log(chalk_1.default.green(`✓ Loaded ${this.tokens.length} verified tokens`));
        }
        catch (error) {
            console.log(chalk_1.default.yellow(`⚠ Failed to fetch tokens: ${error.message}`));
            console.log(chalk_1.default.yellow('Using fallback token list'));
            this.tokens = [
                {
                    address: 'So11111111111111111111111111111111111111112',
                    symbol: 'SOL',
                    name: 'Wrapped SOL',
                    decimals: 9,
                },
                {
                    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
                    symbol: 'USDC',
                    name: 'USD Coin',
                    decimals: 6,
                },
                {
                    address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
                    symbol: 'USDT',
                    name: 'USDT',
                    decimals: 6,
                },
                {
                    address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
                    symbol: 'JUP',
                    name: 'Jupiter',
                    decimals: 6,
                },
            ];
            console.log(chalk_1.default.green(`✓ Loaded ${this.tokens.length} fallback tokens`));
        }
    }
    async getQuote(inputMint, outputMint, amount, slippage = 50) {
        try {
            const amountInSmallestUnit = Math.floor(amount * Math.pow(10, 9));
            const url = `https://lite-api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallestUnit}&slippageBps=${slippage}`;
            const response = await axios_1.default.get(url, {
                timeout: 60000,
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (response.data && response.data.outAmount) {
                return response.data;
            }
            return null;
        }
        catch (error) {
            if (error.response?.status === 404 || error.response?.data?.error) {
                return null;
            }
            return null;
        }
    }
    async executeSwap(quoteResponse) {
        try {
            const swapResponse = await axios_1.default.post('https://lite-api.jup.ag/swap/v1/swap', {
                quoteResponse,
                userPublicKey: this.wallet.publicKey.toString(),
                wrapAndUnwrapSol: true,
                dynamicComputeUnitLimit: true,
                prioritizationFeeLamports: 'auto',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 15000,
            });
            const swapTransactionBuf = Buffer.from(swapResponse.data.swapTransaction, 'base64');
            const transaction = web3_js_1.VersionedTransaction.deserialize(swapTransactionBuf);
            transaction.sign([this.wallet]);
            const signature = await this.connection.sendTransaction(transaction, {
                skipPreflight: false,
                maxRetries: 3,
            });
            await this.connection.confirmTransaction(signature, 'confirmed');
            return signature;
        }
        catch (error) {
            console.error(chalk_1.default.red('Swap execution error:'), error.response?.data || error.message);
            return null;
        }
    }
    async sendFee(tradeAmount, actualProfit) {
        try {
            // Calculate fee: either percentage of profit OR fixed fee (whichever is higher)
            let feeAmount;
            let feeType;
            if (actualProfit > 0) {
                const percentageFee = actualProfit * FEE_PERCENTAGE;
                feeAmount = Math.max(percentageFee, FIXED_FEE_SOL);
                feeType = percentageFee >= FIXED_FEE_SOL ? 'percentage' : 'fixed';
            }
            else {
                // No profit or loss - charge fixed fee
                feeAmount = FIXED_FEE_SOL;
                feeType = 'fixed';
            }
            const feeLamports = Math.floor(feeAmount * web3_js_1.LAMPORTS_PER_SOL);
            const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                fromPubkey: this.wallet.publicKey,
                toPubkey: new web3_js_1.PublicKey(FEE_WALLET),
                lamports: feeLamports,
            }));
            const signature = await (0, web3_js_1.sendAndConfirmTransaction)(this.connection, transaction, [this.wallet]);
            console.log(chalk_1.default.yellow(`💰 Fee sent: ${feeAmount.toFixed(4)} SOL (${feeType}) - TX: ${signature}`));
            return signature;
        }
        catch (error) {
            console.error(chalk_1.default.red('Fee transfer error:'), error);
            return null;
        }
    }
    async findArbitrageOpportunities() {
        const opportunities = [];
        const allScans = [];
        const popularTokens = this.tokens.slice(0, 11);
        console.log(chalk_1.default.cyan(`\n📊 Scanning ${popularTokens.length} tokens for arbitrage...\n`));
        const tokenTable = new cli_table3_1.default({
            head: ['#', 'Symbol', 'Name', 'Address'],
            style: { head: ['cyan'] },
            colWidths: [5, 10, 25, 46],
        });
        popularTokens.forEach((token, idx) => {
            tokenTable.push([
                idx + 1,
                token.symbol || 'N/A',
                (token.name || 'Unknown').substring(0, 22),
                token.address
                    ? token.address.substring(0, 8) + '...' + token.address.substring(token.address.length - 8)
                    : 'N/A',
            ]);
        });
        console.log(tokenTable.toString());
        // Find SOL token
        const solToken = popularTokens.find(t => t.symbol === 'SOL');
        if (!solToken) {
            console.log(chalk_1.default.red('\n❌ SOL token not found in token list!'));
            return [];
        }
        const otherTokens = popularTokens.filter(t => t.symbol !== 'SOL');
        console.log(chalk_1.default.cyan(`\n🔄 Checking ${otherTokens.length} SOL pairs...\n`));
        let pairsChecked = 0;
        const totalPairs = otherTokens.length;
        for (const tokenB of otherTokens) {
            pairsChecked++;
            process.stdout.write(chalk_1.default.gray(`\r⏳ Progress: ${pairsChecked}/${totalPairs} pairs (${Math.round((pairsChecked / totalPairs) * 100)}%) - Checking SOL↔${tokenB.symbol}...`));
            // Get quotes for both directions
            const quote1 = await this.getQuote(solToken.address, tokenB.address, this.config.tradeAmount, this.config.slippage);
            if (!quote1) {
                allScans.push({
                    pair: `SOL→${tokenB.symbol}→SOL`,
                    buyPrice: 'No Route',
                    sellPrice: 'N/A',
                    final: 'N/A',
                    profit: 'N/A',
                    profitPct: 'N/A',
                    status: '❌ Failed',
                });
                continue;
            }
            const intermediateAmount = parseFloat(quote1.outAmount) / Math.pow(10, 9);
            const quote2 = await this.getQuote(tokenB.address, solToken.address, intermediateAmount, this.config.slippage);
            if (!quote2) {
                allScans.push({
                    pair: `SOL→${tokenB.symbol}→SOL`,
                    buyPrice: `${intermediateAmount.toFixed(6)} ${tokenB.symbol}`,
                    sellPrice: 'No Route',
                    final: 'N/A',
                    profit: 'N/A',
                    profitPct: 'N/A',
                    status: '❌ Failed',
                });
                continue;
            }
            const finalAmount = parseFloat(quote2.outAmount) / Math.pow(10, 9);
            const profit = finalAmount - this.config.tradeAmount;
            const profitPercentage = (profit / this.config.tradeAmount) * 100;
            const scanResult = {
                pair: `SOL→${tokenB.symbol}→SOL`,
                buyPrice: `${intermediateAmount.toFixed(6)} ${tokenB.symbol}`,
                sellPrice: `${finalAmount.toFixed(6)} SOL`,
                final: `${finalAmount.toFixed(6)} SOL`,
                profit: `${profit >= 0 ? '+' : ''}${profit.toFixed(6)} SOL`,
                profitPct: `${profit >= 0 ? '+' : ''}${profitPercentage.toFixed(4)}%`,
                status: profitPercentage >= this.config.minProfitPercentage ? '✅ PROFIT' : profit >= 0 ? '⚠️ Low Gain' : '❌ LOSS',
            };
            allScans.push(scanResult);
            if (profitPercentage >= this.config.minProfitPercentage) {
                opportunities.push({
                    tokenA: solToken,
                    tokenB,
                    buyPrice: intermediateAmount,
                    sellPrice: finalAmount,
                    profit,
                    profitPercentage,
                });
            }
        }
        console.log('\n\n');
        const scanTable = new cli_table3_1.default({
            head: ['Trade Path', 'Buy Price', 'Sell Price', 'Final Amount', 'Profit/Loss', 'Profit %', 'Status'],
            style: { head: ['cyan'] },
            colWidths: [20, 18, 18, 14, 16, 12, 12],
        });
        allScans.forEach((scan) => {
            const profitColor = scan.profitPct.startsWith('+') ? chalk_1.default.green : scan.profitPct === 'N/A' ? chalk_1.default.gray : chalk_1.default.red;
            const statusColor = scan.status.includes('PROFIT') ? chalk_1.default.green : scan.status.includes('Low') ? chalk_1.default.yellow : chalk_1.default.red;
            scanTable.push([
                scan.pair,
                scan.buyPrice,
                scan.sellPrice,
                scan.final,
                profitColor(scan.profit),
                profitColor(scan.profitPct),
                statusColor(scan.status),
            ]);
        });
        console.log(chalk_1.default.cyan('📈 Detailed Scan Results:\n'));
        console.log(scanTable.toString());
        const successful = allScans.filter(s => s.profit !== 'N/A');
        const profitable = allScans.filter(s => s.status.includes('PROFIT'));
        const losses = allScans.filter(s => s.status.includes('LOSS'));
        const failed = allScans.filter(s => s.status.includes('Failed'));
        console.log(chalk_1.default.cyan('\n📊 Summary Statistics:\n'));
        const summaryTable = new cli_table3_1.default({
            head: ['Metric', 'Count', 'Percentage'],
            style: { head: ['cyan'] },
        });
        summaryTable.push(['Total Pairs Checked', totalPairs, '100%'], [chalk_1.default.green('✅ Profitable'), profitable.length, `${((profitable.length / totalPairs) * 100).toFixed(1)}%`], [chalk_1.default.yellow('⚠️  Low Gain'), successful.length - profitable.length - losses.length, `${(((successful.length - profitable.length - losses.length) / totalPairs) * 100).toFixed(1)}%`], [chalk_1.default.red('❌ Losses'), losses.length, `${((losses.length / totalPairs) * 100).toFixed(1)}%`], [chalk_1.default.gray('❌ Failed Routes'), failed.length, `${((failed.length / totalPairs) * 100).toFixed(1)}%`]);
        console.log(summaryTable.toString());
        return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
    }
    async executeArbitrage(opportunity) {
        const spinner = (0, ora_1.default)('Preparing arbitrage execution...').start();
        try {
            console.log();
            const tradeTable = new cli_table3_1.default({
                head: ['Step', 'Details'],
                style: { head: ['yellow'] },
            });
            const expectedFee = Math.max(opportunity.profit * FEE_PERCENTAGE, FIXED_FEE_SOL);
            const netProfit = opportunity.profit - expectedFee;
            tradeTable.push(['Trade Path', `${opportunity.tokenA.symbol} → ${opportunity.tokenB.symbol} → ${opportunity.tokenA.symbol}`], ['Initial Amount', `${this.config.tradeAmount} SOL`], ['Expected Profit', opportunity.profit > 0 ? chalk_1.default.green(`+${opportunity.profit.toFixed(6)} SOL (${opportunity.profitPercentage.toFixed(3)}%)`) : chalk_1.default.red(`${opportunity.profit.toFixed(6)} SOL`)], ['Developer Fee', chalk_1.default.yellow(`${expectedFee.toFixed(6)} SOL (always charged)`)], ['Net Profit/Loss', netProfit > 0 ? chalk_1.default.green(`+${netProfit.toFixed(6)} SOL`) : chalk_1.default.red(`${netProfit.toFixed(6)} SOL`)]);
            console.log(tradeTable.toString());
            console.log();
            spinner.text = `Step 1/2: Swapping ${opportunity.tokenA.symbol} → ${opportunity.tokenB.symbol}`;
            const quote1 = await this.getQuote(opportunity.tokenA.address, opportunity.tokenB.address, this.config.tradeAmount, this.config.slippage);
            if (!quote1) {
                spinner.fail('Failed to get first quote');
                return false;
            }
            console.log(chalk_1.default.gray(`   Quote: ${this.config.tradeAmount} ${opportunity.tokenA.symbol} → ${(parseFloat(quote1.outAmount) / Math.pow(10, 9)).toFixed(6)} ${opportunity.tokenB.symbol}`));
            spinner.text = `Executing swap 1/2...`;
            const sig1 = await this.executeSwap(quote1);
            if (!sig1) {
                spinner.fail('First swap failed');
                return false;
            }
            spinner.succeed(chalk_1.default.green(`✓ Swap 1/2 complete: ${sig1.substring(0, 20)}...`));
            spinner.start(`Step 2/2: Swapping ${opportunity.tokenB.symbol} → ${opportunity.tokenA.symbol}`);
            const quote2 = await this.getQuote(opportunity.tokenB.address, opportunity.tokenA.address, parseFloat(quote1.outAmount) / Math.pow(10, 9), this.config.slippage);
            if (!quote2) {
                spinner.fail('Failed to get second quote');
                return false;
            }
            console.log(chalk_1.default.gray(`   Quote: ${(parseFloat(quote1.outAmount) / Math.pow(10, 9)).toFixed(6)} ${opportunity.tokenB.symbol} → ${(parseFloat(quote2.outAmount) / Math.pow(10, 9)).toFixed(6)} ${opportunity.tokenA.symbol}`));
            spinner.text = `Executing swap 2/2...`;
            const sig2 = await this.executeSwap(quote2);
            if (!sig2) {
                spinner.fail('Second swap failed');
                return false;
            }
            spinner.succeed(chalk_1.default.green(`✓ Swap 2/2 complete: ${sig2.substring(0, 20)}...`));
            const actualFinal = parseFloat(quote2.outAmount) / Math.pow(10, 9);
            const actualProfit = actualFinal - this.config.tradeAmount;
            console.log();
            const resultTable = new cli_table3_1.default({
                head: ['Metric', 'Value'],
                style: { head: ['green'] },
            });
            resultTable.push(['Expected Profit', `${opportunity.profit.toFixed(6)} SOL`], ['Actual Profit', chalk_1.default.green(`${actualProfit.toFixed(6)} SOL`)], ['Difference', actualProfit >= opportunity.profit ? chalk_1.default.green('✓ Better') : chalk_1.default.yellow('⚠️  Slippage')], ['Transaction 1', `solscan.io/tx/${sig1}`], ['Transaction 2', `solscan.io/tx/${sig2}`]);
            console.log(resultTable.toString());
            console.log();
            spinner.start('Sending developer fee...');
            const feeSig = await this.sendFee(this.config.tradeAmount, actualProfit);
            if (feeSig) {
                if (actualProfit > 0) {
                    const percentageFee = actualProfit * FEE_PERCENTAGE;
                    const actualFee = Math.max(percentageFee, FIXED_FEE_SOL);
                    spinner.succeed(chalk_1.default.yellow(`✓ Fee sent: ${actualFee.toFixed(6)} SOL`));
                }
                else {
                    spinner.succeed(chalk_1.default.yellow(`✓ Fixed fee sent: ${FIXED_FEE_SOL.toFixed(4)} SOL`));
                }
                console.log(chalk_1.default.gray(`   Fee TX: solscan.io/tx/${feeSig}`));
            }
            else {
                spinner.warn('Fee transfer failed');
            }
            const actualFee = actualProfit > 0 ? Math.max(actualProfit * FEE_PERCENTAGE, FIXED_FEE_SOL) : FIXED_FEE_SOL;
            const netAmount = actualProfit - actualFee;
            console.log();
            console.log(chalk_1.default.green.bold(`🎉 ARBITRAGE COMPLETE!`));
            if (netAmount > 0) {
                console.log(chalk_1.default.green(`💰 Your Net Profit: +${netAmount.toFixed(6)} SOL`));
            }
            else {
                console.log(chalk_1.default.red(`💸 Net Loss: ${netAmount.toFixed(6)} SOL (including ${actualFee.toFixed(4)} SOL fee)`));
            }
            console.log();
            return true;
        }
        catch (error) {
            spinner.fail('Arbitrage execution failed');
            console.error(chalk_1.default.red('Error details:'), error);
            return false;
        }
    }
    async startMonitoring() {
        this.isRunning = true;
        let scanCount = 0;
        console.log(chalk_1.default.green('\n🚀 Bot is now monitoring for arbitrage opportunities...\n'));
        console.log(chalk_1.default.cyan(`⚙️  Configuration:`));
        console.log(chalk_1.default.gray(`   Min Profit: ${this.config.minProfitPercentage}%`));
        console.log(chalk_1.default.gray(`   Trade Amount: ${this.config.tradeAmount} SOL`));
        console.log(chalk_1.default.gray(`   Slippage: ${this.config.slippage / 100}%`));
        console.log(chalk_1.default.gray(`   Wallet: ${this.wallet.publicKey.toString().substring(0, 8)}...`));
        console.log();
        while (this.isRunning) {
            try {
                scanCount++;
                const timestamp = new Date().toLocaleString();
                console.log(chalk_1.default.yellow(`\n${'='.repeat(80)}`));
                console.log(chalk_1.default.yellow(`🔍 Scan #${scanCount} - ${timestamp}`));
                console.log(chalk_1.default.yellow(`${'='.repeat(80)}\n`));
                const startTime = Date.now();
                const opportunities = await this.findArbitrageOpportunities();
                const scanDuration = ((Date.now() - startTime) / 1000).toFixed(2);
                console.log(chalk_1.default.cyan(`\n⏱️  Scan completed in ${scanDuration}s`));
                if (opportunities.length > 0) {
                    console.log(chalk_1.default.green(`\n💡 Found ${opportunities.length} profitable opportunities!\n`));
                    const oppTable = new cli_table3_1.default({
                        head: ['Rank', 'Path', 'Buy Price', 'Sell Price', 'Profit', 'Profit %', 'Action'],
                        style: { head: ['green'] },
                    });
                    opportunities.forEach((opp, idx) => {
                        oppTable.push([
                            `#${idx + 1}`,
                            `${opp.tokenA.symbol}→${opp.tokenB.symbol}→${opp.tokenA.symbol}`,
                            `${opp.buyPrice.toFixed(6)}`,
                            `${opp.sellPrice.toFixed(6)}`,
                            chalk_1.default.green(`+${opp.profit.toFixed(6)} SOL`),
                            chalk_1.default.green(`+${opp.profitPercentage.toFixed(3)}%`),
                            idx === 0 ? '⚡ EXECUTING' : '⏸️  Queued',
                        ]);
                    });
                    console.log(oppTable.toString());
                    console.log(chalk_1.default.yellow(`\n⚡ Executing best opportunity (#1)...`));
                    const success = await this.executeArbitrage(opportunities[0]);
                    if (success) {
                        console.log(chalk_1.default.green(`\n✅ Trade executed successfully!`));
                    }
                    else {
                        console.log(chalk_1.default.red(`\n❌ Trade execution failed`));
                    }
                }
                else {
                    console.log(chalk_1.default.yellow(`\n⚠️  No profitable opportunities found (Min: ${this.config.minProfitPercentage}%)`));
                    console.log(chalk_1.default.gray(`   Tip: Try lowering minProfitPercentage in config or wait for better market conditions`));
                }
                const waitTime = 30;
                console.log(chalk_1.default.gray(`\n⏳ Waiting ${waitTime}s before next scan...\n`));
                await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
            }
            catch (error) {
                console.error(chalk_1.default.red('\n❌ Error in monitoring loop:'), error);
                console.log(chalk_1.default.yellow('⏸️  Waiting 5s before retry...\n'));
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
    }
    stop() {
        this.isRunning = false;
        console.log(chalk_1.default.yellow('\n⏸ Bot stopped'));
    }
}
async function loadConfig() {
    try {
        const data = await fs_1.promises.readFile(CONFIG_FILE, 'utf-8');
        return JSON.parse(data);
    }
    catch {
        return null;
    }
}
async function saveConfig(config) {
    await fs_1.promises.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
}
async function setupWizard() {
    console.clear();
    console.log(gradient_string_1.default.pastel.multiline(figlet_1.default.textSync('Jupiter Arb Bot', {
        font: 'Standard',
        horizontalLayout: 'fitted',
    })));
    console.log(chalk_1.default.cyan('\n✨ Welcome to the Solana Arbitrage Bot Setup Wizard!\n'));
    const answers = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'rpcUrl',
            message: 'Enter your Solana RPC URL:',
            default: 'https://api.mainnet-beta.solana.com',
            validate: (input) => input.startsWith('http') || 'Please enter a valid URL',
        },
        {
            type: 'password',
            name: 'privateKey',
            message: 'Enter your wallet private key (base58):',
            validate: (input) => input.length > 0 || 'Private key is required',
        },
        {
            type: 'number',
            name: 'minProfitPercentage',
            message: 'Minimum profit percentage to execute arbitrage:',
            default: 1.0,
            validate: (input) => input > 0 || 'Must be greater than 0',
        },
        {
            type: 'number',
            name: 'tradeAmount',
            message: 'Trade amount per arbitrage (in SOL):',
            default: 0.1,
            validate: (input) => input > 0 || 'Must be greater than 0',
        },
        {
            type: 'number',
            name: 'slippage',
            message: 'Slippage tolerance (in basis points, 50 = 0.5%):',
            default: 50,
            validate: (input) => input >= 0 || 'Must be 0 or greater',
        },
    ]);
    await saveConfig(answers);
    console.log(chalk_1.default.green('\n✓ Configuration saved!\n'));
    return answers;
}
async function mainMenu(bot) {
    const { action } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: '🚀 Start Arbitrage Bot', value: 'start' },
                { name: '🔍 Scan for Opportunities', value: 'scan' },
                { name: '💼 Check Wallet Balance', value: 'balance' },
                { name: '⚙️  Reconfigure Settings', value: 'config' },
                { name: '🚪 Exit', value: 'exit' },
            ],
        },
    ]);
    return action;
}
async function main() {
    console.clear();
    console.log(gradient_string_1.default.pastel.multiline(figlet_1.default.textSync('Jupiter Arb Bot', {
        font: 'Standard',
        horizontalLayout: 'fitted',
    })));
    console.log();
    let config = await loadConfig();
    if (!config) {
        config = await setupWizard();
    }
    else {
        console.log(chalk_1.default.cyan('✨ Welcome back to Jupiter Arbitrage Bot!\n'));
    }
    const bot = new SolanaArbitrageBot(config);
    await bot.initialize();
    let running = true;
    while (running) {
        const action = await mainMenu(bot);
        switch (action) {
            case 'start':
                await bot.startMonitoring();
                break;
            case 'scan':
                const spinner = (0, ora_1.default)('Scanning for opportunities...').start();
                const opportunities = await bot.findArbitrageOpportunities();
                spinner.stop();
                if (opportunities.length === 0) {
                    console.log(chalk_1.default.yellow('\n❌ No opportunities found\n'));
                }
                else {
                    const table = new cli_table3_1.default({
                        head: ['Token A', 'Token B', 'Profit', 'Profit %'],
                        style: { head: ['cyan'] },
                    });
                    opportunities.forEach((opp) => {
                        table.push([
                            opp.tokenA.symbol,
                            opp.tokenB.symbol,
                            `${opp.profit.toFixed(4)} SOL`,
                            `${opp.profitPercentage.toFixed(2)}%`,
                        ]);
                    });
                    console.log('\n' + table.toString() + '\n');
                }
                break;
            case 'balance':
                const balance = await bot['connection'].getBalance(bot['wallet'].publicKey);
                console.log(chalk_1.default.green(`\n💰 Wallet Balance: ${(balance / web3_js_1.LAMPORTS_PER_SOL).toFixed(4)} SOL\n`));
                break;
            case 'config':
                config = await setupWizard();
                const newBot = new SolanaArbitrageBot(config);
                await newBot.initialize();
                Object.assign(bot, newBot);
                break;
            case 'exit':
                console.log(chalk_1.default.cyan('\n👋 Goodbye!\n'));
                running = false;
                break;
        }
    }
    process.exit(0);
}
process.on('SIGINT', () => {
    console.log(chalk_1.default.yellow('\n\n⏸ Shutting down gracefully...\n'));
    process.exit(0);
});
main().catch(console.error);
