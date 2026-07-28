import { useEffect, useState } from "react";
import { loadGuide } from "../services/guideLoader";

export default function LearningContent() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    loadGuide()
      .then(setHtml)
      .catch(console.error);
  }, []);

  return (
    <div
      className="flex-1 overflow-auto bg-white p-8"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}