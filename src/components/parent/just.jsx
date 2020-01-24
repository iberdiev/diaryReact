import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class Teacher_Journal_Grade extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = {
            cohortID: this.props.location.state.cohortID,
            subjectID: this.props.location.state.subjectID,
            studentList : [],
            grades:[]

        };
    }
    componentDidMount = () =>{

        // Axios for student list

        axios.get('http://192.168.0.55:8080/api/v1/students/?cohort='+ this.props.location.state.cohortID,{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                studentList: data,
            })
            this.getFinalGrades(data[0].pk)
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    // Function for final grades of particular student

    getFinalGrades(studentID){
        axios.get(`http://192.168.0.55:8080/api/v1/studentSubjectFinalGrades/?studentID=${studentID}&subjectID=${this.state.subjectID}`,{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            var array = [1,2,3,4,5];
            var newarray = [];
            for (let index = 0; index < array.length; index++) {
                if (typeof data[index] === 'undefined'){
                    newarray.push({mark:'-'})
                }else{
                    newarray.push(data[index])
                }
            }
            this.setState({
                grades: newarray
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }

    
    render() {
        
        return (
            <div className="mt-2 center-items">
                <div className="col-12 col-lg-10  p-1 ">
                    <h6 className="text-center m-2">
                        Журнал 10-А класса
                    </h6>
                    <h6 className="text-center m-2">
                        Предмет: Русский язык
                    </h6>
                    <p className="text-center">Оценки</p>

                    <div className="contaner center-items m-3">
                        <div className="swipe center-items">
                            <Link to={{pathname:"journal", state:{cohortID: this.state.cohortID, subjectID:this.state.subjectID}}} className="swipe-button grades center-items">Повседневные</Link>
                            <Link to={{pathname:"journal_grades", state:{cohortID: this.state.cohortID, subjectID:this.state.subjectID}}} className="swipe-button grades bg-success center-items text-white">Итоговые</Link>
                        </div>
                    </div>
                    <div className="journal">
                        <div className="names nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a  className="nav-link p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"   ><p><input type="checkbox" className="mr-1"/>ФИО</p></a>
                            {this.state.studentList.map((student,i)=>{
                                if (i==0){
                                    return(
                                        <a onClick={() => this.getFinalGrades(student.pk)}  className="nav-link active p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><p><input type="checkbox" className="mr-1"/>{student.studentName}</p></a>
                                )}
                                else{
                                    return(
                                        <a onClick={() => this.getFinalGrades(student.pk)} className="nav-link p-1" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false"><p><input type="checkbox" className="mr-1"/>{student.studentName}</p></a>
                                )
                                }
                            })}

                        </div>
                        <div className="osenki">
                            <div class="name text-center">
                                Ученик: Акимжанов Мээрбек
                            </div>
                            <table id="" className="table table-striped table-bordered bg-success text-white " style={{width:"100%"}}>
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
                                    <tr>
                                        
                                        {this.state.grades.map(grade=>(
                                            <td className="p-0">
                                                <p className="mt-1 mb-1 text-center">{grade.mark}</p>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
