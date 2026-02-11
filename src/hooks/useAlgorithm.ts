import { useState, useRef, useCallback } from "react";
import { sieveGenerator } from "../logic/sieve";
import type { Step, SieveState } from "../logic/types";

export function useAlgorithm() {
    const [currentStep, setCurrentStep] = useState<Step<SieveState> | null>(null);
    const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");
    const generatorRef = useRef<Generator<Step<SieveState>> | null>(null);

    const next = useCallback(() => {
        if (!generatorRef.current) return;
        
        const result = generatorRef.current.next();
        if (!result.done) {
            setCurrentStep(result.value);
            if (result.value.isFinished) setStatus("finished");
        } else {
            setStatus("finished");
        }
    }, []);

    const start = useCallback((n: number) => {
        generatorRef.current = sieveGenerator(n);
        setStatus("running");
        next();
    }, [next]);

    const reset = useCallback(() => {
        generatorRef.current = null;
        setCurrentStep(null);
        setStatus("idle");
    }, []);

    return { currentStep, status, start, next, reset };
}
