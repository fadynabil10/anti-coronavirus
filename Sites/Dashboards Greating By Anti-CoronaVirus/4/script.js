const app = document.querySelector('#covid');
const ApiContext = React.createContext(null);
const DataContext = React.createContext(null);

function useStats(url) {
  const [stats, setStats] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      console.log('fetching API');
      const data = await fetch(url);

      data.
      json().
      then(res => setStats(res)).
      then(res => setLoading(false)).
      catch(err => setError(err));
    };
    fetchData();
  }, [url]);
  //
  return {
    stats,
    loading,
    error };

}
function Daily({ todayStat }) {
  const { state } = React.useContext(ApiContext);
  const { data } = React.useContext(DataContext);
  const today = new Date();
  const dayBefore = new Date();
  dayBefore.setDate(dayBefore.getDate() - 1);

  const [month, day, year] = [dayBefore.getMonth() + 1, dayBefore.getDate(), dayBefore.getFullYear()];
  const yesterday = `${month}-${day}-${year}`;

  const { stats, loading, error } = useStats(`https://covid19.mathdro.id/api/daily/${yesterday}`);
  if (stats) setTodayData(stats);
  if (loading) return React.createElement("p", null, "Looking for data...");
  if (error) return React.createElement("p", null, "Aw Man! No Data!");
  //Daily stats values are String
  const prevDay = todayData.filter(e => e.provinceState === isState).reduce((a, b) => {return a + parseInt(b.confirmed);}, 0);
  console.log(todayStat, prevDay, yesterday);
  return (
    React.createElement("div", null,
    React.createElement("p", null, "Daily Change(Today): + ", (todayStat - prevDay).toLocaleString())));



}
function Weekly({ todayStat }) {
  const { state } = React.useContext(ApiContext);
  const { data } = React.useContext(DataContext);
  const prevWeek = new Date();
  prevWeek.setDate(prevWeek.getDate() - 7);
  //console.log(today)
  const [month, day, year] = [today.getMonth() + 1, today.getDate(), today.getFullYear()];
  const yesterday = `${month}-${day}-${year}`;

  const { stats, loading, error } = useStats(`https://covid19.mathdro.id/api/daily/${yesterday}`);
  if (stats) setTodayData(stats);
  if (loading) return React.createElement("p", null, "Looking for data...");
  if (error) return React.createElement("p", null, "Aw Man! No Data!");
  //Daily stats values are String
  const dailyChange = todayData.filter(e => e.provinceState === isState).reduce((a, b) => {return a + parseInt(b.confirmed);}, 0);

  return (
    React.createElement("div", null,
    dailyChange !== 0 ? React.createElement("p", null, "Daily Change: + ", (todayStat - dailyChange).toLocaleString()) : ''));




}
function WorldStats() {
  const url = "https://covid19.mathdro.id/api/";
  const { stats, loading, error } = useStats(url);
  //console.log('log',stats,loading,error);
  if (loading) return React.createElement("p", null, "Looking for stats...");
  if (error) return React.createElement("p", null, "Aw Man!No Stats!");

  return (
    React.createElement("div", { className: "box" },
    React.createElement("div", { className: "stat-box" },
    React.createElement("h3", null, "Confirmed:"),
    React.createElement("span", { className: "confirmed" },
    stats.confirmed.value.toLocaleString())),


    React.createElement("div", { className: "stat-box" },
    React.createElement("h3", null, "Deaths:"),
    React.createElement("span", { className: "deaths" }, stats.deaths.value.toLocaleString())),

    React.createElement("div", { className: "stat-box" },
    React.createElement("h3", null, "Recovered:"),
    React.createElement("span", { className: "recovered" }, stats.recovered.value.toLocaleString()))));



}

function CountrySelector() {
  const { country } = React.useContext(ApiContext);

  const { stats: countries, loading, error } = useStats("https://covid19.mathdro.id/api/countries/");
  if (loading) return React.createElement("p", null, "Looking for data...");
  if (error) return React.createElement("p", null, "Aw Man! No Data!");

  const keys = countries.countries.map(e => e.name);

  return (
    React.createElement("div", { className: "selector" },
    React.createElement("h3", null, "COVID-19 Cases for Country: ",
    React.createElement("br", null), React.createElement("span", null, isCountry)),

    React.createElement("select", { onChange: e => setIsCountry(e.target.value) },
    keys.map(key => React.createElement("option", { selected: key === isCountry, key: key, value: key }, key)))));



}

