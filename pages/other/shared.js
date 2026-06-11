$(document).ready(function() {
    
    // 1. АВТОМАТИЧНЕ ОБЧИСЛЕННЯ ШЛЯХУ ДО КОРЕНЯ ПРОЄКТУ
    const getRootPath = () => {
        const path = window.location.pathname;
        if (path.includes('/subjects/')) {
            return '../../';
        }
        if (path.includes('/pages/')) {
            return '../';
        }
        return '';
    };
    const root = getRootPath();
    // 2. ДИНАМІЧНЕ ЗАВАНТАЖЕННЯ ХЕДЕРА ТА ФУТЕРА ЧЕРЕЗ JQUERY
    if ($('#global-header').length) {
        $('#global-header').load(root + 'header-shared.html', function() {
            fixSharedLinks($(this), root);
        });
    }
    if ($('#global-footer').length) {
        $('#global-footer').load(root + 'footer-shared.html', function() {
            fixSharedLinks($(this), root);
        });
    }
    function fixSharedLinks($container, rootPrefix) {
        const path = window.location.pathname;
        const currentFile = path.split('/').pop() || 'index.html';
        $container.find('a:not([href^="http"])').each(function() {
            const $link = $(this);
            const currentHref = $link.attr('href');
            if (!currentHref || currentHref === '#') return;
            // Налаштовуємо правильний відносний шлях для кожної сторінки сайту
            $link.attr('href', rootPrefix + currentHref);
            const linkFile = currentHref.split('/').pop();
            // ЧІТКА ЛОГІКА ПІДСВІЧУВАННЯ БЕЗ КОНФЛІКТІВ:
            // 1. Якщо це посилання всередині випадаючого меню (dropdown-menu)
            if ($link.closest('.dropdown-menu').length) {
                if (currentFile === linkFile) {
                    $link.addClass('active-menu-link');
                }
            } 
            // 2. Якщо це головні кнопки навігації (включаючи самі "Предмети")
            else {
                // Прямий збіг файлу для звичайних сторінок (news, contacts тощо)
                if (currentFile === linkFile) {
                    $link.addClass('active-menu-link');
                } 
                // Якщо ми всередині папки предметів, підсвічуємо головну кнопку "Предмети"
                else if (path.includes('/subjects/') && linkFile === 'subjects.html') {
                    $link.addClass('active-menu-link');
                }
                // Якщо ми на сторінці галереї, ТАКОЖ підсвічуємо головну кнопку "Предмети"
                else if (currentFile === 'gallery.html' && linkFile === 'subjects.html') {
                    $link.addClass('active-menu-link');
                }
            }
        });
    }
    // 4. СЦЕНАРІЙ ДЛЯ МОБІЛЬНИХ ПРИСТРОЇВ (ТАП ДЛЯ DROPDOWN)
    $(document).on('click', '.dropdown-toggle', function(e) {
        if ($(window).width() <= 768) {
            e.preventDefault(); // Забороняємо негайний перехід по посиланню
            $(this).parent('.dropdown').toggleClass('open');
        }
    });
        // ЛОГІКА ЗБІЛЬШЕННЯ КАРТИНКИ ПРИ КЛИКУ (LIGHTBOX)
    // Працює через делегування подій для стабільності на сторінці галереї
    $(document).on('click', '.gallery-item img', function() {
        const imgSrc = $(this).attr('src');   // Беремо шлях до картинки
        const imgAlt = $(this).attr('alt');   // Беремо текст опису

        $('#modalImg').attr('src', imgSrc);   // Підставляємо в модалку
        $('#modalCaption').text(imgAlt);      // Підставляємо текст

        $('#galleryModal').fadeIn(200, function() {
            $(this).addClass('active');       // Плавно відкриваємо та масштабуємо
        });
    });
    // ЗАКРИТТЯ МОДАЛЬНОГО ВІКНА (при кліку на хрестик або на темний фон)
    $(document).on('click', '.g-close, #galleryModal', function(e) {
        // Якщо клікнули на саму велику картинку — не закриваємо
        if ($(e.target).is('#modalImg')) return;

        $('#galleryModal').removeClass('active').fadeOut(200);
    });
});
