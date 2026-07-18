(function(){
  const mobile=window.matchMedia('(max-width:800px)');
  const bg=document.getElementById('psy-background');
  let bgMode='';
  function setBackground(){
    const mode=mobile.matches?'mobile':'desktop';
    if(mode===bgMode)return;
    bgMode=mode;
    const base='media/psychedelic-exact/background-'+mode;
    bg.poster=base+'-poster.jpg';
    bg.src=base+'.mp4';
    bg.load();
    bg.play().catch(function(){});
  }
  setBackground();
  if(mobile.addEventListener)mobile.addEventListener('change',setBackground); else mobile.addListener(setBackground);
  const videos=Array.from(document.querySelectorAll('.psy-video'));
  function loadAndPlay(v){ if(!v.src){v.src=v.dataset.src;v.load();} v.play().catch(function(){}); }
  const observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){ if(entry.isIntersecting)loadAndPlay(entry.target); else entry.target.pause(); });
  },{rootMargin:'220px 0px',threshold:0.01});
  videos.forEach(function(v){observer.observe(v);});
  document.addEventListener('visibilitychange',function(){
    if(document.hidden){bg.pause();videos.forEach(function(v){v.pause();});}
    else {bg.play().catch(function(){});videos.forEach(function(v){const r=v.getBoundingClientRect();if(r.bottom>-220&&r.top<innerHeight+220)loadAndPlay(v);});}
  });
})();