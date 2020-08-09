import { Popup } from './Popup.js';
import { popupImage, popupFigcaption } from './constants.js';

class PopupWithImage extends Popup {
    constructor(name, link, popupSelector){
        super(popupSelector);
        this._name = name;
        this._link = link;
        this._alt = name;
    }
    open(){
        popupImage.src = this._link;
        popupImage.alt = this._alt;
        popupFigcaption.textContent = this._name;
        this._popup.classList.add('popup_on'); 
        document.addEventListener('keydown', this._handleEscClose); 
        this._popup.addEventListener('click', this._handleBackgroundClose);
 
    }
}
export { PopupWithImage };