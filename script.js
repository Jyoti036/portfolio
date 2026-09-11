document.addEventListener("DOMContentLoaded", () => {
    // ১. নেভিগেশন লিংক এবং সব সেকশন সিলেক্ট করা
    const navLinks = document.querySelectorAll("nav ul li a");
    const allSections = document.querySelectorAll("section[id]");

    // ২. স্মুথ এবং নির্ভুল Active Link Highlighting (IntersectionObserver দিয়ে)
    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -55% 0px", // স্ক্রিনের টপ-মিডল পজিশন পর্যবেক্ষণ করবে
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");

                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    allSections.forEach(section => sectionObserver.observe(section));

    // ৩. পেজের একদম নিচে গেলে শেষের নেভ-বাটন একুরেটলি হাইলাইট করার ফিক্স
    window.addEventListener("scroll", () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            const lastSection = allSections[allSections.length - 1];
            if (lastSection) {
                const lastId = lastSection.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${lastId}`) {
                        link.classList.add("active");
                    }
                });
            }
        }
    }, { passive: true });

    // ৪. "Explore More" বাটন থেকে "About" সেকশনে স্মুথ স্ক্রল
    const exploreBtn = document.querySelector(".hero-text button");
    const aboutSection = document.getElementById("about");

    if (exploreBtn && aboutSection) {
        exploreBtn.addEventListener("click", () => {
            aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
});