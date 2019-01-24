import React, { Component } from 'react';
import './App.css';
import NewEmployee from '../new-employee/NewEmployee';
import NewProject from '../new-project/NewProject';
import Project from '../project/Project';
import AllEmployees from '../all-employees/AllEmployees';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showNewProjectModal: false,
            showNewEmployeeModal: false,
            showAllEmployeesModal: false,
            employees: [
                //first employee
                {
                    id: 1,
                    name: "Sergio",
                    lastname: "Herrero",
                    supervisor: {
                        id: 1,
                        name: "John",
                        lastname: "Smith"
                    },
                    assigned: 1,
                }
            ],
            projects: [
                {
                    id: 1,
                    projectname: "Coding Challende",
                    date: "2018-02-12",
                    slack: 5,
                    tasks: [
                        {
                            id: 1,
                            taskname: "Boiler plate",
                            description: "Doing the set-up on the project so I can start coding",
                            time: 3,
                            assigned: {
                                id: 1,
                                name: "Sergio",
                                lastname: "Herrero"
                            }
                        }
                    ],
                    totalNumOfDays: 8
                }
            ]
        }

        this.submitEmployeeFormToApp = this.submitEmployeeFormToApp.bind(this)
        this.submitProjectFormToApp = this.submitProjectFormToApp.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.submitTaskFormToApp = this.submitTaskFormToApp.bind(this)
        this.deleteProject = this.deleteProject.bind(this)
        this.editExistingTaskTime = this.editExistingTaskTime.bind(this)
        this.hideAllModals = this.hideAllModals.bind(this)
        this.toggleShowNewProjectModal = this.toggleShowNewProjectModal.bind(this)
        this.toggleShowNewEmployeeModal = this.toggleShowNewEmployeeModal.bind(this)
        this.toggleShowAllEmployeesModal = this.toggleShowAllEmployeesModal.bind(this)
    }

    submitEmployeeFormToApp(newEmployeeData) {

        var employeesClone = this.state.employees

        // Adding new employee to the list
        employeesClone.push(newEmployeeData)

        this.hideAllModals()
        this.setState({ employees: employeesClone })
    }

    submitProjectFormToApp(newProjectData) {

        var projectsClone = this.state.projects

        // Adding new project to the list
        projectsClone.push(newProjectData)

        this.hideAllModals()
        this.setState({ projects: projectsClone })
    }

    deleteTask(projectId, taskId) {

        var projectsClone = this.state.projects

        projectsClone.map(item => {
            if (item.id === projectId) {
                for (var i = 0; i < item.tasks.length; i++) {
                    if (item.tasks[i].id === taskId) {

                        var employeesClone = this.state.employees

                        // removing one task from employee counter
                        for (var j = 0; j < employeesClone.length; j++) {
                            if (employeesClone[j].id === item.tasks[i].assigned.id) {
                                employeesClone[j].assigned --
                            }
                        }

                        item.totalNumOfDays -= item.tasks[i].time
                        item.tasks.splice(i, 1)

                        this.setState({
                            projects: projectsClone,
                            employees: employeesClone
                        })
                    }
                }
            }
        })
    }

    submitTaskFormToApp(projectId, task) {

        var employeesClone = this.state.employees

        for (var i = 0; i < employeesClone.length; i++) {
            if (employeesClone[i].id === task.assigned.id) {
                employeesClone[i].assigned ++
            }
        }

        var projectsClone = this.state.projects

        projectsClone.map(item => {
            if (item.id === projectId) {

                var totalNumOfDays =  item.totalNumOfDays + task.time

                item.totalNumOfDays = totalNumOfDays
                item.tasks.push(task)
            }
        })

        this.setState({
            project: projectsClone,
            employees: employeesClone
        })

    }

    deleteProject(project) {
        console.log("deleteProject: ", project);

        var employeesClone = this.state.employees
        var projectsClone = this.state.projects

        projectsClone.forEach((item, index) => {

            console.log("for each, item: ", item);
            if (item.id === project.id) {

                console.log("project id matched");
                for (var i = 0; i < item.tasks.length; i++) {
                    // this.deleteTask(project.id, item.tasks[i])

                    for (var j = 0; j < employeesClone.length; j++) {

                        if (employeesClone[j].id = item.tasks[i].assigned.id) {
                            console.log("employee id found on tasks list");
                            console.log("employee counter down from: ", employeesClone[j].assigned, " to: ", (employeesClone[j].assigned - 1));
                            employeesClone[j].assigned = (employeesClone[j].assigned - 1)
                        }
                    }
                }

                projectsClone.splice(index, 1)
            }
        })

        this.setState({
            projects: projectsClone,
            employees: employeesClone
        }, () => console.log("state set"))
    }

    SumAllProjectsDays() {

        var total = 0
        var projectsClone = this.state.projects

        for (var i = 0; i < projectsClone.length; i++) {
            total += projectsClone[i].totalNumOfDays
        }

        return total
    }

    editExistingTaskTime(project, taskId, newTime) {

        var projectsClone = this.state.projects

        projectsClone.forEach(item => {

            if (item.id === project.id) {

                for (var i = 0; i < item.tasks.length; i++) {

                    if (item.tasks[i].id === taskId) {

                        item.totalNumOfDays = item.totalNumOfDays - item.tasks[i].time + newTime
                        item.tasks[i].time = newTime
                    }
                }
            }
        })

        this.setState({ projects: projectsClone })
    }

    hideAllModals() {
        this.setState({
            showNewProjectModal: false,
            showNewEmployeeModal: false,
            showAllEmployeesModal: false
        })
    }
    toggleShowNewEmployeeModal() {
        if (this.state.showNewEmployeeModal) {
            this.hideAllModals()
        } else {
            console.log("turning on new project modal");
            this.setState({
                showNewProjectModal: false,
                showNewEmployeeModal: true,
                showAllEmployeesModal: false
            })
        }
    }
    toggleShowAllEmployeesModal() {
        if (this.state.showAllEmployeesModal) {
            this.hideAllModals()
        } else {
            this.setState({
                showNewProjectModal: false,
                showNewEmployeeModal: false,
                showAllEmployeesModal: true
            })
        }
    }

    toggleShowNewProjectModal() {
        if (this.state.showNewProjectModal) {
            this.hideAllModals()
        } else {
            this.setState({
                showNewProjectModal: true,
                showNewEmployeeModal: false,
                showAllEmployeesModal: false
            })
        }
    }

    render() {
        console.log("this.state: ", this.state);
        return (
            <div className="App">
                { (this.state.showNewEmployeeModal || this.state.showNewProjectModal || this.state.showAllEmployeesModal) &&
                    <div id="dim-background"></div>
                }

                <nav>
                    <h1>Project Dashboard</h1>
                    <div>
                        <button
                        className="circle green"
                        onClick={() => this.toggleShowNewProjectModal()}
                        >
                            <i className="fas fa-project-diagram"></i>
                        </button>
                        <button
                        className="circle yellow"
                        onClick={() => this.toggleShowNewEmployeeModal()}
                        >
                            <i className="fas fa-male"></i>
                        </button>
                        <button
                        className="circle purple"
                        onClick={() => this.toggleShowAllEmployeesModal()}
                        >
                            <i className="fas fa-users"></i>
                        </button>
                    </div>
                </nav>

                <div id="modals-wrapper">

                    { this.state.showNewEmployeeModal &&
                        <NewEmployee
                        submitEmployeeFormToApp={this.submitEmployeeFormToApp}
                        employees={this.state.employees}
                        />
                    }
                    { this.state.showNewProjectModal &&
                        <NewProject
                        submitProjectFormToApp={this.submitProjectFormToApp}
                        projects={this.state.projects}
                        />
                    }
                    { this.state.showAllEmployeesModal &&
                        <AllEmployees employees={this.state.employees} />
                    }
                </div>

                {
                    (this.state.projects && this.state.projects.length > 0) ?
                    this.state.projects.map(item => {
                        return (
                            <Project
                            key={item.id}
                            project={item}
                            deleteTask={this.deleteTask}
                            employees={this.state.employees}
                            submitTaskFormToApp={this.submitTaskFormToApp}
                            deleteProject={this.deleteProject}
                            editExistingTaskTime={this.editExistingTaskTime}
                            />
                    )}) :
                    "No projects have been added yet. Please add a new project"

                }

                <div className="purple" id="total-days">{`Total time: ${this.SumAllProjectsDays()} days`}</div>

            </div>
        );
    }
}

export default App;
