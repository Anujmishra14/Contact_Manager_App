import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../store/ContactSlice";

function Home() {
  const contacts = useSelector((state) => state.contacts.contactList);
  const filteredContacts = useSelector((state) => state.contacts.filteredContacts);
  const displayedContacts = filteredContacts.length > 0 ? filteredContacts : contacts;

  const dispatch = useDispatch();



  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(id));
    }
  };

  return (
    <div>
      <div className="ButtonContainer">
        <Link to="/formPage">
          <button className="HomeBtn">Add Contact</button>
        </Link>
      </div>

      <h1 className="home-title">Welcome to the Contact Management App!</h1>
      <div className="HomeContainer">
        {displayedContacts.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "10%", fontSize: "20px" }}>
            No contact available
          </div>
        ) : (
          <div className="table-container">
            <table className="center">
              <thead>
                <tr className="trow">
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {displayedContacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>
                      {contact.photo ? (
                        <img
                          src={contact.photo}
                          alt="Preview"
                          className="image-preview"
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/edit/${contact.id}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="edit-icon">
                            <path fill="#dc185d" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l293.1 0c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1l-91.4 0zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/>
                          </svg>
                        </Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="delete-icon"
                          viewBox="0 0 448 512"
                          onClick={() => handleDelete(contact.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
