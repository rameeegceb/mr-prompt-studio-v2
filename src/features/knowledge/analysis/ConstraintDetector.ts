class ConstraintDetector {

    detect(prompt: string): string[] {

        const constraints: string[] = [];

        const text = prompt.toLowerCase();

        if (text.includes("concise"))
            constraints.push("Concise");

        if (text.includes("step by step"))
            constraints.push("Step-by-Step");

        if (text.includes("professional"))
            constraints.push("Professional");

        if (text.includes("bullet"))
            constraints.push("Bullet Points");

        return constraints;

    }

}

export default new ConstraintDetector();