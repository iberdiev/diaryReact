import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Teacher_Choose_Subject extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="container d-flex justify-content-center mt-2">
                <div className="login-form col-lg-6 col-10  p-1">
                    
                    <h6 className="m-2 text-center">
                        
                    </h6>
                    <div className="alert alert-primary m-1 mb-3" role="alert">
                        <h6 className="m-2 text-center">
                            Выберите предмет
                        </h6>
                    </div>
                    <Link to="/teacher/journal">
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Русский</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/teacher/journal" >
                        <div className="card m-1">
                            <div className="p-3 text-center">
                                <p>Кыргызский</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
