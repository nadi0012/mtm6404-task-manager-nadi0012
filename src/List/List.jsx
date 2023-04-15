import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import * as lists from '../lists';
import ListItem from "../ListItem/ListItem";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import {homeworks, groceries } from '../lists';
import "./list.css";


const sortTaskList = (list) => {
  return list.sort((a, b) => {
    if (a.priority === 'high') {
      return -1;
    } else if (a.priority === 'low') {
      return 1;
    } else if (a.priority === 'medium') {
      return 0;
    }
  });
};

const List = (props) => {
  const { id } = useParams();
  const [taskList, setTaskList] = useState([]);
  const [newItemTask, setNewItemTask] = useState('');
  const [newItemPriority, setNewItemPriority] = useState('high');


useEffect(() => {
  const storedTaskList = JSON.parse(localStorage.getItem('taskList'));
  let filteredTaskList = storedTaskList?.filter(task => task.slug === id) || [];

  if (!filteredTaskList.length) {
    filteredTaskList = id === 'groceries' ? groceries : id === 'homeworks' ? homeworks : [];
  }
  setTaskList(filteredTaskList);
}, [id]);
  const handleTaskNameChange = (event) => {
    setNewItemTask(event.target.value);
  };


  const handleChange = (id, status) => {
    const taskIndex = taskList.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      const newTaskList = [...taskList];
      newTaskList[taskIndex].status = status;
      setTaskList(sortTaskList(newTaskList));
      localStorage.setItem('taskList', JSON.stringify(newTaskList)); 
    }
  };
  const addItemToList = () => {
    const newId = taskList.length > 0 ? Math.max(...taskList.map(task => task.id)) + 1 : 1;
    const newTask = {
      id: newId,
      name: newItemTask,
      priority: newItemPriority,
      status: 'incomplete',
      slug: id,
    };
    const newTaskList = [...taskList, newTask];
    setTaskList(sortTaskList(newTaskList));
    setNewItemTask("");
    setNewItemPriority('high');
    localStorage.setItem('taskList', JSON.stringify(newTaskList)); 
  };
 
  const deleteItem = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(sortTaskList(newTaskList));
    localStorage.setItem('taskList', JSON.stringify(newTaskList)); 
  };
 
  const incompleteTasks = taskList.filter(task => task.status === 'incomplete');
  const completedTasks = taskList.filter(task => task.status === 'complete');

  // const incompleteList = incompleteTasks.map((item) => ( 
  //   <ListItem
  //     key={item.id}
  //     id={item.id}
  //     task={item.name}  
  //     priority={item.priority}
  //     status={item.status}
  //     handleChange={handleChange}
  //     deleteItem={deleteItem}
  //   />
  // ));
  
  // const completedList = completedTasks.map((item) => ( 
  //   <ListItem
  //     key={item.id}
  //     id={item.id}
  //     task={item.name} 
  //     priority={item.priority}
  //     status={item.status}
  //     handleChange={handleChange}
  //     deleteItem={deleteItem}
  //   />
  // ));

  const handlePriorityChange = (event) => {
    setNewItemPriority(event.target.value);
  };
  
  return (
    <div className="List">
      <NavBar />
      <h3>
        <img src="/vite.svg" alt="Vite logo" />
      </h3>

  <div className="tasks">
    <div className="incomplete">
      <div className="NewTask">
        <input type="text" value={newItemTask} onChange={handleTaskNameChange} />
        <select value={newItemPriority} onChange={handlePriorityChange}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={addItemToList}>Add Task</button>
      </div>
      <h3>Incomplete Tasks</h3>
      {incompleteTasks.length > 0 ? incompleteTasks.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          task={item.name}
          priority={item.priority}
          status={item.status}
          handleChange={handleChange}
          deleteItem={deleteItem}
        />
      )) : <p>No Incomplete Tasks</p>}
    </div>
    <div className="complete">
      <h3>Completed Tasks</h3>
      {completedTasks.length > 0 ? completedTasks.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          task={item.name}
          priority={item.priority}
          status={item.status}
          handleChange={handleChange}
          deleteItem={deleteItem}
        />
      )) : <p>No Completed Tasks</p>}
    </div>
  </div>

  <Footer />
</div>
  );
}
    
export default List;     

