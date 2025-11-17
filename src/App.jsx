import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard";
// import About from "./pages/About";
import AuthPage from "./pages/auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
