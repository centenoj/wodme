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

    const actionButtons = (document.querySelectorAll('.btn-filter') as any);
    actionButtons.forEach(btn => {

        if (window.scrollY >= 700 && btn.className.indexOf('fadeIn') === -1)  {
            btn.className = 'btn-filter btn-filter--fadeIn';
        }

        else if (window.scrollY < 700 && btn.className.indexOf('fadeIn') !== -1) {
            btn.className = 'btn-filter btn-filter--fadeOut';
        }

    });
}