import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Parent_Main extends Component {
    render() {
        return (
            <div className="container d-flex justify-content-center mt-3">
                <div className="login-form col-lg-6 col-10  p-1" >
                    <div className="alert alert-success" role="alert">
                        Такой страницы не существует. Нажмите эту кнопку чтобы зайти в главную страницу
                    </div>
                    <Link to={{pathname:"/school/student_diary/", state:{pk: data.pk}}}>
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
