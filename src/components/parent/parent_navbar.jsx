import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {requestUrl} from '../requests';


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
          data: [{pk:"",cohort:""}],
      }
  }
  componentWillMount = () =>{
      axios.get(requestUrl + "/api/v1/getTheChild/",{
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
          <nav className="navbar navbar-dark navbar-expand-lg bg-primary text-white p-0">
              <Link to="/" className="navbar-brand p-2 center-items" onClick={()=>this.setState({collapsed:false})}><i className="fa fa-book ml-4 ml-1" style={{fontSize:"40px"}}></i> Дневник
              </Link>
              <button className="navbar-toggler m-2" type="button" onClick={()=>this.setState({collapsed:true})} data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={this.state.collapsed?"collapse navbar-collapse show":"collapse navbar-collapse"} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/"  className="nav-link p-3" onClick={()=>this.setState({collapsed:false})}>Главная</Link>
                  </li>
                  <li className="nav-item">
                    <Link to = {{pathname:"/parent/student_diary/", state:{pk: this.state.data.pk, cohortID: this.state.data.cohort}}}  className="nav-link p-3" onClick={()=>this.setState({collapsed:false})}>Дневник ученика</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={{pathname:"/parent/student_statistics/", state:{pk: this.state.data.pk, cohortID: this.state.data.cohort}}}  className="nav-link p-3" onClick={()=>this.setState({collapsed:false})}>Успеваемость</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={{pathname:"/parent/student_subjects", state:{cohortID: this.state.data.cohort}}} className="nav-link p-3" onClick={()=>this.setState({collapsed:false})} >Предметы </Link>
                  </li>
                  
                  <li className="nav-item "><Link className="nav-link p-3" onClick={this.logout} href="#" disabled={!token} >Выйти</Link> </li>
                </ul>
                

              </div>
            </nav>
      </header>
    )
  }
}
