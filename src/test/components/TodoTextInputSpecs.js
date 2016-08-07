import React from 'react'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import TodoTextInput from '../../components/TodoTextInput'

function setUp(propOverrides) {
  const props = Object.assign({
    onSave: expect.createSpy(),
    text: 'redux',
    placeholder: 'need to do',
    editing: false,
    newTodo: false
  }, propOverrides)
  
  const renderer = TestUtils.createRenderer()
  
  renderer.render(
    <TodoTextInput {...props}/>
  )
  
  const output = renderer.getRenderOutput()
  
  return {
    props,
    output,
    renderer
  }
}

describe.only('component', () => {
  context('TodoTextInput', () => {
    it('should render correctly', () => {
      const {output} = setUp()
      
      expect(output.props.placeholder).toEqual('need to do')
      expect(output.props.value).toEqual('redux')
      expect(output.props.className).toEqual('')
    })
    
    it('should render correctly when editing is true', () => {
      const {output} = setUp({editing: true})
      expect(output.props.className).toEqual('edit')
    })
    
    it('should render correctly when newTodo is true', () => {
      const {output} = setUp({newTodo: true})
      expect(output.props.className).toEqual('new-todo')
    })
    
    it('should update value on change', () => {
      const {output, renderer} = setUp()
      output.props.onChange({target: {value: 'react'}})
      const updated = renderer.getRenderOutput()
      expect(updated.props.value).toEqual('react')
    })
    
    it('should call onSave on return key press', () => {
      const {output, props} = setUp()
      output.props.onKeyDown({which: 13, target: {value: 'webpack'}})
      expect(props.onSave).toHaveBeenCalledWith('webpack')
    })
    
    it('should reset state on return key press if newTodo', () => {
      const {output, renderer} = setUp({newTodo: true})
      output.props.onKeyDown({which: 13, target: {value: 'webpack'}})
      const updated = renderer.getRenderOutput()
      expect(updated.props.value).toEqual('')
    })
    
    it('should call onSave on blur', () => {
      const {output, props} = setUp()
      output.props.onBlur({target: {value: 'gulp'}})
      expect(props.onSave).toHaveBeenCalledWith('gulp')
    })
    
    it('should not call onSave on blur if newTodo', () => {
      const {output, props} = setUp({newTodo: true})
      output.props.onBlur({target: {value: 'gulp'}})
      expect(props.onSave.calls.length).toBe(0)
    })
  })
})
