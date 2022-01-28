import clearURL from './clearURL';
import {
  activateNewsletterFormValidation,
  activateReservationFormValidation,
} from './FormValidation';
import activateModal from './modal';
import activateSlider from './slider';

// slider -------------------------------------------

activateSlider();

// Form Validation -----------------------------------

activateReservationFormValidation();

// NewsLetter Email Validation -----------------------

activateNewsletterFormValidation();

// Meal Modal ----------------------------------------

activateModal();

// Clean URL -----------------------------------------

clearURL();
