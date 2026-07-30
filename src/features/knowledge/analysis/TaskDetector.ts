const tasks = [

    "user story",

    "requirements",

    "test case",

    "acceptance criteria",

    "architecture",

    "design",

    "code",

    "prompt",

    "epic",

    "bug"

];

class TaskDetector {

    detect(prompt: string) {

        const text = prompt.toLowerCase();

        return tasks.find(t => text.includes(t)) ?? "";

    }

}

export default new TaskDetector();