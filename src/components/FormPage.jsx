import React, { useState,useRef } from "react";
import { useDispatch} from "react-redux";
import { addContact } from "../store/ContactSlice";
import { useNavigate } from "react-router-dom";

function FormPage() {

const dispatch=useDispatch();
const navigate=useNavigate()



const fileInputRef = useRef(null);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });
  const [errors, setErrors] = useState({ email: "", phone: "" }); 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;



  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });

 
    if (name === "email") {
        setErrors({ ...errors, email: emailRegex.test(value) ? "" : "Invalid email format" });
    }

   
    if (name === "phone") {
        setErrors({ ...errors, phone: phoneRegex.test(value) ? "" : "Phone number must be 10 digits" });
    }
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
      alert("Please fill in all fields");
       
      return
    }
    if (!emailRegex.test(contact.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      return;
  }

  if (!phoneRegex.test(contact.phone)) {
      setErrors((prev) => ({ ...prev, phone: "Phone number must be 10 digits" }));
      alert('Invalid format')
      return;
  }
    
  


   dispatch(addContact(contact))
    navigate("/");
   
    setContact({
     name:'',
     email:'',
     phone:'',
     photo:'', 
    });
      if (fileInputRef.current) {
      fileInputRef.current.value = " ";
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Add Contact</h2>
      <form className="form-container" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Name" value={contact.name} onChange={handleChange} required />

            <input type="email" name="email" placeholder="Enter Email" value={contact.email} onChange={handleChange} required />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <input type="number" name="phone" placeholder="Enter Mobile No." value={contact.phone} onChange={handleChange} required />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}

            <input type="file" name="photo" accept="image/*" onChange={handleFileChange} required />

            <button type="submit" className="submit-btn">SUBMIT</button>
        </form>
    </div>
  );
}

export default FormPage;
