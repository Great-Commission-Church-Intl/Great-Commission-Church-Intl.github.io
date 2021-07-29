window.onload = async () => {

  let ministry = 'em';
  updateHeader(ministry);

  let attendance = await getAttendance();
  populateTable(attendance, ministry);
  generateStackedBarGraph(attendance, 12, ministry);
  generateLineGraph(attendance, ministry);

  setElement('average-physical', `${attendance.getAveragePhysical(ministry)}`);
  setElement('average-virtual', `${attendance.getAverageVirtual(ministry)}`);
  setElement('average-attendance', `${attendance.getAverageTotal(ministry)}`);
  setElement('peak-attendance', `${attendance.getPeakAttendance(ministry)}`);
  setElement('last-attendance', `${attendance.entries[0].getTotal(ministry)}`);
  setElement('percent-change', `${addPlusSignForPositive(Attendance.getPercentChange(attendance.entries[0], attendance.entries[1], ministry))}%`);

  updatePercentChange();

}

function updateHeader(ministry) { document.getElementById('page-header').innerHTML = `GCCI ${getMinistryName(ministry)} Sunday Service Attendance`; }

function getMinistryName(ministry) {
  switch(ministry) {
    case 'chm': return "Chinese Ministry"
    case 'cm': return "Children's Ministry"
    case 'em': return "English Ministry"
    default: return "Ministry"
  }
}
