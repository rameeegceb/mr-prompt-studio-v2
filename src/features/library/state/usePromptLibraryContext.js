import { useContext } from "react";

import PromptLibraryContext from "./PromptLibraryContext";

export default function usePromptLibraryContext() {
  return useContext(PromptLibraryContext);
}