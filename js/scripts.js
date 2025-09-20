/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // Award Image Zoom
    const awardImage = document.getElementById('award-image');
    if (awardImage) {
        awardImage.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the document click listener from firing immediately
            awardImage.classList.toggle('award-zoomed');
        });
    }

    // Close zoom when clicking outside the image
    document.addEventListener('click', (e) => {
        if (awardImage && awardImage.classList.contains('award-zoomed') && !awardImage.contains(e.target)) {
            awardImage.classList.remove('award-zoomed');
        }
    });

    // Theme Switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const themeIcon = themeSwitcher.querySelector('i');

    // Check for saved theme in localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        let theme = 'light';
        if (body.classList.contains('dark-theme')) {
            theme = 'dark';
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme);
    });

    // Fade-in sections on scroll
    const sections = document.querySelectorAll('.resume-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // PDF Export
    const exportButton = document.getElementById('export-pdf');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            // Temporarily open all <details> elements for printing
            const detailsElements = document.querySelectorAll('details');
            const wasOpen = [];
            detailsElements.forEach((details, index) => {
                wasOpen[index] = details.open;
                details.open = true;
            });

            // Use a small timeout to allow the browser to render the open sections
            setTimeout(() => {
                window.print();
            }, 250);

            // Restore the original state after printing
            window.onafterprint = () => {
                detailsElements.forEach((details, index) => {
                    details.open = wasOpen[index];
                });
            };
        });
    }
});
