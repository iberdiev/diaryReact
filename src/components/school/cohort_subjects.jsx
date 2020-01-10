import React, {  Component } from 'react'
import axios from 'axios';
// import { Link } from 'react-router-dom';

export default class Shool_Teachers extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
        };
    }
    componentDidMount = () =>{
        const url = 'http://127.0.0.1:8080/api/v1/subjects/?cohort=' + this.props.location.state.cohortID;
        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            console.log(data);
            this.setState({
                data: data,
            })
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
                    <h6 className="text-center">
                        Класс {this.props.location.state.className}
                    </h6>
                    <div className="pl-3 pr-3 mt-2 mb-1">
                        <div className="row"><div className="col-4  text-center btn-link" ><h6>Предметы</h6></div><div className="col-8 text-center btn-link"><h6>Преподователи</h6></div></div>
                    </div>
                    {data.map(subject => (
                        <OneSubject subjectName={subject.subjectName} teacherName={subject.teacherID.teacherName} />
                    ))}
                </div>
            </div>
        )
    }
}

class OneSubject extends Component {

    render() {
        return(
            <div className="card p-2 ">
                <div className="row"><div className="col-4 ml-1 text-center" >{this.props.subjectName}</div><div className="col-7 text-center">{this.props.teacherName}</div></div>
            </div>
        )
    }
}
