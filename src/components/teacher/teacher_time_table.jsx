import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class One_Class extends Component{
    render(){
        return(
            <div className="card p-2 ">
                <div className="row">
                    <div className="col-4 text-center" >{this.props.time}</div>
                    <div className="col-4 text-center" >{this.props.cohort}</div>
                    <div className="col-4 text-center" >{this.props.subject}</div>
                </div>
            </div>
        )
    }
}

class One_Day extends Component{
    render(){
        return(
            <div className="item">
                <div className="p-1 row">   
                    <div className="col-8">{this.props.day_of_week} - {this.props.today_date}</div>
                    <div className="date-picker">
                        <span className="btn-link">{this.props.istoday}</span>
                        <span>date</span>
                    </div>
                </div>
                <div className="col-12"><h2 className="text-center mt-3 mb-4 btn-link">{this.props.day_of_week}</h2></div>
                <div className="pl-3 p-2">
                    <div className="row">
                        <div className="col-4  text-center btn-link" ><h3>Время</h3></div>
                        <div className="col-4  text-center btn-link" ><h3>Класс</h3></div>
                        <div className="col-4  text-center btn-link" ><h3>Урок</h3></div>
                    </div>
                </div>
                
                <One_Class time="9:15-10:00" cohort="10-А" subject="Алгебра" />

                <One_Class time="9:15-10:00" cohort="10-А" subject="Алгебра" />
                
            </div>
        )
    }
}

export default class Time_Table_For_Teacher extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <div className="owl-carousel owlExample">
                        <One_Day day_of_week = "Суббота" today_date="7 января 2020" istoday="Cегодня" />
                        <One_Day day_of_week = "Суббота" today_date="7 января 2020" istoday="Cегодня" />

                    </div>        
                </div>
                
            </div>
        )
    }
}
