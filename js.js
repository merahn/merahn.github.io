// for nav 
function openNav() {
  document.querySelector('#mySidenav').style.width = "250px";
  document.body.style.marginLeft = "250px";
  document.querySelector('.all-over-bkg').classList.add('is-visible');

  // Add class to body to adjust modal positioning when the sidebar is open
  document.body.classList.add('sidebar-open');
}

function closeNav() {
  document.querySelector('#mySidenav').style.width = "0";
  document.body.style.marginLeft = "0";
  document.querySelector('.all-over-bkg').classList.remove('is-visible');

  // Remove class when sidebar is closed
  document.body.classList.remove('sidebar-open');
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth > 1100) {
    openNav(); // Open sidebar by default on desktop/tablet
  } else {
    closeNav(); // Ensure it's closed on smaller screens
  }
});


document.querySelector('.openbtn').addEventListener('click', openNav);
document.querySelector('.closebtn').addEventListener('click', closeNav);


// for carousel
document.addEventListener("DOMContentLoaded", function () {
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

    // Resize listener
    window.addEventListener("resize", setSlideWidths);
    setSlideWidths();
  });
});




// scrolling arrow
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Show button when scrolling down
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) { // Show when scrolled 300px
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Scroll back to top smoothly when clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// for the modal
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("imageModal");
  var modalImage = document.getElementById("modalImage");
  var closeButton = document.getElementsByClassName("close")[0];

  function attachClickEvents() {
    var images = document.querySelectorAll(".clickable-image img"); // make sure we're targeting the <img> not the div
    images.forEach(img => {
      img.onclick = function () {
        modal.style.display = "flex";
        modalImage.src = this.src;
        document.getElementById("caption").innerText = this.alt || "";
      };
    });
  }

  // Attach events initially
  attachClickEvents();

  // Also attach on toggle of <details> to catch newly shown content
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
