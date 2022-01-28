const introSlider = document.querySelector(`.wrap-intro-slider`);
const linksList = document.querySelectorAll(`.link`);
const exploreMenu = introSlider.querySelector(`.menu`);
const bookTableButtons = document.querySelectorAll(`.btn-table`);

function changeView(event) {
  event.preventDefault();
  const elementIdWithSpaces = event.target.textContent;
  const elementId = elementIdWithSpaces.replace(/ /g, '');
  document.getElementById(`${elementId}`).scrollIntoView(true);
}

function changeButtonView(event) {
  event.preventDefault();
  const elementId = event.target.dataset.reach;
  document.getElementById(`${elementId}`).scrollIntoView(true);
}

function clearURL() {
  linksList.forEach((link) => {
    link.addEventListener(`click`, changeView);
  });

  exploreMenu.addEventListener(`click`, changeButtonView);

  bookTableButtons.forEach((tableButton) => {
    tableButton.addEventListener(`click`, changeButtonView);
  });
}

export default clearURL;
