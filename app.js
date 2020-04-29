google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

let covidDailyData = [["Day", "Active Cases", "Deaths", "Recoveries"]];
getCovidCasesData();

function drawChart() {
  var data = google.visualization.arrayToDataTable(covidDailyData);

  var options = {
    title: "Philippines Covid 19 Curve Chart",
    curveType: "none",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("curve_chart")
  );

  chart.draw(data, options);
}

// create function to return [day, cases, recoveries, deaths]
function getCovidCasesData() {
  fetch("https://coronavirus-ph-api.herokuapp.com/doh-data-drop")
    .then((response) => response.json())
    .then((data) => {
      // start date - now loop
      let countDailyCase = 0;
      let countDailyCaseDeath = 0;
      let countDailyCaseRecoveries = 0;
      var now = new Date();
      let lastIndex = 0;

      for (
        var d = new Date("2020-01-30");
        d <= now;
        d.setDate(d.getDate() + 1)
      ) {
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
        covidDailyData.push([
          d.toString(),
          countDailyCase,
          countDailyCaseDeath,
          countDailyCaseRecoveries,
        ]);
      }
    })
    .catch((err) => console.log(err));
}
// total cases
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

getTotalCase();
function getTotalCase() {
  fetch("https://coronavirus-ph-api.herokuapp.com/total")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      cases.innerHTML = data.data.cases;
      deaths.innerHTML = data.data.deaths;
      recoveries.innerHTML = data.data.recoveries;
      admitted.innerHTML = data.data.admitted;
      fatality.innerHTML = data.data.fatality_rate;
      recovery.innerHTML = data.data.recovery_rate;
      deathsToday.innerHTML = data.data.deaths_today;
      recoveriesToday.innerHTML = data.data.recoveries_today;
      casesToday.innerHTML = data.data.cases_today;
      source.setAttribute("src", data.source);
      source.innerHTML = data.source;
      updated.forEach((update) => (update.innerHTML = data.data.last_update));
    });
}
