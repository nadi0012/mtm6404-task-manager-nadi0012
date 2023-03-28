import { useState, useEffect } from 'react';
import { NavBar } from './NavBar/NavBar';
import List from './List/List';
import Footer from './Footer/Footer';

const listOfTasks = [
  { id: 1, name: "Complete Assignment", status: "complete", priority: "low" },
  { id: 2, name: "Send email", status: "incomplete", priority: "low" },
  { id: 3, name: "Review code bugs", status: "complete", priority: "high" },
  { id: 4, name: "Attend team meeting", status: "complete", priority: "medium" },
  { id: 5, name: "Prepare presentation", status: "incomplete", priority: "high" }
];

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


function App() {
  const [user, setUser] = useState('');
  const [taskList, setTaskList] = useState(listOfTasks);
  const [newItemTask, setNewItemTask] = useState('');
  const [newItemPriority, setNewItemPriority] = useState('high');
 
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('taskList')) || [];
    setTaskList(sortTaskList(storedTasks));
  }, []);
 
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  const handleChange = (id, status) => {
    
    const newTaskList = taskList.map((task) => {
      if (task.id === id) {
        task.status = status;
      }
      return task;
    });
    setTaskList(newTaskList);
  };
 
  const addItemToList = () => {
    const newTask = {
      id: taskList.length + 1,
      name: newItemTask,
      priority: newItemPriority,
      status: 'incomplete',
    };
    const newTaskList = [...taskList, newTask];
    setTaskList(sortTaskList(newTaskList));
    setNewItemTask('');
    setNewItemPriority('high');
  };
 
  const deleteItem = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(sortTaskList(newTaskList));
  };
 
  const incompleteTasks = taskList.filter(task => task.status === 'incomplete');
  const completedTasks = taskList.filter(task => task.status === 'complete');

  
  
  return (
    <div className="App">
      <NavBar />
      
      <h3>
        <img src="/vite.svg" alt="Vite logo" />
      </h3>
      
   
    <div className="tasks">
      <div className="incomplete">
        <div className="NewTask">
        <button onClick={addItemToList} disabled={!newItemTask}>
          <span>&#43;</span> Add Task
        </button>
        <input
          value={newItemTask}
          onChange={(event) => {
          setNewItemTask(event.target.value);
          }}
        />
        <select
          value={newItemPriority}
          onChange={(event) => {
          setNewItemPriority(event.target.value);
          }}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        </div>
        <h4>Incompleted tasks:</h4>
        <ul>
          {incompleteTasks.map((task) => {
            return (
              <List
                key={task.id}
                data={task}
                completeListItem={handleChange}
                deleteItem={deleteItem}
              />
            );
          })}
        </ul>
      </div>
      <div className="complete">
        <h4>Completed tasks:</h4>
        <ul>
          {completedTasks.map((task) => {
          return (
          <List
            key={task.id}
            data={task}
            completeListItem={handleChange}
            deleteItem={deleteItem}
          />
        );
        })}
        </ul>
      </div>
    </div>
  <Footer />
  </div>
  );
};
export default App;

