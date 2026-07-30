import AIProvider from "./AIProvider";

export default class MockProvider extends AIProvider {

    async testConnection(){

        return true;

    }

    async getModels(){

        return [

            {

                name:"mock"

            }

        ];

    }

    async execute(prompt){

        return {

            provider:"mock",

            message:{

                content:`Mock Response\n\n${prompt}`

            }

        };

    }

}