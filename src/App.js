import Launches from "./components/Launches";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path='/' element={<Launches />} />
          <Route exact path='/:id' element={<Launches />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
