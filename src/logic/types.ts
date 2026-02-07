export type Step<T> = {
    state: T;
    description: string;
    isFinished: boolean;
};

export interface SieveState {
    numbers: { val: number; isPrime: boolean; isCurrent: boolean; isEliminated: boolean }[];
    currentP: number;
}

export interface EuclidState {
    a: number;
    b: number;
    remainder: number;
    stepDescription: string;
}