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

getTotalCase();
