const coursesWrapper = document.querySelector(".all-course-list");
const btns = document.querySelectorAll(".pagination__btn--number");
const previousBtn = document.querySelector(".pagination__btn--prev");
const nextBtn = document.querySelector(".pagination__btn--next");

let courses, index;
const count = 9;

window.addEventListener("load", getAllCourse);
previousBtn.addEventListener("click", goBackToPrevious);
nextBtn.addEventListener("click", goToNext);
btns.forEach((btn) => btn.addEventListener("click", handleCourses));

async function getAllCourse() {
  const response = await fetch(
    "https://career-guidance-api.herokuapp.com/api/courses"
  );
  courses = await response.json();

  return renderCourses(courses.slice(0, count));
}

function renderCourses(courses) {
  const courseElement = courses.map(
    (course) => `
    <article class="all-course-list__course">
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
