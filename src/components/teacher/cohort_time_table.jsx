
import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import DatePicker from 'react-date-picker'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
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
            subjectEndTime: null,


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
        const url = `http://diary.putinbyte.com:8000/api/v1/timetableByCohort/?cohortID=${this.props.location.state.cohortID}&date=${this.formatDate(date)}`;
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
        var data = {"subjectName": this.state.subjectName, "cohortID": this.props.location.state.cohortID, "teacherID": this.state.chosenTeacherID}
        
        
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
        if(value=="Другое..."){
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
        var teacherInput = document.getElementById("teacherID");
        var teacherButton = document.getElementById("teacherButton");
        this.setState({
            chosenTeacherID:id
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
        event.preventDefault();
        var isAvailable = false;
        var idSubject = null;
        for (let i=0; i<this.state.subjects.length; i++){
            if (this.state.subjects[i].subjectName==this.state.chosenSubject){
                isAvailable = true;
                
                idSubject = this.state.subjects[i].pk
            }
        }
        if (isAvailable){
            console.log('Есть')
            var data = {"teacher":this.state.chosenTeacherID, "cohortID": this.props.location.state.cohortID, "subjectID": idSubject, "date" : this.formatDate(this.state.chosenDate), "startTime": this.state.subjectStarttime, "endTime": this.state.subjectEndTime}
            axios.post(requestUrl + '/api/v1/timetableByCohort/',data,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
            }).then(res => {
                const data = res.data;
                window.location.reload()
            })
            .catch(err =>{
                console.log(err.error);
            });
        }else{
            console.log('Нет')
            var data = {"newSubject": this.state.chosenSubject, "teacher":this.state.chosenTeacherID, "cohortID": this.props.location.state.cohortID, "date" : this.formatDate(this.state.chosenDate), "startTime": this.state.subjectStarttime, "endTime": this.state.subjectEndTime}
            axios.post(requestUrl + '/api/v1/createSubjectAndTimetable/',data,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
            }).then(res => {
                const data = res.data;
                window.location.reload()
            })
            .catch(err =>{
                console.log(err.error);
            });
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
            const data = res.data;
            window.location.reload()
        })
        .catch(err =>{
            console.log(err.error);
        });
    }

    deleteSubject(id,subjectname){
        if (window.confirm("Вы уверены что хотите удалить урок: " + subjectname + "?")){
            axios.delete(`http://diary.putinbyte.com:8000/api/v1/timetableByCohort/?pk=${id}`,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
            }).then(res => {
                const data = res.data;
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
                                    <div className="col-3 btn-link center-items">
                                        <h6>Время</h6>
                                    </div>
                                    <div className="col-3 btn-link center-items">
                                        <h6>Д/З</h6>
                                    </div>
                                    <div className="col-4 btn-link center-items">
                                        <h6>Урок</h6>
                                    </div>
                                </div>
                            </div>

                            {this.state.timeTable.map((subject, index) => (

                                <div className="card">
                                    <div className="row">
                                        <div className="col-3 center-items text-center">
                                        {subject.startTime.slice(0,-3)+'-'+subject.endTime.slice(0,-3)}
                                        </div>
                                        <div className="col-3 center-items text-center">
                                            <ReadMoreReact text={subject.homework}
                                                min={10}
                                                ideal={20}
                                                max={200}
                                                readMoreText={'Развернуть...'}
                                                />
                                        </div>
                                        <div className="col-4 center-items">{subject.subjectName}</div>
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
                                    <div className="input-group mb-3 col-12 m-0 p-0">
                                            <div className="input-group-prepend">
                                                Начало:
                                            </div>
                                            <TimePicker minuteStep={5} placeholder={'Выберите время'} className="col-4"  showSecond={false} onChange={e => this.setState({subjectStarttime: e.format("HH:mm")})} />
                                            <div className="input-group-prepend">
                                                Конец:
                                            </div>
                                            <TimePicker minuteStep={5} placeholder={'Выберите время'} className="col-4"  showSecond={false} onChange={e => this.setState({subjectEndTime: e.format("HH:mm")})} />
                                    </div>
                                            {/* <div className="input-group-prepend">
                                                <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Время &nbsp;
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" onClick={()=>this.changeTimeValue('8:00-8:45')}>8:00-8:45</a>
                                                    <a className="dropdown-item" onClick={()=>this.changeTimeValue('8:55-9:40')}>8:55-9:40</a>
                                                    <a className="dropdown-item" onClick={()=>this.changeTimeValue('9:50-10:35')}>9:50-10:35</a>
                                                </div>
                                            </div> 
                                            <input type="text" id="subjectInput" name="subject" onChange={e => this.setState({subjectStarttime: e.target.value.slice(0, -3)})} className="form-control" />

                                            */}

                                            
                                            
                                            
                                            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/css/bootstrap-select.min.css" />
                                            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
                                        <div className="input-group col-12 m-0 p-0">
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
                                                        <a className="dropdown-item teacherselect" onClick={()=>this.changeTeacherValue(teacher.teacherName,teacher.pk)} >{teacher.teacherName}</a>
                                                    ))}
                                                    
                                                </div>
                                            </div>
                                        </div>
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
                                    <div className="input-group mb-3 col-12 m-0 p-0">
                                            <div className="input-group-prepend">
                                                Начало:
                                            </div>
                                            <TimePicker minuteStep={5} placeholder={'Выберите время'} className="col-4" value={moment().hour(this.state.changeTime.slice(0,2)).minute(this.state.changeTime.slice(3,5))}  showSecond={false} onChange={e => this.setState({changeTime: e.format("HH:mm")})} />
                                            <br/>
                                            <div className="input-group-prepend">
                                                Конец:
                                            </div>
                                            <TimePicker minuteStep={5} placeholder={'Выберите время'} className="col-4" value={moment().hour(this.state.changeEndtime.slice(0,2)).minute(this.state.changeEndtime.slice(3,5))}  showSecond={false} onChange={e => this.setState({changeEndtime: e.format("HH:mm")})} />
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
                                                        <a className="dropdown-item teacherselect" onClick={()=>this.changeTeacher(teacher.teacherName,teacher.pk)} >{teacher.teacherName}</a>
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
