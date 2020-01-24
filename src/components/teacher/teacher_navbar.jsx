import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {requestUrl} from '../requests';

export default class SchoolNavbar extends Component {
      constructor(props){
        super(props);
        this.state = {
            teacherID: null,
            collapsed: false
        }
    }
    componentWillMount = () =>{
        axios.get(requestUrl + "/api/v1/getTeacherID/",{
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
          <nav className="navbar navbar-dark navbar-expand-lg bg-primary text-white p-0">
              <a className="navbar-brand p-2 center-items" href="/"><i className="fa fa-book ml-4 ml-1" style={{fontSize:"40px"}}></i> Дневник
              </a>
              <button className="navbar-toggler m-2" type="button" onClick={()=>this.setState({collapsed:true})} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={this.state.collapsed?"collapse navbar-collapse show":"collapse navbar-collapse"} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to='/' className="nav-link p-3" onClick={()=>this.setState({collapsed:false})} >Главная</Link>
                  </li>
                  <li className="nav-item">
                    <Link to = {{pathname:"/teacher/teacher_time_table/", state:{teacherID:this.state.teacherID}}}  className="nav-link p-3" onClick={()=>this.setState({collapsed:false})}>Расписание</Link>
                  </li>
                  <li className="nav-item ">
                    <Link  to="/teacher/cohorts" className="nav-link p-3" onClick={()=>this.setState({collapsed:false})}>Классы</Link>
                  </li>
                  <li className="nav-item "><a className="nav-link p-3" onClick={this.logout} href="#" disabled={!token} >Выйти</a> </li>
                </ul>
                

              </div>
            </nav>
      </header>
    )
  }
}
