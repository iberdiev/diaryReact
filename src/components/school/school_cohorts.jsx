import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class One_Cohort extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
        this.classeID = this.props.cohort_ID;
        this.token = localStorage.getItem('token');
        
    }
    render() {
        return(
            <div className="outer-card"><Link  to="/school/school_student_list"><div className="card">11-A ahfywepcrbq </div></Link></div>
        )
    }
}

export default class Cohorts extends Component {
    constructor(props){
        super(props);
        this.state = {

            classesID: 15,

        };
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div>
                <div className="container d-flex justify-content-center mt-3">
                    <div className="login-form col-lg-6 col-12 text-center">
                        <h6 >
                            Классы Школы № 34
                        </h6>
                        <div className="centering">
                            <div className="row">

                                <One_Cohort cohort_ID={5}/>
                                <One_Cohort cohort_ID={14}/>
                                <One_Cohort cohort_ID={15}/>

            
                            </div>
                        </div>
                        
                    </div>
                        
                </div>
            </div>
        )
    }
}
