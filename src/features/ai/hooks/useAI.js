import { useContext } from "react";
import AIContext from "../context/AIContext";

export default function useAI() {
    return useContext(AIContext);
}