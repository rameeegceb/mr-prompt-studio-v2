export interface AIProvider {

    generate(
        request: AIRequest
    ): Promise<AIResponse>;

}