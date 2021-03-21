var activeTab = 'gi-header-audio';
const tabs = ['gi-header-audio', 'gi-header-video', 'gi-header-misc'];
const contentTabs = ['gi-content-audio', 'gi-content-video', 'gi-content-misc'];

function switchTab(id) {

  document.getElementById(activeTab).classList.remove('highlight');
  document.getElementById(contentTabs[tabs.indexOf(activeTab)]).classList.add('gi-content-hidden');
  activeTab = id;
  document.getElementById(activeTab).classList.add('highlight');
  document.getElementById(contentTabs[tabs.indexOf(activeTab)]).classList.remove('gi-content-hidden');
  
  let left = tabs.indexOf(id) * 33;
  document.getElementById('gi-header-underline').style.left = `${left}%`;

}

window.onload = function() {

  document.getElementById('gi-header-audio').addEventListener('click', function() { switchTab('gi-header-audio'); });
  document.getElementById('gi-header-video').addEventListener('click', function() { switchTab('gi-header-video'); });
  document.getElementById('gi-header-misc').addEventListener('click', function() { switchTab('gi-header-misc'); });

}
