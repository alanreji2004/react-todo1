import React, { useEffect, useState } from 'react'
import styles from "./Login.module.css"
import { Link,useNavigate} from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem("loggedInUser")){
        navigate("/todo")
      }
    })

    const[userData,setUserData] = useState(
        {
            email : "",
            password : "",
        }
    )
    const loginUser =()=>{
        let userDatas = JSON.parse(localStorage.getItem("userDatas"));
        if(!userDatas){
            userDatas=[]
        }

        if (userDatas.some((obj) => obj.email == userData.email&&obj.password == userData.password)){
          const user = userDatas.filter((obj)=>obj.email == userData.email)[0]
          localStorage.setItem("loggedInUser",JSON.stringify(user))  
          
          navigate("/todo")
        }else{
            alert("Authetication Failed")
            return;
        }
    }
 
    return (
    <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
            <input 
            type="email" 
            required
            placeholder="Enter Your Email Address"
            onChange={(e)=>{
                setUserData({...userData,email : e.target.value})
            }}
            className={styles.userEmailInput}
            />
            <input 
            type="password" 
            required
            placeholder="Enter Your Password"
            onChange={(e)=>{
                setUserData({...userData,password : e.target.value})
            }}
            className={styles.userPasswordInput}
            />
            <button className={styles.submitButton} onClick={loginUser}>Login</button>
            
            <Link to="/signup">
                <p className={styles.link}>Don't Have An Account?Signup now!</p>
            </Link> 
            </div>     
    </div>
  );
}

export default Login
