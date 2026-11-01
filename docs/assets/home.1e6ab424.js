(function(){
  const NS="http://www.w3.org/2000/svg";
  const SPEC=["#0066FF","#00D1FF","#8B5CFF","#FF3D9A","#FF8A3D","#C6F432"];
  const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const R=2.64;
  let LANG="en";
  const ar=()=>LANG==="ar";
  const L=(o,k)=>ar()&&o.ar&&o.ar[k]!=null?o.ar[k]:o[k];
  let seed=7; const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
  const $=id=>document.getElementById(id);
  function rhomb(cx,cy,a,b,k){a*=k;b*=k;return `M${cx} ${cy-b}L${cx+a} ${cy}L${cx} ${cy+b}L${cx-a} ${cy}Z`}
  function size(svg){const w=svg.clientWidth||svg.parentNode.clientWidth, h=svg.clientHeight||svg.parentNode.clientHeight;svg.setAttribute("viewBox",`0 0 ${w} ${h}`);return [w,h]}

  /* ---------- lattice ---------- */
  const cssv=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const MOB=()=>innerWidth<720, dens=n=>MOB()?Math.round(n*.55):n;
  function lattice(svg,opt){
    const [w,h]=size(svg), a=opt.a*(MOB()?1.45:1), b=a*R, flip=opt.mirror&&ar();
    const cols=Math.ceil(w/(2*a))+2, rows=Math.ceil(h/b)+2; let s="";
    for(let j=0;j<rows;j++)for(let i=-1;i<cols;i++){
      const cx=2*a*i+(j%2?a:0), cy=b*j, x=flip?1-cx/w:cx/w;
      const lit=opt.litFn?opt.litFn(x,cy/h):rnd()<opt.lit;
      if(lit){const c=opt.colors[Math.floor(rnd()*opt.colors.length)];
        s+=`<path d="${rhomb(cx,cy,a,b,.86)}" fill="${c}" class="lit-cell" style="--d:${(7+rnd()*2).toFixed(2)}s;--dl:${(-rnd()*9).toFixed(2)}s;--o1:${opt.o1||.95};--o2:${opt.o2||.2}"/>`}
      else s+=`<path d="${rhomb(cx,cy,a,b,.86)}" fill="${opt.unlit}"${opt.stroke?` stroke="${opt.stroke}" stroke-width=".8"`:""}/>`;
    }
    svg.innerHTML=s;
  }

  /* ---------- generated tech/cyber backgrounds ---------- */
  function circuit(svg,o){
    const [w,h]=size(svg), st=o.step||36; let s="";
    for(let n=0;n<dens(o.n);n++){
      let x=Math.round(rnd()*w/st)*st, y=Math.round(rnd()*h/st)*st, d=`M${x} ${y}`;
      const segs=3+Math.floor(rnd()*4);
      for(let k=0;k<segs;k++){const len=st*(1+Math.floor(rnd()*4));
        if(k%2===0){x+=(rnd()<.5?-1:1)*len}else{const dg=rnd()<.5; const dy=(rnd()<.5?-1:1)*len; if(dg){x+=(rnd()<.5?-1:1)*Math.abs(dy)*.5} y+=dy}
        d+=` L${x} ${y}`}
      const flow=!RM&&rnd()<.35;
      s+=`<path d="${d}" fill="none" stroke="${o.c}" stroke-opacity="${o.op}" stroke-width="1.4"/>`;
      if(flow)s+=`<path d="${d}" fill="none" stroke="${o.hi}" stroke-width="1.6" class="flow" style="animation-delay:${(-rnd()*6).toFixed(2)}s"/>`;
      s+=`<circle cx="${x}" cy="${y}" r="3.5" fill="none" stroke="${o.hi}" stroke-width="1.4"/>`;
    }
    for(let n=0;n<o.chips;n++){const cx=rnd()*w, cy=rnd()*h, cw=40+rnd()*50, chh=26+rnd()*30;
      s+=`<rect x="${cx}" y="${cy}" width="${cw}" height="${chh}" rx="4" fill="none" stroke="${o.c}" stroke-opacity="${o.op*1.4}"/>`;
      for(let p=0;p<5;p++)s+=`<line x1="${cx+8+p*(cw-16)/4}" y1="${cy}" x2="${cx+8+p*(cw-16)/4}" y2="${cy-7}" stroke="${o.c}" stroke-opacity="${o.op*1.4}"/>`}
    svg.innerHTML=s;
  }
  function network(svg,o){
    const [w,h]=size(svg), pts=[]; let s="";
    for(let n=0;n<dens(o.n);n++){const bias=ar()?1-Math.pow(rnd(),.6):Math.pow(rnd(),.6);pts.push([bias*w,rnd()*h])}
    pts.forEach((p,i)=>{const near=pts.map((q,j)=>[j,(q[0]-p[0])**2+(q[1]-p[1])**2]).sort((a,b)=>a[1]-b[1]).slice(1,3);
      near.forEach(([j])=>{if(j>i)s+=`<line x1="${p[0]}" y1="${p[1]}" x2="${pts[j][0]}" y2="${pts[j][1]}" stroke="${o.c}" stroke-opacity="${o.op}" stroke-width="1"/>`})});
    pts.forEach(p=>{const lit=rnd()<.18;
      s+=lit?`<path d="${rhomb(p[0],p[1],4,10.5,1)}" fill="${SPEC[Math.floor(rnd()*6)]}" class="lit-cell" style="--d:${(6+rnd()*3).toFixed(1)}s;--dl:-${(rnd()*8).toFixed(1)}s"/>`
             :`<circle cx="${p[0]}" cy="${p[1]}" r="2.4" fill="${o.c}" fill-opacity="${o.op*2.2}"/>`});
    svg.innerHTML=s;
  }
  function rings(svg,o){
    const [w,h]=size(svg), cx=ar()?w*.12:w*.88, cy=h*o.cy; let s="";
    for(let r=60;r<Math.max(w,h);r+=70)s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${o.c}" stroke-opacity="${o.op}" stroke-dasharray="${r%140?"2 8":"none"}"/>`;
    for(let k=0;k<12;k++){const a=k*Math.PI/6;s+=`<line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(a)*1600}" y2="${cy+Math.sin(a)*1600}" stroke="${o.c}" stroke-opacity="${o.op*.7}"/>`}
    if(o.sweep&&!RM){s+=`<defs><linearGradient id="sw${svg.id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${o.hi}" stop-opacity="0"/><stop offset="1" stop-color="${o.hi}" stop-opacity=".35"/></linearGradient></defs><g class="sweep" style="transform-origin:${cx}px ${cy}px"><path d="M${cx} ${cy} L${cx+520} ${cy} A520 520 0 0 0 ${cx+520*Math.cos(-.5)} ${cy+520*Math.sin(-.5)} Z" fill="url(#sw${svg.id})"/></g>`}
    for(let n=0;n<o.blips;n++){const a=rnd()*Math.PI*2, r=80+rnd()*420;s+=`<path d="${rhomb(cx+Math.cos(a)*r,cy+Math.sin(a)*r,4,10.5,1)}" fill="${SPEC[Math.floor(rnd()*6)]}" class="lit-cell" style="--d:${(5+rnd()*4).toFixed(1)}s;--dl:-${(rnd()*8).toFixed(1)}s"/>`}
    svg.innerHTML=s;
  }
  function floor(svg,o){
    const [w,h]=size(svg), hz=h*o.hz, vx=w/2; let s=`<defs><linearGradient id="fl${svg.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.c}" stop-opacity="0"/><stop offset="1" stop-color="${o.c}" stop-opacity="${o.op}"/></linearGradient></defs>`;
    for(let k=-24;k<=24;k++){s+=`<line x1="${vx+k*14}" y1="${hz}" x2="${vx+k*(w/10)}" y2="${h}" stroke="url(#fl${svg.id})"/>`}
    for(let k=1;k<16;k++){const y=hz+(h-hz)*Math.pow(k/15,2.1);s+=`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${o.c}" stroke-opacity="${o.op*(k/15)}"/>`}
    for(let k=0;k<dens(o.towers);k++){const x=rnd()*w, bw=10+rnd()*26, bh=30+rnd()*Math.min(hz*.9,240);s+=`<rect x="${x}" y="${hz-bh}" width="${bw}" height="${bh}" fill="none" stroke="${o.c}" stroke-opacity="${o.op*.9}"/>`;
      for(let r=hz-bh+8;r<hz-6;r+=10)if(rnd()<.18)s+=`<rect x="${x+3}" y="${r}" width="${bw-6}" height="3" fill="${o.hi}" class="lit-cell" style="--d:${(6+rnd()*4).toFixed(1)}s;--dl:-${(rnd()*9).toFixed(1)}s;--o1:.8;--o2:.15"/>`}
    svg.innerHTML=s;
  }
  function topo(svg,o){
    const [w,h]=size(svg); let s="";
    for(let k=0;k<o.n;k++){const y0=h*(k+.5)/o.n, amp=18+rnd()*30, f=.004+rnd()*.004, ph=rnd()*6; let d=`M0 ${y0}`;
      for(let x=0;x<=w;x+=16)d+=` L${x} ${(y0+Math.sin(x*f+ph)*amp+Math.sin(x*f*2.3+ph)*amp*.4).toFixed(1)}`;
      s+=`<path d="${d}" fill="none" stroke="${k%4===0?o.hi:o.c}" stroke-opacity="${k%4===0?o.op*1.6:o.op}" stroke-width="1.2"/>`}
    svg.innerHTML=s;
  }

  // The hero backgrounds draw right after the first paint (they measure layout, so drawing earlier delays it); the others when their section comes within 600px of the screen, and redrawn on resize.
  const BG=[
    ["heroLattice",7,s=>lattice(s,{a:15,unlit:cssv("--lat-unlit"),colors:SPEC,mirror:true,litFn:(x,y)=>rnd()<(0.05+0.22*x*(1-y*.5))})],
    ["bgHero",11,s=>circuit(s,{n:26,chips:3,c:"#0066FF",hi:"#00D1FF",op:.10})],
    ["bgVision",13,s=>network(s,{n:70,c:"#0066FF",op:.16})],
    ["bgReg",15,s=>circuit(s,{n:40,chips:6,c:"#0066FF",hi:"#00A8E8",op:.13})],
    ["bgLoop",19,s=>rings(s,{cy:.5,c:"#3D5AB5",hi:"#00D1FF",op:.22,blips:22,sweep:true})],
    ["bgSvc",23,s=>circuit(s,{n:34,chips:5,c:"#8B5CFF",hi:"#0066FF",op:.10})],
    ["bgDash",25,s=>floor(s,{hz:.3,c:"#3D5AB5",hi:"#00D1FF",op:.4,towers:22})],
    ["bgComp",27,s=>network(s,{n:60,c:"#8B5CFF",op:.14})],
    ["bgAssess",29,s=>topo(s,{n:22,c:"#0066FF",hi:"#00A8E8",op:.10})],
    ["bgWhy",31,s=>lattice(s,{a:13,unlit:"transparent",stroke:cssv("--lat-stroke"),colors:["#00D1FF"],lit:.06,mirror:true})],
    ["bgRoad",35,s=>floor(s,{hz:.55,c:"#0066FF",hi:"#00D1FF",op:.22,towers:18})],
    ["ctaLattice",33,s=>lattice(s,{a:16,unlit:cssv("--night2"),colors:SPEC,mirror:true,litFn:(x,y)=>rnd()<(0.02+0.2*x)})]
  ];
  let bgio;
  addEventListener("themechange",()=>drawAll());
  function drawAll(){
    if(bgio)bgio.disconnect();
    bgio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const d=BG.find(x=>x[0]===e.target.id);seed=d[1];d[2](e.target);bgio.unobserve(e.target)}),{rootMargin:"600px 0px"});
    BG.forEach(d=>{const el=$(d[0]);if(!el)return;el.innerHTML="";if(/^(heroLattice|bgHero)$/.test(d[0])){requestAnimationFrame(()=>requestAnimationFrame(()=>{seed=d[1];d[2](el)}))}else bgio.observe(el)});
  }
  // pause the looping background animations of sections that are off screen
  const offio=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("off",!e.isIntersecting)));
  document.querySelectorAll("header.hero, section").forEach(s=>offio.observe(s));
  let rt, lw=innerWidth; addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(()=>{if(Math.abs(innerWidth-lw)>40){lw=innerWidth;drawAll();renderAsset()}},250)});

  /* nav, reveals and section motion live in motion.js (shared with the service pages) */

  /* ---------- counters ---------- */
  const fmt=(n,dec)=>n.toLocaleString("en-US",{minimumFractionDigits:dec,maximumFractionDigits:dec});
  function countUp(el){
    if(RM||el.dataset.done)return; el.dataset.done=1;
    const end=parseFloat(el.dataset.count), dec=+el.dataset.dec||0, t0=performance.now(), dur=1400;
    (function f(t){const k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3); el.textContent=fmt(end*e,dec); if(k<1)requestAnimationFrame(f)})(t0);
  }
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){countUp(e.target);io.unobserve(e.target)}}),{threshold:.4});
  document.querySelectorAll("[data-count]").forEach(el=>io.observe(el));

  /* ---------- market bars ---------- */
  const TAM=[4.05,4.52,5.04,5.63,6.28,7.01,7.80], SAM=[1.10,1.27,1.46,1.68,1.92,2.19,2.42];
  const bars=$("bars"); bars.innerHTML=""; // built pages arrive prerendered; rebuild instead of appending twice
  TAM.forEach(t=>{const d=document.createElement("div");d.className="bar";d.innerHTML=`<div class="tam" style="height:0"><span class="val">${t.toFixed(2)}</span><div class="sam" style="height:0"></div></div>`;bars.appendChild(d)});
  function barTitles(){bars.querySelectorAll(".bar").forEach((b,i)=>b.title=ar()?`${2024+i}: إجمالي السوق ${TAM[i].toFixed(2)} مليار دولار · القابل للخدمات ${SAM[i].toFixed(2)} مليار`:`${2024+i}: TAM USD ${TAM[i].toFixed(2)}bn · SAM USD ${SAM[i].toFixed(2)}bn`)}
  new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){bars.querySelectorAll(".bar").forEach((b,i)=>{b.querySelector(".tam").style.height=(TAM[i]/8.4*100)+"%";b.querySelector(".sam").style.height=(SAM[i]/TAM[i]*100)+"%"});o.disconnect()}},{threshold:.3}).observe(bars);

  /* ---------- regulation ---------- */
  const REG=[
    {c:"ECC-2:2024",t:"Essential Cybersecurity Controls",s:"force",f:"control",fig:"108",u:"main controls",p:"4 domains, 28 subdomains. Control 1-2-2 requires qualified, full-time Saudi professionals in all cybersecurity roles.",w:"Government entities and private owners, operators and hosts of CNI",
     ar:{t:"الضوابط الأساسية للأمن السيبراني",u:"ضابطاً رئيساً",p:"4 مكونات أساسية و28 مكوناً فرعياً. يشترط الضابط 1-2-2 شغل جميع وظائف الأمن السيبراني بكفاءات سعودية مؤهلة بدوام كامل.",w:"الجهات الحكومية، وملّاك ومشغّلو ومستضيفو البنى التحتية الوطنية الحساسة من القطاع الخاص"}},
    {c:"OTCC-1:2022",t:"Operational Technology Controls",s:"force",f:"control",fig:"47",u:"main controls",p:"4 domains, 23 subdomains, 122 subcontrols. ECC compliance is an express prerequisite.",w:"Government and CNI entities operating ICS/OT",
     ar:{t:"ضوابط الأمن السيبراني للأنظمة التشغيلية",u:"ضابطاً رئيساً",p:"4 مكونات أساسية و23 فرعياً و122 ضابطاً فرعياً. والالتزام بالضوابط الأساسية شرطٌ صريح مسبق.",w:"الجهات الحكومية والبنى الحساسة المشغّلة لأنظمة التحكم الصناعي"}},
    {c:"CCC-2:2024",t:"Cloud Cybersecurity Controls",s:"force",f:"control",fig:"37 / 18",u:"CSP / tenant",p:"Four classification levels. In-Kingdom hosting subcontrols moved to the NDMO data regime.",w:"Cloud providers and in-scope government and CNI tenants",
     ar:{u:"مزوّد / مستأجر",t:"ضوابط الأمن السيبراني للحوسبة السحابية",p:"أربعة مستويات تصنيف. نُقلت ضوابط الاستضافة داخل المملكة إلى منظومة مكتب إدارة البيانات الوطنية.",w:"مزودو الخدمات السحابية والمستأجرون من الجهات الحكومية والبنى الحساسة"}},
    {c:"NCNICC-1:2025",t:"Non-CNI private-sector controls",s:"notified",f:"control",fig:"65 / 26",u:"Cat A / Cat B",p:"For the first time binds non-CNI private companies: Category A above 250 staff or SAR 200m revenue; Category B from 6 staff.",w:"Private-sector entities outside CNI",
     ar:{u:"الفئة أ / الفئة ب",t:"ضوابط القطاع الخاص غير الحساس",p:"تُلزم الشركات الخاصة غير المصنّفة بنيةً حساسة لأول مرة: الفئة أ لأكثر من 250 موظفاً أو 200 مليون ريال إيرادات، والفئة ب ابتداءً من 6 موظفين.",w:"منشآت القطاع الخاص خارج البنى الحساسة"}},
    {c:"SAMA CSF",t:"SAMA Cyber Security Framework",s:"force",f:"sector",fig:"L3",u:"minimum maturity",p:"4 domains, 32 subdomains. Every regulated financial entity must reach at least Level 3 (Structured and formalized).",w:"Banks, insurers and payments firms",
     ar:{t:"الإطار التنظيمي للأمن السيبراني – البنك المركزي السعودي",u:"حدٌّ أدنى للنضج",p:"4 مجالات و32 مجالاً فرعياً. يجب أن تبلغ كل مؤسسة مالية خاضعة للتنظيم المستوى الثالث (منظَّم ورسمي) على الأقل.",w:"البنوك وشركات التأمين والمدفوعات"}},
    {c:"PDPL · NDMO",t:"Personal data &amp; residency",s:"force",f:"sector",fig:"SDAIA",u:"regulator",p:"The PDPL and its transfer regulation govern personal data; NDMO policy governs residency. Obligations attach from first processing.",w:"Every operator processing personal data",
     ar:{fig:"سدايا",t:"البيانات الشخصية وإقامة البيانات",u:"الجهة المنظِّمة",p:"يحكم نظام حماية البيانات الشخصية ولائحة نقلها البياناتِ الشخصية، وتحكم سياسات مكتب إدارة البيانات الوطنية إقامتها. وتبدأ الالتزامات من أول معالجة.",w:"كل مشغّل يعالج بيانات شخصية"}}
  ];
  const SL={force:["In force","سارٍ","st-force"],draft:["Draft","مسودة","st-draft"],notified:["As notified","كما أُعلن","st-notified"]};
  const rg=$("regGrid"); let regFilter="all";
  function renderReg(){
    rg.innerHTML=REG.map(r=>`<article class="reg" data-f="${r.f}"><div class="top"><span class="code">${L(r,"c")}</span><span class="status ${SL[r.s][2]}">${SL[r.s][ar()?1:0]}</span></div><h3>${L(r,"t")}</h3><div class="figure">${L(r,"fig")}<small>${L(r,"u")}</small></div><p>${L(r,"p")}</p><div class="who"><b>${ar()?"يُلزم:":"Binds:"}</b> ${L(r,"w")}</div></article>`).join("");
    applyRegFilter();
  }
  function applyRegFilter(){rg.querySelectorAll(".reg").forEach(c=>c.classList.toggle("dim",regFilter!=="all"&&c.dataset.f!==regFilter))}
  $("regTabs").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;regFilter=b.dataset.f;document.querySelectorAll("#regTabs .chip").forEach(c=>c.classList.toggle("on",c===b));applyRegFilter()};

  /* ---------- SOC loop ---------- */
  const ST=[
    {n:"Collect",c:"#0066FF",d:"Telemetry from the whole estate: endpoints, network, identity, cloud and, for CNI, operational technology, ingested into an in-Kingdom platform.",b:["Log sources onboarded per environment","Data stays in the Kingdom, per NDMO policy","Asset inventory reconciled to ECC-2"],k:[["24/7","coverage"],["in-KSA","data residency"]],
     ar:{n:"الجمع",d:"جمع بيانات الرصد من البيئة كاملة: الأجهزة الطرفية والشبكة والهويات والسحابة، والأنظمة التشغيلية للبنى الحساسة، في منصة داخل المملكة.",b:["مصادر سجلات مُدمجة لكل بيئة","تبقى البيانات داخل المملكة وفق سياسات مكتب إدارة البيانات الوطنية","جرد الأصول مطابق للضوابط الأساسية ECC-2"],k:[["24/7","تغطية"],["محلياً","إقامة البيانات"]]}},
    {n:"Detect",c:"#00D1FF",d:"Rules, models and automation, enriched with intelligence and context, surface what matters and suppress what does not.",b:["Detection content mapped to MITRE ATT&CK","Saudi-specific threat intelligence","Automation absorbs first-tier triage"],k:[["24/7","in-Kingdom detection"],["1 → all","rule reuse across clients"]],
     ar:{n:"الرصد",d:"قواعد ونماذج وأتمتة، مُعزَّزة بالمعلومات الاستخباراتية والسياق، تُظهر ما يهم وتُسكت ما لا يهم.",b:["محتوى رصد مرتبط بإطار MITRE ATT&CK","معلومات تهديدات خاصة بالمملكة","الأتمتة تتولى الفرز في المستوى الأول"],k:[["24/7","رصد داخل المملكة"],["1 ← الكل","إعادة استخدام القواعد بين العملاء"]]}},
    {n:"Triage",c:"#8B5CFF",d:"Every alert is categorised by severity and owned by a named, NCA-qualified Saudi analyst, Category C to B to A.",b:["Severity always labelled in words","Named analyst on every incident","Escalation paths per client"],k:[["4.8","FTE per 24/7 seat"],["A·B·C","analyst categories"]],
     ar:{n:"الفرز",d:"كل تنبيه يفرزه محللٌ مسمّى: يُصنَّف بحسب خطورته ويتولاه محلل سعودي مؤهل من الهيئة، من الفئة ج إلى ب إلى أ.",b:["الخطورة مكتوبة بالكلمات دائماً","محلل مسمّى لكل حادثة","مسارات تصعيد لكل عميل"],k:[["4.8","موظف لكل مقعد على مدار الساعة"],["أ·ب·ج","فئات المحللين"]]}},
    {n:"Respond",c:"#FF3D9A",d:"Contain, eradicate and recover, with incident response on retainer and call-out, led by Saudi incident-response specialists.",b:["Time to respond reported monthly","DFIR retainer with call-out","Evidence preserved for the regulator"],k:[["04:12","illustrative containment"],["24/7","IR on call"]],
     ar:{n:"الاستجابة",d:"الاحتواء والاستئصال والتعافي، مع استجابة للحوادث بعقد احتفاظ واستدعاء، يقودها مختصون سعوديون في الاستجابة للحوادث.",b:["زمن الاستجابة في تقرير شهري","عقد احتفاظ للأدلة الرقمية مع الاستدعاء","حفظ الأدلة للجهة المنظِّمة"],k:[["04:12","احتواء توضيحي"],["24/7","استجابة جاهزة"]]}},
    {n:"Remediate",c:"#FF8A3D",d:"Close the root cause, not just the incident: configuration, identity, cloud and application fixes, verified by testing.",b:["Root cause named in every report","Fix verified by re-test","Control gaps tracked to closure"],k:[["108","ECC-2 controls tracked"],["re-test","on every fix"]],
     ar:{n:"المعالجة",d:"معالجة السبب الجذري لا الحادثة فحسب: إصلاحات في الإعدادات والهويات والسحابة والتطبيقات، يُتحقق منها بالاختبار.",b:["السبب الجذري مسمّى في كل تقرير","التحقق من كل إصلاح بإعادة الاختبار","متابعة فجوات الضوابط حتى إغلاقها"],k:[["108","ضابطاً متابَعاً في ECC-2"],["إعادة اختبار","لكل إصلاح"]]}},
    {n:"Learn",c:"#C6F432",d:"Content flows back into detection. Each incident improves protection for every environment we monitor; this is the compounding asset.",b:["Post-incident review per case","New rules shipped to every client","Quarterly maturity reporting"],k:[["6","stages in one loop"],["every","client gets each new rule"]],
     ar:{n:"التعلّم",d:"يعود المحتوى إلى الرصد. فكل حادثة تحسّن الحماية لكل بيئة نراقبها، وهذا هو الأصل الذي تتراكم قيمته.",b:["مراجعة بعد كل حادثة","قواعد جديدة تُطلق لجميع العملاء","تقارير نضج ربع سنوية"],k:[["6","مراحل في دورة واحدة"],["الجميع","يحصل كل عميل على كل قاعدة جديدة"]]}}
  ];
  const ls=$("loopSvg"), cx=260, cy=260, rr=180, panel=$("stagePanel"); let cur=0;
  function renderLoop(){
    const orbit=`M${cx} ${cy-rr} A${rr} ${rr} 0 1 ${ar()?0:1} ${cx} ${cy+rr} A${rr} ${rr} 0 1 ${ar()?0:1} ${cx} ${cy-rr}`;
    let h=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="#24305C" stroke-width="1.5" stroke-dasharray="3 6"/><g id="arc"></g>`;
    if(!RM)[0,1,2].forEach(k=>{h+=`<path d="M0 -9L4 0L0 9L-4 0Z" fill="${["#00D1FF","#FF3D9A","#C6F432"][k]}" opacity=".9"><animateMotion dur="9s" repeatCount="indefinite" begin="${-k*3}s" path="${orbit}" rotate="auto"/></path>`});
    h+=`<g transform="translate(${cx} ${cy}) scale(.95)"><path d="M-26.05 19.14L12.46 -82.45L0.30 -87.06L-38.21 14.53Z M-12.46 -82.45L26.05 19.14L38.21 14.53L-0.30 -87.06Z M26.05 -19.14L-12.46 82.45L-0.30 87.06L38.21 -14.53Z M12.46 82.45L-26.05 -19.14L-38.21 -14.53L0.30 87.06Z" fill="#0066FF"/><path id="core" d="M0 -38.30L14.52 0L0 38.30L-14.52 0Z" fill="#00D1FF" class="lit-cell" style="--d:2s;--o1:1;--o2:.55"/></g>`;
    ST.forEach((s,i)=>{const ang=-Math.PI/2+(ar()?-1:1)*i*Math.PI/3, x=cx+rr*Math.cos(ang), y=cy+rr*Math.sin(ang), tx=cx+(rr+46)*Math.cos(ang), ty=cy+(rr+46)*Math.sin(ang)+5;
      h+=`<g class="node" data-i="${i}" tabindex="0" role="button" aria-label="${L(s,"n")}"><circle cx="${x}" cy="${y}" r="34" fill="#0A1230" stroke="${s.c}" stroke-opacity=".35" stroke-width="1.5"/><path d="${rhomb(x,y,11,29,1)}" fill="${s.c}"/><text x="${tx}" y="${ty}" text-anchor="middle" direction="${ar()?"rtl":"ltr"}">${i+1} · ${L(s,"n")}</text></g>`});
    ls.innerHTML=h; setStage(cur);
  }
  function setStage(i){cur=i;const s=ST[i], dir=ar()?-1:1;
    ls.querySelectorAll(".node").forEach(n=>n.classList.toggle("on",+n.dataset.i===i));
    ls.querySelector("#core").setAttribute("fill",s.c);
    const a0=-Math.PI/2+dir*(i-.5)*Math.PI/3, a1=-Math.PI/2+dir*(i+.5)*Math.PI/3;
    ls.querySelector("#arc").innerHTML=`<path d="M${cx+rr*Math.cos(a0)} ${cy+rr*Math.sin(a0)} A${rr} ${rr} 0 0 ${dir>0?1:0} ${cx+rr*Math.cos(a1)} ${cy+rr*Math.sin(a1)}" fill="none" stroke="${s.c}" stroke-width="4" stroke-linecap="round"/>`;
    panel.style.setProperty("--sc",s.c);
    panel.innerHTML=`<div class="sn" style="color:${s.c}">${ar()?`المرحلة ${i+1} من 6`:`STAGE ${i+1} OF 6`}</div><h3>${L(s,"n")}</h3><p>${L(s,"d")}</p><ul>${L(s,"b").map(x=>`<li>${x}</li>`).join("")}</ul><div class="kpi">${L(s,"k").map(k=>`<div>${k[0]}<small>${k[1]}</small></div>`).join("")}</div>`}
  ls.addEventListener("click",e=>{const n=e.target.closest(".node");if(n){setStage(+n.dataset.i);stopAuto()}});
  ls.addEventListener("keydown",e=>{const n=e.target.closest(".node");if(n&&(e.key==="Enter"||e.key===" ")){e.preventDefault();setStage(+n.dataset.i);stopAuto()}});
  let auto=RM?null:setInterval(()=>setStage((cur+1)%6),4500);
  function stopAuto(){if(auto){clearInterval(auto);auto=null}}

  /* ---------- services ---------- */
  const SV=[
    {st:"Detect",c:"#00D1FF",tc:"var(--t-cyan)",t:"24/7 Managed Detection & Response",p:"The core: continuous monitoring, detection engineering and triage from an in-Kingdom SOC, with a named analyst on every incident.",fw:"ECC-2 · SAMA CSF · NCNICC",pr:"Per-environment retainer",
     ar:{st:"الرصد",t:"الرصد والاستجابة المُدارة على مدار الساعة",p:"الجوهر: مراقبة مستمرة وهندسة رصد وفرز من مركز عمليات داخل المملكة، مع محلل مسمّى لكل حادثة.",pr:"اشتراك لكل بيئة"}},
    {st:"Collect",c:"#0066FF",tc:"var(--t-blue)",t:"GRC & Compliance Retainers",p:"Gap assessment, policy, risk registers and continuous control evidence against every national framework, packaged for the assessor.",fw:"ECC-2 · SAMA CSF L3 · PDPL",pr:"Advisory retainer",
     ar:{st:"الجمع",t:"عقود الحوكمة والمخاطر والامتثال",p:"تقييم الفجوات والسياسات وسجلات المخاطر والأدلة المستمرة على الضوابط مقابل كل إطار وطني، مُعدّة للمقيِّم.",pr:"عقد استشاري"}},
    {st:"Respond",c:"#FF3D9A",tc:"var(--t-magenta)",t:"Incident Response & Digital Forensics",p:"DFIR on retainer with guaranteed call-out: containment, forensics, evidence preservation and regulator-ready reporting.",fw:"ECC-2 incident domain",pr:"Retainer + call-out",
     ar:{st:"الاستجابة",t:"الاستجابة للحوادث والأدلة الرقمية",p:"استجابة بعقد احتفاظ مع استدعاء مضمون: احتواء وتحليل جنائي رقمي وحفظ للأدلة وتقارير جاهزة للجهة المنظِّمة.",fw:"مجال الحوادث في ECC-2",pr:"عقد احتفاظ + استدعاء"}},
    {st:"Triage",c:"#8B5CFF",tc:"var(--t-violet)",t:"Penetration Testing & Red Team",p:"Infrastructure, application and adversary-emulation testing, the cheap first door into a regulated account.",fw:"ECC-2 · SAMA CSF testing",pr:"Annual programme or day rate",
     ar:{st:"الفرز",t:"اختبار الاختراق والفريق الأحمر",p:"اختبارات للبنية التحتية والتطبيقات ومحاكاة الخصوم، وهي البوابة الأقل تكلفة إلى الجهات الخاضعة للتنظيم.",fw:"ECC-2 · اختبارات إطار البنك المركزي",pr:"برنامج سنوي أو أجر يومي"}},
    {st:"Remediate",c:"#FF8A3D",tc:"var(--t-tangerine)",t:"Cloud & Application Security",p:"Secure cloud architecture, posture management and application security, delivered as projects that convert into managed subscriptions.",fw:"CCC-2:2024 · NDMO",pr:"Project + managed",
     ar:{st:"المعالجة",t:"أمن السحابة والتطبيقات",p:"معمارية سحابية آمنة وإدارة للوضع الأمني وأمن للتطبيقات، تُنفَّذ مشاريعَ تتحول إلى اشتراكات مُدارة.",pr:"مشروع + خدمة مُدارة"}},
    {st:"Learn",c:"#C6F432",tc:"var(--t-lime)",t:"Threat Intelligence & OT Monitoring",p:"Saudi-specific intelligence and detection content feeding every client; OT/ICS monitoring for operators of industrial systems.",fw:"OTCC-1:2022 · ECC-2",pr:"Within MDR retainer",
     ar:{st:"التعلّم",t:"استخبارات التهديدات ومراقبة الأنظمة التشغيلية",p:"معلومات تهديدات ومحتوى رصد خاص بالمملكة يغذّي كل عميل، ومراقبة لأنظمة التحكم الصناعي لمشغّليها.",pr:"ضمن اشتراك الرصد والاستجابة"}}
  ];
  const SEC={
    fin:{p:[0,1],note:"Banks, insurers and payments firms answer to SAMA's framework at Level 3 or above, alongside the NCA's controls. All six lines apply; these two matter most.",ar:"تخضع البنوك وشركات التأمين والمدفوعات لإطار البنك المركزي السعودي عند المستوى الثالث أو أعلى، إلى جانب ضوابط الهيئة. تنطبق الخطوط الستة جميعها، وهذان الأهم."},
    ent:{p:[0,4],note:"Enterprises and giga-project programmes need security at scale across cloud, partners and fast-growing estates. All six lines apply; these two matter most.",ar:"تحتاج المنشآت وبرامج المشاريع العملاقة إلى أمن واسع النطاق عبر السحابة والشركاء والبيئات سريعة النمو. تنطبق الخطوط الستة جميعها، وهذان الأهم."},
    pvt:{p:[1,0],note:"NCNICC-1:2025 makes 65 controls mandatory for Category A companies and 26 for Category B. This is the newest mandated population; all six lines apply.",ar:"تجعل ضوابط NCNICC-1:2025 خمسةً وستين ضابطاً إلزامية لشركات الفئة أ، وستةً وعشرين لشركات الفئة ب. وهذه أحدث فئة خاضعة للإلزام، وتنطبق عليها الخطوط الستة جميعها."},
    gov:{p:[1,3],note:"Government entities must meet ECC-2:2024 in full, including control 1-2-2 on Saudi cybersecurity staff. All six lines apply; these two matter most.",ar:"يجب على الجهات الحكومية الالتزام الكامل بالضوابط الأساسية ECC-2:2024، بما فيها الضابط 1-2-2 الخاص بالكفاءات السعودية. تنطبق الخطوط الستة جميعها، وهذان الأهم."},
    cni:{p:[5,2],note:"Critical-infrastructure operators add OTCC-1:2022 for operational technology on top of ECC-2. OT monitoring and incident response matter most.",ar:"يضيف مشغّلو البنى الحساسة ضوابط OTCC-1:2022 للأنظمة التشغيلية فوق الضوابط الأساسية. ومراقبة الأنظمة التشغيلية والاستجابة للحوادث هما الأهم."}
  };
  const sg=$("svcGrid"); let sector="fin";
  function renderSvc(){const S=SEC[sector], d=ar()?["يُثبت","التسعير"]:["Evidences","Pricing"];$("sectorNote").textContent=ar()?S.ar:S.note;
    sg.innerHTML=SV.map((s,i)=>{const pr=S.p.includes(i);return `<article class="svc ${pr?"prio":""}">${pr?`<span class="avail av-now">${ar()?"أولوية لقطاعك":"Priority for your sector"}</span>`:""}<svg class="gem" viewBox="0 0 18 48"><path d="M9 0 18 24 9 48 0 24Z" fill="${s.c}"/></svg><div class="stage" style="color:${s.tc}">${L(s,"st")}</div><h3>${L(s,"t")}</h3><p>${L(s,"p")}</p><dl><dt>${d[0]}</dt><dd>${L(s,"fw")}</dd><dt>${d[1]}</dt><dd>${L(s,"pr")}</dd></dl></article>`}).join("")}
  $("sectorSel").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;sector=b.dataset.s;document.querySelectorAll("#sectorSel .chip").forEach(c=>c.classList.toggle("on",c===b));renderSvc()};


  /* ---------- SOC dashboard (simulated) ---------- */
  const ENV=[{en:"Bank · Riyadh",ar:"بنك · الرياض",m:1,s:3,mttd:"06:40",mttr:"38m",auto:71,sla:99.2},
             {en:"Insurer · Jeddah",ar:"شركة تأمين · جدة",m:.62,s:5,mttd:"05:55",mttr:"31m",auto:68,sla:99.6},
             {en:"Manufacturer · Jubail",ar:"مصنع · الجبيل",m:.44,s:9,mttd:"07:20",mttr:"44m",auto:63,sla:98.7}];
  let envI=0, area=null;
  const SEV=[["CRITICAL","حرِج","var(--sev-c)"],["HIGH","مرتفع","var(--sev-h)"],["MEDIUM","متوسط","var(--sev-m)"],["LOW","منخفض","var(--sev-l)"]];
  const TAC=[["Initial Access","الوصول الأولي"],["Credential Access","الوصول إلى بيانات الاعتماد"],["Lateral Movement","التحرك الجانبي"],["Persistence","الاستمرارية"],["Discovery","الاستكشاف"],["Exfiltration","تسريب البيانات"]];
  const STS=[["Triaged","فُرز","var(--cyan)"],["Contained","احتُوي","var(--lime)"],["Escalated","صُعِّد","var(--magenta)"],["Closed","أُغلق","var(--muted-n)"]];
  const ASSETS=["vpn-gw-01","m365-tenant","core-db-02","hr-lt-114","pay-api-03","dc-ad-01","web-portal","fin-ws-027","cloud-k8s-2","mail-gw-01"];
  const AN=["S.A.","M.K.","N.H.","F.Q.","A.R.","R.S."];
  let feed=[], incId=4417;
  function renderEnvs(){$("envs").innerHTML=ENV.map((e,i)=>`<button class="${i===envI?"on":""}" data-i="${i}">${ar()?e.ar:e.en}</button>`).join("")}
  $("envs").onclick=e=>{const b=e.target.closest("button");if(!b)return;envI=+b.dataset.i;area=null;feed=[];renderEnvs();renderDash()};
  function genArea(){const E=ENV[envI]; seed=E.s*101; const tot=[],esc=[];
    for(let hh=0;hh<25;hh++){const base=55*E.m*(0.62+0.38*Math.sin((hh-8)/24*Math.PI*2))+rnd()*14*E.m;tot.push(base);esc.push(base*(.06+rnd()*.06))}
    return {tot,esc}}
  function pathOf(arr,max,close){const W=600,H=170;let d="";arr.forEach((v,i)=>{const x=i/(arr.length-1)*W, y=H-v/max*H+10;d+=(i?" L":"M")+x.toFixed(1)+" "+y.toFixed(1)});return close?d+` L${W} 190 L0 190 Z`:d}
  function renderArea(){if(!area)area=genArea();const max=Math.max(...area.tot)*1.15, svg=$("areaSvg");
    let s=`<defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00D1FF" stop-opacity=".45"/><stop offset="1" stop-color="#00D1FF" stop-opacity="0"/></linearGradient><linearGradient id="gm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF3D9A" stop-opacity=".5"/><stop offset="1" stop-color="#FF3D9A" stop-opacity="0"/></linearGradient></defs>`;
    for(let g=1;g<4;g++)s+=`<line x1="0" x2="600" y1="${g*47}" y2="${g*47}" stroke="#24305C" stroke-width="1"/>`;
    [0,6,12,18,24].forEach(hh=>s+=`<text x="${hh/24*600+(hh===0?4:hh===24?-22:-8)}" y="186" fill="#6F7A9C" font-size="11" font-family="IBM Plex Mono">${String(hh).padStart(2,"0")}:00</text>`);
    s+=`<path d="${pathOf(area.tot,max,true)}" fill="url(#ga)"/><path d="${pathOf(area.tot,max)}" fill="none" stroke="#00D1FF" stroke-width="2"/>`;
    s+=`<path d="${pathOf(area.esc,max,true)}" fill="url(#gm)"/><path d="${pathOf(area.esc,max)}" fill="none" stroke="#FF3D9A" stroke-width="2"/>`;
    const nowH=new Date().getUTCHours()+3, nx=((nowH%24)/24*600).toFixed(1);
    s+=`<line x1="${nx}" x2="${nx}" y1="0" y2="172" stroke="#C6F432" stroke-dasharray="3 4"/><circle cx="${nx}" cy="6" r="4" fill="#C6F432" class="lit-cell" style="--d:2s;--o1:1;--o2:.3"/>`;
    svg.innerHTML=s}
  function renderKpis(){const E=ENV[envI], alerts=Math.round(area.tot.reduce((a,b)=>a+b,0)), esc=Math.round(area.esc.reduce((a,b)=>a+b,0)/9);
    const K=[["MTTD","متوسط زمن الرصد",E.mttd,"▼ 12%","up"],["MTTR","متوسط زمن الاستجابة",ar()?E.mttr.replace("m"," د"):E.mttr,"▼ 8%","up"],["ALERTS · 24H","تنبيهات · 24 ساعة",fmt(alerts,0),"▲ 4%","dn"],["ESCALATED","مُصعّدة",String(esc),"",""],["AUTOMATION","نسبة الأتمتة",E.auto+"%",ar()?"▲ 3 نقاط":"▲ 3 pts","up"],["ANALYSTS ON SHIFT","محللون في الوردية","6 / 6","24/7","up"]];
    $("kpis").innerHTML=K.map(k=>`<div class="kpi-t"><div class="k">${ar()?k[1]:k[0]}</div><div class="v">${k[2]}</div><div class="d ${k[4]}">${k[3]||"&nbsp;"}</div></div>`).join("");
    $("slaTxt").textContent=E.sla+"%"; $("slaBar").style.width=E.sla+"%";
    const sc=[Math.max(1,Math.round(3*E.m)),Math.round(14*E.m),Math.round(41*E.m),Math.round(96*E.m)], mx=Math.max(...sc);
    $("sevBars").innerHTML=SEV.map((s,i)=>`<div class="sevrow"><span class="sv" style="color:${s[2]}">${ar()?s[1]:s[0]}</span><div class="tr"><div class="fl" style="width:${sc[i]/mx*100}%;background:${s[2]}"></div></div><span class="c">${sc[i]}</span></div>`).join("");
    seed=ENV[envI].s*7; const tc=TAC.map(()=>20+Math.round(rnd()*80*E.m)).sort((a,b)=>b-a), tmx=tc[0];
    $("tactics").innerHTML=TAC.map((t,i)=>`<div class="tac"><div class="row"><span>${ar()?t[1]:t[0]}</span><span class="mono">${tc[i]}</span></div><div class="tr"><div class="fl" style="width:${tc[i]/tmx*100}%"></div></div></div>`).join("")}
  function riyadhTime(off){return new Date(Date.now()-(off||0)).toLocaleTimeString("en-GB",{timeZone:"Asia/Riyadh",hour12:false})}
  function newRow(off){const r=Math.random(), sv=r<.05?0:r<.2?1:r<.55?2:3;
    return {t:riyadhTime(off),id:"INC-"+(incId++),sv,tac:Math.floor(Math.random()*6),as:ASSETS[Math.floor(Math.random()*ASSETS.length)],st:sv===0?2:Math.floor(Math.random()*4),an:AN[Math.floor(Math.random()*AN.length)]}}
  function renderFeed(fresh){if(!feed.length)for(let k=6;k>=0;k--)feed.push(newRow(k*47000));
    $("feedBody").innerHTML=feed.slice(-7).reverse().map((r,i)=>`<tr class="${fresh&&i===0?"new":""}"><td>${r.t}</td><td>${r.id}</td><td><span class="sv" style="color:${SEV[r.sv][2]}">${ar()?SEV[r.sv][1]:SEV[r.sv][0]}</span></td><td>${ar()?TAC[r.tac][1]:TAC[r.tac][0]}</td><td>${r.as}</td><td><span class="st-pill" style="color:${STS[r.st][2]}">${ar()?STS[r.st][1]:STS[r.st][0]}</span></td><td>${r.an}</td></tr>`).join("")}
  function renderAsset(){const svg=$("assetSvg"), A=8, B=A*R, cols=15, rows=4;svg.setAttribute("viewBox",`0 0 ${(cols*2+1)*A} ${(rows+1)*B}`);
    seed=ENV[envI].s*13; let s="";
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=A+2*A*i+(j%2?A:0), y=B+B*j, r=rnd();
      const c=r<.03?"#FF4D5E":r<.09?"#FFB020":r<.2?"#4D8DFF":"#18244F";
      s+=`<path d="${rhomb(x,y,A,B,.84)}" fill="${c}"${c!=="#18244F"?` class="lit-cell" style="--d:${(6+rnd()*3).toFixed(1)}s;--dl:-${(rnd()*8).toFixed(1)}s;--o1:1;--o2:.35"`:""}/>`}
    svg.innerHTML=s}
  function renderDash(){renderEnvs();if(!area)area=genArea();renderArea();renderKpis();renderFeed();renderAsset()}
  setInterval(()=>{$("clock").textContent=riyadhTime()},1000); $("clock").textContent=riyadhTime();
  let dashVisible=false;
  new IntersectionObserver(es=>{dashVisible=es[0].isIntersecting},{threshold:.1}).observe($("dashboard"));
  if(!RM)setInterval(()=>{if(!dashVisible)return;feed.push(newRow(0));if(feed.length>30)feed=feed.slice(-10);renderFeed(true)},3200);

  /* ---------- compliance lattice ---------- */
  const cs=$("compSvg"), A=11, B=A*R, cols=18, rowsN=6;
  seed=99; const statuses=[]; for(let i=0;i<108;i++)statuses.push(i<67?"ev":i<92?"ip":"gap");
  for(let i=statuses.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[statuses[i],statuses[j]]=[statuses[j],statuses[i]]}
  const COL={ev:"#0057D9",ip:"#8B5CFF",gap:"#FF8A3D"};
  const LAB={en:{ev:"evidenced",ip:"in progress",gap:"gap · owner assigned"},ar:{ev:"مُثبَت",ip:"قيد التنفيذ",gap:"فجوة · تم تعيين مسؤول"}};
  cs.setAttribute("viewBox",`0 0 ${(cols*2+1)*A} ${(rowsN+1)*B}`);
  let ch="", n=0;
  for(let j=0;j<rowsN;j++)for(let i=0;i<cols;i++){const x=A+2*A*i+(j%2?A:0), y=B+B*j, st=statuses[n];ch+=`<path d="${rhomb(x,y,A,B,.84)}" fill="${COL[st]}" data-n="${n+1}" data-s="${st}"/>`;n++}
  cs.innerHTML=ch;
  const tip=$("compTip");
  const tipDefault=()=>tip.textContent=ar()?"مرّر المؤشر على خلية لفحص ضابط.":"Hover a cell to inspect a control.";
  cs.addEventListener("mouseover",e=>{const p=e.target.closest("path");if(!p)return;const nn=String(p.dataset.n).padStart(3,"0"), lb=LAB[LANG][p.dataset.s];tip.textContent=ar()?`الضابط ${nn} من 108 · ${lb} · توضيحي`:`Control ${nn} of 108 · ${lb} · illustrative`});
  cs.addEventListener("mouseleave",tipDefault);

  /* ---------- maturity levels (SAMA CSF) ---------- */
  const LV=[
    {n:"Non-existent",d:"No documented cybersecurity controls; the area is not addressed.",h:"Start with a GRC retainer: gap assessment, a baseline policy set and a funded roadmap to Level 3.",c:"#9AA6C6",
     ar:{n:"غير موجود",d:"لا ضوابط أمن سيبراني موثقة، والمجال غير معالَج.",h:"البداية بعقد حوكمة وامتثال: تقييم للفجوات، ومجموعة سياسات أساسية، وخارطة طريق ممولة نحو المستوى الثالث."}},
    {n:"Ad-hoc",d:"Controls exist but depend on individuals. They are inconsistent and undocumented.",h:"Turn individual effort into process: documented controls, owners and a first evidence register.",c:"#8B5CFF",
     ar:{n:"عشوائي",d:"الضوابط موجودة لكنها تعتمد على الأفراد، وهي غير متسقة وغير موثقة.",h:"تحويل الجهد الفردي إلى إجراءات: ضوابط موثقة، ومسؤولون محددون، وأول سجل للأدلة."}},
    {n:"Repeatable but informal",d:"Practices repeat, but are not formally defined, approved or measured.",h:"Formalise and approve policies, then switch on 24/7 monitoring so practice becomes evidence.",c:"#6A5CFF",
     ar:{n:"متكرر لكنه غير رسمي",d:"الممارسات تتكرر، لكنها غير معرّفة أو معتمدة أو مقيسة رسمياً.",h:"إضفاء الطابع الرسمي على السياسات واعتمادها، ثم تشغيل المراقبة على مدار الساعة لتتحول الممارسة إلى دليل."}},
    {n:"Structured and formalized",d:"Policies and controls are defined, approved and implemented. The minimum SAMA requires of every regulated institution.",h:"Hold Level 3 through every assessment: managed detection, a live control map and an evidence pack on demand.",c:"#0066FF",min:true,
     ar:{n:"منظَّم ورسمي",d:"السياسات والضوابط معرّفة ومعتمدة ومطبقة. وهو الحد الأدنى الذي يشترطه البنك المركزي السعودي لكل مؤسسة خاضعة للتنظيم.",h:"الحفاظ على المستوى الثالث في كل تقييم: رصد مُدار، وخريطة ضوابط مباشرة، وحزمة أدلة عند الطلب."}},
    {n:"Managed and measurable",d:"Controls are measured with KPIs and periodically reviewed for effectiveness.",h:"Our dashboard metrics become your maturity metrics: detection and response times, coverage and automation.",c:"#00A8E8",
     ar:{n:"مُدار وقابل للقياس",d:"تُقاس الضوابط بمؤشرات أداء وتُراجع دورياً للتحقق من فاعليتها.",h:"مؤشرات لوحتنا تصبح مؤشرات نضجك: أزمنة الرصد والاستجابة، والتغطية، والأتمتة."}},
    {n:"Adaptive",d:"Continuous improvement driven by threat intelligence, testing and lessons learned.",h:"The Learn stage closes the loop: Saudi-specific intelligence, red teaming and rules shared across the client base.",c:"#4F9A00",
     ar:{n:"تكيّفي",d:"تحسين مستمر تقوده معلومات التهديدات والاختبارات والدروس المستفادة.",h:"مرحلة التعلّم تُغلق الدورة: معلومات تهديدات خاصة بالمملكة، وفريق أحمر، وقواعد تُشارك عبر قاعدة العملاء."}}
  ];
  let lvSel=3;
  function renderStairs(){
    $("stairs").innerHTML=LV.map((l,i)=>`<button style="--bgc:${l.c};height:${30+i*14}%" class="${i===lvSel?"on":""}" data-i="${i}" aria-label="${ar()?"المستوى":"Level"} ${i}">${l.min?`<span class="minflag">${ar()?"الحد الأدنى التنظيمي":"Regulatory minimum"}</span>`:""}<span class="lv">L${i}</span><span class="nm">${L(l,"n")}</span></button>`).join("");
    const l=LV[lvSel];
    $("lvlPanel").innerHTML=`<div><div class="label">${ar()?`المستوى ${lvSel} · إطار البنك المركزي السعودي`:`Level ${lvSel} · SAMA CSF`}</div><h3>${L(l,"n")}</h3><p class="muted">${L(l,"d")}</p></div><div class="help"><b>${ar()?"كيف نساعد":"How we help"}</b>${L(l,"h")}</div>`}
  $("stairs").onclick=e=>{const b=e.target.closest("button");if(!b)return;lvSel=+b.dataset.i;renderStairs()};

  /* ---------- self-assessment ---------- */
  const DOM=[
    {en:"Cybersecurity governance",ar:"حوكمة الأمن السيبراني",v:3,svc:1},
    {en:"Cybersecurity defense",ar:"تعزيز الأمن السيبراني",v:2,svc:0},
    {en:"Cybersecurity resilience",ar:"صمود الأمن السيبراني",v:2,svc:2},
    {en:"Third-party & cloud security",ar:"أمن الأطراف الخارجية والحوسبة السحابية",v:1,svc:4},
    {en:"24/7 monitoring coverage",ar:"تغطية المراقبة على مدار الساعة",v:1,svc:0},
    {en:"Incident response readiness",ar:"الجاهزية للاستجابة للحوادث",v:2,svc:2}
  ];
  const LVN=i=>L(LV[i],"n");
  function renderSliders(){
    $("sliders").innerHTML=DOM.map((d,i)=>`<div class="sl"><div class="top"><span><span class="n">${i+1}</span>${ar()?d.ar:d.en}</span><span class="val" id="sv${i}"></span></div><input type="range" min="0" max="5" step="1" value="${d.v}" data-i="${i}" aria-label="${ar()?d.ar:d.en}"></div>`).join("");
    $("sliders").querySelectorAll("input").forEach(inp=>inp.oninput=()=>{DOM[+inp.dataset.i].v=+inp.value;renderResult()});
    renderResult()}
  function renderResult(){
    DOM.forEach((d,i)=>$("sv"+i).textContent=`L${d.v} · ${LVN(d.v)}`);
    const svg=$("radarSvg"), c=[200,178], r=130, N=DOM.length, pt=(i,v)=>{const a=-Math.PI/2+i*2*Math.PI/N;return [c[0]+Math.cos(a)*r*v/5,c[1]+Math.sin(a)*r*v/5]};
    let s="";
    for(let g=1;g<=5;g++)s+=`<polygon points="${DOM.map((_,i)=>pt(i,g).join(",")).join(" ")}" fill="none" stroke="#24305C"/>`;
    DOM.forEach((_,i)=>{const p=pt(i,5),q=pt(i,5.75);s+=`<line x1="${c[0]}" y1="${c[1]}" x2="${p[0]}" y2="${p[1]}" stroke="#24305C"/><text x="${q[0]}" y="${q[1]+4}" text-anchor="middle">${i+1}</text>`});
    s+=`<polygon points="${DOM.map((_,i)=>pt(i,3).join(",")).join(" ")}" fill="none" stroke="#C6F432" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    s+=`<polygon points="${DOM.map((d,i)=>pt(i,Math.max(d.v,.15)).join(",")).join(" ")}" fill="rgba(0,209,255,.22)" stroke="#00D1FF" stroke-width="2.2" style="transition:all .4s"/>`;
    DOM.forEach((d,i)=>{const p=pt(i,Math.max(d.v,.15));s+=`<path d="${rhomb(p[0],p[1],4,10.5,1)}" fill="${d.v<3?"#FF8A3D":"#00D1FF"}"/>`});
    svg.innerHTML=s;
    const avg=DOM.reduce((a,d)=>a+d.v,0)/N, pct=Math.round(avg/5*100), lvl=Math.min(...DOM.map(d=>d.v)), below=DOM.filter(d=>d.v<3);
    $("scPct").textContent=pct+"%"; $("scLvl").textContent="L"+lvl; $("scGap").textContent=below.length+" / "+N;
    $("scLvl").style.color=lvl>=3?"#C6F432":"#FFB020";
    const gaps=DOM.map((d,i)=>({...d,i})).filter(d=>d.v<3).sort((a,b)=>a.v-b.v).slice(0,3);
    $("recs").innerHTML=gaps.length?gaps.map(g=>{const sv=SV[g.svc];return `<div><i style="background:${sv.c}"></i><span><b>${g.i+1} · ${ar()?g.ar:g.en}</b> — ${ar()?`المستوى ${g.v}، دون الحد الأدنى. الخدمة المقترحة: `:`Level ${g.v}, below minimum. Suggested service: `}${L(sv,"t")}</span></div>`}).join("")
      :`<div><i style="background:#C6F432"></i><span><b>${ar()?"جميع المجالات عند المستوى الثالث أو أعلى.":"Every domain is at Level 3 or above."}</b> ${ar()?"الخطوة التالية: قياس الفاعلية للوصول إلى المستوى الرابع.":"Next step: measure effectiveness to reach Level 4."}</span></div>`;
    $("recs").insertAdjacentHTML("afterbegin",`<div style="background:none;padding:0 0 4px;font-size:12px;color:var(--muted-n)">${ar()?"المستوى التقديري هو أدنى مجال، لأن التقييم يُحسب على أضعف حلقة.":"Estimated level is your lowest domain: assessments are passed on the weakest link."}</div>`)}

  /* ---------- language ---------- */
  const built=!!document.documentElement.dataset.built;
  const tx=[...document.querySelectorAll("[data-ar]")];
  tx.forEach(el=>el.dataset.en=el.innerHTML);
  const lbl=$("langLbl");
  function setLang(l){
    LANG=l; const A=ar(), root=document.documentElement;
    root.lang=A?"ar":"en"; root.dir=A?"rtl":"ltr";
    if(!built)document.title=A?"سايبر هيكلة":"Cyber HAYKALAH";
    tx.forEach(el=>{el.innerHTML=A?el.dataset.ar:el.dataset.en});
    document.querySelectorAll("[data-count]").forEach(el=>{if(el.dataset.done||RM)el.textContent=fmt(parseFloat(el.dataset.count),+el.dataset.dec||0)});
    lbl.textContent=A?"English":"العربية"; lbl.lang=A?"en":"ar";
    $("langBtn").setAttribute("aria-label",A?"Switch to English":"التبديل إلى العربية");
    renderReg(); renderLoop(); renderSvc(); barTitles(); tipDefault(); renderDash(); renderStairs(); renderSliders(); drawAll();
    try{localStorage.setItem("ch-lang",l)}catch(e){}
  }
  // Built pages: each language has its own URL and the toggle is a real link.
  // Source preview (src/home.html): the toggle swaps text in place and ?lang= picks the language.
  $("langBtn").addEventListener("click",e=>{
    if(built){try{localStorage.setItem("ch-lang",ar()?"en":"ar")}catch(_){} return}
    e.preventDefault(); setLang(ar()?"en":"ar");
  });
  let start="en";
  if(built) start=document.documentElement.lang==="ar"?"ar":"en";
  else{
    try{start=localStorage.getItem("ch-lang")||"en"}catch(e){}
    const q=new URLSearchParams(location.search).get("lang"); if(q==="ar"||q==="en")start=q;
  }
  setLang(start);
})();