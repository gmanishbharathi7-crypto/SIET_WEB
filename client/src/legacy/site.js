
import { allDepartments, departmentCurricula, getDeptCurriculum } from './curriculumData.js';



const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let appRoot;
const icon = (name) => {
  if (name === 'menu') return `<svg class="ui-icon-svg menu-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3.5" y1="6" x2="20.5" y2="6"></line><line x1="3.5" y1="12" x2="20.5" y2="12"></line><line x1="3.5" y1="18" x2="20.5" y2="18"></line></svg>`;
  if (name === 'close') return `<svg class="ui-icon-svg close-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  return `<span class="ui-icon" aria-hidden="true">${({ home: '⌂', users: '♙', book: '▤', grad: '◇', building: '▥', quality: '✓', brief: '▣', compass: '◉', arrow: '→', down: '⌄', trophy: '♛', trend: '↗', gift: '◇', play: '▶', phone: '☎' }[name] || '◆')}</span>`;
};

const pageGroups = [
  { label: 'About', icon: 'users', items: [['vision-mission', 'Vision & Mission'], ['chairman', "From Chairman's Desk"], ['principal', "From Principal's Desk"]] },
  { label: 'Academics', icon: 'book', items: [['academics', 'Academic Overview'], ['departments', 'Departments'], ['curriculum', 'Curriculum'], ['academic-calendar', 'Academic Calendar'], ['library', 'Library']] },

  { label: 'Admissions', icon: 'grad', items: [['programmes', 'UG & PG Programmes'], ['admission-enquiry', 'Admission Enquiry'], ['admission-referral', 'Admission Referral']] },

  { label: 'Admissions', icon: 'grad', items: [['programmes', 'UG & PG Programmes'], ['eligibility', 'Eligibility'], ['scholarships', 'Scholarships'], ['fees', 'Fee Information'], ['admission-enquiry', 'Admission Enquiry']] },

  { label: 'Campus', icon: 'building', items: [['campus-life', 'Campus Life'], ['facilities', 'Facilities'], ['hostel', 'Hostel'], ['transport', 'Transport'], ['sports', 'Sports'], ['clubs', 'Student Clubs'], ['ncc', 'NCC & NSS']] },
  { label: 'Quality & Excellence', icon: 'quality', items: [['centres-of-excellence', 'Centres of Excellence'], ['accreditations', 'NBA & NAAC'], ['examinations', 'Examinations'], ['iqac', 'IQAC']] },
  { label: 'Explore', icon: 'compass', items: [['training', 'Career Development'], ['research', 'Research & Development'], ['innovation', 'Innovation & Incubation'], ['alumni', 'Alumni'], ['contact', 'Contact Us']] }
];
const aboutDesktopMenu = () => `<div class="institution-about-menu"><a href="#/vision-mission">Vision &amp; Mission</a><a href="#/chairman">From Chairman's Desk</a><a href="#/principal">From Principal's Desk</a></div>`;
const aboutMobileMenu = () => `<a href="#/vision-mission" class="mobile-nav-sublink">Vision &amp; Mission</a><a href="#/chairman" class="mobile-nav-sublink">From Chairman's Desk</a><a href="#/principal" class="mobile-nav-sublink">From Principal's Desk</a>`;
const pageCopy = {
  'admission-referral': ['Admission Referral', 'Recommend an aspiring student to Sri Shakthi.', 'Support prospective engineers by connecting them with our admissions team through the institutional referral programme.'],
  academics: ['Academic Overview', 'Knowledge designed for application.', 'Flexible learning, strong fundamentals, laboratories, projects and industry exposure form the core of the Sri Shakthi academic experience.'], departments: ['Departments', 'Ten disciplines. One culture of discovery.', 'Explore engineering and technology departments offering focused learning, laboratories, research and industry engagement.'], curriculum: ['Curriculum', 'Current, connected and outcome-driven.', 'The curriculum combines disciplinary depth, professional skills, multidisciplinary electives, projects and experiential learning.'], 'academic-calendar': ['Academic Calendar', 'Plan the academic year.', 'Semester schedules bring together instruction, assessment, events, examinations and academic milestones.'], library: ['Central Library', 'A connected knowledge centre.', 'Print and digital resources, journals, databases and focused study environments support teaching, learning and research.'], examinations: ['Examinations', 'Clear processes. Fair assessment.', 'The Controller of Examinations coordinates schedules, evaluation, results and academic records for autonomous programmes.'], programmes: ['UG & PG Programmes', 'Choose the field you want to shape.', 'Undergraduate and postgraduate pathways connect engineering foundations with emerging technologies and real-world practice.'], eligibility: ['Eligibility', 'Your pathway to Sri Shakthi.', 'Admission eligibility follows applicable Government of Tamil Nadu, AICTE and Anna University norms.'], scholarships: ['Scholarships', 'Talent deserves opportunity.', 'Merit and need-based scholarship pathways help ambitious learners access high-quality engineering education.'], fees: ['Fee Information', 'Clear guidance for applicants.', 'Contact the admissions office for programme-specific fee structure, counselling and scholarship guidance.'], 'campus-life': ['Campus Life', 'Learn. Build. Belong.', 'A vibrant 45-acre eco-friendly campus brings together academics, culture, sport, entrepreneurship and community.'], facilities: ['Facilities', 'Spaces made for exploration.', 'Advanced laboratories, collaborative classrooms, seminar halls, digital infrastructure and student support facilities.'], hostel: ['Hostel', 'A welcoming campus home.', 'Student residences support safe, comfortable living, shared learning and a strong sense of community.'], transport: ['Transport', 'Connected to Coimbatore.', 'College transport supports convenient travel across major routes in and around the city.'], sports: ['Sports', 'Energy beyond academics.', 'With 26+ activities and a proud competitive record, sport is central to student wellbeing and leadership.'], clubs: ['Student Clubs', 'Find your people. Build your voice.', 'Technical, cultural, social and professional clubs turn interests into projects, events and leadership experience.'], ncc: ['NCC & NSS', 'Unity, discipline and service.', 'Student service programmes develop character, citizenship, teamwork and responsibility.'], placements: ['Placements', 'Preparing talent for meaningful careers.', 'Career readiness spans aptitude, communication, technical training, internships, industry interaction and recruitment.'], training: ['Career Development', 'Skills that move careers forward.', 'Dedicated training helps students build technical confidence, professional communication and placement readiness.'], research: ['Research & Development', 'Ideas engineered into impact.', 'Faculty and students pursue applied research, publications, prototypes, consultancy and interdisciplinary collaboration.'], innovation: ['Innovation & Incubation', 'From problem to prototype.', 'Mentoring, maker culture and entrepreneurial support help student ideas grow into useful solutions and ventures.'], 'centres-of-excellence': ['Centres of Excellence', 'Advanced tools. Industry contexts.', 'Specialist centres connect learners with contemporary platforms, domain expertise and practical challenges.'], accreditations: ['Approvals & Accreditations', 'Quality recognised. Standards sustained.', 'An autonomous institution approved by AICTE, affiliated to Anna University, accredited by NAAC and with eligible programmes accredited by NBA.'], alumni: ['Alumni', 'Shakthians around the world.', 'A growing network of 10,273+ alumni strengthens mentorship, opportunity and lifelong institutional connection.'], iqac: ['IQAC & NAAC', 'Quality as a continuous practice.', 'The Internal Quality Assurance Cell supports evidence-led improvement across academics, governance and student experience.'], contact: ['Contact Us', 'We are here to help.', 'Visit the campus, speak with admissions, or connect with the institute office using the details below.']
};
const programs = [
  ['Agricultural Engineering', 'Smart farming, irrigation, machinery and sustainable food systems.', '/assets/images/category/cat1.jpg'], ['Biomedical Engineering', 'Diagnostic, therapeutic and healthcare technologies.', '/assets/images/category/cat2.jpg'], ['Biotechnology', 'Bioprocessing, molecular science and industrial biotechnology.', '/assets/images/category/cat3.jpg'], ['Civil Engineering', 'Resilient infrastructure, structures and sustainable cities.', '/assets/images/category/cat4.jpg'], ['Computer Science & Engineering', 'Intelligent software, data systems and AI-powered solutions.', '/assets/images/category/cat5.jpg'], ['Electrical & Electronics', 'Power systems, renewable energy and industrial automation.', '/assets/images/category/cat6.jpg'], ['Electronics & Communication', 'Connected systems, embedded design and signal processing.', '/assets/images/category/cat7.jpg'], ['Food Technology', 'Food processing, quality, safety and product development.', '/assets/images/category/cat8.jpg'], ['Information Technology', 'Secure digital products, cloud platforms and networks.', '/assets/images/course/3.jpg'], ['Mechanical Engineering', 'Design, manufacturing, machines and mobility systems.', '/assets/images/course/6.jpg'], ['Artificial Intelligence & Data Science', 'AI, analytics and data-driven engineering.', '/assets/images/course/3.jpg'], ['Artificial Intelligence & Machine Learning', 'Intelligent automation and applied AI.', '/assets/images/category/cat5.jpg'], ['CSE (Cyber Security)', 'Secure computing and resilient networks.', '/assets/images/course/3.jpg'], ['VLSI Design', 'Semiconductor design and embedded systems.', '/assets/images/category/cat7.jpg']
];

function header() {
  return `<div class="notice"><div class="notice-track"><span><b>ADMISSIONS 2026–27 NOW OPEN</b><i></i> Applications are invited for undergraduate and postgraduate engineering programmes <i></i> Begin your journey at Sri Shakthi <i></i> TNEA Counselling Code: 2727</span><span aria-hidden="true"><b>ADMISSIONS 2026–27 NOW OPEN</b><i></i> Applications are invited for undergraduate and postgraduate engineering programmes <i></i> Begin your journey at Sri Shakthi <i></i> TNEA Counselling Code: 2727</span></div></div>
<header class="institution-header-v4 exact-image-header"><div class="institution-header-shell"><a class="siet-header-image" href="#/" aria-label="Sri Shakthi Institute of Engineering and Technology home"><img src="/brand/siet-exact-header.png" alt="Sri Shakthi Institute of Engineering and Technology — NBA accredited, NAAC A grade, counselling code 2727" width="2048" height="256"></a><nav class="institution-navbar" aria-label="Main navigation"><button class="institution-mobile-toggle" aria-label="Open navigation menu" type="button">${icon('menu')}</button><a class="institution-mobile-logo" href="#/" aria-label="Sri Shakthi Home"><img src="/brand/siet-logo.png" alt="Sri Shakthi" class="mobile-logo-img"><span class="mobile-logo-text"><b>SRI SHAKTHI</b><small>Autonomous Institution</small></span></a><a class="institution-home" href="#/" aria-label="Home">${icon('home')}</a><div class="institution-menu">${pageGroups.map((g, i) => `${i === 5 ? '<a class="institution-nav-link" href="#/placements">Placements</a>' : ''}<div class="institution-nav-group"><button type="button">${g.label}${icon('down')}</button><div>${g.items.map(([s, n]) => `<a href="#/${s}">${n}</a>`).join('')}</div></div>`).join('')}<a class="institution-nav-link" href="#/careers">Careers</a></div><a class="institution-nav-apply" href="#/apply">Apply Now ${icon('arrow')}</a></nav></div></header>
<div class="mobile-nav-backdrop"></div>
<aside class="mobile-nav" aria-label="Mobile Navigation"><div class="mobile-nav-header"><a href="#/" class="mobile-nav-brand"><img src="/brand/siet-logo.png" alt="Sri Shakthi"><div><strong>SRI SHAKTHI</strong><small>Autonomous Institution</small></div></a><button class="mobile-nav-close" aria-label="Close menu">${icon('close')}</button></div><div class="mobile-nav-body"><a href="#/" class="mobile-nav-link mobile-nav-home">${icon('home')} Home</a><div class="mobile-nav-accordion">${pageGroups.map((g, i) => `${i === 5 ? '<a class="mobile-nav-link" href="#/placements">Placements</a>' : ''}<div class="mobile-nav-group"><button type="button" class="mobile-nav-group-toggle" aria-expanded="false"><span>${g.label}</span>${icon('down')}</button><div class="mobile-nav-subitems">${g.items.map(([s, n]) => `<a href="#/${s}" class="mobile-nav-sublink">${n}</a>`).join('')}</div></div>`).join('')}<a class="mobile-nav-link" href="#/careers">Careers @ SIET</a></div></div><div class="mobile-nav-footer"><a class="mobile-apply-link" href="#/apply">Apply Now ${icon('arrow')}</a></div></aside>`;
}

function footer() { return `<footer class="site-footer footer-reference"><div class="footer-top"><div class="footer-brand"><a class="mark" href="#/"><img src="/brand/siet-logo.png" alt="Sri Shakthi emblem"><span><b>SRI SHAKTHI</b><small>INSTITUTE OF ENGINEERING AND TECHNOLOGY</small><em>AUTONOMOUS · AFFILIATED TO ANNA UNIVERSITY</em></span></a><p>Powering the youth.<br>Empowering the nation.</p></div><div class="footer-sitemap">${pageGroups.map(g => `<div class="footer-link-group"><b>${g.label}</b>${g.items.map(([s, n]) => `<a href="#/${s}"><span>›</span>${n}</a>`).join('')}</div>`).join('')}</div></div><div class="footer-legal"><small>© ${new Date().getFullYear()} Sri Shakthi Institute of Engineering &amp; Technology. All rights reserved.</small><nav><a href="#/privacy-policy">Privacy Policy</a><i></i><a href="#/terms">Terms of Use</a><i></i><a href="#/sitemap">Sitemap</a></nav></div></footer>` }
const counter = (to, suffix = '') => `<span class="js-counter" data-to="${to}" data-suffix="${suffix}">0${suffix}</span>`;

function homePage() {
  return `<main><section class="placement-stage placement-stage-v2"><div class="placement-v2-hero"><div class="placement-v2-container">
 <div class="placement-v2-copy reveal"><div class="placement-v2-kicker">PLACEMENT EXCELLENCE</div><div class="placement-v2-pill">CLASS OF 2027</div><h1>Powering the Youth.<em>Empowering the Nation.</em></h1><p>Focused training, industry-led preparation and a strong placement ecosystem that transforms engineering potential into meaningful careers.</p><div class="placement-v2-actions"><button type="button" class="placement-v2-btn primary js-scroll-programmes">Explore placements ${icon('arrow')}</button><button class="placement-v2-btn secondary js-video">${icon('play')} Watch placement journey</button></div></div>
 <div class="placement-v2-panel reveal"><div class="placement-v2-panel-head">2026–27 PLACEMENT HIGHLIGHTS (TILL 31ST JULY 2026)</div><div class="placement-v2-highest"><span>${icon('trophy')}</span><div><small>HIGHEST PLACED PACKAGE</small><strong>₹${counter(33)} LPA</strong></div><i></i><div class="placement-v2-record"><large>PLACEMENT RECORD</large><strong>CLASS OF 2027</strong></div></div><div class="placement-v2-stats">${[[16, '₹10 LPA+', 'gift'], [37, '₹8 LPA+', 'trend'], [82, '₹5.5 LPA+', 'brief']].map(([n, p, i]) => `<article><span class="placement-v2-icon">${icon(i)}</span><strong>${counter(n, n === 82 ? '+' : '')}</strong><h3>Students Placed</h3><i></i><b>${p}</b></article>`).join('')}</div></div>
</div></div></section>
<section class="about-premium"><div class="about-container"><div class="about-label reveal"><span>01</span><p>WHO WE ARE</p></div><div class="about-main"><div class="about-heading reveal"><h2>A campus where <span class="highlight-word">curiosity</span> becomes <span>capability.</span></h2></div><div class="about-content reveal"><span class="about-small-title">OUR PURPOSE</span><p>Sri Shakthi Institute of Engineering and Technology is an autonomous institution in Coimbatore, approved by AICTE and affiliated to Anna University.</p><p>Our industry-driven ecosystem brings engineering out of textbooks and into the real world.</p><button type="button" class="discover-link js-discover-btn">Discover our vision ${icon('arrow')}</button></div></div><div class="stats-grid">${[[4263, 'Job offers', 'Last 5 Years'], [657, 'Offers in 2026', 'Growing Every Year'], [10273, 'Alumni Worldwide', 'Connected Globally'], [4452, 'Students on Campus', 'Learning & Innovating']].map(([n, t, s], i) => `<article class="stat-box reveal"><span class="stat-index">0${i + 1}</span><h3>${counter(n, '+')}</h3><p>${t}</p><span class="stat-subtitle">${s}</span></article>`).join('')}</div></div></section>
<section class="programmes-showcase programmes-section"><div class="programmes-container"><div class="section-kicker"><span>02</span><i></i><span>FIND YOUR FIELD</span></div><div class="programmes-hero reveal"><div class="programmes-heading"><h2>Programmes built for a <em>changing</em> world.</h2></div><div class="programmes-info"><p>Foundational rigour, advanced technology labs, industry collaboration and project-led learning.</p><div class="programme-toggle"><button class="toggle-btn active" data-level="UG">UG Programmes</button><button class="toggle-btn" data-level="PG">PG Programmes</button></div></div></div><div class="programme-area"><div class="programme-header"><div><small>EXPLORE</small><h3><span id="level-name">UG</span> Programmes</h3></div></div><div id="programme-grid" class="programme-grid">${programmeCards(programs)}</div></div></div></section>
<section class="campus-section"><div class="campus-container"><aside class="campus-left reveal"><div class="section-kicker"><span>03</span><i></i><span>LIFE AT SRI SHAKTHI</span></div><h1>Campus Moments.<em>Student stories.</em></h1><p>Explore learning, innovation, celebrations and everyday campus experiences from the Sri Shakthi community.</p><button type="button" class="button js-explore-campus">Explore campus ${icon('arrow')}</button></aside><main class="campus-content"><div class="campus-gallery">${[['placements.png', 'A campus that inspires every day.'], ['student-life.png', 'Victory is a habit here.'], ['cultural.png', 'Culture. Tradition. Every performance.'], ['innovation.png', 'Ideas that create impact.']].map(([img, t]) => `<div class="gallery-card reveal" role="button" tabindex="0"><img src="/brand/campus-life/${img}" alt="${t}"><div class="gallery-content"><h3>${t}</h3><span>→</span></div></div>`).join('')}</div></main></div></section></main>`
}

function programmeCards(list) { return list.map(([n, d]) => `<div class="programme-card programme-card-simple reveal" role="button" tabindex="0"><span class="programme-icon">◆</span><h4>${n}</h4><span class="arrow-btn">→</span></div>`).join('') }
const slugify = s => s.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and').replaceAll('/', '-');
const vmIcon = (name) => ({
  eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/></svg>',
  target: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.2"/><path d="m15.5 8.5 5-5M16 3.5h4.5V8"/></svg>',
  spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></svg>',
  compass: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.8 8.2-2.3 5.3-5.3 2.3 2.3-5.3 5.3-2.3Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
  education: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12.2V16c2.5 2.5 7.5 2.5 10 0v-3.8M21 10v6"/></svg>'
}[name] || '');

function sietPageHeader(title, subtitle = '', kicker = 'SRI SHAKTHI') { return `<section class="page-hero"><img class="page-crest" src="/brand/siet-logo.png" alt="Sri Shakthi emblem"><div class="eyebrow"><span></span> ${kicker}</div><h1 class="reveal">${title.toUpperCase()}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}</section>` }
function sietHudHeader(title, breadcrumbName = title) {
  return `<section class="department-detail-header siet-hud-header">
    <div class="department-detail-title">
      <div class="hud-title-group">
        <span class="hud-diamond" aria-hidden="true">◈</span>
        <h1>${title.toUpperCase()}</h1>
      </div>
      <div class="department-breadcrumb">
        <a href="#/">Home</a><span>/</span><a href="#/departments">Departments</a><span>/</span><b>${breadcrumbName}</b>
      </div>
    </div>
  </section>`;
}
function AboutHero() { return sietPageHeader('Vision & Mission', 'Shaping capable engineers through an enduring commitment to education, innovation, research and excellence.', 'SRI SHAKTHI &bull; ABOUT US') }
function AboutSidebar(active = 'vision-mission') { const links = [['vision-mission', 'Vision & Mission', 'eye'], ['program-outcomes', 'Program Outcomes', 'target'], ['core-values', 'Core Values', 'spark'], ['philosophy', 'Philosophy', 'compass']]; return `<aside class="siet-vm-sidebar reveal"><div class="siet-vm-sidebar-head"><span>VISION &amp; MISSION</span><h2>Explore our<br>foundation.</h2></div><nav aria-label="Vision and Mission navigation">${links.map(([slug, label, iconName]) => `<a class="${slug === active ? 'is-active' : ''}" href="#/${slug}" ${slug === active ? 'aria-current="page"' : `aria-label="Visit ${label}"`}><span class="siet-vm-nav-icon">${vmIcon(iconName)}</span><b>${label}</b><span class="siet-vm-nav-arrow">${vmIcon('arrow')}</span></a>`).join('')}</nav><div class="siet-vm-sidebar-note"><span>EST. 2006</span><p>Learning with purpose. Leading with impact.</p></div></aside>` }
function VisionCard() { return `<article class="siet-vm-card siet-vm-card-vision reveal"><div class="siet-vm-card-pattern"></div><div class="siet-vm-card-top"><span class="siet-vm-card-icon">${vmIcon('eye')}</span><span class="siet-vm-card-number">01 / VISION</span></div><div class="siet-vm-card-copy"><p class="siet-vm-card-label">OUR VISION</p><h2>Engineering a future without limits.</h2><p>To make the institution one of our nation's great engineering schools, recognized nationally and internationally for excellence in teaching, research and public service. We seek to be the preferred destination for students, practitioners seeking an engineering education, employers hiring engineering graduates and organizations seeking engineering knowledge.</p></div><div class="siet-vm-card-footer"><span>Nationally rooted. Globally respected.</span><i></i></div></article>` }
function MissionCard() { return `<article class="siet-vm-card siet-vm-card-mission reveal"><div class="siet-vm-mission-lines"></div><div class="siet-vm-card-top"><span class="siet-vm-card-icon">${vmIcon('education')}</span><span class="siet-vm-card-number">02 / MISSION</span></div><div class="siet-vm-card-copy"><p class="siet-vm-card-label">OUR MISSION</p><h2>Inspiring minds to solve what matters.</h2><p>To provide an encouraging environment to develop the intellectual capacity, critical thinking, creativity and problem solving ability of the students.</p></div><div class="siet-vm-card-footer"><span>Curiosity into capability.</span><i></i></div></article>` }
function visionPage() { return `<main class="siet-vm-page">${AboutHero()}<section class="siet-vm-content"><div class="siet-vm-shell siet-vm-layout">${AboutSidebar()}<div class="siet-vm-main"><div class="siet-vm-section-intro reveal"><p>WHAT GUIDES US</p><h2>Purpose, made <em>practical.</em></h2><span>Our vision sets the horizon. Our mission shapes the everyday learning experience that carries students towards it.</span></div><div class="siet-vm-card-grid">${VisionCard()}${MissionCard()}</div></div></div></section></main>` }
const programmeOutcomes = [
  ['PO 01', 'Engineering knowledge', 'Apply mathematics, science and engineering fundamentals to solve complex engineering problems.'],
  ['PO 02', 'Problem analysis', 'Identify, formulate, review research literature and analyse complex engineering problems.'],
  ['PO 03', 'Design & development', 'Design solutions for complex problems with appropriate consideration for public health and safety.'],
  ['PO 04', 'Investigation', 'Use research-based knowledge, methods and data analysis to reach valid conclusions.'],
  ['PO 05', 'Modern tool usage', 'Select and apply appropriate techniques, resources and modern engineering tools.'],
  ['PO 06', 'Engineer & society', 'Assess societal, health, safety, legal and cultural responsibilities in engineering practice.'],
  ['PO 07', 'Environment & sustainability', 'Understand and evaluate the impact of engineering solutions in environmental contexts.'],
  ['PO 08', 'Ethics', 'Apply ethical principles and commit to professional responsibilities and norms.'],
  ['PO 09', 'Individual & team work', 'Function effectively as an individual and as a member or leader in diverse teams.'],
  ['PO 10', 'Communication', 'Communicate engineering activities effectively with the engineering community and society.'],
  ['PO 11', 'Project management & finance', 'Apply engineering and management principles to manage projects in multidisciplinary environments.'],
  ['PO 12', 'Life-long learning', 'Recognise the need for and engage in independent, life-long learning in a changing world.']
];
function programOutcomesPage() { return `<main class="siet-vm-page siet-po-page">${sietPageHeader('Program Outcomes', 'Building engineering graduates with the knowledge, mindset and responsibility to create meaningful impact.', 'SRI SHAKTHI &bull; PROGRAM OUTCOMES')}<section class="siet-vm-content"><div class="siet-vm-shell siet-vm-layout">${AboutSidebar('program-outcomes')}<div class="siet-vm-main"><div class="siet-vm-section-intro reveal"><p>THE SIET GRADUATE</p><h2>Ready to think.<br><em>Ready to build.</em></h2><span>Our programme outcomes define the capabilities every SIET graduate develops through rigorous learning, real-world practice and a commitment to responsible innovation.</span></div><div class="siet-po-grid">${programmeOutcomes.map(([number, title, copy], index) => `<article class="siet-po-card reveal"><span class="siet-po-index">${String(index + 1).padStart(2, '0')}</span><span class="siet-po-code">${number}</span><span class="siet-po-icon">${vmIcon(index % 3 === 0 ? 'target' : index % 3 === 1 ? 'spark' : 'compass')}</span><h3>${title}</h3><p>${copy}</p><span class="siet-po-line"></span></article>`).join('')}</div></div></div></section></main>` }
const coreValues = [
  ['01', 'Excellence', 'We pursue high standards in learning, research and every contribution we make.', 'target'],
  ['02', 'Integrity', 'We act with honesty, accountability and respect in every decision and relationship.', 'compass'],
  ['03', 'Innovation', 'We nurture curiosity and the courage to turn ideas into meaningful solutions.', 'spark'],
  ['04', 'Inclusivity', 'We create a welcoming community where every learner can contribute and thrive.', 'eye'],
  ['05', 'Collaboration', 'We grow through shared knowledge, multidisciplinary teamwork and industry connection.', 'education'],
  ['06', 'Social responsibility', 'We use engineering knowledge to serve people, society and the planet.', 'target']
];
function coreValuesPage() { return `<main class="siet-vm-page siet-cv-page">${sietPageHeader('Core Values', 'The shared principles that guide how we learn, lead, innovate and contribute to the world around us.', 'SRI SHAKTHI &bull; CORE VALUES')}<section class="siet-vm-content"><div class="siet-vm-shell siet-vm-layout">${AboutSidebar('core-values')}<div class="siet-vm-main"><div class="siet-vm-section-intro reveal"><p>OUR COMMON COMPASS</p><h2>Values that shape<br><em>every possibility.</em></h2><span>At SIET, technical mastery is strengthened by character. These values create an environment where ambition is grounded in purpose.</span></div><div class="siet-cv-grid">${coreValues.map(([number, title, copy, iconName]) => `<article class="siet-cv-card reveal"><span class="siet-cv-number">${number}</span><span class="siet-cv-icon">${vmIcon(iconName)}</span><h3>${title}</h3><p>${copy}</p><span class="siet-cv-corner"></span></article>`).join('')}</div></div></div></section></main>` }
function philosophyPage() { const principles = [['Learn by doing', 'Learning becomes lasting when ideas are tested, made and improved through purposeful practice.', '01'], ['Think beyond disciplines', 'The most valuable solutions emerge when engineering connects with people, society and the wider world.', '02'], ['Grow with responsibility', 'Knowledge carries purpose. We prepare students to use it ethically, sustainably and for public good.', '03']]; return `<main class="siet-vm-page siet-ph-page">${sietPageHeader('Institutional Philosophy', 'An education that builds confident thinkers, capable creators and responsible citizens for a changing world.', 'SRI SHAKTHI &bull; PHILOSOPHY')}<section class="siet-vm-content"><div class="siet-vm-shell siet-vm-layout">${AboutSidebar('philosophy')}<div class="siet-vm-main"><article class="siet-ph-statement reveal"><span class="siet-ph-quote">“</span><p>We believe education should do more than prepare students for a profession. It should inspire them to question, create, collaborate and use their capabilities to make a meaningful difference.</p><span class="siet-ph-mark"><i></i> SRI SHAKTHI PHILOSOPHY</span></article><div class="siet-ph-principles">${principles.map(([title, copy, number], index) => `<article class="siet-ph-principle reveal"><span class="siet-ph-principle-no">${number}</span><span class="siet-ph-principle-icon">${vmIcon(index === 0 ? 'education' : index === 1 ? 'spark' : 'compass')}</span><div><h3>${title}</h3><p>${copy}</p></div></article>`).join('')}</div><div class="siet-ph-closing reveal"><div><p>OUR PROMISE</p><h2>Knowledge in action.<br><em>Character in leadership.</em></h2></div><span>Every SIET experience is designed to turn potential into a positive force for the future.</span></div></div></div></section></main>` }
function chairmanPage() { return `<main class="siet-cd-page"><section class="siet-cd-hero"><div class="siet-cd-grid"></div><div class="siet-cd-hero-glow"></div><div class="siet-cd-shell"><div class="siet-cd-breadcrumb"><a href="#/">Home</a><span>/</span><span>About Us</span><span>/</span><b>Chairman’s Desk</b></div><div class="siet-cd-hero-layout"><div class="siet-cd-portrait reveal"><div class="siet-cd-portrait-ring"></div><img src="/brand/chairman-transparent.png" alt="Dr. S. Thangavelu, Chairman"><div class="siet-cd-name"><strong>Dr. S. Thangavelu</strong><span>Chairman</span><small>Sri Shakthi Group of Institutions</small></div></div><div class="siet-cd-hero-copy reveal"><p class="siet-cd-kicker"><i></i> A MESSAGE FROM THE CHAIRMAN</p><h1>A dream built on <em>equality, excellence</em> and service.</h1><p>Building an institution where every student is encouraged to learn deeply, think boldly and contribute meaningfully.</p><a href="#chairman-message" class="siet-cd-scroll">Read the message <span>${vmIcon('arrow')}</span></a></div></div></div></section><section id="chairman-message" class="siet-cd-content"><div class="siet-cd-shell siet-cd-layout">${AboutSidebar('chairman')}<article class="siet-cd-message"><div class="siet-cd-message-head reveal"><p>CHAIRMAN’S MESSAGE</p><h2>Education that empowers<br><em>each individual.</em></h2></div><div class="siet-cd-prose reveal"><p>I have always been inspired by Dr. Martin Luther King's statement, ‘I have a dream’ — a dream I believe will come true — a dream that my children will one day live in a world where they will not be judged by the colour of their skin, but by the content of their character. This need for tolerance — to create an equal society with no discrimination in caste, creed or colour — was best exemplified in the words of Mahatma Gandhi.</p><blockquote>“I do not want my institution to be walled off on all sides. I want the culture of all lands to be blown about my institution as freely as possible. But I refuse to be blown off by any one of them.”</blockquote><p>And this I believe will be the watchword of each and every Shakthian.</p><p>The vision for Sri Shakthi is to make the institution one of our nation's great engineering schools, recognized nationally and internationally for excellence in teaching, research and public service. We seek to be the preferred destination for students, practitioners seeking an engineering education, employers hiring engineering graduates and organizations seeking engineering knowledge.</p><div class="siet-cd-signoff"><span></span><div><strong>Dr. S. Thangavelu</strong><small>Chairman, Sri Shakthi Group of Institutions</small></div></div></div></article></div></section></main>` }
function principalPage() { return `<main class="chairman-page principal-page"><section class="chairman-content"><aside class="chairman-portrait reveal"><img src="/brand/principal-saravana-kumar.png" alt="Principal"><h2>Dr. N. M. Saravana Kumar</h2><b>Principal, SIET</b></aside><article class="chairman-message reveal"><small>FROM THE PRINCIPAL'S DESK</small><h1>Learning that moves beyond the classroom.</h1><p>Welcome to our institution, where excellence in education, innovation, and character development form the foundation of our academic journey.</p><p>We provide a vibrant learning environment that empowers students with knowledge, technical expertise and essential life skills. Our faculty continuously strive to deliver quality education through innovative teaching, industry collaboration, research and experiential learning.</p><blockquote>We prepare graduates to become competent professionals, responsible citizens and future leaders.</blockquote><strong>Dr. N. M. Saravana Kumar, M.E., Ph.D.<br>Principal, SIET</strong></article></section></main>` }

