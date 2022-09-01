export function displayLoading(element) {
  const loadingDiv = `<div class="loading"></div>`;

  element.innerHTML = loadingDiv;
}
export function hideLoading(element) {
  element.innerHTML = "";
}
