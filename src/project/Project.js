import React, { Component } from 'react';
import NewTask from '../new-task/NewTask';
import './Project.css';

class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newTaskForm: false,
            deployed: false
        }

        this.toggleShowNewTaskForm = this.toggleShowNewTaskForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.deploy = this.deploy.bind(this)
    }

    componentDidMount() {
        console.log("this.props: ", this.props);
        this.setState({ project: this.props.project })
    }

    static getDerivedStateFromProps(nextProps, state) {

        var employeesClone = nextProps.employees
        var employeesAvailableForTasks = []

        for (var i = 0; i < employeesClone.length; i++) {
            if (employeesClone[i].assigned < 2) {
                employeesAvailableForTasks.push(employeesClone[i])
            }
        }

        return {
            project: nextProps.project,
            employeesAvailableForTasks: employeesAvailableForTasks
        }
    }

    toggleShowNewTaskForm() {

        this.setState({ newTaskForm: !this.state.newTaskForm })

    }

    handleChange(e) {
        this.setState({ edition: parseInt(e.target.value, 10) })
    }

    toggleEditable(taskId) {
        var projectClone = this.state.project

        for (var i = 0; i < projectClone.tasks.length; i++) {
            if (projectClone.tasks[i].id === taskId) {
                projectClone.tasks[i].editable = !projectClone.tasks[i].editable
            }
        }

        this.setState({ project: projectClone })
    }

    saveChanges(taskId) {

        if (this.state.edition) {

            this.toggleEditable(taskId)
            this.props.editExistingTaskTime(this.state.project, taskId, this.state.edition)
        }
    }

    deploy() {
        this.setState({ deployed: !this.state.deployed })
    }

    render() {
        const self = this.state.project
        return (
            <div className="project">

            <div className="project-box">
                <h2>{self.projectname}</h2>
                <div className="right-side-wrapper">
                    <button
                    onClick={() => this.props.deleteProject(self)}
                    className="delete"
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                    onClick={this.deploy}
                    className="arrow-wrapper"
                    >
                        { !this.state.deployed ?
                            <i className="fas fa-chevron-down"></i> :
                            <i className="fas fa-chevron-up"></i>
                        }
                    </button>
                </div>
            </div>

                { this.state.deployed &&

                    <div className="grid">
                        <div className="left-box">
                            <div className="date">{`Started on: ${self.date}`}</div>
                            <div className="deadline">{`Deadline in: ${this.props.project.totalNumOfDays} days`}</div>
                        </div>

                        <div>

                            <div className="tasks-grid">

                                <div className="row">
                                    <div className="box">Name</div>
                                    <div className="box">Description</div>
                                    <div className="box">Person assigned</div>
                                    <div className="box">Duration (days)</div>
                                </div>

                                { this.state.project && this.state.project.tasks.map(item => {
                                    return (
                                        <div className="row" id="dark-purple" key={item.id}>
                                            <div className="box bolded">{item.taskname}</div>
                                            <div className="box">{item.description}</div>
                                            <div className="box">{`${item.assigned.name} ${item.assigned.lastname}`}</div>
                                            { item.editable ?
                                                <div className="time-wrapper">
                                                    <input
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="time"
                                                    type="number"
                                                    min="1"
                                                    placeholder="Task duration (days)"
                                                    />
                                                    <button
                                                    className="edit-task"
                                                    onClick={() => this.saveChanges(item.id)}
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                </div> :
                                                <div className="time-wrapper">
                                                    <div
                                                    className="number-field"
                                                    >{item.time}</div>
                                                    <button
                                                    className="edit-task"
                                                    onClick={() => this.toggleEditable(item.id)}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                </div>
                                            }
                                            <button
                                            className="delete-task"
                                            onClick={() => this.props.deleteTask(self.id, item.id)}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>

                                )})}

                                { this.state.message && <div id="new-task-message">{this.state.message}</div>}

                                { !this.state.newTaskForm ?
                                    <div className="new-row"
                                    onClick={this.toggleShowNewTaskForm}
                                     >
                                        <button onClick={this.toggleShowNewTaskForm}>
                                            <i className="fas fa-angle-right"></i>
                                        </button>
                                        <div className="new-task-sign">New Task</div>
                                    </div> :
                                    <NewTask
                                    submitTaskFormToApp={this.props.submitTaskFormToApp}
                                    employees={this.state.employeesAvailableForTasks}
                                    toggleShowNewTaskForm={this.toggleShowNewTaskForm}
                                    project={self}
                                    submitTaskFormToApp={this.props.submitTaskFormToApp}
                                    />
                                }

                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Project;
