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

export default class Teacher_Journal_Grade extends Component {
    constructor(props){
        super(props);
        this.state = {
            subjectName: this.props.location.state.subjectName,
            cohortName: this.props.location.state.cohortName,
            cohortID: this.props.location.state.cohortID,
            subjectID: this.props.location.state.subjectID,
            data:[
                {
                    "studentName": "",
                    "pk": 5,
                    "cohort": 2,
                    "finalGrades": [
                        {
                            "type": 1,
                            "mark": '-'
                        }
                    ]
                }
            ],
        }
    }
    componentWillMount = () =>{
        axios.get(`http://192.168.0.55:8080/api/v1/cohortSubjectFinalGrades/?subjectID=${this.state.subjectID}&cohortID=${this.state.cohortID}`,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data,
            });
            console.log(data)
        })
        .catch(err =>{
            console.log(err.error);
        });
        
    }
    
    render() {
        
        return (
            <div>
                <div className="mt-2 center-items">
                    <div className="col-12 col-lg-10  p-1 ">
                        <h6 className="text-center m-2">
                            Журнал {this.state.cohortName} класса 
                        </h6>
                        <h6 className="text-center m-2">
                            Предмет: {this.state.subjectName}
                        </h6>
                        <p className="text-center">Оценки</p>

                        <div className="contaner center-items m-3">
                        <div className="swipe center-items">
                            <Link to={{pathname:"journal", state:{cohortID: this.state.cohortID, subjectID:this.state.subjectID, cohortName:this.state.cohortName, subjectName:this.state.subjectName}}} className="swipe-button grades center-items">Повседневные</Link>
                            <Link to={{pathname:"journal_grades", state:{cohortID: this.state.cohortID, subjectID:this.state.subjectID, cohortName:this.state.cohortName, subjectName:this.state.subjectName}}} className="swipe-button grades bg-success center-items text-white">Итоговые</Link>
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

                                        {this.state.data.map(student => (<One_Student_Name name={student.studentName} studentID={student.pk}/>))}

                                    </tbody>
                                </table>
                            </div>
                            <div className="line"></div>
                            <div className="osenki ">
                                <table id="" className="table table-striped table-bordered display " style={{width:'100%'}}>
                                    <thead>
                                        <tr>
                                        <th className="p-1 text-center">I</th>
                                        <th className="p-1 text-center">II</th>
                                        <th className="p-1 text-center">III</th>
                                        <th className="p-1 text-center">IV</th>
                                        <th className="p-1 text-center">Итог</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                            {/* Количество tr зависит от количество имён */}

                                            {
                                                this.state.data.map(student=>
                                                    
                                                        {
                                                            var newarray = [];
                                                            for (let index = 0; index < 5; index++) {
                                                                if (typeof student.finalGrades[index] === 'undefined'){
                                                                    newarray.push({mark:'-'})
                                                                }else{
                                                                    newarray.push(student.finalGrades[index])
                                                                }
                                                            }
                                                            return(
                                                                <tr>
                                                                    {
                                                                        newarray.map(grade=>(
                                                                            <td className="p-0">  
                                                                                <p className="mt-1 mb-1 text-center"> {grade.mark}</p>
                                                                            </td>
                                                                        ))
                                                                    }
                                                                </tr>
                                                            )
                                                        

                                                    }
                                                    )
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
