import React, { useEffect, useState } from 'react'
import '../src/index.css'
import { AiFillDelete} from 'react-icons/ai';
import {IoMdAdd } from 'react-icons/io';
import {BiEdit} from 'react-icons/bi';





const getLocalItems = () =>{
    let list = localStorage.getItem('lists');
    console.log(list)
    if (list){
        return JSON.parse(localStorage.getItem('lists'));
    }

else{
    return [];
}

}


const InputField = () => {

const [textValue,setTextValue] = useState('')
const [todoValue,setodoValue] = useState(getLocalItems());
const [toggleSubmit, setToggle] = useState(true)
const [idValue,setidValue] = useState(null);

const SubmitText = ()=>{
    console.log('sub')
  
    if(!textValue){
        console.log("empty")
    } 
    else if(textValue && !toggleSubmit) {
setodoValue(
    todoValue.map((elem)=>{
        if(elem.id===idValue){
            return { ...elem, name:textValue}
        }
        return elem;
    })
)
setToggle(true)
    }

    
    
    else {
        if(textValue.length < 70){

          

        
          const textValueInput = {id:new Date().getTime().toString(),name:textValue}
setodoValue([...todoValue,textValueInput])
setTextValue('')
        }
        else{
            alert('less text pls')
        }
    }

}

const deleteItem=(e_id)=>{
    const updateItems = todoValue.filter((elem)=>{
        return e_id !== elem.id
    })
    setodoValue(updateItems)
}


const editItem = (e_id)=>{
    let newEditItem = todoValue.find((elem)=>{
        return elem.id ===e_id
    });
    console.log(newEditItem,"xxx")
     setToggle(false)
     setTextValue(newEditItem.name)
     setidValue(e_id)
     console.log("debug",newEditItem.name)

}



useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(todoValue))
},[todoValue])



  return (
    <>
     <div><h2>To-DO using ReactUseState</h2></div>

    <div className='InputHeader'>
  
    <input size="25" className='' placeholder='Enter To-Do Task here' value={textValue } onChange={(e)=>setTextValue(e.target.value)}
   
    /> 
     {toggleSubmit?<button  onClick={SubmitText
    
    }  > <IoMdAdd  size={25}/></button>:   <button className='edititems'  onClick={SubmitText}  > < BiEdit size={25}/> </button>}


   

   


    </div>

    <div className='showItems'>

{
 todoValue.map((elem)=>{
    
    return (
        <div className='eachItem' key={elem.id}>
            <h7  className='eachItem-item'>{elem.name}</h7>
            <div className='right-icons'>
            <button className='deleteitem' onClick={()=>deleteItem(elem.id)}><AiFillDelete/></button>
             <button className='edititem'  onClick={()=>editItem(elem.id)}  > < BiEdit size={25}/></button>
             </div>
        </div>
    )
 })

}
    </div>
    </>
  )
}

export default InputField