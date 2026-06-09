/* CODEZZY Chatbot — site-wide knowledge base */
(function () {
  'use strict';

  // ── Knowledge Base ────────────────────────────────────────────────────────
  const KB = [
    // Greetings
    { p: /^(hi|hello|hey|yo|namaste|hii+|helo)\b/i,
      r: () => `👋 Hey! I'm Cody, your CODEZZY assistant.<br>Ask me about tutorials, courses, career guidance, or anything on this site. How can I help?` },
    { p: /^(bye|goodbye|thanks?|thank you|ok|okay)\b/i,
      r: () => `😊 You're welcome! Keep learning and growing. Visit <a href="tutorials.html">all tutorials</a> anytime. Bye! 👋` },
    { p: /what (is|are) you|who are you|your name|about you/i,
      r: () => `I'm <strong>Cody</strong>, CODEZZY's built-in assistant 🤖<br>I know everything about this website — tutorials, resources, career tips, and more. Ask away!` },

    // What is CODEZZY
    { p: /what is codezzy|about codezzy|tell me about this site|what does this website do/i,
      r: () => `<strong>CODEZZY</strong> is a 100% free educational platform for tech learners 🎓<br><br>We cover:<br>• Programming, Web Dev, Cyber Security<br>• AI/ML, Networking, Linux, Cloud, SQL<br>• Career guidance, resources & student tools<br><br>👉 <a href="about.html">Learn more about us</a>` },
    { p: /is (it )?free|cost|price|paid|subscription/i,
      r: () => `Yes — CODEZZY is <strong>100% free forever</strong> 🎉<br>No sign-up, no paywall, no hidden charges. Everything from tutorials to resources is free.<br><br>👉 <a href="faq.html">See our FAQ</a>` },

    // Navigation / Pages
    { p: /all (pages|sections)|what pages|what sections|site map|navigation/i,
      r: () => `Here's everything on CODEZZY:<br><br>📚 <a href="tutorials.html">All Tutorials</a><br>💻 <a href="programming.html">Programming</a><br>🌐 <a href="web-development.html">Web Development</a><br>🔐 <a href="cyber-security.html">Cyber Security</a><br>🤖 <a href="ai-ml.html">AI & Machine Learning</a><br>📡 <a href="networking.html">Networking</a><br>🐧 <a href="linux.html">Linux</a><br>☁️ <a href="cloud-computing.html">Cloud Computing</a><br>🌐 <a href="domain-hosting.html">Domain & Hosting</a><br>🗄️ <a href="sql.html">SQL</a><br>🎓 <a href="student-corner.html">Student Corner</a><br>📄 <a href="resources.html">Resources</a><br>📝 <a href="blog.html">Blog</a><br>💼 <a href="career-guidance.html">Career Guidance</a><br>❓ <a href="faq.html">FAQ</a><br>📞 <a href="contact.html">Contact</a>` },

    // Tutorials
    { p: /tutorial|course|learn|lessons|class/i,
      r: () => `We have <strong>500+ free tutorials</strong> across 9 categories 🚀<br><br>You can filter by topic:<br>• All, Programming, Web Dev, Security<br>• AI/ML, Networking, Linux, Cloud, SQL<br><br>👉 <a href="tutorials.html">Browse All Tutorials</a>` },

    // Programming
    { p: /program|python|java\b|javascript|c\+\+|c#|c programming|coding|code/i,
      r: () => `CODEZZY covers <strong>6 programming languages</strong> with structured roadmaps 💻<br><br>• Python — beginner-friendly, data/AI/web<br>• JavaScript — modern ES6+, web & Node.js<br>• Java — OOP, enterprise development<br>• C/C++ — systems programming<br>• C# — .NET and game dev<br><br>👉 <a href="programming.html">Start Learning Programming</a>` },
    { p: /python/i,
      r: () => `🐍 <strong>Python</strong> is our most popular course!<br><br>Topics covered: variables, loops, functions, OOP, file I/O, modules, and more.<br>8-week roadmap from zero to job-ready.<br><br>👉 <a href="programming.html">Learn Python on CODEZZY</a>` },
    { p: /javascript|js\b/i,
      r: () => `⚡ <strong>JavaScript</strong> roadmap on CODEZZY:<br><br>Fundamentals → DOM & Events → ES6+ → APIs & Projects<br><br>👉 <a href="programming.html">Learn JavaScript</a>` },
    { p: /java\b/i,
      r: () => `☕ <strong>Java</strong> on CODEZZY covers OOP, collections, multithreading, Spring Boot and more.<br><br>👉 <a href="programming.html">Learn Java</a>` },

    // Web Development
    { p: /web dev|html|css|react|node|frontend|backend|website build|web design/i,
      r: () => `🌐 <strong>Web Development</strong> path on CODEZZY:<br><br>HTML → CSS → JavaScript → React → Node.js<br><br>Topics: Semantic HTML, Flexbox/Grid, DOM, REST APIs, deployment.<br><br>👉 <a href="web-development.html">Start Web Development</a>` },

    // Cyber Security
    { p: /cyber|security|hacking|kali|ethical hack|penetration|phishing|firewall|malware/i,
      r: () => `🔐 <strong>Cyber Security</strong> on CODEZZY (educational only!):<br><br>• Ethical Hacking basics<br>• Kali Linux introduction<br>• Network Security fundamentals<br>• Cyber awareness & phishing<br><br>All content is strictly for learning — not misuse.<br><br>👉 <a href="cyber-security.html">Explore Cyber Security</a>` },

    // AI & Machine Learning
    { p: /ai\b|artificial intelligence|machine learning|deep learning|neural|ml\b|data science|generative|llm/i,
      r: () => `🤖 <strong>AI & Machine Learning</strong> on CODEZZY:<br><br>• AI Basics → ML Algorithms → Deep Learning → Gen AI<br>• Neural networks, scikit-learn, PyTorch<br>• Prompt engineering & LLM basics<br><br>👉 <a href="ai-ml.html">Explore AI & ML</a>` },

    // Networking
    { p: /network|osi|tcp|udp|dns|router|switch|subnet|ip address|ccna/i,
      r: () => `📡 <strong>Networking</strong> on CODEZZY:<br><br>• OSI Model (7 layers explained)<br>• TCP/IP Protocol Suite<br>• DNS, Routers, Switches, IP Addressing<br>• Subnetting & CCNA prep<br><br>👉 <a href="networking.html">Learn Networking</a>` },

    // Linux
    { p: /linux|ubuntu|terminal|bash|chmod|command line|shell|unix/i,
      r: () => `🐧 <strong>Linux</strong> on CODEZZY:<br><br>• Ubuntu introduction & installation<br>• 50 essential terminal commands<br>• File system hierarchy & permissions<br>• chmod, chown, Bash scripting<br><br>👉 <a href="linux.html">Learn Linux</a>` },

    // Cloud Computing
    { p: /cloud|aws|azure|gcp|saas|paas|iaas|devops|docker|kubernetes|serverless/i,
      r: () => `☁️ <strong>Cloud Computing</strong> on CODEZZY:<br><br>• SaaS, PaaS, IaaS concepts<br>• AWS basics & certification prep<br>• Azure fundamentals (AZ-900)<br>• Docker, Kubernetes, serverless<br><br>👉 <a href="cloud-computing.html">Explore Cloud Computing</a>` },

    // SQL / Database
    { p: /sql|database|mysql|postgresql|sqlite|query|join|select|dbms/i,
      r: () => `🗄️ <strong>SQL</strong> on CODEZZY — beginner to advanced:<br><br>• CREATE, INSERT, SELECT, WHERE<br>• JOINs (INNER, LEFT, RIGHT, FULL)<br>• Aggregate functions & GROUP BY<br>• Subqueries, Indexes, Views, Transactions<br>• 8-week learning roadmap<br><br>👉 <a href="sql.html">Learn SQL</a>` },

    // Domain & Hosting
    { p: /domain|hosting|dns|ssl|deploy|website live|cpanel|vps|shared hosting|netlify|github pages/i,
      r: () => `🖥️ <strong>Domain & Hosting</strong> on CODEZZY:<br><br>• How to register a domain<br>• DNS records configuration<br>• Hosting types (Shared, VPS, Static)<br>• Free SSL with Let's Encrypt<br>• Deploy on Netlify, Vercel, GitHub Pages<br><br>👉 <a href="domain-hosting.html">Learn Domain & Hosting</a>` },

    // Student Corner
    { p: /student corner|exam question|important question|question bank|sem\d|semester exam/i,
      r: () => `🎓 <strong>Student Corner</strong> is CODEZZY's exam prep tool!<br><br>Select your:<br>• Year of Study (1st–4th Year)<br>• Branch (CSE, ECE, Mechanical, etc.)<br>• Semester (1–8)<br>• Subject<br><br>Then get important 2-mark, 5-mark & 10-mark questions.<br><br>👉 <a href="student-corner.html">Go to Student Corner</a>` },
    { p: /1st year|first year|sem 1|sem 2|semester 1|semester 2/i,
      r: () => `📚 <strong>1st Year subjects</strong> in Student Corner:<br><br>Sem 1: Maths I, Physics I, Chemistry I, BEEE, Engineering Graphics, PCE, Physics/Chem Labs<br>Sem 2: Maths II, Physics II, Chemistry II, Engineering Mechanics, Programming Fundamentals, Environmental Studies, Workshop<br><br>👉 <a href="student-corner.html">Access Important Questions</a>` },

    // Career Guidance
    { p: /career|job|internship|resume|cv|linkedin|interview|roadmap|placement|salary/i,
      r: () => `💼 <strong>Career Guidance</strong> on CODEZZY:<br><br>• Resume building & ATS tips<br>• LinkedIn profile optimization<br>• Internship strategy (4-step guide)<br>• Interview Q&A with model answers<br>• 6 career roadmaps (Frontend, Backend, Security, ML, Cloud, Network)<br><br>👉 <a href="career-guidance.html">Get Career Guidance</a>` },
    { p: /frontend (developer|engineer)|learn frontend|become frontend/i,
      r: () => `🎨 <strong>Frontend Developer Roadmap</strong> (12 months):<br><br>Month 1–3: HTML, CSS, JavaScript<br>Month 4–6: React, responsive design, Git<br>Month 7–9: TypeScript, testing, APIs<br>Month 10–12: Portfolio projects & internship applications<br><br>👉 <a href="career-guidance.html#roadmaps">Full Roadmap</a> | 👉 <a href="web-development.html">Start Learning</a>` },
    { p: /backend (developer|engineer)|learn backend/i,
      r: () => `⚙️ <strong>Backend Developer Roadmap</strong> (12 months):<br><br>Month 1–3: Python/Java, SQL, REST APIs<br>Month 4–6: Node.js/Django, auth, databases<br>Month 7–9: Docker, caching, queues<br>Month 10–12: System design, cloud deployment<br><br>👉 <a href="career-guidance.html#roadmaps">Full Roadmap</a>` },
    { p: /ml engineer|data (scientist|engineer)|become ml/i,
      r: () => `🧠 <strong>Data/ML Engineer Roadmap</strong> (12 months):<br><br>Month 1–3: Python, pandas, statistics<br>Month 4–6: scikit-learn, visualization, SQL<br>Month 7–9: Deep learning, PyTorch/TensorFlow<br>Month 10–12: Kaggle, ML deployment, portfolio<br><br>👉 <a href="career-guidance.html#roadmaps">Full Roadmap</a> | 👉 <a href="ai-ml.html">Learn AI/ML</a>` },

    // Resources
    { p: /resource|pdf|note|cheat sheet|download|mcq|interview question|resume template/i,
      r: () => `📄 <strong>Free Resources</strong> on CODEZZY:<br><br>• PDF Notes — DSA, OS, DBMS<br>• Cheat Sheets — Python, Git, Linux, HTML/CSS<br>• Interview Q&A — Java, Frontend, Cyber Security<br>• MCQ Tests — C, Networking, Python<br>• Resume Template & Project Starter Kit<br><br>👉 <a href="resources.html">Browse All Resources</a>` },

    // Blog
    { p: /blog|article|post|read|latest|trending/i,
      r: () => `📝 <strong>CODEZZY Blog</strong> — tech articles for learners:<br><br>• Featured: Python, AI, Web Dev, Career tips<br>• Trending: JavaScript, OWASP, React, DSA<br>• Latest: Git, Accessibility, SQL, REST vs GraphQL<br><br>All articles have estimated read time 📖<br><br>👉 <a href="blog.html">Read the Blog</a>` },

    // FAQ
    { p: /faq|frequently asked|question|help|how does|how do i|can i|do i need/i,
      r: () => `❓ Our <strong>FAQ</strong> has 20 questions covering:<br><br>• Getting started (no account needed!)<br>• Is everything free? Yes!<br>• Cyber security ethics & policies<br>• Dark mode, mobile, offline access<br>• Contributing tutorials<br>• Privacy & ads<br><br>👉 <a href="faq.html">Read the Full FAQ</a>` },

    // Contact
    { p: /contact|email|reach|support|feedback|partner|help team|hello@/i,
      r: () => `📞 <strong>Contact CODEZZY:</strong><br><br>📧 Email: <strong>hello@codezzy.com</strong><br>📍 Location: Bangalore, India<br><br>You can also use our contact form for questions, contributions, or feedback.<br><br>👉 <a href="contact.html">Go to Contact Page</a>` },

    // About
    { p: /about|mission|vision|who made|founder|company|story|history/i,
      r: () => `🏛️ <strong>About CODEZZY:</strong><br><br>Founded in 2024 to democratize tech education for every student in India and beyond.<br><br>Mission: Free, high-quality, beginner-friendly tutorials — no paywalls, ever.<br><br>👉 <a href="about.html">Read Our Full Story</a>` },

    // Dark mode
    { p: /dark mode|light mode|theme|color scheme/i,
      r: () => `🌙 Toggle <strong>dark / light mode</strong> using the moon/sun icon in the top-right header on any page. Your preference is saved automatically.` },

    // Projects
    { p: /project|download project|source code|portfolio project/i,
      r: () => `🚀 Looking for <strong>coding projects</strong>?<br><br>Visit our projects site for HTML, JavaScript, Python, and Final Year capstone projects with source code.<br><br>👉 <a href="https://niksprojects.online" target="_blank" rel="noopener">niksprojects.online</a>` },

    // Search
    { p: /search|find tutorial|look for/i,
      r: () => `🔍 Use the <strong>search bar</strong> in the top-right header to search any tutorial or topic instantly. You can also use the filter bar on the <a href="tutorials.html">Tutorials page</a>.` },

    // Which language to start
    { p: /which language|start with|best language|first language|beginner language/i,
      r: () => `🤔 <strong>Best first language?</strong><br><br>👉 <strong>Python</strong> — simplest syntax, great for AI, data & web<br>👉 <strong>JavaScript</strong> — ideal if you want to build websites<br>👉 <strong>C</strong> — best for understanding how computers work<br><br>Most beginners start with Python 🐍<br><br>👉 <a href="programming.html">See all language roadmaps</a>` },

    // How long to learn
    { p: /how long|time to learn|weeks|months|duration/i,
      r: () => `⏱️ Learning timelines on CODEZZY:<br><br>• Python basics — ~4 weeks<br>• HTML + CSS — ~2 weeks<br>• JavaScript fundamentals — ~4 weeks<br>• React — ~6 weeks<br>• Full career roadmaps — 10–12 months<br><br>Consistency beats speed — even 30 min/day works!<br><br>👉 <a href="career-guidance.html#roadmaps">View full roadmaps</a>` },

    // Certifications
    { p: /certif|certificate|aws certif|comptia|ccna|az-900/i,
      r: () => `🏆 CODEZZY helps you <strong>prepare for certifications</strong>:<br><br>• AWS Cloud Practitioner — <a href="cloud-computing.html">Cloud Computing page</a><br>• CompTIA Security+ — <a href="cyber-security.html">Cyber Security page</a><br>• CCNA — <a href="networking.html">Networking page</a><br>• Azure AZ-900 — <a href="cloud-computing.html">Cloud Computing page</a><br><br>We don't issue certificates ourselves, but we build the skills you need.` },

    // Fallback
    { p: /.*/,
      r: (q) => {
        const suggestions = [
          `<a href="tutorials.html">Browse all tutorials</a>`,
          `<a href="programming.html">Programming</a>`,
          `<a href="web-development.html">Web Development</a>`,
          `<a href="cyber-security.html">Cyber Security</a>`,
          `<a href="ai-ml.html">AI & Machine Learning</a>`,
          `<a href="student-corner.html">Student Corner</a>`,
          `<a href="career-guidance.html">Career Guidance</a>`,
          `<a href="faq.html">FAQ</a>`,
          `<a href="contact.html">Contact Us</a>`,
        ];
        return `🤔 I'm not sure about "<em>${q.slice(0,40)}</em>". Here are some helpful links:<br><br>${suggestions.map(s=>`• ${s}`).join('<br>')}`;
      }
    },
  ];

  function getResponse(input) {
    const q = input.trim();
    for (const item of KB) {
      if (item.p.test(q)) return item.r(q);
    }
    return KB[KB.length - 1].r(q);
  }

  // ── Quick Suggestions ────────────────────────────────────────────────────
  const SUGGESTIONS = [
    'What is CODEZZY?',
    'Learn Python',
    'Web Development',
    'Cyber Security',
    'SQL tutorials',
    'Student Corner',
    'Career Guidance',
    'AI & Machine Learning',
    'Free Resources',
    'Contact CODEZZY',
  ];

  // ── Build UI ──────────────────────────────────────────────────────────────
  function buildChatbot() {
    const style = document.createElement('style');
    style.textContent = `
      #cz-chat-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        width: 56px; height: 56px; border-radius: 50%;
        background: linear-gradient(135deg,#4f46e5,#7c3aed);
        color: #fff; border: none; cursor: pointer;
        box-shadow: 0 4px 20px rgba(79,70,229,0.4);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.5rem; transition: transform 0.3s ease, box-shadow 0.3s ease;
        font-family: inherit;
      }
      #cz-chat-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(79,70,229,0.5); }
      #cz-chat-btn .cz-badge {
        position: absolute; top: -4px; right: -4px;
        width: 18px; height: 18px; background: #ef4444; border-radius: 50%;
        font-size: 0.6rem; font-weight: 700; display: flex; align-items: center; justify-content: center;
        border: 2px solid #fff;
      }
      #cz-chat-win {
        position: fixed; bottom: 90px; right: 24px; z-index: 9998;
        width: 370px; max-width: calc(100vw - 32px);
        background: var(--card-bg, #fff); border: 1px solid var(--border, #e2e8f0);
        border-radius: 20px; box-shadow: 0 20px 60px rgba(79,70,229,0.2);
        display: flex; flex-direction: column; overflow: hidden;
        transform: scale(0.85) translateY(20px); opacity: 0;
        pointer-events: none; transform-origin: bottom right;
        transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
        max-height: 560px;
      }
      #cz-chat-win.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: auto; }
      .cz-header {
        background: linear-gradient(135deg,#4f46e5,#7c3aed);
        color: #fff; padding: 16px 20px;
        display: flex; align-items: center; gap: 12px;
        flex-shrink: 0;
      }
      .cz-header-avatar {
        width: 40px; height: 40px; border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.3rem; flex-shrink: 0;
      }
      .cz-header-info { flex: 1; }
      .cz-header-name { font-size: 0.95rem; font-weight: 700; }
      .cz-header-status { font-size: 0.72rem; opacity: 0.85; display: flex; align-items: center; gap: 5px; }
      .cz-header-status::before { content:''; width:7px; height:7px; border-radius:50%; background:#4ade80; display:inline-block; }
      .cz-close-btn {
        background: rgba(255,255,255,0.15); border: none; color: #fff; cursor: pointer;
        width: 30px; height: 30px; border-radius: 50%; font-size: 1rem;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s; flex-shrink: 0;
      }
      .cz-close-btn:hover { background: rgba(255,255,255,0.3); }
      .cz-msgs {
        flex: 1; overflow-y: auto; padding: 16px; display: flex;
        flex-direction: column; gap: 12px;
        background: var(--bg-secondary, #f8fafc);
        scroll-behavior: smooth;
      }
      .cz-msgs::-webkit-scrollbar { width: 4px; }
      .cz-msgs::-webkit-scrollbar-track { background: transparent; }
      .cz-msgs::-webkit-scrollbar-thumb { background: var(--border,#e2e8f0); border-radius: 2px; }
      .cz-msg { display: flex; gap: 8px; align-items: flex-end; }
      .cz-msg.user { flex-direction: row-reverse; }
      .cz-msg-avatar {
        width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
        background: linear-gradient(135deg,#4f46e5,#7c3aed);
        display: flex; align-items: center; justify-content: center;
        font-size: 0.75rem; color: #fff; font-weight: 700;
      }
      .cz-msg.user .cz-msg-avatar { background: var(--bg-tertiary,#f1f5f9); color: var(--text,#0f172a); }
      .cz-bubble {
        max-width: 85%; padding: 11px 15px; border-radius: 16px;
        font-size: 0.85rem; line-height: 1.55; word-break: break-word;
      }
      .cz-msg.bot .cz-bubble {
        background: var(--card-bg,#fff); color: var(--text,#0f172a);
        border: 1px solid var(--border,#e2e8f0);
        border-bottom-left-radius: 4px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      }
      .cz-msg.user .cz-bubble {
        background: linear-gradient(135deg,#4f46e5,#7c3aed);
        color: #fff; border-bottom-right-radius: 4px;
      }
      .cz-bubble a { color: #4f46e5; font-weight: 600; text-decoration: underline; }
      .cz-msg.user .cz-bubble a { color: #c7d2fe; }
      .cz-typing { display: flex; gap: 4px; align-items: center; padding: 10px 14px; }
      .cz-typing span {
        width: 7px; height: 7px; border-radius: 50%; background: #94a3b8;
        animation: czBounce 1.2s infinite;
      }
      .cz-typing span:nth-child(2) { animation-delay: 0.2s; }
      .cz-typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes czBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
      .cz-suggestions {
        padding: 10px 14px 6px; display: flex; flex-wrap: wrap; gap: 6px;
        background: var(--bg-secondary,#f8fafc);
        border-top: 1px solid var(--border,#e2e8f0); flex-shrink: 0;
      }
      .cz-chip {
        padding: 5px 12px; border-radius: 50px; font-size: 0.74rem; font-weight: 600;
        background: var(--card-bg,#fff); border: 1px solid var(--border,#e2e8f0);
        color: var(--primary,#4f46e5); cursor: pointer;
        transition: all 0.2s; font-family: inherit; white-space: nowrap;
      }
      .cz-chip:hover { background: #4f46e5; color: #fff; border-color: #4f46e5; }
      .cz-input-row {
        display: flex; gap: 8px; padding: 12px 14px;
        border-top: 1px solid var(--border,#e2e8f0);
        background: var(--card-bg,#fff); flex-shrink: 0;
      }
      #cz-input {
        flex: 1; padding: 10px 14px;
        border: 1.5px solid var(--border,#e2e8f0); border-radius: 50px;
        background: var(--bg-secondary,#f8fafc); color: var(--text,#0f172a);
        font-size: 0.875rem; font-family: inherit; outline: none;
        transition: border-color 0.2s;
      }
      #cz-input:focus { border-color: #4f46e5; }
      #cz-send {
        width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
        background: linear-gradient(135deg,#4f46e5,#7c3aed);
        color: #fff; border: none; cursor: pointer; font-size: 1rem;
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      #cz-send:hover { transform: scale(1.1); box-shadow: 0 4px 12px rgba(79,70,229,0.4); }
      @media (max-width: 480px) {
        #cz-chat-win { bottom: 80px; right: 12px; left: 12px; width: auto; }
        #cz-chat-btn { bottom: 16px; right: 16px; }
      }
    `;
    document.head.appendChild(style);

    // Toggle button
    const btn = document.createElement('button');
    btn.id = 'cz-chat-btn';
    btn.setAttribute('aria-label', 'Open CODEZZY chatbot');
    btn.innerHTML = '🤖<span class="cz-badge" id="cz-badge">1</span>';
    document.body.appendChild(btn);

    // Chat window
    const win = document.createElement('div');
    win.id = 'cz-chat-win';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'CODEZZY Chatbot');
    win.innerHTML = `
      <div class="cz-header">
        <div class="cz-header-avatar">🤖</div>
        <div class="cz-header-info">
          <div class="cz-header-name">Cody — CODEZZY Assistant</div>
          <div class="cz-header-status">Online — Ask me anything!</div>
        </div>
        <button class="cz-close-btn" id="cz-close" aria-label="Close chat">✕</button>
      </div>
      <div class="cz-msgs" id="cz-msgs"></div>
      <div class="cz-suggestions" id="cz-suggestions"></div>
      <div class="cz-input-row">
        <input type="text" id="cz-input" placeholder="Ask about tutorials, courses…" autocomplete="off" maxlength="200" aria-label="Chat input">
        <button id="cz-send" aria-label="Send message">➤</button>
      </div>
    `;
    document.body.appendChild(win);

    const msgs    = document.getElementById('cz-msgs');
    const input   = document.getElementById('cz-input');
    const sendBtn = document.getElementById('cz-send');
    const badge   = document.getElementById('cz-badge');
    const suggs   = document.getElementById('cz-suggestions');
    let isOpen    = false;

    function toggleChat() {
      isOpen = !isOpen;
      win.classList.toggle('open', isOpen);
      btn.innerHTML = isOpen ? '✕' : '🤖<span class="cz-badge" id="cz-badge" style="display:none">1</span>';
      if (isOpen) {
        badge.style.display = 'none';
        if (msgs.children.length === 0) {
          addBot(`👋 Hi! I'm <strong>Cody</strong>, your CODEZZY assistant.<br><br>I can help you find tutorials, explore courses, get career advice, and navigate the site.<br><br>What are you looking to learn today?`);
          renderSuggestions();
        }
        setTimeout(() => input.focus(), 100);
      }
    }

    btn.addEventListener('click', toggleChat);
    document.getElementById('cz-close').addEventListener('click', toggleChat);

    function addMsg(html, who) {
      const wrap = document.createElement('div');
      wrap.className = `cz-msg ${who}`;
      const av = document.createElement('div');
      av.className = 'cz-msg-avatar';
      av.textContent = who === 'bot' ? '🤖' : 'You';
      const bub = document.createElement('div');
      bub.className = 'cz-bubble';
      bub.innerHTML = html;
      wrap.appendChild(av);
      wrap.appendChild(bub);
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function addBot(html) { addMsg(html, 'bot'); }
    function addUser(text) { addMsg(text, 'user'); }

    function showTyping() {
      const t = document.createElement('div');
      t.className = 'cz-msg bot'; t.id = 'cz-typing';
      t.innerHTML = `<div class="cz-msg-avatar">🤖</div><div class="cz-bubble"><div class="cz-typing"><span></span><span></span><span></span></div></div>`;
      msgs.appendChild(t);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function hideTyping() {
      const t = document.getElementById('cz-typing');
      if (t) t.remove();
    }

    function renderSuggestions() {
      suggs.innerHTML = '';
      SUGGESTIONS.forEach(s => {
        const chip = document.createElement('button');
        chip.className = 'cz-chip';
        chip.textContent = s;
        chip.addEventListener('click', () => handleSend(s));
        suggs.appendChild(chip);
      });
    }

    function handleSend(text) {
      const q = (text || input.value).trim();
      if (!q) return;
      input.value = '';
      suggs.innerHTML = '';
      addUser(q);
      showTyping();
      setTimeout(() => {
        hideTyping();
        addBot(getResponse(q));
      }, 600 + Math.random() * 400);
    }

    sendBtn.addEventListener('click', () => handleSend());
    input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildChatbot);
  } else {
    buildChatbot();
  }
})();
