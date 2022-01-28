const specialRecipe = document.querySelector(`.special-recipies`);
const fullMenu = document.querySelector(`.full-menu`);

const foodModal = document.querySelector(`#food-modal`);
const foodModalContent = foodModal.querySelector(`.food-modal-inner`);
const foodModalPreviousButton = foodModalContent.querySelector(`.fma-left`);
const foodModalNextButton = foodModalContent.querySelector(`.fma-right`);

const modalHeader = foodModal.querySelector(`.modal-header`);
const modalImage = foodModal.querySelector(`.food-modal-image`);
const recipeName = foodModal.querySelector(`.modal-recipe-name`);
const recipeDescription = foodModal.querySelector(`.modal-recipe-desciption`);

let meals;
let currentDayMeal;
let currentMeal;
const dataObject = {};

function updateStateToPrevious() {
  if (currentMeal.previousElementSibling) {
    currentMeal = currentMeal.previousElementSibling;
  } else if (currentDayMeal.previousElementSibling) {
    currentDayMeal = currentDayMeal.previousElementSibling;
    currentMeal = currentDayMeal.querySelector(`.last-item`);
  } else {
    currentDayMeal = meals.querySelector(`.last-day-meal`);
    currentMeal = currentDayMeal.querySelector(`.last-item`);
  }

  fetchData();
}

function updateStateToNext() {
  if (currentMeal.nextElementSibling) {
    currentMeal = currentMeal.nextElementSibling;
  } else if (currentDayMeal.nextElementSibling) {
    currentDayMeal = currentDayMeal.nextElementSibling;
    currentMeal = currentDayMeal.querySelector(`.first-item`);
  } else {
    currentDayMeal = meals.querySelector(`.first-day-meal`);
    currentMeal = currentDayMeal.querySelector(`.first-item`);
  }

  fetchData();
}

function closeModal() {
  foodModal.classList.remove(`open`);
  foodModalContent.classList.remove(`open`);

  window.removeEventListener(`keydown`, identifyKey);
  foodModalPreviousButton.removeEventListener(`click`, updateStateToPrevious);
  foodModalNextButton.removeEventListener(`click`, updateStateToNext);
}

function identifyKey(event) {
  event.preventDefault();

  if (event.key === `Escape`) {
    closeModal();
  } else if (event.key === `ArrowLeft`) {
    updateStateToPrevious();
  } else if (event.key === `ArrowRight`) {
    updateStateToNext();
  }
}

function showModal() {
  foodModal.classList.add(`open`);
  foodModalContent.classList.add(`open`);

  window.addEventListener(`keydown`, identifyKey);
  foodModalPreviousButton.addEventListener(`click`, updateStateToPrevious);
  foodModalNextButton.addEventListener(`click`, updateStateToNext);
}

function populateModal() {
  modalHeader.textContent = dataObject.mealType;
  modalImage.src = dataObject.image.src;
  recipeName.textContent = dataObject.mealName;
  recipeDescription.textContent = dataObject.mealDescription;

  showModal();
}

function fetchData() {
  dataObject.image = currentMeal.querySelector(`.fma-img`);
  dataObject.mealType = dataObject.image.dataset.type;
  dataObject.mealName = currentMeal.querySelector(`.meal-name`).textContent;
  dataObject.mealDescription =
    currentMeal.querySelector(`.meal-describe`).textContent;

  populateModal();
}

function updateState(event) {
  currentMeal = event.currentTarget;
  currentDayMeal = currentMeal.closest(`.current-day-meal`);
  meals = currentDayMeal.closest(`.meal`);

  fetchData();
}

function boundClickEvent(meals) {
  const currentMeals = meals.querySelectorAll(`.current-meal`);
  currentMeals.forEach((cm) => {
    cm.addEventListener(`click`, updateState);
  });
}

function closeIfOutside(event) {
  if (!event.target.closest(`.food-modal-inner`)) {
    closeModal();
  }
}

function activateModal() {
  foodModal.addEventListener(`click`, closeIfOutside);
  boundClickEvent(specialRecipe);
  boundClickEvent(fullMenu);
}

export default activateModal;
