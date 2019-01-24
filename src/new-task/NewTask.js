import React, { Component } from 'react';
import './NewTask.css';

class NewTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newTaskForm: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {

        if (e.target.name === "time") {
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

                    var assignedEmployee = {
                        id: item.id,
                        name: item.name,
                        lastname: item.lastname
                    }

                    this.setState({
                        assigned: assignedEmployee
                    })
                }

            })
        }
    }

    handleSubmit(e) {
        console.log("handleSubmit");
        e.preventDefault()

        if (!this.state.assigned || !this.state.taskname || !this.state.description || !this.state.time) {
            console.log("inside set message");
            this.setState({ message: "Fill in all the fields" }, () => {
                setTimeout(() => {
                    this.setState({ message: null })
                }, 2000)
            })
        } else {
            console.log("everything in order");
            var newTask = {
                time: this.state.time,
                taskname: this.state.taskname,
                description: this.state.description,
                assigned: this.state.assigned,
                editable: false
            }
            newTask.id = this.findNextAvailableUniqueTaskId(this.props.project.tasks)

            this.props.toggleShowNewTaskForm()
            this.props.submitTaskFormToApp(this.props.project.id, newTask)
        }

    }

    findNextAvailableUniqueTaskId(tasks) {

        var potentialId = 1
        if (tasks) {
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === potentialId) {
                    potentialId++
                }
            }
        }
        return potentialId
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="row" >
                        <input
                        className="row-input"
                        onChange={(e) => this.handleChange(e)}
                        placeholder="Task name"
                        name="taskname"
                        />
                        <input
                        className="row-input"
                        onChange={(e) => this.handleChange(e)}
                        placeholder="Description"
                        name="description"
                        />
                        <select name="assigned" onChange={ this.handleSelectChange }>
                            <option value="default">Assign someone to this task</option>
                            { (this.props.employees && this.props.employees.length > 0) ?
                                this.props.employees.map(item => {
                                    return (
                                        <option key={item.id} value={ item.id }>{ item.name }</option>
                                    )
                                }) :
                                <option value="default">No available employees</option>
                            }
                        </select>
                        <input
                        className="row-input"
                        onChange={(e) => this.handleChange(e)}
                        name="time"
                        type="number"
                        min="1"
                        placeholder="Days"
                        />
                        <div>
                        </div>
                    </div>
                    <div className="buttons-row">

                        <button
                        className="cancel-button"
                        type="button"
                        onClick={this.props.toggleShowNewTaskForm}
                        >Cancel Task</button>

                        { this.state.message &&
                            <div id="new-task-message">{this.state.message}</div>
                        }

                        <button
                        id="add-task"
                        className="green"
                        type="submit"
                        >Add Task</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewTask;
