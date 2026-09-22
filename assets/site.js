'use strict';
const config = window.VOSIK_CONFIG || {};
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#main-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
  navigation.classList.toggle('open', open);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.click(); menu.focus();
  }
});
window.matchMedia('(min-width: 781px)').addEventListener('change', ({matches}) => {
  if (matches) { navigation.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.textContent='Menu'; }
});
document.querySelectorAll('[data-stage-button]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-stage-button]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelectorAll('[data-stage]').forEach(panel => panel.hidden = panel.dataset.stage !== button.dataset.stageButton);
}));
function safeWebUrl(value) { try { const u = new URL(value, location.href); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; } }
if (config.bookingUrl && safeWebUrl(config.bookingUrl)) document.querySelectorAll('[data-booking]').forEach(a => a.href = safeWebUrl(config.bookingUrl));
const videoSlot = document.querySelector('[data-video-slot]');
if (videoSlot && config.videoUrl && safeWebUrl(config.videoUrl)) {
  const video = document.createElement('video'); video.controls=true; video.preload='metadata'; video.style.width='100%'; video.setAttribute('aria-label','Vosik five-minute product demonstration'); video.src=safeWebUrl(config.videoUrl);
  if(config.videoCaptions) {const track=document.createElement('track'); track.kind='captions';track.srclang='en';track.label='English';track.src=config.videoCaptions;video.append(track);}
  videoSlot.replaceChildren(video); videoSlot.className='video-ready';
}
const form=document.querySelector('#quote-form');
if(form) {
  form.querySelector("[type=submit]").disabled=false;
  const notice=document.querySelector('[data-form-notice]');
  if(config.quoteEndpoint && safeWebUrl(config.quoteEndpoint)) notice.hidden=true;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if(!form.reportValidity()) return;
    const status=document.querySelector('#form-status');
    if(!config.quoteEndpoint || !safeWebUrl(config.quoteEndpoint)) {
      status.textContent='Preview only: this form is not connected to Sales. Nothing has been sent or saved.';
      status.focus(); return;
    }
    const submit=form.querySelector('[type=submit]');submit.disabled=true;submit.textContent='Sending…';status.textContent='';
    try {
      const response=await fetch(safeWebUrl(config.quoteEndpoint),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
      if(!response.ok) throw new Error('Request was not accepted');
      status.textContent='Thank you. Your quote request has been received. Our sales team will contact you at the email address provided.';form.reset();
    } catch {status.textContent='Your request could not be sent. Please try again.';}
    finally {submit.disabled=false;submit.textContent='Request My Quote';status.focus();}
  });
}
