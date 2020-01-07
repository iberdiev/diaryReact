//Это профиль
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import SchoolMain from './school/school_main';
import TeacherMain from './teacher/teacher_main';
import ParentMain from './parent/parent_main';

import Login from '../components/Entry';
export default class Home extends Component {
    onSubmit = event => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user_role');
        this.props.history.push('/');
        window.location.reload();
    }

  render() {
      const userToken = localStorage.getItem('token');
      const userRole = localStorage.getItem('user_role');
    // return (
    //   <Grid>
    //     <Jumbotron>
    //       <h2>Добро пожаловать в онлайн дневник!</h2>
    //       <p>Онлайн дневник был разработан Эльдияром и Искендером</p>
    //       <Link to="/about">
    //         <Button bsStyle="primary">Узнать больше</Button>
    //       </Link>
    //     </Jumbotron>
    //   </Grid>
    //
    //
    // )
    if (userToken != null){
        switch(userRole){
            case "1":
                return (
                    <SchoolMain/>
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
