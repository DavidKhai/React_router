import React, { Component } from 'react';
import {connect} from 'react-redux'

class NoteItem extends Component {
    towActionButton = () => {
        this.props.changeEditStatus(); //action 1
        //Hàm lấy nội dung truyền vào trong store, để store update vào dữ liệu ---action 2
        //console.log(this.props.note);
        this.props.getEditData(this.props.note);
    }
    deleteData = () => {
        //console.log(this.props.note.id);
        this.props.getDeleteData(this.props.note.id);

        //hiển thông báo Xóa dữ liệu thành công
        this.props.alertOn('Xóa ghi chú "' + this.props.note.noteTitle + '" thành công', 'danger');
    }
    render() {
        return (
            <div className="card">
                <div className="card-header" role="tab" id="note1">
                    <h5 className="mb-0">
                    <a data-toggle="collapse" data-parent="#noteList" href={"#number" + this.props.i} aria-expanded="true" aria-controls="noteContent1">
                        {this.props.noteTitle}
                    </a>
                    <div className="btn-group float-right">
                        <button className="btn btn-outline-info" onClick={() => this.towActionButton()}>Sửa</button>
                        <button className="btn btn-outline-secondary" onClick={() => this.deleteData()}>Xóa</button>
                    </div>
                    </h5>
                </div>
                <div id={"number" + this.props.i} className="collapse in" role="tabpanel" aria-labelledby="note1">
                    <div className="card-body">
                    {this.props.noteContent} 
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
       
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeEditStatus: () => {
            dispatch({
                type: 'CHANGE_EDIT_STATUS'
            })
        },
        getEditData: (itemObject) => {
            dispatch({
                type: 'GET_EDIT_DATA',
                itemObject
            })
        },
        getDeleteData: (deleteId) => {
            dispatch({
                type: 'DETELE',
                deleteId
            })
        },
        alertOn: (alertContent, alertType) => {
            dispatch({
                type: 'ALERT_ON',
                alertContent,
                alertType
            })
        },
        alertOff: () => {
            dispatch({
                type: 'ALERT_OFF'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem)