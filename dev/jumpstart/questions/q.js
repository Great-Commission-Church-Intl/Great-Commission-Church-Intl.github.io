const break = document.createElement('span');
break.innerHTML = "<br><br>"

db.collection('jumpstartQuestions').orderBy('s', 'desc').get().then(querySnapshot => {

  if (querySnapshot.empty) { return; }

  const wrapper = document.getElementById('content-wrapper');
  querySnapshot.forEach(doc => {

    let question = doc.get('q');
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(question));
    wrapper.appendChild(p);
    wrapper.appendChild(break);

  });
});
