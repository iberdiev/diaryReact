import React, {  Component } from 'react'
// import axios from 'axios';
import { Link } from 'react-router-dom';


export default class MainSchool extends Component {
    constructor(props){
        super(props);
        this.state = {

            classesID: 15,

        };
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div>
                <div className="container d-flex justify-content-center mt-5">
                    <div className="login-form col-lg-6 col-10  p-1">
                        <div className="alert alert-success" role="alert">
                            Здравствуйте <strong>Школа {localStorage.getItem('school')}</strong> <br/> Вы успешно вошли в систему Дневник
                        </div>
                        <Link to="/school/school_cohorts/" style={{color: 'inherit', textDecoration: 'none'}}>
                            <div className="card">
                                <div className="">
                                    <div className="row ">
                                        <div className="col-8">
                                            <h5 className="p-2">Классы</h5>
                                            <p className="p-2">Ученики <br/> Расписание<br/> Предметы</p>
                                        </div>
                                        <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-address-book" aria-hidden="true"></i></h1></div>

                                    </div>

                                </div>
                            </div>
                        </Link>
                        <Link to="/school/teachers/" style={{color: 'inherit', textDecoration: 'none'}}>
                            <div className="card mt-3">
                                <div className="">
                                    <div className="row ">
                                        <div className="col-8">
                                            <h5 className="p-2">Учителя</h5>
                                            <p className="p-2">Список <br/> Рейтинг</p>
                                        </div>
                                        <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-users" aria-hidden="true"></i></h1></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
