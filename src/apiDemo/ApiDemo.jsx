import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApiDemo.css"; 

const API_URL = "https://jsonplaceholder.typicode.com/users";

function ApiDemo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // Fetch Data (GET)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add Data (POST)
  const addUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert("Please enter both name and email");
      return;
    }

    try {
      const response = await axios.post(API_URL, newUser);
      setData([...data, response.data]); 
      setNewUser({ name: "", email: "" }); 
    } catch (err) {
      setError("Failed to add user");
    }
  };


  const updateUser = async (id, updatedInfo) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedInfo);
      setData((prevData) =>
        prevData.map((user) =>
          user.id === id ? { ...user, ...updatedInfo } : user
        )
      );
    } catch (err) {
      setError("Failed to update user");
    }
  };


  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div className="containerA">
      <h2 className="title">API Demo (CRUD Operations)</h2>

      <div className="form-containerA">
        <input
          type="text"
          placeholder="Enter Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="input-field"
        />
       <button className="btn add-btn" onClick={addUser}>
          Add User
        </button>
      </div>
      

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">No Users Available</td>
                </tr>
              ) : (
                data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="action-buttons">
                      <button
                        className="btn edit-btn"
                        onClick={() =>
                          updateUser(user.id, { name: "Updated Name" })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn delete-btn"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ApiDemo;
