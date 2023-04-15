import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import List from "./List/List";
import { homeworks, groceries } from './lists';



function App() {

  const [lists, setLists] = useState(() => {
    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
      return JSON.parse(storedLists);
    } else {
      return [
        { id: 0, slug: "/list/homeworks", name: "homeworks", tasks: [] },
        { id: 1, slug: "/list/groceries", name: "groceries", tasks: [] },
      ];
    }
  });

  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddList = () => {
    if (newTask.trim().length === 0) {
      return;
    }
    const newList = {
      id: lists.length,
      slug: `/list/${newTask.toLowerCase()}`,
      name: newTask,
      tasks: [] 
    };
    const updatedLists = [...lists, newList];

    setNewTask("");
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
  };


  const handleTaskDelete = (listIndex, taskIndex) => {
    const newList = [...lists];

    if (taskIndex === null) {
      newList.splice(listIndex, 1);
    } else {
      newList[listIndex].tasks.splice(taskIndex, 1);
    }

    setLists(newList);
    localStorage.setItem("lists", JSON.stringify(newList));
  };


  useEffect(() => {
    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }
  }, []);

  return (
      <div className="App">
        <NavBar />
        <h3>
          <img src="/vite.svg" alt="Vite logo" />
        </h3>
        <div className="container">
          <div className='adding'>
            <input type="text" value={newTask} onChange={handleInputChange} />
            <button onClick={handleAddList}>Add List</button>
          </div>
          <div className="lists">
            {lists.map((list, index) => (
              <div className="list" key={index}>
                {lists.some((item) => item.id === list.id) && (
                  <Link to={list.slug}>
                    <h3>{list.name}</h3>
                  </Link>
                )}
                <button onClick={() => handleTaskDelete(index, null)}>Delete</button>
                {list.tasks.map((task, index) => (
                  <h3 key={index}>{task}</h3>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>

  );
}

export default App;
