import React, {useState} from 'react';
import './App.css'
import {connect} from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

function CreateNewTask(props) {
    const {modal, toggle, sections} = props;
    const upSections = [{name: '---'}, ...sections];

    const [newTitle, setTitle] = useState('');
    const [newData, setData] = useState('');
    const [newSection, setSection] = useState('---');

    const setUpTask = (newData, newSection, newTitle) => {
        props.addNewTask(newData, newSection, newTitle);
        setTitle('');
        setData([]);
        setSection('')
    }



    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader className='header' toggle={toggle} charCode='x'>Create a new task</ModalHeader>
                <ModalBody>
                    <input className='input' type="date" min="2021-01-01" max="2021-12-31" value={newData}
                           onChange={(e) => setData(e.target.value)} required/><br/>
                    <input className='input' value={newSection} onChange={(e)=>setSection(e.target.value)} placeholder={'Add a new section'}/>&nbsp;&nbsp;
                            <select className="input50" value={newSection} onChange={(e)=>setSection(e.target.value)}>
                                {upSections.map(el => <option>{el.name}</option>)}
                            </select><br/>
                    <input className='input' value={newTitle} placeholder={'Add a new task'}
                           onChange={(e) => setTitle(e.target.value)}/><br/>

            </ModalBody>
            <ModalFooter>
                <button className='button1' onClick={() => setUpTask(newData, newSection, newTitle)}>Save task</button>&nbsp;&nbsp;
                <button className='button2' onClick={()=>toggle()}>Close</button>
            </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    sections: state.sections
})

const mapDispatchToProps = (dispatch) => ({
    addNewTask: (data, section, title) => dispatch({type: "ADD_TASK", payload: {data: data, section: section, title: title}}),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewTask);