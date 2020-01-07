import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/CustomNavbar';
import ListOfStudents from './components/school/ListOfStudents';
import SchoolSubjects from './components/school/schoolSubjects';
import GivenSubjectByTeacher from './components/teacher/given_subject_by_teacher';
import GivenSubjectByTeacherStudent from './components/teacher/given_subject_by_teacher_student';
// import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path='/students/:number/' exact component={ListOfStudents}/>
          <Route path='/subjects/:number/' exact component={SchoolSubjects}/>
          <Route path='/teacher/givenSubjects/' exact component={GivenSubjectByTeacher}/>
          <Route path='/teacher/givenSubjects/student/' exact component={GivenSubjectByTeacherStudent}/>
        </div>
      </Router>
    );
  }
}

export default App;
