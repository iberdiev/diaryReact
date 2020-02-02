import React, {  Component } from 'react'
import axios from 'axios';
import {requestUrl} from '../requests';

export default class Student_Subjects extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = {
            cohortID: this.props.location.state.cohortID,
            subjectID: this.props.location.state.subjectID,
            data : [],
            finalGrades: ['-','-','-','-','-'],
            regularGrades: [
                {
                    "mark": '-',
                    "lesson": '-',
                    "date": "-"
                }],
            subjectName: ""
        };
    }
    componentDidMount = () =>{

        // Axios for student list

        axios.get(requestUrl + '/api/v1/studentIDSubjectsRegularFinalGrades/?studentID='+ this.props.location.state.studentID,{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data
            })
            this.getStudentGrades(data[0].subjectName, data[0].regularGrades, data[0].finalGrades)
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    // Function for final grades of particular student

    getStudentGrades(subjectName,regularGrades,finalGrades){
        var dict = ['-','-','-','-','-'];
        finalGrades.map(grade=>{
            dict[grade.type-1] = grade.mark
        })
        this.setState({
            finalGrades: dict,
            regularGrades: regularGrades,
            subjectName: subjectName
        })
    }

    // Changing date format function from database
    changeDateFormat(inputDate){  // expects Y-m-d
        var splitDate = inputDate.split('-');
        if(splitDate.count == 0){
            return null;
        }
    
        var year = splitDate[0];
        var month = splitDate[1];
        var day = splitDate[2]; 
    
        return  day + '/' + month
    }


    
    render() {
        
        return (
            <div className="mt-2 center-items">
                <div className="col-12 col-lg-10  p-1 ">
                    <h6 className="text-center m-2">
                        Журнал ученика {this.props.location.state.studentName}
                    </h6>
                    
                    <p className="text-center">Оценки</p>

                    
                    <div className="journal mt-2">
                        <div className="names nav flex-column nav-pills card" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a  className="nav-link p-1" ><h6>Предметы:</h6></a>
                            {this.state.data.map((subject,i)=>{
                                if (i==0){
                                    return(
                                        <a onClick={() => this.getStudentGrades(subject.subjectName, subject.regularGrades, subject.finalGrades)}  className="nav-link active p-3" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><p>{subject.subjectName}</p></a>
                                )}
                                else{
                                    return(
                                        <a onClick={() => this.getStudentGrades(subject.subjectName, subject.regularGrades, subject.finalGrades)} className="nav-link p-3" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"><p>{subject.subjectName}</p></a>
                                )
                                }
                            })}

                        </div>
                        <div className="osenki card">
                        <h6 className="text-center"><strong>Предмет:</strong>  {this.state.subjectName}</h6>
                        <br/>
                        <a  className="nav-link p-1" ><h6><strong>Четвертные оценки:</strong></h6></a>

                            <table id="" className="table table-striped table-bordered " style={{width:"100%"}}>
                                <thead>
                                    <tr className="bg-success text-white">
                                        <th className="p-1 text-center">I</th>
                                        <th className="p-1 text-center">II</th>
                                        <th className="p-1 text-center">III</th>
                                        <th className="p-1 text-center">IV</th>
                                        <th className="p-1 text-center">Итог</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {
                                            this.state.finalGrades.map(grade => (
                                                <td className="p-0">
                                                    <p className="mt-1 mb-1 text-center">{grade}</p>
                                                </td>
                                            ))
                                        }
                                        
                                    </tr>
                                </tbody>
                            </table>

                            <h6> <strong>Регулярные Оценки:</strong></h6>
                            <table id="" className="table table-striped table-bordered  " style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th className="p-1 text-center bg-success text-white">Дата</th>
                                        <th className="p-1 text-center bg-success text-white">Оценка</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        
                                        {this.state.regularGrades.map(grade=>(
                                            <tr>
                                                <td className="p-0">
                                                    <p className="mt-1 mb-1 text-center">{this.changeDateFormat(grade.date)}</p>
                                                </td>
                                                <td className="p-0">
                                                    <p className="mt-1 mb-1 text-center">{grade.mark}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
