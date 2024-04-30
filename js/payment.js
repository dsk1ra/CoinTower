
const paymentHistoryBody = document.getElementById('payment-history-body');

const paymentHistoryData = [
  {
    type: 'Dai Sent',
    logo: 'https://assets.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696509996',
    amount: '1,472.25',
    total_transaction: '$1,471.85',
    status: 'Processing',
    date: '20-04-2024'
  }, {
    type: 'Solana Purchased',
    logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756',
    amount: '12.10',
    total_transaction: '$1,660.32',
    status: 'Completed',
    date: '20-04-2024'
  }, {
    type: 'Solana Purchased',
    logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756',
    amount: '8.50',
    total_transaction: '$1,142.24',
    status: 'Completed',
    date: '20-04-2024'
  }, {
    type: 'Toncoin Converted',
    logo: 'https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png?1696517498',
    amount: '27.07',
    total_transaction: '$149.89',
    status: 'Completed',
    date: '20-04-2024'
  }, {
    type: 'Tether Converted',
    logo: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    amount: '150.00',
    total_transaction: '$149.89',
    status: 'Completed',
    date: '20-04-2024'
  }
];

paymentHistoryData.forEach(payment => {
  const row = document.createElement('tr');
  row.className = 'table-element';

  const typeCell = document.createElement('td');
  typeCell.className = 'cryptocurrency';
  const typeImg = document.createElement('img');
  typeImg.className = 'transaction-logo';
  typeImg.src = payment.logo; // Fetch logo URL from paymentHistoryData
  typeCell.appendChild(typeImg);
  typeCell.appendChild(document.createTextNode(payment.type));
  row.appendChild(typeCell);

  const amountCell = document.createElement('td');
  amountCell.className = 'amount';
  amountCell.textContent = payment.amount;
  row.appendChild(amountCell);

  const totalCell = document.createElement('td');
  totalCell.className = 'total';
  totalCell.textContent = payment.total_transaction;
  row.appendChild(totalCell);

  const statusCell = document.createElement('td');
  statusCell.className = 'status';
  statusCell.textContent = payment.status;
  row.appendChild(statusCell);

  const dateCell = document.createElement('td');
  dateCell.className = 'date';
  dateCell.textContent = payment.date;
  row.appendChild(dateCell);

  paymentHistoryBody.appendChild(row);
});