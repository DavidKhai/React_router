import React, { Component } from 'react';
import {connect} from 'react-redux';
class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: '',
            id: ''
        }
    }
    
    componentWillMount() {
        if(this.props.editItem){  //edit case
            this.setState({
                noteTitle: this.props.editItem.noteTitle,
                noteContent: this.props.editItem.noteContent,
                id: this.props.editItem.id
            });
        }
    }
    
    
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name);
        //console.log(value);
        this.setState({
            [name]: value
        });
    }
    addData = (title, content) => {
        if(this.state.id){
            var editObject = {};
            editObject.id = this.state.id;
            editObject.noteTitle = this.state.noteTitle;
            editObject.noteContent = this.state.noteContent;

            this.props.editDataStore(editObject);
            
            this.props.changeEditStatus(); //Tắt form đi

            this.props.alertOn("Đã sửa thành công","success");
        }
        else{
            var item = {};
            item.noteTitle = title;
            item.noteContent = content;
        
            this.props.addDataStore(item); //hàm reducer trong store //disptach ADD_DATA

            this.props.alertOn("Đã thêm mới thành công", "success");
        }
        
        
    }
    printTitle = () => {
        if(this.props.addStatus === true){
            return (
                <h4 className="text-center">Thêm mới Note</h4>
            )
        }
        else{
            return (
                <h4 className="text-center">Sửa Note</h4>
            )
        }
    }
    render() {
        //console.log(this.props.editItem);
        return (
            <div className="col-4">
                {this.printTitle()}
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Tiêu đề Note</label>
                        <input defaultValue={this.props.editItem.noteTitle} onChange={(event) => this.isChange(event)} type="text" className="form-control" name="noteTitle" id="noteTitle" aria-describedby="helpIdNoteTitle" placeholder="Tiêu đề note" />
                        <small id="helpIdNoteTitle" className="form-text text-muted">Điền tiêu đề vào đây</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Nội dung Note</label>
                        <textarea  onChange={(event) => this.isChange(event)} type="text" className="form-control" name="noteContent" id="noteContent" aria-describedby="helpIdNoteContent" placeholder="Nội dung Note" defaultValue={this.props.editItem.noteContent}/>
                        <small id="helpIdNoteContent" className="form-text text-muted">Điền nội dung vào đây</small>
                    </div>
                    <button type="reset" className="btn btn-primary btn-block" onClick={() => this.addData(this.state.noteTitle, this.state.noteContent)}>Lưu</button>
                </form>    
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        editItem: state.editItem,
        addStatus: state.isAdd

    }
}
//Nhận this.props.testThoi
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addDataStore: (getItem) => {
            dispatch({type: 'ADD_DATA', getItem})
        },
        editDataStore: (getItem) => {
            dispatch({type: 'EDIT', getItem})
        },
        changeEditStatus: () => {
            dispatch({
                type: 'CHANGE_EDIT_STATUS'
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
//Nhận this.props.addDataStore()


export default connect(mapStateToProps, mapDispatchToProps)(NoteForm)