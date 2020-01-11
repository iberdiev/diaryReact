import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class OneTeacher extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.number}</td>
                <td><Link to = "/school/teacher_profile/">{this.props.name}</Link></td>
                <td><Link to = "/school/teacher_profile/"><span className="star"><i className="fa fa-star" aria-hidden="true"></i>{this.props.overall}</span></Link></td>

            </tr>
        )
    }
}

export default class Shool_Teachers extends Component {
    constructor(props){
        super(props);
        this.state = {
            teachers: [],
        }
        this.token = localStorage.getItem('token');
    }
    componentDidMount = () =>{

        axios.get('http://192.168.0.55:8080/api/v1/teachers/?school='+ localStorage.getItem('school'),{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            console.log(data)
            this.setState({
                teachers: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        const {teachers} = this.state
        return(
            <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-6 col-12  p-1 ">
            <h6 className="text-center mb-2">
                Учителя Школы {localStorage.getItem('school')}
            </h6>
            <div className="card p-3">
                <table id="table_id" className="table table-striped table-bordered display" style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Рейтинг</th>

                        </tr>
                    </thead>
                    <tbody>
                    {teachers.map((teacher, i) => (
                        <OneTeacher number={i+1} name={teacher.teacherName} overall="4.5"/>
                    ))}


                    </tbody>
                </table>
            </div>


        </div>
    </div>
        )
    }
}
