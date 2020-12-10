import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import usePrevious from './hooks/usePrevious';
import useLocalStorageState from './hooks/useLocalStorageState';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = () => {
  const [tasks, setTasks] = useLocalStorageState('yart-todos');
  const [filter, setFilter] = useState('All');

  const toggleTaskCompleted = id => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = id => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
    // console.log(tasks);
    // console.log(remainingTasks);
  };

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if (task.id === id) {
        return {...task, name: newName};
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
    key={name} 
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));

  const addTask = name => {
    const newTask = {
      id: `id-${nanoid()}`,
      name,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const tasksNoun = taskList.length === 1 ? 'task' : 'tasks';
  const headingText = `${taskList.length} ${tasksNoun} remaining.`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className='todoapp stack-large'>
      <h1>YART - Yet Another React Todo</h1>
      
      <Form addTask={addTask}/>
      
      <div className='filters btn-group stack-exception'>
       {filterList}
      </div>
      
      <h2 id='list-heading' tabIndex='-1' ref={listHeadingRef}>{headingText}</h2>

      <ul role='list' className='todo-list stack-large stack-exception' aria-labelledby='list-heading'>
       {taskList}
      </ul>
    </div>
  );
}

export default App;