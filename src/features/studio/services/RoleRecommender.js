import roleMap from "../data/roleMap";

export default class RoleRecommender {

    static recommend(domain) {

        return roleMap[domain]
            ?? roleMap.General;

    }

}