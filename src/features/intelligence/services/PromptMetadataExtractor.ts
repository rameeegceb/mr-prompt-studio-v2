import TextUtils from "../utils/TextUtils";

export default class PromptMetadataService {

    build(prompt: string) {

        return {

            wordCount:

                TextUtils.wordCount(prompt),

            characterCount:

                TextUtils.characterCount(prompt),

            sentenceCount:

                TextUtils.sentenceCount(prompt),

            estimatedTokens:

                TextUtils.estimatedTokens(prompt),

            readingTime:

                TextUtils.readingTime(prompt)

        };

    }

}