const departmentDetails = { 'Agricultural Engineering': { courses: [['B.E - Agricultural Engineering', '60'], ['M.Tech - Farm Machinery', '18']], overview: 'The department of Agricultural Engineering was started in Sri Shakthi Institute of Engineering and Technology (SSIET), Coimbatore, in 2015. The Chairman, Dr. S Thangavelu, is himself an Agricultural Engineer and a Ph. D. degree holder in Bio Energy from Tamil Nadu Agricultural University (TNAU), Coimbatore, and worked as a faculty for 28 years in TNAU. During the past years, the department has been in the journey with SSIET to fulfil the motto, “Powering the Youth, Empowering the Nation”. The department offers B. E. Agriculture Engineering, focussing on widening the practical knowledge of the students thus encouraging them to solve different practical difficulties in small-landholdings. Well-qualified faculty members are the strength of the department. The department constitutes experienced and dedicated faculty and supporting staff members with excellent academic research and industrial work experience to promote research and intervention in the existing methods. Presently, the faculty consists of experts from farm machinery and power, soil and water conservation engineering, agricultural processing, civil engineering, mechanical engineering, food technology and agriculture. Further, the practical knowledge gained by them during practical field works and industrial visits has been added advantage for new technology and innovations. The department is new in offering the degree program in the institute. Despite, about 30 students have been graduated during 2019 from the department and are well placed. At present there are 375 students are admitted in the degree program, and the department is envisage more students in the future.' }, default: { courses: [], overview: 'The department combines strong academic foundations with practical laboratory learning, industry exposure, project work and research. Experienced faculty members guide students to solve real-world engineering problems and build careers for a changing world.' } };
programs.forEach(([name, description]) => { if (!departmentDetails[name]) departmentDetails[name] = { courses: [['B.E - ' + name, '60']], overview: 'The ' + name + ' department at Sri Shakthi Institute of Engineering and Technology develops practical expertise through laboratory learning, industry exposure, projects and research. ' + description } });
function departmentPage(dept) {
  const detail = departmentDetails[dept] || departmentDetails.default;
  const courses = detail.courses.length ? detail.courses : [['B.E - ' + dept, '60']];
  const sections = ['About the Department', 'Why ' + dept + ' at SIET', 'Unique Facilities', 'Vision & Mission', 'Programme Educational Objectives', 'Programme Specific Outcomes', 'Programme Outcomes', 'Faculty Profile', 'PAC Members', 'Academic Calendar', 'Achievements', 'Curriculum', 'Placements-Key Companies', 'Student Placements', 'Newsletter & Magazine', 'Alumni Corner', 'Feedback'];
  const overviewSub = detail.overview ? (detail.overview.length > 115 ? detail.overview.slice(0, 112) + '…' : detail.overview) : `Excellence in education, research and innovation in ${dept}.`;
  const deptCurriculum = getDeptCurriculum(dept);
  return `<main class="department-detail-page">${sietHudHeader(dept, dept)}<div class="department-detail-layout"><aside class="department-detail-nav" aria-label="Department sections">${sections.map((section, index) => `<button class="${index === 0 ? 'active' : ''}" type="button" data-section="department-section-${index}">${section}</button>`).join('')}</aside><article class="department-detail-content"><div class="department-intake"><table><thead><tr><th>Courses Offered</th><th>Intake</th></tr></thead><tbody>${courses.map(([course, intake]) => `<tr><td>${course}</td><td>${intake}</td></tr>`).join('')}</tbody></table></div><section id="department-section-0" class="department-copy is-open"><h2>About the Department</h2><p>${detail.overview}</p></section>${sections.slice(1).map((section, index) => section === 'Curriculum' ? `<section id="department-section-${index + 1}" class="department-copy department-curriculum-section"><h2>Curriculum</h2><div class="dept-curriculum-banner"><div><span class="curr-badge">AUTONOMOUS R2024</span><h2>${dept} Curriculum Structure</h2><p>Explore the full 8-semester course curriculum, subject codes, lecture/practical hours and credits designed for ${dept}.</p></div><a href="#/curriculum?dept=${deptCurriculum.id}" class="dept-curriculum-action">Open Full 8-Semester Interactive Curriculum →</a></div><div class="curr-table-wrapper">${renderCurriculumTable(deptCurriculum.id, 1)}</div></section>` : `<section id="department-section-${index + 1}" class="department-copy department-placeholder"><h2>${section}</h2><p>${section} information for ${dept} will be updated by the department office.</p></section>`).join('')}</article></div></main>`
}
function internalPage(route) {
  const dept = route.startsWith('department/') ? titleCase(route.slice(11).replaceAll('-', ' ')).replaceAll(' And ', ' & ') : '';
  if (dept) return departmentPage(dept);
  const data = pageCopy[route] || ['Sri Shakthi', 'Institutional information', 'Explore Sri Shakthi Institute of Engineering and Technology.'];
  const isDepts = route === 'departments';
  const headerHtml = isDepts
    ? sietHudHeader('Departments', 'Departments')
    : sietPageHeader(data[0], data[1]);
  return `<main class="internal-page ${isDepts ? 'departments-index-page' : ''}">${headerHtml}<section class="page-content"><div class="reveal"><div class="section-no">OVERVIEW</div><h2>${data[1]}</h2><p>${data[2]}</p>${route === 'contact' ? '<div class="contact-panel"><b>Sri Shakthi Institute of Engineering & Technology</b><p>Sri Shakthi Nagar, L&T By-Pass, Chinniyampalayam, Coimbatore – 641062</p><p>+91 422 2369900 · info@siet.ac.in</p></div>' : ''}<a class="button" href="#/admission-enquiry">Enquire now ${icon('arrow')}</a></div></section>${['departments', 'programmes'].includes(route) ? `<section class="page-content programme-content"><div class="section-no">PROGRAMMES &amp; DEPARTMENTS</div><div>${programs.map(([n, d, img]) => `<a class="flip-card" href="#/department/${slugify(n)}"><span class="flip-card-inner"><span class="flip-front"><small>DEPARTMENT</small><b>${n}</b><p>${d}</p><span>Explore department →</span></span><span class="flip-back" style="background-image:linear-gradient(180deg,transparent,rgba(3,45,27,.94)),url('${img}')"><b>${n}</b></span></span></a>`).join('')}</div></section>` : ''}</main>`
}
const titleCase = s => s.replace(/\b\w/g, c => c.toUpperCase());

