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
            this.attachEvents();
        }    
    }

    private onscroll() {
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

    private attachEvents() {
        this.controller.addEventListener('body', 'onscroll', this.onscroll);
        this.controller.addEventListener('#btn-size', 'onclick', () => this.controller.updateCardSize());
        //this.controller.addEventListener('#btn-filter', 'onclick', () => this.controller.openFilterWindow());
        this.controller.addEventListener('#btn-random', 'onclick', () => this.controller.openCardDetail());
        this.controller.addEventListener('.grid', 'onclick', (e:Event) => this.controller.handleGridClick(e.target));
        this.controller.addEventListener('.modal', 'onclick', (e:Event) => this.controller.closeModal(e.target));
    }

    private handleDataRequest(response: any) {
        sessionStorage.setItem('data-workouts', response);
        this.controller.setWods();
        this.controller.createWorkoutGrid();
        if (typeof localStorage['grid-size'] !== 'undefined' && localStorage['grid-size'] === 'compress') {
            this.controller.updateCardSize();
        }
        this.attachEvents();
    }
}

const app = new App();