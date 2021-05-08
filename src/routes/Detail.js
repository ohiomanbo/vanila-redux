import React from "react"
import {connect} from 'react-redux'
import { actionCreators } from "../store"
import { useHistory } from "react-router-dom"
import {mapDispatchToProps} from "../components/ToDo"

function Detail({toDos, delToDo}) {
    //const id = useParams()
    //console.log("props",props)
    const history = useHistory()

    // What's been changed
    const onBtnClick = () => {
        delToDo(toDos?.id);
        history.goBack(); // 삭제 후 이전 페이지로 돌아가기 위함
    }

    return (
        <>
            <h1> {toDos?.text} </h1>
            <h5> Created at: {toDos?.id} </h5>
            <button onClick={onBtnClick}>DEL</button>
        </> // 물음표 안붙이면 새로고침시 state가 날아가서 해당 정보가 사라짐. optional chaining임
    )   
}

function mapStateToProps(state, ownProps){
    console.log(ownProps.match.params.id) // useParams 대신 이렇게 id를 얻어도 됨

    const {
        match : {
            params: { id }
    }} = ownProps

    console.log("ownProps",ownProps)
    return { toDos : state.find( toDos => toDos.id === parseInt(id) ) }
}

function mapDispatchToProps(dispatch, ownProps) {
    // const {match: {params: {id}}} = ownProps;
    return {
        delToDo: (id) => {
            dispatch(actionCreators.delToDo(id));   // Q. 이걸 ToDo에서 가져와서 쓸 수는 없을까?
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Detail)