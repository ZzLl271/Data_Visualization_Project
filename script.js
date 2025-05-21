// Wait for DOM content to load before initializing charts
document.addEventListener('DOMContentLoaded', function () {
    // Air quality dataset for visualization
    const airQualityData = {
        pm25: {
            '2019': { annual: 9.3 },
            '2020': { summer: 7.8, winter: 9.9, annual: 8.8 }
        },
        no2: {
            '2019': { annual: 15.3 },
            '2020': { annual: 14.1 }
        }
    };

    // Initialize horizontal bar chart for pollutant comparison
    const barCtx = document.getElementById('horizontalBarChart').getContext('2d');
    const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['PM2.5 (2019)', 'NO2 (2019)', 'PM2.5 (2020)', 'NO2 (2020)'],
            datasets: [{
                label: 'Concentration (μg/m³)',
                data: [
                    airQualityData.pm25['2019'].annual,
                    airQualityData.no2['2019'].annual,
                    airQualityData.pm25['2020'].annual,
                    airQualityData.no2['2020'].annual
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',  // PM2.5 2019 (red)
                    'rgba(54, 162, 235, 0.7)',  // NO2 2019 (blue)
                    'rgba(255, 99, 132, 0.4)',  // PM2.5 2020 (lighter red)
                    'rgba(54, 162, 235, 0.4)'   // NO2 2020 (lighter blue)
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',  // Horizontal bars
            responsive: true,  // Responsive to window resize
            maintainAspectRatio: false,  // Disable fixed aspect ratio
            plugins: {
                legend: {
                    position: 'top',  // Position legend at the top
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Concentration: ${context.raw} μg/m³`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,  // Start x-axis at 0
                    title: {
                        display: true,
                        text: 'Concentration (μg/m³)'
                    }
                },
                y: {
                    grid: {
                        display: false  // Hide y-axis grid lines
                    }
                }
            }
        }
    });

    // Initialize doughnut chart for PM2.5 seasonal distribution
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    const doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Summer 2020', 'Winter 2020', 'Annual Average'],
            datasets: [{
                label: 'PM2.5 Concentration',
                data: [
                    airQualityData.pm25['2020'].summer,
                    airQualityData.pm25['2020'].winter,
                    airQualityData.pm25['2020'].annual
                ],
                backgroundColor: [
                    'rgba(255, 205, 86, 0.7)',  // Summer (warm color)
                    'rgba(54, 162, 235, 0.7)',  // Winter (cool color)
                    'rgba(75, 192, 192, 0.7)'   // Annual Average (neutral)
                ],
                borderColor: [
                    'rgb(255, 205, 86)',
                    'rgb(54, 162, 235)',
                    'rgb(75, 192, 192)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',  // Position legend on the right
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw} μg/m³`;
                        }
                    }
                }
            },
            cutout: '65%'  // Doughnut hole size
        }
    });

    // Handle chart resize on window resize
    window.addEventListener('resize', function () {
        barChart.resize();
        doughnutChart.resize();
    });
});