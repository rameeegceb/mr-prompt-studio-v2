import { useContext } from "react";
import LearningContext from "./LearningContext";

export default function useLearningContext() {
  const context = useContext(
    LearningContext
  );

  if (!context) {
    throw new Error(
      "useLearningContext must be used inside LearningProvider."
    );
  }

  return context;
}