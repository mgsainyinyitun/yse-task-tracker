import { useEffect } from "react";
import MainRoutes from "./routes";

function App() {

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    // e.preventDefault();
    localStorage.clear();
    console.log('clearing')
    // e.returnValue = "";
  };
  return <MainRoutes />
}
export default App;
