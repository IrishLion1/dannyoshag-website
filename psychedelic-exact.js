(function () {
  'use strict';

  const mobileQuery = window.matchMedia('(max-width: 800px)');
  const bg = document.getElementById('psy-background');
  const frames = Array.from(document.querySelectorAll('.psy-frame'));
  const videos = frames.map(function (frame) { return frame.querySelector('.psy-video'); }).filter(Boolean);

  let backgroundMode = '';
  let desktopObserver = null;
  let activeIndex = -1;
  let lastScrollY = window.scrollY;
  let scrollDirection = 1;
  let updateQueued = false;

  function safePlay(video) {
    if (!video) return;
    const promise = video.play();
    if (promise && typeof promise.catch === 'function') promise.catch(function () {});
  }

  function ensureSource(video, preload) {
    if (!video || !video.dataset.src) return;
    video.preload = preload || 'auto';
    if (!video.getAttribute('src')) {
      video.src = video.dataset.src;
      video.load();
    }
  }

  function unload(video) {
    if (!video) return;
    video.pause();
    video.classList.remove('is-ready');
    if (video.getAttribute('src')) {
      video.removeAttribute('src');
      video.load();
    }
  }

  videos.forEach(function (video) {
    video.disablePictureInPicture = true;
    video.addEventListener('playing', function () { video.classList.add('is-ready'); });
    video.addEventListener('loadeddata', function () {
      if (!video.paused) video.classList.add('is-ready');
    });
    video.addEventListener('emptied', function () { video.classList.remove('is-ready'); });
  });

  function configureBackground() {
    const mode = mobileQuery.matches ? 'mobile' : 'desktop';
    if (mode !== backgroundMode) {
      backgroundMode = mode;
      const base = 'media/psychedelic-exact/background-' + mode;
      bg.poster = base + '-poster.jpg';
      bg.src = base + '.mp4';
      bg.load();
    }
    safePlay(bg);
  }

  function stopDesktopObserver() {
    if (desktopObserver) desktopObserver.disconnect();
    desktopObserver = null;
  }

  function startDesktop() {
    activeIndex = -1;
    stopDesktopObserver();
    configureBackground();

    if ('IntersectionObserver' in window) {
      desktopObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const video = entry.target;
          if (entry.isIntersecting) {
            ensureSource(video, 'auto');
            safePlay(video);
          } else {
            video.pause();
          }
        });
      }, { rootMargin: '120px 0px', threshold: 0.05 });
      videos.forEach(function (video) { desktopObserver.observe(video); });
    } else {
      videos.forEach(function (video) {
        ensureSource(video, 'auto');
        safePlay(video);
      });
    }
  }

  function nearestVisibleFrame() {
    const viewportCenter = window.innerHeight / 2;
    let bestIndex = -1;
    let bestDistance = Infinity;

    frames.forEach(function (frame, index) {
      const rect = frame.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const distance = Math.abs((rect.top + rect.height / 2) - viewportCenter);
      if (distance < bestDistance) {
        bestIndex = index;
        bestDistance = distance;
      }
    });

    return bestIndex;
  }

  function updateMobilePlayback() {
    updateQueued = false;
    if (!mobileQuery.matches || document.hidden) return;

    const nextActive = nearestVisibleFrame();
    if (nextActive < 0) {
      videos.forEach(function (video) { video.pause(); });
      return;
    }

    activeIndex = nextActive;
    const preloadIndex = Math.max(0, Math.min(videos.length - 1, activeIndex + scrollDirection));

    videos.forEach(function (video, index) {
      if (index === activeIndex) {
        ensureSource(video, 'auto');
        safePlay(video);
      } else {
        video.pause();
        if (index === preloadIndex) {
          ensureSource(video, 'metadata');
        } else if (Math.abs(index - activeIndex) > 1) {
          unload(video);
        }
      }
    });
  }

  function queueMobileUpdate() {
    if (!mobileQuery.matches || updateQueued) return;
    updateQueued = true;
    window.requestAnimationFrame(updateMobilePlayback);
  }

  function startMobile() {
    stopDesktopObserver();
    configureBackground();
    queueMobileUpdate();
  }

  function configureMode() {
    if (mobileQuery.matches) startMobile();
    else startDesktop();
  }

  function retryPlayback() {
    if (document.hidden) return;
    configureBackground();
    if (mobileQuery.matches) {
      queueMobileUpdate();
      if (activeIndex >= 0) safePlay(videos[activeIndex]);
    } else {
      videos.forEach(function (video) {
        const rect = video.getBoundingClientRect();
        if (rect.bottom > -120 && rect.top < window.innerHeight + 120) {
          ensureSource(video, 'auto');
          safePlay(video);
        }
      });
    }
  }

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    if (Math.abs(y - lastScrollY) > 2) scrollDirection = y >= lastScrollY ? 1 : -1;
    lastScrollY = y;
    queueMobileUpdate();
  }, { passive: true });

  window.addEventListener('resize', queueMobileUpdate, { passive: true });
  window.addEventListener('orientationchange', queueMobileUpdate, { passive: true });

  ['touchstart', 'pointerdown', 'click'].forEach(function (eventName) {
    document.addEventListener(eventName, retryPlayback, { passive: true });
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      bg.pause();
      videos.forEach(function (video) { video.pause(); });
    } else {
      configureMode();
      retryPlayback();
    }
  });

  window.addEventListener('pageshow', function () {
    configureMode();
    retryPlayback();
  }, { passive: true });

  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', configureMode);
  else mobileQuery.addListener(configureMode);

  configureMode();
})();
