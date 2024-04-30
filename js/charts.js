async function renderChart(crypto, canvasId) {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7&interval=daily`);
      const data = await response.json();
      const prices = data.prices.map(price => price[1]);
  
      console.log(prices);
  
      const chartData = {
        labels: prices.map((entry) => new Date(entry[0]).toLocaleDateString()),
        datasets: [{
          data: prices,
          borderColor: 'rgba(255, 187, 0, 1)',
          backgroundColor: 'rgba(255, 187, 0, 0.3)',
          fill: true,
          pointRadius: 0,
          borderWidth: 2,
          borderCapStyle: 'round'
        }]
      };
  
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        },
        plugins: {
          tooltip: {
            enabled: false
          },
          legend: {
            display: false
          }
        },
        elements: {
          line: {
            tension: 0.4
          },
          point: {
            radius: 0
          },
          rectangle: {
            borderRadius: 10
          }
        }
      };
      
  
      const ctx = document.getElementById(canvasId).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  renderChart('ethereum','chart-1');
  renderChart('solana', 'chart-2');
  renderChart('tron', 'chart-3');
  