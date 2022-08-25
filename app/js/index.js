const hamburgerMenu = document.querySelector(".header-menu");
const circles = document.querySelectorAll(".guide .circle");
const pathLines = document.querySelectorAll(".guide .line");
const searchBtn = document.querySelector(".desktop-search img");
const searchBar = document.querySelector(".desktop-search [type='text']");
const search = document.querySelector(".search__input input");

hamburgerMenu.addEventListener("click", toggleMenu);
searchBtn.addEventListener("click", toggleSearchBar);
window.addEventListener("scroll", debounce(showPath));
window.addEventListener("scroll", debounce(showLine));
search.addEventListener("input", debounce(searchCourse, 300));
searchBar.addEventListener("input", debounce(searchCourse, 300));

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

async function searchCourse(e) {
  const searchResultDiv =
    window.innerWidth < 900
      ? document.querySelector(".search__result")
      : document.querySelector(".search__result--desktop");

  let courses = [];

  if (e.target.value == 0) {
    return (searchResultDiv.style.display = "none");
  }

  searchResultDiv.style.display = "block";

  try {
    displayLoading(searchResultDiv);

    const response = await fetch(
      "https://career-guidance-api.herokuapp.com/api/courses/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: e.target.value }),
      }
    );

    courses = await response.json();

    hideLoading(searchResultDiv);

    if (courses.length != 0) {
      const courseList = courses.map(
        ({ name, description }) =>
          `<li class="search__result__item">
          <span class="search__result__item__title">${name}</span>
          <span class="search__result__item__description">
            ${description.split(" ").splice(0, 20).join(" ").concat("...")}
            </span>
        </li>`
      );

      searchResultDiv.innerHTML = courseList.join("");
    } else {
      searchResultDiv.innerHTML = `<span class="search__result__no-match">Oops looks like there is no match</span>`;
    }
  } catch (err) {
    console.log(err);
  }
}

function displayLoading(element) {
  const loadingDiv = `<li class="loading"></li>`;

  element.innerHTML = loadingDiv;
}
function hideLoading(element) {
  element.innerHTML = "";
}

// function searchCourse(e) {
//   console.log("search function");

//   return fetch("https://career-guidance-api.herokuapp.com/api/courses/search", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ course: e.target.value }),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// }
