import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class One_Student extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.number}</td>
                <td><Link to = "/teacher/student_profile/">{this.props.name}</Link></td>
            </tr>
        )
    }
}

export default class Teacher_Student_List extends Component {
    constructor(props){
        super(props);
        this.state = {

            classesID: 15,

        };
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <h6 className="text-center m-2">
                        Ученики 10-А класса
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
                            <One_Student number="1" name="Meerbek Akimzhanov"/>
                            <One_Student number="2" name="Meerbek Akimzhanov"/>

                        </tbody>
                    </table>
                </div>           
                </div>
            </div>
        )
    }
}
