import Controler from './components/controller';

class App {
    private controller = new Controler();

    constructor() {
        if (typeof sessionStorage['data-workouts'] === 'undefined') {
            this.controller.loadData(this.handleDataRequest.bind(this));
        }
        else {
            this.controller.setWods();
            this.controller.createWorkoutGrid();
            if (typeof localStorage['grid-size'] !== 'undefined' && localStorage['grid-size'] === 'compress') {
                this.controller.updateCardSize();
            }
        }    

        const cardList : any = document.querySelectorAll('.card__header');
        const body: any = document.querySelector('body');
        const btnCardSize: any = document.querySelector('#btn-size');
        const btnFilter: any = document.querySelector('#btn-filter');
        const btnRandom: any = document.querySelector('#btn-random');
        const modal: any = document.querySelector('.modal');

        cardList.forEach(c => {
            c.onclick = (e:Event) => {
                if (c.className.indexOf('card__header--compress') !== -1) {
                    this.controller.openModal(parseInt(c.parentElement.getAttribute('data-id')));
                }
            }
        });
        
        body.onscroll = (e: Event) => this.onscroll();
        
        btnCardSize.onclick = () => {
            this.updateCardSize();    
            return false;
        }
        
        btnFilter.onclick = () => {
            return false;
        }

        btnRandom.onclick = () => {
            window.scrollTo(0, 950);
            this.controller.openModal();
            return false;
        }

        modal.onclick = (e: Event) => {
            this.controller.closeModal(e.target);
        }
    }

    onscroll() {
        const scrollPosition = 700;
        const actionButtons = (document.querySelectorAll('.btn-filter') as any);
        actionButtons.forEach(btn => {
    
            if (window.scrollY >= scrollPosition && btn.className.indexOf('fadeIn') === -1)  {
                btn.className = 'btn-filter btn-filter--fadeIn';
            }
    
            else if (window.scrollY < scrollPosition && btn.className.indexOf('fadeIn') !== -1) {
                btn.className = 'btn-filter btn-filter--fadeOut';
            }
    
        });
    }

    updateCardSize() {
        this.controller.updateCardSize();
    }

    private handleDataRequest(response: any) {
        sessionStorage.setItem('data-workouts', response);
        this.controller.setWods();
        this.controller.createWorkoutGrid();
        if (typeof localStorage['grid-size'] !== 'undefined' && localStorage['grid-size'] === 'compress') {
            this.controller.updateCardSize();
        }
    }
}

const app = new App();