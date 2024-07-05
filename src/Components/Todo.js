import React from 'react'
import './Todo.css'
import { useState, useRef, useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";

export const Todo = () => {
    const [todo, setTodo] = useState('')  //to store a single todo or newly added todo by the user
    const [todos, setTodos] = useState(()=> {
          // Get the todos from local storage when the component mounts
        const savedTodos = localStorage.getItem("todos")
        return savedTodos ? JSON.parse(savedTodos) : []
    })

    const [editId, setEditId] = useState(0) //to store the id of the data which we edit

    useEffect(()=> {
        // Save todos to local storage whenever they change
        localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const addTodo = () => {

       if(todo !== '') 
        {
 
           {
                const updatedTodos = [...todos, {list: todo, id : Date.now(), status: false}];
                setTodos(updatedTodos);
                console.log('Updated todos:', updatedTodos); 
                setTodo('');  

            }
           
              
         if(editId){
            const editToDo = todos.find((todo)=> todo.id === editId)
            console.log('edit todo',editToDo);
            const updateToDo = todos.map((to)=> to.id === editToDo.id? (to = {id: to.id, list: todo})
         : (to = {id: to.id, list: to.list}) )
           console.log("update todo: ",updateToDo);
         setTodos(updateToDo)
         setEditId(0)
         setTodo('')
         }
       }
    }

    const inputRef = useRef('null')

    useEffect(() => {
        inputRef.current.focus();
    })

    const onDelete= (id)=> { 
       setTodos( todos.filter((todo)=> todo.id !== id)) //to display all the todos except the todo whose id matches to the id passed when we click delete button
    }

    const onComplete= (id)=> {
         let complete = todos.map((item)=> {
            if(item.id === id){
                return ({...item, status: !item.status})
            }
            return item
         })
         setTodos(complete)
    }

    const onEdit= (id)=> {

        let editToDo = todos.find((to)=> to.id === id)
        console.log("edit id ",editToDo.list);
        setTodo(editToDo.list)
        setEditId(editToDo.id)
       console.log(editToDo);
    }

    return (

        <div className='container'>
            <h2 className='heading' >TODO APP</h2>
            <form onSubmit={handleSubmit}>
                <input className='todoInput' type='text' ref={inputRef} value={todo} placeholder='Enter your task for today' onChange={(event) => setTodo(event.target.value)} />
                <button className='addbutton' onClick={addTodo} > {editId? 'EDIT': 'ADD'} </button>
            </form>

            <div className='list'>
                <ul>
                    {todos.map((item) => {
                      
                      return <li key={item.id} className='list-items'>
                             <div className='list-item-list' id={item.status? 'list-item': ''} >{item.list}</div>
                            <span> 
                            <IoMdDoneAll className='list-item-icons' id='complete' title='complete' onClick={()=> onComplete(item.id)} /> 
                            <FaRegEdit className='list-item-icons' id='edit' title='edit' onClick={()=> onEdit(item.id)} /> 
                            <MdDeleteForever className='list-item-icons' id='delete' title='delete' onClick={()=> onDelete(item.id)} /> </span>
                        </li>
                    })
                    }
                </ul>
            </div>
        </div>
    )
}