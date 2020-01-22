import React, {  Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net/js/jquery.dataTables.min.js'
import 'datatables.net-dt/css/jquery.dataTables.min.css'


class OneStudent extends Component {
    render() {
        return(
            <tr >
                <td className="p-3">{this.props.number}</td>
                
                <td className="p-3"><Link to={{pathname: '/teacher/student_profile/', state: { studentName: this.props.name, pk: this.props.pk, cohortID: this.props.cohortID}}}>{this.props.name}</Link></td>
            </tr>
        )
    }
}

export default class School_student_list extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
        };
        this.token = localStorage.getItem('token');
    }
    componentDidMount = () =>{

        $(document).ready(function() {
            var table = $('#table_id').DataTable( {
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": true,
                "bInfo": false,
                "bAutoWidth": false,
                language:{
                    "decimal":        "",
                    "emptyTable":     "Нет данных",
                    "info":           "Showing _START_ to _END_ of _TOTAL_ entries",
                    "infoEmpty":      "Showing 0 to 0 of 0 entries",
                    "infoFiltered":   "(filtered from _MAX_ total entries)",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "Show _MENU_ entries",
                    "loadingRecords": "Loading...",
                    "processing":     "Processing...",
                    "search":         "Искать: ",
                    "zeroRecords":    "No matching records found",
                    "paginate": {
                        "first":      "First",
                        "last":       "Last",
                        "next":       "Next",
                        "previous":   "Previous"
                    },
                    "aria": {
                        "sortAscending":  ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    }
                }
                        } );
                    } );
        

        const url = "http://192.168.0.55:8080/api/v1/students/?cohort=" + this.props.location.state.cohortID;

        axios.get(url,{
            headers:{
                Authorization:'Token ' + localStorage.getItem('token'),
            }
        }).then(res => {
            const data = res.data;

            this.setState({
                isLoaded: true,
                data: data,
            });
            // localStorage.removeItem('className')
        })
        .catch(err =>{
            console.log(err.error);
        });
    }
    render() {
        const {data} = this.state;
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    {!this.state.isLoaded ?
                        <div>
                            <div className="preloader center-items">
                            <div className="lds-dual-ring"></div>
                        </div>
                    </div> : ""}
                    <h6 className="text-center m-2">
                        Ученики {this.props.location.state.className}
                    </h6>
                    <div className="card p-3">
                    <table id="table_id" className="table table-striped table-bordered display" style={{width:'100%'}}>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>ФИО</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, i) => (
                                <OneStudent number={i+1} name={student.studentName} pk={student.pk} cohortID={this.props.location.state.cohortID} />
                            ))}


                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
    }
}
