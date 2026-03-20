document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const tickerInput = document.getElementById('tickerInput');
    const searchBtn = document.getElementById('searchBtn');
    const errorMessage = document.getElementById('errorMessage');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    const resultsSection = document.getElementById('resultsSection');
    const heroSection = document.querySelector('.hero');
    const emailForm = document.getElementById('emailForm');
    const emailSuccess = document.getElementById('emailSuccess');

    // Chart Instances
    let priceChartInstance = null;
    let financialChartInstance = null;

    // Event Listeners
    searchBtn.addEventListener('click', handleSearch);
    tickerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate email sending
        const btn = emailForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            emailSuccess.classList.remove('hidden');
            emailForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                emailSuccess.classList.add('hidden');
            }, 5000);
        }, 1500);
    });

    // Main Search Handler
    function handleSearch() {
        const ticker = tickerInput.value.trim();
        
        // Basic Validation
        if (!ticker || ticker.length < 2) {
            errorMessage.style.display = 'block';
            return;
        }
        errorMessage.style.display = 'none';

        // Start Loading Sequence
        loadingOverlay.classList.remove('hidden');
        
        // Simulate Analysis Steps
        const steps = [
            "Connecting to market exchanges...",
            "Fetching 10-K and 10-Q reports...",
            "Analyzing technical indicators (RSI, MACD)...",
            "Calculating AI Score..."
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < steps.length) {
                loadingText.innerText = steps[stepIndex];
                stepIndex++;
            }
        }, 800);

        // Finish Analysis after 3.5 seconds
        setTimeout(() => {
            clearInterval(interval);
            const data = Analyzer.generateData(ticker);
            renderResults(data);
            
            loadingOverlay.classList.add('hidden');
            heroSection.style.display = 'none'; // Optional: hide hero or keep it
            resultsSection.classList.remove('hidden');
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });

        }, 3500);
    }

    // Render Data to DOM
    function renderResults(data) {
        // Header
        document.getElementById('stockName').innerText = data.name;
        document.getElementById('stockTicker').innerText = data.ticker;
        document.getElementById('stockPrice').innerText = `$${data.price}`;
        
        const changeEl = document.getElementById('stockChange');
        changeEl.innerText = `${data.isPositive ? '+' : ''}${data.change}%`;
        changeEl.className = `change ${data.isPositive ? 'positive' : 'negative'}`;

        // Scores
        document.getElementById('aiScoreValue').innerText = data.scores.ai;
        document.getElementById('financialScoreText').innerText = `${data.scores.financial}/100`;
        document.getElementById('financialScoreBar').style.width = `${data.scores.financial}%`;
        
        document.getElementById('technicalScoreText').innerText = `${data.scores.technical}/100`;
        document.getElementById('technicalScoreBar').style.width = `${data.scores.technical}%`;

        // Metrics
        document.getElementById('revenueMetric').innerText = data.metrics.revenue;
        document.getElementById('marginMetric').innerText = data.metrics.margin;
        document.getElementById('debtMetric').innerText = data.metrics.debt;
        
        document.getElementById('rsiMetric').innerText = data.metrics.rsi;
        document.getElementById('macdMetric').innerText = data.metrics.macd;
        document.getElementById('trendMetric').innerText = data.metrics.trend;

        // Summary
        document.getElementById('analysisText').innerHTML = data.summary;

        // Render Charts
        renderPriceChart(data.charts.price);
        renderFinancialChart(data.charts.financials);
    }

    function renderPriceChart(chartData) {
        const ctx = document.getElementById('priceChart').getContext('2d');
        
        if (priceChartInstance) {
            priceChartInstance.destroy();
        }

        priceChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Price ($)',
                    data: chartData.data,
                    borderColor: '#64ffda',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: '#f0f0f0' } }
                }
            }
        });
    }

    function renderFinancialChart(financials) {
        const ctx = document.getElementById('financialChart').getContext('2d');
        
        if (financialChartInstance) {
            financialChartInstance.destroy();
        }

        financialChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: financials.labels,
                datasets: [
                    {
                        label: 'Revenue ($M)',
                        data: financials.revenue,
                        backgroundColor: '#0a192f'
                    },
                    {
                        label: 'Earnings ($M)',
                        data: financials.earnings,
                        backgroundColor: '#64ffda'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

});
