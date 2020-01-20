import React from 'react'
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

export default class SchoolSubjects extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            teachers: [],
        };

        this.token = localStorage.getItem('token');
    }
    componentDidMount = () =>{
        const url = 'http://192.168.0.55:8080/api/v1/subjects/?cohort=' + this.props.location.state.cohort;
        axios.get(url,{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                data: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });

        axios.get('http://192.168.0.55:8080/api/v1/teachers/?school='+ localStorage.getItem('school'),{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                teachers: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    addSubject = event =>{
        event.preventDefault();
        axios.post('http://192.168.0.55:8080/api/v1/subjects/', {"subjectName": this.state.subjectName, "cohort": this.props.location.state.cohort}, {
            headers: {
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        })
            .then(res => {
                window.location.reload();
            }).catch(err => {
                this.error = true;
                this.forceUpdate();
            });
    }
    addTeacher = event =>{
        event.preventDefault();
        axios.post('http://192.168.0.55:8080/api/v1/teachers/', {"teacherName": this.state.teacherName, "schoolID": localStorage.getItem('school')}, {
            headers: {
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        })
            .then(res => {
                window.location.reload();
            }).catch(err => {
                this.error = true;
                this.forceUpdate();
            });
    }
    render() {
        const className = this.props.location.state.className;
        const {data, teachers} = this.state;
        return (
            <div>
                <h3>Класс {className} - Предметы</h3>
                <form onSubmit={this.addSubject}>
                    <InputGroup>
                        <Input onChange={e => this.setState({subjectName: e.target.value})} placeholder="Название предмета" />
                        <InputGroupAddon addonType="append">
                          <Button color="primary" type='submit' disabled={!this.state.subjectName}>Добавить предмет</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </form>
                <form onSubmit={this.addTeacher}>
                    <InputGroup>
                        <Input onChange={e => this.setState({teacherName: e.target.value})} placeholder="ФИО учителя" />
                        <InputGroupAddon addonType="append">
                          <Button type='submit' color="primary" disabled={!this.state.teacherName}>Добавить учителя&nbsp;</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </form>
                <br/>
                {data.map(subject => (
                    <Subject subject={subject} teachers={teachers} />
                ))}
            </div>
        );
      }
    }


class Subject extends React.Component {
        changeTeacher = event => {
            event.preventDefault();
            axios.post('http://192.168.0.55:8080/api/v1/changeTeacher/', {"subject": this.props.subject.pk, "teacher": event.target.value}, {
                headers: {
                    Authorization:'Token ' + localStorage.getItem('token'),
                }
            })
                .then(res => {
                    window.location.reload();
                }).catch(err => {
                    this.error = true;
                    this.forceUpdate();
                });
        }

        render() {
            const teacherID = this.props.subject.teacherID;
            return (
                <div className="list1">
                    <h4 key={this.props.subject.subjectName}>{this.props.subject.subjectName}</h4>

                    <Input type="select" onChange={this.changeTeacher}>
                    {this.props.teachers.map(function(teacher){
                        return (
                            <option selected={teacher.pk === teacherID} value={teacher.pk} key={teacher.teacherName}>{teacher.teacherName} </option>)
                    })}

                    </Input>
                    <br/>
                </div>
            );
          }
        }
