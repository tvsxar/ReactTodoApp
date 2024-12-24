import trashIcon from './img/trash-outline.svg';
import React, { useRef } from 'react'
import './App.css';

function App() {
  const [tasks, SetTasks] = React.useState([])
  const [inputValue, SetInputValue] = React.useState('')

  const inputRef = useRef(null);

  function AddTask() {
    if(inputValue) {
      SetTasks(prev => [...prev, {text: inputValue, completed: false}]);
      SetInputValue('');

      inputRef.current.focus();
    }
  }

  function DeleteTask(index) {
    SetTasks(prev => prev.filter((task, taskIndex) => taskIndex !== index));
  }

  function CompletedTask(index) {
    SetTasks(prev => prev.map((task, taskIndex) => {
      return taskIndex === index ? { ...task, completed: !task.completed } : task;
    }));
  }

  return (
    <div className='container'>
      <div className='input-task'>
        <input onChange={(event) => SetInputValue(event.target.value)} 
        className='input' type='text' value={inputValue} maxLength={30} 
        ref={inputRef} placeholder='Enter your task...'></input>
        <button onClick={AddTask} className='add-btn'>Add</button>
      </div>

      <ul className='task-list'>
        {tasks.map((task, index) => (<li className='task' key={index}>
          <p onClick={() => CompletedTask(index)} 
          className={task.completed ? 'task-text completed' : 'task-text'}>{task.text}</p>
          <button onClick={() => DeleteTask(index)} className='delete-btn'>
            <img className='trash' src={trashIcon} />
          </button>
        </li>))}
      </ul>
    </div>
  );
}

export default App;
