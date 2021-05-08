import React from 'react'
import {connect} from 'react-redux'
import { actionCreators } from '../store'
import { Link } from "react-router-dom"

function ToDo( {text, onBtnClick, id} ){    // id는 어디서 튀어나온거지?
    return ( 
        <li>
            <Link to={`/${id}`}>
                {text} 
            </Link>
            <button onClick={onBtnClick}>DEL</button>
        </li>
    )
} // ToDo는 리듀서에게 메세지를 보내기를 원함

function mapDispatchToProps(dispatch, ownProps) { // 여기선 ownProps를 쓸것
    console.log("ToDo_dispatch ownProps",ownProps) // reducer의 state 값들 { text : 입력한 값, id : Date.now() 값 }이 출력됨
    return {
        onBtnClick : () => dispatch(actionCreators.delToDo(ownProps.id)) // parseInt 여기 해도 됨
        // on Props로 이미 id를 가지고 있으므로, 파라미터 없어도 됨
    }
}

export default connect(null, mapDispatchToProps) (ToDo) // state(mapStateToProps)는 무시할꺼라서 null


// mapStateToProps에서는 getState를 하면 되고,
// mapDispatchToProps 에서는 dispatch만 하면 됨