function enquiryPage(apply = false) { return `<main class="enquiry-page-v3">${sietPageHeader(apply ? 'Apply for Sri Shakthi' : 'Admission Enquiry', 'Share your interests and contact details. Our admissions team will guide you in choosing the right programme.', apply ? 'SRI SHAKTHI &bull; APPLY NOW' : 'SRI SHAKTHI &bull; ADMISSION ENQUIRY')}<section class="enquiry-main-v3"><div class="enquiry-heading-v3"><small>ENQUIRY FORM</small><h1>START YOUR ENGINEERING JOURNEY WITH SIET</h1></div><form class="enquiry-form-v3 js-form"><div class="enquiry-fields-v3">${field('Full Name', 'name', 'text', 'Enter your full name')}${field('Mobile Number', 'phone', 'tel', 'Enter 10 digit mobile number')}${field('Email Address', 'email', 'email', 'Enter your email address')}${selectField('Course Level', 'level', ['UG', 'PG'])}${selectField('Preferred Department', 'course', programs.map(p => p[0]))}${field('Academic Qualification / Marks', 'qualification', 'text', 'Qualification and marks')}</div><label>Message / Any Specific Query <b>*</b><textarea name="message" rows="4" required minlength="10"></textarea></label><button class="button" type="submit">${apply ? 'Submit Application' : 'Send Enquiry'} →</button><p class="status" aria-live="polite"></p></form></section></main>` }
function referralPage() { return `<main class="enquiry-page-v3 referral-page">${sietPageHeader('Admission Referral', 'Recommend an aspiring student for admissions to Sri Shakthi Institute of Engineering & Technology.', 'SRI SHAKTHI &bull; REFERRAL PROGRAMME')}<section class="enquiry-main-v3"><div class="enquiry-heading-v3"><small>REFERRAL PROGRAMME</small><h1>STUDENT ADMISSION REFERRAL</h1><p style="color:#52695c;margin-top:6px;font-size:15px;line-height:1.5">Alumni, students, parents, faculty, and well-wishers can refer candidates for undergraduate and postgraduate engineering admissions.</p></div><form class="enquiry-form-v3 js-form"><div style="font-weight:700;color:#0b3d20;font-size:15px;border-bottom:2px solid #e0ece4;padding-bottom:8px;margin-bottom:14px;letter-spacing:0.02em">REFERRER DETAILS (YOUR INFORMATION)</div><div class="enquiry-fields-v3">${field('Your Full Name', 'referrer_name', 'text', 'Enter your full name')}${field('Your Mobile Number', 'referrer_phone', 'tel', 'Enter your 10 digit mobile number')}${field('Your Email Address', 'referrer_email', 'email', 'Enter your email address')}${selectField('Your Relationship with SIET', 'referrer_relation', ['Alumni', 'Current Student', 'Faculty / Staff', 'Parent', 'Industry Partner', 'Well-wisher'])}</div><div style="font-weight:700;color:#0b3d20;font-size:15px;border-bottom:2px solid #e0ece4;padding-bottom:8px;margin-top:18px;margin-bottom:14px;letter-spacing:0.02em">CANDIDATE DETAILS (STUDENT BEING REFERRED)</div><div class="enquiry-fields-v3">${field('Candidate Full Name', 'candidate_name', 'text', 'Enter candidate\'s full name')}${field('Candidate Mobile Number', 'candidate_phone', 'tel', 'Enter candidate\'s 10 digit mobile number')}${field('Candidate Email Address', 'candidate_email', 'email', 'Enter candidate\'s email')} ${selectField('Preferred Course Level', 'candidate_level', ['UG', 'PG'])}${selectField('Preferred Department', 'candidate_course', programs.map(p => p[0]))}${field('Current Qualification / School', 'candidate_qualification', 'text', 'Class 12 / Diploma / Degree')}</div><label>Message / Reason for Referral<textarea name="remarks" rows="3" placeholder="Tell us about the candidate's achievements, interests, or any specific guidance needed..."></textarea></label><button class="button" type="submit">Submit Referral →</button><p class="status" aria-live="polite"></p></form></section></main>` }
const field = (label, name, type, placeholder) => `<label>${label} <b>*</b><input type="${type}" name="${name}" placeholder="${placeholder}" required></label>`;
const selectField = (label, name, opts) => `<label>${label} <b>*</b><select name="${name}" required><option value="">Select ${label}</option>${opts.map(o => `<option>${o}</option>`).join('')}</select></label>`;
function careersPage() { const cats = [['Leadership Positions', ['Principal / Dean', 'Head of Department', 'Academic Administrator']], ['College Teaching Positions', ['Professor', 'Associate Professor', 'Assistant Professor']], ['School Teaching Positions', ['PGT / TGT Teachers', 'Primary Teachers', 'Academic Coordinators']], ['Food Testing Lab', ['Food Analyst', 'Laboratory Technician', 'Quality Manager']], ['Career Oriented Specialists', ['Aptitude Trainer', 'Programming Trainer', 'Machine Learning Trainer']], ['Managerial Positions', ['HR and Administration', 'Admissions and Outreach']], ['Creative Positions', ['Content and Communications', 'Graphic Designer']]]; return `<main class="careers-page">${sietPageHeader('Faculty Recruitment', 'Join a community of educators, researchers and professionals committed to powering the youth and empowering the nation.', 'SRI SHAKTHI &bull; CAREERS')}<section class="career-main"><div class="career-tabs"><button class="active">Engineering College</button><button>CBSE School</button><button>Food Testing Lab</button></div><div class="career-intro"><img src="/brand/siet-logo.png" alt=""><div><small>AUTONOMOUS INSTITUTION</small><h2>Sri Shakthi Institute of Engineering and Technology</h2><p>We invite passionate educators, researchers and industry professionals to join an institution focused on applied research, innovation and industry-relevant engineering education.</p></div></div><div class="career-application-layout"><form class="career-form js-form"><div class="career-form-head"><small>APPLICATION FORM</small><h2>Faculty &amp; Professional Recruitment</h2></div><div class="career-fields">${field('Full Name', 'name', 'text', 'Enter your full name')}${field('Mobile Number', 'phone', 'tel', 'Enter mobile number')}${field('Email Address', 'email', 'email', 'Enter email')}${selectField('Application Category', 'category', cats.map(c => c[0]))}${field('Position', 'position', 'text', 'Position you would like to apply')}${field('Highest Qualification', 'qualification', 'text', 'Enter highest degree')}<label class="career-wide">Why are you looking for a change?<textarea name="message" rows="4"></textarea></label><label class="career-wide career-file">Upload Resume <b>*</b><input type="file" name="resume" accept=".pdf,.doc,.docx,.rtf" required></label></div><button class="career-submit">Submit Application →</button><p class="status"></p></form><aside class="career-categories"><div class="career-side-title"><small>EXPLORE OPENINGS</small><h2>Application Categories</h2></div>${cats.map((c, i) => `<details ${i === 0 ? 'open' : ''}><summary>${c[0]} ${icon('down')}</summary><div>${c[1].map(r => `<span>→ ${r}</span>`).join('')}</div></details>`).join('')}<div class="career-contact"><small>RECRUITMENT QUERIES</small><h3>Let’s build the future together.</h3><a href="mailto:careers@siet.ac.in">careers@siet.ac.in</a></div></aside></div></section></main>` }

