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

  function fallbackCopy(text){
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try{ document.execCommand('copy'); showToast('Kopyalandı: ' + text); }catch(e){ showToast('Kopyalama başarısız'); }
    document.body.removeChild(input);
  }

  document.addEventListener('click', function(e){
    const btn = e.target.closest('[data-copy]');
    if(!btn) return;
    const text = btn.getAttribute('data-copy');
    if(!text) return;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(()=> showToast('Kopyalandı: ' + text)).catch(()=> fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  });

  // small enhancement: open external links with rel already set; nothing else needed
})();
