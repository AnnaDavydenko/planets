import { BrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";

// import { theme, resources, sounds } from "./settings";

const App = () => {
  return (
    <BrowserRouter>
    <AppLayout />
    </BrowserRouter>
)};

export default App;
