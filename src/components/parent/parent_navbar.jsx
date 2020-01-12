import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class SchoolNavbar extends Component {
    logout = event => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user_role');
        window.location.href = "/";
    }
    constructor(props){
      super(props);
      this.state = {
          data: [],
      }
  }
  componentWillMount = () =>{
      axios.get("http://192.168.0.55:8080/api/v1/getTheChild/",{
          headers:{
              Authorization:'Token ' + localStorage.getItem('token'),
          }
      }).then(res => {
          const data = res.data[0];
          this.setState({
              data: data,
          });
      })
      .catch(err =>{
          console.log(err.error);
      });
  }
  render() {
    const token = localStorage.getItem('token');
    return (
      <header>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
              <a className="navbar-brand" href="/">Дневник</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/"  className="nav-link">Главная</Link>
                  </li>
                  <li className="nav-item">
                    <Link to = {{pathname:"/parent/student_diary/", state:{pk: this.state.data.pk, cohortID: this.state.data.cohort}}}  className="nav-link">Дневник ученика</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/parent/student_statistics" className="nav-link">Успеваемость</Link>
                  </li>
                  <li className="nav-item">
                    <Link to ="/parent/student_teachers" className="nav-link" href="/">Учителя</Link>
                  </li>
                  <li><a className="nav-link" onClick={this.logout} href="#" disabled={!token} >Выйти</a> </li>
                </ul>

              </div>
            </nav>
      </header>
    )
  }
}
