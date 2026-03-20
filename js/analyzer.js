/**
 * Mock Analyzer Module for StockInsight
 * Generates realistic-looking financial and technical analysis data.
 */

const Analyzer = {
    
    generateData: function(ticker) {
        // Normalize ticker
        ticker = ticker.toUpperCase();

        // 1. Generate Basic Price Info
        const basePrice = Math.random() * 500 + 50; // Random price between $50 and $550
        const changePercent = (Math.random() * 10) - 4; // -4% to +6%
        const isPositive = changePercent >= 0;
        
        // 2. Generate Scores
        // Bias towards positive scores for demo effect unless 'SELL' is in ticker
        let aiScore = Math.floor(Math.random() * 40) + 60; // 60-99
        if (ticker.includes('SELL')) aiScore = Math.floor(Math.random() * 40) + 20;

        const financialScore = Math.floor(Math.random() * 30) + 70; // 70-99
        const technicalScore = Math.floor(Math.random() * 40) + 50; // 50-90

        // 3. Determine Verdict
        let verdict = "Hold";
        if (aiScore > 80) verdict = "Strong Buy";
        else if (aiScore > 65) verdict = "Buy";
        else if (aiScore < 40) verdict = "Sell";

        // 4. Generate Chart Data
        const priceHistory = this.generatePriceHistory(basePrice);
        const financials = this.generateFinancials();

        // 5. Generate Textual Summary
        const summary = `
            ${ticker} shows <strong>${verdict.toLowerCase()}</strong> signals based on our AI analysis. 
            The company demonstrates strong financial health with a score of ${financialScore}/100, driven by robust revenue growth. 
            Technically, the stock is showing ${technicalScore > 70 ? 'bullish momentum' : 'consolidation patterns'}, 
            suggesting a potential ${technicalScore > 70 ? 'breakout' : 'stabilization'} in the near term.
        `;

        return {
            ticker: ticker,
            name: this.getCompanyName(ticker),
            price: basePrice.toFixed(2),
            change: changePercent.toFixed(2),
            isPositive: isPositive,
            scores: {
                ai: aiScore,
                financial: financialScore,
                technical: technicalScore
            },
            metrics: {
                revenue: financialScore > 80 ? "High Growth" : "Stable",
                margin: financialScore > 70 ? "Healthy" : "Compressed",
                debt: financialScore > 60 ? "Low" : "Moderate",
                rsi: technicalScore > 70 ? "Overbought" : (technicalScore < 30 ? "Oversold" : "Neutral"),
                macd: technicalScore > 60 ? "Bullish Crossover" : "Neutral",
                trend: technicalScore > 50 ? "Upward" : "Sideways"
            },
            verdict: verdict,
            summary: summary,
            charts: {
                price: priceHistory,
                financials: financials
            }
        };
    },

    generatePriceHistory: function(currentPrice) {
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const data = [];
        let price = currentPrice * 0.8; // Start 20% lower

        for (let i = 0; i < 12; i++) {
            // Random walk
            price = price * (1 + (Math.random() * 0.1 - 0.04));
            data.push(price.toFixed(2));
        }
        // Ensure last point is close to current price
        data[data.length - 1] = currentPrice;
        
        return {
            labels: labels,
            data: data
        };
    },

    generateFinancials: function() {
        // Mock Revenue and Earnings for 4 quarters
        return {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            revenue: [100, 110, 115, 125].map(x => x * (Math.random() + 0.5)),
            earnings: [20, 25, 28, 35].map(x => x * (Math.random() + 0.5))
        };
    },

    getCompanyName: function(ticker) {
        const names = {
            'AAPL': 'Apple Inc.',
            'TSLA': 'Tesla, Inc.',
            'NVDA': 'NVIDIA Corporation',
            'MSFT': 'Microsoft Corporation',
            'GOOGL': 'Alphabet Inc.',
            'AMZN': 'Amazon.com, Inc.',
            'META': 'Meta Platforms, Inc.',
            'NFLX': 'Netflix, Inc.',
            'AMD': 'Advanced Micro Devices'
        };
        return names[ticker] || `${ticker} Corp.`; // Fallback
    }
};
