import React, { useState } from 'react';
import myImage from '../assets/images (1).jpeg';
import { useDispatch } from 'react-redux';
import {filterContact,refreshContact} from '../store/ContactSlice'

 
function Header() {
  const dispatch=useDispatch() 

  const [search,setSearch]=useState('')
  const [rotate,setRotate]=useState(false)
 


  const filterMethod=(e)=>{
    e.preventDefault()
    setSearch(e.target.value)
    dispatch(filterContact(search))
    
  }
  const refreshMethod = (e) => {
    e.preventDefault();
    setSearch(""); 
    dispatch(refreshContact()); 
    setRotate(true);
    setTimeout(() => setRotate(false), 500);
};

  return (
    <nav className="navBar">
        <div className='navContain'>
          <img src={myImage} alt="notfound" />
          <h3>Anuj Mishra</h3>
        </div>
        <div>
        <h1 className='nav-title'>CONTACT MANAGEMENT SYSTEM</h1>
        </div>
        
        <div className='searchbox'>
        <input
         type="text" 
         placeholder='Search Contact' 
         value={search}
         onChange={(e)=>setSearch(e.target.value)}
         />
        <button onClick={filterMethod} style={{cursor:'pointer'}}>Search</button>

  
        <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512"
        width={25}
        onClick={refreshMethod}
        style={{ cursor: "pointer" }}
        className={`refreshbtn ${rotate ? "rotate" : ""}`}
        >
        <path fill="#f5f7f9" d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/>
        </svg>

        </div>
    </nav>
  );
}

export default Header;
