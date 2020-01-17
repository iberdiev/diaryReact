import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class Teacher_Journal extends Component {
    constructor(props){
        super(props);
        this.state = {
            subjectName: this.props.location.state.subjectName,
            cohortName: this.props.location.state.cohortName,
            cohortID: this.props.location.state.cohortID,
            subjectID: this.props.location.state.subjectID,
            isLoaded: false,
            checkedStudents: [12,13],
            data:{
                "grades": [
                    {
                        "regularGrades": [
                            {
                                "mark": "",
                                "lesson": {
                                    "date": "2020-01-13",
                                }
                            },
                        ]
                    }
                ],
                "timetables": [
                    {
                        "date": "0000-00-00",
                    }
                ]
            },

            oneStudentGrading:{name: 'Meerbek', id: 15, grades: [{mark:5,id:1},{mark:4,id:12}]},
            temprGrades: [{mark:5,id:1},{mark:4,id:12}],

            otsenka: []
        }
    }
    componentWillMount = () =>{
        axios.get(`http://192.168.0.55:8080/api/v1/cohortRegularGradesOneSubjectView/?subjectID=${this.state.subjectID}&cohortID=${this.state.cohortID}&type=6`,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data,
                isLoaded: true,
                
            });
            console.log(data)
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
        var month = splitDate[1];
        var day = splitDate[2]; 
    
        return  day + '/' + month
    }

    // This function check all if check all is clicked
    toggle = event => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] != event.target)
                checkboxes[i].checked = event.target.checked;
        }
}

    

    printChecked(){
		var items=document.getElementsByName('studentcheckbox');
		var selectedItems=[];
		for(var i=0; i<items.length; i++){
			if(items[i].checked==true)
				selectedItems.push(items[i].id);
        }
        this.setState({
            otsenka: [],
            checkedStudents:selectedItems,
        });
        
		console.log(selectedItems);}
    
    changeOtsenka(number){
        this.setState({
            otsenka: [...this.state.otsenka, number]
        })
        console.log(this.state.otsenka)
    }
    grade(lessonID, studentID, studentName, grades){
        this.setState({
            oneStudentGrading:{name: studentName, id: studentID, grades: grades},
            temprGrades: grades,
        })

    }

    changeMark(e,id){
        console.log(this.state.temprGrades)
        var newmark = e.target.value;
        var newarray = []
        this.state.temprGrades.map((grade)=>{
            if (grade.id==id){
                newarray.push({id:grade.id, mark: parseInt(newmark)})
            }
            else{
                newarray.push({id:grade.id, mark: grade.mark})
            }
    })
        this.setState({
            temprGrades: newarray
        })
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
                    {this.state.checkedStudents}
                    <button onClick={this.printChecked.bind(this)}>Helo</button>
                        <h6 className="text-center m-2">
                            Журнал {this.state.cohortName} класса 
                        </h6>
                        <h6 className="text-center m-2">
                            Предмет: {this.state.subjectName}
                        </h6>
                        <p className="text-center">Оценки</p>

                        <div className="contaner center-items m-3">
                            <div className="swipe center-items">
                                <Link to={{pathname:"journal", state:{cohortID: this.state.cohortID, subjectID:this.state.subjectID, cohortName:this.state.cohortName, subjectName:this.state.subjectName}}} className="swipe-button grades bg-success center-items text-white">Повседневные</Link>
                                <Link to={{pathname:"journal_grades", state:{cohortID: this.state.cohortID, subjectID:this.state.subjectID, cohortName:this.state.cohortName, subjectName:this.state.subjectName}}} className="swipe-button grades center-items">Итоговые</Link>
                            </div>
                        </div>
                        <label htmlFor="all_check">Выбрать всех <input type="checkbox" onChange={(e)=>this.toggle(e)} id="all_check" className="mr-1"/> </label>
                        
                        <div className="journal">
                            
                            <div className="names p-0 ">
                            
                                <table id="" className="table table-striped table-bordered display " style={{width:'100%'}}>
                                    
                                    <thead>
                                        <tr>
                                            <th  className="p-1"> ФИО</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.data.grades.map(student => (
                                            <tr>
                                                <td className="p-0">
                                                    <label htmlFor={student.pk} className="d-block"><p className="mt-1 mb-1"><input type="checkbox" id={student.pk} className="mr-1" name="studentcheckbox"/>{student.studentName}</p></label>
                                                </td>
                                            </tr>
                                            ))}

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
                                                    {
                                                    this.state.data.timetables.map(one_date =>
                                                        {
                                                            var gradearray = []
                                                            student.regularGrades.map(grade=>{
                                                                if (grade.lesson.id==one_date.pk){
                                                                    gradearray.push({gradeID:grade.lesson.id, mark: grade.mark})
                                                                }
                                                            })
                                                            return(
                                                                <td className="p-0" data-toggle="modal" data-target="#oneStudentModal" onClick={()=>this.grade(one_date.pk, student.studentName, student.pk, gradearray)}>
                                                                <p className="mt-1 mb-1 text-center" >{
                                                                    gradearray.map(grade=>{
                                                                        return(
                                                                            <span id="mark"> {grade.mark} </span>
                                                                        )
                                                                    }
                                                                    )}
                                                                </p>
                                                                </td>
                                                            )
                                                        } )}
                                                        <td className="p-0">
                                                            <p className="mt-1 mb-1 text-center"><a href="" data-toggle="modal" data-target="#exampleModal" onClick={this.printChecked.bind(this)}><i className="fa fa-plus-circle" aria-hidden="true"></i> Добавить</a></p>
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
                                
                                <br/> Оценка - {this.state.otsenka.map(otsenka=>
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
                                <button type="button" className="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for one student grading */}
                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#oneStudentModal">Open Modal</button>

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
                            {this.state.oneStudentGrading.grades.map((otsenka, index)=>
                                    (<h6 className="mb-2"> <select onChange={(event)=>{ this.changeMark(event, otsenka.id) }} >
                                    <option selected={otsenka.mark==5} value="5">5</option>
                                    <option selected={otsenka.mark==4} value="4">4</option>
                                    <option selected={otsenka.mark==3} value="3">3</option>
                                    <option selected={otsenka.mark==2} value="2">2</option>
                                  </select>   <button className="fa fa-trash btn btn-primary text-white" disabled={otsenka.mark==this.state.temprGrades[index].mark} > Сохранить</button> <a className="fa fa-trash btn btn-danger text-white"> Удалить</a>  </h6> )
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
                    <div class="modal-footer">
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
