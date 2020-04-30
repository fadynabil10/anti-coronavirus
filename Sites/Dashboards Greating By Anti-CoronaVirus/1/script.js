setInterval(function(){fetch('https://api.thevirustracker.com/free-api?global=stats')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  
  document.getElementById('title').innerText = "COVID-19 STATISTICS - GLOBAL";
  
    
  document.getElementById('total').innerHTML = `<div class="stats">
      <div class="number">${data.results[0].total_cases}</div>
      <div class="factor">Infected</div>
    </div>`;
  
  document.getElementById('recover').innerHTML = `<div class="stats">
      <div class="number">${data.results[0].total_recovered}</div>
      <div class="factor">Recovered</div>
    </div>`;
  
  document.getElementById('sick').innerHTML = `<div class="stats">
      <div class="number">${data.results[0].total_active_cases}</div>
      <div class="factor">Sick</div>
    </div>`;
  
  document.getElementById('dead').innerHTML = `<div class="stats">
      <div class="number">${data.results[0].total_deaths}</div>
      <div class="factor">Deaths</div>
    </div>`; 
    
  });}, 120000);

fetch('https://api.thevirustracker.com/free-api?global=stats')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  
  document.getElementById('title').innerText = "COVID-19 STATISTICS - GLOBAL";
    
  document.getElementById('total').innerHTML = `<div class="stats">
      <div class="number">${data.results[0].total_cases}</div>
      <div class="factor">Infected</div>
    </div>`;
  
  document.getElementById('recover').innerHTML = `<div class="stats">
      <div class="number">${data.results[0].total_recovered}</div>
      <div class="factor">Recovered</div>
    </div>`;
  
  document.getElementById('sick').innerHTML = `<div class="stats">
      <div class="number">${data.results[0].total_active_cases}</div>
      <div class="factor">Sick</div>
    </div>`;
  
  document.getElementById('dead').innerHTML = `<div class="stats">
      <div class="number">${data.results[0].total_deaths}</div>
      <div class="factor">Deaths</div>
    </div>`;    
  });


const flagDiv = document.getElementsByClassName('flags')[0];


fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
 data.forEach(function(flag) {
   const flagParentDiv = document.createElement('div');
   flagParentDiv.setAttribute('class', 'flag');
   const imgNameSpan = document.createElement('div');
   const imgTag = document.createElement('img');
   imgTag.src = "https://www.countryflags.io/"+ flag.alpha2Code +"/flat/48.png"
   flagParentDiv.setAttribute('title',flag.name);
   flagParentDiv.setAttribute('data-code',flag.alpha2Code);
  flagParentDiv.addEventListener('click', function(e) {
    country(flag.alpha2Code); 
    window.scrollTo(0,0);
    //this.classList.toggle('active');
  });
   imgNameSpan.innerText = flag.name;
   flagParentDiv.appendChild(imgTag);             
   flagParentDiv.appendChild(imgNameSpan);
   flagDiv.appendChild(flagParentDiv);
 })
});

function country(code) {
  fetch('https://api.thevirustracker.com/free-api?countryTotal=' + code)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.getElementById('title').innerHTML = "COVID-19 STATISTICS - " +  data.countrydata[0].info.title;
    
    console.log(data.countrydata.total_cases);
    document.getElementById('total').innerHTML = `<div class="stats">
      <div class="number">${data.countrydata[0].total_cases}</div>
      <div class="factor">Infected</div>
    </div>`;
  
  document.getElementById('recover').innerHTML = `<div class="stats">
      <div class="number">${data.countrydata[0].total_recovered}</div>
      <div class="factor">Recovered</div>
    </div>`;
  
  document.getElementById('sick').innerHTML = `<div class="stats">
      <div class="number">${data.countrydata[0].total_active_cases}</div>
      <div class="factor">Sick</div>
    </div>`;
  
  document.getElementById('dead').innerHTML = `<div class="stats">
      <div class="number">${data.countrydata[0].total_deaths}</div>
      <div class="factor">Deaths</div>
    </div>`; 
  })
  .catch((err) => {
    document.getElementById('total').innerHTML = `<div class="stats">
      <div class="number">XX</div>
      <div class="factor">Infected</div>
    </div>`;
  
  document.getElementById('recover').innerHTML = `<div class="stats">
      <div class="number">XX</div>
      <div class="factor">Recovered</div>
    </div>`;
  
  document.getElementById('sick').innerHTML = `<div class="stats">
      <div class="number">XX</div>
      <div class="factor">Sick</div>
    </div>`;
  
  document.getElementById('dead').innerHTML = `<div class="stats">
      <div class="number">XX</div>
      <div class="factor">Deaths</div>
    </div>`;
    console.log('Not Infected yet');
  });
  
}



/*
total_cases: 199024
total_recovered: 82779
total_unresolved: 110719
total_deaths: 7991
total_new_cases_today: 803
total_new_deaths_today: 24
total_active_cases: 108254
total_serious_cases: 6417
*/