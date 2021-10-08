<template>
<div class="">
  <div class="mt-3">
  </div>
</div>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = 'w' + (i + 1).toString();
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}


export default {
  name: 'Home',

  data: () => ({
    width: 2,
    radius: 10,
    padding: 0,
    lineCap: 'round',
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,

    crumbs: [{
        text: 'Dashboard',
        disabled: false,
        // href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Link 1',
        disabled: false,
        // href: 'breadcrumbs_link_1',
      },
      {
        text: 'Link 2',
        disabled: true,
        // href: 'breadcrumbs_link_2',
      },
    ],

    options: {},
    series: [44, 55, 41, 17, 15],

    options2: {
      series: [
        { name: 'Metric1', data: generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric2', data: generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric3', data: generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric4', data: generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric5', data: generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric6', data: generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric7', data: generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric8', data: generateData(18, { min: 0, max: 90 }) },
        { name: 'Metric9', data: generateData(18, { min: 0, max: 90 }) }
      ],
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: 'HeatMap Chart (Single color)'
      },
    },


    options3: {
      series: [{
        type: 'boxPlot',
        data: [
          { x: 'Jan 2015', y: [54, 66, 69, 75, 88] },
          { x: 'Jan 2016', y: [43, 65, 69, 76, 81] },
          { x: 'Jan 2017', y: [31, 39, 45, 51, 59] },
          { x: 'Jan 2018', y: [39, 46, 55, 65, 71] },
          { x: 'Jan 2019', y: [29, 31, 35, 39, 44] },
          { x: 'Jan 2020', y: [41, 49, 58, 61, 67] },
          { x: 'Jan 2021', y: [54, 59, 66, 71, 88] }
        ]
      }],
      chart: {
        type: 'boxPlot',
        height: 350
      },
      title: {
        text: 'Basic BoxPlot Chart',
        align: 'left'
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: '#5C4742',
            lower: '#A5978B'
          }
        }
      }
    }

  }),
}
</script>
