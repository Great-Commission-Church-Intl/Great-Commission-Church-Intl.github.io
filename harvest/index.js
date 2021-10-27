import { updateHeadCount, startHeadCountUpdater } from './firestore.js';

function convertToCoordinate(x, y) {

  let res = [];

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const angle = Math.PI / 3;

  let dx = x - (vw / 2);
  let dy = (vh / 2) - y;
  let theta = Math.atan(dy / dx);
  let r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

  let s1 = (dx > 0 && dy > 0 && theta > angle) || (dx < 0 && dy > 0 && theta < -angle);
  let s2 = (dx > 0 && dy > 0 && theta > 0 && theta < angle);
  let s3 = (dx > 0 && dy < 0 && theta < 0 && theta > -angle);
  let s4 = (dx > 0 && dy < 0 && theta < - angle) || (dx < 0 && dy < 0 && theta > angle);
  let s5 = (dx < 0 && dy < 0 && theta > 0 && theta < angle);
  let s6 = (dx < 0 && dy > 0 && theta < 0 && theta > -angle);

  let add = (r < 0.45 * vh && r > 0.275 * vh);
  let subtract = (r < 0.275 * vh && r > 0.125 * vh);

  /* s1: Toddler (tdlr) | s2: Grades K-6 (k6) | s3: Grades 7-12 (mH) | s4: College / Young Adult (ya) | s5: Parent (pnt) | s6: Volunteer (vnt) */
  if (s1) { res.push('tdlr'); }
  else if (s2) { res.push('k6'); }
  else if (s3) { res.push('mH'); }
  else if (s4) { res.push('ya'); }
  else if (s5) { res.push('pnt'); }
  else if (s6) { res.push('vnt'); }
  else { res.push(null); }

  if (add) { res.push(1); }
  else if (subtract) { res.push(-1); }
  else { res.push(null); }

  if (res.length !== 2) { res = [null, null]; }
  return res;

}

window.onload = () => {

  startHeadCountUpdater();

  document.getElementById('wrapper').addEventListener('click', e => {

    let res = convertToCoordinate(e.clientX, e.clientY);
    updateHeadCount(res[0], res[1]);

  });

}
