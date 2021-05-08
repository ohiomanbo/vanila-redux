import {createStore} from "redux"

const ADD = "ADD"
const DEL = "DEL"

const addToDo = (text) => {
    return {
        type : ADD,
        text
    }
}

const delToDo = (id) => {
    return {
        type : DEL,
        id : parseInt(id)
    }
}


const reduce = (state = [], action) => {
    switch(action.type){
        case ADD :
            return [{text: action.text, id:Date.now()}, ...state]
        case DEL :
            return state.filter(toDo => toDo.id !== action.id)
        default : 
            return state
    }
}

const store = createStore(reduce)

export const actionCreators = {
    addToDo, 
    delToDo
}

//store.subscribe() // 파라미터 함수를, 액션이 디스패치 될 때마다 호출함
//todo(for each) ... 를 리액트 리덕스로 간편하게 구현할 예정
// -> index에 store를 Provider를 이용해 연결

// store.getState 는 현재의 state를 전달해주고
// dispatch는 store 혹은 reducer에 메세지 전달

export default store