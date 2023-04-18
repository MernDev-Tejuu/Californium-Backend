import React ,{useEffect , useState}from 'react'
import { useNavigate } from 'react-router-dom'
import {  FaTransgenderAlt } from "react-icons/fa";
import {  MdCall  } from "react-icons/md";
import {  AiOutlineUser  } from "react-icons/ai";
import {  FcBusinessman ,FcCalendar,FcCellPhone,FcNeutralDecision} from "react-icons/fc";
import '../components.js/Login' 
// import About from '../components.js/About'
const About =()=>{
   
     const sendTo = useNavigate()
    const [fetchData , setData]=useState({})
    
  const useEffectCall = async()=>{
    try{ 
        const res = await  fetch('/about',{
            method:'GET',
            headers:{ 
                Accept:'application/json', 
                'Content-Type':'application/json'
            },
            credentials:'include'

           
        })

        
        const data = await res.json()
        setData(data)
        
        if(!res.status===200){
            window.alert('Oops,No Data Found,Make sure you are a user or not')
        }else if(res.status===500){
            window.alert('Internal server error') 
        }
        
    }catch(err){
 
   sendTo('/login')   
    }
}
 
    useEffect(()=>{
        useEffectCall()
    },[])
    
    
    return (
        <div className='About-Main-Background'>
            <div className='About-inner-div'>
               
            <div className='About-inner-child-image'><div id='inner-image-icon'><AiOutlineUser/></div></div>
                <div className='About-personal-info' method='GET'>
               <fieldset id='About-Fieldset'>
                <legend>
                HELLO EVERYONE,I AM
                </legend>
               <ul>
                
                <li id='About-Input'><h1>{fetchData.firstName+" "+fetchData.lastName}</h1></li>
                <li id='About-Input-separate'><FcBusinessman/>: MERN Developer,UX</li>
                <li id='About-Input-separate'><FcCalendar /> : {fetchData.age}</li>
                <li id='About-Input-separate'><FcCellPhone /> : {fetchData.phone}</li>
                <li id='About-Input-separate'><FcNeutralDecision /> : {fetchData.gender}</li>
               </ul>
               </fieldset>
                </div>
                
            </div>
        </div>
    )
}
export default About