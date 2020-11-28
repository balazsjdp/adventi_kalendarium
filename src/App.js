import './App.css';
import './calendarEvents.js'
import { calendarEvents } from './calendarEvents.js';




function App() {


  const openedUntil = new Date("2020-12-02");
  const currentDay= new Date("2020-12-10");

  const christmasEve = new Date('2020-12-24');
  const now = new Date();
  const daysToChristmas = Math.floor((christmasEve - now) / (1000*60*60*24))



  const onBoxHover = (e) => {
    e.target.classList.add("animate__animated","animate__headShake")
    setTimeout(() => {
      e.target.classList.remove("animate__animated","animate__headShake")
    }, 1000);
  }

  const onBoxOpen = () => {
    let originalPosY = window.scrollY;

    window.scrollTo(0,0);
    document.body.style.overflow = "hidden";
    const animoverlay = document.getElementById("opening-anim");
    animoverlay.style.zIndex = 2;
    animoverlay.style.opacity = 1;
    animoverlay.style.height = '100vh';

    setTimeout(() => {
      animoverlay.style.zIndex = 0;
      animoverlay.style.opacity = 0;
      animoverlay.style.height = 0;
      document.body.style.overflow = "initial";
      window.scrollTo(0,originalPosY)
    }, 3500);
  }

  return (
    <div className="App">
      <div id="opening-anim" class="boxOpenAnim text-center">
          <img src="resources/open_gift_anim.gif"></img>
          <h1>Már csak {daysToChristmas} nap karácsonyig! :)</h1>
      </div>
      <div className="container pt-3">
        <div className="col-12 text-center">
          <h1 className="main-title"><img className="title-image" src="resources/bow.svg" />Adventi naptár<img className="title-image" src="resources/bow.svg" /></h1>
        </div>
      </div>
      <div className="frame">
          <div className="container">
              <div className="row pb-5 pt-5">
              {calendarEvents.map(event => {
                  let opened = event.day <= openedUntil ? true : false;
                  let openAble = (event.day <= currentDay & !opened) ? true : false

                  console.log(event.day.getDate(), "Opened: " + opened, "Openable: ",openAble)

                  return (
                    <div key={event.day.getDate()} className="col-6 col-md-2 mt-3">
                      <div className={"calendar-entry " + (openAble ? "box-openable " : "") + (opened ? "opened" : "")}>
                        <span className="calendar-entry-day">
                        <img className="img-bow" src="resources/bow.svg"></img>
                          <div className="sock-image-wrapper">
                            <img onMouseOver={!opened ? onBoxHover : null} onClick={openAble ? onBoxOpen : null}  className="img-sock" src={`resources/${opened ? "gift-open" : "gift"}.svg`}></img>
                            <span  className="calendar-day">{event.day.getDate()}</span>
                          </div>
                          </span>
                      </div>
                      
                    </div>)
                })}
               
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;
