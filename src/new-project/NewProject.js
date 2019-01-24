import React, { Component } from 'react';
import './NewProject.css';

class NewProject extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
    }

    handleChange(e) {

        if (e.target.name === "slack") {
            this.setState({
                [ e.target.name ]: parseInt(e.target.value, 10)
            })
        } else {
            this.setState({
                [ e.target.name ]: e.target.value
            })
        }

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

        if (!this.state.date || !this.state.projectname || !this.state.slack) {
            this.setState({
                message: "Fill in all the field"
            })
        } else {
            var newProject = this.state
            newProject.id = this.findNextAvailableUniqueProjectId(this.props.projects)
            newProject.totalNumOfDays = this.state.slack
            newProject.tasks = []

            this.props.submitProjectFormToApp(newProject)
        }

    }

    findNextAvailableUniqueProjectId(projects) {

        var potentialId = 1
        if (projects) {
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].id === potentialId) {
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
                    <div className="triangle" id="project-triangle"></div>
                </div>
                <div id="modal">

                    <h2 id="new-project">New Project</h2>

                    { this.state.message && <p>{this.state.message}</p> }

                    <form
                    onSubmit={(e) => this.handlesubmit(e)}
                    id="new-employee-form"
                    >

                        <input
                        className="new-project-input"
                        onChange={(e) => this.handleChange(e)}
                        name="projectname"
                        placeholder="Project name"
                        />

                        <input
                        className="new-project-input"
                        onChange={(e) => this.handleChange(e)}
                        name="date"
                        type="date"
                        />

                        <div>
                            <input
                            id="slack-input"
                            onChange={(e) => this.handleChange(e)}
                            name="slack"
                            type="number"
                            min="1"
                            placeholder="Slack days"
                            />
                        </div>
                        <button id="create-project-button">Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewProject;
