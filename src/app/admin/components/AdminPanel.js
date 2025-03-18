'use client'; 
import { useState, useEffect } from 'react';
import Tabs from './Tabs';
import AddApis from './AddApis';
import CreateNewsletter from './CreateNewsletter';
import SeeUsers from './SeeUsers';

export default function AdminPanel() {
  const [selectedType, setSelectedType] = useState("Spotify");
  const [activeTab, setActiveTab] = useState('addApis');
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   if (activeTab === 'seeUsers') {
  //     fetchUsers();
  //   }
  // }, [activeTab]);

  // const fetchUsers = async () => {
  //   try {
  //     const res = await fetch('/api/users');
  //     const data = await res.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Failed to fetch users:", error);
  //   }
  // };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ padding: '5px' }}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === 'addApis' && <AddApis selectedType={selectedType} setSelectedType={setSelectedType} />}
      {activeTab === 'createNewsletter' && <CreateNewsletter />}
      {activeTab === 'seeUsers' && <SeeUsers/>}
    </div>
  );
}
