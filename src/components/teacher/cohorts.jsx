import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Teacher_Cohorts extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [{class_name: "10-А", pk: 4},{class_name: "11-Б", pk: 4}],
        };
    }
    render() {
        return (
            <div className="container d-flex justify-content-center mt-5">
                
                <div className="login-form col-lg-6 col-10  p-1 text-center">
                <h6 >
                            Мои классы
                </h6>

                {this.state.data.map(cohort => (
                    <Link to={{pathname: '/teacher/one_cohort', state: { cohortID: cohort.pk, className: cohort.class_name}}}>
                        <div className="card m-2 p-3 ">
                            <h5 className="">
                               {cohort.class_name}
                            </h5>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        )
    }
}
