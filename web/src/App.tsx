import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LeadsListPage } from "@/pages/leads-list-page";
import { AddLeadPage } from "@/pages/add-lead-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadsListPage />} />
        <Route path="/add-lead" element={<AddLeadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
