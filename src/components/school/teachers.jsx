import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class One_Teacher extends Component {
    render() {
        return(
            <tr>           
                <td>{this.props.number}</td>
                <td><Link to = "/school/teacher_profile/">{this.props.name}</Link></td>
                <td><Link to = "/school/teacher_profile/"><span className="star"><i className="fa fa-star" aria-hidden="true"></i>{this.props.overall}</span></Link></td>
                
            </tr>
        )
    }
}

export default class Shool_Teachers extends Component {
    constructor(props){
        super(props);

        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-6 col-12  p-1 ">
            <h6 className="text-center mb-2">
                Учителя Школы 
            </h6>
            <div className="card p-3">
                <table id="table_id" className="table table-striped table-bordered display" style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Рейтинг</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                        <One_Teacher number="1" name="Айгерим Артыкова" overall="4.5"/>
                        <One_Teacher number="2" name="Айгерим Артыкова" overall="4.5"/>
                        
                    </tbody>
                </table>
            </div>
            
                     
        </div>
    </div>
        )
    }
}
