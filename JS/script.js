//Variáveis e Seleção de elementos
const apiKey = "f38c26d40763ac6bc76abfcafdec883d";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");


const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

//carregamento

const toggleLoader = () => {
    loader.classList.toggle("hide");
  };
  
  const getWeatherData = async (city) => {
    toggleLoader();
  
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
  
    toggleLoader();
  
    return data;
  };
  
//Funções

const getwhatherData = async(city) => {  //async-assíncrona - executa tarefa em segundo plano

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`; 

    const res = await fetch (apiWeatherURL);
    const data = await res.json();

    return data;
}  

// Tratamento de erro
const showErrorMessage = () => {  //Mostra mensagem
    errorMessageContainer.classList.remove("hide"); 
  };
  
  const hideInformation = () => { //esconde mensagem
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
  };

const showWeatherData = async (city) => {  //------
    hideInformation();

    const data = await getwhatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
      }

    cityElement.innerText = data.name; // innerText 
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      ); 
      countryElement.setAttribute("src", apiCountryURL + data.sys.country); 
      humidityElement.innerText = `${data.main.humidity}%`;     
      windElement.innerText = `${data.wind.speed} km/h`;
      weatherContainer.classList.remove("hide"); 
};


//Eventos
  
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    const city = cityInput.value;

    showWeatherData(city);
  });

  cityInput.addEventListener("keyup", (e) => {
    
    if (e.code === "Enter") {
        const city = e.target.value;
        
        showWeatherData(city); 
    }
  });
  
  // Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
      
       
      showWeatherData(city);
    });
  });
