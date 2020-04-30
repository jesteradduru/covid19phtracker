google.charts.load("current", { packages: ["corechart"] });
let covidDailyData = [["Day", "Confirmed Cases", "Deaths", "Recoveries"]];
const cases = document.getElementById("cases");
const casesToday = document.getElementById("cases-today");
const deaths = document.getElementById("deaths");
const deathsToday = document.getElementById("deaths-today");
const recoveries = document.getElementById("recoveries");
const recoveriesToday = document.getElementById("recoveries-today");
const admitted = document.getElementById("admitted");
const fatality = document.getElementById("fatality");
const recovery = document.getElementById("recovery");
const source = document.getElementById("source");
const updated = document.querySelectorAll(".date-updated");
let chartLastUpdated = "";

async function getTotalCase() {
  totalCases(false);
  const res = await fetch("https://coronavirus-ph-api.herokuapp.com/total");
  const data = await res.json();

  cases.innerHTML = data.data.cases;
  deaths.innerHTML = data.data.deaths;
  recoveries.innerHTML = data.data.recoveries;
  admitted.innerHTML = data.data.admitted;
  fatality.innerHTML = data.data.fatality_rate;
  recovery.innerHTML = data.data.recovery_rate;
  deathsToday.innerHTML = data.data.deaths_today;
  recoveriesToday.innerHTML = data.data.recoveries_today;
  casesToday.innerHTML = data.data.cases_today;
  updated.forEach((update) => (update.innerHTML = data.data.last_update));

  totalCases(true);
}

function totalCases(visibility) {
  const totalCases = document.getElementById("total-cases");
  const loadTotalCases = document.getElementById("load-total-cases");

  if (visibility === true) {
    totalCases.style.display = "block";
    loadTotalCases.style.display = "none";
  } else {
    loadTotalCases.style.display = "flex";
    totalCases.style.display = "none";
  }
}

function drawChart() {
  let data = google.visualization.arrayToDataTable(covidDailyData);

  let options = {
    title: "Philippines Covid 19 Curve Chart",
    curveType: "none",
    legend: { position: "bottom" },
    series: {
      0: { color: "#ffc40d" },
      1: { color: "#ee1111" },
      2: { color: "#00a300" },
    },
    chartArea: {
      width: 500,
    },
  };

  let chart = new google.visualization.LineChart(
    document.getElementById("curve_chart")
  );

  chart.draw(data, options);
}

function importDataToChart(data) {
  let countDailyCase = 0;
  let countDailyCaseDeath = 0;
  let countDailyCaseRecoveries = 0;
  var now = new Date();
  let lastIndex = 0;
  let covidDate = "";

  for (var d = new Date("2020-01-30"); d <= now; d.setDate(d.getDate() + 1)) {
    for (let i = lastIndex; i < data.data.length; i++) {
      let covidCaseDate = new Date(data.data[i].date_reported);
      if (d.getTime() === covidCaseDate.getTime()) {
        countDailyCase++;
        if (data.data[i].date_died != "") {
          countDailyCaseDeath++;
        } else if (data.data[i].recovered_on != "") {
          countDailyCaseRecoveries++;
        }
        lastIndex++;
      } else {
        lastIndex = i;
        break;
      }
    }
    let covidCaseDate = new Date(data.data[lastIndex - 1].date_reported);
    if (covidCaseDate.getTime() >= d.getTime()) {
      covidDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      chartLastUpdated = covidDate;
      covidDailyData.push([
        covidDate,
        countDailyCase,
        countDailyCaseDeath,
        countDailyCaseRecoveries,
      ]);
    }
  }

  document.getElementById("chart-last-updated").innerHTML = chartLastUpdated;
}

async function getCovidCasesData() {
  const res = await fetch(
    "https://coronavirus-ph-api.herokuapp.com/doh-data-drop"
  );
  const data = await res.json();
  importDataToChart(data);
  google.charts.setOnLoadCallback(drawChart);
}

getTotalCase();
getCovidCasesData();
