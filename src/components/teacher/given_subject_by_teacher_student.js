import React, { Component } from 'react';
import axios from 'axios';
import { Table, Form, Input, Button, ButtonGroup    } from 'reactstrap';

export default class GivenSubjectByTeacherStudent extends Component {
    constructor(props){
        super(props);
        this.state = {
            grades : [],
            mark: "Оценка не выбрана",
            comment: 5,
        };
    }
    componentDidMount = () =>{
        const url = "http://192.168.0.55:8080/api/v1/regularGrades/?subjectID="+ this.props.location.state.subjectID + '&studentID='+this.props.location.state.studentID;
        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                grades: data.reverse(),
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }

    addGrade = event =>{
        event.preventDefault();
        console.log(this.state.mark);
        console.log(this.state.comment);
        axios.post('http://192.168.0.55:8080/api/v1/regularGrades/', {"studentID": this.props.location.state.studentID,
                                                                   "subjectID": this.props.location.state.subjectID,
                                                                   "mark": this.state.mark,
                                                                   "comment": this.state.comment}, {
            headers: {
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
                window.location.reload();

            }).catch(err => {
                console.log(err);
                this.error = true;
                this.forceUpdate();
            });
    }
    getAverage() {
        var sum = 0, length = this.state.grades.length;
        for (var i = 0; i < length; i++){
            sum += this.state.grades[i].mark
        }
        return sum/length;
    }
    render() {
        const subjectName = this.props.location.state.subjectName;
        const studentName = this.props.location.state.studentName;
        const {grades} = this.state;
        return (
            <div>
                <h2>Предмет: {subjectName}</h2>
                <h4>Ученик: {studentName}</h4>
                <Form onSubmit={this.addGrade}>
                    <h4>Оценка: {this.state.mark}</h4>
                    <ButtonGroup size='lg'>
                          <Button onClick={e => this.setState({mark: 2})} style = {{backgroundColor:'#FA5E5E'}}>&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                          <Button onClick={e => this.setState({mark: 3})} style = {{backgroundColor:'#FEDC6C'}}>&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                          <Button onClick={e => this.setState({mark: 4})} style = {{backgroundColor:'#96CEFE'}}>&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                          <Button onClick={e => this.setState({mark: 5})} style = {{backgroundColor:'#4DFEA0'}}>&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                    </ButtonGroup><br/><br/>
                    <h4>Комментарий:</h4>
                    <Input size='lg' type="select" onChange={e => this.setState({comment: e.target.value})}>
                        <option value="1">Контрольная работа</option>
                        <option value="2">Классная работа</option>
                        <option value="3">Устный зачёт</option>
                        <option value="4">Домашняя работа</option>
                        <option selected="selected" value="5">Неизвестно</option>
                    </Input><br/>
                    <Button size='lg' block color="primary" type='submit'>Добавить оценку</Button>
                </Form><br/>
                Среднее Арифметическое: {this.getAverage()}
                <Table>
                    <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map(grade => (

                            <OneRegularGrade mark={grade.mark} pub_date={grade.pub_date} commentValue={grade.comment} />

                        ))}
                    </tbody>
                </Table>


            </div>
        );
    }
}

class OneRegularGrade extends Component {
    commentSwitch(commentValue){
        switch(commentValue){
            case 1:
                return "Контрольная работа";
            case 2:
                return "Классная работа";
            case 3:
                return "Устный зачёт";
            case 4:
                return "Домашняя работа";
            default:
                return "Неизвестно";
        }
    }
    colorSwitch(mark){
        switch(mark){
            case 2:
                return "#FA5E5E ";
            case 3:
                return "#FEDC6C";
            case 4:
                return "#96CEFE";
            case 5:
                return "#4DFEA0";
            default:
                return null;
        }
    }
    render() {
        const {mark, pub_date, commentValue} = this.props;
        const revised_data = pub_date.slice(8, 10) + '/' +  pub_date.slice(5, 7)+ '/'+pub_date.slice(0, 4)+ ' ' +pub_date.slice(11, 19);
        return (
            <div>
                <tr>
                    <th  bgcolor={this.colorSwitch(mark)} scope="row">{mark}</th>
                    <td>{this.commentSwitch(commentValue)}</td>
                    <td>{revised_data}</td>
                </tr>
            </div>
        );
    }
}
