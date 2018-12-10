import Wods from './workouts';
import Card from './card';

export default class Controller {

    private card = new Card();
    private modal: any = document.querySelector('.modal');
    private container: string;
    
    constructor() {}

    open(template: string, wod?) {

        let templateIsValid: boolean = false;
        if (template === 'card-template') {
            this.container = 'modal__box';
            templateIsValid = true;
            
            this.setContainer(this.container);
            this.modal.querySelector(`.${this.container}`).innerHTML = this.card.getNode(wod);
        }

        if (templateIsValid) {
            this.modal.classList.add('modal--show');
            (document.querySelector('body') as any).classList.add('noscroll'); 
        }
    }

    close() {
        this.modal.querySelector(`.${this.container}`).innerHTML = '';
        this.modal.classList.remove('modal--show');

        (document.querySelector('body') as any).classList.remove('noscroll'); 
    }

    private setContainer(container) {
        this.modal.innerHTML = `<div class="${container}">`;
    }
}