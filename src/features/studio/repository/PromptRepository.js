class PromptRepository {

    STORAGE_KEY =
        "mrpromptstudio.prompt";

    save(prompt) {

        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(prompt)
        );

    }

    load() {

        const value =
            localStorage.getItem(
                this.STORAGE_KEY
            );

        if (!value) return null;

        return JSON.parse(value);

    }

    clear() {

        localStorage.removeItem(
            this.STORAGE_KEY
        );

    }

}

export default new PromptRepository();