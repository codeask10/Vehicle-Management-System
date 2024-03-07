import React,{useState}from 'react'
import LoginContext from './LoginContext';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';

const LoginState = (props) => {
    const navigate = useNavigate();
    const [credential, setCredential] = useState();
    const host = 'http://localhost:5002'
    const userLogin = async (users) => {
        const response = await fetch(`${host}/api/user/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: users.email, password: users.password })
        });
        // eslint-disable-next-line
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            toast.success("Account logged in successfully  ");
        }
        else {
            toast.error("Invalid credential ");

        }
        setCredential(json);
    }
    const userRegister = async (register) => {
        const response = await fetch(`http://localhost:5002/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName: register.firstName,lastName: register.lastName, email: register.email, password: register.password })
        });
        // eslint-disable-next-line 
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate('/Login');
            toast.success(" Account created successfully ");
        }
        else {
            toast.error("Sorry a user with this email already exists")
        }
    }
    return (
        <LoginContext.Provider value={{ credential, userLogin, userRegister }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState