import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {requestUrl} from '../requests';

export default class Teacher_Cohorts extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [{cohortName:'',cohortID:null}]
        };
    }
    componentDidMount = () =>{
        axios.get(requestUrl + "/api/v1/getUniqueCohortsByTaught/",{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            let filteredData = []; 
            let uniqueObject = {}; 
            for (var i in data) { 
                var objTitle = data[i]['cohortName']; 
                uniqueObject[objTitle] = data[i]; 
            }
            for (i in uniqueObject) { 
                filteredData.push(uniqueObject[i]); 
            } 
            this.setState({
                data: filteredData,
            });
            console.log(filteredData)

        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        return (
            <div className="container d-flex justify-content-center mt-5">
                
                <div className="login-form col-lg-6 col-10  p-1 text-center">
                <h2 >
                            Мои классы
                </h2>

                {this.state.data.map((cohort,i) => (
                    <Link key={i} to={{pathname: '/teacher/one_cohort', state: { cohortID: cohort.cohortID, cohortName: cohort.cohortName}}}>
                        <div className="card m-3 p-4 ">
                            <h4 className="">
                               {cohort.cohortName}
                            </h4>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        )
    }
}
