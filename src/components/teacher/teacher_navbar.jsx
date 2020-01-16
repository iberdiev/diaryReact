import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SchoolNavbar extends Component {
      constructor(props){
        super(props);
        this.state = {
            teacherID: null,
        }
    }
    componentWillMount = () =>{
        axios.get("http://192.168.0.55:8080/api/v1/getTeacherID/",{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                teacherID: res.data,
            });
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    logout = event => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user_role');
        window.location.href = "/";
    }
  render() {
    const token = localStorage.getItem('token');
    return (
      <header>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
          <nav className="navbar navbar-expand-lg bg-primary text-white">
              <a className="navbar-brand" href="/">Дневник</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to='/' className="nav-link" >Главная</Link>
                  </li>
                  <li className="nav-item">
                    <Link to = {{pathname:"/teacher/teacher_time_table/", state:{teacherID:this.state.teacherID}}} className="nav-link" >Расписание</Link>
                  </li>
                  <li className="nav-item">
                    <Link  to="/teacher/cohorts" className="nav-link" >Классы</Link>
                  </li>
                  <li><a className="nav-link" onClick={this.logout} href="#" disabled={!token} >Выйти</a> </li>
                </ul>

              </div>
            </nav>
      </header>
    )
  }
}
