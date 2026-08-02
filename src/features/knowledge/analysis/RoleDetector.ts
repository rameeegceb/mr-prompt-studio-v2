const roles = [

    "business analyst",

    "product owner",

    "scrum master",

    "developer",

    "architect",

    "tester",

    "qa",

    "manager",

    "project manager"

];

class RoleDetector {

    detect(prompt: string) {

        const text = prompt.toLowerCase();

        return roles.find(r => text.includes(r)) ?? "";

    }

}

export default new RoleDetector();