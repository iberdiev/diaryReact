import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Shool_Teachers extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <h6 className="text-center">
                        Предметы 10-А класса
                    </h6>
                    <div className="pl-3 pr-3 mt-2 mb-1">
                        <div className="row"><div className="col-4  text-center btn-link" ><h6>Предметы</h6></div><div className="col-8 text-center btn-link"><h6>Преподователи</h6></div></div>
                    </div>
                    <div className="card p-2 ">
                        <div className="row"><div className="col-4 ml-1 text-center" >Алгебра</div><div className="col-7 text-center">Татьяна Александровна</div></div>
                    </div>
                    <div className="card p-2 ">
                        <div className="row"><div className="col-4 ml-1 text-center" >Алгебра</div><div className="col-7 text-center">Татьяна Александровна</div></div>
                    </div>
                </div>
            </div>
        )
    }
}
