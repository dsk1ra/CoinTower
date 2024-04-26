async function fetchCryptocurrencyData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether', {
      mode: 'no-cors' // Added 'no-cors' mode here
    });
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
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=litecoin%2Cbitcoin%2Cethereum', {
      mode: 'no-cors' // Added 'no-cors' mode here
    });
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