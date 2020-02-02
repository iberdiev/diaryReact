import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {requestUrl} from '../requests';

export default class Teacher_Journal_Grade extends Component {
    constructor(props){
        super(props);
        this.state = {
            subjectName: this.props.location.state.subjectName,
            cohortName: this.props.location.state.cohortName,
            cohortID: this.props.location.state.cohortID,
            subjectID: this.props.location.state.subjectID,
            isLoaded: true,
            checkedStudents: [],
            data:[
                {
                    "studentName": "",
                    "pk": "",
                    "cohort": "",
                    "finalGrades": [
                        {
                            "type": 1,
                            "mark": '-'
                        }
                    ]
                }
            ],
            oneStudentGrading:{name: '', id: null, grades: [{mark:null,id:null}]},
            temprGrades: [{mark:null,id:null}],

            otsenka: [],
            sendingGrades:[],
            chosenLessonID: null,
        }
    }
    componentWillMount = () =>{
        axios.get(requestUrl + `/api/v1/cohortSubjectFinalGrades/?subjectID=${this.state.subjectID}&cohortID=${this.state.cohortID}`,{
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

    // This function check all if check all is clicked
    toggle = event => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== event.target)
                checkboxes[i].checked = event.target.checked;
        }
}
    changeOtsenka(number){
        var markArray = [];
        for (let i = 0; i < this.state.checkedStudents.length; i++){
            markArray.push({"type": this.state.chosenLessonID, "studentID": this.state.checkedStudents[i], "mark": number, "subjectID":this.state.subjectID})
        }
        this.setState({
            otsenka: [number],
            sendingGrades: markArray
        })     
    }
    grade(type, studentID, studentName, grades){
        this.setState({
            oneStudentGrading:{name: studentName, id: studentID, grades: grades},
            temprGrades: grades,
            checkedStudents: [studentID],
            otsenka: [],
            chosenLessonID: type,
            sendingGrades: [],
        })
        console.log(this.state.oneStudentGrading)
        console.log(this.state.grades)
        console.log(this.state.chosenLessonID)

    }

    gradeAll(lessonID){
        var items=document.getElementsByName('studentcheckbox');
		var selectedItems=[];
		for(var i=0; i<items.length; i++){
			if(items[i].checked===true)
				selectedItems.push(items[i].id);
        }
        this.setState({
            sendingGrades:[],
            otsenka: [],
            checkedStudents:selectedItems,
            chosenLessonID:lessonID
        });
    }


    changeMark(e,id){
        var newmark = e.target.value;
        var newarray = []
        this.state.temprGrades.map((grade)=>{
            if (grade.gradeID===id){
                newarray.push({gradeID:grade.gradeID, mark: parseInt(newmark)})
            }
            else{
                newarray.push({gradeID:grade.gradeID, mark: grade.mark})
            }
            return 0
    })
        this.setState({
            temprGrades: newarray
        })
        console.log(this.state.temprGrades)
        console.log(this.state.oneStudentGrading)
    }
    


    // Adding grade to database function
    sendGrade(){
        var sendingArray = []

        function postGrades(data) {
            return axios.post(requestUrl + '/api/v1/cohortSubjectFinalGrades/', data,{
                headers:{
                    Authorization:'Token ' + localStorage.getItem('token'),
                }
            })

            .catch(err =>{
                console.log(err.data)
            });
            
          }
        
        this.state.sendingGrades.map(studentGrade=>{
            sendingArray.push(postGrades(studentGrade))
            return 0
        })
        
        axios.all(sendingArray)
        .then(axios.spread(function (acct, perms) {
            window.location.reload();
          }))
        .catch(err =>{
            console.log(err.error);
        });
        
    }

