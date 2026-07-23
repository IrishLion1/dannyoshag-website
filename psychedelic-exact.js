(function () {
  const mobile = window.matchMedia('(max-width:800px)');
  const bg = document.getElementById('psy-background');
  const videos = Array.from(document.querySelectorAll('.psy-video'));
  let bgMode = '';

  function safePlay(video) {
    if (!video) return;
    const result = video.play();
    if (result && typeof result.catch === 'function') {
      result.catch(function () {
        // Instagram and other in-app browsers may reject autoplay initially.
        // A later user gesture will call retryVisibleVideos().
      });
    }
  }

  function setBackground() {
    const mode = mobile.matches ? 'mobile' : 'desktop';
    if (mode === bgMode && bg.currentSrc) return;
    bgMode = mode;
    const base = 'media/psychedelic-exact/background-' + mode;
    bg.poster = base + '-poster.jpg';
    bg.src = base + '.mp4';
    bg.load();
    safePlay(bg);
  }

  function loadAndPlay(video) {
    if (!video.src) {
      video.src = video.dataset.src;
      video.load();
    }
    safePlay(video);
  }

  function isNearViewport(video) {
    const rect = video.getBoundingClientRect();
    return rect.bottom > -220 && rect.top < window.innerHeight + 220;
  }

  function retryVisibleVideos() {
    if (document.hidden) return;
    safePlay(bg);
    videos.forEach(function (video) {
      if (isNearViewport(video)) loadAndPlay(video);
    });
  }

  setBackground();
  if (mobile.addEventListener) mobile.addEventListener('change', setBackground);
  else mobile.addListener(setBackground);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) loadAndPlay(entry.target);
        else entry.target.pause();
      });
    }, { rootMargin: '220px 0px', threshold: 0.01 });
    videos.forEach(function (video) { observer.observe(video); });
  } else {
    videos.forEach(loadAndPlay);
  }

  // Critical for Instagram's in-app browser: retry after a real user gesture.
  ['pointerdown', 'touchstart', 'click'].forEach(function (eventName) {
    document.addEventListener(eventName, retryVisibleVideos, { passive: true });
  });

  window.addEventListener('pageshow', retryVisibleVideos, { passive: true });
  window.addEventListener('focus', retryVisibleVideos, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      bg.pause();
      videos.forEach(function (video) { video.pause(); });
    } else {
      retryVisibleVideos();
    }
  });
})();
