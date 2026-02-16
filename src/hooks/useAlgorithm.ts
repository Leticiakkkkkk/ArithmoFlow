import { useState, useRef, useCallback } from "react";
import { sieveGenerator } from "../logic/sieve";
import { euclidGenerator } from "../logic/euclid"; 
import type { Step } from "../logic/types";

export function useAlgorithm(kernel: 'sieve' | 'euclid') {
    const [currentStep, setCurrentStep] = useState<Step<any> | null>(null);
    const [history, setHistory] = useState<Step<any>[]>([]);
    const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");
    const generatorRef = useRef<Generator<Step<any>> | null>(null);

    const next = useCallback(() => {
        if (!generatorRef.current) return;
        
        const result = generatorRef.current.next();
        if (!result.done) {
            const step = result.value;
            setCurrentStep(step);
            setHistory(prev => [...prev, step]);
            
            if (step.isFinished) {
                setStatus("finished");
            }
        } else {
            setStatus("finished");
        }
    }, []);

    const start = useCallback((...args: number[]) => {
        if (kernel === 'sieve') {
            generatorRef.current = sieveGenerator(args[0]);
        } else {
            generatorRef.current = euclidGenerator(args[0], args[1]);
        }

        setStatus("running");
        setHistory([]); 
        
        const firstResult = generatorRef.current.next();
        if (!firstResult.done) {
            setCurrentStep(firstResult.value);
            setHistory([firstResult.value]);
        }
    }, [kernel]);

    const reset = useCallback(() => {
        generatorRef.current = null;
        setCurrentStep(null);
        setHistory([]);
        setStatus("idle");
    }, []);

    return { currentStep, status, start, next, reset, history };
}