    // Sending Change grade
    confirmChange(id,mark){
        let data = {"pk":id,"mark":mark}
        axios.put(requestUrl + '/api/v1/cohortSubjectFinalGrades/', data,{
                headers:{
                    Authorization:'Token ' + localStorage.getItem('token'),
                }
            })
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data==="OK"){
                    console.log("Good")
                }else{
                    console.log("Not good")
                }
                window.location.reload();
            })
            .catch(err =>{
                console.log("Not good")
            });
            
    }
    confirmDelete(id){
        axios.delete(requestUrl + `/api/v1/cohortSubjectFinalGrades/?pk=${id}`,{
                headers:{
                    Authorization:'Token ' + localStorage.getItem('token'),
                }
            })
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data==="OK"){
                    console.log("Good")
                }else{
                    console.log("Not good")
                }
                window.location.reload();
            })
            .catch(err =>{
                console.log("Not good")
            });
            
    }
    
    render() {
        
        return (
            <div>
                <div className="mt-2 center-items">
                    <div className="col-12 col-lg-10  p-1 ">
                        {!this.state.isLoaded ?
                            <div>
                                <div className="preloader center-items">
                                    <div className="lds-dual-ring"></div>
                                </div>
                            </div> : ""}
                        <h6 className="text-center m-2">
                            <strong>Журнал:</strong> {this.state.cohortName}  
                        </h6>
                        <h6 className="text-center m-2">
                             <strong>Предмет:</strong> {this.state.subjectName}
                        </h6>
                        <p className="text-center">Оценки</p>

                        <div className="contaner center-items m-3">
                        <div className="swipe center-items">
                            <Link to={{pathname:"journal", state:{cohortID: this.state.cohortID, subjectID:this.state.subjectID, cohortName:this.state.cohortName, subjectName:this.state.subjectName}}} className="swipe-button grades center-items">Повседневные</Link>
                            <Link to={{pathname:"journal_grades", state:{cohortID: this.state.cohortID, subjectID:this.state.subjectID, cohortName:this.state.cohortName, subjectName:this.state.subjectName}}} className="swipe-button grades bg-success center-items text-white">Итоговые</Link>
                        </div>
                        </div>
                        <div className="col-5">
                            <label htmlFor="all_check" className="singleLabel">Выбрать всех <input type="checkbox" onChange={(e)=>this.toggle(e)} id="all_check" className="mr-1"/> <span class="checkmark checkmark-all ml-3"></span> </label>

                        </div>
                        <div className="journal">
                            <div className="names p-0 ">
                                <table id="" className="table table-striped table-bordered display " style={{width:'100%'}}>
                                    <thead>
                                        <tr>
                                            <th className="p-1 bg-secondary text-white"><label htmlFor="all_check" className="m-0 d-block singleLabel" > <input type="checkbox" onChange={(e)=>this.toggle(e)} id="all_check" className="mr-1"/> <span class="checkmark"></span> ФИО</label></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.data.map(student => (
                                            <tr>
                                            <td className="p-2">
                                                <label htmlFor={student.pk} className="d-block m-0 singleLabel"><p className="mt-1 mb-1"><input type="checkbox" id={student.pk} className="mr-1" name="studentcheckbox"/><span class="checkmark"></span>{student.studentName}</p></label>
                                            </td>
                                        </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="line"></div>
                            <div className="osenki ">
                                <table id="" className="table table-striped table-bordered display " style={{width:'100%'}}>
                                    <thead className={"bg-secondary text-white"}>
                                        <tr>
                                        <th className="p-1 text-center" data-toggle="modal" data-target="#exampleModal"  onClick={()=>this.gradeAll(1)}>I</th>
                                        <th className="p-1 text-center" data-toggle="modal" data-target="#exampleModal"  onClick={()=>this.gradeAll(2)}>II</th>
                                        <th className="p-1 text-center" data-toggle="modal" data-target="#exampleModal"  onClick={()=>this.gradeAll(3)}>III</th>
                                        <th className="p-1 text-center" data-toggle="modal" data-target="#exampleModal"  onClick={()=>this.gradeAll(4)}>IV</th>
                                        <th className="p-1 text-center" data-toggle="modal" data-target="#exampleModal"  onClick={()=>this.gradeAll(5)}>Итог</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                            {
                                                this.state.data.map(student=>
                                                    
                                                    {
                                                        var dict = [{mark:'-',type:1},{mark:'-',type:2},{mark:'-',type:3},{mark:'-',type:4},{mark:'-',type:5},];
                                                        student.finalGrades.map(grade=>{
                                                            dict[grade.type-1] = {mark:grade.mark, type: grade.type, pk: grade.pk}
                                                            return 0
                                                        })
                                                        return(
                                                            <tr>
                                                                {
                                                                    dict.map(grade => (
                                                                        <td className="p-0" data-toggle="modal" data-target="#oneStudentModal" onClick={()=>this.grade(grade.type, student.pk, student.studentName, [{gradeID:grade.pk, mark: grade.mark}])} >
                                                                            <p className="mt-1 mb-1 p-2 text-center">{grade.mark}</p>
                                                                        </td>
                                                                    ))
                                                                }
                                                            </tr>
                                                        )
                                                    })
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal for all students grading */}

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
                                
                                <br/> Оценка для всех - {this.state.otsenka.map(otsenka=>
                                    (<span> {otsenka} </span> )
                                )}
                                <div>
                                    <button className="btn btn-danger col-5 m-1" onClick={()=>this.changeOtsenka(2)}>
                                        2
                                    </button>
                                    <button className="btn btn-warning col-5 m-1" onClick={()=>this.changeOtsenka(3)}>
                                        3
                                    </button>
                                    <button className="btn btn-primary col-5 m-1" onClick={()=>this.changeOtsenka(4)}>
                                        4
                                    </button>
                                    <button className="btn btn-success col-5 m-1" onClick={()=>this.changeOtsenka(5)}>
                                        5
                                    </button>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="button" className="btn btn-primary" onClick={()=>this.sendGrade()} >Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for one student grading */}

                <div id="oneStudentModal" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title">Оценка ученику</h5>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        Ученику - <span id="modal-name">{this.state.oneStudentGrading.name}</span> 
                        <br/>
                        <br/> Оценки на этот день - 
                            {this.state.oneStudentGrading.grades.map((otsenka, index)=>{
                                if (otsenka.mark!=='-'){
                                    return(
                                    <h6 className="mb-2"> 
                                    
                                        <select onChange={(event)=>{ this.changeMark(event, otsenka.gradeID) }} >
                                            <option selected={otsenka.mark===5} value="5">5</option>
                                            <option selected={otsenka.mark===4} value="4">4</option>
                                            <option selected={otsenka.mark===3} value="3">3</option>
                                            <option selected={otsenka.mark===2} value="2">2</option>
                                        </select>   
                                        <button className="fa fa-trash btn btn-primary text-white" onClick={()=>this.confirmChange(otsenka.gradeID, this.state.temprGrades[index].mark)} disabled={otsenka.mark===this.state.temprGrades[index].mark} > Сохранить</button> 
                                        <Link onClick={()=>this.confirmDelete(otsenka.gradeID)} className="fa fa-trash btn btn-danger text-white"> Удалить</Link>  
                                   </h6> )
                                }
                                return 0
                            })}
                                    
                        <div className="p-2">
                        {this.state.oneStudentGrading.grades.map((otsenka, index)=>{
                                if (otsenka.mark==='-'){
                                    return(
                                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                            Добавить новую оценку
                                        </a>
                                    )}
                                return 0
                            })}
                        
                        </div>
                        <div className="collapse" id="collapseExample">
                        <h5>Новая оценка - {this.state.otsenka.map(otsenka=>(<span> {otsenka} </span> ))}</h5>
                        
                            <div className="p-2">
                                
                                <button className="btn btn-danger col-5 m-1" onClick={()=>this.changeOtsenka(2)}>
                                    2
                                </button>
                                <button className="btn btn-warning col-5 m-1" onClick={()=>this.changeOtsenka(3)}>
                                    3
                                </button>
                                <button className="btn btn-primary col-5 m-1" onClick={()=>this.changeOtsenka(4)}>
                                    4
                                </button>
                                <button className="btn btn-success col-5 m-1" onClick={()=>this.changeOtsenka(5)}>
                                    5
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        <button type="button" className="btn btn-primary" onClick={()=>this.sendGrade()} >Сохранить</button>
                    </div>
                    </div>

                </div>
                </div>
            </div>
        )
    }
}
