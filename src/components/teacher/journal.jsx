import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class One_Student_Name extends Component{
    render(){
        return(
            <tr>
                <td className="p-0">
                    <a >
                        <p className="mt-1 mb-1"><input type="checkbox" data-student_id={this.props.studentID} className="mr-1"/>{this.props.name}</p>
                    </a>
                </td>
            </tr>
        )
    }
}


export default class Teacher_Journal extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{
                "grades": [
                    {
                        "regularGrades": [
                            {
                                "mark": "",
                                "lesson": {
                                    "id": 13,
                                    "date": "2020-01-13",
                                }
                            },
                        ]
                    }
                ],
                "timetables": [
                    {
                        "date": "0",
                    }
                ]
            },
        }
    }
    componentWillMount = () =>{
        axios.get("http://192.168.0.55:8080/api/v1/cohortRegularGradesOneSubjectView/?subjectID=31&cohortID=5&type=6",{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data,
            });
        })
        .catch(err =>{
            console.log(err.error);
        });
        
    }
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
            <div>
                <div className="mt-2 center-items">
                    <div className="col-12  p-1 ">
                        <h6 className="text-center m-2">
                            Журнал 10-А класса
                        </h6>
                        <h6 className="text-center m-2">
                            Предмет: Русский язык
                        </h6>
                        <p className="text-center">Оценки</p>

                        <div className="contaner center-items m-3">
                            <div className="swipe center-items">
                                <Link to="journal" className="swipe-button grades bg-success center-items text-white">Повседневные</Link>
                                <Link to="journal_grades" className="swipe-button grades center-items">Итоговые</Link>
                            </div>
                        </div>
                        <div className="journal">
                            <div className="names p-0 ">
                                <table id="" className="table table-striped table-bordered display " style={{width:'100%'}}>
                                    <thead>
                                        <tr>
                                            <th className="p-1"><input type="checkbox" className="mr-1"/>ФИО</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.data.grades.map(student => (<One_Student_Name name={student.studentName} studentID={student.pk}/>))}

                                    </tbody>
                                </table>
                            </div>
                            <div className="line"></div>
                            <div className="osenki ">
                                <table id="" className="table table-striped table-bordered display " style={{width:'100%'}}>
                                    <thead>
                                        <tr>
                                            
                                            {
                                                this.state.data.timetables.map(one_date => (
                                                    <th className="p-1 text-center">{this.changeDateFormat(one_date.date)}</th>
                                                ))
                                            }
                                            <th className="p-1 text-center">Сегодня</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {/* Количество tr зависит от количество имён */}

                                            {
                                                this.state.data.grades.map(student=>(
                                                    <tr>
                                                    {this.state.data.timetables.map(one_date => (
                                                        <td className="p-0"> 
                                                        <p className="mt-1 mb-1 text-center">{
                                                            student.regularGrades.map(grade=>{
                                                                if (grade.lesson.id==one_date.pk){
                                                                    return(
                                                                    <span> {grade.mark} </span>
                                                                    )
                                                                }
                                                            }
                                                                
                                                            )}
                                                        </p>
                                                        </td>
                                                        
                                                        
                                                        ))}
                                                        <td className="p-0">
                                                            <p className="mt-1 mb-1 text-center"><a data-toggle="modal" data-target="#exampleModal"><i className="fa fa-plus-circle" aria-hidden="true"></i> Добавить</a></p>
                                                        </td>
                                                        </tr> 
                                                    
                                                ))
                                            }
                                        

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Оценка в журнал</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Ученику - <span id="modal-name">Акимжанов Мээрбек</span> 
                                <br/>
                                
                                <br/> Оценка - Ещё не выбрано
                                <div>
                                    <button className="btn btn-danger col-5 m-1">
                                        2
                                    </button>
                                    <button className="btn btn-warning col-5 m-1">
                                        3
                                    </button>
                                    <button className="btn btn-primary col-5 m-1">
                                        4
                                    </button>
                                    <button className="btn btn-success col-5 m-1">
                                        5
                                    </button>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="button" className="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
