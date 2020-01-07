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
            isLoaded: false,
            data : [],
            showPopup: false,
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


                </div>
            )
        }

    }
}
// <h3 key={cohort.pk}> {cohort.class_name}</h3>
