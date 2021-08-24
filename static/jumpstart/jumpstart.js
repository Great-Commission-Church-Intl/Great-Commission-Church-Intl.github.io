let lastKSP = 0;
let tick = false;

function updateTime() {

  let targetTime = new Date(2021, 7, 27, 19, 0, 0);
  let now = new Date();
  let remaining = targetTime - now < 0 ? 0 : targetTime - now;
  var days, hours, minutes, seconds;
  seconds = Math.floor(remaining / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  days = Math.floor(hours / 24);
  hours = hours % 24;

  document.getElementById('cdh-days').innerHTML = days < 10 ? `0${days}` : days;
  document.getElementById('cde-days').innerHTML = days < 10 ? `0${days}` : days;
  document.getElementById('cdh-hours').innerHTML = hours < 10 ? `0${hours}` : hours;
  document.getElementById('cde-hours').innerHTML = hours < 10 ? `0${hours}` : hours;
  document.getElementById('cdh-minutes').innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  document.getElementById('cde-minutes').innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  document.getElementById('cdh-seconds').innerHTML = seconds < 10 ? `0${seconds}` : seconds;
  document.getElementById('cde-seconds').innerHTML = seconds < 10 ? `0${seconds}` : seconds;

}

function submitQuestion() {

  console.log(`Submitting Question...`);

  let question = document.getElementById('question').value;
  if (question === "") {

    console.log(`Error submitting question!`);
    document.getElementById('question').classList.add('error');
    setTimeout(function() {document.getElementById('question').classList.remove('error');},820);

  } else {

    document.getElementById('submit-question').classList.add('hidden');
    document.getElementById('submit-indicator').classList.remove('hidden');

    let now = new Date();
    let submissionTime = firebase.firestore.Timestamp.fromDate(now);

    db.collection('jumpstartQuestions').add({ q: `${question}`, s: submissionTime, c: false }).then(() => {

      document.getElementById('submit-text').innerHTML = "Your question has been successfully submitted!";
      document.getElementById('submit-text').style.color = `#FFF`;
      document.getElementById('submit-indicator').classList.add('hidden');
      document.getElementById('submit-text').classList.remove('hidden');
      document.getElementById('question').classList.add('delete');
      setTimeout(function() {
        document.getElementById('question').style.color = `#FFF`;
        document.getElementById('question').value = "";
      }, 1000);
      setTimeout(function() {
        document.getElementById('question').classList.remove('delete');
        document.getElementById('submit-question').classList.remove('hidden');
        document.getElementById('submit-text').classList.add('hidden');
      }, 3000);

    }).catch(err => {

      document.getElementById('submit-text').innerHTML = "Oops! We couldn't submit your question! Please try again later.";
      document.getElementById('submit-text').style.color = `#FF6464`;
      document.getElementById('submit-indicator').classList.add('hidden');
      document.getElementById('submit-text').classList.remove('hidden');
      setTimeout(function() {
        document.getElementById('submit-question').classList.remove('hidden');
        document.getElementById('submit-text').classList.add('hidden');
      }, 3000);

      console.log(err);
    });

  }

}

window.onload = (event) => {

  //Scroll Effects
  document.getElementById('wrapper').addEventListener('scroll', e => {

    lastKSP = document.getElementById('wrapper').scrollTop;

    if (!tick) {
      window.requestAnimationFrame(() => {

        var scrollPercentage = lastKSP / window.innerHeight;

        //BACKGROUND BLUR
        document.getElementById('blurred-background').style.opacity = scrollPercentage + 0.2;
        document.getElementById('darken-background').style.opacity = scrollPercentage * 0.4 > 0.4 ? 0.4 : scrollPercentage * 0.4;

        //LOGO SHRINK
        var wrapADJ = scrollPercentage * 60 > 60 ? 60 : scrollPercentage * 60;
        var logoADJ = scrollPercentage * 50 > 50 ? 50 : scrollPercentage * 50;
        document.getElementById('logo-wrapper').style.width = `${120-wrapADJ}px`;
        document.getElementById('logo-wrapper').style.height = `${120-wrapADJ}px`;
        document.getElementById('logo').style.width = `${100-logoADJ}px`;
        document.getElementById('logo').style.height = `${100-logoADJ}px`;

        //LOGO TITLE
        document.getElementById('logo-title').style.opacity = scrollPercentage * 0.8;

        if (scrollPercentage > 1.25) {

          let downOpacity = 3.5 - (2 * scrollPercentage);
          let upOpacity = (scrollPercentage - 1.5) * 2
          document.getElementById('countdown-wrapper').style.opacity = downOpacity;
          document.getElementById('countdown-header').style.opacity = upOpacity;

        }

        tick = false;

      });

      tick = true;
    }

  });

  //Countdown Timer
  updateTime();
  setInterval(function() { updateTime() }, 1000);

  //Submission Button
  document.getElementById('submit-question').addEventListener('click', function() { submitQuestion(); });

}
