(function(){
  function showToast(message){
    const toast = document.getElementById('toast');
    if(!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden','false');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(()=>{
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden','true');
    },2500);
  }

  function showCenterToast(message, duration = 5000){
    const toast = document.getElementById('center-toast');
    if(!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden','false');
    clearTimeout(window.__centerToastTimer);
    window.__centerToastTimer = setTimeout(()=>{
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden','true');
    }, duration);
  }

  function fallbackCopy(text, isDiscord){
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try{ document.execCommand('copy'); handleCopySuccess(text, isDiscord); }catch(e){ if(isDiscord) showCenterToast('Kopyalama başarısız',2500); else showToast('Kopyalama başarısız'); }
    document.body.removeChild(input);
  }

  function handleCopySuccess(text, isDiscord){
    if(isDiscord){
      // show centered username without discriminator
      showCenterToast('Jung1330', 5000);
    } else {
      showToast('Kopyalandı: ' + text);
    }
  }

  document.addEventListener('click', function(e){
    const btn = e.target.closest('[data-copy]');
    if(!btn) return;
    const text = btn.getAttribute('data-copy');
    if(!text) return;
    const aria = (btn.getAttribute('aria-label') || '').toLowerCase();
    const isDiscord = aria.includes('discord');
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(()=> handleCopySuccess(text, isDiscord)).catch(()=> fallbackCopy(text, isDiscord));
    } else {
      fallbackCopy(text, isDiscord);
    }
  });

})();
