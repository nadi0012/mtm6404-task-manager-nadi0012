import reactLogo from './assets/react.svg';
import './App.css';
import Button from './Button/Button';
import { useState } from 'react';
import { NavBar } from './NavBar/NavBar';
import { tasks } from './assets/tasks';
import ListItem from './ListItem/ListItem';
import Footer from './Footer/Footer';



function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <NavBar />
      <h1><img src="/vite.svg" /></h1>
      <ul>
        {tasks.map((task) => 
          task.completed ? null : <ListItem task={task} />
        )}
      </ul>
      <div className="card">
        <Button label="Counter disabled" enabled={false}>
        </Button>
        <Button initialCount={2} label="In Progress" enabled={true} />
        <Button initialCount={2} label="Done" enabled={true} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
