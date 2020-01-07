import React from 'react'
import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import Accordion from 'react-bootstrap/Accordion';
export default class OneCohort extends React.Component {
    // showStudents(){
    //     console.log('asdf');
    // }

    render() {
        const { class_name, pk } = this.props;
        const students = '/students/'+ this.props.pk+'/';
        const subjects = '/subjects/' + this.props.pk+'/';
        return (
            <div className="list1">

                    <tr>
                        <h4 key={pk}><td>{class_name} </td>
                                     <td><Link to={{pathname: students, state: {className: class_name, cohort: pk }}} >Ученики</Link></td>
                                     <td><Link to={{pathname: subjects, state: {className: class_name, cohort: pk } }} > Предметы</Link></td>
                        </h4>
                    </tr>
            

            </div>
        );
      }
    }

// {this.wrongCredentials()}
// <button disabled={this.state.isLoginDisabled} type='submit'>{this.state.isLoginDisabled ? 'Loging...' : 'Log in'}</button>
// <h4> {pub_date.slice(8, 10) + '/' +  pub_date.slice(5, 7)+ '/'+pub_date.slice(0, 4)+ ' ' +pub_date.slice(11, 19)}</h4>
// &nbsp;
