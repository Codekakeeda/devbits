import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: "Price",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 'auto',
        type: 'line', 
        toolbar: {
          show: false,
        },

        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        colors: "#333",
        curve: 'straight',
      },
      grid: {
        show: false,
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
      }
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={90} width={190} />
    </div>
  );
}

export default ApexChart;