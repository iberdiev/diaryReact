import React, { Component } from 'react';
import axios from 'axios';
import { Table, Input, Button, Form } from 'reactstrap';


export default class ListOfStudents extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            cohort: 1,
            studentName: "",
            numberInList: 1,
        };
        this.token = localStorage.getItem('token');
    }
    componentDidMount = () =>{

        const url = "http://192.168.0.55:8080/api/v1/students/?cohort=" + this.props.location.state.cohort;;

        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                isLoaded: true,
                data: data,
            });
            // localStorage.removeItem('className')
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    createStudent = event =>{
        event.preventDefault();
        axios.post('http://192.168.0.55:8080/api/v1/students/', {"studentName": this.state.studentName, "cohort": this.props.location.state.cohort}, {
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
        const {data} = this.state;
        const className = this.props.location.state.className;
        // {this.state.studentName? 'block' : null}
        return (
            <div>
                <h3>{className}</h3>
                <Form onSubmit={this.createStudent}>
                    <Input size="lg" id="studentName" onChange={e => this.setState({studentName: e.target.value})} placeholder="Введите имя"></Input>
                    <Button color='primary' disabled={!this.state.studentName} block size="lg" type='submit'>Добавить ученика</Button>
                </Form>
                <Table striped>
                    <thead>
                        <tr>
                          <th>#</th>
                          <th>ФИО</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cohort, i) => (
                            <tr>
                                <th scope ="row">{i+1}</th>
                                    <td>
                                        <h5 key={cohort.studentName}>{cohort.studentName}</h5>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        );
      }
    }
