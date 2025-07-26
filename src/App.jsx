import "./App.css";
import { useEffect, useRef, useState } from "react";
function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex]=useState(null);

  const isInitialized=useRef(false);
  function handleClick() {
    if(!task) return;
    if (editIndex===null) {
      setList([...list, task]);
    }else{
      const updatedList=list.map((val,index)=> index===editIndex ? task : val);
      setList(updatedList);
      setEditIndex(null)
    }
    setTask("");
  }

  function handleDelete(indexToDelete){
    const newList=list.filter((val,index)=>index!==indexToDelete)
    setList(newList);
  }

  function handleEdit(index){
    setTask(list[index]);
    setEditIndex(index);
  }

  useEffect(()=>{
    const localList=JSON.parse(localStorage.getItem("my-todo-list"));
    if (localList && Array.isArray(localList)) {
      setList(localList);
    }
    isInitialized.current=true;
  },[])

  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem("my-todo-list", JSON.stringify(list));
    }
  }, [list]);


  return (
    <div>
      <h1>My To-do List</h1>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}
          <button onClick={()=>handleDelete(index)}>Delete</button>
          <button onClick={()=>handleEdit(index)}>{editIndex === null ? "Add the task" : "Update task"}</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleClick}>Add the task</button>
    </div>
  );
}

export default App;
