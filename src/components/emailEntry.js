import React from 'react';
import axios from 'axios';
import {requestUrl} from './requests';
import { Link } from 'react-router-dom';

// import {Button} from 'react-bootstrap';
class EmailLogin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoginDisabled: false,
            isValid: true,
            type: 1,
        };
        this.error = false;

        // NEED CHANGE
        // localStorage.setItem('token', "12340239530823045");
        // localStorage.setItem('user_role', 1);

    }
    // {"username":"admin", "password":"admin"}' -H "Content-Type: application/json" -X POST http://192.168.0.55:8080/api/v1/login/

    onSubmit = event =>{
        event.preventDefault();
        this.setState({ isLoginDisabled: true, });

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if user is emails
        if (re.test(this.state.username)){
            this.setState({ type: 0});
        }
        

        localStorage.setItem('school', this.state.username);
        
        axios.post(requestUrl + '/api/v1/login/', {"type": this.state.type,"info": this.state.username, "password":this.state.password},
            {headers: {'Content-Type': 'application/json'}}
        )
        .then(res => {

                console.log(res.data)
                if ((res.data==="There is no such user.") || (res.data==="Wrong password.")){
                    this.setState({
                        isValid:false,
                        isLoginDisabled:false,
                    })
                }else{
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user_role', res.data.user_role);
                    localStorage.setItem('name',res.data.name);
                    if (res.data.user_role === 3){
                        localStorage.setItem('studentIndex', 0);
                    }
                    window.location.reload();
                }
                
                

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
                        <div className="alert alert-success" role="alert">
                        Добро пожаловать в онлайн дневник!
                        </div>
                        <div className="card p-3">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="text-center m-2">Вход</h1>

                            {!this.state.isValid ? <span className="text-danger mt-2">Неправильный логин или пароль</span> : ""}
                            <br/>
                            <label className="mt-3" for="basic-url">Адрес электронный почты</label>
                            <div className="form-group input-group">
                                <input type="text" className="form-control" placeholder="Пример: name.example@gmail.com" autoFocus required="required" onChange={e => this.setState({username: e.target.value})} />
                            </div>
                            <label className="mt-1" for="basic-url">Пароль: </label>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Укажите свой пароль" required="required" onChange={e => this.setState({password: e.target.value})}/>
                            </div>
                            <div className="row">
                            <div className="form-group col-12 col-md-6">
                                <button type='submit' className="btn btn-primary btn-block" disabled={this.state.isLoginDisabled} >{this.state.isLoginDisabled ? 'Подождите...' : 'Войти'}</button>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <Link to="/register" className="btn btn-success btn-block">Регистрация</Link>
                            </div>
                            </div>
                            

                            <div className="text-center"><Link to="/" style={{color:'blue'}} href="#">Вход с помощью номер телефона</Link> </div>
                            <div className="text-center"><Link to="/forgotpassword" style={{color:'blue'}} href="#">Забыли пароль?</Link> </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmailLogin;
