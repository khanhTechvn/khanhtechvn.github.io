"use strict";

/* =========================================================
   KHANHTECH - SCRIPT
   ========================================================= */


/* =========================================================
   THEME SYSTEM
   Dark / Light + localStorage
   ========================================================= */

const THEME_KEY = "khanhtech-theme";

const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === "light") {
    document.body.classList.add("light");
}


/* Tạo nút Theme nếu chưa có */
const navActions = document.querySelector(".nav-actions");

if (navActions) {

    const themeButton = document.createElement("button");

    themeButton.type = "button";

    themeButton.className = "theme-toggle";

    themeButton.setAttribute(
        "aria-label",
        "Đổi giao diện sáng tối"
    );

    themeButton.innerHTML = `
        <span class="theme-icon">☾</span>
    `;

    navActions.insertBefore(
        themeButton,
        navActions.firstChild
    );


    function updateThemeIcon() {

        const icon =
            themeButton.querySelector(".theme-icon");

        if (!icon) return;

        if (document.body.classList.contains("light")) {

            icon.textContent = "☀";

        } else {

            icon.textContent = "☾";

        }
    }


    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("light");

            const isLight =
                document.body.classList.contains("light");

            localStorage.setItem(
                THEME_KEY,
                isLight ? "light" : "dark"
            );

            updateThemeIcon();
        }
    );


    updateThemeIcon();
}


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar =
    document.querySelector(".navbar");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("navbar-scrolled");

    } else {

        navbar.classList.remove("navbar-scrolled");

    }
}

window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);

updateNavbar();


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-header, " +
    ".product-card, " +
    ".feature, " +
    ".roadmap-item, " +
    ".developer-section, " +
    ".support-section, " +
    ".cta"
);

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            element.classList.add(
                "reveal"
            );

            revealObserver.observe(
                element
            );

        }
    );
}


/* =========================================================
   PRODUCT CARD TILT
   ========================================================= */

const productCards =
    document.querySelectorAll(
        ".product-card"
    );

productCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.matchMedia(
                        "(max-width: 800px)"
                    ).matches
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -3;

                const rotateY =
                    ((x - centerX) / centerX) * 3;

                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-7px)
                    `;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   KHANHOS PREVIEW MOUSE EFFECT
   ========================================================= */

const osWindow =
    document.querySelector(
        ".os-window"
    );

if (osWindow) {

    osWindow.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.matchMedia(
                    "(max-width: 800px)"
                ).matches
            ) {
                return;
            }

            const rect =
                osWindow.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 6;

            const rotateX =
                ((y / rect.height) - 0.5) * -5;

            osWindow.style.transform =
                `
                perspective(1200px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                translateY(-6px)
                `;
        }
    );


    osWindow.addEventListener(
        "mouseleave",
        () => {

            osWindow.style.transform =
                `
                perspective(1200px)
                rotateY(-4deg)
                rotateX(2deg)
                `;

        }
    );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const navMenu =
    document.querySelector(".nav-menu");

if (navMenu) {

    const mobileButton =
        document.createElement("button");

    mobileButton.type =
        "button";

    mobileButton.className =
        "mobile-menu-button";

    mobileButton.setAttribute(
        "aria-label",
        "Mở menu"
    );

    mobileButton.innerHTML =
        "☰";

    const navContainer =
        document.querySelector(
            ".nav-container"
        );

    if (navContainer) {

        navContainer.insertBefore(
            mobileButton,
            navActions
        );

    }


    mobileButton.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle(
                "mobile-open"
            );

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navMenu.classList.remove(
                            "mobile-open"
                        );

                    }
                );

            }
        );
}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const currentYear =
    new Date().getFullYear();

document
    .querySelectorAll(
        ".footer-bottom span"
    )
    .forEach(
        (element) => {

            element.textContent =
                `© ${currentYear} KhanhTech. All rights reserved.`;

        }
    );


/* =========================================================
   DOWNLOAD BUTTON
   ========================================================= */

const downloadButtons =
    document.querySelectorAll(
        'a[href="/download.html"]'
    );

downloadButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                console.log(
                    "KhanhTech: Download page opened."
                );

            }
        );

    }
);


/* =========================================================
   PAGE LOADED
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

        console.log(
            "KhanhTech website loaded successfully."
        );

    }
);