const libIcons = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
  monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  research: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
  document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`
};

const libModalData = {
  catalogue: {
    title: 'Online Public Access Catalogue (OPAC)',
    content: `
      <p>Search and explore over <b>45,000+ print volumes</b>, <b>12,000+ distinct titles</b>, project theses, and reference volumes indexed through the automated KOHA library system.</p>
      <h4>Catalogue Search Categories</h4>
      <ul>
        <li><span class="siet-lib-resource-badge">Engineering</span> Computer Science, AI &amp; Data Science, Cybersecurity, VLSI &amp; Embedded Systems</li>
        <li><span class="siet-lib-resource-badge">Emerging Tech</span> Biomedical Engineering, Biotechnology, Food Technology &amp; Agricultural Engg</li>
        <li><span class="siet-lib-resource-badge">Core Disciplines</span> Mechanical, Civil, Electrical &amp; Electronics Engineering</li>
        <li><span class="siet-lib-resource-badge">Reference Works</span> International Standard Codes, Handbooks, Technical Dictionaries, Encyclopedias</li>
      </ul>
      <h4>How to Reserve &amp; Borrow</h4>
      <p>Students and faculty can check stack availability in real time and place holds using their SIET Smart ID card number at the circulation desk.</p>
    `
  },
  journals: {
    title: 'E-Journals & Online Databases',
    content: `
      <p>The Central Library subscribes to leading peer-reviewed digital libraries and indexing networks with seamless campus-wide IP-based access:</p>
      <table>
        <thead>
          <tr><th>Resource</th><th>Coverage</th><th>Access Mode</th></tr>
        </thead>
        <tbody>
          <tr><td><b>IEEE Xplore (ASPP)</b></td><td>Electronics, Electrical, AI, CS &amp; Communications</td><td>Campus IP + Remote VPN</td></tr>
          <tr><td><b>ScienceDirect (Elsevier)</b></td><td>Applied Sciences, Material Engineering &amp; Computing</td><td>Campus IP</td></tr>
          <tr><td><b>SpringerLink</b></td><td>1,700+ Peer-Reviewed Journals &amp; Technical Series</td><td>IP / Institutional SSO</td></tr>
          <tr><td><b>DELNET</b></td><td>3 Crore+ Inter-Library Union Catalogues &amp; Interloans</td><td>Institutional Membership</td></tr>
          <tr><td><b>NPTEL / SWAYAM</b></td><td>Video Lectures, Course Materials &amp; Certifications</td><td>Open Campus Hub</td></tr>
          <tr><td><b>National Digital Library (NDLI)</b></td><td>E-Textbooks, Monographs, Lab Simulations &amp; Papers</td><td>Registered Account</td></tr>
        </tbody>
      </table>
      <p>For off-campus login credentials or research publication download assistance, contact <a href="mailto:library@siet.ac.in">library@siet.ac.in</a>.</p>
    `
  },
  rules: {
    title: 'Library Rules & Regulations',
    content: `
      <h4>Working Hours</h4>
      <ul>
        <li><b>Monday to Saturday:</b> 8:00 AM – 8:00 PM (Issue &amp; Return: 8:30 AM – 6:30 PM)</li>
        <li><b>Sundays &amp; Holidays:</b> 9:00 AM – 4:00 PM (Reading Room &amp; Digital Lab)</li>
        <li><b>Exam Season:</b> Extended timings till 10:00 PM</li>
      </ul>
      <h4>Borrowing Entitlements</h4>
      <table>
        <thead><tr><th>User Category</th><th>Book Limit</th><th>Loan Period</th></tr></thead>
        <tbody>
          <tr><td>Undergraduate Students (B.E / B.Tech)</td><td>4 Books</td><td>14 Days</td></tr>
          <tr><td>Postgraduate Students (M.E / M.Tech)</td><td>6 Books</td><td>28 Days</td></tr>
          <tr><td>Faculty &amp; Research Scholars</td><td>8 Books</td><td>90 Days</td></tr>
        </tbody>
      </table>
      <h4>Code of Conduct</h4>
      <ul>
        <li>Strict silence must be maintained in all reading and reference halls.</li>
        <li>Institutional Smart ID card is mandatory for entry registration and library transactions.</li>
        <li>Mobile phones must be kept in silent mode; calls are strictly prohibited inside the library.</li>
        <li>Books must be handled with utmost care. Highlighting, pencil markings, or folding pages is prohibited.</li>
      </ul>
    `
  },
  arrivals: {
    title: 'New Arrivals — 2026 Academic Year',
    content: `
      <p>Latest textbook additions, international conference proceedings, and technical monographs added to our collection:</p>
      <ul>
        <li><b>Artificial Intelligence: A Modern Approach (4th Edition)</b> — Stuart Russell &amp; Peter Norvig</li>
        <li><b>Deep Learning with Python &amp; PyTorch (Latest Release)</b> — François Chollet</li>
        <li><b>Modern VLSI Design: IP-Based System Design</b> — Wayne Wolf</li>
        <li><b>Renewable Energy Systems: Technology &amp; Economics</b> — Z. Sen</li>
        <li><b>Agricultural IoT &amp; Precision Farming Engineering</b> — Springer Nature</li>
        <li><b>Biomedical Instrumentation &amp; Clinical Measurement</b> — R. S. Khandpur</li>
      </ul>
      <p>Visit the <i>New Arrivals Display Showcase</i> on the ground floor to browse these copies before they enter regular shelf circulation.</p>
    `
  },
  'about-details': {
    title: 'About SIET Central Library',
    content: `
      <p>The Central Library of Sri Shakthi Institute of Engineering and Technology is an architecturally designed, fully air-conditioned academic knowledge center spread across three spacious floors with seating capacity for over <b>400+ students and researchers</b>.</p>
      <h4>Key Infrastructure</h4>
      <ul>
        <li><b>Automated RFID Gates &amp; Self-Service Circulation</b> for quick book issue and return.</li>
        <li><b>Digital Library Wing:</b> 60 high-performance computer terminals connected with dedicated 1 Gbps high-speed internet.</li>
        <li><b>Reprography &amp; Document Scanning:</b> Printing, scanning, and photocopying facility for academic work.</li>
        <li><b>Group Discussion Rooms:</b> Acoustic-treated spaces for team projects and academic seminars.</li>
        <li><b>Multimedia &amp; NPTEL Viewing Section:</b> Fully set up for MOOC courses and lecture viewing.</li>
      </ul>
      <h4>Contact Information</h4>
      <p><b>Chief Librarian:</b> Dr. K. Radhakrishnan, M.L.I.S., Ph.D.<br>
      <b>Direct Phone:</b> +91 422 2369900 (Ext. 240)<br>
      <b>Email:</b> <a href="mailto:library@siet.ac.in">library@siet.ac.in</a></p>
    `
  }
};

function libraryPage() {
  return `<main class="siet-library-page">
  ${sietHudHeader('Library', 'Library')}

  <section class="siet-lib-features-strip" aria-label="Key library features">
    <div class="siet-lib-features-container">
      <div class="siet-lib-feature-item reveal">
        <span class="lib-feat-icon" aria-hidden="true">${libIcons.book}</span>
        <div class="lib-feat-text">
          <h3>Vast Collection</h3>
          <p>Books, journals, e-books, project reports and more.</p>
        </div>
      </div>
      <div class="siet-lib-feature-item reveal">
        <span class="lib-feat-icon" aria-hidden="true">${libIcons.monitor}</span>
        <div class="lib-feat-text">
          <h3>Digital Resources</h3>
          <p>Access to e-journals, e-books and online databases.</p>
        </div>
      </div>
      <div class="siet-lib-feature-item reveal">
        <span class="lib-feat-icon" aria-hidden="true">${libIcons.users}</span>
        <div class="lib-feat-text">
          <h3>Study Spaces</h3>
          <p>Peaceful &amp; comfortable reading environment.</p>
        </div>
      </div>
      <div class="siet-lib-feature-item reveal">
        <span class="lib-feat-icon" aria-hidden="true">${libIcons.research}</span>
        <div class="lib-feat-text">
          <h3>Research Support</h3>
          <p>Guidance for projects, publications and research.</p>
        </div>
      </div>
      <div class="siet-lib-feature-item reveal">
        <span class="lib-feat-icon" aria-hidden="true">${libIcons.clock}</span>
        <div class="lib-feat-text">
          <h3>Extended Hours</h3>
          <p>Flexible timings for student convenience.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="siet-lib-body">
    <div class="siet-lib-container">
      <div class="siet-lib-layout siet-lib-layout-duo">
        <!-- Left: Image Card -->
        <div class="siet-lib-card-col">
          <div class="siet-lib-photo-card reveal">
            <img src="/brand/library-about.jpg" alt="Sri Shakthi Central Library reading hall and bookshelves">
            <div class="siet-lib-photo-badge">
              <span class="lib-badge-icon" aria-hidden="true">${libIcons.book}</span>
              <span class="lib-badge-text">Your Gateway to Knowledge</span>
            </div>
          </div>
        </div>

        <!-- Right: About Central Library -->
        <div class="siet-lib-about-col reveal">
          <div class="siet-lib-about-eyebrow">
            <span class="lib-gold-line"></span>
            <span class="lib-gold-text">ABOUT CENTRAL LIBRARY</span>
          </div>
          <h2 class="siet-lib-about-title">More Than Just Books</h2>
          <div class="siet-lib-about-text">
            <p>The Central Library at SIET is a hub of knowledge, innovation and learning. It provides a wide range of physical and digital resources, quiet study spaces and research support services to help students and faculty achieve their academic and research goals.</p>
            <p class="siet-lib-about-subtext">Print and digital resources, journals, databases and focused study environments support teaching, learning and research across all engineering disciplines.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive Modal -->
  <div class="siet-lib-modal js-lib-modal" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="siet-lib-modal-box">
      <div class="siet-lib-modal-header">
        <h3 class="js-lib-modal-title">Library Information</h3>
        <button type="button" class="siet-lib-modal-close js-lib-modal-close" aria-label="Close modal">×</button>
      </div>
      <div class="siet-lib-modal-body js-lib-modal-body"></div>
    </div>
  </div>
