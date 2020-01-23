import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class School_Profile extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
        this.state = {
            statistics: null,
            cohortID: this.props.location.state.cohortID,
            studentID: this.props.location.state.studentID,
            loaded: false,
        }
    }
    componentDidMount = () =>{
        axios.get('http://192.168.0.55:8080/api/v1/getStatisticsForStudent/?studentID='+ this.state.studentID,)
        .then(res => {
            console.log(res.data)
            this.setState({
                statistics: res.data,
                loaded: true,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    showStatistics(){
        if (!this.state.loaded){
            return (
                <div>
                    Статистика загружается...
                </div>
            )
        } else {
            const {studentAvgRG,studentAvgFG,cohortAvgRG,cohortAvgFG,schoolAvgRG,schoolAvgFG,allSchoolsRG,allSchoolsFG } = this.state.statistics;
            return (
                <div>
                    <h3>
                        <strong>Рейтинг по обычным оценкам</strong><br/><br/>
                            &emsp;Средняя обычная: {studentAvgRG}<br/><br/>
                            &emsp;{studentAvgRG >= cohortAvgRG ? "⬆" : "⬇"} по классу<br/>
                            &emsp;{studentAvgRG >= schoolAvgRG ? "⬆" : "⬇"} по школе<br/>
                            &emsp;{studentAvgRG >= allSchoolsRG ? "⬆" : "⬇"} по всем школам<br/><br/>
                        <strong>Рейтинг по итоговым оценкам</strong><br/><br/>
                            &emsp;Средняя итоговая оценка: {studentAvgFG}<br/><br/>
                            &emsp;{studentAvgFG >= cohortAvgFG ? "⬆" : "⬇"} по классу<br/>
                        	&emsp;{studentAvgFG >= schoolAvgFG ? "⬆" : "⬇"} по школе<br/>
                            &emsp;{studentAvgFG >= allSchoolsFG ? "⬆" : "⬇"} по всем школам<br/><br/>
                    </h3>
                </div>
            )
        }
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    {this.showStatistics()}

                </div>

            </div>
        )
    }
}