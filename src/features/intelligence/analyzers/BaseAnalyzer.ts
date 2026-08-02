export default abstract class BaseAnalyzer {

    abstract analyze(

        prompt: string

    ): string | undefined;

}