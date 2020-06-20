import React from 'react'
import { Link } from 'react-router-dom'
import store from '../redux/store/store'

const Dashboard = () => {

    var groupConvos = store.getState().conversations.map(convo => {
        if(convo.isGroup === true){
            return(
                <div key={convo.thread_path} className="container">
                    <div  className="row card vertical">
                        <div className="dashboard-convoDiv">
                            <div className="row-content">
                                <div className="card-content">
                                    <div className="col s9">
                                        <div className="col-content left">
                                            <p>
                                                {convo.title}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col s3">
                                        <div className="col-content right">
                                            <Link to={"/ConversationFunctions/" + convo.thread_path}>
                                                <button className="waves-effect waves-light btn blue">Open</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div key={convo.thread_path} className="container"></div>
            )
        }
    })

    var dmConvos = store.getState().conversations.map(convo => {
        if(convo.isGroup === false){
            return(
                <div key={convo.thread_path} className="container">
                    <div  className="row card vertical">
                        <div className="dashboard-convoDiv">
                            <div className="row-content">
                                <div className="card-content">
                                    <div className="col s9">
                                        <div className="col-content left">
                                            <p>
                                                {convo.title}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col s3">
                                        <div className="col-content right">
                                            <Link to={"/ConversationFunctions/" + convo.thread_path}>
                                                <button className="waves-effect waves-light btn blue">Open</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div key={convo.thread_path} className="container"></div>
            )
        }
    })

    return(
        <div className="container">
            <div className="row center">
                <div className="row-content dashboard-title">
                    <h4>Select a Conversation to see analytics for:</h4>
                </div>
            </div>

            <div className="row">
                <div className="row-content">

                    <div className="col s6">
                        <div className="col-content">
                            <div className="row">
                                <div className="row-content">
                                    <h5>Group Conversations</h5>
                                </div>
                                {groupConvos}
                            </div>
                        </div>
                    </div>

                    <div className="col s6">
                        <div className="col-content">
                            <div className="row">
                                <div className="row-content">
                                    <h5>Individual Conversations</h5>
                                </div>
                                {dmConvos}
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>            
            
        </div>
    )
}

export default Dashboard