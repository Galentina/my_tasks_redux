import React, {useState} from 'react';
import './App.css';
import {connect} from "react-redux";



function List(props) {
    const {el, done, data} = props;
    const [newData, setNewData] = useState(data);
    const [updateTitle, setUpdateTitle] = useState('');               // updating process with callback to main file
    const upToDate = (id, data, title) => {
        props.updateTask(id, data, title);
        setOpenButton(!openButton);
        setUpdateTitle('');
    }

    const deleteThisTask = (id, section) => {
        props.deleteTask(id, section);
    }

    const [openButton, setOpenButton] = useState(false);            // make open process for new updating input
    const makeOpen = () => {
        setOpenButton(!openButton);
    }
    const makeClose = () => {
        setOpenButton(!openButton);
    }


    return (
        <div>
            <div className='next'>
                <input type='checkbox' className="check" value={el.done} checked={done}
                       onChange={() => props.checkTask(el.id, el.done)}/>&nbsp;
                <span className={(el.done) ? "done" : "notDone"}>&#9200;&nbsp;{el.data}</span>&nbsp;&nbsp;
                <span className={(el.done) ? "done" : "notDone"}>&#9997;&nbsp;{el.title}</span><br/>

                <div className='next'>
                    {openButton &&
                        <div>
                            <input className='input' type="date" min="2021-01-01" max="2021-12-31" value={newData}
                                   onChange={(e) => setNewData(e.target.value)} required/><br/>
                            <input className={(!openButton) ? "off" : "input"} value={updateTitle} placeholder={'Update task'}
                                   onChange={(event) => setUpdateTitle(event.target.value)}/><br/>
                            <button disabled={!updateTitle} className={(!openButton) ? "off" : "onCheck"}
                                    onClick={() => upToDate(el.id, newData, updateTitle)}>&#10004;</button>
                            &nbsp;
                            <button className={(!openButton) ? "button2Non" : "button2"}
                                    onClick={makeClose}>&#10008;</button>
                        </div>
                    }
                    <button className={(openButton) ? "off" : "onCheck"} onClick={makeOpen}>Update</button>
                    &nbsp;&nbsp;
                    <button className={(openButton) ? "button2Non" : "button2"}
                            onClick={() => deleteThisTask(el.id, el.section)}>Delete
                    </button>
                    &nbsp;
                </div>
            </div>
            <br/>

        </div>
    );
}

const mapStateToProps = (state) => ({
    counters: state.counters
});

const mapDispatchToProps = (dispatch) => ({
    updateTask: (id, data, title) => dispatch({type: "UPDATE_TASK", payload: {id: id, data: data, title: title}}),
    deleteTask: (id, section) => dispatch({type: "DELETE_TASK", payload: {id: id, section: section}}),
    checkTask: (id, done) => dispatch({type: "CHECK_DONE", payload: {id: id, done: done}})
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
