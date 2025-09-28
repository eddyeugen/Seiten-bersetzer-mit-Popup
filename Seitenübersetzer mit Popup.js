// ==UserScript==
// @name         Seitenübersetzer mit Popup
// @namespace    https://test.com
// @version      1.0
// @description  Quick-Translate-Button mit Sprachwahl
// @match        *://*/*
// @grant        none
// ==/UserScript==
(function() {
  'use strict';

  // 1) Button anlegen
  const btn = document.createElement('button');
  btn.textContent = '🌐 Translate';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: '9999',
    padding: '8px 12px',
    background: '#4285F4',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  });
  document.body.appendChild(btn);

  // 2) Popup mit Sprach-Dropdowns
  const popup = document.createElement('div');
  Object.assign(popup.style, {
    display: 'none',
    position: 'fixed',
    bottom: '50px',
    right: '10px',
    background: '#fff',
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    zIndex: '9999'
  });
  document.body.appendChild(popup);

  // 3) Sprachen-Liste (Code:Name)
  const langs = {
    auto: 'Auto',
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    es: 'Español',
    it: 'Italiano',
    pt: 'Português',
    ru: 'Русский',
    ja: '日本語',
    'zh-CN': '简体中文'
  };

  // 4) Zwei Select-Elemente erzeugen
  function makeSelect(defaultCode) {
    const sel = document.createElement('select');
    for (const code in langs) {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = langs[code];
      sel.appendChild(opt);
    }
    sel.value = defaultCode;
    return sel;
  }
  const fromSel = makeSelect('auto');
  const toSel   = makeSelect('de');
  popup.appendChild(fromSel);
  popup.appendChild(toSel);

  // 5) Translate-Knopf im Popup
  const go = document.createElement('button');
  go.textContent = 'Translate';
  Object.assign(go.style, { marginLeft: '8px', padding: '4px 8px' });
  popup.appendChild(go);

  // 6) Klick-Handler
  btn.addEventListener('click', () => {
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
  });
  go.addEventListener('click', () => {
    const sl = fromSel.value;
    const tl = toSel.value;
    const url = `https://translate.google.com/translate?sl=${sl}&tl=${tl}&u=${encodeURIComponent(location.href)}`;
    window.open(url, '_blank');
  });

  // 7) Klick außerhalb schließt das Popup
  document.addEventListener('click', e => {
    if (!popup.contains(e.target) && !btn.contains(e.target)) {
      popup.style.display = 'none';
    }
  });
})();
