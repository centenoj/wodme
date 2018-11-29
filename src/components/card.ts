import template from '../data/card-template';
import Wods from './workouts';

export default class Card {

    constructor() {}

    getNode(wod: any) {
        return this.getTemplate(template, wod);
    }

    compress() {
        document.querySelectorAll('.card:not(#modal-card)').forEach(c => {
            c.classList.remove('card--expand');
            c.classList.add('card--compress');
        });

        document.querySelectorAll('.card__header:not(#modal-card-header)').forEach(h => {
            h.classList.remove('card__header--expand');
            h.classList.add('card__header--compress');
        });

        document.querySelectorAll('.card__image:not(#modal-card-image)').forEach((img: any) => {
            let backgroundImg = `linear-gradient(to right bottom, rgba(0,0,0, 0.9), rgba(44, 100, 109, 0.7)), ${img.style.backgroundImage}`;
            img.style.backgroundImage = backgroundImg;
        })

        document.querySelectorAll('.card__title-box').forEach(tb => {
            tb.classList.add('card__title-box--compress');
        });

        document.querySelectorAll('.card__title').forEach(t => {
            t.classList.add('card__title--compress');
        });

        document.querySelectorAll('.card__content').forEach(cnt => {
            cnt.classList.add('card__content--compress');
        });
        
        (document.querySelector('.grid') as any).classList.add('grid--compress');
    }

    expand() {
        document.querySelectorAll('.card').forEach(c => {
            c.classList.remove('card--compress');
            c.classList.add('card--expand');
        });

        document.querySelectorAll('.card__header ').forEach(h => {
            h.classList.add('card__header--expand');
            h.classList.remove('card__header--compress');
        });

        document.querySelectorAll('.card__image').forEach((img: any) => {
            let backgroundImg = `url${img.style.backgroundImage.split('url')[1]}`;
            img.style.backgroundImage = backgroundImg;
        })

        document.querySelectorAll('.card__title-box').forEach(tb => {
            tb.classList.remove('card__title-box--compress');
        });

        document.querySelectorAll('.card__title').forEach(t => {
            t.classList.remove('card__title--compress');
        });

        document.querySelectorAll('.card__content').forEach(cnt => {
            cnt.classList.remove('card__content--compress');
        });    
        
        (document.querySelector('.grid') as any).classList.remove('grid--compress');
    }

    private getTemplate(template, obj) {

        let wod = Object.assign({}, obj);
        wod.typeName = Wods.getType(obj.type);
        wod.duration = typeof obj.duration !== 'undefined' ? obj.duration : '';
        wod.rounds = this.getRounds(obj);
        wod.best = this.getBest(obj);
        wod.notes = obj.notes;
        wod.noteDisplay = (obj.notes === '') ? 'card__tooltip--hidden' : '';

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

        return `<li ${roundClass}><b>${r.target}</b> ${Wods.getExercise(r.exercise)} ${equipment}</li>`;
    }
}