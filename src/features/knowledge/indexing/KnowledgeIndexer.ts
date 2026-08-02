import SearchIndex from "./SearchIndex";
import KnowledgeRepository from "../repository/KnowledgeRepository";
import { Framework } from "../models/Framework";

class KnowledgeIndexer {

    build() {

        SearchIndex.clear();

        const frameworks = KnowledgeRepository.getFrameworks();

        frameworks.forEach(f => {

            f.keywords = this.extractKeywords(f);

            f.tags = this.extractTags(f);

            f.roles = this.extractRoles(f);

            f.domains = this.extractDomains(f);

            f.lifecycle = this.extractLifecycle(f);

            f.relatedFrameworks = [];

        });

        SearchIndex.addMany(frameworks);

    }

    private extractKeywords(framework: Framework): string[] {

        const text = [
            framework.title,
            framework.description,
            framework.content
        ].join(" ").toLowerCase();

        return [...new Set(
            text
                .replace(/[^\w\s]/g, " ")
                .split(/\s+/)
                .filter(w => w.length > 3)
        )];

    }

    private extractTags(framework: Framework): string[] {

        return framework.title
            .toLowerCase()
            .split(" ")
            .filter(x => x.length > 2);

    }

    private extractRoles(framework: Framework): string[] {

        const roles = [
            "product owner",
            "scrum master",
            "business analyst",
            "developer",
            "architect",
            "qa",
            "tester",
            "manager",
            "product manager",
            "tech lead"
        ];

        const text = JSON.stringify(framework).toLowerCase();

        return roles.filter(role => text.includes(role));

    }

    private extractDomains(framework: Framework): string[] {

        const domains = [
            "agile",
            "cloud",
            "testing",
            "security",
            "architecture",
            "devops",
            "ai",
            "product",
            "business"
        ];

        const text = JSON.stringify(framework).toLowerCase();

        return domains.filter(d => text.includes(d));

    }

    private extractLifecycle(framework: Framework): string[] {

        const lifecycle = [
            "planning",
            "analysis",
            "design",
            "development",
            "testing",
            "deployment",
            "release",
            "retrospective"
        ];

        const text = JSON.stringify(framework).toLowerCase();

        return lifecycle.filter(s => text.includes(s));

    }

}

export default new KnowledgeIndexer();