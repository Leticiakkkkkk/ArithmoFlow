import type { Step, EuclidState } from "./types";

export function* euclidGenerator(
    a: number,
    b: number
): Generator<Step<EuclidState>> {
    let currA = a;
    let currB = b;

    while (currB !== 0) {
        let r = currA % currB;

        yield {
            state: {
                a: currA,
                b: currB,
                remainder: r,
                stepDescription: `${currA} = ${Math.floor(currA / currB)} × ${currB} + ${r}`,
            },
            description: `Dividimos ${currA} por ${currB}. O resto é ${r}.`,
            isFinished: false,
        };

        currA = currB;
        currB = r;
    }

    const finalState = {
        state: {
            a: currA,
            b: 0,
            remainder: 0,
            stepDescription: "MDC encontrado!",
        },
        description: `O Máximo Divisor Comum é ${currA}.`,
        isFinished: true,
    };

    yield finalState; 
    return finalState;
}