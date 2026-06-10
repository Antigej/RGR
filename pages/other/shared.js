document.addEventListener("DOMContentLoaded", () => {
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

    // 2. ДИНАМІЧНЕ ЗАВАНТАЖЕННЯ ХЕДЕРА ТА ФУТЕРА
    const headerContainer = document.getElementById("global-header");
    const footerContainer = document.getElementById("global-footer");

    function fixSharedLinks(container, rootPrefix) {
        const links = container.querySelectorAll('a:not([href^="http"])');
        const path = window.location.pathname;
        const currentFile = path.split('/').pop() || 'index.html';

        links.forEach(link => {
            const currentHref = link.getAttribute('href');
            if (!currentHref || currentHref === '#') return;

            link.setAttribute('href', rootPrefix + currentHref);
            const linkFile = currentHref.split('/').pop();

            // Підсвічуємо поточну сторінку
            if (currentFile === linkFile) {
                link.classList.add('active-menu-link');
            } 
            // Підсвічуємо "Предмети", якщо користувач всередині папки subjects
            else if (path.includes('/subjects/') && linkFile === 'subjects.html') {
                link.classList.add('active-menu-link');
            }
        });
    }

    if (headerContainer) {
        fetch(`${root}header-shared.html`)
            .then(res => { if (!res.ok) throw new Error(); return res.text(); })
            .then(data => {
                headerContainer.innerHTML = data;
                fixSharedLinks(headerContainer, root);
            })
            .catch(() => console.error("Не знайдено header-shared.html"));
    }

    if (footerContainer) {
        fetch(`${root}footer-shared.html`)
            .then(res => { if (!res.ok) throw new Error(); return res.text(); })
            .then(data => {
                footerContainer.innerHTML = data;
                fixSharedLinks(footerContainer, root);
            })
            .catch(() => console.error("Не знайдено footer-shared.html"));
    }
});
