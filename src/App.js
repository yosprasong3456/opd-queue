import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import QueueHome from './screens/QueueHome';
import Dashboard from './screens/Dashboard';
import CallQ from './screens/CallQ';
import Admin from './screens/Admin';
import Error from './screens/Error';
import AdminQueueManagement from './screens/AdminQueueManagement';
function App() {
  console.log(process.env.NODE_ENV)
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/queue" element={<Home />}/>
        <Route path="/queuehome" element={<QueueHome />}/>
        <Route path="/callq/:id" element={<CallQ />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/admin/queuemanagement" element={<AdminQueueManagement />}/>
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
