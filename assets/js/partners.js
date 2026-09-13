(()=>{
  const section=document.querySelector('#parceiros');
  if(!section)return;
  const style=document.createElement('style');
  style.textContent=`
    #parceiros{position:relative;overflow:hidden;isolation:isolate;padding:clamp(34px,6vw,64px)!important;background:radial-gradient(circle at 15% 15%,rgba(201,151,61,.12),transparent 32%),radial-gradient(circle at 88% 85%,rgba(255,255,255,.035),transparent 30%),linear-gradient(135deg,#18140d 0%,#0b0a08 52%,#080808 100%)!important}
    #parceiros:before{content:'';position:absolute;inset:16px;border:1px solid rgba(237,208,138,.10);pointer-events:none}
    #parceiros .partner-head{position:relative;z-index:1;text-align:center;max-width:780px;margin:0 auto 38px}
    #parceiros .partner-head h2{margin:9px 0 13px;font:600 clamp(30px,4.5vw,48px)/1.08 'Playfair Display',serif}
    #parceiros .partner-head p:not(.eyebrow){margin:0 auto;color:var(--muted);line-height:1.85;font-size:14px}
    #parceiros .partner-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;max-width:980px;margin:0 auto}
    #parceiros .partner-card{position:relative;min-height:285px;padding:31px;background:rgba(5,5,5,.48);border:1px solid rgba(237,208,138,.16);border-radius:12px;overflow:hidden;transition:.35s;box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}
    #parceiros .partner-card:after{content:'';position:absolute;right:-70px;bottom:-90px;width:220px;height:220px;border-radius:50%;border:1px solid rgba(237,208,138,.07);box-shadow:0 0 70px rgba(201,151,61,.06)}
    #parceiros .partner-card:hover{transform:translateY(-6px);border-color:rgba(237,208,138,.42);box-shadow:0 24px 60px rgba(0,0,0,.38)}
    #parceiros .partner-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border:1px solid rgba(237,208,138,.22);border-radius:999px;color:#b7aa90;font-size:8px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
    #parceiros .partner-badge:before{content:'✦';color:var(--gold2);font-size:10px}
    #parceiros .partner-mark{width:62px;height:62px;margin:26px 0 20px;display:grid;place-items:center;border:1px solid rgba(237,208,138,.26);border-radius:50%;color:var(--gold2);font:600 20px 'Playfair Display',serif;letter-spacing:.03em;background:radial-gradient(circle,rgba(201,151,61,.10),transparent 70%)}
    #parceiros .partner-card h3{margin:0 0 10px;font:600 clamp(25px,3vw,34px)/1.05 'Playfair Display',serif;color:var(--text)}
    #parceiros .partner-card p{margin:0;color:var(--muted);font-size:13px;line-height:1.8;max-width:600px}
    #parceiros .partner-status{display:inline-block;margin-top:22px;color:var(--gold2);font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
    #parceiros .partner-status:before{content:'●';margin-right:8px;font-size:7px}
    #parceiros .partner-footer{position:relative;z-index:1;margin:30px auto 0;text-align:center;color:#70685c;font-size:10px;letter-spacing:.13em;text-transform:uppercase}
    @media(max-width:700px){#parceiros .partner-grid{grid-template-columns:1fr}#parceiros .partner-card{min-height:250px;padding:26px}#parceiros .partner-head{margin-bottom:27px}}
  `;
  document.head.appendChild(style);
  section.innerHTML=`
    <div class="partner-head">
      <p class="eyebrow">06 · PARCEIROS &amp; PATROCÍNIO</p>
      <h2>Marcas que caminham connosco.</h2>
      <p>O crescimento de um ecossistema forte também acontece através de parcerias e apoios que partilham a nossa visão de excelência, desenvolvimento e oportunidades.</p>
    </div>
    <div class="partner-grid">
      <article class="partner-card">
        <span class="partner-badge">Parceiro</span>
        <div class="partner-mark">S</div>
        <h3>Scorpion</h3>
        <p>Parceiro da DrinkLab 95. Esta área fica preparada para receber posteriormente a apresentação, identidade e informações completas do Scorpion.</p>
        <span class="partner-status">Parceiro oficial</span>
      </article>
      <article class="partner-card">
        <span class="partner-badge">Patrocinador oficial</span>
        <div class="partner-mark">BM</div>
        <h3>Breezy Mambo Inc.</h3>
        <p>Patrocinador Oficial da DrinkLab 95, contribuindo para o fortalecimento e desenvolvimento do ecossistema DrinkLab.</p>
        <span class="partner-status">Patrocinador oficial DrinkLab 95</span>
      </article>
    </div>
    <div class="partner-footer">Parcerias • Confiança • Visão • Crescimento</div>
  `;
})();