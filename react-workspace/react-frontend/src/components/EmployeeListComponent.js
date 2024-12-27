import React, { Component } from 'react'
import EmployeeService from '../service/EmployeeService';
import {Link} from 'react-router-dom';


export default class EmployeeListComponent extends Component 
{

     constructor()
     {
        super();

        this.state={
            employees:[]
        }
     }
      
     componentDidMount()
     {
        EmployeeService.getEmployees().then(res=>{
            this.setState({employees:res.data});
        })
     }

     deleteEmployee=(employeeId)=>{
        EmployeeService.deleteEmployee(employeeId).then(res=>{
            EmployeeService.getEmployees().then(res=>{
                this.setState({employees:res.data})
            })
        })
        .catch(error=>
            {
                console.log(error);
            })

     }

  render() 
  {

    return (
      <div className='container mt-5'>
        <h3 className='text-center'> Employee List</h3>

        <div className='row mt-5'>
            <Link to="/add-employee" className='btn btn-primary'> Add employee</Link>
            <table className='table table-brodered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FRISTNAME</th>
                        <th>LASTNAME</th>
                        <th>EMAIL</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.employees.map(employee=>{
                            return <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.fristName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                <Link to={`/update-employee/${employee.id}`} className='btn btn-info'> update </Link>
                                <button className='btn btn-danger' style={{marginLeft:"10px"}}
                                onClick={()=> this.deleteEmployee(employee.id)}> delete </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        
      </div>
    )
  }
}

