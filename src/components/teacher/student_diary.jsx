import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class One_Class extends Component {
    constructor (props){
        super(props);
    }
    render(){
        return(
            <div className="card p-2 ">
                <div className="row">
                    <div className="col-4 center-items text-center">
                        {this.props.subject}
                        <br/>
                        {this.props.time}
                    </div>
                    <div className="col-5 center-items">{this.props.task}</div>
                    <div className="col-3 center-items">{this.props.grade}</div>

                </div>
            </div>
        )
                
    }
}

class One_Day extends Component {
    constructor(props){
        super(props);

        this.classeID = this.props.cohort_ID;
        this.token = localStorage.getItem('token');

        
    }
    render() {
        return(
            <div className="item">
                <div className="p-1 row">
                    <div className="col-8">{this.props.day_of_week} - {this.props.date}</div>
                    <div className="date-picker">
                        <span className="btn-link">{this.props.istoday}</span>
                        <span>Input</span>
                    </div>
                </div>
                <div className="col-12">
                    <h2 className="text-center mt-3 mb-4 btn-link">{this.props.day_of_week}</h2>
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

                <One_Class subject="Русский" time="9:15-10:00" task = "Прочитать доконца" grade="5" />
                <One_Class subject="Матем" time="10:15-11:00" task = "упр 1-10 стр 8" grade="4" />                
            </div>
            
        )
    }
}
export default class Teacher_Student_Diary extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <div className="owl-carousel owlExample">
                    < One_Day day_of_week="Пятнциа" date="7 января 2020" istoday="Сегодня" />
                    < One_Day day_of_week="Пятнциа" date="7 января 2020" istoday="Сегодня" />

                    </div>
                </div>

            </div>
        )
    }
}
