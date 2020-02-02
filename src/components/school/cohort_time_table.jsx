
import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-date-picker';
import 'rc-time-picker/assets/index.css';
import ReadMoreReact from 'read-more-react';
import {requestUrl} from '../requests';


export default class Student_Diary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: null,
            timeTable: [],
            isLoaded: false,
            teachers:[{name:"olga"}],
            chosenSubject: null,
            chosenTeacherName:  "Выберите учителя",
            chosenTeacherID: null,
            subjectStarttime: null,
            subjectEndTime: "9:00",


            // For changing modal
            changeTime: 'null',
            changeEndtime: "null",
            changesubject: null,
            changeTeacherID: null,
            changeTeacherName: null,
            changeIndex: null,
            changeHomeWork: null,
        }
        this.changeValue = this.changeValue.bind(this)
    }
    


    getTable(date) {
        this.setState({
            isLoaded: false,
            timeTable: [],
        })
        const url = requestUrl + `/api/v1/timetableByCohort/?cohortID=${this.props.location.state.cohortID}&date=${this.formatDate(date)}`;
        axios.get(url, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                timeTable: data,
                isLoaded: true,
            })
            console.log(data)
        })
            .catch(err => {
                console.log(err.error);
            });
    };

    // Functions for dates
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    getWeekDay(date) {
        var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        var day = date.getDay();
        return days[day];
    }

    getMonth(date){
        var months = ['Января', 'Февраля', 'Марта', 'Апреля','Майа', 'Июня', 'Июля', 'Августа','Сентября', 'Октября', 'Ноября', 'Декабря']
        var month = date.getMonth();
        return months[month];
    }

    

    convertToDDMMYYYY(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        return (dd + '/' + mm + '/' + yyyy);

    }
    onChosenDate = event => {
        var chosenDate = new Date(event.target.value);
        this.setState({ chosenDate: chosenDate });
        this.getTable(chosenDate);
    }

    onChange = date => {
        var chosenDate = date;
        this.setState({ chosenDate: chosenDate });
        this.getTable(chosenDate);
    }


    componentWillMount = () => {
        
        
        var tempcurrentTime = new Date();
        this.setState({
            chosenDate: tempcurrentTime,
        });
        axios.get(requestUrl + '/api/v1/teachers/',{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
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

        axios.get(requestUrl + '/api/v1/subjects/?cohortID=' + this.props.location.state.cohortID,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            console.log(data)
            this.setState({
                isLoaded: true,
                subjects: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    componentDidMount = () => {

        
        
        this.getTable(this.state.chosenDate);
        
        
    }
    filterFunction(){
        
        var input, filter, a, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            var div = document.getElementById("myDropdown");
            a = div.getElementsByTagName("a");
            for (i = 0; i < a.length; i++) {
              var txtValue = a[i].textContent || a[i].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
              } else {
                a[i].style.display = "none";
              }
            }
          }
    
    ifOther(value){
        this.setState({
            validSubject:""
        });
        if(value==="Другое..."){
            var element = document.getElementById('otherinput')
            element.style.display='block';
        }
        else{
            this.setState({
                chosenSubject:value
            })
        }
    }

    changeTeacherValue(name,id){
        var teacherButton = document.getElementById("teacherButton");
        this.setState({
            chosenTeacherID:id,
            validTeacher: ""
        })

        teacherButton.innerHTML = (name);
    }

    changeTimeValue(subject){
        var subjectInput = document.getElementById("subjectInput");
        subjectInput.value = subject;
        this.setState({
            subjectName:subject
        })
    }

    

    submitNewSubject = event =>{
        this.setState({
            validnumber:"",
            validSubject:"",
            validTeacher:""

        })
        event.preventDefault();
        if (this.state.subjectStarttime===null){
            this.setState({
                validnumber:"*Вы не выбрали последовательность урока"
            })
            
        }
        if (this.state.chosenSubject===null){
            this.setState({
                validSubject:"*Вы не выбрали предмет"
            })
            
        }
        if (this.state.chosenTeacherID===null){
            this.setState({
                validTeacher:"*Выберите, пожалуйста, учителя"
            })
            
        }
        else{
            var isAvailable = false;
            var idSubject = null;
            var data;
            for (let i=0; i<this.state.subjects.length; i++){
                if (this.state.subjects[i].subjectName===this.state.chosenSubject){
                    isAvailable = true;
                    
                    idSubject = this.state.subjects[i].pk
                }
            }
            if (isAvailable){
                console.log('Есть')
                data = {"teacher":this.state.chosenTeacherID, "cohortID": this.props.location.state.cohortID, "subjectID": idSubject, "date" : this.formatDate(this.state.chosenDate), "startTime": this.state.subjectStarttime, "endTime": this.state.subjectEndTime}
                axios.post(requestUrl + '/api/v1/timetableByCohort/',data,{
                headers:{
                    Authorization:'Token ' + localStorage.getItem('token'),
                }
                }).then(res => {
                    window.location.reload()
                })
                .catch(err =>{
                    console.log(err.error);
                });
            }else{
                console.log('Нет')
                data = {"newSubject": this.state.chosenSubject, "teacher":this.state.chosenTeacherID, "cohortID": this.props.location.state.cohortID, "date" : this.formatDate(this.state.chosenDate), "startTime": this.state.subjectStarttime, "endTime": this.state.subjectEndTime}
                axios.post(requestUrl + '/api/v1/createSubjectAndTimetable/',data,{
                headers:{
                    Authorization:'Token ' + localStorage.getItem('token'),
                }
                }).then(res => {
                    window.location.reload()
                })
                .catch(err =>{
                    console.log(err.error);
                });
            }
        }

    }


    changeTeacher(name,id){
        var teacherButton = document.getElementById("changeTeacherButton");
        this.setState({
            changeTeacherID:id
        })

        teacherButton.innerHTML = (name);
    }

    changeTime(subject){
        var subjectInput = document.getElementById("changesubjectInput");
        subjectInput.value = subject;
        this.setState({
            changeTime:subject
        })
    }
    changeValue(time,endtime,subject,teacherID,teacherName,subjectID, index, homework){
        console.log(time, subject, teacherID, teacherName)
        this.setState({
            changeTime:time,
            changeEndTime: endtime,
            changesubject:subject, 
            changesubjectID:subjectID, 
            changeTeacherID:teacherID, 
            changeTeacherName:teacherName,
            changeIndex:index,
            changeHomeWork:homework,
        })        
    }

    submitChangeSubject = event =>{
        event.preventDefault();
        var data = {"pk":this.state.changesubjectID,"startTime":this.state.changeTime,"teacher":this.state.changeTeacherID, "endTime": this.state.changeEndTime, "homework": this.state.changeHomeWork}
        axios.put(requestUrl + '/api/v1/timetableByCohort/',data,{
        headers:{
            Authorization:'Token ' + localStorage.getItem('token'),
        }
        }).then(res => {
            window.location.reload()
        })
        .catch(err =>{
            console.log(err.error);
        });
    }

    deleteSubject(id,subjectname){
        if (window.confirm("Вы уверены что хотите удалить урок: " + subjectname + "?")){
            axios.delete(requestUrl + `/api/v1/timetableByCohort/?pk=${id}`,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
            }).then(res => {
                window.location.reload()
            })
            .catch(err =>{
                console.log(err.error);
            });
        }
        
    }

    render() {
        
        
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                <div id="datepicker-demo"></div>
                
                    
                    {!this.state.isLoaded ?
                        <div>
                            <div className="preloader center-items">
                                <div className="lds-dual-ring"></div>
                            </div>
                        </div> : ""}
                    <div className="owl-carousel owlExample">
                        
                        <div className="item">
                            
                            <div className="p-1 row text-center">
                            
                                <div className="col-12 center-items"><label htmlFor="date" className="m-0"> {this.state.chosenDate.getDate()} {this.getMonth(this.state.chosenDate)}</label> <span className="p-1"> - </span> <span><span><DatePicker  clearIcon=""  onChange={this.onChange} value={this.state.chosenDate} /></span></span></div>
                            </div>
                            



                            <div className="col-12">
                                <h2 className="text-center mt-3 mb-4 btn-link"> <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() - 1)) }} className="btn btn-primary float-left ml-3"><i className="fa fa-arrow-left p-1 mr-1"></i></button> {this.getWeekDay(this.state.chosenDate)} <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() + 1)) }} className="btn btn-primary float-right mr-3"><i className="fa fa-arrow-right p-1 mr-1"></i></button></h2>
                            </div>
                            <div className="pl-3 p-2">
                                <div className="row">
                                    <div className="col-2 btn-link center-items">
                                        <h6>№</h6>
                                    </div>
                                    <div className="col-4 btn-link center-items">
                                        <h6>Урок</h6>
                                    </div>
                                    <div className="col-4 btn-link center-items">
                                        <h6>Д/З</h6>
                                    </div>
                                    
                                </div>
                            </div>

                            {this.state.timeTable.map((subject, index) => (

                                <div className="card">
                                    <div className="row">
                                        <div className="col-2 center-items text-center">
                                        {index+1}
                                        </div>
                                        <div className="col-4 center-items">{subject.subjectName}</div>
                                        <div className="col-4 center-items text-center">
                                            <ReadMoreReact text={subject.homework}
                                                min={10}
                                                ideal={20}
                                                max={200}
                                                readMoreText={'Развернуть...'}
                                                />
                                        </div>
                                        
                                        <div className="col-2 text-left center-items">
                                            <div className="btn btn-primary m-1 p-1" data-toggle="modal" data-target="#ChangeModal" onClick={() => this.changeValue(subject.startTime.slice(0, -3), subject.endTime.slice(0, -3), subject.subjectName, subject.teacher, subject.teacherName, subject.pk, index+1, subject.homework)} ><i className="fa fa-pencil"></i></div>
                                            <div className="btn btn-danger m-1 p-1" onClick={()=>this.deleteSubject(subject.pk,subject.subjectName)} ><i className="fa fa-trash"></i></div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="center-items m-3"><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Добавить новый урок</button></div>

                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <form className="modal-content" onSubmit={this.submitNewSubject}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Добавление предемета</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="p-2 ">
                                    <div className="row">
                                        <div className="input-group col-12 m-0 p-0">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" htmlFor="inputGroupSelect01">Номер №</label>
                                            </div>
                                            <select defaultValue="Веберите последовательность" className="custom-select" id="inputGroupSelect01" onChange={e => this.setState({subjectStarttime: e.target.value,validnumber:""})}>
                                                    <option disabled>Веберите последовательность</option>
                                                    <option value="8:00">1</option>
                                                    <option value="9:00">2</option>
                                                    <option value="10:00">3</option>
                                                    <option value="11:00">5</option>
                                                    <option value="12:00">6</option>
                                                    <option value="13:00">7</option>
                                                    <option value="14:00">8</option>
                                            </select>
                                            

                                        </div>
                                        <span style={{color:"red"}}>{this.state.validnumber}</span>

                                            
                                            
                                            
                                        <div className="input-group col-12 m-0 mt-3  p-0">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" for="inputGroupSelect01">Предмет</label>
                                            </div>
                                            <select className="custom-select" id="inputGroupSelect01" onChange={e => this.ifOther(e.target.value)}>
                                                    <option selected disabled>Веберите Предмет</option>
                                                    <option value="Математика">Математика</option>
                                                    <option value="Русский-яз.">Русский-яз.</option>
                                                    <option value="Английский-яз.">Английский-яз.</option>
                                                    <option value="История">История</option>
                                                    <option value="География">География</option>
                                                    <option value="Биология">Биология</option>
                                                    <option value="Информатика">Информатика</option>
                                                    <option value="Обществознание">Обществознание</option>
                                                    <option value="Алгебра">Алгебра</option>
                                                    <option value="Геометрия">Геометрия</option>
                                                    <option value="Физика">Физика</option>
                                                    <option value="Химия">Химия</option>
                                                    <option value="Черчение">Черчение</option>
                                                    <option value="Другое...">Другое...</option>
                                            </select>
                                            

                                        </div>
                                        <input type="text" style={{display:'none'}} onChange={e => this.setState({chosenSubject: e.target.value})} id="otherinput" className="form-control mt-1" placeholder="Пишите название нового предмета"/>
                                        <span style={{color:"red"}}>{this.state.validSubject}</span>
                                        <div className="input-group col-12 m-0 p-0 mt-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" for="inputGroupSelect01">Учитель</label>
                                            </div>
                                            <div className="dropdown form-control center-items p-0" id="inputGroupSelect01">
                                                <button className="btn dropdown-toggle w-100"
                                                        type="button" id="teacherButton" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">{this.state.chosenTeacherName}</button>
                                                <div id="myDropdown" className="dropdown-menu" aria-labelledby="teacherButton" style={{maxHeight:'400px', overflow:'scroll'}}>
                                                    <div className="p-1 input-group">
                                                    <div className="input-group-prepend ">
                                                    <label className="input-group-text" for="inputGroupSelect01"><i className="fa fa-search"></i></label>
                                                    
                                                    </div>
                                                <input type="text" className="form-control" placeholder="Искать..." id="myInput" onKeyUp={()=>this.filterFunction()}/></div>
                                 
                                                    {this.state.teachers.map(teacher=>(
                                                        <div className="dropdown-item teacherselect" onClick={()=>this.changeTeacherValue(teacher.teacherName,teacher.pk)} >{teacher.teacherName}</div>
                                                    ))}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <span style={{color:"red"}}>{this.state.validTeacher}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="submit" className="btn btn-primary">Добавить урок</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                
                {/* Modal for changing */}
                <div className="modal fade" id="ChangeModal" tabindex="-1" role="dialog" aria-labelledby="ChangeModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <form className="modal-content" onSubmit={this.submitChangeSubject}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Добавление предемета</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="p-2 ">
                                    <div className="row">
                                    
                                        <div className="input-group col-12 m-0 mb-3 p-0">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" htmlFor="inputGroupSelect01">Номер №</label>
                                            </div>
                                            <select defaultValue={this.state.changeIndex} className="custom-select" id="inputGroupSelect01" onChange={e => this.setState({changeTime: e.target.value})}>
                                            {this.state.changeIndex===1?<option selected disabled value="8:00">1</option>:<option value="8:00">1</option>}
                                            {this.state.changeIndex===2?<option  selected disabled value="9:00">2</option>:<option value="9:00">2</option>}
                                            {this.state.changeIndex===3?<option  selected disabled value="10:00">3</option>:<option value="10:00">3</option>}
                                            {this.state.changeIndex===4?<option  selected disabled value="11:00">4</option>:<option value="11:00">4</option>}
                                            {this.state.changeIndex===5?<option  selected disabled value="12:00">5</option>:<option value="12:00">5</option>}
                                            {this.state.changeIndex===6?<option  selected disabled value="13:00">6</option>:<option value="13:00">6</option>}
                                            {this.state.changeIndex===7?<option  selected disabled value="14:00">7</option>:<option value="14:00">7</option>}
                                            {this.state.changeIndex===8?<option  selected disabled value="15:00">8</option>:<option value="15:00">8</option>}
                                                    
                                            </select>
                                            

                                        </div>
                                    
                                    <div className="input-group col-12 m-0 p-0">
                                        <div className="input-group-prepend">
                                                <label className="input-group-text" for="inputGroupSelect01">Д/З</label>
                                        </div>
                                        <input type="text" className="form-control" value={this.state.changeHomeWork} onChange={e => this.setState({changeHomeWork: e.target.value})}/>
                                    </div>
                                        <div className="input-group col-12 m-0 p-0 mt-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" for="inputGroupSelect01">Учитель</label>
                                            </div>
                                            <div className="dropdown form-control center-items p-0" id="inputGroupSelect01">
                                                <button className="btn dropdown-toggle w-100"
                                                        type="button" id="changeTeacherButton" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">{this.state.changeTeacherName}</button>
                                                <div id="myDropdown" className="dropdown-menu" aria-labelledby="changeTeacherButton" style={{maxHeight:'400px', overflow:'scroll'}}>
                                                    <div className="p-1 input-group">
                                                    <div className="input-group-prepend ">
                                                    <label className="input-group-text" for="inputGroupSelect01"><i className="fa fa-search"></i></label>
                                                    
                                            </div>
                                                <input type="text" className="form-control" placeholder="Искать..." id="myInput" onKeyUp={()=>this.filterFunction()}/></div>
                                
                                                    {this.state.teachers.map(teacher=>(
                                                        <div className="dropdown-item teacherselect" onClick={()=>this.changeTeacher(teacher.teacherName,teacher.pk)} >{teacher.teacherName}</div>
                                                    ))}
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="submit" className="btn btn-primary">Сохранить изменения</button>
                            </div>
                        </form>
                    </div>
                </div>


                
            
            </div>
        )
    }
}
