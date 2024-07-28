import React, { useState } from 'react'
import ToDoListItems from './ToDoListItems';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function ToDoList() {

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

      // Its a react notification
      NotificationManager.success(`ToDo Add Successflly..`)
      event.target.newToDo.value = '';
    }else if(!newToDo){
      // alert(`ToDo cannot be Empty`);

       // Its a react notification
      NotificationManager.warning(`ToDo Cannot be Empty`);
    } else {
      // alert(`ToDo already exist.`);

       // Its a react notification
      NotificationManager.error(`ToDo already Exist.`);

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
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={saveToDOList}>
        <input type='text' name='newToDo'/> <button>Add</button>
      </form>

      <div className='toDoDiv'>
        <ul>
          {list}
        </ul>
      </div>

      {/* for React-notification */}
      <NotificationContainer/>

    </div>
  )
}
