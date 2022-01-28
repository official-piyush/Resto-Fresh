// Main Form variables -------------------------------------------

const reservationForm = document.getElementById(`reservationForm`);
const customerNameInput = reservationForm.querySelector(
  `input[name="customer-name"]`
);
const emailInput = reservationForm.querySelector(`input[name = email]`);
const phoneInput = reservationForm.querySelector(`input[name=phone]`);
const peopleCountInput = reservationForm.querySelector(`input[name=count]`);
const messageBox = reservationForm.querySelector(`textarea`);
const submitFormButton = reservationForm.querySelector(`button.submit`);

// NewsLetter Form variables -------------------------------------------
const newsLetterForm = document.querySelector(`.cta-email-form`);
const newsLetterEmailInput = newsLetterForm.querySelector(`input#news-email`);

function setErrorFor(element, msg) {
  const formControl = element.closest(`.form-control`);
  const errorMsg = formControl.querySelector(`small`);
  errorMsg.textContent = msg;
  formControl.classList.add(`error`);
}

function setSuccessFor(element) {
  const formControl = element.closest(`.form-control`);
  formControl.classList.add(`success`);
}

function checkBlank(value) {
  if (value.trim() === ``) {
    return true;
  }
  return false;
}

function validateCustomerName(element) {
  const value = element.value;
  if (!checkBlank(value)) {
    setSuccessFor(element);
  } else {
    setErrorFor(element, `Name Field cannot be Empty!`);
  }
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function validateEmail(element) {
  const value = element.value;
  if (!checkBlank(value)) {
    if (isEmail(value)) {
      setSuccessFor(element);
    } else {
      setErrorFor(element, `Invalid Email!`);
    }
  } else {
    setErrorFor(element, `Email cannot be left blank!`);
  }
}

function validatePhone(element) {
  const value = element.value;
  if (!checkBlank(value)) {
    if (value.match(/\d/g).length === 10) {
      setSuccessFor(element);
    } else {
      setErrorFor(element, `Invalid Format!`);
    }
  } else {
    setErrorFor(element, `Phone number cannot be empty`);
  }
}

function clearClassAndFillValid(event) {
  clearField(event);
  const value = Math.abs(event.target.value);
  if (value >= 1 && value <= 200) {
    event.target.value = value;
  } else {
    event.target.value = null;
    setErrorFor(event.target, `Possible Reservations 1 to 200`);
  }
}

function validatePeopleCount(element) {
  const value = element.value;
  if (!checkBlank(value)) {
    if (value > 0) {
      setSuccessFor(element);
    } else setErrorFor(element, `Minimum count of 1 is required`);
  } else {
    setErrorFor(element, `Field Cannot be left as blank!`);
  }
}

function validateForm(event) {
  let flag = 0;
  event.preventDefault();
  if (
    !customerNameInput.closest(`.form-control`).classList.contains(`success`)
  ) {
    validateCustomerName(customerNameInput);
    flag = 1;
  }

  if (!emailInput.closest(`.form-control`).classList.contains(`success`)) {
    validateEmail(emailInput);
    flag = 1;
  }

  if (!phoneInput.closest(`.form-control`).classList.contains(`success`)) {
    validatePhone(phoneInput);
    flag = 1;
  }

  if (
    !peopleCountInput.closest(`.form-control`).classList.contains(`success`)
  ) {
    validatePeopleCount(peopleCountInput);
    flag = 1;
  }

  if (flag === 0) {
    console.log(`Customer Name - ${customerNameInput.value}`);
    console.log(`Email Id - ${emailInput.value}`);
    console.log(`Phone Number - ${phoneInput.value}`);
    console.log(`Reservations - ${peopleCountInput.value}`);
    console.log(`Message - ${messageBox.value}`);
  }
}

function clearField(event) {
  event.target.closest(`.form-control`).classList.remove(`success`, `error`);
}

function activateReservationFormValidation() {
  customerNameInput.addEventListener(`focusout`, (e) =>
    validateCustomerName(e.target)
  );
  customerNameInput.addEventListener(`input`, clearField);

  emailInput.addEventListener(`focusout`, (e) => validateEmail(e.target));
  emailInput.addEventListener(`input`, clearField);

  phoneInput.addEventListener(`focusout`, (e) => validatePhone(e.target));
  phoneInput.addEventListener(`input`, clearField);

  peopleCountInput.addEventListener(`focusout`, (e) =>
    validatePeopleCount(e.target)
  );
  peopleCountInput.addEventListener(`input`, clearClassAndFillValid);

  reservationForm.addEventListener(`submit`, validateForm);
}

function validateNewsLetterForm(event) {
  event.preventDefault();
  if (
    newsLetterEmailInput.closest(`.form-control`).classList.contains(`success`)
  ) {
    console.log(`News Letter Email ID - ${newsLetterEmailInput.value}`);
  } else {
    validateEmail(newsLetterEmailInput);
  }
}

function activateNewsletterFormValidation() {
  newsLetterEmailInput.addEventListener(`focusout`, (e) =>
    validateEmail(e.target)
  );
  newsLetterEmailInput.addEventListener(`input`, clearField);

  newsLetterForm.addEventListener(`submit`, validateNewsLetterForm);
}

export { activateReservationFormValidation, activateNewsletterFormValidation };
