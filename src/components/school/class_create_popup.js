import React from 'react'
import axios from 'axios';
import {Input, Button} from 'reactstrap';

export default class Popup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoginDisabled: false,
        };
        this.error = false;
    }
    createCohort = event => {
        event.preventDefault();
        const {cohortName} = this.state;
        axios.post('http://192.168.0.55:8080/api/v1/get_cohorts/', {
                class_name: cohortName,
            }, {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('token'),
                }
            }).then(res =>{
                this.props.history.push('/');
            }).catch(err => {
                console.log(err)
        });
        window.location.reload();
    }
    render() {
        return (
          <div className='popup'>
            <div className='popup_inner'>
              <h1>{this.props.text}</h1>
              <form onSubmit={this.createCohort}>
                  <Input placeholder="Введите название класса" type='text' onChange={e => this.setState({cohortName: e.target.value})}/><br/>
                  <Button block color="primary" size="lg" disabled={this.state.isLoginDisabled} type='submit'>{this.state.isLoginDisabled ? 'Создаётся...' : 'Создать'}</Button>

              </form>
            </div>
          </div>
        );
      }
    }

// {this.wrongCredentials()}
// <button disabled={this.state.isLoginDisabled} type='submit'>{this.state.isLoginDisabled ? 'Loging...' : 'Log in'}</button>
