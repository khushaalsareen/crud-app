import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        setUser(response?.data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">User Details</h1>
      <div className="border border-gray-300 p-4 rounded-md shadow-md">
        <p className="text-lg font-semibold">ID: {user.id}</p>
        <p className="text-lg font-semibold">Username: {user.username}</p>
        <p className="text-lg font-semibold">Email: {user.email}</p>
        <p className="text-lg font-semibold">Job Number: {user.jobNumber}</p>
      </div>
    </div>
  );
};

export default UserDetail;
