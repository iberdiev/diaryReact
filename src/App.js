import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './App.css';
import axios from 'axios';


import Login from './components/Entry';


// NEED CHANGE
import SchoolNavbar from './components/school/school_navbar';
import Shool_Main from './components/school/main_school';
import School_cohorts from './components/school/school_cohorts';
import Cohort from './components/school/cohort';
import Cohort_Time_Table from './components/school/cohort_time_table';
import Cohort_Subjects from './components/school/cohort_subjects';
import School_student_list from './components/school/school_student_list';
import Student_Profile from './components/school/student_profile';
import Student_Diary from './components/school/student_diary';
import Shool_Teachers from './components/school/teachers';
import Shool_Teachers_Profile from './components/school/teacher_profile';
import Teacher_Time_Table from './components/school/teacher_time_table';
import School_Student_Subjects from './components/school/student_subjects';

// For parents
import ParentNavbar from './components/parent/parent_navbar';
import Parent_Main from './components/parent/parent_main';
import Student_Diary_For_Parent from './components/parent/student_diary';
import Student_Statistics from './components/parent/student_statistics';
import Student_Subjects from './components/parent/student_subjects';

// For teachers
import TeacherNavbar from './components/teacher/teacher_navbar';
import Teacher_Main from './components/teacher/main_teacher';
import Time_Table_For_Teacher from './components/teacher/teacher_time_table';
import Teacher_Cohorts from './components/teacher/cohorts';
import Teacher_One_Cohort from './components/teacher/one_cohort';
import Teachers_Cohort_List from './components/teacher/teacher_cohort_list';
import Journal_Choose_Subject from './components/teacher/journal_choose_subject';
import Teacher_Student_List from './components/teacher/teacher_students_list';
import Teacher_Cohort_Time_Table from './components/teacher/cohort_time_table';
import Teacher_Journal_Grade from './components/teacher/journal_grades';
import Teacher_Journal from './components/teacher/journal';
import Teacher_Student_Diary from './components/teacher/student_diary';
import Teachers_Student_Profile from './components/teacher/student_profile';
import Teachers_Student_Subjects from './components/teacher/student_subjects';





class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        userRole: 1
    };
}
  render() {
    
    const userToken = localStorage.getItem('token');
    const userRole = localStorage.getItem('user_role');
    if (userRole==1){
      return(
        <Router>
          <SchoolNavbar />
          <Route path='/' exact component={Shool_Main}/>
          <Route path='/school' exact component={Shool_Main}/>
          <Route path='/school/school_cohorts/' exact component={School_cohorts}/>
          <Route path='/school/cohort/' exact component={Cohort}/>
          <Route path='/school/cohort_time_table/' exact component={Cohort_Time_Table}/>
          <Route path='/school/cohort_subjects/' exact component={Cohort_Subjects}/>
          <Route path='/school/school_student_list/' exact component={School_student_list}/>
          <Route path='/school/student_profile/' exact component={Student_Profile}/>
          <Route path='/school/student_diary/' exact component={Student_Diary} />
          <Route path='/school/teachers/' exact component={Shool_Teachers}/>
          <Route path='/school/teacher_profile/' exact component={Shool_Teachers_Profile}/>
          <Route path='/school/teacher_time_table/' exact component={Teacher_Time_Table}/>
          <Route path='/school/student_subjects/' exact component={School_Student_Subjects}/>

        </Router>
      )
    }
    else if (userRole==2) {
      return(
        <Router>
          {/* For teachers */}
          <TeacherNavbar/>
          <Route path='/' exact component={Teacher_Main}/>
          <Route path='/teacher/' exact component={Teacher_Main}/>
          <Route path='/teacher/teacher_time_table' exact component={Time_Table_For_Teacher}/>
          <Route path='/teacher/cohorts' exact component={Teacher_Cohorts}/>
          <Route path='/teacher/one_cohort' exact component={Teacher_One_Cohort}/>
          <Route path='/teacher/teacher_cohort_list' exact component={Teachers_Cohort_List}/>
          <Route path='/teacher/journal_choose_subject' exact component={Journal_Choose_Subject}/>
          <Route path='/teacher/teacher_student_list' exact component={Teacher_Student_List}/>
          <Route path='/teacher/cohort_time_table' exact component={Teacher_Cohort_Time_Table}/>
          <Route path='/teacher/journal_grades' exact component={Teacher_Journal_Grade}/>
          <Route path='/teacher/journal' exact component={Teacher_Journal}/>
          <Route path='/teacher/student_diary' exact component={Teacher_Student_Diary}/>
          <Route path='/teacher/student_profile' exact component={Teachers_Student_Profile}/>
          <Route path='/teacher/student_subjects/' exact component={Teachers_Student_Subjects}/>

        </Router>
      )
    }
    else if (userRole==3) {
      return(
        
        <Router>
          {/* For parents */}
          <ParentNavbar/>
          <Switch>
          <Route path='/' exact component={Parent_Main}/>
          <Route path='/parent/' exact component={Parent_Main}/>
          <Route path='/parent/student_diary' exact component={Student_Diary_For_Parent}/>
          <Route path='/parent/student_statistics' exact component={Student_Statistics}/>
          <Route path='/parent/student_subjects' exact component={Student_Subjects}/>
          </Switch>
        </Router>
      )
    }
    else{
      var token = null
      const search = window.location.search;
      const params = new URLSearchParams(search);
      token = params.get('token');
      if (token!=null){
        console.log(token)
        axios.get("http://192.168.0.55:8080/api/v1/getToken/"
        ).then(res => {
            const data = res.data;

        })
        .catch(err =>{
            console.log(err.error);
        });
      }
      
      else{
        return(
          <Router>
          <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='*' exact component={Login}/>
          </Switch>
          </Router>
          
        )
      }
      
    }
  }
}

export default App;
