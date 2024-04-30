async function fetchAndUpdateCryptocurrencyData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,optimism,pepe');
    const data = await response.json();

    const cryptocurrencyTable = document.querySelector('.cryptocurrencies-table-class');
    const cryptocurrencyRows = cryptocurrencyTable.querySelectorAll('.table-element');

    const cryptoDataMapCryptocurrencies = data.reduce((map, crypto) => {
      map[crypto.id.toLowerCase()] = crypto;
      return map;
    }, {});

    cryptocurrencyRows.forEach((row) => {
      const cryptoName = row.querySelector('.cryptocurrency')?.innerText.trim().toLowerCase();
      const cryptoData = cryptoDataMapCryptocurrencies[cryptoName];

      if (cryptoData) {
        const updated = row.querySelector(`.${cryptoName}-updated`);
        const change = row.querySelector(`.${cryptoName}-change`);
        const price = row.querySelector(`.${cryptoName}-price`);
        const cryptoLogoContainer = row.querySelector('.transaction-logo');

        if (updated) {
          const lastUpdated = typeof cryptoData.last_updated === 'string'
            ? Date.parse(cryptoData.last_updated) / 1000
            : cryptoData.last_updated;

          if (typeof lastUpdated === 'number') {
            const now = Date.now() / 1000; // convert to seconds
            const elapsedSeconds = now - lastUpdated;
            const minutesAgo = Math.floor(elapsedSeconds / 60);
            if (minutesAgo === 0) {
              updated.innerText = 'Just now';
            } else {
              updated.innerText = `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
            }
          } else {
            updated.innerText = 'Invalid timestamp';
          }
        }

        if (change) {
          change.innerText = cryptoData.price_change_percentage_24h.toFixed(2) + '%';
        }

        if (price) {
          price.innerText = `$${Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 7 }).format(cryptoData.current_price)}`;
        }

        if (cryptoLogoContainer) {
          const cryptoLogo = document.createElement('img');
          cryptoLogo.src = cryptoData.image;
          cryptoLogo.alt = cryptoName;
          cryptoLogo.className = 'transaction-logo';
          cryptoLogoContainer.parentNode.replaceChild(cryptoLogo, cryptoLogoContainer);
        }
      }
    });
  } catch (error) {
    console.error('Error fetching and updating cryptocurrency data:', error);
  }
}

fetchAndUpdateCryptocurrencyData();