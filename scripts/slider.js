const introSlider = document.querySelector(`.wrap-intro-slider`);
const slider = introSlider.querySelector(`.slider`);
const slides = slider.querySelector(`.image`);
const prevSlideButton = slider.querySelector(`.arrow-left`);
const nextSlideButton = slider.querySelector(`.arrow-right`);

let current = slides.querySelector(`.current`) || slides.firstElementChild;
let prev = current.previousElementSibling || slides.lastElementChild;
let next = current.nextElementSibling || slides.firstElementChild;

function displayAndQueue() {
  current.classList.add(`current`);
  prev.classList.add(`prev`);
  next.classList.add(`next`);
}

function move(direction) {
  const classes = [`prev`, `current`, `next`];
  current.classList.remove(...classes);
  prev.classList.remove(...classes);
  next.classList.remove(...classes);

  if (direction === `backwards`) {
    [prev, current, next] = [
      prev.previousElementSibling || slides.lastElementChild,
      prev,
      current,
    ];
  } else {
    [prev, current, next] = [
      current,
      next,
      next.nextElementSibling || slides.firstElementChild,
    ];
  }

  displayAndQueue();
}

function activateSlider() {
  displayAndQueue();

  prevSlideButton.addEventListener(`click`, () => move(`backwards`));
  nextSlideButton.addEventListener(`click`, move);
}

export default activateSlider;
