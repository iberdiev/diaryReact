import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {requestUrl} from '../requests';



export default class Parent_Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [[],[],[],[],[],[],[],[]],
            chosenStudent: 0,
        }
    }
    componentDidMount = () =>{
        axios.get(requestUrl + "/api/v1/getTheChild/",{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            // const data = res.data[0];
            console.log(res.data);
            const data = res.data;

            this.setState({
                data: data,
            });
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    changeStudent = event => {
        // event.preventDefault();

        this.setState({
            chosenStudent: event.target.value,
        });
        localStorage.setItem('studentIndex', event.target.value);
    }
    render() {
        const data = this.state.data;
        const index = localStorage.getItem('studentIndex');

        return (
            <div className="container d-flex justify-content-center mt-3">
                <div className="login-form col-lg-6 col-10  p-1" >
                    <div className="alert alert-success" role="alert">
                        Здравствуйте, родитель ученика {data[index].studentName}
                    </div>

                    <select className="custom-select mb-3"  onChange={this.changeStudent}>
                        {this.state.data.map(function(student, i){
                            return (
                                <option key={i} selected={i===index} value={i}>{student.studentName} </option>)
                        })}
                    </select>

                    <Link to={{pathname:"/parent/student_diary/", state:{pk: data[index].pk, cohortID: data[index].cohort}}}>
                     <div className="card">
                    <div className="">
                        <div className="row ">
                            <div className="col-8">
                                <h5 className="p-2">Дневник</h5>
                                <p className="p-2">Расписание <br/> Оценки <br/> Домашние задания</p>
                            </div>
                            <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-address-book" ></i></h1></div>

                        </div>

                    </div>
                    </div>
                    </Link>

                    <Link to={{pathname:"/parent/student_statistics", state:{studentID: data[index].pk, studentName: data[index].studentName}}}>
                    <div className="card mt-3">
                        <div className="">
                            <div className="row ">
                                <div className="col-8">
                                    <h5 className="p-2">Успеваемость вашего ребёнка</h5>
                                    <p className="p-2">Статистики <br/> Рекомендации</p>
                                </div>
                                <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-line-chart" ></i></h1></div>

                            </div>


                        </div>
                    </div>
                    </Link>
                    <Link to={{pathname:"/parent/student_subjects", state:{studentID: data[index].pk, cohortID: data[index].cohort, studentName: data[index].studentName}}}>
                    <div className="card mt-3">
                        <div className="">
                            <div className="row ">
                                <div className="col-8">
                                    <h5 className="p-2">Предметы</h5>
                                    <p className="p-2">Рейтиннги <br/> Оценивания учителей</p>
                                </div>
                                <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-users" ></i></h1></div>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        )
    }
}
