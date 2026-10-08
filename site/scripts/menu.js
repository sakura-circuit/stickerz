const currentPage = window.location.pathname;

document.querySelectorAll(".menu a").forEach((link) => {
    if (link.pathname === currentPage) {
        link.classList.add("active");
    }
});
