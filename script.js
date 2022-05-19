const hamburgerMenu = document.querySelector(".header-menu");

hamburgerMenu.addEventListener("click", toggleMenu);

function toggleMenu() {
  document.body.classList.toggle("active");
}
