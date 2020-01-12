import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class One_Student_Name extends Component{
    render(){
        return(
            <tr>
                <td className="p-0">
                    <a href="./teacher/student_profile">
                        <p className="mt-1 mb-1"><input type="checkbox" id={this.props.studentID} className="mr-1"/>{this.props.name}</p>
                    </a>
                </td>
            </tr>
        )
    }
}


export default class Teacher_Journal extends Component {
    render() {
        return (
            <div>
                <div className="mt-2 center-items">
                    <div className="col-12  p-1 ">
                        <h6 className="text-center m-2">
                            Журнал 10-А класса
                        </h6>
                        <h6 className="text-center m-2">
                            Предмет: Русский язык
                        </h6>
                        <p className="text-center">Оценки</p>

                        <div className="contaner center-items m-3">
                            <div className="swipe center-items">
                                <Link to="journal" className="swipe-button grades bg-success center-items text-white">Повседневные</Link>
                                <Link to="journal_grades" className="swipe-button grades center-items">Итоговые</Link>
                            </div>
                        </div>
                        <div className="journal">
                            <div className="names p-0 ">
                                <table id="" className="table table-striped table-bordered display " style={{width:'100%'}}>
                                    <thead>
                                        <tr>
                                            <th className="p-1"><input type="checkbox" className="mr-1"/>ФИО</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <One_Student_Name name="Meerbek Akimzhanov" studentID="15"/>

                                        <tr>
                                            <td className="p-0">
                                                <a href="student-profile.html">
                                                    <p className="mt-1 mb-1"><input type="checkbox" className="mr-1"/>Meerbek Akimzhanov</p>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="line"></div>
                            <div className="osenki ">
                                <table id="" className="table table-striped table-bordered display " style={{width:'100%'}}>
                                    <thead>
                                        <tr>
                                            <th className="p-1">05.07</th>
                                            <th className="p-1">06.07</th>
                                            <th className="p-1">07.07</th>
                                            <th className="p-1">08.07</th>
                                            <th className="p-1">09.07</th>
                                            <th className="p-1">10.07</th>
                                            <th className="p-1">11.07</th>
                                            <th className="p-1">12.07</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {/* Количество tr зависит от количество имён */}

                                        <tr>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center"><a data-toggle="modal" data-target="#exampleModal"><i className="fa fa-plus-circle" aria-hidden="true"></i> Добавить</a></p>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">5</p>
                                            </td>
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center"><a data-toggle="modal" data-target="#exampleModal"><i className="fa fa-plus-circle" aria-hidden="true"></i> Добавить</a></p>
                                            </td>
                                            
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Оценка в журнал</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Ученику - Акимжанов Мээрбек
                                <br/> Оценка - Ещё не выбрано
                                <div>
                                    <button className="btn btn-success">
                                        5
                                    </button>
                                    <button className="btn btn-primary">
                                        4
                                    </button>
                                    <button className="btn btn-warning">
                                        3
                                    </button>
                                    <button className="btn btn-danger">
                                        2
                                    </button>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="button" className="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
