import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';


class One_Class extends Component {

    render(){
        return(
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
    constructor(props){
        super(props);
        this.state = {
            chosenDate: null,
            timeTable: [],
            isLoaded: false,
        }
    }


    getTable(date) {
        this.setState({
            isLoaded: false,
            timeTable: [],
        })
        const url = `http://192.168.0.55:8080/api/v1/timetableByCohort/?cohortID=${this.props.location.state.cohortID}&date=${this.formatDate(date)}`;
        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                timeTable: data,
                isLoaded: true,
            })
        })
        .catch(err =>{
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

    convertToDDMMYYYY(date){
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        return (dd+'/'+mm+'/'+yyyy);

    }
    onChosenDate = event => {
        var chosenDate = new Date(event.target.value);
        this.setState({chosenDate: chosenDate});
        this.getTable(chosenDate);
    }

    componentWillMount = () => {
        var tempcurrentTime = new Date();
        this.setState({
            chosenDate: tempcurrentTime,
        });
    }
    componentDidMount = () =>{
        this.getTable(this.state.chosenDate);
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    {!this.state.isLoaded ?
                        <div>
                            <div className="preloader center-items">
                            <div className="lds-dual-ring"></div>
                        </div>
                    </div> : ""}
                    <div className="owl-carousel owlExample">
                        <div className="item">
                            <div className="p-1 row">
                            <div className="col-8"><label htmlFor="date">{this.getWeekDay(this.state.chosenDate)}</label> - <span><span><input id="date" onChange={this.onChosenDate} type="date" value={this.formatDate(this.state.chosenDate)}/></span></span></div>
                                <div className="date-picker">
                                    <span className="btn-link">{this.props.istoday}</span>
                                </div>
                            </div>
                            <div className="col-12">
                                <h2 className="text-center mt-3 mb-4 btn-link"> <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() - 1) ) }} className="btn btn-primary float-left ml-3"><i className="fa fa-arrow-left p-1 mr-1"></i></button> {this.getWeekDay(this.state.chosenDate)} <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() + 1) ) }} className="btn btn-primary float-right mr-3"><i className="fa fa-arrow-right p-1 mr-1"></i></button></h2>
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
                                <One_Class subject={subject.subjectName} time={subject.startTime.slice(0,-3)+'-'+subject.endTime.slice(0,-3)}/>
                            ))}

                            <div className="center-items m-3"><a className="btn d-block btn-primary text-white " data-toggle="modal" data-target="#exampleModal">Добавить новый урок</a></div>

                        </div>
                    </div>
                </div>

                {/* Modal for adding new subject */}
                <div class="modal fade" id="exampleModal" tabindex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document" >
                        <div class="modal-content" style={{backgroundColor:'#F4F4F4'}}>
                        <div class="modal-header ">
                            <h5 class="modal-title" id="exampleModalLabel">Добавление урока</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="card p-2 ">
                                <div className="row">
                                    <div className="col-6 center-items text-center">
                                        Время
                                    </div>
                                    <div className="col-6 center-items">Класс</div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
