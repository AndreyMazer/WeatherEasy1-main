import React, { useState } from 'react';

// доступ к API сервиса погоды
const api = {
  key: '0f7f756f060db006caa962facceed609',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  // действия при изменении города в поле ввода
  const [city, setCity] = useState('');

  // действия с данными погоды
  const [weather, setWeather] = useState({});


  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = () => {
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) 
      .then(res => res.json()) 
      .then(result => {      
        setWeather(result);
        setCity('');
        console.log(result);
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
      });
  }

  // форматирование даты
  const format_date = (d) => {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  // JSX разметка
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 5) ? 'app warm' : 'app') : 'app'}>
      <main className='main'>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Введите город'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={e => { if (e.key === 'Enter') search() }}
          />
          <button type="submit" className="search-form__button" aria-label="Поиск города" onClick={search}>&#10054;</button>
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div className='allBox'>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{format_date(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°c
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;