import { debounce } from "./util.js";
import { displayLoading, hideLoading } from "./loading.js";

const coursesWrapper = document.querySelector(".all-courses-list");
const btns = document.querySelectorAll(".pagination__btn--number");
const previousBtn = document.querySelector(".pagination__btn--prev");
const nextBtn = document.querySelector(".pagination__btn--next");
const filterSearch = document.querySelector(
  ".all-courses__introduction__search input"
);
const paginationWrapper = document.querySelector('[aria-label="pagination"]');

let courses,
  index = 0;
const count = 9;

window.addEventListener("load", getAllCourse);
previousBtn.addEventListener("click", goBackToPrevious);
nextBtn.addEventListener("click", goToNext);
btns.forEach((btn) => btn.addEventListener("click", handleCourses));
filterSearch.addEventListener("input", debounce(filterCourses, 300));

async function getAllCourse() {
  try {
    displayLoading(coursesWrapper);

    const response = await fetch(
      "https://career-guidance-api.herokuapp.com/api/courses"
    );
    courses = await response.json();

    hideLoading(coursesWrapper);

    renderCourses(courses.slice(0, count));
  } catch (err) {
    console.log(err);
  }
}

async function filterCourses(e) {
  if (!e.target.value) {
    renderCourses(courses.slice(0, count));

    paginationWrapper.style.display = "block";
  } else {
    try {
      displayLoading(coursesWrapper);

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
      const filteredCourses = await response.json();

      hideLoading(coursesWrapper);
      renderCourses(filteredCourses);

      paginationWrapper.style.display = "none";
    } catch (err) {
      console.error(err);
    }
  }
}

function renderCourses(courses) {
  const courseElement = courses.map(
    (course) => `
    <article class="all-courses-list__course">
      <h3>${course.name}</h3>
      <p>${course.description
        .split(" ")
        .splice(0, 20)
        .join(" ")
        .concat("...")}</p>
    </article>`
  );
  coursesWrapper.innerHTML = courseElement.join("");

  window.scrollTo(0, 0);
}

function handleCourses(e) {
  index = parseInt(e.target.value);

  const slicedCourses = courses.slice(index, index + count);

  renderCourses(slicedCourses);
}

function goBackToPrevious() {
  if (index == 0) return;

  index = index - count;

  const slicedCourses = courses.slice(index, index + count);

  renderCourses(slicedCourses);
}

function goToNext() {
  if (index >= courses.length) return;

  index = index + count;

  const slicedCourses = courses.slice(index, index + count);

  renderCourses(slicedCourses);
}
