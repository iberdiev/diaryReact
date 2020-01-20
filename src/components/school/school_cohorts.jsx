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

        axios.get('http://192.168.0.55:8080/api/v1/get_cohorts/',{
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

    filterFunction(){
        var input, filter, a, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            var div = document.getElementById("row");
            a = div.getElementsByClassName("outer-card");
            for (i = 0; i < a.length; i++) {
              var txtValue = a[i].textContent || a[i].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
              } else {
                a[i].style.display = "none";
              }
            }
          }


    render() {
        const {data} = this.state
        return(
            <div>
                <div className="container d-flex justify-content-center mt-3">
                    <div className="login-form col-lg-6 col-12 text-center">
                        <h6 className="mb-2">
                            Классы Школы {localStorage.getItem('school')}
                        </h6>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                            </div>
                            <input type="text" className="form-control" id="myInput" onKeyUp={this.filterFunction} placeholder="Найдите класс" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="centering">
                            <div className="row" id="row">
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
