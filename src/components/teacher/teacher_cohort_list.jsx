import React, {  Component } from 'react';

export default class Teachers_Cohort_List extends Component {
    constructor(props){
        super(props);
        this.token = localStorage.getItem('token');
    }
    render() {
        return(
            <div className="d-flex justify-content-center mt-2">
                <div className="col-lg-6 col-12  p-1 ">
                    <h6 className="text-center m-2">
                        Ученики 10-А класса
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
                            <tr>

                                <td>1</td>
                                <td><a href="/teacher/student-profile/">Meerbek Akimzhanov</a></td>

                            </tr>
                            <tr>

                                <td>2</td>
                                <td><a href="/teacher/student-profile/">Айгерим Артыкова</a></td>

                            </tr>
                            <tr>

                                <td>3</td>
                                <td><a href="/teacher/student-profile/">Айгерим Артыкова</a></td>

                            </tr>

                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
    }
}
