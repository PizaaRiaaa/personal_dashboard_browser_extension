const bodyEl = document.querySelector(".body")
const authorEl = document.querySelector(".author")
const cryptoEl = document.querySelector(".crypto-container")
const marketCapRankEl = document.querySelector(".market-rank")
const currentTimeEl = document.querySelector(".current-time")
const weatherEl = document.querySelector(".weather-container")

let image = ""
let author = ""

let weatherIcon = ""
let currentLocation = ""
let temp = 0

let cryptoIcon = ""
let market_cap_rank = 0
let sentiment_votes_down_per = 0.00
let sentiment_votes_up_per = 0.00


const generateRamdomImage = (theme) =>{
  fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${theme}`)
    .then(response => response.json())
    .then(data => {

      image = data.urls.full
      author = data.user.name

      bodyEl.style.backgroundImage = `url(${image})`
      authorEl.innerText = `By: ${author}`
    })
    .catch(err => {
      bodyEl.style.backgroundImage = 'url(https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
      console.log(err)
    })
}


const getCrypto = async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .catch(err => console.log(err))
  
  const data = await response.json();

  cryptoIcon = data.image.thumb
  market_cap_rank = data.market_cap_rank
  sentiment_votes_up_per = data.sentiment_votes_up_percentage
  sentiment_votes_down_per = data.sentiment_votes_down_percentage
  
  cryptoEl.innerHTML += `<image src='${cryptoIcon}' width='20' height='20' alt='icon'/>`
  marketCapRankEl.innerText += ` ${market_cap_rank}, Up↑ %: ${sentiment_votes_up_per}, Down↓ %: ${sentiment_votes_down_per}`
}


const getCurrentTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-us", {timeStyle: "short"})
  currentTimeEl.innerText = currentTime.split(' ')[0]
}


navigator.geolocation.getCurrentPosition(position => {
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    .then(res => {
      if(!res.ok) {
        throw Error("Weather data not available")
      }
      return res.json()
    })
    .then(data => {

      weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      temp = data.main.temp 
      currentLocation = data.name

      const html = `
         <img src='${weatherIcon}' alt='icon'/> 
          <div class='temp-and-location'>
            <p>${temp}°</p>
            <p>${currentLocation}</p>
          </div>
        `
        

        weatherEl.innerHTML = html
      
      console.log(data.weather[0].icon)
      console.log(data);
    })
})


generateRamdomImage("nature")
setInterval(() => getCurrentTime(), 1000)
getCrypto()




