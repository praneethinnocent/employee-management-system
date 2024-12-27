import React from 'react'
import { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

function UpdateEmployeeComponent() 
{

  let navigate=useNavigate();

  const [fristName,setFristName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const {id}=useParams(); 

    useEffect(()=>{
        EmployeeService.getEmployeeById(id).then(res=>{
            setFristName(res.data.fristName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);
        })
    },[])

    const cancelHandle=(e)=>{
            e.preventDefault();
           navigate("/employees");
    }

    const updateHandler=(e)=>{
         
        e.preventDefault();
        const employee={fristName,lastName,email};

        if(id)
        {
            EmployeeService.updateEmployee(id,employee).then(res=>{
                navigate("/employees")
            })
        }
        else
        {
            EmployeeService.createEmployee(employee).then(res=>{
                navigate('/employees')
            })
        }
    }

   
  return (
    <div className='cotainer mt-3'>
         <div className='card col-md-6 offset-3'>

        <h4 className='text-center pt-3'> Update Employee</h4>
        
         <div className='card-body'>
            <form>
                <label className='my-3'>FristName:</label>
                <input type="text" name="fristName" id="fristName" className='form-control'
                value={fristName}
                onChange={(e)=> setFristName(e.target.value)}/>

                 <label className='my-3'>LastName:</label>
                <input type="text" name="lastName" id="lastName" className='form-control'
               value={lastName} onChange={(e)=> setLastName(e.target.value)}/>

                 <label className='my-3'>Email:</label>
                <input type="text" name="email" id="email" className='form-control'
                value={email} onChange={(e)=> setEmail(e.target.value)}/>

                  <button className='btn btn-danger mt-3' onClick={cancelHandle}> cancel </button>
                  <button className='btn btn-success mt-3 ms-3' onClick={updateHandler}> save </button>  
            </form>
         </div> 

         </div>
    </div>
  )
}

export default UpdateEmployeeComponent
