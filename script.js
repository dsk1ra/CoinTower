async function renderChart(crypto, canvasId) {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7&interval=daily`);
    const data = await response.json();
    const prices = data.prices.map(price => price[1]);

    console.log(prices);

    const firstDayValue = prices[0];
    const lastDayValue = prices[prices.length - 1];
    const isRisen = lastDayValue > firstDayValue;

    const chartData = {
      labels: prices.map((entry) => new Date(entry[0]).toLocaleDateString()),
      datasets: [{
        data: prices,
        borderColor: isRisen ? 'green' : 'red',
        backgroundColor: isRisen ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)',
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



async function fetchCryptocurrencyData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether');
    const data = await response.json();

    // Update the table with the fetched data
    const table = document.querySelector('.cryptocurrencies-table-class');
    const rows = table.querySelectorAll('.table-element');

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cryptoName = row.querySelector('.cryptocurrency').innerText.trim().toLowerCase();

      if (cryptoName === 'bitcoin') {
        const updated = row.querySelector('.btc-updated');
        const change = row.querySelector('.btc-change');
        const price = row.querySelector('.btc-price');

        updated.innerText = data[0].last_updated;
        change.innerText = data[0].price_change_percentage_24h.toFixed(2) + '%';
        price.innerText = data[0].current_price.toFixed(2);

        // Update the transaction-logo image for Bitcoin
        const cryptoLogo = document.createElement('img');
        cryptoLogo.src = data[i].image;
        cryptoLogo.alt = cryptoName;
        cryptoLogo.className = 'transaction-logo';

        const cryptoLogoContainer = row.querySelector('.transaction-logo');
        cryptoLogoContainer.parentNode.replaceChild(cryptoLogo, cryptoLogoContainer);
      } else if (cryptoName === 'ethereum') {
        const updated = row.querySelector('.eth-updated');
        const change = row.querySelector('.eth-change');
        const price = row.querySelector('.eth-price');

        updated.innerText = data[1].last_updated;
        change.innerText = data[1].price_change_percentage_24h.toFixed(2) + '%';
        price.innerText = data[1].current_price.toFixed(2);

        // Update the transaction-logo image for Ethereum
        const cryptoLogo = document.createElement('img');
        cryptoLogo.src = data[1].image;
        cryptoLogo.alt = cryptoName;
        cryptoLogo.className = 'transaction-logo';

        const cryptoLogoContainer = row.querySelector('.transaction-logo');
        cryptoLogoContainer.parentNode.replaceChild(cryptoLogo, cryptoLogoContainer);
      } else if (cryptoName === 'tether') {
        const updated = row.querySelector('.usdt-updated');
        const change = row.querySelector('.usdt-change');
        const price = row.querySelector('.usdt-price');

        updated.innerText = data[2].last_updated;
        change.innerText = data[2].price_change_percentage_24h.toFixed(2) + '%';
        price.innerText = data[2].current_price.toFixed(2);

        // Update the transaction-logo image for Tether
        const cryptoLogo = document.createElement('img');
        cryptoLogo.src = data[2].image;
        cryptoLogo.alt = cryptoName;
        cryptoLogo.className = 'transaction-logo';

        const cryptoLogoContainer = row.querySelector('.transaction-logo');
        cryptoLogoContainer.parentNode.replaceChild(cryptoLogo, cryptoLogoContainer);
      }
    }
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
  }
}

async function updateActivityTableLogos() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=litecoin%2Cbitcoin%2Cethereum');
    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }
    const data = await response.json();

    const table = document.querySelector('.activity-table-class');
    const rows = table.querySelectorAll('.table-element');

    rows.forEach((row, index) => {
      const cryptoName = row.querySelector('.transactions').innerText.trim().toLowerCase();
      const logoContainer = row.querySelector('.transaction-logo');

      if (index === 0) {
        logoContainer.src = data[2].image; // Litecoin
        logoContainer.alt = cryptoName;
      } else if (index === 1) {
        logoContainer.src = data[0].image; // Bitcoin
        logoContainer.alt = cryptoName;
      } else if (index === 2) {
        logoContainer.src = data[1].image; // Ethereum
        logoContainer.alt = cryptoName;
      }
    });
  } catch (error) {
    console.error('Error updating activity table logos:', error);
  }
}

updateActivityTableLogos();
fetchCryptocurrencyData();
