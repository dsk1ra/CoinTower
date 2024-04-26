document.addEventListener('DOMContentLoaded', function () {
    // Select all of the table-element elements
    var tableElements = document.querySelectorAll('.table-element');

    // Create an empty array to store the data
    var data = [];

    // Loop through the table-element elements
    for (var i = 0; i < tableElements.length; i++) {
        // Extract the text content of the total class
        var total = tableElements[i].querySelector('.total').textContent;

        // Remove the dollar sign and commas from the total
        total = total.replace(/\$/g, '').replace(/,/g, '');

        // Add the total to the data array
        data.push(parseFloat(total));
    }

    // Create the chart with the data array
    var ctx = document.getElementById('balanceChart').getContext('2d');
    var balanceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Bitcoin (BTC)', 'Ether (ETH)', 'Litecoin (LTC)', 'Ripple (XRP)', 'Bitcoin Cash (BCH)'],
            datasets: [{
                label: '# of Coins',
                data: data,
                backgroundColor: [
                    'rgba(247, 147, 26, 0.2)',
                    'rgba(142, 118, 255, 0.2)',
                    'rgba(166, 169, 170, 0.2)',
                    'rgba(35, 41, 47, 0.2)',
                    'rgba(141, 195, 81, 0.2)'
                ],
                borderColor: [
                    'rgba(247, 147, 26, 1)',
                    'rgba(142, 118, 255, 1)',
                    'rgba(166, 169, 170, 1)',
                    'rgba(35, 41, 47, 1)',
                    'rgba(141, 195, 81, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true
                },
                legend: {
                    display: true,
                    position: 'left',
                    labels: {
                        boxWidth: 10,
                        padding: 5,
                        color: '#FFFFFF', 
                        generateLabels: function(chart) {
                            var data = chart.data;
                            var labels = data.labels;
                            var datasets = data.datasets;
                            var dataset = datasets[0];
                            var backgroundColor = dataset.backgroundColor;
                            var data = dataset.data;
                            var sum = data.reduce(function(a, b) {
                                return a + b;
                            }, 0);
                            var percent = data.map(function(value) {
                                return Math.round(value / sum * 100) + '%';
                            });
                            return labels.map(function(label, index) {
                                return {
                                    text: label + ' - ' + percent[index],
                                    fillStyle: backgroundColor[index],
                                    hidden:!chart.getDataVisibility(index),
                                    index: index
                                };
                            });
                        }
                    },
                    
                    left: 10 // Move the legend 10 pixels to the left
                }
            },
            cutout: 20
        }
    });
});
const idCopy = document.querySelector('.id-copy');

idCopy.addEventListener('click', () => {
  navigator.clipboard.writeText('123456');
  idCopy.classList.add('copied');
  setTimeout(() => {
    idCopy.classList.remove('copied');
  }, 1000);
});