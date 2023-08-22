import React, { useEffect, useState } from 'react';
import './style.css';

const Form = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
        salary: ""
    });
    const [allrecord, setAllrecord] = useState([]);
    const [editid, setEditid] = useState("");

    const toggleForm = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleSubmit = () => {
        if (editid) {
            let ans = allrecord.map((item) => {
                if (item.id === editid) {
                    return {
                        ...item,
                        name: input.name,
                        email: input.email,
                        password: input.password,
                        city: input.city,
                        salary: input.salary
                    };
                }
                return item;
            });
            setAllrecord(ans);
            setEditid("");
        } else {
            let obj = {
                id: Math.floor(Math.random() * 10000),
                name: input.name,
                email: input.email,
                password: input.password,
                city: input.city,
                salary: input.salary
            };
            let data = [...allrecord, obj];
            setAllrecord(data);
            localStorage.setItem('crud', JSON.stringify(data));
            alert("Record successfully added.");
        }
        setInput({
            name: "",
            email: "",
            password: "",
            city: "",
            salary: ""
        });
    };

    const deleteData = (id) => {
        let ans = allrecord.filter((item) => {
            return item.id !== id;
        });
        setAllrecord(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
        alert("Record successfully deleted.");
    };

    const editData = (id) =>{
        let ans =  allrecord.filter((item)=>{
            return item.id === id;
        })
        setEditid(id);
        setInput(ans[0]);
    }

    useEffect(() => {
        let alldata = JSON.parse(localStorage.getItem('crud'));
        if (alldata === null) {
            setAllrecord([]);
        } else {
            setAllrecord(alldata);
        }
    }, []);

    return (
        <div>
            <center>
                <button onClick={toggleForm} className="custom-btn btn-12" style={{ marginTop: '10px' }}>
                    <span>Click!</span><span>Read More</span>
                </button>
            </center>
            <style>
                {`
                    body {
                        background-color: #f0f0f0; /* Set your desired background color here */
                    }
                `}
            </style>
            {isOpen && (
                <center>
                    <table style={{ marginTop: '5px'}}>
                        <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="name" className="form-label">Name:</label>
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={input.name} />
                                    </td>
                                </tr>
                           

                            
                                <tr>
                                    <td>
                                        <label htmlFor="email" className="form-label">Email:</label>
                                    </td>
                                    <td>
                                        <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={input.email} />
                                    </td>
                                </tr>
                            
                            
                                <tr>
                                    <td>
                                        <label htmlFor="password" className="form-label">Password:</label>
                                    </td>
                                    <td>
                                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={input.password} />
                                    </td>
                                </tr>
                            
                                <tr>
                                    <td>
                                        <label htmlFor="city" className="form-label">City:</label>
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" id="city" name="city" onChange={handleChange} value={input.city} />
                                    </td>
                                </tr>
                           
                                <tr>
                                    <td>
                                        <label htmlFor="salary" className="form-label">Salary:</label>
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" id="salary" name="salary" onChange={handleChange} value={input.salary} />
                                    </td>
                                </tr>
                            
                                <tr>
                                    <td></td>
                                    <td>
                                        {
                                            (editid) ? (
                                                <button onClick={() => handleSubmit()} className="btn btn-primary">Edit</button>
                                            ) : (
                                                <button onClick={() => handleSubmit()} className="btn btn-primary">Submit</button>
                                            )
                                        }
                                    </td>
                                </tr>
                        </tbody>
                    </table><br /><br />
                </center>
            )}

           
                <center>
                    <div className="container" style={{ marginTop: '25px' }}>
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>City</th>
                                    <th>Salary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allrecord.map((item) => {
                                    const { id, name, email, password, city, salary } = item;
                                    return (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{name}</td>
                                            <td>{email}</td>
                                            <td>{password}</td>
                                            <td>{city}</td>
                                            <td>{salary}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deleteData(id)}>Delete</button>
                                                <button className="btn btn-success" onClick={() => editData(id)} style={{marginLeft: '10px'}}>Edit</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </center>
        </div>
    );
};

export default Form;