function CountryStats() {
  const { country } = React.useContext(ApiContext);
  const url = `https://covid19.mathdro.id/api/countries/${isCountry}`;

  const { stats, loading, error } = useStats(url);
  if (loading) return React.createElement("p", null, "Looking for stats...");
  if (error) return React.createElement("p", null, "Aw Man!No Stats!");
  //console.log('log',stats,loading,error);
  return (

    React.createElement("div", { className: "box" },

    React.createElement("div", { className: "stat-box" },
    React.createElement("h3", null, "Confirmed:"),
    React.createElement("span", { className: "confirmed" },
    stats.confirmed.value.toLocaleString())),


    React.createElement("div", { className: "stat-box" },
    React.createElement("h3", null, "Deaths:"),
    React.createElement("span", { className: "deaths" }, stats.deaths.value.toLocaleString())),

    React.createElement("div", { className: "stat-box" },
    React.createElement("h3", null, "Recovered:"),
    React.createElement("span", { className: "recovered" }, stats.recovered.value.toLocaleString()))));



}

function StateSelector() {
  const { country, state } = React.useContext(ApiContext);
  const { data } = React.useContext(DataContext);
  //console.log(isCountry)  
  React.useEffect(() => {
    if (isState !== 'Texas' || isCountry !== 'US') setIsState(null);

    //console.log('useSel',)
  }, [isCountry]);
  const { stats, loading, error } = useStats(`https://covid19.mathdro.id/api/countries/${isCountry}/confirmed`);
  if (stats) setIsData(stats);
  if (loading) return React.createElement("p", null, "Looking for data...");
  if (error) return React.createElement("p", null, "Aw Man! No Data!");

  const duplicateStates = isData.map(obj => obj.provinceState);
  const states = [...new Set(duplicateStates)];
  //testing
  const noNullStates = states.filter(s => s);
  console.log('STsel', states[0], isState, isCountry, isData);

  return (

    React.createElement("div", { className: "selector" },
    React.createElement("h3", null,
    React.createElement("br", null),
    React.createElement("span", null, isData[1] ? 'COVID-19 Cases by State/Province:' : 'No State/Province Data')),

    React.createElement("select", { onChange: e => setIsState(e.target.value) }, React.createElement("option", null, "Select State/Province"),
    noNullStates.map(key => React.createElement("option", { selected: key === isState, key: key, value: key }, key)))));




}

function StateStats() {
  const { country, state } = React.useContext(ApiContext);
  const { data } = React.useContext(DataContext);

  //Working with data array
  //console.log('ST',states, isState, isCountry,)

  const stateStats = isData.filter(key => key.provinceState === isState);
  //console.log('SSt',isState,stateStats);

  let confirmed = stateStats.reduce((a, b) => {return a + b.confirmed;}, 0).toLocaleString();
  let deaths = stateStats.reduce((a, b) => {return a + b.deaths;}, 0).toLocaleString();
  let recovered = stateStats.reduce((a, b) => {return a + b.recovered;}, 0).toLocaleString();


  return (
    React.createElement("div", null,
    React.createElement(Daily, { todayStat: parseInt(confirmed.replace(/\,/g, '')) }),

    React.createElement("div", { className: "box" },

    React.createElement("div", { className: "stat-box" },
    isState && React.createElement("h3", null, "Confirmed:"),
    React.createElement("span", { className: "confirmed" },
    isState && confirmed)),


    React.createElement("div", { className: "stat-box" },
    isState && React.createElement("h3", null, "Deaths:"),
    React.createElement("span", { className: "deaths" }, isState && deaths)),

    React.createElement("div", { className: "stat-box" },
    isState && React.createElement("h3", null, "Recovered:"),
    React.createElement("span", { className: "recovered" }, isState && recovered)))));




}

function CountyStats() {
  const { state } = React.useContext(ApiContext);
  const { data } = React.useContext(DataContext);
  //console.log(isState);
  const countyByState = isData.filter(e => e.provinceState === isState);

  const allCounties = countyByState.map(prov => [prov.combinedKey, prov.confirmed, prov.deaths]);
  const topTen = allCounties.filter(county => allCounties.indexOf(county) < 10);
  const topTenObj = topTen.map(key => [key[0], [key[1], key[2]]]);
  const tops = Object.entries(topTenObj);
  const topTenStats = tops.map(a => {let city = a[1][0];let confirmed = a[1][1][0];let deaths = a[1][1][1];return { city, confirmed, deaths };});

  const isCounty = isData.every(e => e.admin2 === null);

  //console.log('County',countyByState, topTen,isCounty);

  return (
    React.createElement("div", null,

    React.createElement("h3", null, React.createElement("br", null),
    !isCounty ? React.createElement("span", null, "Top Ten Cases by County: ") : 'No County Data'),

    React.createElement("br", null),
    !isCounty && React.createElement("div", { className: "box" },

    topTenStats.map(stat => React.createElement("div", { className: "stat-box" }, React.createElement("h3", null, stat.city.toLocaleString()), React.createElement("br", null), React.createElement("span", { className: "confirmed" }, "Confirmed: ", stat.confirmed.toLocaleString()), React.createElement("br", null), React.createElement("span", { className: "deaths" }, "Deaths: ", stat.deaths.toLocaleString()))))));




}

function MyRegion() {
  const { state } = React.useContext(ApiContext);
  const { data } = React.useContext(DataContext);

  const counties = ['Anderson', 'Angelina', 'Brazos', 'Cherokee', 'Houston', 'Leon', 'Madison', 'Nacogdoches', 'Trinity', 'Walker'];
  const myCounties = isData.filter(e => e.provinceState === 'Texas').filter(rgn => counties.includes(rgn.admin2));
  const hasData = myCounties.map(c => c.admin2);
  const noData = counties.filter(e => !hasData.includes(e));

  const isTexas = isState === 'Texas';
  //console.log(myCounties,noData); 
  return (
    React.createElement("div", null,
    React.createElement("h3", null, React.createElement("br", null),
    isTexas && React.createElement("span", null, "Houston County Region: ")),

    React.createElement("br", null),
    isTexas && React.createElement("div", { className: "box" },

    myCounties.map(stat => React.createElement("div", { className: "stat-box" }, React.createElement("h3", null, stat.admin2), React.createElement("br", null), " ", React.createElement("span", { className: "confirmed" }, "Confirmed: ", stat.confirmed.toLocaleString()), React.createElement("br", null), React.createElement("span", { className: "deaths" }, "Deaths: ", stat.deaths.toLocaleString()))),

    noData.map(e => React.createElement("div", { className: "stat-box" }, React.createElement("h3", null, e), React.createElement("br", null), React.createElement("span", { className: "deaths" }, "No Reported Cases"))))));




}

function Footer() {

  return (
    React.createElement("div", { className: "footer" },
    React.createElement("p", null, "© 2020 All Rights Reserved for Anti-CoronaVirus. Design by", React.createElement("a", { href: "https://www.facebook.com/fadynabilofficialpage/" }, "Fady Nabil"), " for creating the API!"),
    React.createElement("a", { href: "https://musedragonmedia.com", target: "_blank" }, )));


}

function App() {

  const apiStore = {
    country: [isCountry, setIsCountry] = React.useState('US'), state: [isState, setIsState] = React.useState('Texas'),
    region: [isRegion, setIsRegion] = React.useState() };


  const dataStore = {
    data: [isData, setIsData] = React.useState([]),
    daily: [todayData, setTodayData] = React.useState([]), yesterday: [dayBeforeData, setDayBeforeData] = React.useState([]), twoBefore: [twoDaysBeforeData, setTwoDaysBeforeData] = React.useState([]), threeBefore: [threeDaysBeforeData, setThreeDaysBeforeData] = React.useState([]) };


  return (
    React.createElement("div", null,
    React.createElement(ApiContext.Provider, { value: apiStore },
    React.createElement("h1", null, " COVID-19 Cases Worldwide"),

    React.createElement(WorldStats, null),
    React.createElement(CountrySelector, null),
    React.createElement(CountryStats, null),
    React.createElement(DataContext.Provider, { value: dataStore },

    React.createElement(StateSelector, null),

    React.createElement(StateStats, null),
    React.createElement(MyRegion, null),
    React.createElement(CountyStats, null)),

    React.createElement(Footer, null))));





}

ReactDOM.render(React.createElement(App, null), app);