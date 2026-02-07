import type { Step, SieveState } from "./types";

export function* sieveGenerator(n: number): Generator<Step<SieveState>> {
    let nums = Array.from({ length: n - 1 }, (_, i) => ({
        val: i + 2,
        isPrime: true,
        isCurrent: false,
        isEliminated: false,
    }));
    
    for (let i = 0; i < nums.length; i++) {
        const p = nums[i].val;
        if (nums[i].isPrime) {
            nums[i].isCurrent = true;
            yield {
                state: { numbers: JSON.parse(JSON.stringify(nums)), currentP: p }, 
                description: `O número ${p} é primo. Vamos riscar seus múltiplos.`, 
                isFinished: false
            };
            
            for (let j = i + p; j < nums.length; j += p) {
                if (nums[j].isPrime) {
                    nums[j].isPrime = false;
                    nums[j].isEliminated = true;
                    yield {
                        state: { numbers: JSON.parse(JSON.stringify(nums)), currentP: p },  
                        description: `Riscando o múltiplo ${nums[j].val} de ${p}.`,
                        isFinished: false
                    };
                    nums[j].isEliminated = false;
                }
            }
            nums[i].isCurrent = false;
        }
    }

    const finalState = {
        state: { numbers: nums, currentP: -1 },
        description: "Crivo finalizado!",
        isFinished: true
    };

    yield finalState; 
    return finalState;
}