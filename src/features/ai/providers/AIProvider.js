export default class AIProvider {

    async initialize() {
        throw new Error("initialize() not implemented");
    }

    async execute() {
        throw new Error("execute() not implemented");
    }

    async testConnection() {
        throw new Error("testConnection() not implemented");
    }

    async getModels() {
        throw new Error("getModels() not implemented");
    }

    async dispose() {}

}