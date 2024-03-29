import React, { Component } from 'react';
import ToDoInfo from './ToDoInfo';
import '../css/MyTodo.css';
import CreateTodo from './CreateTodo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data, onUpdate, onRemove, onCreate, onColorChange } = this.props;
    return (
      <div className="list_Box">
        <CreateTodo onCreate={onCreate} />

        {data
          .map((data, i) => (
            <ToDoInfo
              data={data}
              key={i}
              onRemove={onRemove}
              onUpdate={onUpdate}
              onColorChange={onColorChange}
            />
          ))
          .reverse()}
      </div>
    );
  }
}
export default TodoList;
