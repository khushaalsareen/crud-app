import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', jobNumber: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3001/users');
    setUsers(response.data);
  };

  const handleCreate = async () => {
    if (newUser.username && newUser.email && newUser.jobNumber) {
      const response = await axios.post('http://localhost:3001/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', email: '', jobNumber: '' });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async () => {
    if (editingUser.username && editingUser.email && editingUser.jobNumber) {
      await axios.put(`http://localhost:3001/users/${editingUser.id}`, editingUser);
      fetchUsers();
      setEditingUser(null);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">CRUD App</h1>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="border rounded py-2 px-4 mr-2 focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border rounded py-2 px-4 mr-2 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Job Number"
          value={newUser.jobNumber}
          onChange={(e) => setNewUser({ ...newUser, jobNumber: e.target.value })}
          className="border rounded py-2 px-4 mr-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add User
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Job Number</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-center">{user.id}</td>
              <td className="py-2 px-4 border-b text-center">{user.username}</td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">{user.jobNumber}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mx-1 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mx-1 transition duration-300"
                >
                  Delete
                </button>
                
              </td>
            </tr>
          ))}
          {editingUser && (
            <tr>
              <td className="py-2 px-4 border-b text-center">{editingUser.id}</td>
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  className="border rounded py-1 px-2"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="border rounded py-1 px-2"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="number"
                  value={editingUser.jobNumber}
                  onChange={(e) => setEditingUser({ ...editingUser, jobNumber: e.target.value })}
                  className="border rounded py-1 px-2"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={handleUpdate}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded transition duration-300"
                >
                  Update
                </button>
              </td>
            </tr>
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default UserTable