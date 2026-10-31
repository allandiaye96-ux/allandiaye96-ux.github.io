(function () {
  var root = document.documentElement;
  function setLang(l) {
    root.lang = l;
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.setLang === l ? 'true' : 'false');
    });
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var param = new URLSearchParams(location.search).get('lang');
  var initial = param || saved || ((navigator.language || 'fr').slice(0, 2) === 'fr' ? 'fr' : 'en');
  setLang(initial === 'en' ? 'en' : 'fr');
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.setLang); });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.exp, .proj, .skill, .gal figure, .pubs li, .edu li').forEach(function (el) {
      el.classList.add('reveal'); io.observe(el);
    });
  }
})();
