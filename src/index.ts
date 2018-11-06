import Controler from './components/controller';

class App {
    private controller = new Controler();

    constructor() {
        if (typeof localStorage['data-workouts'] === 'undefined') {
            this.controller.loadData(this.handleDataRequest.bind(this));
        }
        else {
            this.controller.setWods();
            this.controller.createWorkoutGrid();
        }    

    }

    private handleDataRequest(response: any) {
        localStorage.setItem('data-workouts', response);
        this.controller.setWods();
        this.controller.createWorkoutGrid();
    }
}

const app = new App();
const body: any = document.querySelector('body');

body.onscroll = () => {

    const btnFilterAnimation = `btn-filter btn-filter--${(window.scrollY >= 700) ? 'fadeIn' : 'fadeOut'}`;
    (document.querySelector('.btn-filter') as any).className = btnFilterAnimation;
}