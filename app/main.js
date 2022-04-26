const toggleBtn = document.querySelector('.navbar_toogleBtn');
const menu = document.querySelector('.navbar_menu');
const icons = document.querySelector('.navbar_icons');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    icons.classList.toggle('active');
});

//index.html와 연동
const API_KEY = "7a3bb67ebca319918ba6a3587fa73cac"; //add your API KEY  -> 홍승진 API_key
const COORDS = 'coords'; //좌표를 받을 변수 

//DOM객체들 
const weatherInfo = document.querySelector('.weatherInfo');
const weatherIconImg = document.querySelector('.weatherIcon');

//초기화 
function init() {
    askForCoords();
}

//좌표를 물어보는 함수 
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

//좌표를 얻는데 성공했을 때 쓰이는 함수 
function handleSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude); //얻은 좌표값을 바탕으로 날씨정보를 불러온다.
}
//좌표를 얻는데 실패했을 때 쓰이는 함수 
function handleError() {
    console.log("can't not access to location");
}

//날씨 api를 통해 날씨에 관련된 정보들을 받아온다. 
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        //(변수) 당일 최저온도, 최고온도, 습도, 풍속, 온도, 주소, 국가, 위도, 경도, 날씨묘사, 날씨아이콘
        const temperatureMin = json.main.temp_min; //최저 온도
        const temperatureMax = json.main.temp_max; //최고 온도
        const humidity = json.main.humidity; //습도
        const wind = json.wind.speed; //바람속도
        const temperature = json.main.temp; //평균 온도
        const place = json.name; //도시명
        const country = json.sys.country; //국가명
        const lat = json.coord.lat; //위도
        const lon = json.coord.lon; //경도
        const rain = json.rain;//왜 api코드가 확인이 안되지? (04.24)
        const snow = json.snow;//왜 api코드가 확인이 안되지? (04.24)
        const cloud = json.clouds.all; //구름
        const weatherDescription = json.weather[0].description; //대략적인 날씨
        const weatherIcon = json.weather[0].icon; //날씨 아이콘 (당일)
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    
        //받아온 정보들을 표현한다. data 추가하였음
        //https://openweathermap.org/current
        weatherInfo.innerText 
        =`
        (날씨정보)
        현재온도: ${temperature} °C 
        현재습도: ${humidity} %
        최저온도: ${temperatureMin} °C 
        최대온도: ${temperatureMax} °C 

        날씨느낌: ${weatherDescription} 
        구름: ${cloud} %
        바람세기: ${wind} m/s

        (위치정보)
        국가: ${country} (KR = korea)
        장소: ${place} 
        위도: ${lat}
        경도: ${lon}
        `;
        //날씨 아이콘 띄워줌
        weatherIconImg.setAttribute('src', weatherIconAdrs);
    })
    .catch((error) => console.log("error:", error));
}

init();