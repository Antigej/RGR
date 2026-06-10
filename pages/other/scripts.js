document.addEventListener("DOMContentLoaded", () => {
    const mainTrack = document.getElementById('mainTrack');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide'); // Знаходимо всі слайди
    
    if (!mainTrack || !dots.length) return;

    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoPlayTimer = null;

    function updateMainSlider(index) {
        currentSlide = index;
        
        // Рухаємо стрічку
        mainTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // КЕРУВАННЯ КЛАСАМИ АНІМАЦІЇ: додаємо активний клас потрібному слайду
        slides.forEach((slide, i) => {
            slide.classList.toggle('active-slide', i === currentSlide);
        });

        // Оновлюємо крапки
        dots.forEach(d => d.classList.remove('active-dot'));
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active-dot');
        }

        startAutoPlay();
    }

    function startAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => { 
            updateMainSlider((currentSlide + 1) % totalSlides); 
        }, 5000);
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            updateMainSlider((currentSlide - 1 + totalSlides) % totalSlides);
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            updateMainSlider((currentSlide + 1) % totalSlides);
        });
    }

    dots.forEach(d => {
        d.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                updateMainSlider(index);
            }
        });
    });

    // Стартуємо та активуємо перший слайд
    updateMainSlider(0);
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".news-card");
    const buttons = document.querySelectorAll(".page-btn");

    // Перевірка, щоб код не падав, якщо елементів раптом немає на сторінці
    if (!cards.length || !buttons.length) return;

    function showPage(pageNumber) {
        const targetPage = String(pageNumber);

        cards.forEach(card => {
            // Перевіряємо тільки ті картки, які належать нашій секції з пагінацією
            if (card.closest("#news") && card.getAttribute("data-page") === targetPage) {
                card.style.display = "flex"; 
                
                // Мікропауза для активації CSS-анімації fade-in
                setTimeout(() => {
                    card.classList.add("fade-in");
                }, 10); 
            } else {
                card.classList.remove("fade-in");
                card.style.display = "none";
            }
        });

        // Перемикання активного класу для 4-х кнопок
        buttons.forEach(btn => {
            const isActive = btn.getAttribute("data-target") === targetPage;
            btn.classList.toggle("active-page", isActive);
        });

        // Плавний скролл угору
document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
document.body.scrollTo({ top: 0, behavior: "smooth" });    

    }

    // ОЖИВЛЯЄМО КНОПКИ: додаємо слухач подій на кожну з 4-х кнопок
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const targetPage = this.getAttribute("data-target");
            if (targetPage) {
                showPage(targetPage);
            }
        });
    });

    // Запускаємо першу сторінку при завантаженні сайту
    showPage("1");
});

            const track = document.getElementById('sliderTrack');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            let position = 0;
            function getSlideWidth() {
                const card = document.querySelector('.choice-slider-track .choice-card');
                const gap = 20; 
                return card.offsetWidth + gap;
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
