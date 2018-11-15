import Wods from './workouts';
import Card from './card';

export default class Controller {

    private card = new Card();
    private modal: any = document.querySelector('.modal');
    
    constructor() {}

    open(wod) {
        this.modal.querySelector('.modal__box').innerHTML = this.card.getNode(wod);
        this.modal.classList.add('modal--show');   
        
        (document.querySelector('body') as any).classList.add('noscroll'); 
    }

    close() {
        this.modal.querySelector('.modal__box').innerHTML = '';
        this.modal.classList.remove('modal--show');

        (document.querySelector('body') as any).classList.remove('noscroll'); 
    }
}