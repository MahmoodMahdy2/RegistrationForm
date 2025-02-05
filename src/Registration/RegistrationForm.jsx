import React, { Component } from "react";
import http from "../services/httpService";
import config from "../config.json";

class Registration extends Component {
    state = {
        values :{
            fullName:'',
            email:'',
            phoneNumber:'',
            age:''
          },
          posts: []
  }

   handleChange = (e) => {
    //setValues({...values, [e.target.name]:[e.target.value]})
    const { name, value } = e.target;
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  }

   handleSubmit = async  (e) => {
    e.preventDefault();
    try {
        // Sending form data to the API
        const { data: post } =  await http.post(
          config.apiEndpoint + 'AddNewStudent',
          this.state.values  // Sending form data instead of event object
        );
        
        console.log("Student added successfully:");
        alert("Student added successfully!");
        const { data: posts } = await http.get(config.apiEndpoint + 'GetAllStudents');
    console.log(posts);
    this.setState({ posts });
    }catch (error) {
        console.error("Error adding student:", error);
        alert("Failed to add student. Please try again.");
      }
  }

  render(){
      return (
          <div className="container">
<h1>Registration Form</h1>
<form onSubmit={ this.handleSubmit}>
  <label htmlFor="fullName">Full Name</label>
  <input type="text" id="fullName" name="fullName" placeholder='please enter your Full Name ...' 
  onChange={this.handleChange}></input>

  <label htmlFor="email">Email Address</label>
  <input type="email" id="email" name="email" placeholder='please enter your E-mail ...'
  onChange={ this.handleChange}/>

  <label htmlFor="phoneNumber">Phone Number</label>
  <input type="text" id="phoneNumber" name="phoneNumber" placeholder='please enter your phone Number ...'
  onChange={this.handleChange}/>

  <label htmlFor="age">Age</label>
  <input type="number" id="age" name="age" placeholder='please enter your age ...'
  onChange={ this.handleChange}/>

  <button type="submit">Submit</button>
</form>
  </div>
);
}}


export default Registration;
