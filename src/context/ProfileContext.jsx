import { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem('profiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = (profile) => {
    setProfiles([...profiles, { ...profile, id: Date.now() }]);
  };

  const updateProfile = (id, updatedProfile) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...updatedProfile, id } : profile
    ));
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProfileContext.Provider value={{
      profiles: filteredProfiles,
      addProfile,
      updateProfile,
      deleteProfile,
      searchTerm,
      setSearchTerm,
      selectedProfile,
      setSelectedProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};