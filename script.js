document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DIAPORAMA HERO
    const slides = document.querySelectorAll(".slide");
    let currentSlideIndex = 0;
    if(slides.length > 0) {
        setInterval(() => {
            slides[currentSlideIndex].classList.remove("active");
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add("active");
        }, 4000);
    }

    // 2. CHANGEMENT D'ANNÉE
    const years = [
        { id: "year-2025", title: "Galeries Photos 2025" },
        { id: "year-2026", title: "Galeries Photos 2026" }
    ];
    let currentYearIdx = 0;
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const yearTitle = document.getElementById("currentYearTitle");
    const noResultsMessage = document.getElementById("noResultsMessage");

    function updateYearDisplay() {
        years.forEach(year => {
            const el = document.getElementById(year.id);
            if(el) el.classList.remove("active");
        });
        const activeYear = years[currentYearIdx];
        const activeEl = document.getElementById(activeYear.id);
        if(activeEl) activeEl.classList.add("active");
        if(yearTitle) yearTitle.textContent = activeYear.title;
        if(noResultsMessage) noResultsMessage.style.display = "none";
    }

    if(prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            currentYearIdx = (currentYearIdx - 1 + years.length) % years.length;
            updateYearDisplay();
        });
        nextBtn.addEventListener("click", () => {
            currentYearIdx = (currentYearIdx + 1) % years.length;
            updateYearDisplay();
        });
    }

    // 3. SYSTÈME DE TRI ULTRA-ROBUSTE
    document.addEventListener("click", (e) => {
        // On vérifie si on a cliqué sur un bouton d'onglet
        if (e.target.classList.contains("tab-btn")) {
            const clickedBtn = e.target;
            const currentYearContainer = clickedBtn.closest(".year-container");
            
            if (!currentYearContainer) return;

            // Mettre le bouton en actif et éteindre les autres
            const allTabs = currentYearContainer.querySelectorAll(".tab-btn");
            allTabs.forEach(btn => btn.classList.remove("active"));
            clickedBtn.classList.add("active");

            // Filtrer les cartes
            const selectedCategory = clickedBtn.getAttribute("data-category").trim().toLowerCase();
            const allCards = currentYearContainer.querySelectorAll(".event-card");
            let hasVisibleCard = false;

            allCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category").trim().toLowerCase();

                if (selectedCategory === "tous" || selectedCategory === cardCategory) {
                    card.style.setProperty("display", "block", "important");
                    hasVisibleCard = true;
                } else {
                    card.style.setProperty("display", "none", "important");
                }
            });

            // Message si vide
            if (noResultsMessage) {
                noResultsMessage.style.display = hasVisibleCard ? "none" : "block";
            }
        }
    });
});