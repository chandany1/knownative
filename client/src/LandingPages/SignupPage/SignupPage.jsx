import React from 'react';
import './SignupPage.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LandingPageNav from '../components/LandingPageHeader/LandingPageNav';
import { useState } from 'react';
import FormInput from '../components/Forms/FormInput'
import PasswordValidation from '../components/Forms/PasswordValidation';
import { MdAlternateEmail } from "react-icons/md";
import { TbPencilCheck } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import * as authService from '../../services/authService';

const SignupPage = ({ setUser }) => {
  const [inputValue, setInputValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate();


  // Add more form fields as needed here:
  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      id: "signup-firstName",
      htmlFor: "signup-firstName",
      errorMessage: "First name needs to be 2 to 20 characters long and shouldn't contain special characters.",
      pattern: "^[A-Za-z]{2,20}$",
      icon: <TbPencilCheck />,
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      id: "signup-lastName",
      htmlFor: "signup-lastName",
      errorMessage: "Last name needs to be 2 to 20 characters long and shouldn't contain special characters.",
      pattern: "^[A-Za-z]{2,20}$",
      icon: <TbPencilCheck />,
      required: true,
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      id: "signup-username",
      htmlFor: "signup-username",
      errorMessage: "Username should be 3-20 characters. Only letters, numbers and underscores are allowed.",
      pattern: "^[A-Za-z0-9_]{3,20}$",
      icon: <FaUserPlus />,
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      id: "signup-email",
      htmlFor: "signup-email",
      errorMessage: "Please use a valid email address.",
      icon: <MdAlternateEmail />,
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      id: "signup-password",
      htmlFor: "signup-password",
      errorMessage: "Password should be 6-20 characters. Include letters, numbers and at least one special character.",
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}$",
      icon: <RiLockPasswordFill />,
      required: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      id: "signup-confirmPassword",
      htmlFor: "signup-confirmPassword",
      errorMessage: "Passwords do not match",
      pattern: inputValue.password,
      icon: <RiLockPasswordFill />,
      required: true,
    },
  ]
  
  const handleChange = (e) => {
    setInputValue({...inputValue, [e.target.name]: e.target.value});
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.signUp(inputValue);
      setUser(user);
      setSuccessMsg('Sign Up Successful', user);
      console.log(successMsg);
      navigate('/demo');
    } catch (err) {
      console.log(err);
      setInputValue({
        ...inputValue,
        password: '',
        confirmPassword: '',
      });
      setErrorMsg('Sign Up Failed. Please Try Again!');
    }
  }

  return (
    <main className="signup-page-main">
      <LandingPageNav />
      <section className="signup-page">
        <div className="signup-container">
          <h1 className="">SIGN UP</h1>
          {errorMsg && <div className="error-message"><h5><em>{errorMsg}</em></h5></div>}
          <form className="form-container" onSubmit={handleSubmit}>
            {formFields.map((input, idx) => (
              <FormInput 
              key={idx} 
              {...input} 
              value={inputValue[input.name]} 
              onChange={handleChange}/>
            ))}
            <PasswordValidation password={inputValue.password} />
            <button type="submit">
              <FaUserPlus style={{color:"#556163"}}/><span> &nbsp; SIGN UP</span>
            </button>
            {/* oAuth  */}
            <div>
            <button>Sign up with Google</button>
            </div>
            {/* line */}
            <div>
              <Link to="/login" className="signup-text">
                Already have an account? Log in
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
