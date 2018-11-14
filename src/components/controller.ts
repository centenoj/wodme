import Configurations from './configurations';
import Request from './request';
import Card from './card';
import Wods from './workouts';

export default class Controller {
    private configs = new Configurations();
    private _endpoint: string = this.configs.get('endpoint');
    private request = new Request(this._endpoint);
    private card = new Card();

    constructor() {}

    private compressCard() {
        this.card.compress();
    }

    private expandCard() {
        this.card.expand();
    }

    loadData(callback: any) {
        this.request.get(callback);
    }

    setWods() {
        const data = sessionStorage['data-workouts'];
        Wods.setData(data);
    }

    createWorkoutGrid() {
        const grid = document.querySelector('.grid');

        Wods.getAll().forEach(wod => {
            const li = document.createElement('li');

            li.innerHTML = this.card.getNode(wod);

            if (grid !== null) grid.appendChild(li);
        });
    }

    updateCardSize() {
        const cardEl: any = document.querySelector('.card');
        const btn: any = document.querySelector('#action-size use');
        
        if (cardEl.className.indexOf('--expand') !== -1) {
            this.compressCard();
            btn.setAttribute('xlink:href', './assets/images/sprite.svg#icon-expand');
            localStorage.setItem('grid-size', 'compress');
        } 
        else {
            this.expandCard();
            btn.setAttribute('xlink:href', './assets/images/sprite.svg#icon-compress');
            localStorage.setItem('grid-size', 'expand');
        }
    }

    openModal(id: number) {
        const modal: any = document.querySelector('.modal');     
        const body: any = document.querySelector('body');   
        const wod = Wods.getById(id);
        
        modal.querySelector('.modal__box').innerHTML = this.card.getNode(wod);
        modal.classList.add('modal--show');

        body.classList.add('noscroll');
    }

    closeModal() {
        const modal: any = document.querySelector('.modal');
        const body: any = document.querySelector('body');   

        modal.querySelector('.modal__box').innerHTML = '';
        modal.classList.remove('modal--show');

        body.classList.remove('noscroll');
    }
}