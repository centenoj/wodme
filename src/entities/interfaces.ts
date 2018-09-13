
export default interface Wod {
    types: string[];
    categories: string[];
    equipments: string[];
    workouts: WorkoutList[];
}

interface WorkoutList {
    id: number;
    name: string;
    type: number;
    duration?: number;
    difficulty: number;
    category: number;
    workout: Workout[];
    notes: string;
    results: Result[];
}

interface Workout {
    reps: number;
    rounds: Round[];
}

interface Round {
    exercise: string;
    target: string;
    equipment: number;
}

interface Result {
    date: Date;
    time: {minutes: number; seconds: number};
    notes: string;
}