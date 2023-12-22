import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import JobForm from './component/JobForm';
import Login from './component/Login';
import JobListingsPage from './component/JobListingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<JobForm/>} />
        <Route path="/job" element={<JobListingsPage/>} />    
        <Route path="/job/:id" element={<JobListingsPage/>} />    
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
