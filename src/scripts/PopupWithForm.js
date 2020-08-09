import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor({formSelector, callback}, popupSelector){
        super(popupSelector);
        this._callback = callback;
        this._form = this._popup.querySelector(formSelector)
    }
    _getInputValues(){
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;      
    }
    _clearInputs(){
            const inputs = this._popup.querySelectorAll('.popup__input');
            if (inputs){
                inputs.forEach(evt =>{
                    evt.value = '';
                });
            }
        }
    close(){
        this._popup.classList.remove('popup_on');
        document.removeEventListener('keydown', this._handleEscClose); 
        this._popup.removeEventListener('click', this._handleBackgroundClose);
        this._clearInputs();
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callback(this._getInputValues());
            this.close();
        } );
    }
}

export { PopupWithForm };