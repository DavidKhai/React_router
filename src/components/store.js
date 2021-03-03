import {noteData} from './firebaseConnect'

var redux = require('redux');


const noteInitialState = {
    isEdit: false,
    editItem: {},
    isAdd: false,
    alertShow: false,
    alertContent: '',
    alertType: ''
}
const allReducer = (state = noteInitialState, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            //console.log('Kết nối thành công với ADD_DATA , biến nhận vào là: ' + action.getItem);
            noteData.push(action.getItem);
            console.log('Thêm dữ liệu' + JSON.stringify(action.getItem) + 'thành công');
            return state
        case 'CHANGE_EDIT_STATUS':
            return {...state, isEdit:!state.isEdit}
            
        case 'CHANGE_ADD_STATUS':
            return {...state, isAdd:!state.isAdd}
            
        case 'GET_EDIT_DATA':
            return {...state, editItem:action.itemObject}

        case 'EDIT':
            //update dữ liệu lên trên firebase
            noteData.child(action.getItem.id).update({
                noteTitle: action.getItem.noteTitle,
                noteContent: action.getItem.noteContent,
            })
            console.log("Đã cập nhật dữ liệu " + JSON.stringify(action.getItem) + "thành công");
            return {...state, editItem:{}}

        case 'DETELE':
            noteData.child(action.deleteId).remove();
            console.log('Đã xóa phần tử có id là: ' + JSON.stringify(action.deleteId));
            return state
        
        case 'ALERT_ON':
            return {...state, alertShow: true, alertContent:action.alertContent, alertType:action.alertType}

        case 'ALERT_OFF':
            return {...state, alertShow: false}

        default:
            return state
    }
}

var store = redux.createStore(allReducer);
store.subscribe(function(){
    console.log(JSON.stringify(store.getState()));
})

export default store;