import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Teacher_One_Cohort extends Component {
    constructor(props){
        super(props);
        this.state = {
            cohort_ID: props.location.state.cohortID,
            className: props.location.state.className,
            data : [{class_name: "10-А", pk: 4},{class_name: "11-Б", pk: 4}],
        };
        
    };
    
    render() {
        const hello = "hello";

        return(
            <div className="container d-flex justify-content-center mt-2">
                <div className="login-form col-lg-6 col-10  p-1">
                    <h6 className="m-2 text-center">
                    </h6>
                    <div className="alert alert-primary m-1 mb-3" role="alert">
                        <h6 className="m-2 text-center">
                            {this.props.location.state.className} класс
                        </h6>
                        {/* Классный руководитель: <br/>
                        <strong>Анара Женишбекова</strong> */}
                    </div>
                    <Link to={{pathname:"/teacher/teacher_student_list", state:{cohortID:this.props.location.state.cohortID}}} >
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Список Учеников</p>
                            </div>
                        </div>
                    </Link>
                    <Link to={{pathname:"/teacher/cohort_time_table", state:{cohortID:this.props.location.state.cohortID}}}>
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Расписание</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={{pathname:"/teacher/journal_choose_subject", state:{cohortID:this.props.location.state.cohortID, cohortName: this.props.location.state.cohortName}}}>
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Журнал</p>
                            </div>
                        </div>
                    </Link>
                    
                </div>
            </div>
        )
    }
}
