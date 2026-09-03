(()=>{
const U='https://tkdqmpmiunkupmmumxmk.supabase.co',K='sb_publishable_qCKY-QilEX5M3-k2R3CfyQ_MfSv4UKz';
const H={apikey:K,'Content-Type':'application/json'};
let items=[],editing=null,activeType=null;
const root=document.querySelector('#contentManagementAdmin');
if(!root)return;
const body=root.querySelector('#contentManagementBody');
const esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
const label=t=>({publicacao:'Publicações',trabalho:'Trabalhos Feitos',formacao:'Formações Realizadas'}[t]||t);
async function api(path,opt={}){const r=await fetch(`${U}/rest/v1/${path}`,{...opt,headers:{...H,...(opt.headers||{})},cache:'no-store'});const text=await r.text();if(!r.ok)throw Error(text||r.status);return text?JSON.parse(text):null}
async function load(){try{items=await api('content_items?select=*&order=created_at.desc');render()}catch(e){body.innerHTML=`<p class="error">Erro ao carregar conteúdos: ${esc(e.message)}</p>`}}
function render(){
 const groups={publicacao:[],trabalho:[],formacao:[]};items.forEach(x=>groups[x.content_type]?.push(x));
 if(!activeType){body.innerHTML='<p class="hint">Selecione uma das três áreas acima para gerir os conteúdos.</p>';return}
 const arr=groups[activeType]||[];
 body.innerHTML=`<div style="margin-top:20px"><h3>${label(activeType)} <span class="hint">(${arr.length})</span></h3><button type="button" class="goldbtn" id="newContent">+ Criar ${label(activeType)}</button><div id="contentFormArea"></div><div style="margin-top:18px">${arr.length?arr.map(x=>`<div class="notice" style="display:flex;justify-content:space-between;gap:15px;align-items:flex-start;flex-wrap:wrap"><div style="flex:1;min-width:240px"><strong>${esc(x.title)}</strong><small>${esc(x.category||'Sem categoria')} · ${x.published?'Publicado':'Rascunho'} · ${x.event_date?esc(x.event_date):new Date(x.created_at).toLocaleDateString('pt-MZ')}</small><p>${esc(x.description||'').slice(0,240)}${(x.description||'').length>240?'…':''}</p></div><div class="trainer-actions"><button type="button" data-edit="${x.id}">Editar</button><button type="button" class="delete" data-del="${x.id}">Eliminar</button></div></div>`).join(''):'<p class="hint">Ainda não existem conteúdos nesta área.</p>'}</div></div>`;
 root.querySelectorAll('[data-content-area]').forEach(b=>b.classList.toggle('active',b.dataset.contentArea===activeType));
 body.querySelector('#newContent').onclick=()=>openForm();
 body.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openForm(items.find(x=>String(x.id)===String(b.dataset.edit))));
 body.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>remove(b.dataset.del));
}
function openForm(item=null){
 editing=item||null;
 const t=activeType;
 const x=item||{content_type:t,title:'',category:'',description:'',media_url:'',event_date:'',location:'',trainer:'',participants:'',published:true};
 const area=body.querySelector('#contentFormArea');
 area.innerHTML=`<div class="box" style="margin-top:18px"><h3>${item?'Editar':'Criar'} ${label(t)}</h3><form id="contentForm"><label>Título<input id="contentTitle" required value="${esc(x.title)}"></label><label>Categoria / Área<input id="contentCategory" value="${esc(x.category)}" placeholder="Ex.: Coffee Training, Dança, Scorpion Service"></label><label>Descrição / Texto<textarea id="contentDescription" rows="6" required>${esc(x.description)}</textarea></label><label>Imagem ou vídeo<input id="contentMedia" value="${esc(x.media_url)}" placeholder="Cole o caminho/URL do ficheiro"></label><label>Data<input id="contentDate" type="date" value="${esc(x.event_date)}"></label><label>Local<input id="contentLocation" value="${esc(x.location)}"></label><label>Formador / Responsável<input id="contentTrainer" value="${esc(x.trainer)}"></label><label>Participantes<input id="contentParticipants" value="${esc(x.participants)}"></label><label style="display:flex;align-items:center;gap:8px"><input id="contentPublished" type="checkbox" ${x.published!==false?'checked':''} style="width:auto"> Publicado no site</label><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="goldbtn" type="submit">${item?'Guardar alterações':'Criar conteúdo'}</button><button type="button" id="cancelContent">Cancelar</button></div><p id="contentMsg" class="hint"></p></form></div>`;
 area.querySelector('#cancelContent').onclick=()=>{area.innerHTML=''};
 area.querySelector('#contentForm').onsubmit=save;
 area.scrollIntoView({behavior:'smooth',block:'center'});
}
async function save(e){
 e.preventDefault();const form=e.currentTarget;const btn=form.querySelector('button[type=submit]');btn.disabled=true;
 const payload={content_type:activeType,title:form.querySelector('#contentTitle').value.trim(),category:form.querySelector('#contentCategory').value.trim(),description:form.querySelector('#contentDescription').value.trim(),media_url:form.querySelector('#contentMedia').value.trim()||null,event_date:form.querySelector('#contentDate').value||null,location:form.querySelector('#contentLocation').value.trim(),trainer:form.querySelector('#contentTrainer').value.trim(),participants:form.querySelector('#contentParticipants').value.trim(),published:form.querySelector('#contentPublished').checked,updated_at:new Date().toISOString()};
 try{if(editing)await api(`content_items?id=eq.${encodeURIComponent(editing.id)}`,{method:'PATCH',body:JSON.stringify(payload)});else{payload.id=Date.now();await api('content_items',{method:'POST',headers:{...H,Prefer:'return=representation'},body:JSON.stringify(payload)})}editing=null;await load()}catch(err){form.querySelector('#contentMsg').textContent='Erro: '+err.message}finally{btn.disabled=false}
}
async function remove(id){const x=items.find(i=>String(i.id)===String(id));if(!x||!confirm(`Eliminar "${x.title}"? Esta ação não pode ser desfeita.`))return;try{await api(`content_items?id=eq.${encodeURIComponent(id)}`,{method:'DELETE'});await load()}catch(e){alert('Não foi possível eliminar: '+e.message)}}
root.querySelectorAll('[data-content-area]').forEach(b=>b.onclick=()=>{activeType=b.dataset.contentArea;render()});
load();setInterval(()=>{if(!document.hidden)load()},30000);
})();