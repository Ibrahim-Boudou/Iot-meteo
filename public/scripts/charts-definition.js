// Create the charts when the web page loads
window.addEventListener('load', onload);
//const dataPath = 'UsersData/hCNUKL5tIG0XtPHY7eSCABPja832/readings'; 
const dataPath = '/UsersData/hcNUkL5tIGOXtPHY7eSCABPja832/readings';
const databaseRef = firebase.database().ref(dataPath);

function onload(event){
  chartT = createTemperatureChart();
  chartH = createHumidityChart();
  chartP = createPressureChart();
}

// Create Temperature Chart
function createTemperatureChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-temperature',
      type: 'spline' 
    },
    series: [
      {
        name: 'BME280'
      }
    ],
    title: { 
      text: undefined
    },
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'Temperature Celsius Degrees' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}

// Create Humidity Chart
function createHumidityChart(){
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-humidity',
      type: 'spline'  
    },
    series: [{
      name: 'BME280'
    }],   
    title: { 
      text: undefined
    },    
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      },
      series: { 
        color: '#50b8b4' 
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'Humidity (%)' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}

// Create Pressure Chart
function createPressureChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-pressure',
      type: 'spline'  
    },
    series: [{
      name: 'BME280'
    }],
    title: { 
      text: undefined
    },    
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      },
      series: { 
        color: '#A62639' 
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'Pressure (hPa)' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}
//--------------------------------------------//
databaseRef.limitToLast(20).on('child_added', function(snapshot) {
  var data = snapshot.val();
  var timestamp = Number(data.timestamp) * 1000; // Conversion en millisecondes
  var temperature = Number(data.temperature);
  var humidity = Number(data.humidity);
  var pressure = Number(data.pressure);

  if (!isNaN(temperature)) {
    chartT.series[0].addPoint([timestamp, temperature], true, chartT.series[0].data.length > 20);
  }

  if (!isNaN(humidity)) {
    chartH.series[0].addPoint([timestamp, humidity], true, chartH.series[0].data.length > 20);
  }

  if (!isNaN(pressure)) {
    chartP.series[0].addPoint([timestamp, pressure], true, chartP.series[0].data.length > 20);
  }
});
