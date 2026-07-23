(function () {
  'use strict';

  const mobileQuery = window.matchMedia('(max-width: 800px)');
  const isInstagram = /Instagram|FBAN|FBAV/i.test(navigator.userAgent || '');
  const bg = document.getElementById('psy-background');
  const frames = Array.from(document.querySelectorAll('.psy-frame'));
  const videos = frames.map(function (frame) {
    return frame.querySelector('.psy-video');
  }).filter(Boolean);

  let desktopObserver = null;
  let activeFrame = null;
  let ticking = false;

  function safePlay(video) {
    if (!video) return;
    const result = video.play();
    if (result && typeof result.catch === 'function') result.catch(function () {});
  }

  function revealVideoWhenReady(video) {
    if (!video || video.dataset.readyListener === '1') return;
    video.dataset.readyListener = '1';

    function reveal() {
      video.classList.add('is-ready');
    }

    video.addEventListener('playing', reveal, { once: true });
    video.addEventListener('loadeddata', function () {
      if (!video.paused && video.readyState >= 2) reveal();
    });
    video.addEventListener('error', function () {
      video.classList.remove('is-ready');
    });
  }

  function loadDesktopVideo(video) {
    revealVideoWhenReady(video);
    if (!video.getAttribute('src')) {
      video.src = video.dataset.src;
      video.load();
    }
    safePlay(video);
  }

  function unloadVideo(video) {
    video.pause();
    video.classList.remove('is-ready');
    if (video.getAttribute('src')) {
      video.removeAttribute('src');
      video.load();
    }
  }

  function stopDesktopObserver() {
    if (desktopObserver) {
      desktopObserver.disconnect();
      desktopObserver = null;
    }
  }

  function startDesktopMode() {
    document.body.classList.remove('safe-mobile-mode');
    stopDesktopObserver();

    const base = 'media/psychedelic-exact/background-desktop';
    bg.poster = base + '-poster.jpg';
    if (bg.getAttribute('src') !== base + '.mp4') {
      bg.src = base + '.mp4';
      bg.load();
    }
    safePlay(bg);

    if ('IntersectionObserver' in window) {
      desktopObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const video = entry.target;
          if (entry.isIntersecting) loadDesktopVideo(video);
          else {
            video.pause();
            video.classList.remove('is-ready');
          }
        });
      }, { rootMargin: '120px 0px', threshold: 0.08 });
      videos.forEach(function (video) { desktopObserver.observe(video); });
    } else {
      videos.forEach(loadDesktopVideo);
    }
  }

  function chooseActiveFrame() {
    ticking = false;
    if (!document.body.classList.contains('safe-mobile-mode')) return;

    const viewportCenter = window.innerHeight / 2;
    let closest = null;
    let closestDistance = Infinity;

    frames.forEach(function (frame) {
      const rect = frame.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter);
      if (distance < closestDistance) {
        closest = frame;
        closestDistance = distance;
      }
    });

    if (!closest) closest = frames[0] || null;
    if (closest === activeFrame) return;
    if (activeFrame) activeFrame.classList.remove('is-active');
    activeFrame = closest;
    if (activeFrame) activeFrame.classList.add('is-active');
  }

  function requestActiveFrameUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(chooseActiveFrame);
  }

  function startSafeMobileMode() {
    document.body.classList.add('safe-mobile-mode');
    stopDesktopObserver();

    bg.pause();
    if (bg.getAttribute('src')) {
      bg.removeAttribute('src');
      bg.load();
    }

    videos.forEach(unloadVideo);
    requestActiveFrameUpdate();
  }

  function useSafeMobileMode() {
    return mobileQuery.matches || isInstagram;
  }

  function configureMode() {
    if (useSafeMobileMode()) startSafeMobileMode();
    else startDesktopMode();
  }

  function retryDesktopPlayback() {
    if (document.hidden || useSafeMobileMode()) return;
    safePlay(bg);
    videos.forEach(function (video) {
      const rect = video.getBoundingClientRect();
      if (rect.bottom > -120 && rect.top < window.innerHeight + 120) loadDesktopVideo(video);
    });
  }

  configureMode();

  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', configureMode);
  else mobileQuery.addListener(configureMode);

  window.addEventListener('scroll', requestActiveFrameUpdate, { passive: true });
  window.addEventListener('resize', requestActiveFrameUpdate, { passive: true });
  window.addEventListener('orientationchange', requestActiveFrameUpdate, { passive: true });

  ['pointerdown', 'touchstart', 'click'].forEach(function (eventName) {
    document.addEventListener(eventName, retryDesktopPlayback, { passive: true });
  });

  window.addEventListener('pageshow', function () {
    configureMode();
    retryDesktopPlayback();
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      bg.pause();
      videos.forEach(function (video) { video.pause(); });
    } else {
      configureMode();
      retryDesktopPlayback();
    }
  });
})();
