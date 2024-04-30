
const paymentHistoryBody = document.getElementById('payment-history-body');

const paymentHistoryData = [
  {
    id: "bitcoin",
    logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    market_cap: "125,516,307,278.00",
    total_volume: "16,801,603,195.00",
    price_change_percentage_24h: "1.34",
    current_price: "63,778.00"
  },
  {
    id: "ethereum",
    logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    market_cap: "404,504,655,682.00",
    total_volume: "132,924,491,140.00",
    price_change_percentage_24h: "6.44",
    current_price: "3,313.68"
  },
  {
    id: "tether",
    logo: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    market_cap: "110,510,209,228.00",
    total_volume: "18,074,740,735.00",
    price_change_percentage_24h: "-0.01",
    current_price: "0.999504"
  },
  {
    id: "binancecoin",
    logo: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
    market_cap: "92,496,167,059.00",
    total_volume: "7,692,393,360.00",
    price_change_percentage_24h: "1.39",
    current_price: "601.84"
  },
  {
    id: "solana",
    logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756",
    market_cap: "63,893,006,546.00",
    total_volume: "23,494,671,000.00",
    price_change_percentage_24h: "4.83",
    current_price: "142.78"
  },
  {
    id: "usd-coin",
    logo: "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    market_cap: "33,496,860,309.00",
    total_volume: "44,404,163,940.00",
    price_change_percentage_24h: "0.03",
    current_price: "1.00"
  },
  {
    id: "staked-ether",
    logo: "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
    market_cap: "30,971,802,318.00",
    total_volume: "9,169,900,500.00",
    price_change_percentage_24h: "6.47",
    current_price: "3,312.35"
  },
  {
    id: "ripple",
    logo: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    market_cap: "28,821,330,200.00",
    total_volume: "5,249,026,690.00",
    price_change_percentage_24h: "1.47",
    current_price: "0.521576"
  },
  {
    id: "dogecoin",
    logo: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    market_cap: "21,511,200,248.00",
    total_volume: "7,173,912,310.00",
    price_change_percentage_24h: "2.95",
    current_price: "0.149257"
  },
  {
    id: "the-open-network",
    logo: "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png?1696517498",
    market_cap: "19,239,761,284.00",
    total_volume: "156,984,247.00",
    price_change_percentage_24h: "5.31",
    current_price: "5.54"
  }
];

paymentHistoryData.forEach(payment => {
  const row = document.createElement('tr');
  row.className = 'table-element';

  const idCell = document.createElement('td');
  idCell.className = 'cryptocurrency';
  const idImg = document.createElement('img');
  idImg.className = 'transaction-logo';
  idImg.src = payment.logo; // Fetch logo URL from paymentHistoryData
  idCell.appendChild(idImg);
  idCell.appendChild(document.createTextNode(payment.id));
  row.appendChild(idCell);

  const marketCapCell = document.createElement('td');
  marketCapCell.className = 'amount';
  marketCapCell.textContent = payment.market_cap;
  row.appendChild(marketCapCell);

  const totalVolumeCell = document.createElement('td');
  totalVolumeCell.className = 'total';
  totalVolumeCell.textContent = payment.total_volume;
  row.appendChild(totalVolumeCell);

  const priceChangePercentageCell = document.createElement('td');
  priceChangePercentageCell.className = 'status';
  priceChangePercentageCell.textContent = payment.price_change_percentage_24h;
  row.appendChild(priceChangePercentageCell);

  const priceCell = document.createElement('td');
  priceCell.className = 'price';
  priceCell.textContent = `$${payment.current_price}`;
  row.appendChild(priceCell);

  paymentHistoryBody.appendChild(row);
});