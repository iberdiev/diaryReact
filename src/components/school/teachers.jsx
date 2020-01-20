import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class OneTeacher extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.number}</td>
                <td><Link to ={{pathname:"/school/teacher_profile/", state:{teacherID:this.props.pk}}}>{this.props.name}</Link></td>
                <td><Link to ={{pathname:"/school/teacher_profile/", state:{teacherID:this.props.pk}}} ><span className="star"><i className="fa fa-star" aria-hidden="true"></i>{this.props.overall}</span></Link></td>

            </tr>
        )
    }
}

export default class Shool_Teachers extends Component {
    constructor(props){
        super(props);
        this.state = {
            teachers: [],
        }
        this.token = localStorage.getItem('token');
    }
    componentDidMount = () =>{

        axios.get('http://192.168.0.55:8080/api/v1/teachers/',{
            headers:{
                Authorization:'Token ' + this.token,
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
    addNewTeacher(){
        var data = { "name": this.state.name, "username": this.state.username, "user_role": 2, "password1": "qwe1r", "password2":"qwers"}
        axios.post('http://192.168.0.55:8080/api/v1/registration/',data,{
            headers:{
                Authorization:'Token ' + this.token,
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
    render() {
        const {teachers} = this.state
        return(
            <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-6 col-12  p-1 ">
            <h6 className="text-center mb-2">
                Учителя Школы {localStorage.getItem('school')}
            </h6>
            <div className="card p-3">
                <div className="text-center m-3">

                    {/* Вызов Модального окна */}
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable"><i className="fa fa-plus-circle" aria-hidden="true"></i> Добавить нового учителья</button>
                    <div className="modal" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenteredLabel">Добавление нового учителя</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form className="form-signin" onSubmit={()=>this.addNewTeacher()}>

                                
                                <div class="mb-4 text-left">
                                    <label for="name">ФИО учителя</label>
                                    <input type="text" className="form-control" id="name" placeholder="Например: Жанетта Октямжонавна" required="" onChange={e => this.setState({name: e.target.value})} />
                                </div>
                                <div class="mb-4 text-left">
                                    <label for="phone">Номер телефона</label>
                                    <input type="text" className="form-control" id="phone" placeholder="Например: 0777123456" required="" onChange={e => this.setState({username: e.target.value})}/>
                                </div>
                                <div class="mb-4 text-left">
                                    <label for="name">Пароль</label>
                                    <input type="password" className="form-control" id="password" placeholder="Придумайте пароль" required="" onChange={e => this.setState({password: e.target.value})}/>
                                </div>
                                <div class="mb-4 text-left">
                                    <label for="name">Подтвердите пароль</label>
                                    <input type="password" className="form-control" id="password" placeholder="Подтвердите пароль" required="" onChange={e => this.setState({password2: e.target.value})}/>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block" type="submit"><i className="fa fa-plus-circle" aria-hidden="true"></i> Добавить</button>
                            </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <table id="table_id" className="table table-striped table-bordered display" style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Рейтинг</th>

                        </tr>
                    </thead>
                    <tbody>
                    {teachers.map((teacher, i) => (
                        <OneTeacher number={i+1} name={teacher.teacherName} pk={teacher.pk} overall="4.5"/>
                    ))}


                    </tbody>
                </table>
            </div>


        </div>
    </div>
        )
    }
}
