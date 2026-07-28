import PromptLibraryContext from "./PromptLibraryContext";
import usePromptLibrary from "../hooks/usePromptLibrary";

export default function PromptLibraryProvider({
  children,
}) {
  const library = usePromptLibrary();

  return (
    <PromptLibraryContext.Provider
      value={library}
    >
      {children}
    </PromptLibraryContext.Provider>
  );
}