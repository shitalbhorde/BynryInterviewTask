import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';
import MapComponent from './MapComponent';
import { FaArrowLeft, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';

function ProfileDetails() {
  const { profiles } = useContext(ProfileContext);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const profile = profiles.find(p => p.id === parseInt(id));

  if (!profile) {
    return (
      <div className="alert alert-danger" role="alert">
        Profile not found. <button className="btn btn-link" onClick={() => navigate('/')}>Go back</button>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
          <FaArrowLeft className="me-2" /> Back to Profiles
        </button>
      </div>
      <div className="col-md-6">
        <div className="card">
          <img 
            src={profile.photo} 
            className="card-img-top"
            alt={profile.name}
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h2 className="card-title">{profile.name}</h2>
            <p className="card-text">{profile.description}</p>
            
            <h5 className="mt-4 mb-3">Contact Information</h5>
            <div className="d-flex align-items-center mb-2">
              <FaEnvelope className="me-2" />
              <span>{profile.email || 'Email not provided'}</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaPhone className="me-2" />
              <span>{profile.phone || 'Phone not provided'}</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaGlobe className="me-2" />
              <span>{profile.website || 'Website not provided'}</span>
            </div>

            <h5 className="mt-4 mb-3">Additional Information</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Interests:</strong> {profile.interests?.join(', ') || 'Not specified'}
              </li>
              <li className="list-group-item">
                <strong>Skills:</strong> {profile.skills?.join(', ') || 'Not specified'}
              </li>
              <li className="list-group-item">
                <strong>Location:</strong> {profile.location}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="sticky-top" style={{ top: '1rem' }}>
          <MapComponent profile={profile} />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;