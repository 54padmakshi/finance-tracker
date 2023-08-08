import React, { useEffect } from 'react';
import "./styles.css";
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg"


function Header() {
// since we want the user to redirect to the state of login or logout
const [user] = useAuthState(auth);

const navigate = useNavigate();

useEffect(()=>{
  if(user){             //if user is authenticated then navigate to dashboard -till user is signed in,it will navigate to dashboard.
    navigate("/dashboard");
  }                
},[user])

  function logoutfunc() {
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Successfully Signed Out!");
        navigate("/");
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
      alert("logout");
      
    } catch (e) {
      toast.error(e.message);
    }
   
  }
  return (
    <div className='navbar'> 
    <p style={{color: "var(--white)" , fontWeight: 500 }}>Financely.</p>
    {user && (<div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
    <img src={user.photoURL ? user.photoURL: userImg } alt={user.photoURL ? user.photoURL: userImg } style={{borderRadius:'50%',height:'1.5rem' ,width:'1.5rem'}}/>
     <p className="logo link" onClick={logoutfunc}>Logout</p> </div>) }
    </div>
  )
}

export default Header