import React, { Component } from 'react'
import "../App.css";
import axios from 'axios';
import ReactDOM from "react-dom";

class Evaluator extends Component {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
        this.state = {
            dbMessage: null,
            testData: "",
        }
    }
    setUpDb = () => {
        console.log("setup method called")
        this.setState({ dbMessage: null })
        axios.get("http://localhost:1050/setupDb").then(response => {
            console.log(response);
            this.setState({ dbMessage: response.data })
        }).catch(error => error.response.data.message)
    }

    fetchReport = () => {
        return axios.get("http://localhost:1050/evaluate")
            .then((response) => { console.log(response.data); return response.data })
            .catch(err => { console.log(err); this.setState({ testData: null }); return this.state.testData });
    }

    evaluate = () => {
        console.log("evaluate method called");
        var bootstrap = document.createElement('link')
        bootstrap.rel = "stylesheet"
        bootstrap.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        this.containerEl.innerHTML = '<div class="container"><div class="row text-center"><h2 class="text-success">Please Wait! Loading test results...</h2></div></div>'
        this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
        this.externalWindow.document.head.appendChild(bootstrap)
        this.externalWindow.document.body.appendChild(this.containerEl);
        this.setState({ testData: null });
        return this.fetchReport().then((data) => {
            if(data!=null){
                console.log(data);
                this.setState({ testData: data });
                var tableData = ""
                for(let i =0;i<data.testResult[0].assertionReport.length;i++){
                    if(data.testResult[0].assertionReport[i].status === "passed"){
                        tableData+= '<tbody class="text-success font-weight-bold"><tr><td>'+data.testResult[0].assertionReport[i].testId+'</td><td>'+data.testResult[0].assertionReport[i].testName+'</td><td>'+data.testResult[0].assertionReport[i].status+'</td></tr></tbody>'
                    } else{
                        tableData+= '<tbody class="text-danger font-weight-bold"><tr><td>'+data.testResult[0].assertionReport[i].testId+'</td><td>'+data.testResult[0].assertionReport[i].testName+'</td><td>'+data.testResult[0].assertionReport[i].status+'</td></tr></tbody>'
                    }
                }
                this.containerEl.innerHTML = '<div class="container"><div class="row">Report Generated at: '+new Date().toLocaleTimeString()+'</div><div class="row mt-5"><div class="col-4 text-left text-info"><h4>Total Tests: '+data.testResult[0].totalTests+'</h4></div><div class="col-4 text-center text-success"><h4>Passed: '+data.testResult[0].passed+'</h4></div><div class="col-4 text-right text-danger"><h4>Failed: '+data.testResult[0].failed+'</h4></div></div><div class="row mt-5"><h3>Details:</h3><table class="table table-bordered"><thead class=""><th>ID</th><th>Description</th><th>Status</th></thead>'+tableData+'</table></div></div>';
                this.externalWindow.document.body.appendChild(this.containerEl);
            } else{
                this.containerEl.innerHTML = '<div class="container"><div class="row text-center"><h2 class="text-success">Failed to fetch results please try again!</h2></div></div>'
            }
        })
    }

    render() {
        return (
            <div>
                {/* Message at the top after db setup */}
                {this.state.dbMessage ? (
                    <div className="col-md-5 offset-3">
                        <div className="alert alert-info alert-dismissible" id="alert">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>{this.state.dbMessage}</strong>
                        </div>
                    </div>
                ) : null}

                {/* Displays the button at the bottom right corner */}
                <div className="adminActions">
                    <input type="checkbox" name="adminToggle" className="adminToggle" />
                    <a className="adminButton" href="#!"><img src="assets/test.png" alt="admin button comes here" height="60vw" width="60vw" /></a>
                    <div className="adminButtons">
                        <a title="Setup DB" href="#!" onClick={this.setUpDb}><img src="./assets/db.png" alt="setup button comes here" height="27px" width="30px" /></a>
                    </div>
                </div>
                
                {/* Display the test cases in a new window */}
                {this.state.testData ? ReactDOM.createPortal(this.props.children, this.containerEl) : null}
            </div>

        )
    }
}


export default Evaluator;