</main>`;
}

const currIcons = {
  gradCap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  headphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`
};

let currActiveDept = 'cse';
let currActiveSem = 1;

function getCurrModalData(target, deptId = 'cse') {
  const dept = getDeptCurriculum(deptId);
  const deptFullName = `${dept.degree} ${dept.name}`;

  if (target === 'curriculum-r2024') {
    return {
      title: `${deptFullName} — Autonomous Curriculum (R2024)`,
      content: `
        <p>The Autonomous Curriculum (Regulations 2024) for <b>${deptFullName}</b> of Sri Shakthi Institute of Engineering and Technology is outcome-driven and structured across <b>168 total credits</b>.</p>
        <h4>Credit Distribution Across Categories</h4>
        <ul>
          <li><span class="siet-lib-resource-badge">HSMC</span> Humanities and Social Sciences (12 Credits)</li>
          <li><span class="siet-lib-resource-badge">BSC</span> Basic Sciences (Mathematics, Physics, Chemistry) (25 Credits)</li>
          <li><span class="siet-lib-resource-badge">ESC</span> Engineering Sciences &amp; Maker Foundation (24 Credits)</li>
          <li><span class="siet-lib-resource-badge">PCC</span> Professional Core Courses &amp; Specialization Labs (68 Credits)</li>
          <li><span class="siet-lib-resource-badge">PEC</span> Professional Electives (Discipline Specialization Tracks) (18 Credits)</li>
          <li><span class="siet-lib-resource-badge">OEC</span> Multidisciplinary Open Electives (9 Credits)</li>
          <li><span class="siet-lib-resource-badge">PROJ</span> Industry Internship &amp; Capstone Project (12 Credits)</li>
        </ul>
        <p>For detailed credit transfer, honours/minor degree regulations, or academic syllabus copies for ${dept.name}, contact the office of Controller of Examinations.</p>
      `
    };
  }

  if (target === 'syllabus-r2024') {
    return {
      title: `${deptFullName} — Detailed Syllabus (R2024)`,
      content: `
        <p>Each syllabus outlines course educational objectives, unit-wise topic descriptions, laboratory experiments, modern tool requirements, textbooks, and reference volumes for <b>${deptFullName}</b>.</p>
        <h4>Specialization Focus</h4>
        <p>${dept.desc}</p>
        <h4>Core Pillars</h4>
        <ul>
          <li><b>Fundamental Rigor:</b> Strong theoretical grounding through classroom and tutorial sessions.</li>
          <li><b>Hands-on Laboratory Mastery:</b> High-tech practical labs aligned with current industry standards.</li>
          <li><b>Industry &amp; Research Readiness:</b> Mini-projects, hackathons, and capstone engineering challenges.</li>
        </ul>
        <p>To request certified copies of course syllabi for competitive exams or foreign higher education, please email <a href="mailto:academics@siet.ac.in">academics@siet.ac.in</a>.</p>
      `
    };
  }

  if (target === 'regulations-r2024') {
    return {
      title: 'Academic Regulations (Autonomous R2024)',
      content: `
        <h4>Key Academic Highlights</h4>
        <ul>
          <li><b>Attendance:</b> A candidate must secure a minimum of <b>75% attendance</b> in each course to be eligible for End Semester Examinations.</li>
          <li><b>Evaluation System:</b> Continuous Internal Assessment (CIA) carries 40% and End Semester Examination (ESE) carries 60%.</li>
          <li><b>Relative Grading:</b> Performance is evaluated on a 10-point letter grading system (O, A+, A, B+, B, C, U).</li>
          <li><b>Fast-Track Semester:</b> High-performing students (CGPA ≥ 8.5) may complete electives in semesters 5–7 and undertake full-time industry capstone in semester 8.</li>
        </ul>
      `
    };
  }

  if (target === 'scheme-exam') {
    return {
      title: `Scheme of Examination — ${deptFullName}`,
      content: `
        <h4>Internal Assessment (40 Marks)</h4>
        <ul>
          <li><b>Internal Assessment Tests (IAT I &amp; II):</b> Two centralized examinations (each 100 marks converted to 20 marks).</li>
          <li><b>Experiential Assignment / Project:</b> Industry-aligned hands-on problem solving (10 marks).</li>
          <li><b>Quiz, Seminar &amp; Technical Presentation:</b> Active classroom engagement (10 marks).</li>
        </ul>
        <h4>End Semester Examination (60 Marks)</h4>
        <p>Autonomous central evaluation conducted for 100 marks with Bloom's Taxonomy-based question paper and converted to 60 marks.</p>
      `
    };
  }

  if (target === 'academic-help') {
    return {
      title: 'Academic Dean Desk & Student Support',
      content: `
        <p>The Academic Office assists students with curriculum clarifications, elective selections, re-evaluation requests, and academic calendar scheduling.</p>
        <h4>Office Details</h4>
        <p><b>Dean (Academics):</b> Dr. R. Manimegalai, Ph.D.<br>
        <b>Location:</b> Administrative Block, Ground Floor (Room A-108)<br>
        <b>Direct Phone:</b> +91 422 2369900 (Ext. 215)<br>
        <b>Email:</b> <a href="mailto:academics@siet.ac.in">academics@siet.ac.in</a></p>
        <p><b>Student Hours:</b> Monday to Friday, 3:30 PM – 5:00 PM</p>
      `
    };
  }

  return { title: 'Academic Document', content: '<p>Details will be updated shortly.</p>' };
}

