import React, { Component } from 'react';
import './AllEmployees.css';

class AllEmployees extends Component {
    render() {
        return (
            <div className="main">
                <div className="triangle-wrapper">
                    <div className="triangle" id="all-employees-triangle"></div>
                </div>
                <div id="modal">
                    <div>
                        <h2 id="employee-list">Employees</h2>
                        {
                            (this.props.employees && this.props.employees.length > 0) ?
                            this.props.employees.map(item => {
                                return (
                                    <div key={item.id} className="employee-card">
                                        <div className="employee-info-box">
                                            <div className="profile-pic">
                                                <i className="fas fa-user"></i>
                                            </div>
                                            <div className="employee-name">
                                                {`${item.name} ${item.lastname}`}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="supervisor-sign">Supervisor: </div>
                                            <div className="supervisor-name">{`${item.supervisor.name} ${item.supervisor.lastname}`}</div>
                                        </div>
                                    </div>
                            )}) :
                            "please create new employees"

                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default AllEmployees;
