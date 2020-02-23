import React from 'react';
import axios from 'axios';
import {requestUrl} from '../requests';
import { Link } from 'react-router-dom';


// import {Button} from 'react-bootstrap';
class ForgotConfirm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isValidPassword: true,
            validPIN:true,
            isLoginDisabled: false,
            isValid: true,
            isPIN: true,
            isSuccess:false,

            password:'',
            confirm_password:'',
            
            
            username: this.props.location.state.username,
            type:this.props.location.state.type,
        };
        this.error = false;



    }
    // {"username":"admin", "password":"admin"}' -H "Content-Type: application/json" -X POST http://192.168.0.55:8080/api/v1/login/

    onSubmit = event =>{
        event.preventDefault();
        this.setState({ isLoginDisabled: true});
        if (this.state.password !== this.state.confirm_password){
            this.setState({ isValidPassword: false, isLoginDisabled:false});
        } else{
            
            axios.post(requestUrl + '/api/v1/forgotThePassword/', {"username":this.props.location.state.username, "pin": this.state.PIN, "password": this.state.password},
                {headers: {'Content-Type': 'application/json'}}
            ).then(res => {

                    this.setState({isLoginDisabled: false,});
                    if (res.data=="Неверный код."){
                        this.setState({
                            isLoginDisabled:false,
                            isPIN: true,
                            validPIN: false,
                            isValidPassword: true,
                            
                        })
                        
                    }else{
                        this.setState({
                            isSuccess: true,
                            isValidPassword: true,                        
                        })
                    }
                    // localStorage.setItem('token', res.data.token);
                    

                }).catch(err => {
                    console.log(err)
                    this.error = true;
                    alert("Проблемы с сервером повторите позже")
                });
        }
        
        
    }

    login(){
        this.setState({ isLoginDisabled: true, })
        localStorage.setItem('school', this.state.username);
        console.log(requestUrl)
        axios.post(requestUrl + '/api/v1/login/',{"type": this.state.type, "info":this.props.location.state.userinfo, "password": this.state.password},
            {headers: {'Content-Type': 'application/json'}}
        )
        .then(res => {

                console.log(res.data)
                if (res.data==='notvalid'){
                    this.setState({
                        isValid:false
                    })
                }
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_role', res.data.user_role);
                localStorage.setItem('name',res.data.name);
                if (res.data.user_role === 3){
                    localStorage.setItem('studentIndex', 0);
                }
                window.location.href = "/";

            }).catch(err => {
                console.log(err)
                this.error = true;
                this.setState({isLoginDisabled: false,});
                this.forceUpdate();
                
            });
    }


    render(){
        return(
            <div>
                <div className="container center-items" style={{height:"80vh"}}>
                    <div className="login-form col-lg-6 col-12  p-1">
                        
                        <div className="card p-3">
                        {this.state.isSuccess ? 
                        <div>
                            <div className="alert alert-success text-center" role="alert">
                                <h2>Поздравляем!!! <br/>Вы успешно зарегистрировались в Онлайн - Дневник </h2>
                                <p>Нажмите Продолжить, чтобы войти в систему или Пропустить чтобы перейти на главную страницу</p>
                            </div>
                            <div className="alert alert-default row" role="alert">
                                
                                <button className="btn btn-success btn-block col-5 m-1" disabled={this.state.isLoginDisabled} onClick={()=>this.login()} >{this.state.isLoginDisabled ? 'Подождите...' : 'Продолжить'}</button>
                                <Link className="btn btn-block col-5 m-1" style={{color:'blue'}} to="/"> Пропустить</Link>
                            </div>

                        </div> 
                        : 
                        <div>
                            {this.state.isPIN ? 
                                // This is for confirming PIN
                                
                                <div>
                                    <div className="alert alert-success text-center" role="alert">
                                    {this.props.location.state.type ? "Дождитесь, когда на указанный вами номер поступит автоматический звонок. Введите последние 4 цифры звонившего номера и нажмите кнопку Подтвердить." : "Дождитесь, когда на указанный вами адрес электронной почты придёт письмо с кодом подтверждения. Введите код подтверждения из письма и нажмите кнопку Подтвердить."}
                                    </div>

                                    {this.state.validPIN ? "" : <div className="text-center"><span className="text-danger mt-2">Неверный PIN (Проверьте, правильно ли вы ввели данные)</span></div>}

                                    <div className="form-group ml-5 mr-5">
                                        <input type="number" className="form-control text-center" placeholder="" autoFocus required="required" onChange={e => this.setState({PIN: e.target.value})} />
                                    </div>
                                    
                                    <div className="form-group ml-5 mr-5">
                                        <button className="btn btn-success btn-block" onClick={e => this.setState({isPIN: false})} >Подтвердить</button>
                                    </div>
                                    

                                </div>
                            : 
                            // This is for for changing password

                            <form onSubmit={this.onSubmit}>
                                <h2 className="text-center m-2">Регистрация</h2>
                                {this.state.isValidPassword ? "" : <div className=""><span className="text-danger mt-2">Пароли не совпадают</span></div>}
                                    <div className="form-group">
                                        <input type="password" value={this.state.password} className="form-control" placeholder="Ваш новый пароль" required="required" onChange={e => this.setState({password: e.target.value})} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" value={this.state.confirm_password} className="form-control" placeholder="Подтверждение нового пароля" required="required" onChange={e => this.setState({confirm_password: e.target.value})} />
                                    </div>
                            
                                    <div className="form-group">
                                        <button type='submit' className="btn btn-primary btn-block" disabled={this.state.isLoginDisabled} >{this.state.isLoginDisabled ? 'Подождите...' : 'Подтвердить'}</button>
                                    </div>

                            </form>
                                    
                            } 
                        </div>
                        }
                        
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotConfirm;
