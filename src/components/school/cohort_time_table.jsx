import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';


class One_Class extends Component {

    render() {
        return (
            <div className="card p-2 ">
                <div className="row">
                    <div className="col-6 center-items text-center">
                        {this.props.time}
                    </div>
                    <div className="col-6 center-items">{this.props.subject}</div>

                </div>
            </div>
        )

    }
}


export default class Student_Diary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: null,
            timeTable: [],
            isLoaded: false,
            teachers:[{name:"olga"}]
        }
    }


    getTable(date) {
        this.setState({
            isLoaded: false,
            timeTable: [],
        })
        const url = `http://192.168.0.55:8080/api/v1/timetableByCohort/?cohortID=${this.props.location.state.cohortID}&date=${this.formatDate(date)}`;
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

    componentWillMount = () => {
        var tempcurrentTime = new Date();
        this.setState({
            chosenDate: tempcurrentTime,
        });
        axios.get('http://192.168.0.55:8080/api/v1/teachers/',{
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
            
    render() {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    {/* {!this.state.isLoaded ?
                        <div>
                            <div className="preloader center-items">
                                <div className="lds-dual-ring"></div>
                            </div>
                        </div> : ""} */}
                    <div className="owl-carousel owlExample">
                        
                        <div className="item">
                            <div className="p-1 row">
                                <div className="col-8"><label htmlFor="date">{this.getWeekDay(this.state.chosenDate)}</label> - <span><span><input id="date" onChange={this.onChosenDate} type="date" value={this.formatDate(this.state.chosenDate)} /></span></span></div>
                                <div className="date-picker">
                                    <span className="btn-link">{this.props.istoday}</span>
                                </div>
                            </div>
                            <div className="col-12">
                                <h2 className="text-center mt-3 mb-4 btn-link"> <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() - 1)) }} className="btn btn-primary float-left ml-3"><i className="fa fa-arrow-left p-1 mr-1"></i></button> {this.getWeekDay(this.state.chosenDate)} <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() + 1)) }} className="btn btn-primary float-right mr-3"><i className="fa fa-arrow-right p-1 mr-1"></i></button></h2>
                            </div>
                            <div className="pl-3 p-2">
                                <div className="row">
                                    <div className="col-6 btn-link center-items">
                                        <h6>Время</h6>
                                    </div>
                                    <div className="col-6 btn-link center-items">
                                        <h6>Урок</h6>
                                    </div>
                                </div>
                            </div>

                            {this.state.timeTable.map(subject => (
                                <One_Class subject={subject.subjectName} time={subject.startTime.slice(0, -3) + '-' + subject.endTime.slice(0, -3)} />
                            ))}

                            <div className="center-items m-3"><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Добавить новый урок</button></div>

                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="p-2 ">
                                    <div className="row">
                                    <div className="input-group mb-3 col-12 m-0 p-0">
                                            <div className="input-group-prepend">
                                                <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Время &nbsp;
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="#">8:30-9:15</a>
                                                    <a className="dropdown-item" href="#">8:30-9:15</a>
                                                    <a className="dropdown-item" href="#">8:30-9:15</a>
                                                
                                                </div>
                                            </div>
                                            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                            </div>
                                            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/css/bootstrap-select.min.css" />
                                            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
                                        <div className="input-group col-12 m-0 p-0">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" for="inputGroupSelect01">Предмет</label>
                                            </div>
                                            <select className="custom-select" id="inputGroupSelect01">
                                                <option selected>Веберите Предмет</option>
                                                <option value="1">Матем</option>
                                                <option value="2">Англ</option>
                                                <option value="3">Русский</option>
                                            </select>
                                        </div>
                                        <div className="input-group col-12 m-0 p-0 mt-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" for="inputGroupSelect01">Учитель</label>
                                            </div>
                                            <div className="dropdown">
                                                <button className="btn btn-outline-info dropdown-toggle"
                                                        type="button" id="dropdownMenu1" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">Выберите учителя</button>
                                                <div id="myDropdown" className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                                <input type="text" className="dropdown-item" placeholder="Искать..." id="myInput" onKeyUp={()=>this.filterFunction()}/>

                                                    {this.state.teachers.map(teacher=>(
                                                        <a className="dropdown-item teacherselect">{teacher.teacherName}</a>
                                                    ))}
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="button" className="btn btn-primary">Добавить урок</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
