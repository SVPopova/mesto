function showError(form, input, errorMessage, inputErrorClass, errorClass) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(errorClass);
}


function hideError(form, input, inputErrorClass, errorClass) {
  const error = form.querySelector(`#${input.id}-error`);
  form.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '';
}


function isValid(form, input, inputErrorClass, errorClass) {
  if (!input.validity.valid){
    showError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideError(form, input, inputErrorClass, errorClass);
  }
}


function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}


function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    
  } else {
    buttonElement.removeAttribute('disabled', true);
  }
}


function setEventListeners(form, inputSelector, submitButtonSelector, inputErrorClass, errorClass) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      isValid(form, input, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement);
    });
  });
}


function enableValidation({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(form, inputSelector, submitButtonSelector, inputErrorClass, errorClass);
  });
}
