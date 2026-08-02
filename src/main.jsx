import "./tests/intelligence-test";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

import AIProvider from "./features/ai/context/AIProvider";

// Knowledge Engine
import { KnowledgeRepository } from "./features/knowledge";

// Initialize the Knowledge Repository once at application startup
KnowledgeRepository.initialize();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AIProvider>
        <Toaster position="top-right" />

        <App />
      </AIProvider>
    </BrowserRouter>
  </React.StrictMode>
);