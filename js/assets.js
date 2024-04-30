document.addEventListener('DOMContentLoaded', function () {
    var tableElements = document.querySelectorAll('.table-element');
    var data = [];
    var labels = [];

    for (var i = 0; i < tableElements.length; i++) {
        var totalElement = tableElements[i].querySelector('.total');
        var assetLineElement = tableElements[i].querySelector('.asset-line');
    
        if (totalElement && assetLineElement) {
            var total = totalElement.textContent;
            total = total.replace(/\$/g, '').replace(/,/g, '');
            data.push(parseFloat(total));
    
            var assetLine = assetLineElement.textContent;
            labels.push(assetLine.trim()); // trim to remove any whitespace
        }
    }

    var ctx = document.getElementById('balanceChart').getContext('2d');
    var balanceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels, // use the extracted labels
            datasets: [{
                label: '# of Coins',
                data: data,
                backgroundColor: [
                    'rgba(247, 147, 26, 0.2)',
                    'rgba(142, 118, 255, 0.2)',
                    'rgba(130, 71, 229, 0.2)',
                    'rgba(232, 65, 66, 0.2)',
                    'rgba(101, 141, 71, 0.2)'
                ],
                borderColor: [
                    'rgba(247, 147, 26, 1)',
                    'rgba(142, 118, 255, 1)',
                    'rgba(130, 71, 229, 1)',
                    'rgba(232, 65, 66, 1)',
                    'rgba(101, 141, 71, 1)'
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
                    display: false,
                    position: 'left',
                    labels: {
                        boxWidth: 10,
                        padding: 5,
                        color: '#FFFFFF',
                        generateLabels: function (chart) {
                            var data = chart.data;
                            var labels = data.labels;
                            var datasets = data.datasets;
                            var dataset = datasets[0];
                            var backgroundColor = dataset.backgroundColor;
                            var data = dataset.data;
                            var sum = data.reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            var percent = data.map(function (value) {
                                return Math.round(value / sum * 100) + '%';
                            });
                            return labels.map(function (label, index) {
                                return {
                                    text: label + ' - ' + percent[index],
                                    fillStyle: backgroundColor[index],
                                    hidden:!chart.getDataVisibility(index),
                                    index: index
                                };
                            });
                        }
                    },

                    left: 10
                }
            },
            cutout: 40
        }
    });
});
const totalBalanceSpan = document.querySelector('.calculate-total');
const totalCells = document.querySelectorAll('.total');

let totalBalance = 0;

totalCells.forEach(cell => {
    const totalValue = parseFloat(cell.textContent.replace(/\$/g, '').replace(/,/g, ''));
    if (!isNaN(totalValue)) {
        totalBalance += totalValue;
    }
});

totalBalanceSpan.textContent = `$${totalBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;