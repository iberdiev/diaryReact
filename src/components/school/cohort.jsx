import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Shool_Teachers extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="container d-flex justify-content-center mt-2">
                <div className="login-form col-lg-6 col-10  p-1">
                    
                    <h6 className="m-2 text-center">
                        
                    </h6>
                    <div className="alert alert-primary m-1 mb-3" role="alert">
                        <h6 className="m-2 text-center">
                            10-А класс
                        </h6>
                        Классный руководитель: <br/>
                        <strong>Анара Женишбекова</strong>
                    </div>
                    
                    <Link to="school_student_list"  style={{color: 'inherit', textDecoration: 'none'}}>
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Список Учеников</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="cohort_time_table" style={{color: 'inherit', textDecoration: 'none'}}>
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Расписание</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="cohort_subjects" style={{color: 'inherit', textDecoration: 'none'}}>
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Предметы</p>
                            </div>
                        </div>
                    </Link>
                    
                </div>
            </div>
        )
    }
}
