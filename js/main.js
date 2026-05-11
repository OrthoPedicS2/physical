document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const btnTop = document.getElementById('btnTop');
    
    // Header & Top Button on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            btnTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            btnTop.classList.remove('show');
        }
        
        reveal();
    });

    // Reveal animations
    const reveal = () => {
        const reveals = document.querySelectorAll('.fade-in');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Mobile Navigation Logic
    const body = document.body;
    const navToggle = document.querySelector('.nav-toggle');
    
    // Inject Mobile Nav HTML if not exists
    if (!document.querySelector('.mobile-nav')) {
        const mobileNavHTML = `
            <div class="mobile-nav-overlay"></div>
            <div class="mobile-nav">
                <div class="mobile-close"><i class="fas fa-times"></i></div>
                <ul class="mobile-menu">
                    <li><a href="index.html">홈 (Home)</a></li>
                    <li><a href="index.html#technology">회사소개</a></li>
                    <li><a href="index.html#business">사업분야</a></li>
                    <li><a href="dashboard.html">대시보드</a></li>
                    <li><a href="inquiry_board.html">문의게시판</a></li>
                    <li><a href="free_board.html">자유게시판</a></li>
                    <li><a href="login.html">로그인</a></li>
                    <li><a href="mypage.html">마이페이지</a></li>
                </ul>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', mobileNavHTML);
    }

    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileClose = document.querySelector('.mobile-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            mobileOverlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    const closeNav = () => {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = 'auto';
    };

    if (mobileClose) mobileClose.addEventListener('click', closeNav);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeNav);
    
    // Close mobile nav on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Business Cards Interaction
    const bizCards = document.querySelectorAll('.biz-card');
    bizCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1024) {
                bizCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Language Toggle
    const langBtn = document.querySelector('.lang');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            document.body.classList.toggle('lang-en');
            const currentLang = document.body.classList.contains('lang-en') ? 'EN | KO' : 'KO | EN';
            langBtn.innerText = currentLang;
        });
    }

    // Initial check
    reveal();

    // Smoother anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
