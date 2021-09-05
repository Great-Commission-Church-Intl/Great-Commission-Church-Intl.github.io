class AttendanceEntry {

  constructor(date, chm, cm, em) {

    this.date = date;
    this.chm = chm; /* Chinese Ministry */
    this.cm = cm; /* Children's Ministry */
    this.em = em; /* English Ministry */

  }

  getDate() { return this.date; }
  getPhysical(ministry) { return this[`${ministry}`][`physical`]; }
  getVirtual(ministry) { return this[`${ministry}`][`virtual`]; }
  getNewcomers(ministry) { return this[`${ministry}`][`newcomer`]; }
  getTotal(ministry) { return this[`${ministry}`][`physical`] + this[`${ministry}`][`virtual`]; }

}

class Attendance {

  constructor() {
    this.entries = [];
  }

  getAveragePhysical(ministry) {
    let count = 0; let sum = 0;
    this.entries.forEach(entry => { sum += entry.getPhysical(ministry); count++; });
    return round(sum / count);
  }

  getAverageVirtual(ministry) {
    let count = 0; let sum = 0;
    this.entries.forEach(entry => { sum += entry.getVirtual(ministry); count++; });
    return round(sum / count);
  }

  getAverageNewcomers(ministry) {
    let count = 0; let sum = 0;
    this.entries.forEach(entry => { sum += entry.getNewcomers(ministry); count++; });
    return round(sum / count);
  }

  getAverageTotal(ministry) {
    let count = 0; let sum = 0;
    if (ministry != null) {
      this.entries.forEach(entry => { sum += entry.getTotal(ministry); count++; });
    } else {
      this.entries.forEach(entry => { sum += entry.getTotal('chm'); });
      this.entries.forEach(entry => { sum += entry.getTotal('cm'); });
      this.entries.forEach(entry => { sum += entry.getTotal('em'); });
      count++;
    }
    return round(sum / count);
  }

  getPeakAttendance(ministry) {
    let peak = 0;
    this.entries.forEach(entry => { peak = Math.max(peak, entry.getTotal(ministry)); });
    return peak;
  }

  generateStackedBarGraphDataPoints(weeks, ministry) {

    let dataPointP = [];
    let dataPointV = [];

    for (var i = 0; i < weeks; i++) {

      let entry = this.entries[i];
      let date = entry.getDate();
      let physical = entry.getPhysical(ministry);
      let virtual = entry.getVirtual(ministry);

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

    return [dataPointP, dataPointV];

  }

  generateLineGraphDataPoints(ministry) {

    let dataPointT = [];

    this.entries.forEach(entry => {

      let date = entry.getDate();

      //Total Data
      let t = {};
      t.x = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      t.y = entry.getTotal(ministry);
      t.indexLabel = `${entry.getTotal(ministry)}`;
      t.label = `${date.getMonth()+1}/${date.getDate()}`;
      dataPointT.push(t);

    });

    return dataPointT;

  }

  static getPercentChange(current, previous, ministry) {
    let pc = ((current.getTotal(ministry) - previous.getTotal(ministry)) / current.getTotal(ministry)) * 100;
    return Math.round(pc * 100) / 100;
  }

}

function getAttendance() {

  return new Promise( async(resolve, reject) => {

    let querySnapshot = await db.collection('attendance').orderBy('date', 'desc').get();
    let attendance = new Attendance();

    for (const doc of querySnapshot.docs) {

      let date = doc.get('date').toDate();
      let chm = doc.get('CHM');
      let cm = doc.get('CM');
      let em = doc.get('EM');

      let attn = new AttendanceEntry(date, chm, cm, em);
      attendance.entries.push(attn);

    }

    resolve(attendance);

  });
}

function populateTable(attendance, ministry) {

  let table = document.getElementById('data');
  attendance.entries.forEach(entry => {

    let row = table.insertRow();
    row.setAttribute('class', 'data');

    let dateCell = row.insertCell();
    dateCell.setAttribute('class', 'data');
    let dateText = document.createTextNode(entry.getDate().toLocaleString('en-US', { month: '2-digit', day: '2-digit' }));
    dateCell.appendChild(dateText);

    let physicalCell = row.insertCell();
    physicalCell.setAttribute('class', 'data');
    let physicalText = document.createTextNode(entry.getPhysical(ministry));
    physicalCell.appendChild(physicalText);

    let virtualCell = row.insertCell();
    virtualCell.setAttribute('class', 'data');
    let virtualText = document.createTextNode(entry.getVirtual(ministry));
    virtualCell.appendChild(virtualText);

    let totalCell = row.insertCell();
    totalCell.setAttribute('class', 'data');
    let totalText = document.createTextNode(entry.getTotal(ministry));
    totalCell.appendChild(totalText);

  });

}

function generateStackedBarGraph(attendance, weeks, ministry) {

  let data = attendance.generateStackedBarGraphDataPoints(weeks, ministry);

  var chart = new CanvasJS.Chart("stackedGraph", {

    animationEnabled: true,
    backgroundColor: 'transparent',
    toolTip: {
      content: "{name}: {y}"
    },
    title: {
      text: `GCCI ${ministry.toUpperCase()} Attendance Distribution - Past ${weeks} Weeks`,
      fontFamily: "Raleway",
      fontColor: "#695A42",
      fontSize: 22,
      margin: 20,
      horizontalAlign: "center"
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
      dataPoints: data[0]
    },
    {
			type: "stackedColumn",
			showInLegend: true,
			name: "Virtual",
			color: "#EDCA93",
			dataPoints: data[1]
		}]

  });

  chart.render();

}

function generateLineGraph(attendance, ministry) {

  var chart = new CanvasJS.Chart("lineGraph", {

    animationEnabled: true,
    backgroundColor: 'transparent',
    title: {
      text: `GCCI ${ministry.toUpperCase()} Total Attendance`,
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
      lineThickness: 0,
      showInLegend: true,
      color: "#696661",
      name: "Total Attendance",
      dataPoints: attendance.generateLineGraphDataPoints(ministry)
    }]
  });

  chart.render();

}

function round(num) { return Math.round(num * 10) / 10; }

function setElement(element, value) { document.getElementById(element).innerHTML = `${value}`; }

function addPlusSignForPositive(value) { return value > 0 ? `+${value}` : value; }

function updatePercentChange() {
  let value = parseFloat(document.getElementById('percent-change').innerHTML);
  if (value < 0) { document.getElementById('percent-change').style.color = '#A00000'; }
  if (value > 0) { document.getElementById('percent-change').style.color = '#00A000'; }
}
