import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class OneStudent extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.number}</td>
                <td><Link to = "/school/student_profile/">{this.props.name}</Link></td>
            </tr>
        )
    }
}

export default class School_student_list extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        };
        this.token = localStorage.getItem('token');
    }
    componentDidMount = () =>{

        const url = "http://192.168.0.55:8080/api/v1/students/?cohort=" + this.props.location.state.cohortID;

        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;

            this.setState({
                isLoaded: true,
                data: data,
            });
            // localStorage.removeItem('className')
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        const {data} = this.state;
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <h6 className="text-center m-2">
                        Ученики {this.props.location.state.className}
                    </h6>
                    <div className="card p-3">
                    <table id="table_id" className="table table-striped table-bordered display" style={{width:'100%'}}>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>ФИО</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, i) => (
                                <OneStudent number={i+1} name={student.studentName} />
                            ))}


                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
    }
}
