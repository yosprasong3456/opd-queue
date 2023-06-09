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
//--------------------------------------
import DashboardTwo from './screens/DashboardTwo';
import PressQ2 from './screens/PressQ2';
import CallQ2 from './screens/CallQ2';
//--------------------------------------
import PressQMR from './screens/PressQMr'
import RoomMR from './screens/RoomMr';
import CallQMR from './screens/CallQMR';
import DashboardMR from './screens/DashboardMR';
import RoomDrug from './screens/RoomDrug';
import DashboardTwoFNC from './screens/DashboardTwoFNC';
import RoomFnc from './screens/RoomFnc';
import PressQFnc from './screens/PressQFnc';
import CallQFnc from './screens/CallQFnc';
//--------------------------------------
function App() {
  console.log(process.env.NODE_ENV)
  return (
  <BrowserRouter>
      <Routes>
        

        {/* OPD couter A B C */}
        <Route path="/queue" element={<Home />}/>
        <Route path="/queuehome" element={<QueueHome />}/> 
        <Route path="/callq/:id" element={<CallQ />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/admin/queuemanagement" element={<AdminQueueManagement />}/>
        

        {/* App couter D */}
        <Route path="/dashboard2" element={<DashboardTwo />}/>
        <Route path="/dashboard2-fnc" element={<DashboardTwoFNC />}/>
        <Route path="/queue2" element={<PressQ2 />}/>
        <Route path="/select-drug" element={<RoomDrug />}/>
        <Route path="/callq2/:id" element={<CallQ2 />}/>

        {/* FNC couter F */}
        <Route path="/select-fnc" element={<RoomFnc />}/>
        <Route path="/queuefnc" element={<PressQFnc />}/>
        <Route path="/callqFnc/:id" element={<CallQFnc />}/>

        {/* MR */}
        <Route path="/dashboardMR" element={<DashboardMR />}/>
        <Route path="/queueMR" element={<PressQMR />}/>
        <Route path="/roomMR" element={<RoomMR />}/>
        <Route path="/callqMR/:id" element={<CallQMR />}/>
        {/* <Route path="/callq2" element={<CallQ2 />}/> */}


        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
