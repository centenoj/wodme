import Controler from './components/controller';
import Wods from './components/workouts';

class App {
    private controller = new Controler();
    private wods;

    constructor() {
        if (typeof localStorage['data-workouts'] === 'undefined') {
            this.controller.loadData(this.handleDataRequest.bind(this));
        }
        else {
            const data = localStorage['data-workouts'];
            this.wods = new Wods(data);
            console.log(this.wods.getAll());
        }    
        
        //console.log(this._data);       
        //this.workouts.get();
    }

    private handleDataRequest(response: any) {
        localStorage.setItem('data-workouts', response);
        //this._data = JSON.parse(response);
    }
}

var app = new App();