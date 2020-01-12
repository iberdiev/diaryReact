import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class School_Profile extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = {
            subjects : [],
        }
    }
    componentDidMount = () =>{
        axios.get("http://192.168.0.55:8080/api/v1/subjects/?cohortID=" + this.props.location.state.cohortID,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                subjects: data,
            });
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        const {subjects} = this.state;
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <h6 className="text-center">
                        Учителя 10-А класса
                    </h6>
                    <div className="pl-3 pr-3 mt-2 mb-1">
                        <div className="row"><div className="col-4  text-center btn-link" ><h6>Предметы</h6></div><div className="col-8 text-center btn-link"><h6>Преподователи</h6></div></div>
                    </div>

                    {subjects.map((subject) => (
                        <div className="card p-2 ">
                            <div className="row"><div className="col-4 ml-1 text-center" >{subject.subjectName}</div><div className="col-7 text-center">{subject.teacherID.teacherName}</div></div>
                        </div>
                    ))}
                </div>

            </div>
        )
    }
}
