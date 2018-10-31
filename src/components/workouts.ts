class Wods {

    private data: any;

    constructor() {}

    setData(source: string) {
        this.data = JSON.parse(source);
    }

    getType(index: number) {
        return this.data.types[index];
    }

    getEquipment(index: number) {
        return this.data.equipments[index];
    }

    getRandom() {
        const randomId:number = Math.floor(Math.random() * this.data.workouts.length);
        return this.data.workouts[randomId];
    }

    getById(id: number) {
        if (id === 0 || id > this.data.workouts.length) return {};

        return this.data.workouts.find((w) => id === w.id);
    }

    getByName(name: string) {
        if (name === '') return {};

        return this.data.workouts.find((w) => name === w.name);
    }

    getByType(type: number) {
        if (type >= this.data.types.length) return [];

        return this.data.workouts.filter((w) => type === w.type);
    }

    getByDifficulty(difficulty: number) {
        return this.data.workouts.filter((w) => difficulty === w.difficulty);
    }

    getByCategory(cat: number) {
        if (cat >= this.data.types.length) return [];

        return this.data.workouts.filter((w) => cat === w.category);
    }

    getAll() {
        return this.data.workouts;
    }
}

const wods = new Wods();
export default wods;
