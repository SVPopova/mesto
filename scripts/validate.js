function showError(form, input, errorMessage) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add('popup__input_error');
  error.textContent = errorMessage;
  error.classList.add('popup__input-error_active');
}


function hideError(form, input) {
  const error = form.querySelector(`#${input.id}-error`);
  form.classList.remove('popup__input-error');
  error.classList.remove('popup__input-error_active');
  error.textContent = '';
}


function isValid(form, input) {
  if (!input.validity.valid){
    showError(form, input, input.validationMessage);
  } else {
    hideError(form, input);
  }
}


function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}


function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
    
  } else {
    console.log(buttonElement);
    buttonElement.classList.remove('popup__button_inactive');
  }
}


function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      isValid(form, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
}


function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
}

enableValidation();