import React, { useState } from "react"
import {connect} from 'react-redux'
import { actionCreators } from "../store"
import ToDo from "../components/ToDo"

function Home({toDos, addToDo, ...rest}) { // state의 toDos라는 속성만 가져옴
    console.log("props", {toDos}) // getCurrentState가 return하는 값이자, react-router로 부터 받은 props
    console.log(rest) // addToDo를 가지고 있는것을 확인 할 수 있음
    
    const [text, setText] = useState("")

    function onChange(e) {
        setText(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault()
        addToDo(text)
        setText("")
        // Home의 파라미터로 그냥 dispatch 받았으면 dispatch(actionCreators.addToDo(text))
    }

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit= {onSubmit}>
                <input type="text" value = {text} onChange={onChange}/>
                <button>Add</button>
            </form>
            <ul>
                {
                    toDos.map(toDo => (<ToDo {...toDo} key = {ToDo.id}/>)) //ToDo 렌더링, {...toDo}에 ...은 왜붙지?
                }
            </ul>
        </>
        )
}

function mapStateToProps(state, ownProps){
    console.log("Home_State state",state)

    // Redux store(store.jf)로 부터 reducer의 state 받아와 props에 넣음, ownProps 는 react-router(App.js)에 의해 Home에게 준 props
    return { toDos: state }

} // store로 부터 Home에다 state 가져다 주는 역할

function mapDispatchToProps(dispatch, ownProps ){
    console.log("Home_Dispatch ownProps",ownProps)
    return {
        addToDo : (text) => dispatch(actionCreators.addToDo(text)) // function. 리액트 컴포넌트로부터 store의 reducer에게 dispatch함
        // input에서 와서 state에 올라간 text와 addToDo를 호출
    } // 객체로 반환 해줘야함
}


export default connect (mapStateToProps, mapDispatchToProps) (Home)
// 컴포넌트 home, getCurrentState를 store와 connect함
// connect()는 Home으로 보내는 props에 추가될 수 있도록 허용