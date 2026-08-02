import MockProvider from "./MockProvider";
import OllamaProvider from "./OllamaProvider";

export default class ProviderFactory {

    static create(config){

        switch(config.provider){

            case "ollama":

                return new OllamaProvider(config);

            default:

                return new MockProvider(config);

        }

    }

}