import React, {  Component } from 'react'
import axios from 'axios';
import {requestUrl} from '../requests';

// import { Link } from 'react-router-dom';

export default class Shool_Teachers extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            teachers:[],
            teacherID: null,
            subjectName: null,
            chosenSubject: null,
            chosenSubjectID: null,
            chosenTeacherID: null,
            chosenTeacherName: null,
        };
    }
    componentDidMount = () =>{
        const url = requestUrl + '/api/v1/subjects/?cohortID=' + this.props.location.state.cohortID;
        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            console.log(data);
            this.setState({
                data: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });

        // Ajax request for teachers list
        axios.get(requestUrl + '/api/v1/teachers/',{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
            console.log(data)
            this.setState({
                teachers: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });

        
    }


    filterFunction(){
        var input, filter, a, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            var div = document.getElementById("myDropdown");
            a = div.getElementsByTagName("a");
            for (i = 0; i < a.length; i++) {
              var txtValue = a[i].textContent || a[i].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
              } else {
                a[i].style.display = "none";
              }
            }
          }




    changesubjectValue(subject){
        var subjectInput = document.getElementById("subjectInput");
        subjectInput.value = subject;
        this.setState({
            subjectName:subject
        })
    }
    changeTeacherValue(name,id){
        var teacherInput = document.getElementById("teacherID");
        var teacherButton = document.getElementById("teacherButton");
        this.setState({
            teacherID:id
        })
        teacherButton.innerHTML = (name);
    }
    submitNewSubject = event =>{
        event.preventDefault();
        var data = {"subjectName": this.state.subjectName, "cohortID": this.props.location.state.cohortID, "teacherID": this.state.teacherID}
        axios.post(requestUrl + '/api/v1/subjects/',data,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
        })
        .catch(err =>{
            console.log(err.error);
        });
    }

    changeSubject(subjectid,subjectname,teachername,teacherid){
        this.setState({
            chosenSubjectID:subjectid,
            chosenSubject:subjectname,
            chosenTeacherID:teacherid,
            chosenTeacherName: teachername,
        })
        

    }

    submitChange(event){
        event.preventDefault();
        var data = {"pk":this.state.chosenTeacherID, "subjectName":this.state.chosenTeacherID, "teacherID":this.state.chosenTeacherID}
        axios.post(requestUrl + '/api/v1/subjects/',data,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    
    render() {
        const {data} = this.state;
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <h6 className="text-center">
                        Класс {this.props.location.state.className}
                    </h6>
                    <div className="pl-3 pr-3 mt-2 mb-1">
                        <div className="row"><div className="col-4  text-center btn-link" ><h6>Предметы</h6></div><div className="col-6 btn-link center-items"><h6>Преподователи</h6></div></div>
                    </div>
                    {data.map(subject => (
                        <OneSubject subjectName={subject.subjectName} teacherName={subject.teacherID.teacherName} teacherID={subject.teacherID.id} subjectID={subject.pk} />
                    ))}
                                                <div className="center-items m-3"><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Добавить новый урок</button></div>

                </div>

                {/* Modal is here */}

                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <form className="modal-content" onSubmit={this.submitNewSubject}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Изменение предмета</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="p-2 ">
                                    <div className="row">
                                    <div className="input-group mb-3 col-12 m-0 p-0">
                                            <div className="input-group-prepend">
                                                <button type="button" className="btn btn-outline-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Имя предмета &nbsp;
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Математика')}>Математика</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Русский-яз.')}>Русский-яз.</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Английский-яз.')}>Английский-яз.</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('История')}>История</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('География')}>География</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Биология')}>Биология</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Информатика')}>Информатика</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Обществознание')}>Обществознание</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Алгебра')}>Алгебра</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Геометрия')}>Геометрия</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Физика')}>Физика</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Химия')}>Химия</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Черчение')}>Черчение</a>
                                                
                                                </div>
                                            </div>
                                            <input type="text" id="subjectInput" name="subject" onChange={e => this.setState({subjectName: e.target.value})} className="form-control" value={this.state.chosenSubject} required/>
                                            </div>

                                        <div className="input-group col-12 m-0 p-0 mt-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" for="inputGroupSelect01">Учитель</label>
                                            </div>
                                            <div className="dropdown form-control center-items p-0" id="inputGroupSelect01">
                                                <button className="btn dropdown-toggle w-100"
                                                        type="button" id="teacherButton" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">{this.state.chosenTeacherName}</button>
                                                <input type="hidden" id="teacherID" name="teacherID" value={this.state.chosenTeacherID}/>
                                                <div id="myDropdown" className="dropdown-menu" aria-labelledby="teacherButton">
                                                    <div className="p-1 input-group">
                                                    <div className="input-group-prepend ">
                                                    <label className="input-group-text" for="inputGroupSelect01"><i className="fa fa-search"></i></label>
                                                    
                                            </div>
                                                <input type="text" className="form-control" placeholder="Искать..." id="myInput" onKeyUp={()=>this.filterFunction()}/></div>

                                                    {this.state.teachers.map(teacher=>(
                                                        <a className="dropdown-item teacherselect" onClick={()=>this.changeTeacherValue(teacher.teacherName,teacher.pk)} >{teacher.teacherName}</a>
                                                    ))}
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="submit" className="btn btn-primary">Добавить урок</button>
                            </div>
                        </form>
                    </div>
                </div>
            
            
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <form className="modal-content" onSubmit={this.submitNewSubject}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Создание нового предмета</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="p-2 ">
                                    <div className="row">
                                    <div className="input-group mb-3 col-12 m-0 p-0">
                                            <div className="input-group-prepend">
                                                <button type="button" className="btn btn-outline-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Имя предмета &nbsp;
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Математика')}>Математика</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Русский-яз.')}>Русский-яз.</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Английский-яз.')}>Английский-яз.</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('История')}>История</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('География')}>География</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Биология')}>Биология</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Информатика')}>Информатика</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Обществознание')}>Обществознание</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Алгебра')}>Алгебра</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Геометрия')}>Геометрия</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Физика')}>Физика</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Химия')}>Химия</a>
                                                    <a className="dropdown-item" onClick={()=>this.changesubjectValue('Черчение')}>Черчение</a>
                                                
                                                </div>
                                            </div>
                                            <input type="text" id="subjectInput" name="subject" onChange={e => this.setState({subjectName: e.target.value})} className="form-control" required/>
                                            </div>

                                        <div className="input-group col-12 m-0 p-0 mt-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" for="inputGroupSelect01">Учитель</label>
                                            </div>
                                            <div className="dropdown form-control center-items p-0" id="inputGroupSelect01">
                                                <button className="btn dropdown-toggle w-100"
                                                        type="button" id="teacherButton" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">Выберите учителя</button>
                                                <input type="hidden" id="teacherID" name="teacherID" value=""/>
                                                <div id="myDropdown" className="dropdown-menu" aria-labelledby="teacherButton">
                                                    <div className="p-1 input-group">
                                                    <div className="input-group-prepend ">
                                                    <label className="input-group-text" for="inputGroupSelect01"><i className="fa fa-search"></i></label>
                                                    
                                            </div>
                                                <input type="text" className="form-control" placeholder="Искать..." id="myInput" onKeyUp={()=>this.filterFunction()}/></div>

                                                    {this.state.teachers.map(teacher=>(
                                                        <a className="dropdown-item teacherselect" onClick={()=>this.changeTeacherValue(teacher.teacherName,teacher.pk)} >{teacher.teacherName}</a>
                                                    ))}
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                                <button type="submit" className="btn btn-primary">Добавить урок</button>
                            </div>
                        </form>
                    </div>
                </div>
            
            </div>
        )
    }
}

class OneSubject extends Component {

    deleteSubject(id,subjectname){
        if (window.confirm("Вы уверены что хотите удалить предмет: " + subjectname + "?")){
            axios.delete(requestUrl + `/api/v1/subjects/?pk=${id}`,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
            }).then(res => {
                const data = res.data;
            })
            .catch(err =>{
                console.log(err.error);
            });
        }
        
    }

    render() {
        return(
            <div className="card p-2">
                <div className="row">
                    <div className="col-4 text-center center-items" >{this.props.subjectName}</div>
                    <div className="col-6 center-items">{this.props.teacherName}</div> 
                    <div className="col-1 text-left center-items">
                        <div className="btn btn-primary m-1 p-1" onClick={()=>this.changeSubject(this.props.subjectID,this.props.subjectName,this.props.teacherID,this.props.teacherName,)} ><i className="fa fa-pencil"></i></div>
                        <div className="btn btn-danger m-1 p-1" onClick={()=>this.deleteSubject(this.props.subjectID,this.props.subjectName)} ><i className="fa fa-trash"></i></div>
                    </div>
                </div>
            </div>
        )
    }
}
