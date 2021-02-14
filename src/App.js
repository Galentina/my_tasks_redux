import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import {connect} from "react-redux";
import CreateNewTask from "./CreateNewTask";
import Deals from "./Deals";
import CreateNewSection from "./CreateNewSection";


function App(props) {
    const {sections} = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);

    return (
        <div className="App">
            <header className='App-header'>My tasks</header>
                <div style={{display: 'inline-flex', textAlign: "center"}}>
                    <button className='button3' onClick={() => setModal1(!modal1)} data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Update sections
                    </button>
                    <CreateNewSection modal={modal1} toggle={toggle1}/>
                    <button className='button3' onClick={() => setModal(!modal)} data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Insert a new task
                    </button>
                    <CreateNewTask modal={modal} toggle={toggle} sections={sections}/>
                </div>
            <hr/>
            <div className='row'>
                {sections.map((el, i) =>
                    <Deals section={el} key={i} id={el.id}/>)}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    sections: state.sections
})


export default connect(mapStateToProps)(App);
