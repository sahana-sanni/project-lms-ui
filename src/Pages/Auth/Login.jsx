import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import useAuth from '../../CustomHooks/AuthHook'

function Login() {

  const [user,setuser]=useState({
      
    email:"",
    password:""
    })
    const navigate = useNavigate()

    const{ setToken, setCurrentUser, setIsLogin } = useAuth()

    //reading value from inputs
    const readvalue=async (e)=>{
      const {name,value}=e.target
      setuser({...user, [name]:value})
    }
     
      //submit handler
    const submithandler = async (e)=>{
      e.preventDefault();
      try {
        //console.log(`user =`, user)
        await axios.post(`/api/auth/login`, user)
        .then(res => {
          toast.success(res.data.msg)
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
          setCurrentUser(res.data.user)
          setIsLogin(true)
          navigate(`/dashboard/${res.data.user.role}`)
        }).catch(err => {
          toast.error(err.response.data.msg)
        })
      } catch (err) {
        toast.error(err.message)
      }
    }


  return (
    <div className="container pt-5">
      <div className="row d-flex align-items-start ">
      <div className="col-md-6 mt-5 pt-5 d-none d-sm-none d-md-block d-lg-block">
      <img src={`${process.env.PUBLIC_URL}/images/signup.svg`} alt='' className='img-fluid mt-5'/>
        </div>
      <div className="col-md-6">
        <div className="card mt-5">
          <div className="card-header bg-theme text-center">
              <h6 className="display-6 text-white">Login</h6>
          </div>
          <div className="card-body">
            <form autoComplete='off' onSubmit={submithandler}>
              
              <div className="form-group mt-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email"  value={user.email} onChange={readvalue} id="email" placeholder='Enter your email' className="form-control" />
              </div>
              
              <div className="form-group mt-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={user.password }  onChange={readvalue} id="password" placeholder='Enter your password' className="form-control" />
              </div>
              <div className="form-group mt-2 ">
                <input type="submit" value="Register" className='btn bg-theme text-light ' />
              </div>

            </form>
          </div>
          <div className="card-footer">
            <NavLink to={'/register'} className="float-end btn btn-link">
              New user? register here. 
            </NavLink>
          </div>
        </div>
        </div>
        
        

        </div>
      </div>
    
  )
}

export default Login