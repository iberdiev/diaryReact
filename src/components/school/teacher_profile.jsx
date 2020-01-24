import React, {  Component } from 'react'
import axios from 'axios';
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
    componentDidMount = () =>{

        // Axios for student list

        axios.get(requestUrl + '/api/v1/getTeacherDetails/?pk='+ this.props.location.state.teacherID,{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data
            })
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
                                    {this.state.data.teacherName}
                                </h5>
                            </div>
                            <div className="m-2">
                                <h6 className="m-2">
                                Учитель Школы № 45
                                </h6>
                                <h6 className="m-2">
                                Классный руководитель: {!(this.state.data.mainCohorts==[])? <span>Нет класса</span>:<span>{this.state.data.mainCohorts}</span>}
                                </h6>
                                <h6 className="m-2">
                                Контакты: <i className="fa fa-phone p-1 mr-1 bg-success" style={{color: 'white', borderRadius: '5px'}} aria-hidden="true"></i>{this.state.data.teacherPhone}
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
