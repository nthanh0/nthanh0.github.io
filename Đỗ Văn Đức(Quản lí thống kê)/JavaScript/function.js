
function setupLogout() {
    const logoutButton = document.getElementById('log-out');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            const confirmation = confirm('Bạn muốn đăng xuất không?');
            if (confirmation) {
                window.location.href = "../Hoàng Phú Dũng/login.html";
            } else {
                event.preventDefault();
            }
        });
    }
}

const ctx = document.getElementById('lineChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mục 1', 'Mục 2', 'Mục 3', 'Mục 4', 'Mục 5'],
        datasets: [
            {
                label: 'Chuỗi 1',
                data: [0, 12, 38, 30, 32],
                borderColor: 'rgb(0, 200, 200)',
                backgroundColor: 'rgb(0, 200, 200)',
                tension: 0.1
            },
            {
                label: 'Chuỗi 2', 
                data: [12, 5, 20, 15, 50],
                borderColor: 'rgb(75, 192, 255)',
                backgroundColor: 'rgb(75, 192, 255)',
                tension: 0.1
            },
            {
                label: 'Chuỗi 3',
                data: [18, 30, 25, 40, 42],
                borderColor: 'rgb(100, 150, 255)',
                backgroundColor: 'rgb(100, 150, 255)',
                tension: 0.1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Cho phép thay đổi tỷ lệ khung hình
        scales: {
            y: {
                beginAtZero: true,
                max: 50,
                ticks: {
                    stepSize: 10,
                    font: {
                        size: function(context) {
                            var width = context.chart.width;
                            if (width < 400) return 8;
                            if (width < 600) return 10;
                            return 12;
                        }
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    font: {
                        size: function(context) {
                            var width = context.chart.width;
                            if (width < 400) return 8;
                            if (width < 600) return 10;
                            return 12;
                        }
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: function(context) {
                            var width = context.chart.width;
                            if (width < 400) return 8;
                            if (width < 600) return 10;
                            return 12;
                        }
                    }
                }
            }
        }
    }
});
document.addEventListener('DOMContentLoaded', setupLogout);
window.addEventListener('beforeunload', e => e.preventDefault());
