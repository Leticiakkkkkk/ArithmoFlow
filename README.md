# ArithmoFlow

> **Interactive Algorithm Execution Engine // Visual Analysis of Classical Algorithms**

ArithmoFlow is a mathematically rigorous, visually minimalist engine built to visualize the execution of classical computational algorithms in real-time. Designed with architectural scalability and low-level execution control in mind, it transforms static theory into an interactive, step-by-step computational ledger.

## 🚀 Current Architecture State: Phase 4 (Multi-Kernel Logic Swap)

The system currently operates on a bivalent engine architecture, utilizing the **Strategy Pattern** to decouple the user interface from the underlying algorithmic logic. This allows the core engine to seamlessly swap visualization paradigms based on the active mathematical kernel.

### Active Kernels
*   **Sieve of Eratosthenes (`kernel::sieve`)**
    *   **Paradigm:** Batch elimination and array processing.
    *   **Complexity:** $O(n \log \log n)$
    *   **Visualization:** Dynamic rendering of a prime number grid, visually eliminating composite numbers in real-time.
*   **Euclidean Algorithm (`kernel::euclid`)**
    *   **Paradigm:** Successive division and modular arithmetic.
    *   **Complexity:** $O(\log(\min(a, b)))$
    *   **Visualization:** An elegant, typography-focused mathematical ledger displaying $a = q \times b + r$ iterative steps until the Greatest Common Divisor (GCD) is found.

## ✨ Key Features

*   **Multi-Kernel Engine:** Seamless hot-swapping between distinct algorithmic logic cores without UI degradation.
*   **Execution Control:** Adjustable clock speed (0.5x, 1.0x, 2.5x), manual step-by-step processing, and auto-running capabilities.
*   **Live Stream Logging:** Real-time descriptive logging of the active kernel's memory state and mathematical operations.
*   **Dynamic Complexity Metrics:** Real-time updates of Big O asymptotic complexity based on the active execution context.
*   **Engineering Manuscript UI:** A highly polished, distraction-free interface built with monospace UI elements and serif typography for mathematical formulas.

## 🛠️ Tech Stack

*   **Core:** React 18, TypeScript
*   **Styling:** Tailwind CSS (utility-first, minimalist design system)
*   **Icons:** Lucide React
*   **State Management:** Custom React Hooks (`useAlgorithm`) for polymorphic generator orchestration.

## ⚙️ Local Environment Setup

Ensure you have Node.js installed, then clone the repository:

```bash
# Clone the repository
git clone [https://github.com/Leticiakkkkkk/ArithmoFlow.git](https://github.com/Leticiakkkkkk/ArithmoFlow.git)

# Navigate into the directory
cd ArithmoFlow

# Install dependencies
npm install

# Start the execution engine
npm run dev
```
