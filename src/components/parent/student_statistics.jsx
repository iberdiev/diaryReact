import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class School_Profile extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    Пока что нет данных
                </div>

            </div>
        )
    }
}
