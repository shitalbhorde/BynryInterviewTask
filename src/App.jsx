import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileList from './components/ProfileList';
import ProfileDetails from './components/ProfileDetails';
import AdminDashboard from './components/AdminDashboard';
import { ProfileProvider } from './context/ProfileContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container mt-4 flex-grow-1 d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: '1200px' }}>
              <Routes>
                <Route path="/" element={<ProfileList />} />
                <Route path="/profile/:id" element={<ProfileDetails />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;
