import Chart from "chart.js/auto";
export { renderChart };

function renderChart(chartInstance, foodData, chartType) {
  chartInstance?.destroy();
  const selector = chartType + "-chart";
  const idSelector = "#" + selector;
  const container = document.querySelector("[chartId='" + selector + "']");
  const chart = container.shadowRoot.querySelector(idSelector);

  if (chartType == "bar") {
    return renderBarChart(chartInstance, foodData, chart);
  }
  return renderPieChart(chartInstance, foodData, chart);
}

function renderBarChart(chartInstance, foodData, chart) {
  chartInstance = new Chart(chart, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          data: [
            foodData.getTotalMacro("carbs"),
            foodData.getTotalMacro("protein"),
            foodData.getTotalMacro("fat"),
          ],
          label: "Calories",
          backgroundColor: ["#25AEEE", "#FECD52", "#57D269"],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
        },
      },
    },
  });
  return chartInstance;
}
function renderPieChart(chartInstance, foodData, chart) {
  chartInstance = new Chart(chart, {
    type: "pie",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          data: [
            foodData.getTotalMacro("carbs"),
            foodData.getTotalMacro("protein"),
            foodData.getTotalMacro("fat"),
          ],
          label: "Calories",
          backgroundColor: ["#25AEEE", "#FECD52", "#57D269"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Macros",
        },
      },
    },
  });
  return chartInstance;
}
