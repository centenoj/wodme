import template from '../data/card-template';
import Wods from './workouts';

export default class Card {

    constructor() {}

    getNode(wod: any) {
        return this.getTemplate(template, wod);
    }

    private getTemplate(template, obj) {

        let wod = Object.assign({}, obj);
        wod.typeName = Wods.getType(obj.type);
        wod.duration = typeof obj.duration !== 'undefined' ? obj.duration : '';
        wod.rounds = this.getRounds(obj);
        wod.best = this.getBest(obj);
        wod.notes = obj.best.notes;

        return this.interpolate(template, wod);
    }

    private getRounds(wod) {

        let rounds = '';

        wod.workout.forEach(wk => {

            wk.rounds.forEach((r, i) => {
                rounds += this.createRound(r, (i === 0) ? 'card__rounds--first' : '');
            });

            if (typeof wk.reps !== 'undefined') {
                rounds += `<li class="card__count"><b>Reps: </b>${wk.reps}</li>`
            }
            
        });

        return rounds;
    }

    private getBest(wod) {

        if (Object.keys(wod.best).length === 0) {
            return wod.type === 0 ? '--' : '--:--';
        }

        if (typeof wod.best.time !== 'undefined') {
            if (wod.best.time === 0) return '--:--';

            let time = {
                min: Math.floor(wod.best.time / 60),
                sec: wod.best.time % 60
            }

            return `${time.min}:${time.sec}`;
        }

        else if (typeof wod.best.rounds !== 'undefined') {
            return `${wod.best.rounds}`;
        }

        return '--';
    }

    private interpolate(value: string, params: {}) {
        return value.replace(/{([^{}]*)}/g, (a, b) => {
            return params[b] || a;
        });
    }

    private createRound(r, className) {
        const roundClass = (className) ? `class="${className}"` : '';
        const equipment = (r.equipment !== 0) ? `(${Wods.getEquipment(r.equipment)})` : '';

        return `<li ${roundClass}><b>${r.target}</b> ${r.exercise} ${equipment}</li>`;
    }
}