function renderCurriculumTable(deptId = 'cse', semNum = 1) {
  const dept = getDeptCurriculum(deptId);
  const data = dept?.semesters?.[semNum] || dept?.semesters?.[1] || {
    name: `Semester ${semNum}`,
    credits: 0,
    courses: [],
    totals: { l: 0, t: 0, p: 0, c: 0 }
  };

  return `
    <div class="curr-sem-header">
      <div class="curr-sem-title-box">
        <span class="curr-sem-icon">${libIcons.book}</span>
        <h3 id="active-sem-name">${data.name}</h3>
      </div>
      <span class="curr-credits-pill">Total Credits: <b id="active-sem-credits">${data.credits}</b></span>
    </div>
    <div class="curr-table-wrapper">
      <table class="curr-table" aria-label="Course curriculum table for ${dept.degree} ${dept.name} ${data.name}">
        <thead>
          <tr>
            <th class="th-num">S.No.</th>
            <th>Course Code</th>
            <th>Course Title</th>
            <th class="th-credit">L</th>
            <th class="th-credit">T</th>
            <th class="th-credit">P</th>
            <th class="th-credit">C</th>
          </tr>
        </thead>
        <tbody>
          ${data.courses.map(c => `
            <tr>
              <td class="td-num">${c.sno}</td>
              <td class="td-code">${c.code}</td>
              <td class="td-title">${c.title}</td>
              <td class="td-credit">${c.l}</td>
              <td class="td-credit">${c.t}</td>
              <td class="td-credit">${c.p}</td>
              <td class="td-credit"><b>${c.c}</b></td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align:left;padding-left:16px"><b>Total</b></td>
            <td class="td-credit">${data.totals.l}</td>
            <td class="td-credit">${data.totals.t}</td>
            <td class="td-credit">${data.totals.p}</td>
            <td class="td-credit">${data.totals.c}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

const currSemestersList = [
  [1, 'Semester I'],
  [2, 'Semester II'],
  [3, 'Semester III'],
  [4, 'Semester IV'],
  [5, 'Semester V'],
  [6, 'Semester VI'],
  [7, 'Semester VII'],
  [8, 'Semester VIII']
];

function curriculumPage() {
  const params = routeParams();
  const queryDept = params.get('dept');
  if (queryDept) {
    const matched = getDeptCurriculum(queryDept);
    if (matched) currActiveDept = matched.id;
  }
  const activeDept = getDeptCurriculum(currActiveDept);

  return `<main class="siet-curr-page">
  ${sietHudHeader('Curriculum', 'Curriculum')}

  <section class="siet-curr-body">
    <div class="siet-curr-container">
      <div class="siet-curr-grid">
        <!-- Left Sidebar: Academics Nav -->
        <aside class="siet-curr-sidebar reveal">
          <div class="siet-curr-sidecard">
            <div class="siet-curr-sidehead">
              <span class="sidehead-icon" aria-hidden="true">${currIcons.gradCap}</span>
              <div class="sidehead-text">
                <h3>Academics</h3>
                <p>Your learning journey, our priority.</p>
              </div>
            </div>
            <nav class="siet-curr-nav" aria-label="Academic navigation">
              <a href="#/curriculum" class="siet-curr-navlink is-active">
                <span class="navlink-content">
                  <span class="navlink-icon">${libIcons.book}</span>
                  <span>Curriculum</span>
                </span>
                <span class="navlink-arrow">›</span>
              </a>
              <a href="#/academic-calendar" class="siet-curr-navlink">
                <span class="navlink-content">
                  <span class="navlink-icon">${currIcons.calendar}</span>
                  <span>Academic Calendar</span>
                </span>
                <span class="navlink-arrow">›</span>
              </a>
              <button type="button" class="siet-curr-navlink js-curr-modal-trigger" data-target="syllabus-r2024">
                <span class="navlink-content">
                  <span class="navlink-icon">${libIcons.document}</span>
                  <span>Syllabus</span>
                </span>
                <span class="navlink-arrow">›</span>
              </button>
              <button type="button" class="siet-curr-navlink js-curr-modal-trigger" data-target="regulations-r2024">
                <span class="navlink-content">
                  <span class="navlink-icon">${currIcons.shield}</span>
                  <span>Regulations</span>
                </span>
                <span class="navlink-arrow">›</span>
              </button>
              <button type="button" class="siet-curr-navlink js-curr-modal-trigger" data-target="curriculum-r2024">
                <span class="navlink-content">
                  <span class="navlink-icon">${currIcons.database}</span>
                  <span>Academic Resources</span>
                </span>
                <span class="navlink-arrow">›</span>
              </button>
            </nav>
          </div>
        </aside>

        <!-- Center: Interactive Curriculum Viewer -->
        <main class="siet-curr-center reveal">
          <!-- Department Tabs (Alphabetical order) -->
          <div class="curr-dept-tabs" role="tablist" aria-label="Select Engineering Department">
            ${[...allDepartments].sort((a, b) => a.code.localeCompare(b.code)).map(d => `
              <button type="button" 
                      class="curr-dept-tab ${d.id === activeDept.id ? 'is-active' : ''}" 
                      role="tab" 
                      aria-selected="${d.id === activeDept.id ? 'true' : 'false'}" 
                      data-dept="${d.id}"
                      title="${d.degree} ${d.name} (${d.code})">
                ${d.code}
              </button>
            `).join('')}
          </div>

          <div class="curr-center-eyebrow">CURRICULUM</div>
          <h2 class="curr-center-title" id="curr-dept-title">${activeDept.degree} ${activeDept.name}</h2>
          <p class="curr-center-desc" id="curr-dept-desc">${activeDept.desc}</p>

          <!-- Semester Tabs (Image 2 style) -->
          <div class="curr-sem-tabs" role="tablist" aria-label="Select Semester">
            ${currSemestersList.map(([num, name]) => `
              <button type="button" 
                      class="curr-sem-tab ${num === currActiveSem ? 'is-active' : ''}" 
                      role="tab" 
                      aria-selected="${num === currActiveSem ? 'true' : 'false'}" 
                      data-sem="${num}">
                ${name}
              </button>
            `).join('')}
          </div>

          <!-- Dynamic Semester Table Area -->
          <div id="curr-table-area">
            ${renderCurriculumTable(activeDept.id, currActiveSem)}
          </div>
        </main>
      </div>
    </div>
  </section>

  <!-- Ambient Bottom Wave and Watermark -->
  <div class="siet-curr-bottom-decor" aria-hidden="true">
    <div class="siet-curr-watermark">
      <svg viewBox="0 0 280 120" fill="none" stroke="#256e48" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 110h260M25 110V45l45-22 45 22v65M115 110V32l35-18 35 18v78M185 110V45l40-20 40 20v65" />
        <line x1="45" y1="58" x2="45" y2="110" />
        <line x1="60" y1="58" x2="60" y2="110" />
        <line x1="85" y1="58" x2="85" y2="110" />
        <line x1="100" y1="58" x2="100" y2="110" />
        <rect x="135" y="48" width="16" height="22" />
        <rect x="160" y="48" width="16" height="22" />
        <rect x="145" y="80" width="20" height="30" rx="6" />
        <line x1="205" y1="58" x2="205" y2="110" />
        <line x1="220" y1="58" x2="220" y2="110" />
        <line x1="245" y1="58" x2="245" y2="110" />
      </svg>
    </div>
    <div class="siet-curr-bottom-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
        <path d="M0,100 L0,25 C200,85 450,95 720,60 C980,25 1200,35 1440,0 L1440,100 Z" fill="#073b21" />
        <path d="M0,100 L0,45 C240,92 480,102 760,70 C1020,38 1240,48 1440,20 L1440,100 Z" fill="#0b522f" />
        <path d="M0,100 L0,70 C280,105 520,108 800,82 C1060,56 1280,68 1440,45 L1440,100 Z" fill="#eab308" />
      </svg>
    </div>
  </div>

  <!-- Curriculum Modal Dialog -->
  <div class="siet-lib-modal js-curr-modal" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="siet-lib-modal-box">
      <div class="siet-lib-modal-header">
        <h3 class="js-curr-modal-title">Academic Document</h3>
        <button type="button" class="siet-lib-modal-close js-curr-modal-close" aria-label="Close modal">×</button>
      </div>
      <div class="siet-lib-modal-body js-curr-modal-body"></div>
    </div>
  </div>
</main>`;
}

function academicCalendarPage() {
  return `<main class="siet-curr-page siet-calendar-page">
  ${sietHudHeader('Academic Calendar', 'Academic Calendar')}

  <section class="siet-curr-body">
    <div class="siet-curr-container">
      <div class="siet-curr-grid">
        <!-- Left Sidebar: Academics Nav -->
        <aside class="siet-curr-sidebar reveal">
          <div class="siet-curr-sidecard">
            <div class="siet-curr-sidehead">
              <span class="sidehead-icon" aria-hidden="true">${currIcons.gradCap}</span>
              <div class="sidehead-text">
                <h3>Academics</h3>
                <p>Your learning journey, our priority.</p>
              </div>
            </div>
            <nav class="siet-curr-nav" aria-label="Academic navigation">
              <a href="#/curriculum" class="siet-curr-navlink">
                <span class="navlink-content">
                  <span class="navlink-icon">${libIcons.book}</span>
                  <span>Curriculum</span>
                </span>
                <span class="navlink-arrow">›</span>
              </a>
              <a href="#/academic-calendar" class="siet-curr-navlink is-active">
                <span class="navlink-content">
                  <span class="navlink-icon">${currIcons.calendar}</span>
                  <span>Academic Calendar</span>
                </span>
                <span class="navlink-arrow">›</span>
              </a>
              <button type="button" class="siet-curr-navlink js-curr-modal-trigger" data-target="syllabus-r2024">
                <span class="navlink-content">
                  <span class="navlink-icon">${libIcons.document}</span>
                  <span>Syllabus</span>
                </span>
                <span class="navlink-arrow">›</span>
              </button>
              <button type="button" class="siet-curr-navlink js-curr-modal-trigger" data-target="regulations-r2024">
                <span class="navlink-content">
                  <span class="navlink-icon">${currIcons.shield}</span>
                  <span>Regulations</span>
                </span>
                <span class="navlink-arrow">›</span>
              </button>
            </nav>
          </div>
        </aside>

        <!-- Main Content -->
        <article class="siet-curr-main">
          <div class="siet-calendar-card reveal">
            <div class="siet-calendar-header">
              <div>
                <span class="curr-badge">AUTONOMOUS 2025–2026</span>
                <h2>Autonomous Academic Schedule &amp; Calendar</h2>
                <p>Detailed timeline for class commencement, continuous internal assessments, model examinations, end-semester practicals, and theory examinations.</p>
              </div>
              <div class="calendar-actions">
                <a href="#/curriculum" class="dept-curriculum-action">View Full Curriculum →</a>
              </div>
            </div>

            <div class="calendar-schedule-tables">
              <h3 class="calendar-term-heading">Odd Semester (III, V, VII Semesters)</h3>
              <div class="curr-table-wrapper">
                <table class="curr-table calendar-table">
                  <thead>
                    <tr>
                      <th style="width:70px">S.No</th>
                      <th>Academic Milestone / Event</th>
                      <th style="width:220px">Date / Duration</th>
                      <th style="width:130px">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="td-num">1</td>
                      <td class="td-title">Commencement of Odd Semester Classes</td>
                      <td class="td-code">14 July 2025</td>
                      <td><span class="cal-status cal-open">Completed</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">2</td>
                      <td class="td-title">Continuous Internal Assessment – I (CIA I)</td>
                      <td class="td-code">25 Aug 2025 – 01 Sep 2025</td>
                      <td><span class="cal-status cal-open">Completed</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">3</td>
                      <td class="td-title">Continuous Internal Assessment – II (CIA II)</td>
                      <td class="td-code">06 Oct 2025 – 13 Oct 2025</td>
                      <td><span class="cal-status cal-active">Active</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">4</td>
                      <td class="td-title">Last Working Day for Odd Semester</td>
                      <td class="td-code">07 Nov 2025</td>
                      <td><span class="cal-status">Scheduled</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">5</td>
                      <td class="td-title">End Semester Practical Examinations</td>
                      <td class="td-code">10 Nov 2025 – 18 Nov 2025</td>
                      <td><span class="cal-status">Scheduled</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">6</td>
                      <td class="td-title">End Semester Theory Examinations</td>
                      <td class="td-code">24 Nov 2025 – 15 Dec 2025</td>
                      <td><span class="cal-status">Scheduled</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 class="calendar-term-heading" style="margin-top:36px">Even Semester (IV, VI, VIII Semesters)</h3>
              <div class="curr-table-wrapper">
                <table class="curr-table calendar-table">
                  <thead>
                    <tr>
                      <th style="width:70px">S.No</th>
                      <th>Academic Milestone / Event</th>
                      <th style="width:220px">Date / Duration</th>
                      <th style="width:130px">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="td-num">1</td>
                      <td class="td-title">Re-opening &amp; Commencement of Even Semester Classes</td>
                      <td class="td-code">05 Jan 2026</td>
                      <td><span class="cal-status">Upcoming</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">2</td>
                      <td class="td-title">Continuous Internal Assessment – I (CIA I)</td>
                      <td class="td-code">16 Feb 2026 – 23 Feb 2026</td>
                      <td><span class="cal-status">Upcoming</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">3</td>
                      <td class="td-title">Continuous Internal Assessment – II (CIA II)</td>
                      <td class="td-code">23 Mar 2026 – 30 Mar 2026</td>
                      <td><span class="cal-status">Upcoming</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">4</td>
                      <td class="td-title">Last Working Day for Even Semester</td>
                      <td class="td-code">24 Apr 2026</td>
                      <td><span class="cal-status">Upcoming</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">5</td>
                      <td class="td-title">End Semester Practical Examinations</td>
                      <td class="td-code">27 Apr 2026 – 06 May 2026</td>
                      <td><span class="cal-status">Upcoming</span></td>
                    </tr>
                    <tr>
                      <td class="td-num">6</td>
                      <td class="td-title">End Semester Theory Examinations</td>
                      <td class="td-code">11 May 2026 – 02 Jun 2026</td>
                      <td><span class="cal-status">Upcoming</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Wave transition -->
  <div class="siet-curr-waves-zone" aria-hidden="true">
    <div class="siet-curr-bottom-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none">
        <path d="M0,100 L0,25 C200,85 450,95 720,60 C980,25 1200,35 1440,0 L1440,100 Z" fill="#073b21" />
        <path d="M0,100 L0,45 C240,92 480,102 760,70 C1020,38 1240,48 1440,20 L1440,100 Z" fill="#0b522f" />
        <path d="M0,100 L0,70 C280,105 520,108 800,82 C1060,56 1280,68 1440,45 L1440,100 Z" fill="#eab308" />
      </svg>
    </div>
  </div>
</main>`;
}

function videoModal() { return `<div class="video-modal" role="dialog" aria-modal="true"><div class="video-shell portrait"><button class="video-close">×</button><div class="video-frame"><video controls autoplay playsinline poster="/brand/techpark-hd.jpg"><source src="/brand/siet-campus-video.mp4" type="video/mp4"></video></div></div></div>` }
function route() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, '')).replace(/\/$/, '');
  return raw.split('?')[0];
}
function routeParams() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  const qIndex = raw.indexOf('?');
  if (qIndex === -1) return new URLSearchParams();
  return new URLSearchParams(raw.slice(qIndex + 1));
}
function enhancedHeader() { return `<div class="notice"><div class="notice-track"><span><b>ADMISSIONS 2026–27 NOW OPEN</b><i></i> Applications are invited for undergraduate and postgraduate engineering programmes <i></i> Begin your journey at Sri Shakthi <i></i> TNEA Counselling Code: 2727</span><span aria-hidden="true"><b>ADMISSIONS 2026–27 NOW OPEN</b><i></i> Applications are invited for undergraduate and postgraduate engineering programmes <i></i> Begin your journey at Sri Shakthi <i></i> TNEA Counselling Code: 2727</span></div></div><header class="institution-header-v4 exact-image-header"><div class="institution-header-shell"><a class="siet-header-image" href="#/" aria-label="Sri Shakthi Institute of Engineering and Technology home"><img src="/brand/siet-exact-header.png" alt="Sri Shakthi Institute of Engineering and Technology" width="2048" height="256"></a><nav class="institution-navbar" aria-label="Main navigation"><button class="institution-mobile-toggle" aria-label="Open navigation menu" type="button">${icon('menu')}</button><a class="institution-mobile-logo" href="#/" aria-label="Sri Shakthi Home"><img src="/brand/siet-logo.png" alt="Sri Shakthi" class="mobile-logo-img"><span class="mobile-logo-text"><b>SRI SHAKTHI</b><small>Autonomous Institution</small></span></a><a class="institution-home" href="#/" aria-label="Home">${icon('home')}</a><div class="institution-menu">${pageGroups.map((g, i) => `${i === 5 ? '<a class="institution-nav-link" href="#/placements">Placements</a>' : ''}<div class="institution-nav-group ${g.label === 'About' ? 'institution-about-group' : ''}"><button type="button">${g.label}${icon('down')}</button>${g.label === 'About' ? aboutDesktopMenu() : `<div>${g.items.map(([s, n]) => `<a href="#/${s}">${n}</a>`).join('')}</div>`}</div>`).join('')}<a class="institution-nav-link" href="#/careers">Careers</a></div><a class="institution-nav-apply" href="#/apply">Apply Now ${icon('arrow')}</a></nav></div></header><div class="mobile-nav-backdrop"></div><aside class="mobile-nav" aria-label="Mobile Navigation"><div class="mobile-nav-header"><a href="#/" class="mobile-nav-brand"><img src="/brand/siet-logo.png" alt="Sri Shakthi"><div><strong>SRI SHAKTHI</strong><small>Autonomous Institution</small></div></a><button class="mobile-nav-close" aria-label="Close menu">${icon('close')}</button></div><div class="mobile-nav-body"><a href="#/" class="mobile-nav-link mobile-nav-home">${icon('home')} Home</a><div class="mobile-nav-accordion">${pageGroups.map((g, i) => `${i === 5 ? '<a class="mobile-nav-link" href="#/placements">Placements</a>' : ''}<div class="mobile-nav-group"><button type="button" class="mobile-nav-group-toggle" aria-expanded="false"><span>${g.label}</span>${icon('down')}</button><div class="mobile-nav-subitems">${g.label === 'About' ? aboutMobileMenu() : g.items.map(([s, n]) => `<a href="#/${s}" class="mobile-nav-sublink">${n}</a>`).join('')}</div></div>`).join('')}<a class="mobile-nav-link" href="#/careers">Careers @ SIET</a></div></div><div class="mobile-nav-footer"><a class="mobile-apply-link" href="#/apply">Apply Now ${icon('arrow')}</a></div></aside>` }
function render() { if (!appRoot) return; const r = route(); let content = !r ? homePage() : r === 'vision-mission' || r === 'about' ? visionPage() : r === 'program-outcomes' ? programOutcomesPage() : r === 'core-values' ? coreValuesPage() : r === 'philosophy' ? philosophyPage() : r === 'chairman' ? chairmanPage() : r === 'principal' ? principalPage() : r === 'admission-enquiry' || r === 'apply' ? enquiryPage(r === 'apply') : r === 'admission-referral' || r === 'referral' ? referralPage() : r === 'careers' ? careersPage() : r === 'library' ? libraryPage() : r === 'curriculum' ? curriculumPage() : r === 'academic-calendar' ? academicCalendarPage() : internalPage(r); appRoot.innerHTML = enhancedHeader() + content + footer(); document.title = `${r ? titleCase(r.replaceAll('-', ' ')) : 'Sri Shakthi'} | SIET`; bind(); scrollTo(0, 0) }

