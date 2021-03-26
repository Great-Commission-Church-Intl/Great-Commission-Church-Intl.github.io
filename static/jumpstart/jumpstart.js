let lastKSP = 0;
let tick = false;

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function updateTime() {

  let targetTime = new Date(2021, 3, 4, 11, 0, 0);
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

function continueToSite() {
  document.getElementById('mobile-alert').classList.add('mobile-alert-hidden');
}

window.onload = (event) => {

  //MOBILE CHECK

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
          document.getElementById('countdown-label-main').style.opacity = downOpacity;
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
