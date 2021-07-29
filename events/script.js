function getCookie(cname) { let name = cname + "="; let decodedCookie = decodeURIComponent(document.cookie); let ca = decodedCookie.split(';'); for(let i = 0; i <ca.length; i++) { let c = ca[i]; while (c.charAt(0) == ' ') { c = c.substring(1); } if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }} return ""; }

async function participate(eid, guid, bool) {

  document.getElementById('content').classList.remove('buttons');
  document.getElementById('content').classList.add('message');
  document.getElementById('content').classList.remove('hidden');
  document.getElementById('btn1').classList.toggle('invisible');
  document.getElementById('btn2').classList.toggle('invisible');
  document.getElementById('p1').classList.toggle('visible');

  let epd = await db.collection('events').doc(eid).get();
  let ep = epd.get('participants');
  ep[`${guid}`] = bool;
  db.collection('events').doc(eid).update({ participants: ep });

}

window.onload = async() => {

  /* Attempt to get eventID */
  let URLList = window.location.href.split('/');
  let eventID = URLList[URLList.length - 1];
  eventID = eventID.split('=')[1];

  let eventData = await db.collection('events').doc(`${eventID}`).get();

  /* Invalid eventID */
  if (!eventData.exists) {

    document.getElementById('event-id-error').classList.toggle('error');
    return;

  }

  /* Valid eventID */
  /* Check for GUID */
  let guid = getCookie(`guid`);
  if (guid === "") { guid = uuidv4(); document.cookie = `guid=${guid}`; }

  /* Check if GUID is already participating in event */
  let participants = eventData.get('participants');
  if (guid in participants) {

    document.getElementById('content').classList.remove('buttons');
    document.getElementById('content').classList.add('message');
    document.getElementById('content').classList.remove('hidden');
    document.getElementById('btn1').classList.toggle('invisible');
    document.getElementById('btn2').classList.toggle('invisible');
    document.getElementById('p0').classList.toggle('visible');

  }

  document.getElementById('content').classList.remove('hidden');

  /* Set Up Responses */
  document.getElementById('btn1').addEventListener('click', function() { participate(eventID, guid, true); });
  document.getElementById('btn2').addEventListener('click', function() { participate(eventID, guid, false); });

  let et = eventData.get('title');
  let est = eventData.get('startTime').toDate();
  let eet = eventData.get('endTime').toDate();

  document.getElementById('title').innerHTML = et;

  let time = `${est.toLocaleString('en-US', { weekday:'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })} - ${eet.toLocaleString('en-US', { weekday:'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}`;
  document.getElementById('time').innerHTML = time;

}
