import React, { useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function ({toDoDetails}) {

    // status state in ToDoListItems to track whether the item is complete.
    let [status,setStatus] = useState(false);

    //  The component takes toDoDetails as a prop and destructures it to get value, toDoList, setToDoList, and index.
    let {value,toDoList,setToDoList,index} = toDoDetails;
  
    const deleteToDo = (event) => {
  
      event.stopPropagation(); // Prevents the click event from toggling the status
  
      // This function filters out the to-do item at the current index and updates the state with the new list.
      let finalData = toDoList.filter((value,i) => i!=index);
      setToDoList(finalData);

      // Its a react notification
      NotificationManager.success(`ToDo Deleted...`);
    }
  
    // toggles the status state.
    const checkStatus = () => {
      setStatus(!status);
    }  

  return (
    <div>
      {/* The component returns a list item (<li>) that displays the to-do item and a delete button (<span>).
    completeToDo class is applied to completed ToDo. */}
      <li className={(status) ? 'completeToDo' : ''} onClick={checkStatus}>{`${index+1}. ${value}`} <span onClick={deleteToDo}> &times; </span></li>

      {/* for React-notification */}
      <NotificationContainer/>

    </div>
  )
}
