import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Link } from 'react-router-dom';
function Datatable() {
    const auth_id = JSON.parse(localStorage.getItem('id'));
    const role = JSON.parse(localStorage.getItem('role'));
  
    const [data, setData] = useState([]);

    useEffect(() => {
        if (auth_id) {
            fetchdata();
        }
    }, [data]);

    const fetchdata = async () => {
        try {
            let api;
            if (role === "admin") {
                api = `http://localhost:4000/role/users`;
            } else {
                api = `http://localhost:4000/role/users/${auth_id}`;
            }

            const response = await fetch(api, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    
  const product_delete = async (id) => {

    let result = await fetch(`http://localhost:4000/role/users/${id}`, {
      method: 'Delete',
      headers: { 'Content-Type': 'application/json' }

    })
    result = await result.json();
    console.log(result)
    if (result) {
      alert("product deleted");
      fetchdata();
    }
  }

    return (
        <>
        <h1>DashBoard</h1>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            role === "admin" ?
                                <>
                                    <TableCell><b>Organization</b></TableCell>
                                    <TableCell><b>User Name</b></TableCell>
                                    <TableCell><b>Contact</b></TableCell>
                                    <TableCell><b>Role</b></TableCell>
                                    <TableCell><b>Update Action</b></TableCell>
                                    <TableCell><b>Delete Action</b></TableCell>
                                </>
                                :
                                <>

                                    <TableCell><b>User Name</b></TableCell>
                                    <TableCell><b>Contact</b></TableCell>
                                    <TableCell><b>Role</b></TableCell>
                                    <TableCell><b>Action</b></TableCell>
                                </>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        role === "admin" ?
                            data.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.organization ? row.organization.name : ''}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell><Link to={'/update/' + row._id} >Update</Link></TableCell>
                                    <TableCell><button onClick={() => product_delete(row._id)}>Delete</button></TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow key={data._id}>

                                <TableCell>{data.username}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.role}</TableCell>
                                <TableCell><Link to={'/update/' + data._id} >Update</Link></TableCell>
                               
                            </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

export default Datatable
