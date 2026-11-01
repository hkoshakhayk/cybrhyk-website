/* Motion layer shared by every page: nav, reveals, full-page card snap, dot
   navigator, split headings, cursor light, magnetic buttons, tilt cards,
   parallax backgrounds, hero spotlight and the scroll progress bar.
   Reduced-motion visitors get a calm, normally scrolling page. */
(function(){
  if(/[?&]prerender=1/.test(location.search))return; // the build snapshots the page without the motion layer
  const doc=document.documentElement, AR=doc.lang==="ar";
  const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE=matchMedia("(pointer: fine)").matches;
  const WIDE=()=>innerWidth>=1024;
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  let glow=null;

  /* ---------- theme: follows the computer unless the visitor picks light or dark ---------- */
  const tb=$("#themeBtn"), mq=matchMedia("(prefers-color-scheme: dark)");
  const TL={auto:["Colour theme: automatic (follows your device)","المظهر: تلقائي (حسب جهازك)"],light:["Colour theme: light","المظهر: فاتح"],dark:["Colour theme: dark","المظهر: داكن"]};
  function applyTheme(mode,quiet){
    const was=doc.dataset.theme;
    doc.dataset.mode=mode; doc.dataset.theme=mode==="auto"?(mq.matches?"dark":"light"):mode;
    if(tb){const t=TL[mode][AR?1:0];tb.setAttribute("aria-label",t);tb.title=t}
    if(!quiet&&was!==doc.dataset.theme)dispatchEvent(new Event("themechange"));
  }
  if(tb)tb.addEventListener("click",()=>{
    const order=["auto","light","dark"], m=order[(order.indexOf(doc.dataset.mode||"auto")+1)%3];
    try{m==="auto"?localStorage.removeItem("theme"):localStorage.setItem("theme",m)}catch(e){}
    applyTheme(m);
  });
  mq.addEventListener("change",()=>{if((doc.dataset.mode||"auto")==="auto")applyTheme("auto")});
  applyTheme(doc.dataset.mode||"auto",true);

  /* ---------- nav ---------- */
  const nav=$("#nav"), links=$("#links"), menu=$("#menuBtn");
  if(nav)addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>10),{passive:true});
  if(menu&&links){menu.onclick=()=>links.classList.toggle("open");links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")))}
  if(links){
    const navObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.querySelectorAll("a").forEach(a=>{const h=a.getAttribute("href")||"";a.classList.toggle("active",h.endsWith("#"+e.target.id))})}),{rootMargin:"-45% 0px -50% 0px"});
    $$("section[id]").forEach(s=>navObs.observe(s));
  }

  /* ---------- split headings into words (never letters: Arabic must stay joined) ---------- */
  function split(el){
    if(el.dataset.split)return; el.dataset.split=1; el.classList.add("wsplit");
    let i=0;
    (function walk(node){
      [...node.childNodes].forEach(n=>{
        if(n.nodeType===3){
          const parts=n.textContent.split(/(\s+)/); if(!parts.join("").trim())return;
          const frag=document.createDocumentFragment();
          parts.forEach(p=>{
            if(!p)return;
            if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(p));return}
            const w=document.createElement("span");w.className="sw";
            const s=document.createElement("span");s.textContent=p;s.style.setProperty("--i",i++);
            w.appendChild(s);frag.appendChild(w);
          });
          n.replaceWith(frag);
        }else if(n.nodeType===1&&n.tagName!=="BR"&&!n.classList.contains("sw"))walk(n);
      });
    })(el);
  }

  /* ---------- reveals ---------- */
  const heads=$$(".sec-head h2, .cta h2, .ro-grid h2, .comp-grid h2");
  // splitting measures and rewrites every heading; do it when the browser is idle so it never delays the first paint
  if(!RM)(window.requestIdleCallback||(f=>setTimeout(f,150)))(()=>heads.forEach(split),{timeout:700});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  $$(".rv").forEach((el,i)=>{el.style.transitionDelay=(i%4)*80+"ms";io.observe(el)});
  heads.forEach(h=>io.observe(h));

  /* ---------- scroll progress ---------- */
  const bar=document.createElement("div");bar.className="progress";bar.setAttribute("aria-hidden","true");document.body.appendChild(bar);

  /* ---------- sections, snap, dots ---------- */
  const secs=$$("body>header.hero, body>section");
  secs.forEach((s,i)=>{s.style.zIndex=String(i+2)});
  function setSnap(){
    doc.classList.remove("snap","snap-soft","cards");
    if(RM)return;
    if(WIDE()&&FINE){doc.classList.add("snap","cards")}
    else doc.classList.add("snap-soft");
  }
  // Snap is armed on the first real input: enabling it at load nudges the scroll position,
  // which ends the browser's largest-paint measurement before the first paint.
  let armed=false;
  const arm=()=>{if(armed)return;armed=true;setSnap()};
  ["wheel","touchstart","keydown","pointerdown"].forEach(t=>addEventListener(t,arm,{passive:true,once:true}));
  addEventListener("resize",()=>{if(armed)setSnap()});

  const NAMES={top:["Home","الرئيسية"],vision:["Vision","الرؤية"],regulation:["Regulation","التنظيم"],loop:["Operations","العمليات"],services:["Services","الخدمات"],dashboard:["Dashboard","لوحة العمليات"],compliance:["Compliance","الامتثال"],assessment:["Assessment","التقييم"],why:["Why us","لماذا نحن"],roadmap:["Roadmap","خارطة الطريق"],contact:["Contact","تواصل"]};
  const STAGE=["#0066FF","#00D1FF","#8B5CFF","#FF3D9A","#FF8A3D","#C6F432"];
  let dots=null, tip=null;
  if(secs.length>2){
    dots=document.createElement("nav");dots.className="dots";dots.setAttribute("aria-label",AR?"أقسام الصفحة":"Page sections");
    tip=document.createElement("span");tip.className="tip";dots.appendChild(tip);
    secs.forEach((s,i)=>{
      const b=document.createElement("button");b.type="button";
      const id=s.id||"", nm=(NAMES[id]||[s.dataset.name||("Section "+(i+1)),s.dataset.nameAr||("القسم "+(i+1))])[AR?1:0];
      b.setAttribute("aria-label",nm);b.style.setProperty("--c",STAGE[i%6]);
      b.onclick=()=>s.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
      b.onmouseenter=()=>{tip.textContent=nm;const r=b.getBoundingClientRect();tip.style.top=(r.top+r.height/2-14)+"px";tip.classList.add("show")};
      b.onmouseleave=()=>tip.classList.remove("show");
      dots.appendChild(b);
    });
    document.body.appendChild(dots);
  }

  /* ---------- per-frame scroll work ---------- */
  let ticking=false;
  function frame(){
    ticking=false;
    const vh=innerHeight, max=document.documentElement.scrollHeight-vh;
    bar.style.setProperty("--p",max>0?(scrollY/max).toFixed(4):0);
    let cur=0;
    secs.forEach((s,i)=>{
      const r=s.getBoundingClientRect();
      if(r.top<=vh*.45)cur=i;
      if(!RM&&doc.classList.contains("cards")){
        const x=r.bottom<vh?Math.min(1,(vh-r.bottom)/vh):0;
        s.style.setProperty("--x",x.toFixed(3));
      }
      if(!RM){
        const bg=s.querySelector(":scope>.bg");
        if(bg&&r.bottom>0&&r.top<vh){const p=(r.top+r.height/2-vh/2)/vh;bg.style.setProperty("--py",(p*-60).toFixed(1)+"px")}
      }
    });
    if(dots){
      dots.querySelectorAll("button").forEach((b,i)=>b.classList.toggle("on",i===cur));
      const night=secs[cur]&&secs[cur].classList.contains("night");
      dots.classList.toggle("on-night",!!night);
      if(glow)glow.classList.toggle("on-night",!!night);
    }
  }
  addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
  addEventListener("resize",frame);

  /* ---------- cursor light, magnetic buttons, tilt, hero ---------- */
  if(!RM&&FINE){
    glow=document.createElement("div");glow.className="glow";glow.setAttribute("aria-hidden","true");document.body.appendChild(glow);
    addEventListener("pointermove",e=>{glow.style.setProperty("--gx",e.clientX+"px");glow.style.setProperty("--gy",e.clientY+"px")},{passive:true});

    $$(".btn").forEach(b=>{
      b.classList.add("mag");
      b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();const dx=(e.clientX-r.left-r.width/2)*.22, dy=(e.clientY-r.top-r.height/2)*.3;b.style.transform=`translate(${dx}px,${dy}px)`});
      b.addEventListener("pointerleave",()=>{b.style.transform=""});
    });

    function tilt(el,deg){
      el.classList.add("tilt");
      el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(), px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
        el.style.setProperty("--ry",((px-.5)*deg).toFixed(2)+"deg");el.style.setProperty("--rx",((.5-py)*deg).toFixed(2)+"deg");
        el.style.setProperty("--mx",(px*100).toFixed(1)+"%");el.style.setProperty("--my",(py*100).toFixed(1)+"%");el.style.setProperty("--sh",1);el.style.setProperty("--ty","-4px")});
      el.addEventListener("pointerleave",()=>{["--rx","--ry","--ty"].forEach(p=>el.style.removeProperty(p));el.style.setProperty("--sh",0)});
    }
    const tiltSel=".pillar,.reg,.svc,.gatec,.step,.four .p,.talent .t,.tier,.kpi-t,.lp-card,.faq details";
    // cards are re-rendered by the home script, so bind on the container
    function bindTilts(){$$(tiltSel).forEach(el=>{if(!el.dataset.tilt){el.dataset.tilt=1;tilt(el,el.classList.contains("tier")?5:8)}})}
    bindTilts(); new MutationObserver(bindTilts).observe(document.body,{childList:true,subtree:true});

    const art=$(".hero-art");
    if(art){
      const spot=document.createElement("div");spot.className="spot";art.appendChild(spot);
      const hero=$(".hero");
      hero.addEventListener("pointermove",e=>{const r=art.getBoundingClientRect(), px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
        art.style.setProperty("--hx",(px*100)+"%");art.style.setProperty("--hy",(py*100)+"%");
        art.style.setProperty("--hry",((px-.5)*7).toFixed(2)+"deg");art.style.setProperty("--hrx",((.5-py)*5).toFixed(2)+"deg")});
      hero.addEventListener("pointerleave",()=>{art.style.removeProperty("--hrx");art.style.removeProperty("--hry")});
    }
  }

  /* ---------- typing console ---------- */
  const rows=$$(".console .row");
  rows.forEach((r,i)=>r.style.setProperty("--r",i));
  if(rows.length&&!RM){const last=rows[rows.length-1];const c=document.createElement("span");c.className="caret";last.lastElementChild&&last.lastElementChild.appendChild(c)}

  frame();
})();
