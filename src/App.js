import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  // toDoList state is initialized as an empty array.
  let [toDoList,setToDoList] = useState([]);

  // The saveToDOList function handles form submission.
  const saveToDOList = (event) => {

    // It trims and validates the new to-do item.
    let newToDo = event.target.newToDo.value.trim();

    // Adds the new to-do item to the list if it’s not empty and doesn’t already exist.
    if(newToDo && !toDoList.includes(newToDo)){
      let finalToDOList = [...toDoList,newToDo];
      setToDoList(finalToDOList); 
      event.target.newToDo.value = '';
    }else if(!newToDo){
      alert(`ToDo cannot be Empty`);
    } else {
      alert(`ToDo already exist.`);
    }

    event.preventDefault();
  };

  let list = toDoList.map((value,index) => {

    // toDoDetails prop containing the item's value, list, state setter, and index.
    let toDoDetails = {
      value,
      toDoList,
      setToDoList,
      index
    }

    return(

      // ToDoListItems component handles marking items as complete and deleting them.
      <ToDoListItems key={index} toDoDetails={toDoDetails}/>
    )
  })

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <form onSubmit={saveToDOList}>
        <input type='text' name='newToDo'/> <button>Add</button>
      </form>

      <div className='toDoDiv'>
        <ul>
          {list}
        </ul>
      </div>

    </div>
  );
}

export default App;

function ToDoListItems({toDoDetails}){

  // status state in ToDoListItems to track whether the item is complete.
  let [status,setStatus] = useState(false);

  //  The component takes toDoDetails as a prop and destructures it to get value, toDoList, setToDoList, and index.
  let {value,toDoList,setToDoList,index} = toDoDetails;

  const deleteToDo = (event) => {

    event.stopPropagation(); // Prevents the click event from toggling the status

    // This function filters out the to-do item at the current index and updates the state with the new list.
    let finalData = toDoList.filter((value,i) => i!=index);
    setToDoList(finalData);
  
  }

  // toggles the status state.
  const checkStatus = () => {
    setStatus(!status);
  }

  return(

    // The component returns a list item (<li>) that displays the to-do item and a delete button (<span>).
    // completeToDo class is applied to completed ToDo.
    <li className={(status) ? 'completeToDo' : ''} onClick={checkStatus}>{`${index+1}. ${value}`} <span onClick={deleteToDo}> &times; </span></li>
  )
}