function bind() {
  if (route() === 'chairman') {
    $('.siet-cd-breadcrumb b')?.replaceChildren("From Chairman's Desk");
    $('.siet-cd-kicker')?.replaceChildren('FROM CHAIRMAN\'S DESK');
    document.title = "From Chairman's Desk | SIET";
  }
  if (route() === 'library') {
    document.title = "Central Library | Sri Shakthi Institute of Engineering & Technology";
  }
  if (route() === 'curriculum') {
    const dept = getDeptCurriculum(currActiveDept);
    document.title = `${dept.degree} ${dept.name} Curriculum | Sri Shakthi Institute of Engineering & Technology`;
  }
  if (route() === 'academic-calendar') {
    document.title = "Academic Calendar | Sri Shakthi Institute of Engineering & Technology";
  }
  if (route() === 'departments') {
    document.title = "Departments | Sri Shakthi Institute of Engineering & Technology";
  }


  const mobile = $('.mobile-nav'), backdrop = $('.mobile-nav-backdrop'), toggle = $('.institution-mobile-toggle'), closeBtn = $('.mobile-nav-close');
  const closeMenu = () => { mobile?.classList.remove('open'); backdrop?.classList.remove('open'); if (toggle) toggle.innerHTML = icon('menu'); document.body.style.overflow = '' };
  const openMenu = () => { mobile?.classList.add('open'); backdrop?.classList.add('open'); if (toggle) toggle.innerHTML = icon('close'); document.body.style.overflow = 'hidden' };
  toggle?.addEventListener('click', e => { e.stopPropagation(); mobile?.classList.contains('open') ? closeMenu() : openMenu() });
  closeBtn?.addEventListener('click', e => { e.stopPropagation(); closeMenu() });
  backdrop?.addEventListener('click', closeMenu);
  $$('.mobile-nav a').forEach(a => a.addEventListener('click', closeMenu));
  $$('.mobile-nav-group-toggle').forEach(btn => btn.addEventListener('click', e => {
    e.stopPropagation();
    const group = btn.closest('.mobile-nav-group');
    const wasOpen = group.classList.contains('open');
    $$('.mobile-nav-group').forEach(g => { g.classList.remove('open'); g.querySelector('.mobile-nav-group-toggle')?.setAttribute('aria-expanded', 'false') });
    if (!wasOpen) { group.classList.add('open'); btn.setAttribute('aria-expanded', 'true') }
  }));
  $$('.institution-nav-group>button').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); const group = btn.parentElement; $$('.institution-nav-group').filter(x => x !== group).forEach(x => x.classList.remove('open')); group.classList.toggle('open') })); document.addEventListener('click', () => $$('.institution-nav-group').forEach(g => g.classList.remove('open')), { once: true });
  $$('.js-video').forEach(b => b.addEventListener('click', () => { document.body.insertAdjacentHTML('beforeend', videoModal()); document.body.style.overflow = 'hidden'; const modal = $('.video-modal'); const close = () => { modal.remove(); document.body.style.overflow = '' }; modal.addEventListener('click', e => e.target === modal && close()); $('.video-close', modal).addEventListener('click', close) }));
  $$('.toggle-btn').forEach(b => b.addEventListener('click', () => { $$('.toggle-btn').forEach(x => x.classList.toggle('active', x === b)); $('#level-name').textContent = b.dataset.level; $('#programme-grid').innerHTML = programmeCards(b.dataset.level === 'UG' ? programs : programs.slice(0, 7)); observe() }));
  const progGrid = $('#programme-grid');
  progGrid?.addEventListener('click', e => {
    const card = e.target.closest('.programme-card');
    if (!card) return;
    const wasActive = card.classList.contains('active');
    $$('.programme-card', progGrid).forEach(c => c.classList.remove('active'));
    if (!wasActive) card.classList.add('active');
  });
  progGrid?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.programme-card');
      if (card) { e.preventDefault(); card.click() }
    }
  });
  $('.js-scroll-programmes')?.addEventListener('click', () => { $('.programmes-section')?.scrollIntoView({ behavior: 'smooth' }) });
  $('.js-discover-btn')?.addEventListener('click', () => { $('.programmes-section')?.scrollIntoView({ behavior: 'smooth' }) });
  $('.js-explore-campus')?.addEventListener('click', () => { $('.campus-gallery')?.scrollIntoView({ behavior: 'smooth' }) });
  $$('.department-detail-nav button').forEach(button => button.addEventListener('click', () => { const target = document.getElementById(button.dataset.section); if (!target) return; $$('.department-detail-nav button').forEach(item => item.classList.toggle('active', item === button)); $$('.department-copy').forEach(section => section.classList.toggle('is-open', section === target)) }));
  $$('.campus-gallery .gallery-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click() }
    })
  });

  // Library modal triggers
  $$('.js-lib-modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const modal = $('.js-lib-modal');
      const titleEl = $('.js-lib-modal-title');
      const bodyEl = $('.js-lib-modal-body');
      if (!modal || !titleEl || !bodyEl) return;
      const data = libModalData[target] || { title: 'Library Information', content: '<p>Details will be updated shortly.</p>' };
      titleEl.textContent = data.title;
      bodyEl.innerHTML = data.content;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  $('.js-lib-modal-close')?.addEventListener('click', () => {
    const modal = $('.js-lib-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  $('.js-lib-modal')?.addEventListener('click', e => {
    if (e.target.classList.contains('js-lib-modal')) {
      e.target.classList.remove('open');
      e.target.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // Library search submission handler
  $('.js-lib-search')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('.js-lib-search-input');
    const query = (input?.value || '').trim();
    const modal = $('.js-lib-modal');
    const titleEl = $('.js-lib-modal-title');
    const bodyEl = $('.js-lib-modal-body');
    if (!modal || !titleEl || !bodyEl) return;
    titleEl.textContent = query ? `Search Results: "${query}"` : 'Library Catalogue Search';
    bodyEl.innerHTML = `
      <p>Searching Central Library OPAC &amp; digital collections for <b>${query || 'all subjects'}</b>:</p>
      <h4>Matching Records &amp; Availability:</h4>
      <ul>
        <li><span class="siet-lib-resource-badge">Print Volume</span> <b>Artificial Intelligence: A Modern Approach</b> — <i>Available (Shelf 4B, 3 copies)</i></li>
        <li><span class="siet-lib-resource-badge">E-Journal</span> <b>IEEE Transactions on Pattern Analysis and Machine Intelligence</b> — <i>Full-text Online</i></li>
        <li><span class="siet-lib-resource-badge">Research Project</span> <b>Smart Agro-Robotics &amp; Drone Systems (2025-26)</b> — <i>Reference Section R-08</i></li>
        <li><span class="siet-lib-resource-badge">Textbook</span> <b>Data Structures and Algorithm Analysis in C++ (Mark Allen Weiss)</b> — <i>Available (Shelf 2A)</i></li>
      </ul>
      <p style="margin-top:14px;color:#537563;font-size:13px">Present your institutional Smart ID card at the circulation counter to reserve or issue physical books.</p>
    `;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  // Department switcher helper
  const updateActiveDept = (deptId) => {
    const dept = getDeptCurriculum(deptId);
    if (!dept) return;
    currActiveDept = dept.id;

    // Update active state on department tabs
    $$('.curr-dept-tab').forEach(tab => {
      const isSelected = tab.dataset.dept === dept.id;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Update center title & description
    const titleEl = $('#curr-dept-title');
    const descEl = $('#curr-dept-desc');
    if (titleEl) titleEl.textContent = `${dept.degree} ${dept.name}`;
    if (descEl) descEl.textContent = dept.desc;

    // Re-render table for current active semester
    const tableArea = $('#curr-table-area');
    if (tableArea) {
      tableArea.innerHTML = renderCurriculumTable(currActiveDept, currActiveSem);
    }

    // Update document title and sync URL hash query
    document.title = `${dept.degree} ${dept.name} Curriculum | SIET`;
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#/curriculum?dept=${dept.id}`);
    }
  };

  // Department tabs click listener
  $$('.curr-dept-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const deptId = tab.dataset.dept;
      if (deptId) updateActiveDept(deptId);
    });
  });

  // Semester switcher helper and event handlers
  const updateActiveSem = (semNum) => {
    const sem = Math.max(1, Math.min(8, Number(semNum) || 1));
    currActiveSem = sem;

    // Update active state on semester tabs
    $$('.curr-sem-tab').forEach(tab => {
      const isSelected = Number(tab.dataset.sem) === sem;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Re-render curriculum table
    const tableArea = $('#curr-table-area');
    if (tableArea) {
      tableArea.innerHTML = renderCurriculumTable(currActiveDept, currActiveSem);
    }
  };

  // Semester tabs click listener
  $$('.curr-sem-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const sem = Number(tab.dataset.sem);
      if (sem) updateActiveSem(sem);
    });
  });

  // Curriculum modal triggers
  $$('.js-curr-modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const modal = $('.js-curr-modal');
      const titleEl = $('.js-curr-modal-title');
      const bodyEl = $('.js-curr-modal-body');
      if (!modal || !titleEl || !bodyEl) return;
      const data = getCurrModalData(target, currActiveDept);
      titleEl.textContent = data.title;
      bodyEl.innerHTML = data.content;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  $('.js-curr-modal-close')?.addEventListener('click', () => {
    const modal = $('.js-curr-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  $('.js-curr-modal')?.addEventListener('click', e => {
    if (e.target.classList.contains('js-curr-modal')) {
      e.target.classList.remove('open');
      e.target.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

  async function submitForm(e) { e.preventDefault(); const status = $('.status', e.currentTarget); status.textContent = 'Sending…'; const data = Object.fromEntries(new FormData(e.currentTarget)); try { const res = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); const json = await res.json(); status.textContent = json.message || 'Thank you. Your details have been received.'; if (res.ok) e.currentTarget.reset() } catch { status.textContent = 'Form is ready. Start the API server to accept enquiries.' } }
  function observe() { const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches; const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.classList.add('is-visible'); if (entry.target.classList.contains('js-counter')) animateCounter(entry.target); observer.unobserve(entry.target) }), { threshold: .18 }); $$('.reveal,.js-counter').forEach(el => reduce ? (el.classList.add('is-visible'), el.classList.contains('js-counter') && animateCounter(el)) : observer.observe(el)) }
  function animateCounter(el) { const to = Number(el.dataset.to), suffix = el.dataset.suffix || '', start = performance.now(), duration = 1500; function tick(now) { const p = Math.min((now - start) / duration, 1), v = Math.round(to * (1 - (1 - p) ** 3)); el.textContent = v.toLocaleString('en-IN') + suffix; if (p < 1) requestAnimationFrame(tick) } requestAnimationFrame(tick) }
  const handleEscape = e => { if (e.key === 'Escape') { $('.video-close')?.click(); $('.mobile-nav-close')?.click(); $('.js-lib-modal-close')?.click(); $('.js-curr-modal-close')?.click(); } };

  export function mountSite(root) {
    appRoot = root;
    window.addEventListener('hashchange', render);
    window.addEventListener('keydown', handleEscape);
    render();
    return () => {
      window.removeEventListener('hashchange', render);
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      appRoot = null;
    };
  }
