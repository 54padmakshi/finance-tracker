import React, { useState } from 'react';
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,db } from '../../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import {useNavigate} from "react-router-dom";

//import { Toast } from 'react-toastify/dist/components';


function SignupSigninComponent() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginForm,setLoginForm]= useState(false);
    const navigate = useNavigate();

    function signupWithEmail() {
        setLoading(true);
        console.log(name,email,password,confirmPassword);
        // Authenticate the user or create new acc using email n p/w
        if (name!== '' && email!=='' && password!=="" && confirmPassword!=="") {
           if (password===confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                  // Signed in 
                const user = userCredential.user;
                console.log("User>>",user);
               // ...user created show success msg and make the fields empty 
                   toast.success("User Created Successfully! ");
                   setLoading(false);
                   setEmail("");
                   setName("");
                   setConfirmPassword("");
                   setPassword("");
//create a doc with userid as the following id
                   createDoc(user);
                   navigate("/dashboard");
               })
             .catch((error) => {
             // const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(errorMessage);
              setLoading(false);
              // ..
               });
           }else{
            toast.error("Password & Confirm Password DO NOT MATCH!")
            setLoading(false);
           }
        

        } else {
            toast.error("All fields are Mandatory!");
            setLoading(false);
        }
        
    }

    function loginUsingEmail() {
      //only email and password is required
      console.log("E-mail",email, "Password",password);
      setLoading(true);
  // condition 
  if (email !== "" && password !== "") {
    
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("user logged in",user);
          setLoading(false);
          createDoc(user);  // just for checking
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
         // const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
  }else{
    toast.error("Oops!Email and Password fields are Mandatory.");
    setLoading(false);
  }

      
    }

    async function createDoc(user) {
      setLoading(true);
        //make sure that doc with uid does not exist
        // create a doc
        if (!user) {
          return;
        }
        const userRef = doc(db,"users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
          
          try {
            await setDoc(doc(db,"users", user.uid), { 
              name : user.displayName ? user.displayName : name,
            email: user.email,
            photURL : user.photoURL ? user.photoURL : "",
            createdAt :new Date(),
          });
          toast.success("Doc Created!");
          setLoading(false);
          } catch (error) {
            toast.error(error.message);
            setLoading(false);
          }
        }else{
          //toast.error("Doc already Exists!");
          setLoading(false);
        }                   
    }
// funtion for signin with google
    function signInWithGoogle() {
      setLoading(true);
      const provider= new GoogleAuthProvider();
      try {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //const credential = GoogleAuthProvider.credentialFromResult(result);
          
         // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>",user);
          createDoc(user);
          navigate("/dashboard");
          toast.success("User is authenticated!");
          setLoading(false);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          //const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);      
        });
        
      } catch (error) {
        toast.error(error.message);
       setLoading(false);
        }
     
    }

  return (
    <>
    {loginForm ? ( <div className='signupwrapper'>

      <h2 className='title'> Login on <span style={{color:"var(--theme)"}}>Financely.</span>
      </h2>

<form>



   <Input 
    type= "email"
   label={"email"} 
   state={email}
   setState={setEmail} 
   placeholder={"MariaBrown@gmail.com"}
   />

   <Input 
   type="password"
   label={"password"} 
   state={password}
   setState={setPassword} 
   placeholder={"Example@123"}
   />

    <Button 
   disabled={loading}
   text={loading ? "Loading..." : "Login using Email and Password"} 
   blue={false} 
   onClick={loginUsingEmail}/>

    <p className='p-login'> Or </p>

   <Button
    disabled={loading}
     text={loading ? "Loading..." :"Login with Google"} 
      blue={true}
      onClick={signInWithGoogle}
       />

   <p className='p-login' onClick={()=>setLoginForm(!loginForm)}> Or Don't Have an account ? <b style={{fontWeight: 500}}>ClickHere</b> </p>

</form>

</div>) : (<div className='signupwrapper'>

<h2 className='title'> Sign Up on <span style={{color:"var(--theme)"}}>Financely.</span>
</h2>

<form>

 <Input 
   type = "text"
   label={"full Name"} 
   state={name}
   setState={setName} 
   placeholder={"Maria Brown"}
   />

   <Input 
    type= "email"
   label={"email"} 
   state={email}
   setState={setEmail} 
   placeholder={"MariaBrown@gmail.com"}
   />

   <Input 
   type="password"
   label={"password"} 
   state={password}
   setState={setPassword} 
   placeholder={"Example@123"}
   />

  <Input 
   type="password"
   label={"confirmpassword"} 
   state={confirmPassword}
   setState={setConfirmPassword} 
   placeholder={"Example@123"}
   />   

   <Button 
   disabled={loading}
   text={loading ? "Loading..." : "Sign Up using Email and Password"} 
   blue={false} 
   onClick={signupWithEmail}/>

    <p className='p-login'> Or </p>

   <Button
    disabled={loading}
    text={loading ? "Loading..." :"Sign Up with Google"}
    blue={true}
    onClick={signInWithGoogle}
         />

   <p 
   className='p-login'
    onClick={()=>setLoginForm(!loginForm)}> Or Have an account Already ? <b style={{fontWeight: 500}}>Click Here</b>  </p>

</form>

</div>) }

   
    </>
  )
}

export default SignupSigninComponent