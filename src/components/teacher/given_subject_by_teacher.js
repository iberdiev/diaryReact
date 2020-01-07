import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

export default class GivenSubjectByTeacher extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
        };
    }
    componentDidMount = () =>{

        const url = "http://192.168.0.55:8080/api/v1/givenSubjectsOfTeacherStudentListView/?subject=" + this.props.location.state.subjectID;
        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
    const subjectName = this.props.location.state.subjectName;
    const students = this.state.data;
    return (

        <div>
          <h3>{subjectName}</h3>
          <Table striped>
              <thead>
                  <tr>
                    <th>#</th>
                    <th>Ученик</th>
                  </tr>
              </thead>
              <tbody>
                  {students.map((student,i) => (


                               <tr>
                                   <th scope ="row">{i+1}</th>
                                       <td>
                                           <Link to={{pathname: '/teacher/givenSubjects/student/', state:
                                                         {studentName: student.studentName,
                                                          subjectName: subjectName,
                                                          studentID: student.pk,
                                                          subjectID: this.props.location.state.subjectID}
                                                    }}>
                                                    <h5 key={student.studentName}>{student.studentName}</h5>
                                           </Link>
                                       </td>
                               </tr>


                  ))}
            </tbody>
          </Table>
        </div>
    );
    }
}
