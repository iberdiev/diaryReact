import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import DatePicker from 'react-date-picker'
import ReadMoreReact from 'read-more-react';


class One_Class extends Component {

    render(){
        return(
            <div className="card p-2 mt-1 ">
                <div className="row">
                    <div className="col-4 center-items text-center">
                        {this.props.subject}
                        <br/>
                        {this.props.time}
                    </div>
                    <div className="col-5 center-items">
                        <div className="text-center">
                            <ReadMoreReact text={this.props.task}
                            min={10}
                            ideal={20}
                            max={200}
                            readMoreText={'Читать далее...'}
                            /></div>
                        
                    </div>
                    <div className="col-3 center-items">{this.props.grades.map(function(mark){
                        return (mark.mark+ ' ')
                    })}</div>

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
        const url = `http://192.168.0.55:8080/api/v1/timetableByCohortWithOneStudentsGrades/?studentID=${this.props.location.state.pk}&cohortID=${this.props.location.state.cohortID}&date=${this.formatDate(date)}`;
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

    getMonth(date){
        var months = ['Января', 'Февраля', 'Марта', 'Апреля','Майа', 'Июня', 'Июля', 'Августа','Сентября', 'Октября', 'Ноября', 'Декабря']
        var month = date.getMonth();
        return months[month];
    }

    onChange = date => {
        var chosenDate = date;
        this.setState({ chosenDate: chosenDate });
        this.getTable(chosenDate);
    }

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
                            <div className="p-1 row text-center">
                            
                            <div className="col-12 center-items"><label htmlFor="date" className="m-0"> {this.state.chosenDate.getDate()} {this.getMonth(this.state.chosenDate)}</label> <span className="p-1"> - </span> <span><span><DatePicker  clearIcon=""  onChange={this.onChange} value={this.state.chosenDate} /></span></span></div>
                        </div>
                            <div className="col-12">
                                <h2 className="text-center mt-3 mb-4 btn-link"> <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() - 1) ) }} className="btn btn-primary float-left ml-3"><i className="fa fa-arrow-left p-1 mr-1"></i></button> {this.getWeekDay(this.state.chosenDate)} <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() + 1) ) }} className="btn btn-primary float-right mr-3"><i className="fa fa-arrow-right p-1 mr-1"></i></button></h2>
                            </div>
                            <div className="pl-3 p-2">
                                <div className="row">
                                    <div className="col-4 btn-link center-items">
                                        <h6>Урок и Время</h6>
                                    </div>
                                    <div className="col-5 btn-link center-items">
                                        <h6>Д/З</h6>
                                    </div>
                                    <div className="col-3 btn-link center-items">
                                        <h6>Оценки</h6>
                                    </div>
                                </div>
                            </div>

                            {this.state.timeTable.map(subject => (
                                <One_Class subject={subject.subjectName} time={subject.startTime.slice(0,-3)+'-'+subject.endTime.slice(0,-3)} task = {subject.homework} grades={subject.regularGrades} />
                            ))}

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
