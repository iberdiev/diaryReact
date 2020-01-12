import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Parent_Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillMount = () =>{
        axios.get("http://192.168.0.55:8080/api/v1/getTheChild/",{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data[0];
            this.setState({
                data: data,
            });
            console.log(data)
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        const {data} = this.state;
        return (
            <div className="container d-flex justify-content-center mt-3">
                <div className="login-form col-lg-6 col-10  p-1" >
                    <div className="alert alert-success" role="alert">
                        Здравствуйте, родитель ученика {data.studentName}
                    </div>
                    <Link to={{pathname:"/parent/student_diary/", state:{pk: data.pk, cohortID: data.cohort}}}>
                     <div className="card">
                    <div className="">
                        <div className="row ">
                            <div className="col-8">
                                <h5 className="p-2">Дневник</h5>
                                <p className="p-2">Расписание <br/> Оценки <br/> Домашние задания</p>
                            </div>
                            <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-address-book" aria-hidden="true"></i></h1></div>

                        </div>

                    </div>
                    </div>
                    </Link>

                    <Link to="/parent/student_statistics">
                    <div className="card mt-3">
                        <div className="">
                            <div className="row ">
                                <div className="col-8">
                                    <h5 className="p-2">Успеваемость вашего ребёнка</h5>
                                    <p className="p-2">Статистики <br/> Рекомендации</p>
                                </div>
                                <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-line-chart" aria-hidden="true"></i></h1></div>

                            </div>


                        </div>
                    </div>
                    </Link>
                    <Link to ="/parent/student_teachers">
                    <div className="card mt-3">
                        <div className="">
                            <div className="row ">
                                <div className="col-8">
                                    <h5 className="p-2">Учителя</h5>
                                    <p className="p-2">Рейтиннги <br/> Оценивания учителей</p>
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
