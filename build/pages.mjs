// Content for the service landing pages, English and Arabic.
// Each page targets its own searches; facts match the home page and the study pack.
// Keep claims to what is true today: no licence or certification claims.

export const STAGES = ["#0066FF", "#00D1FF", "#8B5CFF", "#FF3D9A", "#FF8A3D", "#C6F432"];

export const PAGES = [
  {
    slug: "managed-soc-mdr",
    color: "#00D1FF",
    en: {
      nav: "Managed SOC & MDR",
      title: "Managed SOC & MDR in Saudi Arabia | Cyber HAYKALAH",
      desc: "24/7 managed detection and response from an in-Kingdom SOC: named Saudi analysts, MITRE ATT&CK-mapped detection, and evidence for NCA ECC-2 and SAMA CSF.",
      serviceType: "Managed security operations centre and managed detection and response",
      kicker: "Managed SOC · MDR · Saudi Arabia",
      h1: "Managed SOC and MDR, run 24/7 from inside the Kingdom",
      lead: "Continuous monitoring, detection engineering, triage and response for your estate, delivered by named, NCA-qualified Saudi analysts from a security operations centre in Saudi Arabia. Your data stays in the Kingdom.",
      facts: [["24/7", "monitoring, nights and weekends included"], ["4.8", "people per seat watched around the clock: the team you don't have to build"], ["in-KSA", "telemetry processed and stored in Saudi Arabia"]],
      cardsTitle: "What you get",
      cards: [
        ["24/7 monitoring", "Endpoints, network, identity, cloud and email watched around the clock, with no gaps at night or on weekends."],
        ["Detection engineering", "Rules and models mapped to MITRE ATT&CK and tuned to threats seen in Saudi Arabia, so alerts mean something."],
        ["A named analyst", "Every incident has an owner you can call, and severity is always written in words, never colour alone."],
        ["Response on call", "Containment, eradication and recovery steps agreed in advance, with incident response specialists ready."],
        ["Monthly evidence", "Detection and response times, coverage and control evidence, packaged for your next ECC-2 or SAMA assessment."],
        ["Data in the Kingdom", "Telemetry is processed and stored in Saudi Arabia, in line with NDMO data policy."]
      ],
      stepsTitle: "How it works: one loop, six stages",
      steps: [
        ["Collect", "Logs and telemetry from your whole estate onboarded to an in-Kingdom platform."],
        ["Detect", "Rules, models and automation surface what matters and suppress the noise."],
        ["Triage", "A named Saudi analyst rates severity and owns the alert."],
        ["Respond", "Containment and recovery, with incident response on call."],
        ["Remediate", "Root cause fixed and verified by re-test."],
        ["Learn", "New detection content shared across every environment we watch."]
      ],
      fwTitle: "What it helps you evidence",
      fw: [["ECC-2:2024", "Monitoring, logging and incident management controls"], ["SAMA CSF", "Detection and response at Maturity Level 3 or above"], ["NCNICC-1:2025", "Monitoring controls for non-CNI private companies"], ["OTCC-1:2022", "Monitoring of operational technology and industrial systems"]],
      faq: [
        ["What is a managed SOC?", "A managed security operations centre is an outsourced team that monitors your systems around the clock, investigates alerts and responds to incidents. It gives you a 24/7 capability without building and staffing your own centre, which takes around 4.8 people for every seat watched continuously."],
        ["How is MDR different from a managed SOC?", "Managed detection and response focuses on finding and stopping active threats: detection engineering, threat hunting and hands-on containment. Cyber HAYKALAH delivers both as one service, so the work continues past the alert into the response."],
        ["Does our data leave Saudi Arabia?", "No. Monitoring runs from an operations centre in the Kingdom, and telemetry is processed and stored in Saudi Arabia in line with NDMO policy."],
        ["Does a managed SOC help with ECC-2 compliance?", "Yes. Monitoring, logging and incident handling are core ECC-2:2024 requirements, and you receive monthly evidence you can hand to your assessor."]
      ]
    },
    ar: {
      nav: "مركز العمليات المُدار والرصد والاستجابة",
      title: "مركز عمليات أمنية مُدار في السعودية | سايبر هيكلة",
      desc: "رصد واستجابة مُدارة على مدار الساعة من مركز عمليات داخل المملكة: محللون سعوديون مسمّون، ورصد وفق MITRE ATT&CK، وأدلة امتثال لـ ECC-2 وإطار البنك المركزي.",
      serviceType: "مركز عمليات أمنية مُدار ورصد واستجابة مُدارة",
      kicker: "مركز عمليات مُدار · رصد واستجابة · المملكة العربية السعودية",
      h1: "مركز عمليات مُدار ورصد واستجابة، على مدار الساعة من داخل المملكة",
      lead: "مراقبة مستمرة وهندسة رصد وفرز واستجابة لبيئتك التقنية، يقدّمها محللون سعوديون مسمّون ومؤهلون من الهيئة، من مركز عمليات أمنية في المملكة العربية السعودية. وتبقى بياناتك داخل المملكة.",
      facts: [["24/7", "مراقبة تشمل الليل وعطلات نهاية الأسبوع"], ["4.8", "موظفاً لكل مقعد يعمل على مدار الساعة: فريق لا تحتاج إلى بنائه"], ["محلياً", "معالجة بيانات الرصد وتخزينها داخل المملكة"]],
      cardsTitle: "ما الذي تحصل عليه",
      cards: [
        ["مراقبة على مدار الساعة", "الأجهزة الطرفية والشبكة والهويات والسحابة والبريد تحت المراقبة طوال الوقت، دون فجوات ليلاً أو في العطلات."],
        ["هندسة الرصد", "قواعد ونماذج مرتبطة بإطار MITRE ATT&CK ومضبوطة على التهديدات المرصودة في المملكة، لتكون التنبيهات ذات معنى."],
        ["محلل مسمّى", "لكل حادثة مسؤول يمكنك الاتصال به، والخطورة مكتوبة بالكلمات دائماً، لا باللون وحده."],
        ["استجابة جاهزة", "خطوات احتواء واستئصال وتعافٍ متفق عليها مسبقاً، مع مختصين في الاستجابة للحوادث على أهبة الاستعداد."],
        ["أدلة شهرية", "أزمنة الرصد والاستجابة والتغطية وأدلة الضوابط، مُعدّة لتقييمك القادم لـ ECC-2 أو إطار البنك المركزي."],
        ["البيانات داخل المملكة", "تُعالج بيانات الرصد وتُخزّن في المملكة العربية السعودية، وفق سياسات مكتب إدارة البيانات الوطنية."]
      ],
      stepsTitle: "كيف نعمل: دورة واحدة من ست مراحل",
      steps: [
        ["الجمع", "إدماج السجلات وبيانات الرصد من بيئتك كاملة في منصة داخل المملكة."],
        ["الرصد", "قواعد ونماذج وأتمتة تُظهر ما يهم وتُسكت الضجيج."],
        ["الفرز", "محلل سعودي مسمّى يحدد الخطورة ويتولى التنبيه."],
        ["الاستجابة", "احتواء وتعافٍ، مع استجابة للحوادث جاهزة عند الطلب."],
        ["المعالجة", "إصلاح السبب الجذري والتحقق منه بإعادة الاختبار."],
        ["التعلّم", "محتوى رصد جديد يُشارك عبر كل بيئة نراقبها."]
      ],
      fwTitle: "ما الذي يساعدك على إثباته",
      fw: [["ECC-2:2024", "ضوابط المراقبة والسجلات وإدارة الحوادث"], ["SAMA CSF", "الرصد والاستجابة عند مستوى النضج الثالث أو أعلى"], ["NCNICC-1:2025", "ضوابط المراقبة للشركات الخاصة غير المصنّفة بنيةً حساسة"], ["OTCC-1:2022", "مراقبة الأنظمة التشغيلية وأنظمة التحكم الصناعي"]],
      faq: [
        ["ما هو مركز العمليات الأمنية المُدار؟", "مركز العمليات الأمنية المُدار فريق خارجي يراقب أنظمتك على مدار الساعة، ويحقق في التنبيهات، ويستجيب للحوادث. ويمنحك قدرة تعمل طوال الوقت دون أن تبني مركزك الخاص وتوظّف له، وهو ما يتطلب نحو 4.8 موظفين لكل مقعد يعمل باستمرار."],
        ["ما الفرق بين الرصد والاستجابة المُدارة ومركز العمليات المُدار؟", "يركّز الرصد والاستجابة المُدارة على اكتشاف التهديدات النشطة وإيقافها: هندسة الرصد، وتعقّب التهديدات، والاحتواء الفعلي. وتقدّم سايبر هيكلة الاثنين خدمةً واحدة، فلا يتوقف العمل عند التنبيه بل يمتد إلى الاستجابة."],
        ["هل تغادر بياناتنا المملكة؟", "لا. تعمل المراقبة من مركز عمليات داخل المملكة، وتُعالج بيانات الرصد وتُخزّن في المملكة العربية السعودية وفق سياسات مكتب إدارة البيانات الوطنية."],
        ["هل يساعد مركز العمليات المُدار على الامتثال لـ ECC-2؟", "نعم. المراقبة والسجلات ومعالجة الحوادث متطلبات أساسية في ECC-2:2024، وتحصل كل شهر على أدلة يمكنك تقديمها للمقيِّم."]
      ]
    },
    related: ["ecc-2-compliance", "incident-response", "sama-csf"]
  },
  {
    slug: "ecc-2-compliance",
    color: "#0066FF",
    en: {
      nav: "ECC-2 compliance",
      title: "NCA ECC-2:2024 Compliance Services | Cyber HAYKALAH",
      desc: "Close your NCA Essential Cybersecurity Controls gaps: ECC-2:2024 gap assessment, remediation roadmap and continuous evidence across all 108 main controls.",
      serviceType: "NCA Essential Cybersecurity Controls (ECC-2:2024) compliance",
      kicker: "NCA · Essential Cybersecurity Controls",
      h1: "ECC-2:2024 compliance, evidenced continuously",
      lead: "The National Cybersecurity Authority's Essential Cybersecurity Controls set the baseline for government entities and critical infrastructure in Saudi Arabia: 4 domains, 28 subdomains and 108 main controls. We assess where you stand, close the gaps and keep the evidence live.",
      facts: [["108", "main controls in ECC-2:2024"], ["4 · 28", "domains and subdomains"], ["1-2-2", "the control on qualified, full-time Saudi cybersecurity staff"]],
      cardsTitle: "What you get",
      cards: [
        ["Gap assessment", "Every one of the 108 main controls rated against your current state, with owners and priorities."],
        ["Remediation roadmap", "A sequenced plan to close the gaps, starting with the controls that carry the most risk."],
        ["Policies and procedures", "The governance documents ECC-2 expects, written for your organisation and approved by your leadership."],
        ["Continuous evidence", "A live control map, one cell per control, so the evidence is ready before the assessor asks."],
        ["Saudi workforce planning", "Support for control 1-2-2, which requires cybersecurity roles to be filled by qualified, full-time Saudi professionals."],
        ["Assessment support", "Preparation, evidence packs and support through your NCA compliance assessment."]
      ],
      stepsTitle: "How we take you through it",
      steps: [
        ["Scope", "Confirm which entities, systems and controls are in scope."],
        ["Assess", "Rate all 108 main controls against evidence, not interviews alone."],
        ["Prioritise", "Rank the gaps by risk and by effort."],
        ["Remediate", "Close gaps with policy, technical and staffing work."],
        ["Evidence", "Collect and organise proof for every control."],
        ["Maintain", "Keep the control map live as your estate changes."]
      ],
      fwTitle: "Related national frameworks",
      fw: [["ECC-2:2024", "Essential Cybersecurity Controls, the national baseline"], ["OTCC-1:2022", "Operational technology controls, which build on ECC"], ["CCC-2:2024", "Cloud cybersecurity controls for providers and tenants"], ["NCNICC-1:2025", "Controls for non-CNI private-sector companies"]],
      faq: [
        ["What is ECC-2:2024?", "ECC-2:2024 is the second edition of the NCA's Essential Cybersecurity Controls. It replaced ECC-1:2018 and sets 108 main controls across 4 domains and 28 subdomains."],
        ["Who has to comply with ECC-2?", "Government entities inside and outside the Kingdom and their affiliates, and private-sector organisations that own, operate or host critical national infrastructure. Non-CNI private companies are covered separately by NCNICC-1:2025."],
        ["What does control 1-2-2 require?", "That cybersecurity positions are filled by qualified, full-time Saudi professionals. It is one of the controls organisations most often need to plan for."],
        ["How long does it take to close ECC-2 gaps?", "It depends on your starting point. The gap assessment comes first and gives you a scored baseline and a sequenced roadmap, so the effort is clear before you commit to the remediation work."]
      ]
    },
    ar: {
      nav: "الامتثال للضوابط الأساسية ECC-2",
      title: "الامتثال للضوابط الأساسية ECC-2:2024 | سايبر هيكلة",
      desc: "أغلق فجواتك في الضوابط الأساسية للأمن السيبراني: تقييم فجوات ECC-2:2024، وخارطة طريق للمعالجة، وأدلة مستمرة لجميع الضوابط الرئيسة الـ108.",
      serviceType: "الامتثال للضوابط الأساسية للأمن السيبراني ECC-2:2024",
      kicker: "الهيئة الوطنية للأمن السيبراني · الضوابط الأساسية",
      h1: "الامتثال لـ ECC-2:2024، بأدلة مستمرة",
      lead: "تضع الضوابط الأساسية للأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني خط الأساس للجهات الحكومية والبنى التحتية الحساسة في المملكة: 4 مكونات أساسية و28 مكوناً فرعياً و108 ضوابط رئيسة. نقيّم موقعك، ونغلق الفجوات، ونُبقي الأدلة محدّثة.",
      facts: [["108", "ضوابط رئيسة في ECC-2:2024"], ["4 · 28", "مكونات أساسية وفرعية"], ["1-2-2", "ضابط الكفاءات السعودية المؤهلة بدوام كامل"]],
      cardsTitle: "ما الذي تحصل عليه",
      cards: [
        ["تقييم الفجوات", "تقييم كل ضابط من الضوابط الرئيسة الـ108 مقابل وضعك الحالي، مع تحديد المسؤولين والأولويات."],
        ["خارطة طريق للمعالجة", "خطة متسلسلة لإغلاق الفجوات، تبدأ بالضوابط الأعلى خطورة."],
        ["السياسات والإجراءات", "وثائق الحوكمة التي تتطلبها ECC-2، مكتوبة لجهتك ومعتمدة من قيادتها."],
        ["أدلة مستمرة", "خريطة ضوابط مباشرة، خلية لكل ضابط، لتكون الأدلة جاهزة قبل أن يطلبها المقيِّم."],
        ["تخطيط الكفاءات السعودية", "دعم الالتزام بالضابط 1-2-2 الذي يشترط شغل وظائف الأمن السيبراني بكفاءات سعودية مؤهلة بدوام كامل."],
        ["دعم التقييم", "الإعداد وحزم الأدلة والدعم خلال تقييم الامتثال من الهيئة."]
      ],
      stepsTitle: "كيف نرافقك في الرحلة",
      steps: [
        ["النطاق", "تحديد الجهات والأنظمة والضوابط المشمولة."],
        ["التقييم", "تقييم الضوابط الـ108 بالأدلة، لا بالمقابلات وحدها."],
        ["الأولويات", "ترتيب الفجوات بحسب الخطورة والجهد."],
        ["المعالجة", "إغلاق الفجوات بأعمال السياسات والتقنية والتوظيف."],
        ["الأدلة", "جمع الإثباتات وتنظيمها لكل ضابط."],
        ["الاستدامة", "إبقاء خريطة الضوابط محدّثة مع تغيّر بيئتك."]
      ],
      fwTitle: "أطر وطنية مرتبطة",
      fw: [["ECC-2:2024", "الضوابط الأساسية للأمن السيبراني، خط الأساس الوطني"], ["OTCC-1:2022", "ضوابط الأنظمة التشغيلية المبنية على الضوابط الأساسية"], ["CCC-2:2024", "ضوابط الحوسبة السحابية للمزوّدين والمستأجرين"], ["NCNICC-1:2025", "ضوابط شركات القطاع الخاص غير المصنّفة بنيةً حساسة"]],
      faq: [
        ["ما هي ECC-2:2024؟", "ECC-2:2024 هي الإصدار الثاني من الضوابط الأساسية للأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني. وقد حلّت محل ECC-1:2018، وتحدد 108 ضوابط رئيسة موزعة على 4 مكونات أساسية و28 مكوناً فرعياً."],
        ["من يجب عليه الالتزام بـ ECC-2؟", "الجهات الحكومية داخل المملكة وخارجها والجهات التابعة لها، ومنشآت القطاع الخاص التي تملك بنى تحتية وطنية حساسة أو تشغّلها أو تستضيفها. أما الشركات الخاصة غير المصنّفة بنيةً حساسة فتغطيها ضوابط NCNICC-1:2025."],
        ["ماذا يشترط الضابط 1-2-2؟", "أن تُشغل وظائف الأمن السيبراني بكفاءات سعودية مؤهلة بدوام كامل. وهو من الضوابط التي تحتاج الجهات غالباً إلى التخطيط لها مبكراً."],
        ["كم يستغرق إغلاق فجوات ECC-2؟", "يعتمد ذلك على نقطة البداية. يأتي تقييم الفجوات أولاً، فيمنحك خط أساس مُقيّماً وخارطة طريق متسلسلة، ليتضح حجم الجهد قبل الالتزام بأعمال المعالجة."]
      ]
    },
    related: ["managed-soc-mdr", "sama-csf", "incident-response"]
  },
  {
    slug: "sama-csf",
    color: "#8B5CFF",
    en: {
      nav: "SAMA Cyber Security Framework",
      title: "SAMA Cyber Security Framework Services | Cyber HAYKALAH",
      desc: "Reach and hold SAMA CSF Maturity Level 3: gap assessment, remediation, 24/7 monitoring and evidence for banks, insurers and payments firms in Saudi Arabia.",
      serviceType: "SAMA Cyber Security Framework maturity and compliance",
      kicker: "Saudi Central Bank · Cyber Security Framework",
      h1: "SAMA Cyber Security Framework: reach Level 3, and stay there",
      lead: "The Saudi Central Bank's Cyber Security Framework requires every regulated financial institution to reach at least Maturity Level 3, Structured and formalized, across 4 domains and 32 subdomains. We help you get there and keep the evidence current.",
      facts: [["L3", "minimum maturity for every regulated institution"], ["4 · 32", "domains and subdomains"], ["0–5", "maturity levels, from Non-existent to Adaptive"]],
      cardsTitle: "What you get",
      cards: [
        ["Maturity assessment", "Each subdomain rated on SAMA's 0–5 scale, with the evidence behind every score."],
        ["Gap remediation", "A plan to lift every subdomain to Level 3, and the policy, process and technical work to deliver it."],
        ["24/7 monitoring", "Managed detection and response that turns day-to-day operations into maturity evidence."],
        ["Third parties and cloud", "Assurance over the suppliers and cloud services your institution depends on."],
        ["Incident response", "Tested playbooks and on-call specialists, so resilience can be demonstrated rather than described."],
        ["Board reporting", "Maturity reporting your board and SAMA can read, with progress shown by domain."]
      ],
      stepsTitle: "The six maturity levels",
      steps: [
        ["Level 0", "Non-existent: the area is not addressed."],
        ["Level 1", "Ad-hoc: controls depend on individuals."],
        ["Level 2", "Repeatable but informal: practices repeat but are not defined."],
        ["Level 3", "Structured and formalized: the minimum SAMA requires."],
        ["Level 4", "Managed and measurable: controls measured with KPIs."],
        ["Level 5", "Adaptive: continuous improvement driven by intelligence."]
      ],
      fwTitle: "Frameworks financial institutions also face",
      fw: [["SAMA CSF", "Cyber Security Framework, Maturity Level 3 minimum"], ["ECC-2:2024", "NCA Essential Cybersecurity Controls"], ["PDPL", "Personal Data Protection Law and its transfer rules"], ["CCC-2:2024", "Cloud cybersecurity controls"]],
      faq: [
        ["What is the SAMA Cyber Security Framework?", "It is the Saudi Central Bank's framework for cybersecurity in the financial sector. It is organised into 4 domains and 32 subdomains, each assessed on a maturity scale from 0 to 5."],
        ["What maturity level do we need?", "At least Level 3, Structured and formalized, which means policies and controls are defined, approved and implemented."],
        ["Who does the framework apply to?", "Institutions regulated by the Saudi Central Bank, such as banks, insurance companies and payments firms."],
        ["Can an outsourced SOC meet SAMA requirements?", "Yes, provided the outsourcing itself meets SAMA's requirements for material outsourcing. We design the service and its reporting so you can show how the outsourced work is governed."]
      ]
    },
    ar: {
      nav: "إطار البنك المركزي السعودي",
      title: "إطار البنك المركزي السعودي للأمن السيبراني | سايبر هيكلة",
      desc: "بلوغ مستوى النضج الثالث في إطار البنك المركزي السعودي والحفاظ عليه: تقييم الفجوات والمعالجة والمراقبة المستمرة والأدلة للبنوك وشركات التأمين والمدفوعات.",
      serviceType: "النضج والامتثال للإطار التنظيمي للأمن السيبراني للبنك المركزي السعودي",
      kicker: "البنك المركزي السعودي · الإطار التنظيمي للأمن السيبراني",
      h1: "إطار البنك المركزي السعودي: ابلغ المستوى الثالث، وحافظ عليه",
      lead: "يشترط الإطار التنظيمي للأمن السيبراني الصادر عن البنك المركزي السعودي أن تبلغ كل مؤسسة مالية خاضعة للتنظيم مستوى النضج الثالث على الأقل، «منظَّم ورسمي»، عبر 4 مجالات و32 مجالاً فرعياً. نساعدك على بلوغه ونُبقي الأدلة محدّثة.",
      facts: [["L3", "الحد الأدنى للنضج لكل مؤسسة خاضعة للتنظيم"], ["4 · 32", "مجالات ومجالات فرعية"], ["0–5", "مستويات نضج، من «غير موجود» إلى «تكيّفي»"]],
      cardsTitle: "ما الذي تحصل عليه",
      cards: [
        ["تقييم النضج", "تقييم كل مجال فرعي على مقياس البنك المركزي من 0 إلى 5، مع الأدلة وراء كل درجة."],
        ["معالجة الفجوات", "خطة لرفع كل مجال فرعي إلى المستوى الثالث، وأعمال السياسات والإجراءات والتقنية لتحقيقها."],
        ["مراقبة على مدار الساعة", "رصد واستجابة مُدارة تحوّل العمليات اليومية إلى أدلة نضج."],
        ["الأطراف الخارجية والسحابة", "ضمانات حول الموردين والخدمات السحابية التي تعتمد عليها مؤسستك."],
        ["الاستجابة للحوادث", "أدلة إجراءات مُختبرة ومختصون جاهزون، لتُثبت الصمود بدلاً من وصفه."],
        ["تقارير مجلس الإدارة", "تقارير نضج يقرؤها مجلس الإدارة والبنك المركزي، مع عرض التقدم لكل مجال."]
      ],
      stepsTitle: "مستويات النضج الستة",
      steps: [
        ["المستوى 0", "غير موجود: المجال غير معالَج."],
        ["المستوى 1", "عشوائي: الضوابط تعتمد على الأفراد."],
        ["المستوى 2", "متكرر لكنه غير رسمي: الممارسات تتكرر دون تعريف."],
        ["المستوى 3", "منظَّم ورسمي: الحد الأدنى الذي يشترطه البنك المركزي."],
        ["المستوى 4", "مُدار وقابل للقياس: ضوابط تُقاس بمؤشرات أداء."],
        ["المستوى 5", "تكيّفي: تحسين مستمر تقوده المعلومات الاستخباراتية."]
      ],
      fwTitle: "أطر أخرى تواجهها المؤسسات المالية",
      fw: [["SAMA CSF", "الإطار التنظيمي للأمن السيبراني، الحد الأدنى المستوى الثالث"], ["ECC-2:2024", "الضوابط الأساسية للأمن السيبراني من الهيئة"], ["PDPL", "نظام حماية البيانات الشخصية ولوائح نقلها"], ["CCC-2:2024", "ضوابط الأمن السيبراني للحوسبة السحابية"]],
      faq: [
        ["ما هو الإطار التنظيمي للأمن السيبراني للبنك المركزي السعودي؟", "هو إطار البنك المركزي السعودي للأمن السيبراني في القطاع المالي، ويتكوّن من 4 مجالات و32 مجالاً فرعياً، يُقيّم كلٌّ منها على مقياس نضج من 0 إلى 5."],
        ["ما مستوى النضج المطلوب؟", "المستوى الثالث على الأقل، «منظَّم ورسمي»، أي أن السياسات والضوابط معرّفة ومعتمدة ومطبقة."],
        ["على من ينطبق الإطار؟", "على المؤسسات الخاضعة لتنظيم البنك المركزي السعودي، مثل البنوك وشركات التأمين وشركات المدفوعات."],
        ["هل يمكن لمركز عمليات خارجي أن يلبي متطلبات البنك المركزي؟", "نعم، بشرط أن يستوفي الإسناد نفسه متطلبات البنك المركزي للإسناد الجوهري. ونصمم الخدمة وتقاريرها لتتمكن من إثبات كيفية حوكمة العمل المُسند."]
      ]
    },
    related: ["managed-soc-mdr", "ecc-2-compliance", "incident-response"]
  },
  {
    slug: "incident-response",
    color: "#FF3D9A",
    en: {
      nav: "Incident response & forensics",
      title: "Incident Response & Digital Forensics, KSA | Cyber HAYKALAH",
      desc: "On-call incident response and digital forensics in Saudi Arabia: containment, root cause, preserved evidence and regulator-ready reports. Retainer or call-out.",
      serviceType: "Incident response and digital forensics",
      kicker: "DFIR · Retainer · Call-out",
      h1: "Incident response and forensics, when every minute counts",
      lead: "When an incident happens, Saudi incident-response specialists help you contain it, find the root cause, preserve the evidence and prepare the report your regulator expects, on a retainer agreed in advance or as an emergency call-out.",
      facts: [["24/7", "on-call response"], ["Retainer", "terms, contacts and playbooks agreed before you need them"], ["in-KSA", "forensic evidence handled and kept in Saudi Arabia"]],
      cardsTitle: "What you get",
      cards: [
        ["Incident response retainer", "Agreed contacts, response times and playbooks, so the first hour is spent responding, not negotiating."],
        ["Containment", "Isolate affected systems and stop the spread without destroying the evidence you will need."],
        ["Forensic investigation", "Establish what happened, when, how the attacker got in and what they touched."],
        ["Evidence preservation", "Chain-of-custody handling for logs, disk and memory images."],
        ["Regulator-ready reporting", "A clear report and evidence pack to support your organisation's regulatory notifications."],
        ["Readiness", "Playbooks and tabletop exercises that test your team before a real incident does."]
      ],
      stepsTitle: "How a response runs",
      steps: [
        ["Prepare", "Retainer, contacts and playbooks agreed in advance."],
        ["Detect", "The alert is confirmed and its severity rated."],
        ["Contain", "Affected systems isolated, evidence preserved."],
        ["Eradicate", "The attacker's access and tools removed."],
        ["Recover", "Systems restored and watched closely."],
        ["Learn", "Root cause, lessons and new detections shared."]
      ],
      fwTitle: "What it helps you evidence",
      fw: [["ECC-2:2024", "Incident and threat management controls"], ["SAMA CSF", "Incident response and resilience"], ["NCNICC-1:2025", "Incident handling for private companies"], ["PDPL", "Handling of personal-data breaches"]],
      faq: [
        ["What is an incident response retainer?", "An agreement made before an incident that sets out who you call, how fast the team responds and how the work is run. It removes the delay of finding and contracting a provider in the middle of a crisis."],
        ["What should we do first if we suspect a breach?", "Isolate affected systems if you can do so safely, preserve logs and evidence, and call your incident response provider. Avoid wiping or rebuilding machines before the evidence is captured."],
        ["Do you notify the regulator for us?", "We prepare the incident report and evidence your organisation needs for its regulatory notifications. The notification itself is made by your organisation."],
        ["Is forensic evidence kept in Saudi Arabia?", "Yes. Evidence is handled and stored in the Kingdom, with chain-of-custody records."]
      ]
    },
    ar: {
      nav: "الاستجابة للحوادث والأدلة الرقمية",
      title: "الاستجابة للحوادث والأدلة الرقمية | سايبر هيكلة",
      desc: "استجابة للحوادث وتحقيق جنائي رقمي في المملكة: احتواء، وسبب جذري، وحفظ للأدلة، وتقارير جاهزة للجهة المنظِّمة. بعقد احتفاظ أو عند الطلب.",
      serviceType: "الاستجابة للحوادث والتحقيق الجنائي الرقمي",
      kicker: "الأدلة الرقمية والاستجابة · عقد احتفاظ · استدعاء",
      h1: "الاستجابة للحوادث والأدلة الرقمية، حين تكون كل دقيقة مهمة",
      lead: "عند وقوع حادثة، يساعدك مختصون سعوديون في الاستجابة للحوادث على احتوائها، وتحديد سببها الجذري، وحفظ الأدلة، وإعداد التقرير الذي تتوقعه الجهة المنظِّمة، بعقد احتفاظ متفق عليه مسبقاً أو باستدعاء طارئ.",
      facts: [["24/7", "استجابة عند الطلب"], ["عقد احتفاظ", "شروط وجهات اتصال وأدلة إجراءات متفق عليها قبل الحاجة"], ["محلياً", "التعامل مع الأدلة الجنائية وحفظها داخل المملكة"]],
      cardsTitle: "ما الذي تحصل عليه",
      cards: [
        ["عقد احتفاظ للاستجابة", "جهات اتصال وأزمنة استجابة وأدلة إجراءات متفق عليها، لتُقضى الساعة الأولى في الاستجابة لا في التفاوض."],
        ["الاحتواء", "عزل الأنظمة المتأثرة وإيقاف الانتشار دون إتلاف الأدلة التي ستحتاجها."],
        ["التحقيق الجنائي", "تحديد ما حدث ومتى، وكيف دخل المهاجم، وما الذي وصل إليه."],
        ["حفظ الأدلة", "التعامل مع السجلات وصور الأقراص والذاكرة وفق سلسلة حيازة موثّقة."],
        ["تقارير جاهزة للجهة المنظِّمة", "تقرير واضح وحزمة أدلة تدعم إشعارات جهتك التنظيمية."],
        ["الجاهزية", "أدلة إجراءات وتمارين محاكاة تختبر فريقك قبل أن تختبره حادثة حقيقية."]
      ],
      stepsTitle: "كيف تسير الاستجابة",
      steps: [
        ["الاستعداد", "عقد الاحتفاظ وجهات الاتصال وأدلة الإجراءات متفق عليها مسبقاً."],
        ["الرصد", "تأكيد التنبيه وتحديد خطورته."],
        ["الاحتواء", "عزل الأنظمة المتأثرة وحفظ الأدلة."],
        ["الاستئصال", "إزالة وصول المهاجم وأدواته."],
        ["التعافي", "استعادة الأنظمة ومراقبتها عن كثب."],
        ["التعلّم", "مشاركة السبب الجذري والدروس وقواعد الرصد الجديدة."]
      ],
      fwTitle: "ما الذي يساعدك على إثباته",
      fw: [["ECC-2:2024", "ضوابط إدارة الحوادث والتهديدات"], ["SAMA CSF", "الاستجابة للحوادث والصمود"], ["NCNICC-1:2025", "معالجة الحوادث في الشركات الخاصة"], ["PDPL", "التعامل مع تسرب البيانات الشخصية"]],
      faq: [
        ["ما هو عقد الاحتفاظ للاستجابة للحوادث؟", "اتفاق يُبرم قبل وقوع الحادثة ويحدد من تتصل به، ومدى سرعة استجابة الفريق، وكيف يُدار العمل. ويُغنيك عن البحث عن مزوّد والتعاقد معه في خضم الأزمة."],
        ["ماذا نفعل أولاً إذا اشتبهنا في اختراق؟", "اعزل الأنظمة المتأثرة إن أمكن ذلك بأمان، واحفظ السجلات والأدلة، واتصل بمزوّد الاستجابة للحوادث. وتجنّب مسح الأجهزة أو إعادة بنائها قبل التقاط الأدلة."],
        ["هل تُبلغون الجهة المنظِّمة نيابةً عنا؟", "نُعدّ تقرير الحادثة والأدلة التي تحتاجها جهتك لإشعاراتها التنظيمية، أما الإشعار نفسه فتقدّمه جهتك."],
        ["هل تُحفظ الأدلة الجنائية داخل المملكة؟", "نعم. يجري التعامل مع الأدلة وحفظها داخل المملكة، مع سجلات لسلسلة الحيازة."]
      ]
    },
    related: ["managed-soc-mdr", "ecc-2-compliance", "sama-csf"]
  },
  {
    slug: "penetration-testing",
    color: "#8B5CFF",
    en: {
      nav: "Penetration testing & red team",
      title: "Penetration Testing in Saudi Arabia | Cyber HAYKALAH",
      desc: "Infrastructure, web, mobile and cloud penetration testing and red teaming in Saudi Arabia, mapped to NCA ECC-2 and SAMA CSF and verified by re-test.",
      serviceType: "Penetration testing and red teaming",
      kicker: "Penetration testing · Red team · Saudi Arabia",
      h1: "Penetration testing that shows how an attacker would get in",
      lead: "Infrastructure, application, cloud and adversary-emulation testing by Saudi specialists. Every finding is rated by risk, mapped to the controls you are assessed against, and closed with a re-test.",
      facts: [["Re-test", "included, so every fix is verified"], ["ATT&CK", "red-team scenarios mapped to MITRE ATT&CK"], ["in-KSA", "testers and test data stay in the Kingdom"]],
      cardsTitle: "What we test",
      cards: [
        ["External and internal networks", "Internet-facing systems, internal segments, Active Directory and the paths an attacker would take between them."],
        ["Web and mobile applications", "Authentication, access control, business logic and APIs, tested against the OWASP categories and your own risk scenarios."],
        ["Cloud configuration", "Identity, storage, network and logging settings in your cloud tenancy, checked against CCC-2:2024."],
        ["Red teaming", "Goal-based adversary emulation over weeks, testing whether your people, processes and monitoring notice and respond."],
        ["Social engineering", "Phishing and pretexting simulations, agreed in advance and reported without naming individuals."],
        ["Reporting and re-test", "An executive summary, technical findings with clear fixes, and a re-test once you have remediated."]
      ],
      stepsTitle: "How an engagement runs",
      steps: [
        ["Scope", "Targets, rules of engagement and testing windows agreed in writing."],
        ["Discover", "Map the attack surface: hosts, services, applications, identities."],
        ["Test", "Manual testing supported by tooling, focused on what is exploitable."],
        ["Validate", "Confirm impact safely and remove false positives."],
        ["Report", "Findings rated by risk and mapped to your controls."],
        ["Re-test", "Verify the fixes and issue a re-test letter."]
      ],
      fwTitle: "What it helps you evidence",
      fw: [["ECC-2:2024", "Penetration testing and vulnerability management controls"], ["SAMA CSF", "Security testing for regulated financial institutions"], ["CCC-2:2024", "Cloud configuration and tenant controls"], ["NCNICC-1:2025", "Testing obligations for private companies"]],
      faq: [
        ["How often should we run a penetration test?", "At least once a year and after significant changes to systems or applications. Organisations with critical systems usually test them more often, and the national frameworks expect testing to be regular."],
        ["What is the difference between a penetration test and red teaming?", "A penetration test finds as many weaknesses as possible in a defined scope. Red teaming pursues a specific goal, such as reaching sensitive data, the way a real attacker would, to test whether your detection and response work."],
        ["Will testing disrupt our systems?", "Testing is scoped and scheduled with you, higher-risk techniques are agreed in advance, and production systems are tested within agreed windows. You can pause testing at any time."],
        ["What do we receive at the end?", "An executive summary, a technical report with each finding rated by risk and mapped to the relevant controls, remediation guidance, and a re-test letter once fixes are verified."]
      ]
    },
    ar: {
      nav: "اختبار الاختراق والفريق الأحمر",
      title: "اختبار الاختراق في السعودية | سايبر هيكلة",
      desc: "اختبار اختراق للبنية التحتية والتطبيقات والسحابة وتمارين الفريق الأحمر في المملكة، مع ربط النتائج بـ ECC-2 وإطار البنك المركزي والتحقق منها بإعادة الاختبار.",
      serviceType: "اختبار الاختراق والفريق الأحمر",
      kicker: "اختبار الاختراق · الفريق الأحمر · المملكة العربية السعودية",
      h1: "اختبار اختراق يُريك كيف سيدخل المهاجم",
      lead: "اختبارات للبنية التحتية والتطبيقات والسحابة ومحاكاة الخصوم، ينفّذها مختصون سعوديون. تُصنَّف كل نتيجة بحسب خطورتها، وتُربط بالضوابط التي تُقيَّم عليها، وتُغلق بإعادة اختبار.",
      facts: [["إعادة اختبار", "مشمولة، للتحقق من كل إصلاح"], ["ATT&CK", "سيناريوهات الفريق الأحمر مرتبطة بإطار MITRE ATT&CK"], ["محلياً", "المختبِرون وبيانات الاختبار داخل المملكة"]],
      cardsTitle: "ما الذي نختبره",
      cards: [
        ["الشبكات الخارجية والداخلية", "الأنظمة المكشوفة على الإنترنت، والأجزاء الداخلية، وخدمة الدليل النشط، والمسارات التي قد يسلكها المهاجم بينها."],
        ["تطبيقات الويب والجوال", "المصادقة، والتحكم في الوصول، ومنطق الأعمال، وواجهات البرمجة، وفق فئات OWASP وسيناريوهات المخاطر الخاصة بك."],
        ["إعدادات السحابة", "إعدادات الهويات والتخزين والشبكة والسجلات في بيئتك السحابية، مقارنةً بضوابط CCC-2:2024."],
        ["الفريق الأحمر", "محاكاة خصوم موجّهة بهدف تمتد لأسابيع، تختبر هل يلاحظ فريقك وإجراءاتك ومراقبتك الهجوم ويستجيبون له."],
        ["الهندسة الاجتماعية", "محاكاة التصيّد والانتحال، متفق عليها مسبقاً، وتُقدَّم نتائجها دون تسمية أفراد."],
        ["التقارير وإعادة الاختبار", "ملخص تنفيذي، ونتائج تقنية بإصلاحات واضحة، وإعادة اختبار بعد المعالجة."]
      ],
      stepsTitle: "كيف يسير الاختبار",
      steps: [
        ["النطاق", "الأهداف وقواعد الاشتباك ونوافذ الاختبار متفق عليها كتابياً."],
        ["الاستكشاف", "رسم سطح الهجوم: الأجهزة والخدمات والتطبيقات والهويات."],
        ["الاختبار", "اختبار يدوي تدعمه الأدوات، يركّز على ما يمكن استغلاله فعلاً."],
        ["التحقق", "تأكيد الأثر بأمان واستبعاد النتائج الخاطئة."],
        ["التقرير", "نتائج مصنّفة بحسب الخطورة ومرتبطة بضوابطك."],
        ["إعادة الاختبار", "التحقق من الإصلاحات وإصدار خطاب إعادة الاختبار."]
      ],
      fwTitle: "ما الذي يساعدك على إثباته",
      fw: [["ECC-2:2024", "ضوابط اختبار الاختراق وإدارة الثغرات"], ["SAMA CSF", "الاختبارات الأمنية للمؤسسات المالية الخاضعة للتنظيم"], ["CCC-2:2024", "ضوابط إعدادات السحابة والمستأجرين"], ["NCNICC-1:2025", "متطلبات الاختبار للشركات الخاصة"]],
      faq: [
        ["كم مرة يجب إجراء اختبار الاختراق؟", "مرة واحدة في السنة على الأقل، وبعد أي تغيير جوهري في الأنظمة أو التطبيقات. وتختبر الجهات ذات الأنظمة الحساسة أنظمتها عادةً بوتيرة أعلى، وتتوقع الأطر الوطنية أن يكون الاختبار دورياً."],
        ["ما الفرق بين اختبار الاختراق والفريق الأحمر؟", "يسعى اختبار الاختراق إلى إيجاد أكبر عدد من الثغرات ضمن نطاق محدد. أما الفريق الأحمر فيسعى إلى هدف معيّن، مثل الوصول إلى بيانات حساسة، كما يفعل المهاجم الحقيقي، لاختبار فاعلية الرصد والاستجابة لديك."],
        ["هل يعطّل الاختبار أنظمتنا؟", "يُحدَّد نطاق الاختبار وموعده معك، وتُعتمد الأساليب الأعلى خطورة مسبقاً، وتُختبر أنظمة الإنتاج ضمن نوافذ متفق عليها. ويمكنك إيقاف الاختبار مؤقتاً في أي وقت."],
        ["ماذا نستلم في النهاية؟", "ملخصاً تنفيذياً، وتقريراً تقنياً يصنّف كل نتيجة بحسب خطورتها ويربطها بالضوابط ذات الصلة، وإرشادات للمعالجة، وخطاب إعادة اختبار بعد التحقق من الإصلاحات."]
      ]
    },
    related: ["cloud-security", "managed-soc-mdr", "ecc-2-compliance"]
  },
  {
    slug: "cloud-security",
    color: "#FF8A3D",
    en: {
      nav: "Cloud security & CCC-2",
      title: "Cloud Security & NCA CCC-2 Compliance | Cyber HAYKALAH",
      desc: "Secure your cloud in Saudi Arabia: architecture review, posture management and NCA CCC-2:2024 cloud controls compliance, with data kept in the Kingdom.",
      serviceType: "Cloud security and NCA Cloud Cybersecurity Controls compliance",
      kicker: "Cloud security · CCC-2:2024 · NDMO",
      h1: "Cloud security, built to the Kingdom's cloud controls",
      lead: "Architecture reviews, continuous posture management and application security for workloads in Saudi cloud regions, aligned to the NCA's Cloud Cybersecurity Controls and NDMO data rules.",
      facts: [["CCC-2", "the NCA's Cloud Cybersecurity Controls, 2024 edition"], ["18", "main controls for cloud tenants"], ["4", "data classification levels to design around"]],
      cardsTitle: "What you get",
      cards: [
        ["Architecture review", "Your cloud design checked for identity, network segmentation, encryption and logging before problems reach production."],
        ["Posture management", "Continuous checks for misconfigurations across accounts and subscriptions, with fixes prioritised by risk."],
        ["Identity and access", "Least-privilege roles, strong authentication and regular access reviews for people and workloads."],
        ["Data residency", "Data mapped to its classification level and kept where NDMO policy requires it to be."],
        ["Application security", "Secure code review and security built into your delivery pipeline, so fixes happen before release."],
        ["Cloud monitoring", "Cloud logs and alerts fed into our 24/7 managed SOC, alongside the rest of your estate."]
      ],
      stepsTitle: "How we secure your cloud",
      steps: [
        ["Discover", "Inventory accounts, workloads, identities and data."],
        ["Assess", "Check configuration against CCC-2 and good practice."],
        ["Prioritise", "Rank issues by risk and by effort."],
        ["Harden", "Fix configuration, identity and network gaps."],
        ["Monitor", "Watch for drift and threats around the clock."],
        ["Evidence", "Keep proof ready for your next assessment."]
      ],
      fwTitle: "What it helps you evidence",
      fw: [["CCC-2:2024", "Cloud Cybersecurity Controls for providers and tenants"], ["ECC-2:2024", "Essential Cybersecurity Controls, including third-party and cloud"], ["NDMO", "National data management and residency policy"], ["PDPL", "Personal Data Protection Law and its transfer rules"]],
      faq: [
        ["What is CCC-2:2024?", "The NCA's Cloud Cybersecurity Controls, second edition. They apply to cloud service providers and to government and critical-infrastructure organisations that use cloud, with 37 main controls for providers and 18 for tenants."],
        ["Does our data have to stay in Saudi Arabia?", "Data residency is governed by NDMO policy and depends on how your data is classified. We map your data to the classification levels and design the architecture to match."],
        ["Which cloud platforms do you cover?", "The major public cloud platforms, including their Saudi regions, as well as private and hybrid cloud environments."],
        ["Is cloud monitoring part of the managed SOC?", "It can be. Cloud logs and alerts feed our managed detection and response, so cloud incidents are watched 24/7 alongside the rest of your estate."]
      ]
    },
    ar: {
      nav: "أمن السحابة وضوابط CCC-2",
      title: "أمن السحابة والامتثال لضوابط CCC-2 | سايبر هيكلة",
      desc: "أمّن بيئتك السحابية في المملكة: مراجعة المعمارية، وإدارة الوضع الأمني، والامتثال لضوابط الحوسبة السحابية CCC-2:2024، مع بقاء البيانات داخل المملكة.",
      serviceType: "أمن السحابة والامتثال لضوابط الأمن السيبراني للحوسبة السحابية",
      kicker: "أمن السحابة · CCC-2:2024 · مكتب إدارة البيانات الوطنية",
      h1: "أمن السحابة، وفق ضوابط المملكة للحوسبة السحابية",
      lead: "مراجعات للمعمارية، وإدارة مستمرة للوضع الأمني، وأمن للتطبيقات لأحمالك في المناطق السحابية داخل المملكة، بما يتوافق مع ضوابط الهيئة للحوسبة السحابية وقواعد مكتب إدارة البيانات الوطنية.",
      facts: [["CCC-2", "ضوابط الأمن السيبراني للحوسبة السحابية، إصدار 2024"], ["18", "ضابطاً رئيساً للمستأجرين"], ["4", "مستويات تصنيف للبيانات تُبنى عليها المعمارية"]],
      cardsTitle: "ما الذي تحصل عليه",
      cards: [
        ["مراجعة المعمارية", "فحص تصميمك السحابي من حيث الهويات وتقسيم الشبكة والتشفير والسجلات، قبل أن تصل المشكلات إلى بيئة الإنتاج."],
        ["إدارة الوضع الأمني", "فحوص مستمرة لأخطاء الإعداد عبر الحسابات والاشتراكات، مع ترتيب الإصلاحات بحسب الخطورة."],
        ["الهويات والوصول", "أدوار بأقل الصلاحيات، ومصادقة قوية، ومراجعات دورية للوصول للأشخاص والأحمال."],
        ["إقامة البيانات", "ربط البيانات بمستوى تصنيفها وحفظها حيث تشترط سياسات مكتب إدارة البيانات الوطنية."],
        ["أمن التطبيقات", "مراجعة آمنة للشيفرة، وأمن مدمج في مسار التطوير، لتُعالج الثغرات قبل الإطلاق."],
        ["مراقبة السحابة", "تغذية سجلات السحابة وتنبيهاتها إلى مركز عملياتنا المُدار على مدار الساعة، مع بقية بيئتك."]
      ],
      stepsTitle: "كيف نؤمّن سحابتك",
      steps: [
        ["الاستكشاف", "حصر الحسابات والأحمال والهويات والبيانات."],
        ["التقييم", "فحص الإعدادات مقابل CCC-2 وأفضل الممارسات."],
        ["الأولويات", "ترتيب المشكلات بحسب الخطورة والجهد."],
        ["التحصين", "معالجة فجوات الإعداد والهويات والشبكة."],
        ["المراقبة", "رصد الانحرافات والتهديدات على مدار الساعة."],
        ["الأدلة", "إبقاء الإثباتات جاهزة لتقييمك القادم."]
      ],
      fwTitle: "ما الذي يساعدك على إثباته",
      fw: [["CCC-2:2024", "ضوابط الأمن السيبراني للحوسبة السحابية للمزوّدين والمستأجرين"], ["ECC-2:2024", "الضوابط الأساسية، بما فيها الأطراف الخارجية والسحابة"], ["NDMO", "سياسات إدارة البيانات الوطنية وإقامتها"], ["PDPL", "نظام حماية البيانات الشخصية ولوائح نقلها"]],
      faq: [
        ["ما هي ضوابط CCC-2:2024؟", "هي الإصدار الثاني من ضوابط الأمن السيبراني للحوسبة السحابية الصادرة عن الهيئة. وتنطبق على مزوّدي الخدمات السحابية وعلى الجهات الحكومية والبنى الحساسة التي تستخدم السحابة، وتضم 37 ضابطاً رئيساً للمزوّدين و18 للمستأجرين."],
        ["هل يجب أن تبقى بياناتنا داخل المملكة؟", "تحكم سياسات مكتب إدارة البيانات الوطنية إقامة البيانات، وتعتمد على تصنيف بياناتك. ونربط بياناتك بمستويات التصنيف ونصمم المعمارية بما يتوافق معها."],
        ["ما المنصات السحابية التي تغطونها؟", "المنصات السحابية العامة الرئيسة، بما فيها مناطقها داخل المملكة، إضافةً إلى البيئات السحابية الخاصة والهجينة."],
        ["هل مراقبة السحابة جزء من مركز العمليات المُدار؟", "يمكن أن تكون كذلك. إذ تُغذّى سجلات السحابة وتنبيهاتها إلى خدمة الرصد والاستجابة المُدارة، فتُراقب حوادث السحابة على مدار الساعة مع بقية بيئتك."]
      ]
    },
    related: ["managed-soc-mdr", "penetration-testing", "ecc-2-compliance"]
  },
  {
    slug: "ncnicc-compliance",
    color: "#C6F432",
    en: {
      nav: "NCNICC compliance",
      title: "NCNICC-1:2025 Compliance for Companies | Cyber HAYKALAH",
      desc: "Meet the NCA's NCNICC-1:2025 private-sector controls: scoping, gap assessment, remediation and evidence for Category A and B companies in Saudi Arabia.",
      serviceType: "NCA Non-CNI private-sector cybersecurity controls (NCNICC-1:2025) compliance",
      kicker: "NCA · Private-sector controls · Category A and B",
      h1: "NCNICC-1:2025: cybersecurity controls for private companies, made practical",
      lead: "NCNICC-1:2025 brings private companies outside critical infrastructure under mandatory NCA controls for the first time: 65 controls for Category A companies and 26 for Category B. We help you confirm where you fall, close the gaps and keep the evidence ready.",
      facts: [["65", "controls for Category A: above 250 staff or SAR 200m revenue"], ["26", "controls for Category B: 6 to 249 staff"], ["First", "set of NCA controls written for non-CNI companies"]],
      cardsTitle: "What you get",
      cards: [
        ["Category check", "Confirm whether you are Category A, Category B or out of scope, and which controls apply."],
        ["Gap assessment", "Every applicable control rated against your current state, with owners and priorities."],
        ["Right-sized remediation", "A plan sized to a private company: the controls that matter most first, without enterprise overhead."],
        ["Policies and procedures", "The governance documents the controls expect, written for your company and approved by your leadership."],
        ["Monitoring option", "Our 24/7 managed SOC covers the monitoring and incident controls without hiring an in-house team."],
        ["Evidence pack", "Proof for each control, organised and kept current for when you need to show it."]
      ],
      stepsTitle: "How we take you through it",
      steps: [
        ["Classify", "Confirm your category and the controls in scope."],
        ["Assess", "Rate each control against evidence."],
        ["Plan", "Sequence the gaps by risk and effort."],
        ["Remediate", "Close gaps with policy and technical work."],
        ["Monitor", "Keep watch with managed detection if you need it."],
        ["Evidence", "Organise proof and keep it current."]
      ],
      fwTitle: "Related frameworks",
      fw: [["NCNICC-1:2025", "Controls for non-CNI private-sector companies"], ["ECC-2:2024", "Essential Cybersecurity Controls, for government and CNI"], ["PDPL", "Personal Data Protection Law"], ["SAMA CSF", "For companies regulated by the Saudi Central Bank"]],
      faq: [
        ["What is NCNICC-1:2025?", "It is the NCA's set of cybersecurity controls for private-sector companies that are not critical national infrastructure. It is the first time these companies have been brought under mandatory NCA controls."],
        ["Is my company Category A or Category B?", "Category A covers companies with more than 250 employees or more than SAR 200 million in revenue. Category B covers companies with 6 to 249 employees or SAR 3 million to 200 million in revenue. Micro-enterprises are out of scope. Always confirm against the NCA's official text."],
        ["How is NCNICC different from ECC-2?", "ECC-2 applies to government entities and to organisations that own, operate or host critical infrastructure. NCNICC is a separate, smaller set written for other private companies."],
        ["Can a small team meet NCNICC?", "Yes. A gap assessment shows what applies to you, and managed services such as a 24/7 SOC and a governance retainer can cover the controls without building an in-house team."]
      ]
    },
    ar: {
      nav: "الامتثال لضوابط NCNICC",
      title: "الامتثال لضوابط NCNICC-1:2025 للشركات | سايبر هيكلة",
      desc: "التزم بضوابط الهيئة لشركات القطاع الخاص غير الحساسة NCNICC-1:2025: تحديد النطاق، وتقييم الفجوات، والمعالجة، والأدلة لشركات الفئة أ والفئة ب في المملكة.",
      serviceType: "الامتثال لضوابط الأمن السيبراني لشركات القطاع الخاص غير الحساسة NCNICC-1:2025",
      kicker: "الهيئة الوطنية للأمن السيبراني · ضوابط القطاع الخاص · الفئتان أ وب",
      h1: "ضوابط NCNICC-1:2025 للشركات الخاصة، بخطوات عملية",
      lead: "تُخضع ضوابط NCNICC-1:2025 الشركات الخاصة غير المصنّفة بنيةً حساسة لضوابط الهيئة الإلزامية لأول مرة: 65 ضابطاً لشركات الفئة أ و26 لشركات الفئة ب. نساعدك على تأكيد فئتك، وإغلاق الفجوات، وإبقاء الأدلة جاهزة.",
      facts: [["65", "ضابطاً للفئة أ: أكثر من 250 موظفاً أو 200 مليون ريال إيرادات"], ["26", "ضابطاً للفئة ب: من 6 إلى 249 موظفاً"], ["الأولى", "مجموعة ضوابط من الهيئة مكتوبة للشركات غير الحساسة"]],
      cardsTitle: "ما الذي تحصل عليه",
      cards: [
        ["تحديد الفئة", "تأكيد هل شركتك من الفئة أ أو الفئة ب أو خارج النطاق، وأي الضوابط تنطبق عليها."],
        ["تقييم الفجوات", "تقييم كل ضابط منطبق مقابل وضعك الحالي، مع تحديد المسؤولين والأولويات."],
        ["معالجة بحجم مناسب", "خطة تناسب شركة خاصة: الضوابط الأهم أولاً، دون أعباء الشركات الكبرى."],
        ["السياسات والإجراءات", "وثائق الحوكمة التي تتطلبها الضوابط، مكتوبة لشركتك ومعتمدة من قيادتها."],
        ["خيار المراقبة", "يغطي مركز عملياتنا المُدار على مدار الساعة ضوابط المراقبة والحوادث دون توظيف فريق داخلي."],
        ["حزمة الأدلة", "إثبات لكل ضابط، منظّم ومحدّث لحين الحاجة إلى عرضه."]
      ],
      stepsTitle: "كيف نرافقك في الرحلة",
      steps: [
        ["التصنيف", "تأكيد فئتك والضوابط المشمولة."],
        ["التقييم", "تقييم كل ضابط بالأدلة."],
        ["التخطيط", "ترتيب الفجوات بحسب الخطورة والجهد."],
        ["المعالجة", "إغلاق الفجوات بأعمال السياسات والتقنية."],
        ["المراقبة", "متابعة مستمرة برصد مُدار عند الحاجة."],
        ["الأدلة", "تنظيم الإثباتات وإبقاؤها محدّثة."]
      ],
      fwTitle: "أطر مرتبطة",
      fw: [["NCNICC-1:2025", "ضوابط شركات القطاع الخاص غير المصنّفة بنيةً حساسة"], ["ECC-2:2024", "الضوابط الأساسية للحكومة والبنى الحساسة"], ["PDPL", "نظام حماية البيانات الشخصية"], ["SAMA CSF", "للشركات الخاضعة لتنظيم البنك المركزي السعودي"]],
      faq: [
        ["ما هي ضوابط NCNICC-1:2025؟", "هي مجموعة ضوابط الأمن السيبراني التي أصدرتها الهيئة لشركات القطاع الخاص غير المصنّفة بنيةً تحتية وطنية حساسة، وهي المرة الأولى التي تُخضع فيها هذه الشركات لضوابط الهيئة الإلزامية."],
        ["هل شركتي من الفئة أ أم الفئة ب؟", "تشمل الفئة أ الشركات التي يزيد عدد موظفيها على 250 أو تتجاوز إيراداتها 200 مليون ريال، وتشمل الفئة ب الشركات التي لديها من 6 إلى 249 موظفاً أو إيرادات بين 3 ملايين و200 مليون ريال. والمنشآت متناهية الصغر خارج النطاق. ويجب التأكد دائماً من النص الرسمي للهيئة."],
        ["ما الفرق بين NCNICC وECC-2؟", "تنطبق ECC-2 على الجهات الحكومية وعلى الجهات التي تملك بنى تحتية حساسة أو تشغّلها أو تستضيفها. أما NCNICC فمجموعة مستقلة وأصغر مكتوبة لبقية الشركات الخاصة."],
        ["هل يستطيع فريق صغير الالتزام بـ NCNICC؟", "نعم. يُظهر تقييم الفجوات ما ينطبق عليك، ويمكن لخدمات مُدارة مثل مركز العمليات على مدار الساعة وعقد الحوكمة تغطية الضوابط دون بناء فريق داخلي."]
      ]
    },
    related: ["ecc-2-compliance", "managed-soc-mdr", "penetration-testing"]
  }
];

