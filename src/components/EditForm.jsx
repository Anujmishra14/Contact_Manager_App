import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "../store/ContactSlice";

function EditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contacts = useSelector((state) => state.contacts.contactList);
  const contactToEdit = contacts.find((c) => c.id === id);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });

  useEffect(() => {
    if (contactToEdit) {
      setContact(contactToEdit);
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContact({ ...contact, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!contact.name || !contact.email || !contact.phone) {
      alert("All fields are required!");
      return;
    }

    dispatch(updateContact({ id, updatedData: contact }));
    navigate("/");
    
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Edit Contact</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={contact.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={contact.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phone"
          placeholder="Enter Mobile No."
          value={contact.phone}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
        />
        {contact.photo && (
          <img
            src={contact.photo}
            alt="Preview"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}

        <div className="btnEdit">
          <button type="submit" className="btEdit">
            Update
          </button>
          <Link to="/">
            <button className="btCancel">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditPage;

