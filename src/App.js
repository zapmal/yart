import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';
import Form from './components/Form';

const App = props => {
  const [tasks, setTasks] = useState(props.tasks);

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
    
    console.log(tasks);
    console.log(remainingTasks);
  };

  const taskList = tasks.map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
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

  return (
    <div className='todoapp stack-large'>
      <h1>YART - Yet Another React Todo</h1>
      
      <Form addTask={addTask}/>
      
      <div className='filters btn-group stack-exception'>
       <FilterButton />
       <FilterButton />
       <FilterButton />
      </div>
      
      <h2 id='list-heading'>{headingText}</h2>

      <ul role='list' className='todo-list stack-large stack-exception' aria-labelledby='list-heading'>
       {taskList}
      </ul>
    </div>
  );
}

export default App;
