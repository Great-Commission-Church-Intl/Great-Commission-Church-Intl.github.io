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

  db.collection('jumpstartQuestions').orderBy('s', 'desc').get().then(querySnapshot => {

    if (querySnapshot.empty) {

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
      let errorText = document.createTextNode("No questions have been submitted yet!");
      errorMessage.appendChild(errorText);
      errorWrapper.appendChild(errorMessage);
      container.appendChild(errorWrapper);
      return;

    }

    querySnapshot.forEach(doc => {

      let question = doc.get('q');
      let time = doc.get('s').toDate();
      let selected = doc.get('c') || false;

      let d = time.toLocaleString([], { year: 'numeric', month: 'long', day: '2-digit' });
      let t = time.toLocaleString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });

      let questionWrapper = document.createElement('div');
      questionWrapper.classList.add('question-wrapper');
      
      let checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.classList.add('question-selected');
      checkbox.id = doc.id;
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          db.collection('jumpstartQuestions').doc(doc.id).update({ 'c': true }).then(() => { }).catch(err => {
            console.log(err); alert(err);
          });
        } else {
          db.collection('jumpstartQuestions').doc(doc.id).update({ 'c': false }).then(() => { }).catch(err => {
            console.log(err); alert(err);
          });
        }
      });
      questionWrapper.appendChild(checkbox);
      
      let questionElement = document.createElement('p');
      questionElement.classList.add('question');
      questionElement.id = doc.id;
      let bold = document.createElement('b');
      bold.appendChild(document.createTextNode(`${questionCount}. `));
      let questionText = document.createTextNode(question);
      let questionSubmission = document.createTextNode(` - Submitted on ${d} | ${t} | ID: ${doc.id}`);
      questionElement.appendChild(bold);
      questionElement.appendChild(questionText);
      let italic = document.createElement('i');
      italic.style.fontSize = '12px';
      italic.appendChild(questionSubmission);
      questionElement.appendChild(document.createElement('br'));
      questionElement.appendChild(italic);
      questionWrapper.appendChild(questionElement);
      container.appendChild(questionWrapper);

      questionCount++;

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
