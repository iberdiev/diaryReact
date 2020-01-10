import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Teacher_Main extends Component {
    render() {
        return (
            <div className="container d-flex justify-content-center mt-5">
                <div className="login-form col-lg-6 col-10  p-1">
                    <div className="alert alert-success" role="alert">
                        Здравствуйте, <strong>Марина Александровна</strong> 
                    </div>
                    <Link to="/teacher/teacher_time_table">
                        <div className="card">
                            <div className="">
                                <div className="row ">
                                    <div className="col-8">
                                        <h5 className="p-2">Расписание</h5>
                                        <p className="p-2">Мои личные расписание уроков</p>
                                    </div>
                                    <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-list-alt" aria-hidden="true"></i></h1></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/teacher/cohorts">
                        <div className="card mt-3">
                            <div className="">
                                <div className="row ">
                                    <div className="col-8">
                                        <h5 className="p-2">Классы</h5>
                                        <p className="p-2">Классы которых я провожу</p>
                                    </div>
                                    <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-users" aria-hidden="true"></i></h1></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