export const HOME = {
  en: {
    title: "Cyber HAYKALAH | Managed SOC & Cybersecurity in Saudi Arabia",
    desc: "Saudi managed SOC and MDR: 24/7 detection and response, NCA ECC-2 and SAMA CSF compliance evidence, incident response and penetration testing. Riyadh · Jeddah.",
    ogTitle: "Cyber HAYKALAH · Structured to defend.",
    ogDesc: "A Saudi security operator: the Kingdom's cyber vision, the rules that shape it, and the services we deliver within them."
  },
  ar: {
    title: "سايبر هيكلة | مركز عمليات الأمن السيبراني المُدار في السعودية",
    desc: "مركز عمليات أمن سيبراني مُدار في المملكة: رصد واستجابة على مدار الساعة، وأدلة امتثال لـ ECC-2 وإطار البنك المركزي، واستجابة للحوادث. الرياض · جدة.",
    ogTitle: "سايبر هيكلة · هيكلةٌ تحمي.",
    ogDesc: "مشغّل أمني سعودي: رؤية المملكة السيبرانية، والأنظمة التي تشكّلها، والخدمات التي نقدّمها في إطارها."
  }
};

// Shared UI strings for the landing pages.
export const UI = {
  en: { home: "Home", services: "Services", faq: "Frequently asked questions", related: "Related services", ctaH: "Talk to us about", ctaP: "Tell us about your estate and what you need to evidence. We'll come back with a scoped proposal.", email: "Email us", back: "Back to the main site", hero: "Overview", cards: "What you get", steps: "How it works", fw: "Frameworks", faqN: "FAQ", contact: "Contact", learn: "Learn more", illus: "Indicative. Operating details are agreed per client." },
  ar: { home: "الرئيسية", services: "الخدمات", faq: "الأسئلة الشائعة", related: "خدمات مرتبطة", ctaH: "تحدّث إلينا عن", ctaP: "أخبرنا عن بيئتك التقنية وما تحتاج إلى إثباته، وسنعود إليك بعرض محدد النطاق.", email: "راسلنا", back: "العودة إلى الموقع الرئيسي", hero: "نظرة عامة", cards: "ما الذي تحصل عليه", steps: "كيف نعمل", fw: "الأطر", faqN: "الأسئلة", contact: "تواصل", learn: "تعرّف أكثر", illus: "استرشادي. تُحدَّد تفاصيل التشغيل مع كل عميل." }
};
