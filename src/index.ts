import Controler from './components/controller';
import Workouts from './components/workouts';

class App {
    private controller = new Controler();
    private workouts: Workouts;
    private _data: Workouts;

    constructor() {
        if (typeof localStorage['data-workouts'] === 'undefined') {
            this.controller.loadData(this.handleDataRequest.bind(this));
        }
        else {
            this._data = JSON.parse(localStorage['data-workouts']);
            console.log(this._data);
        }    
        
        console.log(this._data);
        
    }

    private handleDataRequest(response: any) {
        localStorage.setItem('data-workouts', response);
        this._data = JSON.parse(response);
    }
}

var app = new App();