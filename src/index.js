import { createStore } from "redux" 
// store 는 state( app 에서 바뀌는 data ) 를 저장, 여기서는 count
// redux는 data 관리 도와주는 역할

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");


const ADD = 'ADD'
const MINUS = 'MINUS'

// data를 수정하는 함수
// return 값이 data에 덮어씌워짐
// default를 0으로 선언
// count를 ++, -- 할지는 액션으로 정함
const reducer = (count = 0, action) => {
  switch (action.type) {

    case "ADD" :
      return count+1

    case "MINUS" :
      return count-1

    default :
      return count

  }

} 

// reducer를 initailState로 불러옴
// store는 데이터가 됨
const store = createStore(reducer)

// store는 dispatch, subscribe, getState, replaceReduce 함수가 있음
// store에 action을 dispatch하면, 리덕스가 reducer를 불러 action.type에 따라 동작
// data의 store를 만들고 message(action)을 dispatch를 이용해 store에게 보내는것
// store.dispatch({type : "hello"}) 


const onChange = () => {
  number.innerText = store.getState()
}

store.subscribe(onChange)

const increase = () => {
  store.dispatch({ type : ADD})
}

add.addEventListener("click", increase) // function 이라 () 달면 바로 실행됨
minus.addEventListener("click", () => store.dispatch({type : MINUS}))
