import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';

export default class Teacher extends Component {
    constructor(props){
        super(props);
        this.state = {
            mainCohorts : [],
            givenSubjects: [],
        };
    }
    // logout = event => {
    //     event.preventDefault();
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user_role');
    //     window.location.reload();
    // }
    // curl -i -H "Accept: application/json" -H "Con/json" -H "Authorization: Token b79b84825325b6deeba92aeca3836585159c4f43" http://127.0.0.1:8080/api/v1/mainCohorts/

    componentDidMount = () =>{
        axios.get("http://192.168.0.55:8080/api/v1/mainCohorts/",{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                mainCohorts: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
        axios.get("http://192.168.0.55:8080/api/v1/givenSubjectsOfTeacher/",{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            console.log(data);
            this.setState({
                givenSubjects: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        const {mainCohorts, givenSubjects} = this.state;
        return (
            <div>
                <h3>Ваши классы</h3>
                {mainCohorts.map(mainCohort => (
                    <Jumbotron><h3 key={mainCohort.pk}>{mainCohort.class_name}</h3></Jumbotron>
                ))}
                <h3>Вы преподаёте</h3>
                {givenSubjects.map(subject => (
                    <Link to={{pathname: '/teacher/givenSubjects/', state: {subjectID: subject.pk, subjectName: subject.subjectName}}}>
                        <Jumbotron><h3 key={subject.pk}>{subject.subjectName} - {subject.cohortName}</h3></Jumbotron>
                    </Link>
                ))}
            </div>
        )
    }
}
