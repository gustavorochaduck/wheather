// Obtenha o contexto do canvas
var ctx = document.getElementById('weatherChart').getContext('2d');

// Faça uma solicitação à API Open-Meteo
fetch('https://api.open-meteo.com/v1/dwd-icon?latitude=50.0565&longitude=8.5925&hourly=temperature_2m,rain,showers,snowfall,cloud_cover&daily=rain_sum,showers_sum,snowfall_sum&timezone=Europe%2FBerlin')
    .then(response => response.json())
    .then(data => {
        // Extrair os dados relevantes para o gráfico
        var hourlyTemperature = data.hourly.temperature_2m;
        var hourlyRain = data.hourly.rain;
        var hourlyShowers = data.hourly.showers;
        var hourlySnowfall = data.hourly.snowfall;

        // Configuração do gráfico
        var weatherChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: hourlyTemperature.map(entry => entry.timestamp_local),
                datasets: [{
                    label: 'Temperatura (°C)',
                    data: hourlyTemperature.map(entry => entry.value),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    yAxisID: 'temperature'
                }, {
                    label: 'Chuva (mm)',
                    data: hourlyRain.map(entry => entry.value),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    yAxisID: 'precipitation'
                }, {
                    label: 'Aguaceiros (mm)',
                    data: hourlyShowers.map(entry => entry.value),
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    yAxisID: 'precipitation'
                }, {
                    label: 'Neve (mm)',
                    data: hourlySnowfall.map(entry => entry.value),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    yAxisID: 'precipitation'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    temperature: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Temperatura (°C)'
                        }
                    },
                    precipitation: {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Precipitação (mm)'
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Erro ao obter dados da API:', error));