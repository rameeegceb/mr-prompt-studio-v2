import RequestPipeline from "../pipeline/RequestPipeline";

class RuntimeEngine {

    async execute(request: any) {

        return await RequestPipeline.execute(request);

    }

}

export default new RuntimeEngine();