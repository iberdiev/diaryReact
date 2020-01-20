import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class School_Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data : {studentCohort: "10-А", studentPhone: "07777777", parentName: "Айжана Алимбекова", parentPhone: "055555555"  },
        };
    }
    componentDidMount = () =>{
        const url = `http://192.168.0.55:8080/api/v1/getStudentProfile/?studentID=22`;
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
                                Контакты: <i className="fa fa-phone p-1 mr-1 bg-success" style={{color: 'white', borderRadius: '5px'}} aria-hidden="true"></i>{this.state.data.phoneNumber}
                                </h6>
                            </div>
                        </div>
                        <div className="card mt-2 p-4 center-items">
                            <Link to={{pathname:"/school/student_diary/", state:{pk: this.props.location.state.pk, cohortID: this.props.location.state.cohortID}}} className="btn btn-success">Посмотреть дневник</Link>
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
