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
            if (typeof localStorage['grid-size'] !== 'undefined' && localStorage['grid-size'] === 'compress') {
                this.controller.updateCardSize();
            }
        }    

    }

    updateCardSize() {
        this.controller.updateCardSize();
    }

    private handleDataRequest(response: any) {
        localStorage.setItem('data-workouts', response);
        this.controller.setWods();
        this.controller.createWorkoutGrid();
        if (typeof localStorage['grid-size'] !== 'undefined' && localStorage['grid-size'] === 'compress') {
            this.controller.updateCardSize();
        }
    }
}

const app = new App();
const body: any = document.querySelector('body');
const btnCardSize: any = document.querySelectorAll('.btn-filter')[0];
const btnFilter: any = document.querySelectorAll('.btn-filter')[1];

body.onscroll = () => {

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

btnCardSize.onclick = () => {
    app.updateCardSize();    
    return false;
}

btnFilter.onclick = () => {
    
    return false;
}