import AppRoutes from "./routes/AppRoutes";
import StorageService from "./core/services/StorageService";

// Expose StorageService globally to the browser console
window.StorageService = StorageService;

function App() {
  return <AppRoutes />;
}

export default App;