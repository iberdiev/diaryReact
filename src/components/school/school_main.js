import React, {  Component } from 'react'
import axios from 'axios';
import Popup from './class_create_popup';
import OneCohort from './oneCohortListItem';
import {Button, Collapse, Card, CardBody, Table } from 'reactstrap';


// import { Link } from 'react-router-dom';

export default class SchoolMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            // NEED CHANGE
            // isLoaded: false,
            isLoaded: true,
            
            data : [],
            showPopup: true,
        };

        this.token = localStorage.getItem('token');
    }
    // logout = event => {
    //     event.preventDefault();
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user_role');
    //     window.location.reload();
    // }
    componentDidMount = () =>{

        axios.get('http://192.168.0.55:8080/api/v1/get_cohorts/',{
            headers:{
                Authorization:'Token ' + this.token,
            }
        }).then(res => {
            const data = res.data;
            this.setState({
                isLoaded: true,
                data: data,
            })
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }
    render() {
        const {isLoaded, data} = this.state
        if (!isLoaded){
            return(
                <div>
                    <h1> Подождите, идет загрузка классов </h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Школа</h1>
                    <Button block color="primary" size="lg" onClick={this.togglePopup.bind(this)}>{this.state.showPopup ? 'Скрыть': 'Создать класс'}
                    </Button>
                    <Collapse isOpen={this.state.showPopup}>
                        <Card>
                          <CardBody>
                                <Popup/>
                          </CardBody>
                        </Card>
                    </Collapse>
                    <br />

                    {data.map(cohort => (
                        <Table><tbody>
                            <OneCohort key={cohort.pk} class_name={cohort.class_name} pk={cohort.pk} />
                        </tbody></Table>

                    ))}

                    <div className="container d-flex justify-content-center mt-5">
                            <div className="login-form col-lg-6 col-10  p-1">
                                <div className="alert alert-success" role="alert">
                                    Здравствуйте <strong>Школа № 34</strong> <br/> Вы успешно вошли в систему Дневник
                                </div>
                                <a href="classes.html" >
                                <div className="card">
                                <div className="">
                                    <div className="row ">
                                        <div className="col-8">
                                            <h5 className="p-2">Классы</h5>
                                            <p className="p-2">Ученики <br/> Расписание<br/> Предметы</p>
                                        </div>
                                        <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-address-book" aria-hidden="true"></i></h1></div>
                                    
                                    </div>
                                    
                                </div>
                                </div>
                                </a>

                                <a href="teachers.html" >
                                <div className="card mt-3">
                                    <div className="">
                                        <div className="row ">
                                            <div className="col-8">
                                                <h5 className="p-2">Учителя</h5>
                                                <p className="p-2">Список <br/> Рейтинг</p>
                                            </div>
                                            <div className="col-4 center-items"><h1 className="card-title"><i className="fa fa-users" aria-hidden="true"></i></h1></div>
                                        
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                </a>
                            </div>
                        </div>
                </div>
            )
        }

    }
}
// <h3 key={cohort.pk}> {cohort.class_name}</h3>
