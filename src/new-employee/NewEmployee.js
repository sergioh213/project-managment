import React, { Component } from 'react';
import './NewEmployee.css';

class NewEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
    }

    handleChange(e) {

        this.setState({
            [ e.target.name ]: e.target.value
        })
    }

    handleSelectChange(e) {
        if (e.target.options[e.target.selectedIndex].value !== "default") {

            var existingEmployees = this.props.employees

            existingEmployees.map(item => {

                if (item.id === parseInt(e.target.options[e.target.selectedIndex].value, 10)) {

                    // removing supervisor from the selected supervisor's object
                    var selectedSupervisor = {
                        id: item.id,
                        name: item.name,
                        lastname: item.lastname
                    }

                    this.setState({
                        supervisor: selectedSupervisor
                    })
                }

            })
        }
    }

    handlesubmit(e) {
        e.preventDefault()

        if (!this.state.supervisor || !this.state.name || !this.state.lastname) {
            this.setState({
                message: "Fill in all the field"
            })
        } else {
            var newEmployee = this.state
            newEmployee.id = this.findNextAvailableUniqueEmployeeId(this.props.employees)
            newEmployee.assigned = 0

            this.props.submitEmployeeFormToApp(newEmployee)
        }

    }

    findNextAvailableUniqueEmployeeId(employees) {

        var potentialId = 1
        if (employees) {
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].id === potentialId) {
                    potentialId++
                }
            }
        }
        return potentialId
    }

    render() {
        return (
            <div className="main">

                <div className="triangle-wrapper">
                    <div className="triangle" id="employee-triangle"></div>
                </div>

                <div id="modal">

                    <h2 id="new-employee">New employee</h2>

                    { this.state.message && <p>{this.state.message}</p> }

                    <form
                    onSubmit={(e) => this.handlesubmit(e)}
                    id="new-employee-form"
                    >

                        <input
                        className="new-employee-input"
                        onChange={(e) => this.handleChange(e)}
                        name="name"
                        placeholder="First name"
                        />

                        <input
                        className="new-employee-input"
                        onChange={(e) => this.handleChange(e)}
                        name="lastname"
                        placeholder="Last name"
                        />

                        <select name="supervisors" onChange={ this.handleSelectChange }>
                            <option value="default">Choose a supervisor</option>
                            { this.props.employees ?
                                this.props.employees.map(item => {
                                    return (
                                        <option key={item.id} value={ item.id }>{ item.name }</option>
                                    )
                                }) :
                                <option value="default">No employees to choose from</option>
                            }
                        </select>

                        <div id="create-employee-button-wrapper">
                            <button id="create-employee-button">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewEmployee;
