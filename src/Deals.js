import React from "react";
import List from "./List";
import './App.css';
import {connect} from "react-redux";




function Deals(props) {
    const {tasks, section} = props;

    return (
        <div>
            <h5><span className='span1'>{section.name}</span>&nbsp;&#10155;&nbsp;<span className='span2'>{section.taskNums}</span></h5>
            <div>
                <ul style={{marginTop: 10}}>
                    {tasks.filter(el => el.section===section.name).sort((a, b) => new Date(a.data) -  new Date(b.data)).map((el, index) =>
                        <li>
                            <List el={el} id={el.id} done={el.done} data={el.data} key={index}/>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )

}
const mapStateToProps = (state) => ({
    tasks: state.tasks,
    sections: state.sections
})

// const mapDispatchToProps = (state) => {
//
// }

export default connect(mapStateToProps) (Deals);