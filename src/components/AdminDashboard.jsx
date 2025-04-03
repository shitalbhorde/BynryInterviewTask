import { useContext, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { ClipLoader } from 'react-spinners';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';

function AdminDashboard() {
  const { profiles, addProfile, updateProfile, deleteProfile } = useContext(ProfileContext);
  const [editingProfile, setEditingProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    interests: '',
    skills: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name || !formData.photo || !formData.description || !formData.location) {
        throw new Error('Please fill in all required fields');
      }

      const processedData = {
        ...formData,
        interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingProfile) {
        await updateProfile(editingProfile.id, processedData);
      } else {
        await addProfile(processedData);
      }

      setFormData({
        name: '',
        photo: '',
        description: '',
        location: '',
        email: '',
        phone: '',
        website: '',
        interests: '',
        skills: ''
      });
      setEditingProfile(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData({
      ...profile,
      interests: profile.interests?.join(', ') || '',
      skills: profile.skills?.join(', ') || ''
    });
    setShowForm(true);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setLoading(true);
      try {
        await deleteProfile(id);
        setError(null);
      } catch (err) {
        setError('Failed to delete profile. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setEditingProfile(null);
    setFormData({
      name: '',
      photo: '',
      description: '',
      location: '',
      email: '',
      phone: '',
      website: '',
      interests: '',
      skills: ''
    });
    setShowForm(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <ClipLoader color="#0d6efd" size={50} />
        <p className="mt-3">Processing...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Profile Management</h2>
            {!showForm && (
              <button 
                className="btn btn-primary d-flex align-items-center"
                onClick={() => setShowForm(true)}
              >
                <FaPlus className="me-2" /> Add New Profile
              </button>
            )}
          </div>
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError(null)}
              ></button>
            </div>
          )}
        </div>

        {showForm && (
          <div className="col-12 col-lg-4 order-lg-2">
            <div className="card shadow-sm sticky-top" style={{ top: '1rem' }}>
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  {editingProfile ? 'Edit Profile' : 'Add New Profile'}
                </h5>
                <button 
                  className="btn btn-sm btn-outline-light"
                  onClick={handleCancel}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="needs-validation">
                  <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className={`form-control ${!formData.name && 'is-invalid'}`}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
  

<div className="mb-3">
  <label className="form-label">Photo URL *</label>
  <input
    type="url"
    className={`form-control ${!formData.photo && 'is-invalid'}`}
    value={formData.photo}
    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
    required
  />
  
  <input
    type="file"
    accept="image/*"
    className="form-control mt-2"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, photo: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }}
  />

  {formData.photo && (
    <img
      src={formData.photo}
      alt="Preview"
      className="mt-2 rounded"
      style={{ maxWidth: '100%', height: '100px', objectFit: 'cover' }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/100x100?text=Invalid+Image';
      }}
    />
  )}
</div>

             <div className="mb-3">
               <label className="form-label">Description *</label>
                 <textarea
                      className={`form-control ${!formData.description && 'is-invalid'}`}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="3"
                      required
                 />
             </div>
               <div className="mb-3">
                  <label className="form-label">Location *</label>
                    <input
                      type="text"
                      className={`form-control ${!formData.location && 'is-invalid'}`}
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Website</label>
                    <input
                      type="url"
                      className="form-control"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Interests (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.interests}
                      onChange={(e) => setFormData({...formData, interests: e.target.value})}
                      placeholder="e.g., Reading, Travel, Photography"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Skills (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
                      placeholder="e.g., JavaScript, React, Node.js"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                      disabled={loading}
                    >
                      <FaCheck />
                      {editingProfile ? 'Update Profile' : 'Add Profile'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                      onClick={handleCancel}
                    >
                      <FaTimes />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className={`col-12 ${showForm ? 'col-lg-8 order-lg-1' : 'col-lg-12'}`}>
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Manage Profiles</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '80px' }}>Photo</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Contact</th>
                      <th style={{ width: '120px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          <div className="text-muted">
                            No profiles found. Click "Add New Profile" to create one!
                          </div>
                        </td>
                      </tr>
                    ) : (
                      profiles.map(profile => (
                        <tr key={profile.id}>
                          <td>
                            <img
                              src={profile.photo}
                              alt={profile.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="rounded-circle"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                              }}
                            />
                          </td>
                          <td>
                            <div className="fw-bold">{profile.name}</div>
                            <div className="text-muted small">{profile.skills?.join(', ')}</div>
                          </td>
                          <td>{profile.location}</td>
                          <td>
                            <div>{profile.email}</div>
                            <div className="text-muted small">{profile.phone}</div>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(profile)}
                                title="Edit Profile"
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(profile.id)}
                                title="Delete Profile"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;