class SSAEntry {
  constructor(d, p, v) { this.d = d; this.p = p; this.v = v; }
  get date() { return this.d }
  get physical() { return this.p }
  get virtual() { return this.v }
}

async function retrieveSundayAttendanceData() {

  return new Promise((resolve, reject) => {

    db.collection('sundayServiceAttendance').orderBy('date', 'desc').get().then(querySnapshot => {

      let count = 0;
      let data = [];
      let dataPointP = [];
      let dataPointV = [];
      let dataPointT = [];
      let lastWeek = 0;
      let thisWeek = 0;
      let averagePhysical = 0;
      let averageVirtual = 0;

      for (const doc of querySnapshot.docs) {

        //Table Data
        let date = doc.get('date').toDate();
        let physical = parseInt(doc.get('physical'));
        let virtual = parseInt(doc.get('virtual'));
        data.push(new SSAEntry(date, physical, virtual));

        if (thisWeek < 1) { thisWeek = physical + virtual; }
        else if (lastWeek < 1) { lastWeek = physical + virtual; }
        averagePhysical += physical;
        averageVirtual += virtual;

        //Stacked Bar Graph Data
        if (count < 12) {

          //Physical Data
          let p = {};
          p.x = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          p.y = physical;
          p.toolTip = `Physical: ${physical}`;
          p.label = `${date.getMonth()+1}/${date.getDate()}`;
          dataPointP.push(p);

          //Virtual Data
          let v = {};
          v.x = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          v.y = virtual;
          v.toolTip = `Virtual: ${virtual}`;
          dataPointV.push(v);

        }

        //Total Data
        let t = {};
        t.x = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        t.y = physical + virtual;
        t.indexLabel = `${physical + virtual}`;
        t.label = `${date.getMonth()+1}/${date.getDate()}`;
        dataPointT.push(t);

        count++;
      }

      if (count < 1) { return resolve(); }

      averagePhysical /= data.length; averagePhysical = Math.round(averagePhysical * 10) / 10;
      averageVirtual /= data.length; averageVirtual = Math.round(averageVirtual * 10) / 10;
      pChange = ((thisWeek - lastWeek) / thisWeek) * 100; pChange = Math.round(pChange * 10) / 10;
      console.log(`Last Week: ${lastWeek} | This Week: ${thisWeek} | Percent Change: ${pChange}`);

      resolve([data, count, dataPointP, dataPointV, dataPointT, averagePhysical, averageVirtual, pChange]);

    }).catch(err => {
      console.log(err);
      reject();
    });
  });
}

function populateTable(data) {

  let table = document.getElementById('data');

  for (let week of data) {

    let row = table.insertRow();
    row.setAttribute('class', 'data');

    let dateCell = row.insertCell();
    dateCell.setAttribute('class', 'data');
    let dateText = document.createTextNode(week.date.toLocaleString([], {month: 'long', year: 'numeric', day: '2-digit'}));
    dateCell.appendChild(dateText);

    let physicalCell = row.insertCell();
    physicalCell.setAttribute('class', 'data');
    let physicalText = document.createTextNode(week.physical);
    physicalCell.appendChild(physicalText);

    let virtualCell = row.insertCell();
    virtualCell.setAttribute('class', 'data');
    let virtualText = document.createTextNode(week.virtual);
    virtualCell.appendChild(virtualText);
  }
}

function generateColumnChart(p, v) {

  var chart = new CanvasJS.Chart("stackedGraph", {

    animationEnabled: true,
    backgroundColor: 'transparent',
    toolTip: {
      content: "{name}: {y}"
    },
    title: {
      text: "GCCI EM Attendance Distribution - Past 12 Weeks",
      fontFamily: "Raleway",
      fontColor: "#695A42",
      fontSize: 22,
      margin: 20
    },
    axisX: {
      interval: 1,
      intervalType: "week"
    },
    axisY: {
      minimum: 0
    },
    data: [{
      type: "stackedColumn",
      showInLegend: true,
      color: "#696661",
      name: "Physical",
      dataPoints: p
    },
    {
			type: "stackedColumn",
			showInLegend: true,
			name: "Virtual",
			color: "#EDCA93",
			dataPoints: v
		}]
  });
  chart.render();
}

function generateLineGraph(t) {

  var chart = new CanvasJS.Chart("lineGraph", {

    animationEnabled: true,
    backgroundColor: 'transparent',
    title: {
      text: "GCCI EM Total Attendance",
      fontFamily: "Raleway",
      fontColor: "#695A42",
      fontSize: 22,
      margin: 20
    },
    axisX: {
      interval: 1,
      intervalType: "week"
    },
    data: [{
      type: "line",
      showInLegend: true,
      color: "#696661",
      name: "Total Attendance",
      dataPoints: t
    }]
  });
  chart.render();

}

window.onload = () => {

  retrieveSundayAttendanceData().then(data => {
    if (typeof data === 'undefined') { console.log('NO ENTRIES'); }
    else {

      console.log(`ENTRY COUNT: ${data[1]}`);
      console.log(data[0]);

      populateTable(data[0]);
      generateColumnChart(data[2], data[3]);
      generateLineGraph(data[4]);

      document.getElementById('average-physical').innerHTML = `${data[5]}`;
      document.getElementById('average-virtual').innerHTML = `${data[6]}`;
      document.getElementById('percent-change').innerHTML = `${data[7] > 0 ? "+" : ""}${data[7]}%`;
      if (data[7] < 0) { document.getElementById('percent-change').style.color = `#800000`; }
      if (data[7] > 0) { document.getElementById('percent-change').style.color = `#008000`; }

    }
  }).catch(err => {
    console.log(err);
    console.log('COULD NOT RETRIEVE SUNDAY ATTENDANCE DATA');
  });

}