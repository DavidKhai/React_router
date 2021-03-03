import React, { Component } from 'react';
import './App.css';
import NoteForm from './NoteForm';
import Nav from './Nav';
import NoteList from './NoteList';
// import {noteData} from './firebaseConnect'
import {connect} from 'react-redux'
import AlertInfo from './AlertInfo';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  showForm = () => {
    if(this.props.isEdit === true){
      return(
        <NoteForm />
      )
    }
  }
  render() {
    return (
      <div>
        <Nav/>
        <AlertInfo/>
        <div className="container">
          <div className="row">
            <NoteList/>
            {
              this.showForm()
            }
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isEdit: state.isEdit
  }
}


export default connect(mapStateToProps)(App)
