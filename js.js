// Immediately set sidebar state before anything renders
if (window.innerWidth > 1430) {
  document.body.style.marginLeft = "250px";
  document.body.classList.add("sidebar-open");
  document.querySelector('#mySidenav').style.width = "250px";
} else {
  document.body.style.marginLeft = "0";
  document.querySelector('#mySidenav').style.width = "0";
  document.body.classList.remove("sidebar-open");
}

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  // Show content after layout is settled
  document.body.style.visibility = "visible";

  // NAV CONTROLS
  function openNav() {
    document.querySelector('#mySidenav').style.width = "250px";
    document.body.style.marginLeft = "250px";
    document.querySelector('.all-over-bkg').classList.add('is-visible');
    document.body.classList.add('sidebar-open');
  }

  function closeNav() {
    document.querySelector('#mySidenav').style.width = "0";
    document.body.style.marginLeft = "0";
    document.querySelector('.all-over-bkg').classList.remove('is-visible');
    document.body.classList.remove('sidebar-open');
  }

  document.querySelector('.openbtn').addEventListener('click', openNav);
  document.querySelector('.closebtn').addEventListener('click', closeNav);

  // CAROUSEL
  document.querySelectorAll(".carousel-container").forEach(container => {
    const carousel = container.querySelector(".carousel");
    const items = carousel.querySelectorAll(".carousel-slide");
    let index = 0;

    function setSlideWidths() {
      const containerWidth = container.offsetWidth;
      items.forEach(item => {
        item.style.width = `${containerWidth}px`;
      });
      carousel.style.width = `${containerWidth * items.length}px`;
      moveCarousel();
    }

    function moveCarousel() {
      const containerWidth = container.offsetWidth;
      const offset = -index * containerWidth;
      carousel.style.transform = `translateX(${offset}px)`;
    }

    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        index = (index - 1 + items.length) % items.length;
        moveCarousel();
      });

      nextBtn.addEventListener("click", () => {
        index = (index + 1) % items.length;
        moveCarousel();
      });
    }

    window.addEventListener("resize", setSlideWidths);
    setSlideWidths();
  });

  // SCROLL TO TOP BUTTON
  const scrollToTopBtn = document.getElementById("scrollToTop");
  window.addEventListener("scroll", function () {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // MODAL IMAGE VIEWER
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeButton = document.getElementsByClassName("close")[0];

  function attachClickEvents() {
    const images = document.querySelectorAll(".clickable-image img");
    images.forEach(img => {
      img.onclick = function () {
        modal.style.display = "flex";
        modalImage.src = this.src;
        document.getElementById("caption").innerText = this.alt || "";
      };
    });
  }

  attachClickEvents();

  document.querySelectorAll("details").forEach(detail => {
    detail.addEventListener("toggle", attachClickEvents);
  });

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
