import React, {  Component } from 'react'
// import axios from 'axios';
import { Link } from 'react-router-dom';
import {requestUrl} from '../requests';


export default class Shool_Teachers_Profile extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = {
            data : [{class_name: "10-А", pk: 4},{class_name: "11-Б", pk: 4}],
        };
    }
    render() {
        return(
            <div className="container d-flex justify-content-center mt-2">
                <div className="login-form col-lg-6 col-12  p-1">
                        <div className="card mt-2  center-items center-items">
                            <div className="alert alert-primary text-center mt-4 mb-0" id="profile-info" role="alert">
                                <h5 className="m-1">
                                    Алия Алимбекова
                                </h5>
                            </div>
                            <div className="m-2">
                                <h6 className="m-2">
                                Учитель Школы № 45
                                </h6>
                                <h6 className="m-2">
                                Классный руководитель: 4-А класса
                                </h6>
                                <h6 className="m-2">
                                Контакты: <i className="fa fa-phone p-1 mr-1 bg-success" style={{color: 'white', borderRadius: '5px'}} aria-hidden="true"></i>077777777
                                </h6>

                            </div>
                        </div>
                        <div className="card mt-2 p-4 center-items">
                            <Link to={{pathname:"/school/teacher_time_table/",state:{teacherID:this.props.location.state.teacherID}}}  className="btn btn-success">Посмотреть расписание преподователя</Link>
                        </div>




                </div>
            </div>
        )
    }
}
