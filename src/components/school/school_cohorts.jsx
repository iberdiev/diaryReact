import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class OneCohort extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');

    }
    render() {
        return(
            <div className="outer-card">
                <Link to={{pathname: '/school/cohort', state: { className: this.props.class_name, mainTeacherName:this.props.mainTeacherName, cohortID: this.props.cohort_ID}}} >
                    <div className="card">{this.props.class_name} </div>
                </Link>
            </div>
        )
    }
}

export default class Cohorts extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        };
        this.token = localStorage.getItem('token');
    }
    componentDidMount = () =>{

        axios.get('http://127.0.0.1:8080/api/v1/get_cohorts/',{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            console.log(data)
            this.setState({
                isLoaded: true,
                data: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        const {data} = this.state
        return(
            <div>
                <div className="container d-flex justify-content-center mt-3">
                    <div className="login-form col-lg-6 col-12 text-center">
                        <h6 >
                            Классы Школы № 34
                        </h6>
                        <div className="centering">
                            <div className="row">
                            {data.map(cohort => (
                                    <OneCohort mainTeacherName={cohort.mainTeacherID.teacherName} class_name={cohort.class_name} cohort_ID={cohort.pk} />
                            ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
