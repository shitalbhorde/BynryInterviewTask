import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';
import MapComponent from './MapComponent';
import SearchBar from './SearchBar';
import { ClipLoader } from 'react-spinners';

function ProfileList() {
  const { profiles, selectedProfile, setSelectedProfile } = useContext(ProfileContext);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowMap = async (profile) => {
    setLoading(true);
    setSelectedProfile(profile);
    setShowMap(true);
    setLoading(false);
  };

  const handleViewDetails = (profile) => {
    navigate(`/profile/${profile.id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <ClipLoader color="#0d6efd" size={50} />
        <p className="mt-3">Loading profiles...</p>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <SearchBar />
      </div>
      <div className="col-md-6">
        <div className="row">
          {profiles.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">
                No profiles found. Try adjusting your search criteria.
              </div>
            </div>
          ) : (
            profiles.map(profile => (
              <div key={profile.id} className="col-12 mb-4">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img 
                        src={profile.photo} 
                        className="img-fluid rounded-start" 
                        alt={profile.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{profile.name}</h5>
                        <p className="card-text">{profile.description}</p>
                        <p className="card-text">
                          <small className="text-muted">{profile.location}</small>
                        </p>
                        <div className="btn-group">
                          <button 
                            className="btn btn-primary"
                            onClick={() => handleShowMap(profile)}
                          >
                            Summary
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleViewDetails(profile)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="col-md-6">
        {showMap && selectedProfile && (
          <div className="sticky-top" style={{ top: '1rem' }}>
            <MapComponent profile={selectedProfile} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileList;