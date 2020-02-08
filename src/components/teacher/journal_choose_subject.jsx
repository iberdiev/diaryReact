import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {requestUrl} from '../requests';

export default class Teacher_Choose_Subject extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = {
            isLoaded: false,
            cohortID: this.props.location.state.cohortID,
            data : [],
        };
    }
    componentDidMount = () =>{

        axios.get(requestUrl + '/api/v1/subjects/?cohortID='+ this.props.location.state.cohortID,{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data,
            })
            console.log(data)
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        return(
            <div className="container d-flex justify-content-center mt-2">
                <div className="login-form col-lg-6 col-10  p-1">
                    
                    
                    <h6 className="m-2 text-center">
                        
                    </h6>
                    <div className="alert alert-primary m-1 mb-3" role="alert">
                        <h6 className="m-2 text-center">
                            Выберите предмет
                        </h6>
                    </div>
                    {this.state.data.map(subject=>(
                        <Link to = {{pathname :"/teacher/journal", state: {cohortID:this.state.cohortID, cohortName:this.props.location.state.cohortName, subjectID: subject.pk, subjectName: subject.subjectName}}}>
                            <div className="card m-2">
                                <div className="p-3 text-center">
                                    <p>{subject.subjectName}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}
