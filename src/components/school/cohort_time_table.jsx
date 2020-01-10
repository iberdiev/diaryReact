import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Cohort_Time_Table extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <div className="owl-carousel owlExample">
                        <div className="item" id="bookmark1">
                            <div className="p-1 row">
                                    
                                <div className="col-8">Пятница - 7 января 2020</div>
                                <div className="date-picker">
                                    <span className="btn-link">Сегодня</span>
                                    <span>date</span>
                                    
                                </div>
                            </div>
                            <div className="col-12"><h2 className="text-center mt-3 mb-4 btn-link">Пятница</h2></div>
                            <div className="pl-3 p-2">
                                <div className="row">
                                    <div className="col-6  text-center btn-link" ><h3>Время</h3></div>
                                    <div className="col-6  text-center btn-link" ><h3>Урок</h3></div>
                                </div>
                            </div>
                            
                            <div className="card p-2 ">
                                <div className="row">
                                    <div className="col-6 text-center" >9:15-10:00</div>
                                    <div className="col-6 text-center" >Алгебра</div>
                                    
                                </div>
                            </div>
                            <div className="card p-2 ">
                                <div className="row">
                                    <div className="col-6 text-center" >9:15-10:00</div>
                                    <div className="col-6 text-center" >Алгебsdssра</div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="item" id="bookmark2">
                            <div className="p-1 row">
                                    
                                <div className="col-8">Суббота - 7 января 2020</div>
                                <div className="date-picker">
                                    <span className="btn-link">Сегодня</span>
                                    <span>date</span>
                                    
                                </div>
                            </div>
                            <div className="col-12"><h2 className="text-center mt-3 mb-4 btn-link">Суббота</h2></div>
                            <div className="pl-3 p-2">
                                <div className="row">
                                    <div className="col-6  text-center btn-link" ><h3>Время</h3></div>
                                    <div className="col-6  text-center btn-link" ><h3>Урок</h3></div>
                                </div>
                            </div>
                            
                            <div className="card p-2 ">
                                <div className="row">
                                    <div className="col-6 text-center" >9:15-10:00</div>
                                    <div className="col-6 text-center" >Алгебра</div>
                                    
                                </div>
                            </div>
                            <div className="card p-2 ">
                                <div className="row">
                                    <div className="col-6 text-center" >9:15-10:00</div>
                                    <div className="col-6 text-center" >Алгебsdssра</div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
                
            </div>
        )
    }
}
