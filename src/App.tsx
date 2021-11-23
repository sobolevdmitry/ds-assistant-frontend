import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { differenceInCalendarYears } from 'date-fns';
import { Data, Location, Sleep, Steps, Weight, Workout, Food, Series, Song, Mood } from './models';
import InstagramLogo from './assets/images/instagram.png';
import TelegramLogo from './assets/images/telegram.png';
const API_URL = "/data.json"
const GMAPS_API_KEY = "AIzaSyATAXCWMqd7hmu44d93FCJpPTGcHLKN6lg"; // ty random github repo 💙

const App = () => {
  const [data, setData] = useState<Data>(new Data())
  const [showMoreClicked, setShowMoreClicked] = useState<boolean>(false)
  const updateData = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(
      (result) => {
        setData(result)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  useEffect(() => {
    updateData()
    setInterval(() => {
      updateData()
    }, 15000)
  }, [])

  return (
    <div>
      <header className="header">
        <div className="header__content-wrapper content-wrapper">
          <div className={"header__avatar-wrapper" + (data.stories ? "header__avatar-wrapper--active" : "")}>
            <span className="header__avatar-border"></span>
            <span className="header__avatar"></span>
          </div>
          <div className="header__text-wrapper">
            <p className="header__name">Dmitry Sobolev</p>
            <p className="header__info">{differenceInCalendarYears(new Date(), new Date(1995, 12, 15))} y.o. developer from 🇷🇺</p>
            <p className="header__info">Experienced in web security and creating apps</p>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="content-wrapper">
          <section className="mood mood--5 section-block">
            <h2 className="mood__title section-block__title">Dmitry feels {data.mood ? Mood.format(data.mood) : <Skeleton width={150} />}</h2>
            <p className="mood__last-change">{data.mood ? Mood.formatDate(data.mood) : <Skeleton width={150} />}</p>
          </section>
          <section className="fuel section-block">
            <h2 className="fuel__title section-block__title">Dmitry ate today</h2>
            <p className="fuel__kcal">{data.fuel && data.fuel.current ? Math.round(data.fuel.current.calories) : <Skeleton width={50} />} kcal of {data.fuel && data.fuel.target ? data.fuel.target.calories : <Skeleton width={50} />} kcal</p>
            <div className="fuel__progress-bar">
              <div className="fuel__scale" style={{"width": data.fuel && data.fuel.current && data.fuel.target ? (Math.round(data.fuel.current.calories / data.fuel.target.calories * 100) + "%") : 0}}></div>
            </div>
            <div className="fuel__nutrients">
              <div className="fuel__nutrients-col">
                <h3 className="fuel__nutrients-title">Protein</h3>
                <p className="fuel__nutrients-g">{data.fuel && data.fuel.current ? Math.round(data.fuel.current.protein) : <Skeleton width={25} />} g / {data.fuel && data.fuel.target ? data.fuel.target.protein : <Skeleton width={25} />} g</p>
              </div>
              <div className="fuel__nutrients-col">
                <h3 className="fuel__nutrients-title">Fat</h3>
                <p className="fuel__nutrients-g">{data.fuel && data.fuel.current ? Math.round(data.fuel.current.fat) : <Skeleton width={25} />} g / {data.fuel && data.fuel.target ? data.fuel.target.fat : <Skeleton width={25} />} g</p>
              </div>
              <div className="fuel__nutrients-col">
                <h3 className="fuel__nutrients-title">Carbs</h3>
                <p className="fuel__nutrients-g">{data.fuel && data.fuel.current ? Math.round(data.fuel.current.carbs) : <Skeleton width={25} />} g / {data.fuel && data.fuel.target ? data.fuel.target.carbs : <Skeleton width={25} />} g</p>
              </div>
            </div>
            {data.fuel && data.fuel.food_entries &&
              <ul className="fuel-food__list">
                {data.fuel.food_entries.slice(0, showMoreClicked ? data.fuel.food_entries.length : 3).map(entry =>
                  <li className="fuel-food__item" key={entry.id}>
                    <span className="fuel-food__item-name">{Food.format(entry)}</span>
                    <span className="fuel-food__item-number">{entry.servingDescription.split(', ').pop()}</span>
                  </li>
                )}
              </ul>
            }
            {data.fuel && data.fuel.food_entries && data.fuel.food_entries.length > 3 && !showMoreClicked &&
              <button onClick={() => { setShowMoreClicked(true) }} className="fuel__show-button fuel__show-button">show more</button>
            }
          </section>
          <section className="location section-block">
            <h2 className="location__title section-block__title">Dmitry is currently in</h2>
            <div className="location__map" style={{backgroundImage: data.location ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(Location.format(data.location))}&zoom=10&size=640x100&scale=2&key=${GMAPS_API_KEY}&style=feature:all|element:labels|visibility:off)` : ''}}>
              <span className="location__point">📍 {data.location ? Location.format(data.location) : <Skeleton width={100} />}</span>
            </div>
          </section>
          <section className="statistics section-block">
            <h2 className="statistics__title section-block__title">Dmitry's statistics</h2>
            <ul className="statistics__list">
              <li className="statistics__item statistics__item--weight">
                <span className="statistics__item-name">🔢 Weight</span>
                <span className="statistics__item-content">{data.weight ? Weight.format(data.weight) : <Skeleton width={150} />}</span>
              </li>
              <li className="statistics__item statistics__item--sleep">
                <span className="statistics__item-name">💤 Slept</span>
                <span className="statistics__item-content">{data.sleep ? Sleep.format(data.sleep) : <Skeleton width={150} />}</span>
              </li>
              <li className="statistics__item statistics__item--steps">
                <span className="statistics__item-name">👣 Steps</span>
                <span className="statistics__item-content">{data.steps ? Steps.format(data.steps) : <Skeleton width={150} />}</span>
              </li>
              <li className="statistics__item statistics__item--workout">
                <span className="statistics__item-name">🏋️ Last workout</span>
                <span className="statistics__item-content">{data.workout ? Workout.format(data.workout) : <Skeleton width={150} />}</span>
              </li>
              <li className="statistics__item statistics__item--series">
                <span className="statistics__item-name">📺 Last episode</span>
                <span className="statistics__item-content">{data.series ? <a href={"https://myshows.me/view/episode/" + data.series.episode.id + "/"} target="_blank" rel="noreferrer">{Series.format(data.series)}</a> : <Skeleton width={150} />}</span>
              </li>
              <li className="statistics__item statistics__item--music">
                <span className="statistics__item-name">📻 Listening now</span>
                <span className="statistics__item-content">{data.song ? <a href={"https://open.spotify.com/track/" + data.song.id} target="_blank" rel="noreferrer">{Song.format(data.song)}</a> : (data.song === false ? "nothing": <Skeleton width={150} />)}</span>
              </li>
            </ul>
          </section>
          <section className="socials section-block">
            <h2 className="socials__title section-block__title">Dmitry's socials</h2>
            <ul className="socials__list">
              <li className="socials__item">
                <a className="socials__link" href="https://t.me/sobolevdmitry" target="_blank" rel="noreferrer"><img className="socials__img" src={TelegramLogo} alt="Telegram" /></a>
              </li>
              <li className="socials__item">
                <a className="socials__link" href="https://www.instagram.com/sobolevdmitry/" target="_blank" rel="noreferrer"><img className="socials__img" src={InstagramLogo} alt="Instagram" /></a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App;
