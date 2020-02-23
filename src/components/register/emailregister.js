import React from 'react';
import axios from 'axios';
import {requestUrl} from '../requests';
import { Link,Redirect,Route  } from 'react-router-dom';



// import {Button} from 'react-bootstrap';
class EmailRegister extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoginDisabled: false,
            isValid: true,
            type:1,
        };
        this.error = false;

        // NEED CHANGE
        // localStorage.setItem('token', "12340239530823045");
        // localStorage.setItem('user_role', 1);

    }
    // {"username":"admin", "password":"admin"}' -H "Content-Type: application/json" -X POST http://192.168.0.55:8080/api/v1/login/

    onSubmit = event =>{
        event.preventDefault();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if user is emails
        if (re.test(this.state.username)){
            this.setState({ type: 0});
        };
        this.setState({
            isValid:true
        })
        this.setState({ isLoginDisabled: true, })
        localStorage.setItem('school', this.state.username);
        console.log(requestUrl);
        axios.get(requestUrl + '/api/v1/forgotThePassword/?type=0&info='+this.state.username)
        .then(res => {

                if (res.data==="There is no user with sent email."){
                    this.setState({
                        isValid:false
                    })
                } else {
                    return (
                        this.props.history.push({
                        pathname: '/confirm',
                        state: {username: res.data, userinfo: this.state.username ,type:this.state.type}
                      }));
                    
                }
                
                
                this.setState({isLoginDisabled: false,});
                // localStorage.setItem('token', res.data.token);
                

            }).catch(err => {
                console.log(err)
                this.error = true;
                this.setState({isLoginDisabled: false,});
                this.forceUpdate();
                alert("Проблемы с сервером повторите позже");
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
                            <h2 className="text-center m-2">Регистрация</h2>

                            {!this.state.isValid ? <span className="text-danger mt-2">Нет таких данных в нашей системе. Просим проверить свои ведённые данные или же попросить у школы добавить вашу электронную</span> : ""}

                            <div className="form-group">
                                <label> Укажите ваш адрес электронной почты: </label>
                                <input type="text" className="form-control" placeholder="Пример: example.name@gmail.com" required="required" onChange={e => this.setState({username: e.target.value})} />
                            </div>
                            
                            <div className="form-group">
                                <button type='submit' className="btn btn-primary btn-block" disabled={this.state.isLoginDisabled} >{this.state.isLoginDisabled ? 'Подождите...' : 'Подтвердить'}</button>
                            </div>
                            

                            <div className="text-center"><Link to="/register" style={{color:'blue'}} >Регистрация по номеру телеофна</Link> </div>
                            <div className="text-center"><Link to="/" style={{color:'blue'}} >Войти</Link> </div>                        
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmailRegister;
