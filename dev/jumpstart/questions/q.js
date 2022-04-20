window.onload = () => {

  db.collection('jumpstartQuestions').orderBy('s', 'desc').get().then(querySnapshot => {

    if (querySnapshot.empty) { return; }

    const wrapper = document.getElementById('content-wrapper');
    count = 1;
    querySnapshot.forEach(doc => {

      let question = doc.get('q');
      let p = document.createElement('p');
      p.appendChild(document.createTextNode(`${count}. ${question}`));
      wrapper.appendChild(p);
      count++;

    });
  });
}
