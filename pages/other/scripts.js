document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. КОД КЛАСИЧНОГО ГОЛОВНОГО СЛАЙДЕРА (HERO)
    // ==========================================
    const mainTrack = document.getElementById('mainTrack');
    const dots = document.querySelectorAll('.dot');
    
    if (mainTrack && dots.length) {
        const btnPrev = document.getElementById('btnPrev');
        const btnNext = document.getElementById('btnNext');
        const slides = document.querySelectorAll('.slide');
        
        let currentSlide = 0;
        const totalSlides = dots.length;
        let autoPlayTimer = null;

        function updateMainSlider(index) {
            currentSlide = index;
            mainTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            slides.forEach((slide, i) => {
                slide.classList.toggle('active-slide', i === currentSlide);
            });

            dots.forEach(d => d.classList.remove('active-dot'));
            if (dots[currentSlide]) dots[currentSlide].classList.add('active-dot');
            startAutoPlay();
        }

        function startAutoPlay() {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(() => { 
                updateMainSlider((currentSlide + 1) % totalSlides); 
            }, 5000);
        }

        if (btnPrev) btnPrev.addEventListener('click', () => updateMainSlider((currentSlide - 1 + totalSlides) % totalSlides));
        if (btnNext) btnNext.addEventListener('click', () => updateMainSlider((currentSlide + 1) % totalSlides));

        dots.forEach(d => {
            d.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'), 10);
                if (!isNaN(index)) updateMainSlider(index);
            });
        });

        updateMainSlider(0);
    }

    // ==========================================
    // 2. КОД ПАГІНАЦІЇ КАРТОК НОВИН
    // ==========================================
    const cards = document.querySelectorAll(".news-card");
    const buttons = document.querySelectorAll(".page-btn");

    if (cards.length && buttons.length) {
        function showPage(pageNumber) {
            const targetPage = String(pageNumber);

            cards.forEach(card => {
                if (card.closest("#news") && card.getAttribute("data-page") === targetPage) {
                    card.style.display = "flex"; 
                    setTimeout(() => { card.classList.add("fade-in"); }, 10); 
                } else {
                    card.classList.remove("fade-in");
                    card.style.display = "none";
                }
            });

            buttons.forEach(btn => {
                const isActive = btn.getAttribute("data-target") === targetPage;
                btn.classList.toggle("active-page", isActive);
            });

            document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
            document.body.scrollTo({ top: 0, behavior: "smooth" });    
        }

        buttons.forEach(button => {
            button.addEventListener("click", function() {
                const targetPage = this.getAttribute("data-target");
                if (targetPage) showPage(targetPage);
            });
        });

        showPage("1");
    }

    // ==========================================
    // 3. КОД ДРУГОГО СЛАЙДЕРА ПРЕДМЕТІВ
    // ==========================================
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        let position = 0;

        function getSlideWidth() {
            const card = document.querySelector('.choice-slider-track .choice-card');
            const gap = 20; 
            return card ? (card.offsetWidth + gap) : 0;
        }

        nextBtn.addEventListener('click', () => {
            const slideWidth = getSlideWidth();
            const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
            position -= slideWidth;
            if (Math.abs(position) >= maxScroll) {
                position = -maxScroll;
                nextBtn.disabled = true;
            }
            prevBtn.disabled = false;
            track.style.transform = `translateX(${position}px)`;
        });

        prevBtn.addEventListener('click', () => {
            const slideWidth = getSlideWidth();
            position += slideWidth;
            if (position >= 0) {
                position = 0;
                prevBtn.disabled = true;
            }
            nextBtn.disabled = false;
            track.style.transform = `translateX(${position}px)`;
        });

        window.addEventListener('resize', () => {
            position = 0;
            track.style.transform = `translateX(0px)`;
            prevBtn.disabled = true;
            nextBtn.disabled = false;
        });
    }
});
