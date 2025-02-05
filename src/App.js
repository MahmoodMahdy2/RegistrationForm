import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {pagination} from './utils/Pagination'
import Pagination from './Registration/Pagination'
class App extends Component {
  state = {
    students: [],
    showModal: false, 
    values :{
      fullName:'',
      email:'',
      phoneNumber:'',
      age:''
    },
    pageSize: 4,
    currentPage: 1,
    search:'',
    query: '',
  };

  async componentDidMount() {
    // pending > resolved (success) OR rejected (failure)
    const { data: students } = await http.get(config.apiEndpoint + 'GetAllStudents');
    this.setState({ students });
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

  handleChangePage = (page) =>{
    this.setState({currentPage:page})
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = async (event) => {
    const { query } = this.state;
    console.log(query);
    if(query.length === 0)
      this.componentDidMount();
    
    if (query.length > 2) {
      try {
        const response =  await http.get(
          config.apiEndpoint + 'GetStudent', {
            params: { name: query }
          });
          this.setState({ students: response.data });
        }catch (error) {
            console.error('Error fetching students:', error);
          }
        }else {
          console.log('Please enter at least 3 characters.');
        }
  }

  handleSubmit = async  (e) => {
    e.preventDefault();
    try {
        const { data: post } =  await http.post(
          config.apiEndpoint + 'AddNewStudent',
          this.state.values  
        );
        
        this.handleClose();
        this.componentDidMount();
    }catch (error) {
        console.error("Error adding student:", error);
        alert("Failed to add student. Please try again.");
      }
  }

  handleAdd = () => {
    this.setState({ showModal: true });
  };

 handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    const {length:count} = this.state.students;
    const {students : allStudents,currentPage,pageSize} = this.state;
    const students = pagination(allStudents,currentPage,pageSize);
    return (
      <React.Fragment>   
      <div>
<div className="container d-flex m-2" style={{ justifyContent: 'space-between' }}>
    <input 
      type="text" 
      id="search" 
      name="search" 
      placeholder="Search with Full Name or Email..." 
      onChange={this.handleInputChange}
      className="border p-2 rounded flex-grow" 
    />
    
    <button 
      onClick={this.handleSearch} 
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Search
    </button>

    <button 
      onClick={this.handleAdd} 
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
    >
      Add
    </button>

  </div>
      {showModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Registration Form</h5>
                  <button type="button" className="close" onClick={this.handleClose}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <form onSubmit={ this.handleSubmit}>
  <label htmlFor="fullName">Full Name</label>
  <input type="text" className="form-control" id="fullName" name="fullName" placeholder='please enter your Full Name ...' 
  onChange={this.handleChange}></input>

  <label htmlFor="email">Email Address</label>
  <input type="email" className="form-control" id="email" name="email" placeholder='please enter your E-mail ...'
  onChange={ this.handleChange}/>

  <label htmlFor="phoneNumber">Phone Number</label>
  <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder='please enter your phone Number ...'
  onChange={this.handleChange}/>

  <label htmlFor="age">Age</label>
  <input type="number" className="form-control" id="age" name="age" placeholder='please enter your age ...'
  onChange={ this.handleChange}/>
</form>
  </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.handleClose}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map(post => (
              <tr>
                <td>{post.fullName}</td>
                <td>{post.email}</td>
                <td>{post.phoneNumber}</td>
                <td>{post.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemCount={count} pageSize={this.state.pageSize}
         onPageChange={this.handleChangePage}
         currentPage={this.state.currentPage}/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
