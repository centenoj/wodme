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

    loadData(callback: any) {
        this.request.get(callback);
    }

    setWods() {
        const data = localStorage['data-workouts'];
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
}