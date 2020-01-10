import React, {  Component } from 'react'
// import axios from 'axios';
import { Link } from 'react-router-dom';


export default class School_Profile extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="container d-flex justify-content-center mt-2">
                <div className="login-form col-lg-6 col-12  p-1">
                        <div className="card mt-2  center-items center-items">
                            <div className="alert alert-primary text-center mt-4 mb-0" id="profile-info" role="alert">
                                <h5 className="m-1">
                                    Мээрбек Акимжанов
                                </h5>
                            </div>
                            <div className="m-2 text-center">
                                <h6>
                                Ученик 10-А класса
                                <br/>
                                Контакты: <i className="fa fa-phone p-1 mr-1 bg-success" style={{color: 'white', borderRadius: '5px'}} aria-hidden="true"></i>077777777
                                </h6>
                            </div>
                        </div>
                        <div className="card mt-2 p-4 center-items">
                            <Link to="/shool/student-diary/" className="btn btn-success">Посмотреть дневник</Link>
                        </div>
                        <div className="card mt-2 ">
                            <div className="m-2 p-2  text-left">
                                <h6>
                                Родители:
                                <br/>
                                Мама: Айжана Алимбекова
                                <br/>
                                Контакты: <a href="tel:077777777" className="btn btn-success m-0 p-0 pr-1"> <i className="fa fa-phone p-1 mr-1"  aria-hidden="true"></i>077777777</a>
                                </h6>
                            </div>
                        </div>



                </div>
            </div>
        )
    }
}
