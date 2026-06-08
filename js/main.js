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
                    <li><a href="index.html#maintenance">유지보수</a></li>
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



    // Initial check
    reveal();

    // Premium Full-Page Glide Scroll Logic
    const fullSections = document.querySelectorAll('main > section, footer');
    let currentSectionIdx = 0;
    let isScrollingLocked = false;

    if (window.innerWidth > 1024 && document.body.classList.contains('snap-scroll')) {
        window.addEventListener('wheel', (e) => {
            if (isScrollingLocked) return;

            if (Math.abs(e.deltaY) < 15) return; // Ignore small scrolls

            if (e.deltaY > 0) {
                if (currentSectionIdx < fullSections.length - 1) {
                    e.preventDefault();
                    currentSectionIdx++;
                    glidetoSection(currentSectionIdx);
                }
            } else {
                if (currentSectionIdx > 0) {
                    e.preventDefault();
                    currentSectionIdx--;
                    glidetoSection(currentSectionIdx);
                }
            }
        }, { passive: false });
    }

    function glidetoSection(index) {
        isScrollingLocked = true;
        const targetPos = fullSections[index].offsetTop;
        const startPos = window.pageYOffset;
        const distance = targetPos - startPos;
        const duration = 600; // Faster glide
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Faster Quadratic Easing
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, startPos + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                isScrollingLocked = false;
            }
        }
        requestAnimationFrame(animation);
    }

    // Sync index on manual scroll or nav click
    window.addEventListener('scroll', () => {
        if (!document.body.classList.contains('snap-scroll') || isScrollingLocked) return;
        const currentPos = window.pageYOffset + (window.innerHeight / 3);
        fullSections.forEach((sec, i) => {
            if (currentPos >= sec.offsetTop && currentPos < sec.offsetTop + sec.offsetHeight) {
                currentSectionIdx = i;
            }
        });
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.hero-slide');
    const currentSlideText = document.getElementById('currentSlide');
    const progressFill = document.getElementById('sliderProgress');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (slides.length > 0) {
        let currentIdx = 0;
        let isPaused = false;
        let progress = 0;
        const slideDuration = 6000; // 6 seconds per slide
        const intervalTime = 30; 
        let sliderInterval;

        const updateSlide = (index) => {
            slides.forEach(slide => {
                slide.classList.remove('active');
                // Optional: reset videos if needed, but autoplay muted loop usually handles it
            });
            slides[index].classList.add('active');
            if (currentSlideText) {
                currentSlideText.innerText = (index + 1).toString().padStart(2, '0');
            }
            progress = 0;
        };

        const nextSlide = () => {
            currentIdx = (currentIdx + 1) % slides.length;
            updateSlide(currentIdx);
        };

        const prevSlide = () => {
            currentIdx = (currentIdx - 1 + slides.length) % slides.length;
            updateSlide(currentIdx);
        };

        const startSlider = () => {
            sliderInterval = setInterval(() => {
                if (!isPaused) {
                    progress += (intervalTime / slideDuration) * 100;
                    if (progressFill) {
                        progressFill.style.width = `${progress}%`;
                    }
                    if (progress >= 100) {
                        nextSlide();
                    }
                }
            }, intervalTime);
        };

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
        });

        if (playPauseBtn) {
            const playPauseIcon = playPauseBtn.querySelector('i');
            playPauseBtn.addEventListener('click', () => {
                isPaused = !isPaused;
                if (playPauseIcon) {
                    playPauseIcon.className = isPaused ? 'fas fa-play' : 'fas fa-pause';
                }
            });
        }

        startSlider();
    }

    // News Slider Logic
    const newsTrack = document.querySelector('.news-slider-track');
    const newsCards = document.querySelectorAll('.news-card');
    const newsPrev = document.getElementById('newsPrev');
    const newsNext = document.getElementById('newsNext');
    const newsDots = document.querySelectorAll('.news-dot');
    
    if (newsTrack && newsCards.length > 0) {
        let currentNewsIdx = 0;

        const updateNewsSlider = () => {
            const cardWidth = newsCards[0].offsetWidth + 30; // card width + gap
            newsTrack.scrollTo({
                left: currentNewsIdx * cardWidth,
                behavior: 'smooth'
            });
            
            // Update dots
            newsDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentNewsIdx);
            });
        };

        if (newsNext) {
            newsNext.addEventListener('click', () => {
                const cardsVisible = window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1);
                const maxIdx = newsCards.length - cardsVisible;
                if (currentNewsIdx < maxIdx) {
                    currentNewsIdx++;
                } else {
                    currentNewsIdx = 0;
                }
                updateNewsSlider();
            });
        }

        if (newsPrev) {
            newsPrev.addEventListener('click', () => {
                const cardsVisible = window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1);
                const maxIdx = newsCards.length - cardsVisible;
                if (currentNewsIdx > 0) {
                    currentNewsIdx--;
                } else {
                    currentNewsIdx = maxIdx;
                }
                updateNewsSlider();
            });
        }

        newsDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentNewsIdx = i;
                updateNewsSlider();
            });
        });
    }

    // Smoother anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                glidetoSection(0);
            } else {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    // Find index of targetEl in fullSections
                    const idx = Array.from(fullSections).indexOf(targetEl);
                    if (idx !== -1) {
                        glidetoSection(idx);
                    } else {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
});
