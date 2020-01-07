import React from 'react';
import axios from 'axios';
// import {Button} from 'react-bootstrap';
import {Button, Container, Row, Col, Input} from 'reactstrap';
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoginDisabled: false,
        };
        this.error = false;

    }
    // {"username":"admin", "password":"admin"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:8080/api/v1/login/

    onSubmit = event =>{
        event.preventDefault();
        this.setState({ isLoginDisabled: true, })
        localStorage.setItem('school', this.state.username);
        axios.post('http://192.168.0.55:8080/api/v1/login/', {"username": this.state.username, "password":this.state.password})
            .then(res => {
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
    // <Container>
    //   <Row>
    //     <Col sm={8}>sm=8</Col>
    //     <Col sm={4}>sm=4</Col>
    //   </Row>
    //   <Row>
    //     <Col sm>sm=true</Col>
    //     <Col sm>sm=true</Col>
    //     <Col sm>sm=true</Col>
    //   </Row>
    // </Container>
    render(){
        return(
            <div>
                <Container>
                    <Row>

                        <Col>
                            <h1>Вход</h1>
                            <form onSubmit={this.onSubmit}>
                                <Input type='text' onChange={e => this.setState({username: e.target.value})} placeholder="Логин"/><br/>
                                <Input type='password' onChange={e => this.setState({password: e.target.value})} placeholder="Пароль"/><br/>
                                <Button block color="primary" size="lg" disabled={this.state.isLoginDisabled} type='submit'>{this.state.isLoginDisabled ? 'Подождите...' : 'Войти'}
                                </Button>
                                {this.wrongCredentials()}
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Login;
