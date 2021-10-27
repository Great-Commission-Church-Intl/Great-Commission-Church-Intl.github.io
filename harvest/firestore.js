import { db } from './firebase.js';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { updateElement } from './helper.js';

let globalHeadCount = { global: 0, tdlr: 0, k6: 0, mH: 0, ya: 0, pnt: 0, vnt: 0 };

function updateHeadCount(f, v) {

  if (f === null || v === null) { return console.log(`Invalid click! This click will not be counted!`); }
  if (globalHeadCount[`${f}`] <= 0 && v === -1) return;

  /* Collection: 'general' | Document: 'zu5OdkwuR3Vc7UdvD3dR_harvestFestival' */
  let docRef = doc(db, 'general', 'zu5OdkwuR3Vc7UdvD3dR_harvestFestival');
  switch(f) {
    case 'tdlr': updateDoc(docRef, { tdlr: increment(v) }); break;
    case 'k6': updateDoc(docRef, { k6: increment(v) }); break;
    case 'mH': updateDoc(docRef, { mH: increment(v) }); break;
    case 'ya': updateDoc(docRef, { ya: increment(v) }); break;
    case 'pnt': updateDoc(docRef, { pnt: increment(v) }); break;
    case 'vnt': updateDoc(docRef, { vnt: increment(v) }); break;
    default: return;
  }

  globalHeadCount.global += v;
  globalHeadCount[`${f}`] += v;
  updateHeadCountLabels();

}

function getHeadCount() {

  return new Promise( async(resolve, reject) => {
    let docRef = doc(db, 'general', 'zu5OdkwuR3Vc7UdvD3dR_harvestFestival');
    let docSnap = await getDoc(docRef);
    let data = docSnap.data();
    resolve(data);
  });

}

function updateHeadCountLabels() {

  updateElement(document.getElementById('head-count'), globalHeadCount.global);
  updateElement(document.getElementById('tdlr-value'), globalHeadCount.tdlr);
  updateElement(document.getElementById('k6-value'), globalHeadCount.k6);
  updateElement(document.getElementById('mH-value'), globalHeadCount.mH);
  updateElement(document.getElementById('ya-value'), globalHeadCount.ya);
  updateElement(document.getElementById('pnt-value'), globalHeadCount.pnt);
  updateElement(document.getElementById('vnt-value'), globalHeadCount.vnt);

}

async function startHeadCountUpdater() {

  getHeadCount().then(data => {

    let total = data.tdlr + data.k6 + data.mH + data.ya + data.pnt + data.vnt;
    globalHeadCount.global = total;
    globalHeadCount.tdlr = data.tdlr;
    globalHeadCount.k6 = data.k6;
    globalHeadCount.mH = data.mH;
    globalHeadCount.ya = data.ya;
    globalHeadCount.pnt = data.pnt;
    globalHeadCount.vnt = data.vnt;

    updateHeadCountLabels();

  });

  setInterval(function() {
    getHeadCount().then(data => {

      let total = data.tdlr + data.k6 + data.mH + data.ya + data.pnt + data.vnt;
      globalHeadCount.global = total;
      globalHeadCount.tdlr = data.tdlr;
      globalHeadCount.k6 = data.k6;
      globalHeadCount.mH = data.mH;
      globalHeadCount.ya = data.ya;
      globalHeadCount.pnt = data.pnt;
      globalHeadCount.vnt = data.vnt;

      updateHeadCountLabels();

    });
  }, 60000);
}

export { updateHeadCount, startHeadCountUpdater }
