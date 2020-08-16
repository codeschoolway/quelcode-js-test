'use strict';



var citySelected = document.getElementById("city-select");

document.getElementById("city-select").onchange = function() {
    /* console.log("bbb");
    console.log(citySelected.value); */
    //const city = citySelected.value;
    //var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;
    ajaxRequest(citySelected.value);
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
    ajaxRequest(citySelected.value);
};


function ajaxRequest(city) {
    const lang = 'ja';
    const units = 'metric';
    const appid = '4b5774e9f3d2a07b84f0f2f88e486224';
    //const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;
    //const appId = '保存しておいたAPI Key';

    $.ajax(url)
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


/* function ajaxRequest(city) {
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

} */

function toJSTime(utcTime) {
    return utcTime * 1000;
}