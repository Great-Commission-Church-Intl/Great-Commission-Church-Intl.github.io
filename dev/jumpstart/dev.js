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
  document.getElementById('cdh-hours').innerHTML = hours < 10 ? `0${hours}` : hours;
  document.getElementById('cdh-minutes').innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  document.getElementById('cdh-seconds').innerHTML = seconds < 10 ? `0${seconds}` : seconds;

}

function fetchQuestions() {

  let container = document.getElementById('question-container');
  let questionCount = 1;

  db.collection('jumpstartQuestions').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

      let question = doc.get('q');

      let questionElement = document.createElement('p');
      questionElement.classList.add('question');
      questionElement.id = doc.id;
      let bold = document.createElement('b');
      bold.appendChild(document.createTextNode(`${questionCount}. `));
      let questionText = document.createTextNode(question);
      questionElement.appendChild(bold);
      questionElement.appendChild(questionText);
      container.appendChild(questionElement);

    });
  }).catch(err => {

    let errorWrapper = document.createElement('div');
    errorWrapper.style.width = '100%';
    errorWrapper.style.height = '50vh';
    errorWrapper.style.display = 'flex';
    errorWrapper.style.justifyContent = 'center';
    errorWrapper.style.alignItems = 'center';
    let errorMessage = document.createElement('p');
    errorMessage.style.color = '#C00000';
    errorMessage.style.fontWeight = 'bold';
    errorMessage.style.fontFamily = 'inherit';
    errorMessage.style.fontSize = '16px';
    errorMessage.style.textAlign = 'center';
    let errorText = document.createTextNode("Whoops! Couldn't fetch Jumpstart questions at this time! Please try again later~");
    errorMessage.appendChild(errorText);
    errorWrapper.appendChild(errorMessage);
    container.appendChild(errorWrapper);

  });

}

window.onload = (event) => {

  updateTime();
  setInterval(function() { updateTime() }, 1000);

  fetchQuestions();

}
