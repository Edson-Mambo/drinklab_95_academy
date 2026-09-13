(()=>{
  const section=document.querySelector('#parceiros');
  if(section) section.remove();

  document.querySelectorAll('a[href="#parceiros"]').forEach(a=>a.remove());

  const scorpionCard=document.querySelector('.cards button[data-program="scorpion"]');
  if(scorpionCard) scorpionCard.remove();

  // Scorpion é parceiro, não serviço: remover a secção própria de serviço.
  const scorpionSection=document.querySelector('#scorpion');
  if(scorpionSection) scorpionSection.remove();

  // Remover referências de navegação para a antiga área de serviço.
  document.querySelectorAll('a[href="#scorpion"]').forEach(a=>a.remove());

  const footer=document.querySelector('.site-footer');
  if(!footer)return;

  const partnerBar=document.createElement('div');
  partnerBar.className='footer-partners';
  partnerBar.innerHTML=`
    <div class="footer-partners-head">
      <span>PARCEIROS &amp; PATROCÍNIO</span>
      <small>Marcas que caminham connosco.</small>
    </div>
    <div class="footer-partners-grid">
      <div class="footer-partner-item">
        <span class="footer-partner-mark">S</span>
        <div><strong>Scorpion</strong><small>Parceiro oficial</small></div>
      </div>
      <div class="footer-partner-item">
        <span class="footer-partner-mark">BM</span>
        <div><strong>Breezy Mambo Inc.</strong><small>Patrocinador Oficial da DrinkLab 95</small></div>
      </div>
    </div>
  `;

  const style=document.createElement('style');
  style.textContent=`
    .footer-partners{margin-top:34px;padding:28px 0;border-top:1px solid rgba(237,208,138,.14);border-bottom:1px solid rgba(237,208,138,.10)}
    .footer-partners-head{display:flex;align-items:baseline;justify-content:space-between;gap:20px;margin-bottom:18px}
    .footer-partners-head span{font-size:9px;font-weight:700;letter-spacing:.18em;color:var(--gold2)}
    .footer-partners-head small{color:var(--muted);font-size:11px}
    .footer-partners-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .footer-partner-item{display:flex;align-items:center;gap:14px;padding:14px 16px;border:1px solid rgba(237,208,138,.10);background:rgba(255,255,255,.015);border-radius:8px}
    .footer-partner-mark{width:40px;height:40px;flex:0 0 40px;display:grid;place-items:center;border:1px solid rgba(237,208,138,.25);border-radius:50%;color:var(--gold2);font:600 14px 'Playfair Display',serif}
    .footer-partner-item strong{display:block;color:var(--text);font-size:12px;margin-bottom:4px}
    .footer-partner-item small{display:block;color:#777064;font-size:9px;line-height:1.4}
    @media(max-width:700px){.footer-partners-head{display:block}.footer-partners-head small{display:block;margin-top:7px}.footer-partners-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
  footer.insertBefore(partnerBar,footer.firstChild);
})();