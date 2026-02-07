interface NumberCellProps {
    value: number;
    isPrime: boolean;
    isCurrent: boolean;
    isEliminated: boolean;
}

export const NumberCell = ({ value, isPrime, isCurrent, isEliminated }: NumberCellProps) => {
    let textStyle = "text-slate-600 font-light";
    let decorator = "opacity-0";

    if (isCurrent) {
        textStyle = "text-orange-500 font-medium scale-125 z-10";
        decorator = "opacity-100 bg-orange-500/20 scale-150";
    } else if (isEliminated) {
        textStyle = "text-slate-800 line-through decoration-slate-700/50";
    } else if (isPrime && !isCurrent) {
        textStyle = "text-slate-200 font-normal";
    }

    return (
        <div className="relative w-10 h-10 flex items-center justify-center transition-all duration-500 group">
            <div className={`absolute inset-0 rounded-full transition-all duration-700 ${decorator}`} />
            <span className={`relative text-sm font-serif ${textStyle}`}>
                {value}
            </span>
        </div>
    );
};