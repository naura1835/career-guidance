const hamburgerMenu = document.querySelector(".header-menu");
const circles = document.querySelectorAll(".guide .circle");
const pathLines = document.querySelectorAll(".guide .line");
const searchBtn = document.querySelector(".desktop-search img");
const searchBar = document.querySelector(".desktop-search [type='text']");

hamburgerMenu.addEventListener("click", toggleMenu);
searchBtn.addEventListener("click", toggleSearchBar);
window.addEventListener("scroll", debounce(showPath));
window.addEventListener("scroll", debounce(showLine));

//toggle desktop version search
function toggleSearchBar() {
  setTimeout(() => {
    searchBar.classList.toggle("search-bar--active");
  }, 400);
}

function debounce(func, delay = 20) {
  var timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function showPath(e) {
  circles.forEach((circle) => {
    // when to tigger the path animation, slightly above the bottom of the window;
    const trigger =
      window.scrollY + window.innerHeight - circle.offsetHeight / 8;
    const isShown = trigger > circle.offsetTop;

    if (isShown) circle.classList.add("psuedo-update");
    else circle.classList.remove("psuedo-update");
  });
}

function showLine() {
  pathLines.forEach(function (line) {
    const scrollDistance = window.scrollY + window.innerHeight - line.offsetTop;
    const progressHeight = scrollDistance / line.offsetHeight;
    const height = Math.round(progressHeight * 100) + "%";

    line.children[0].style.height = height;
  });
}

//open/close menu
function toggleMenu() {
  document.body.classList.toggle("active");
}
