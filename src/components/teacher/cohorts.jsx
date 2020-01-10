import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Teacher_Cohorts extends Component {
    render() {
        return (
            <div className="container d-flex justify-content-center mt-5">
                
                <div className="login-form col-lg-6 col-10  p-1 text-center">
                <h6 >
                            Классы Школы № 34
                </h6>
                    <Link to="/teacher/one_cohort">
                        <div className="card m-2 p-3 ">
                            <h5 className="">
                                10-А
                            </h5>
                        </div>
                    </Link>
                    <Link to="/teacher/one_cohort">
                        <div className="card m-2 p-3 ">
                            <h5 className="">
                                10-А
                            </h5>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
