import React, { useState,useEffect } from 'react'
import styles from "./Signup.module.css"
import { Link, useNavigate } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("loggedInUser")){
          navigate("/todo")
        }
      })

    const[userData,setUserData] = useState(
        {
            name : "",
            email : "",
            password : "",
        }
    )
    const storeData =()=>{
        let userDatas = JSON.parse(localStorage.getItem("userDatas"));
        if(!userDatas){
            userDatas=[]
        }

        if (userDatas.some((obj) => obj.email == userData.email)){
            alert("User Exits,Login!")
            return
        }else{
            console.log("no matching found")
        }

        userDatas.push(userData)
        console.log(userData);  
        localStorage.setItem("userDatas",JSON.stringify(userDatas))
        const user = userDatas.filter((obj)=>obj.email == userData.email)[0]
        localStorage.setItem("loggedInUser",JSON.stringify(user))  
        navigate("/todo")
    }
 
    return (
    <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
            <input
            type="text"
            required
            value={userData.name}
            onChange={(e)=>{
                setUserData({...userData,name : e.target.value})
            }}
            placeholder="Enter Your Fullname"
            className={styles.userFullNameInput}
            />
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
            <button className={styles.submitButton} onClick={storeData}>Signup</button>
            
            <Link to="/login">
                <p className={styles.link}>Already have an account?Login now!</p>
            </Link> 
            </div>     
    </div>
  );
}

export default Signup
