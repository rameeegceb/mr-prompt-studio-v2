export default class AudienceDetector {

    static detect(domain) {

        switch (domain) {

            case "Cloud":

                return "Cloud Architects, DevOps Engineers and Technology Leaders";

            case "Agile":

                return "Scrum Masters, Product Owners and Agile Teams";

            case "Architecture":

                return "Solution Architects and Enterprise Architects";

            case "Software Development":

                return "Software Engineers and Technical Leads";

            case "Testing":

                return "QA Engineers and Test Automation Teams";

            case "Business":

                return "Business Leaders and Stakeholders";

            default:

                return "Business Professionals";

        }

    }

}