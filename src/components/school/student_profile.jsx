import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import {requestUrl} from '../requests';

export default class School_Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data : {studentCohort: "", studentPhone: "", parentName: "", parentPhone: ""  },
        };
    }
    componentDidMount = () =>{
        const url = requestUrl + `/api/v1/getStudentProfile/?studentID=${this.props.location.state.pk}`;
        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data,
                isLoaded: true,
            });
            console.log(data)
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        return(
            <div className="container d-flex justify-content-center mt-2">
                <div className="login-form col-lg-6 col-12  p-1">
                        <div className="card mt-2  center-items center-items">
                            <div className="alert alert-primary text-center mt-4 mb-0" id="profile-info" role="alert">
                                <h5 className="m-1">
                                    {this.state.data.studentName}
                                </h5>
                            </div>
                            <div className="m-2 text-center">
                                <h6>
                                Ученик {this.state.data.className} класса
                                <br/>
                                </h6>
                            </div>
                        </div>
                        <div className="card mt-2 p-4 ">
                            <div className="center-items">
                                <Link to={{pathname:"/school/student_diary/", state:{pk: this.props.location.state.pk, cohortID: this.props.location.state.cohortID}}} className="btn btn-success p-3">Посмотреть дневник</Link>
                            </div>
                            <div className="center-items mt-2">
                                <Link to={{pathname:"/school/student_subjects/", state:{studentID: this.props.location.state.pk, cohortID: this.props.location.state.cohortID, studentName: this.state.data.studentName}}} className="btn btn-success p-3">Посмотреть оценки по предметам</Link>
                            </div>

                        </div>
                        <div className="card mt-2 ">
                            <div className="m-2 p-2  text-left">
                                <h6>
                                Родители:
                                <br/>
                                {this.state.data.parentName}
                                <br/>
                                Контакты: <a href={"tel:"+this.state.data.parentPhoneNumber} className="btn btn-success m-0 p-0 pr-1"> <i className="fa fa-phone p-1 mr-1"  aria-hidden="true"></i>{this.state.data.parentPhoneNumber}</a>
                                </h6>
                            </div>
                        </div>



                </div>
            </div>
        )
    }
}
