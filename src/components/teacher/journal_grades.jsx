import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Teacher_Journal_Grade extends Component {
    render() {
        return (
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
                            <Link to ="/teacher/journal" className="swipe-button grades center-items">Повседневные</Link>
                            <Link to ="/teacher/journal_grades" className="swipe-button grades bg-success center-items text-white">Итоговые</Link>
                        </div>
                    </div>
                    <div className="journal">
                        <div className="names nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a  className="nav-link p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"   ><p><input type="checkbox" className="mr-1"/>ФИО</p></a>
                            <a className="nav-link active p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"   ><p><input type="checkbox" className="mr-1"/>Meerbek Akimzhanodsdfsfsdv</p></a>
                            <a className="nav-link p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"   ><p><input type="checkbox" className="mr-1"/>Meerbek Akimzhanov</p></a>
                            <a className="nav-link p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"   ><p><input type="checkbox" className="mr-1"/>Meerbek Akimzhanov</p></a>
                            <a className="nav-link p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"   ><p><input type="checkbox" className="mr-1"/>Meerbek Akimzhanov</p></a>
                            <a className="nav-link p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"   ><p><input type="checkbox" className="mr-1"/>Meerbek Akimzhanov</p></a>
                            <a className="nav-link p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"   ><p><input type="checkbox" className="mr-1"/>Meerbek Akimzhanov</p></a>
                        </div>
                        <div className="osenki">
                            <div class="name text-center">
                                Ученик: Акимжанов Мээрбек
                            </div>
                            <table id="" className="table table-striped table-bordered bg-success text-white " style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th className="p-1">Предмет</th>
                                        <th className="p-1">I</th>
                                        <th className="p-1">II</th>
                                        <th className="p-1">III</th>
                                        <th className="p-1">IV</th>
                                        <th className="p-1">Итог</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-0">
                                            <p className="mt-1 mb-1 text-center">Алгебра</p>
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
                                    </tr>
                                    <tr>
                                        <td className="p-0">
                                            <p className="mt-1 mb-1 text-center">Алгебра</p>
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
                                    </tr>
                                    <tr>
                                        <td className="p-0">
                                            <p className="mt-1 mb-1 text-center">Алгебра</p>
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
                                    </tr>
                                    

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
