import TextUtils from "../utils/TextUtils";

class PromptMetadataService {

    build(prompt: string) {

        return {

            wordCount: TextUtils.wordCount(prompt),

            characterCount: TextUtils.characterCount(prompt),

            sentenceCount: TextUtils.sentenceCount(prompt),

            estimatedTokens: TextUtils.estimatedTokens(prompt),

            readingTime: TextUtils.readingTime(prompt)

        };

    }

}

export default new PromptMetadataService();