import React, {useState} from 'react';
import './App.css'
import {connect} from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

function CreateNewSection(props) {
    const {modal, toggle, sections} = props;

    const [newSection, setNewSection] = useState('');
    const [upSection, setUpSection] = useState('');
    const [newNameSection, setNewNameSection] = useState('');
    const [delSection, setDelSection] = useState('');
    const upSections = [{name: '---'}, ...sections];

    const addNewSection = (newSection) => {
       props.addSections(newSection);
       setNewSection('')
    }

    const renameSect = (upSection, newNameSection) => {
        props.renameSection(upSection, newNameSection);
        setNewNameSection('');
        setUpSection('');
    }

    const delThisSection = (name) => {
        props.deleteSection(name);
        setDelSection('');
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className='header' toggle={toggle} >Update Section List</ModalHeader>
                <ModalBody>
                    <span style={{fontSize: 20}}>Create a new section:</span>
                    <input className='input' value={newSection} placeholder={'Add a new section'}
                           onChange={(e) => setNewSection(e.target.value)}/><br/>
                           <button disabled={!newSection} className='button3' onClick={() => addNewSection(newSection)}>Save new section</button>&nbsp;&nbsp;
                    <br/>
                    <hr/>
                    <span style={{fontSize: 20}}>Update section:</span>
                    <input className='input'  value={upSection} onChange={(e)=>setUpSection(e.target.value)} placeholder={'Choose section for rename'}/>&nbsp;&nbsp;
                    <select className="input50" value={upSection} onChange={(e)=>setUpSection(e.target.value)}>{upSections.map(el => <option>{el.name}</option>)}
                    </select><br/>
                    <span>Choose new name:</span>
                    <input className='input'  value={newNameSection} onChange={(e)=>setNewNameSection(e.target.value)} placeholder={'Put a new name for section'}/>
                    <button disabled={!newNameSection} className='button3' onClick={() => renameSect(upSection, newNameSection)}>Update section</button>&nbsp;&nbsp;
                    <hr/>
                    <span style={{fontSize: 20}}>Delete section:</span>
                    <input className='input'  value={delSection} onChange={(e)=>setDelSection(e.target.value)} placeholder={'Choose section to delete'}/>&nbsp;&nbsp;
                    <select className="input50" value={delSection} onChange={(e)=>setDelSection(e.target.value)}>{upSections.map(el => <option>{el.name}</option>)}
                    </select><br/>
                    <button disabled={!delSection} className='button3' onClick={() => delThisSection(delSection)}>Delete section</button>&nbsp;&nbsp;
            </ModalBody>

            <ModalFooter>

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
    addSections: (section) => dispatch({type: "ADD_SECTION", payload: {name: section}}),
    renameSection: (oldName, newName) => dispatch({type: "UPDATE_SECTIONS", payload: {oldName: oldName, newName: newName}}),
    deleteSection: (name) => dispatch({type: "DELETE_SECTION", payload: {name: name}})
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewSection);