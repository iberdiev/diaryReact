import React, {  Component } from 'react'
// import axios from 'axios';
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
                            {this.props.location.state.className}
                        </h6>
                        Классный руководитель: <br/>
                        <strong>{this.props.location.state.mainTeacherName}</strong>
                    </div>

                    <Link to={{pathname: "school_student_list", state: {className: this.props.location.state.className, cohortID: this.props.location.state.cohortID}}}  style={{color: 'inherit', textDecoration: 'none'}}>
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Список Учеников</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={{pathname: "cohort_time_table/", state: {className: this.props.location.state.className, cohortID: this.props.location.state.cohortID}}} style={{color: 'inherit', textDecoration: 'none'}}>
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Расписание</p>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        )
    }
}
