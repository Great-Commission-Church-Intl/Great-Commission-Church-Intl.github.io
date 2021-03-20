var activeImage = null;
var detailActive = false;

function switchToImage(target) {
  if (detailActive) return;
  activeImage.classList.add('video-component-hidden');
  activeImage = document.getElementById(target);
  activeImage.classList.remove('video-component-hidden');
}

window.onload = function() {

  //Set Active Image
  activeImage = document.getElementById('imageAll');

  //Setup Hover Listeners
  document.getElementById('videoPPTComputer').addEventListener('mouseover', function() { switchToImage('imagePPTComputer') });
  document.getElementById('videoBroadcastComputer').addEventListener('mouseover', function() { switchToImage('imageBroadcastComputer') });
  document.getElementById('videoHDMISplitter').addEventListener('mouseover', function() { switchToImage('imageHDMISplitter') });
  document.getElementById('videoHDMISwitcher').addEventListener('mouseover', function() { switchToImage('imageHDMISwitcher') });
  document.getElementById('videoCamcorder').addEventListener('mouseover', function() { switchToImage('imageCamcorder') });
  document.getElementById('videoATEMSwitcher').addEventListener('mouseover', function() { switchToImage('imageATEMSwitcher') });
  document.getElementById('videoFrontProjector').addEventListener('mouseover', function() { switchToImage('imageFrontProjector') });
  document.getElementById('videoBackProjector').addEventListener('mouseover', function() { switchToImage('imageBackProjector') });

  //Setup Leave Listeners
  document.getElementById('videoPPTComputer').addEventListener('mouseout', function() { switchToImage('imageAll') });
  document.getElementById('videoBroadcastComputer').addEventListener('mouseout', function() { switchToImage('imageAll') });
  document.getElementById('videoHDMISplitter').addEventListener('mouseout', function() { switchToImage('imageAll') });
  document.getElementById('videoHDMISwitcher').addEventListener('mouseout', function() { switchToImage('imageAll') });
  document.getElementById('videoCamcorder').addEventListener('mouseout', function() { switchToImage('imageAll') });
  document.getElementById('videoATEMSwitcher').addEventListener('mouseout', function() { switchToImage('imageAll') });
  document.getElementById('videoFrontProjector').addEventListener('mouseout', function() { switchToImage('imageAll') });
  document.getElementById('videoBackProjector').addEventListener('mouseout', function() { switchToImage('imageAll') });

};
