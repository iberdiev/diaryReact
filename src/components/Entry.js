import React from 'react';
import axios from 'axios';
// import {Button} from 'react-bootstrap';
import { Container } from 'reactstrap';
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoginDisabled: false,
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
        axios.post('http://192.168.0.55:8080/api/v1/login/', {"username": this.state.username, "password":this.state.password})
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_role', res.data.user_role);
                window.location.reload();

            }).catch(err => {
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
                <div className="container d-flex justify-content-center mt-3">
                    <div className="login-form col-lg-6 col-12  p-1">
                        <div className="alert alert-success" role="alert">
                        Добро пожаловать в онлайн дневник!
                        </div>
                        <div className="card p-3">
                        <form onSubmit={this.onSubmit}>
                            <h2 className="text-center">Вход</h2>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Логин" required="required" onChange={e => this.setState({username: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Пароль" required="required" onChange={e => this.setState({password: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <button type='submit' className="btn btn-primary btn-block" disabled={this.state.isLoginDisabled} >{this.state.isLoginDisabled ? 'Подождите...' : 'Войти'}</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <Container>

                </Container>
            </div>
        )
    }
}

export default Login;
