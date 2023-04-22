 
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListItem from "../ListItem/ListItem";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import {homeworks, groceries } from '../lists';
import "./list.css";
import { NavProvider } from "../contexts/NavContext";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../db";


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

const List = () => {
  const { id, name } = useParams();
  const [taskList, setTaskList] = useState([]);
  const [newItemTask, setNewItemTask] = useState('');
  const [newItemPriority, setNewItemPriority] = useState('high');
  const navigate = useNavigate();
  const [setIsDatabase] = useState(true);


  const handleTaskNameChange = (event) => {
    setNewItemTask(event.target.value);
  };

  useEffect(() => {
    document.title = name ? name : 'List';
  }, [id]);


  useEffect(() => {

    let filteredTaskList = id === 'groceries' ? groceries : id === 'homeworks' ? homeworks : [];
    setTaskList(sortTaskList(filteredTaskList));
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        const task = { ...doc.data(), id: doc.id };
        items.push(task);
      });
      const filteredItems = items.filter((task) => task.slug === id);
      setTaskList((prevTaskList) => {
        const filteredItems = items.filter((task) => task.slug === id);
        const newTaskList = filteredItems.filter((item) => !prevTaskList.some((task) => task.id === item.id));
        const mergedList = prevTaskList.concat(newTaskList);
        return sortTaskList(mergedList);
      });
    }, (error) => {
      setIsDatabase(false);
      const localTaskList = JSON.parse(localStorage.getItem('taskList'));
      if (localTaskList) {
        const filteredLocalTaskList = localTaskList.filter((task) => task.slug === id);
        setTaskList((prevTaskList) => {
          const filteredItems = items.filter((task) => task.slug === id);
          const newTaskList = filteredItems.filter((item) => !prevTaskList.some((task) => task.id === item.id));
          const mergedList = prevTaskList.concat(newTaskList);
          return sortTaskList(mergedList);
        });
      }
    });
    return () => unsubscribe();
  }, [id]);
const handleChange = async (id, status) => {
  const taskIndex = taskList.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    const newTaskList = [...taskList];
    newTaskList[taskIndex].status = status;
    setTaskList(sortTaskList(newTaskList));
    try {
      const taskDocRef = doc(db, 'tasks', id.toString());
      await updateDoc(taskDocRef, { status });
    } catch (error) {
      setIsDatabase(false);
      localStorage.setItem('taskList', JSON.stringify(newTaskList)); 
    }
  }
};
const addItemToList = () => {
  const newId = taskList.length > 0 ? Math.max(...taskList.map((task) => parseInt(task.id))) + 1 : 1;
  const newTask = {
    id: newId.toString(),
    name: newItemTask,
    priority: newItemPriority,
    status: 'incomplete',
    slug: id,
  };
  
  addDoc(collection(db, "tasks"), newTask)
    .then(() => {
      setNewItemTask("");
      setNewItemPriority('high');
      setTaskList(sortTaskList([...taskList, newTask]));
    })
    .catch((error) => {
      setIsDatabase(false);
    });
};

const deleteItem = async (id) => {
  const newTaskList = taskList.filter((task) => task.id !== id);
  setTaskList(sortTaskList(newTaskList));
  try {
    const taskDocRef = doc(db, 'tasks', id.toString());
    await deleteDoc(taskDocRef);
  } catch (error) {
    setIsDatabase(false);
    localStorage.setItem('taskList', JSON.stringify(newTaskList)); 
  }
};
  const incompleteTasks = taskList.filter(task => task.status === 'incomplete');
  const completedTasks = taskList.filter(task => task.status === 'complete');


  const handlePriorityChange = (event) => {
    setNewItemPriority(event.target.value);
  };
  
  return (
    <div className="List">
          <NavProvider>
            <NavBar />
          </NavProvider>
          <div>
            <h3>
              <img src="/vite.svg" alt="Vite logo" />
            </h3>
          </div>
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
      {incompleteTasks.length > 0 ? incompleteTasks.map((item, index) => (
        <ListItem
          key={index}
          id={item.id}
          task={item.name}
          priority={item.priority}
          status={item.status}
          handleChange={handleChange}
          deleteItem={deleteItem}
        />
      )) : <p>No Incomplete Tasks</p>}
      <button
        onClick={() => navigate(-1)}
      
      >Go Back</button>
    </div>
    <div className="complete">
      <h3>Completed Tasks</h3>
      {completedTasks.length > 0 ? completedTasks.map((item, index) => (
        <ListItem
          key={index}
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

