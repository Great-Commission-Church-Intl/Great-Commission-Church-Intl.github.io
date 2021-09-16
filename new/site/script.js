function updateElementsOnScroll(pos, vh) {

  scrollPercentage = pos / vh;

  //Navigation Overlay Fade on Scroll
  let navigationOverlay = document.getElementById('navigation-overlay');
  let opacity = 1 - scrollPercentage * 2;
  navigationOverlay.style.opacity = opacity;

  //Blur Background on Scroll
  let splashContent = document.getElementById('splash-content');
  splashContent.style.backdropFilter = `blur(${scrollPercentage * 50}px)`;

  //Fix Navigation Bar
  let staticNavBar = document.getElementById('navigation-static');
  let staticNavPlaceholder = document.getElementById('navigation-placeholder');
  if (scrollPercentage >= 1) { staticNavBar.style.position = 'fixed'; staticNavBar.style.top = 0; }
  else { staticNavBar.style.position = 'initial'; staticNavBar.style.top = 'initial'; }
  if (scrollPercentage >= 1) { staticNavPlaceholder.style.display = 'block'; }
  else { staticNavPlaceholder.style.display = 'none'; }
  staticNavBar.style.opacity = scrollPercentage;

}

window.onload = () => {

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  pos = window.scrollY;
  updateElementsOnScroll(pos, vh);

  ticking = false;
  document.addEventListener('scroll', function(e) {
    pos = window.scrollY;
    if (!ticking) { window.requestAnimationFrame(function() { updateElementsOnScroll(pos, vh); ticking = false; }); ticking = true; }
  });

}
