import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'

class TodoTextInput extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
  }
  
  handleBlur(e) {
    if(!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }
  
  handleChange(e) {
    this.setState({text: e.target.value})
  }
  
  handleSubmit(e) {
    const text = e.target.value.trim();
    
    //equal: click enter keyboard
    if(e.which === 13) {
      this.props.onSave(text)
      if(this.props.newTodo) {
        this.setState({text: ''})
      }
    }
  }
  
  render() {
    return (
      <input className={classnames({
        edit: this.props.editing,
        'new-todo': this.props.newTodo
      })}
             type="text"
             placeholder={this.props.placeholder}
             autoFocus="true"
             value={this.state.text}
             onBlur={this.handleBlur.bind(this)}
             onChange={this.handleChange.bind(this)}
             onKeyDown={this.handleSubmit.bind(this)}
      />
    )
  }
}

TodoTextInput.propTypes = {
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
  placeholder: PropTypes.string,
  text: PropTypes.string,
  onSave: PropTypes.func.isRequired
}

export default TodoTextInput