/**
 * original code:
 * https://doctorcodetutorial.blogspot.com/2020/03/create-coronavirus-tracker-in.html
 */

const {render, html} = uhtml;

const API_BASE = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus';

// fetcher
const json = res => res.json();
const details = {
  headers: {
    'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
    // sign up in https://rapidapi.com/ to obtain yours
	  'x-rapidapi-key': '32e514149emsh2463c22b995ef96p19431ajsnf68d9fe53b5c'
  }
};
const grabJSON = (url, details) => fetch(url, details).then(json);

// cache buster & data
const grabData = () => [
  grabJSON(`${API_BASE}/worldstat.php`, details),
  grabJSON(`${API_BASE}/cases_by_country.php`, details)
];

// the API is showing badly counted numbers
// make this an empty string once numbers are back
const placeHolder = "";

// box wrapper
const boxWrapper = ({
  total_deaths,
  total_recovered,
  new_cases,
  new_deaths
}) => html`
  <div class="box_wrapper">
    <div class="box">
      <h2>Deaths</h2>
      <p>${placeHolder || total_deaths}</p>
    </div>
    <div class="box">
      <h2>Recovered</h2>
      <p>${placeHolder || total_recovered}</p>
    </div>
    <div class="box">
      <h2>New cases</h2>
      <p>${placeHolder || new_cases}</p>
    </div>
    <div class="box">
      <h2>New Deaths</h2>
      <p>${placeHolder || new_deaths}</p>
    </div>
  </div> 
`;

// country details
const sortKey = 'uhtml-covid-19-sort-name';
let sortName = localStorage.getItem(sortKey) || 'cases';
const sort = (event) => {
  event.preventDefault();
  const {currentTarget, target} = event;
  const {name} = target.dataset;
  if (!name) return;
  sortName = name;
  localStorage.setItem(sortKey, name);
  visualize(currentTarget.stats);
};

const sortByName = (stats, name) => stats.sort((a, b) => (
  parseInt(b[name].replace(/\D+/g, ''), 10) -
  parseInt(a[name].replace(/\D+/g, ''), 10)
));

const countryTable = (world, {countries_stat}) => html`
  <table>
    <tr onclick=${sort} .stats=${[world, {countries_stat}]}>
      <th>Country</th>
      <th data-name="cases">Cases</th>
      <th data-name="deaths">Deaths</th>
      <th data-name="serious_critical">critical</th>
      <th data-name="total_recovered">recovered</th>
    </tr>
    ${sortByName(countries_stat, sortName).map(({
      country_name,
      cases,
      deaths,
      serious_critical,
      total_recovered
    }) => html`
      <tr>
        <td>${country_name}</td>
        <td>${cases}</td>
        <td>${deaths}</td>
        <td>${serious_critical}</td>
        <td>${total_recovered}</td>
      </tr>
    `)}
  </table>
`;

// body view
const visualize = ([world, countries]) => {
  render(document.body, html`
    <div class="wrapper">
      <div class="statistic">
        <div class="total_case_box">
          <h2>Total Cases</h2>
          <p>${placeHolder || world.total_cases}</p>
        </div>
        ${boxWrapper(world)}
        ${countryTable(world, countries)}
      </div>
    </div>
  `);
  // update in 10 minutes
  setTimeout(update, 1000 * 60);
};

// updater
const update = () => Promise.all(grabData())
                            .then(visualize, console.error);

// bootstrap
addEventListener('DOMContentLoaded', update, {once: true});