'use strict';

//let city = 'London';
const INITIAL_CITY = 'London';
const lang = 'ja';
const units = 'metric';
const appid = '4b5774e9f3d2a07b84f0f2f88e486224';

/* var city = 'London';
var lang = 'ja';
var units = 'metric';
var appid = '4b5774e9f3d2a07b84f0f2f88e486224'; */

//const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;

/* var select = document.getElementById("city-select");
select.options[0].selected = true;
console.log(select.options[0].value);
const city = select.options[0].value; */

var citySelected = document.getElementById("city-select");
//var city = citySelected;
//console.log(city.value);

/* console.log(citySelected.value);
console.log(city); */
//console.log(city);



document.getElementById("city-select").onchange = function() {
    /* console.log("bbb");
    console.log(citySelected.value); */
    //const city = citySelected.value;
    //var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;
    getFetch(citySelected.value);
}

window.onload = function() {
    /* console.log("aaa");
    console.log(citySelected.value); */
    /* console.log(citySelected.value);
    const city = citySelected.value; */
    /* console.log(select.value);
    var city = select.value; */
    //alert("ページが読み込まれました！");
    //console.log(city);
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;
    //const url = 'aaaa';
    //console.log('aaaaaaaaaa');
    getFetch(citySelected.value);
};



function getFetch(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;
    //console.log(city);

    fetch(url)
    .then(data => {
        if(data.ok){
            return data.json();
        } else {
            throw new Error();
        }
    })
    .then(function(data){
        const city = data.name;
        const date = new Date(toJSTime(data.dt));
        const myMonth = date.getMonth() + 1;
        const myDate = date.getDate();
        const theWeek = ["日", "月", "火", "水", "木", "金", "土"];
        const numDay = date.getDay();
        const myWeek = theWeek[numDay];
        const myHours = date.getHours();
        const myMin = String(date.getMinutes()).padStart(2, '0');
        const desc = data.weather[0].description;
        const temp = Math.round(data.main.temp * 10) / 10;
        const windspeed = data.wind.speed;

        document.getElementById('city').textContent = city;
        document.getElementById('date-1').textContent = `${myMonth}月${myDate}日（${myWeek}）`;
        document.getElementById('date-2').textContent = `${myHours}時${myMin}分`;
        document.getElementById('desc').textContent = desc;
        document.getElementById('temp').textContent = temp;
        document.getElementById('windspeed').textContent = windspeed;
    })
    .catch(err => {
        console.log(err);
    })

}

function toJSTime(utcTime) {
    return utcTime * 1000;
}