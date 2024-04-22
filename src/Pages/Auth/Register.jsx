import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

function Register() {


  const [user,setuser]=useState(
    {
      name:"",
     email:"",
    mobile:"",
    password:""
    })

    const navigate = useNavigate()

    //reading value from form inputs

    const readvalue=async (e)=>{
      const {name,value}=e.target
      setuser({...user,[name]:value})
    }

    //submit handler
    const submithandler= async (e)=>{
      e.preventDefault();
      try {
        //console.log(`user =`, user)
        await axios.post(`/api/auth/register`, user)
        .then(res => {
          toast.success(res.data.msg)
          navigate(`/login`)
        }).catch(err => toast.error(err.response.data.msg))
      } catch (err){
        toast.error(err.message)
      }
    }


  return (
    <div className="container pt-5">
      <div className="row d-flex align-items-start ">
      <div className="col-md-6">
        <div className="card mt-5">
          <div className="card-header bg-theme text-center">
              <h6 className="display-6 text-light">Register</h6>
          </div>
          <div className="card-body">
            <form autoComplete='off' onSubmit={submithandler}>
              <div className="form-group mt-2">
                <label htmlFor="name">Name</label>
                <input type="text" name="name"  value={user.name}  onChange={readvalue}  id="name" placeholder='Enter your name' className="form-control" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email"  value={user.email} onChange={readvalue} id="email" placeholder='Enter your email' className="form-control" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="mobile">Mobile</label>
                <input type="number" name="mobile" value={user.mobile}  onChange={readvalue} id="mobile" className="form-control" />
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
        </div>
        </div>
        <div className="col-md-6 mt-5 pt-5 d-none d-sm-none d-md-block d-lg-block">
        <img src={`${process.env.PUBLIC_URL}/images/signup.svg`} alt='' className='img-fluid mt-5'/>

        </div>
        

        </div>
      </div>
    
  )
}

export default Register