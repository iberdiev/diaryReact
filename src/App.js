import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/CustomNavbar';
import ListOfStudents from './components/school/ListOfStudents';
import SchoolSubjects from './components/school/schoolSubjects';
import GivenSubjectByTeacher from './components/teacher/given_subject_by_teacher';
import GivenSubjectByTeacherStudent from './components/teacher/given_subject_by_teacher_student';
// import 'bootstrap/dist/css/bootstrap.min.css';

// NEED CHANGE
import Shool_Main from './components/school/main_school';
import School_cohorts from './components/school/school_cohorts';
import School_student_list from './components/school/school_student_list';
import Student_Profile from './components/school/student_profile';
import Student_Diary from './components/school/student_diary';
import Shool_Teachers from './components/school/teachers';
import Shool_Teachers_Profile from './components/school/teacher_profile';
import Teacher_Time_Table from './components/school/teacher_time_table';



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

          {/* NEEDED CHANGE */}
          {/* For shools */}
          <Route path='/school/' exact component={Shool_Main}/>
          <Route path='/school/school_cohorts/' exact component={School_cohorts}/>
          <Route path='/school/school_student_list/' exact component={School_student_list}/>
          <Route path='/school/student_profile/' exact component={Student_Profile}/>
          <Route path='/school/student-diary/' exact component={Student_Diary}/>
          <Route path='/school/teachers/' exact component={Shool_Teachers}/>
          <Route path='/school/teacher_profile/' exact component={Shool_Teachers_Profile}/>
          <Route path='/school/teacher_time_table/' exact component={Teacher_Time_Table}/>
        </div>
      </Router>
    );
  }
}

export default App;
