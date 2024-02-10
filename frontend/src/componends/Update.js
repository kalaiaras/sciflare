import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
    const role = JSON.parse(localStorage.getItem('role'));
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({}); // Initialize user state as an object
    const [data, setData] = useState([]);
    const [organization, setOrganization] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        organizeFetchData();
    }, []);

    const fetchData = async () => {
        try {
            const api = `http://localhost:4000/role/users/${params.id}`;
            const response = await fetch(api, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            setUser(result);
            setUsername(result.username);
            setEmail(result.email);
            setOrganization(result.organization.name);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const organizeFetchData = async () => {
        try {
            const result = await fetch('http://localhost:4000/organization/organizations', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await result.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const result = await fetch(`http://localhost:4000/role/users/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ username, email, organization }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (result.ok) {
                navigate('/'); // Redirect to the home page after successful update
            } else {
                console.error('Failed to update');
            }
        } catch (error) {
            console.error('Error updating data', error);
        }
    };

    return (
        <div>
            <h2>Update the Records</h2>
            <form>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                {
                    role === 'admin'?
                    <>
                    <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
                        <option value="">Select your organization</option>
                        {data.map((item) => (
                            <option key={item._id} value={item.name}>{item.name}</option>
                        ))}
                    </select><br />
                    </>
                    :""
                }
               
                <button type="button" onClick={handleUpdate}>Update</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button><br />
            </form>
        </div>
    );
}

export default Update;
