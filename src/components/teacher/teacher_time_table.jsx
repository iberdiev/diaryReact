import React, {  Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-date-picker'
import ReadMoreReact from 'read-more-react';
import {requestUrl} from '../requests';



class One_Class extends Component {

    render(){
        return(
            <div className="card p-2 ">
                <div className="row">
                    <div className="col-4 center-items text-center">
                    <p>{this.props.className}
                        <br/>
                        {this.props.time}
                        </p>
                    </div>
                    <div className="col-5 center-items">
                        <ReadMoreReact text={this.props.homework}
                            min={10}
                            ideal={20}
                            max={200}
                            readMoreText={'Читать далее...'}
                            /></div>
                    <div className="col-3 center-items">{this.props.subject}</div>

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
        const url = requestUrl + `/api/v1/timetableByTeacher/?teacherID=${this.props.location.state.teacherID}&date=${this.formatDate(date)}`;
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
            console.log(data)
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

    getMonth(date){
        var months = ['Января', 'Февраля', 'Марта', 'Апреля','Майа', 'Июня', 'Июля', 'Августа','Сентября', 'Октября', 'Ноября', 'Декабря']
        var month = date.getMonth();
        return months[month];
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

    onChange = date => {
        var chosenDate = date;
        this.setState({ chosenDate: chosenDate });
        this.getTable(chosenDate);
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
                                <h2 className="text-center mt-3 mb-4 btn-link"> <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() - 1) ) }} className="btn btn-primary float-left "><i className="fa fa-arrow-left p-1 mr-1"></i></button> {this.getWeekDay(this.state.chosenDate)} <button onClick={() => { this.getTable(this.state.chosenDate.setDate(this.state.chosenDate.getDate() + 1) ) }} className="btn btn-primary float-right"><i className="fa fa-arrow-right p-1 mr-1"></i></button></h2>
                            </div>
                            <div className="pl-3 p-2">
                                <div className="row">
                                    <div className="col-4 btn-link center-items">
                                        <h6>Класс и Время</h6>
                                    </div>
                                    <div className="col-5 btn-link center-items">
                                        <h6>Д/З</h6>
                                    </div>
                                    <div className="col-3 btn-link center-items">
                                        <h6>Урок</h6>
                                        
                                    </div>
                                </div>
                            </div>

                            {this.state.timeTable.map(subject => (
                                <One_Class subject={subject.subjectName} time={subject.startTime.slice(0,-3)+'-'+subject.endTime.slice(0,-3)} homework = {subject.homework} className={subject.className} />
                            ))}

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
