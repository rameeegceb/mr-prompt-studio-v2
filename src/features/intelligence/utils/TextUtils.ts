export default class TextUtils {

    static normalize(text: string): string {

        return text

            .replace(/\r\n/g, "\n")

            .replace(/\r/g, "\n")

            .trim();

    }

    static wordCount(text: string): number {

        return text

            .trim()

            .split(/\s+/)

            .filter(Boolean)

            .length;

    }

    static characterCount(text: string): number {

        return text.length;

    }

    static sentenceCount(text: string): number {

        return text

            .split(/[.!?]+/)

            .filter(Boolean)

            .length;

    }

    static estimatedTokens(text: string): number {

        return Math.ceil(

            this.wordCount(text) * 1.3

        );

    }

    static readingTime(text: string): number {

        return Math.max(

            1,

            Math.ceil(

                this.wordCount(text) / 200

            )

        );

    }

}