import React from 'react'
import { Link } from 'react-router-dom';
import img from '../Images/rsz_1desktop1.jpg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate(); 
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/Login')
    }
    const myStyle = {
        background: `url(${img})`,
        backgroundSize: "100% 420px",
        backgroundPosition: "top",
        backgroundRepeat: 'no-repeat',
        height: "55vh",
        display: 'flex'
    }
    return (
        <>
            <div >
                <div className='container'>
                    <nav className="navbar navbar-expand-lg ">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to={"/"}>Vehicle Management System</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={"/"}>Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/Vehicle"}>Vehicle</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/Vendor"}>Vendor</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/Product"}>Product</Link>
                                    </li>
                                </ul>

                                {!localStorage.getItem('token') ? <ul className=" nav navbar-nav justify-content-end">
                                    <li className="nav-item">
                                        <Link className="nav-link " to="/Login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Register">Register</Link>
                                    </li>
                                </ul> :
                                    <ul className=" nav navbar-nav justify-content-end">
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                                        </li>
                                    </ul>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar