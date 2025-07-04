import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Ticket from './pages/tickets/Ticket';
import CreateEditTicket from "./pages/tickets/CreateEditTicket"
import ProjectPage from "./pages/project/ProjectPage"
import CreateProject from "./pages/project/CreateProject"
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* <--- user ---> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <--dashboard--> */}
        <Route path='/dashboard' element={<Dashboard />} />

        {/* <--project--> */}
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/create-project" element={<CreateProject />} />

        {/* <--ticket--> */}

        <Route path="/project/:projectId/tickets" element={<Ticket />} /> {/* Kanban view */}
        <Route path="/ticket/:ticketId" element={<Ticket />} /> {/* Single ticket view (optional) */}
        <Route path="/ticket/:ticketId/edit" element={<CreateEditTicket />} /> {/* Edit */}
        <Route path="/project/:projectId/ticket/new" element={<CreateEditTicket />} /> {/* Create */}

        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;

