//Это профиль
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
// import SchoolMain from './school/school_main';
import MainSchool from './school/main_school';

import TeacherMain from './teacher/teacher_main';
import ParentMain from './parent/parent_main';

import Login from '../components/Entry';
export default class Home extends Component {


  render() {
    const userToken = localStorage.getItem('token');
    const userRole = localStorage.getItem('user_role');

    if (userToken != null){
        switch(userRole){
            case "1":
                return (
                    <MainSchool/>
                )

            case "2":
                return (
                    <TeacherMain/>
                    )
            case "3":
                return (
                    <ParentMain/>
                )
            default:
                return(
                    <div>
                        Sorry, You but you have invalid role.
                    </div>
                )
        }

        } else{
            return(
                <Login />
            )
        }
  }
}
