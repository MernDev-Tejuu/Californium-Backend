import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaTransgenderAlt } from "react-icons/fa";
import { MdEmail, MdCall, MdNumbers } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { firstName, lastName, age, gender, phone, email, password,confirm } =
      formData;
      if(formData.password!==formData.confirm){
        window.alert('Password is incorrect')
        }
    const res = await fetch("/register", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        age,
        gender,
        phone,
        email,
        password,
        confirm,
      }),
    });
   
    const data = res.json();
    
    if (res.status === 422 || !res || res.status === 404) {
      window.alert("Data Not Found/bad request");
    } else if(res.status===409){
     window.alert('User already registered')
    }     
  else {
      window.alert(`hello ${formData.firstName}, Welcome to techTej`);
      navigate("/login");
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-outer-page">
        <div className="signup-inner-page">
          <form method="POST">
            <legend id="legend-signup">
              Please fill this form to register <FaUserTie />
            </legend>
            <fieldset id="fieldset-signup">
              <label id="label" for="firstname">
                <FaUserTie /> First name :{" "}
              </label>
              <br></br>
              <input
                type="text"
                id="label-left"
                name="firstName"
                value={formData.firstName}
                onChange={handleInput}
                required
              />
              <br></br>
              <label id="label" for="lastname">
                <FaUserTie />
                Last name :{" "}
              </label>
              <br></br>
              <input
                type="text"
                name="lastName"
                id="label-left"
                value={formData.lastName}
                onChange={handleInput}
                required
              />
              <br></br>
              <br></br>
              <label id="label" for="gender">
                <FaTransgenderAlt /> Gender :
              </label>
              <br></br>
              <input
                type="text"
                id="label-left"
                value={formData.gender}
                onChange={handleInput}
                name="gender"
              />
              <br></br>
              <label id="label" for="age">
                <MdNumbers />
                Age :{" "}
              </label>
              <br></br>
              <input
                type="text"
                id="label-left"
                value={formData.age}
                onChange={handleInput}
                name="age"
                required
              />
              <br></br>
              <label id="label-right" for="phone">
                <MdCall /> Phone :
              </label>
              <br></br>
              <input
                type="text"
                id="label-right"
                value={formData.phone}
                onChange={handleInput}
                name="phone"
                required
              />
              <br></br>
              <label id="label-right" for="email">
                <MdEmail /> Email :
              </label>{" "}
              <br></br>
              <input
                type="email"
                name="email"
                id="label-right"
                value={formData.email}
                onChange={handleInput}
                required
              />
              <br></br>
              <label id="label-right" for="password">
                <RiLockPasswordLine /> Password :
              </label>
              <br></br>
              <input
                type="password"
                name="password"
                id="label-right"
                value={formData.password}
                onChange={handleInput}
                required
              />
              <br></br>
              <label id="label-right" for="password">
                <RiLockPasswordFill />
                Confirm Password :
              </label>
              <br></br>
              <input type="password" name="confirm" value={formData.confirm} id="label-right" onChange={handleInput} required />
              <br></br>
              <button
                className="button-signup"
                onClick={postData}
               
              >
                Sign up
              </button>
            </fieldset>
          </form>
          <small>
            Already a user?<NavLink to="/login">Click here</NavLink>
          </small>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
