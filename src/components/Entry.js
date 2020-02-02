import React from 'react';
import axios from 'axios';
import {requestUrl} from './requests';
import { Link } from 'react-router-dom';

// import {Button} from 'react-bootstrap';
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoginDisabled: false,
            isValid: true,
        };
        this.error = false;

        // NEED CHANGE
        // localStorage.setItem('token', "12340239530823045");
        // localStorage.setItem('user_role', 1);

    }
    // {"username":"admin", "password":"admin"}' -H "Content-Type: application/json" -X POST http://192.168.0.55:8080/api/v1/login/

    onSubmit = event =>{
        event.preventDefault();
        this.setState({ isLoginDisabled: true, })
        localStorage.setItem('school', this.state.username);
        console.log(requestUrl)
        axios.post(requestUrl + '/api/v1/login/', {"username": this.state.username, "password":this.state.password},
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
                window.location.reload();

            }).catch(err => {
                console.log(err)
                this.error = true;
                this.setState({isLoginDisabled: false,});
                this.forceUpdate();
            });
    }

    wrongCredentials = () => {
        if (this.error){
            return (
                <div>
                    <h3>Неверные данные.</h3>
                    <h4>Попробуйте ввести снова.</h4>
                </div>
            )
        }
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

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Логин" required="required" onChange={e => this.setState({username: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Пароль" required="required" onChange={e => this.setState({password: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <button type='submit' className="btn btn-primary btn-block" disabled={this.state.isLoginDisabled} >{this.state.isLoginDisabled ? 'Подождите...' : 'Войти'}</button>
                            </div>

                            <div className="text-center"><Link style={{color:'blue'}} href="#">Забыли пароль?</Link> </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
