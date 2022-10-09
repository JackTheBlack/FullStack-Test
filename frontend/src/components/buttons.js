import React from "react"
import axios from "axios"



export default function Buttons(){

  
      const handleQ4=async()=>{
  
        try{
        
          await axios.get(`http://localhost:9000/q4`).then((response) => {
             console.log(response.data)      
             alert("Query 4 executed")
           });
          
       } catch(e){
         console.log(e);
         alert("Something went Wrong")
       }}
    
  
       const handleQ5=async()=>{
  
        try{
        
          await axios.get(`http://localhost:9000/q5`).then((response) => {
             console.log(response.data)      
             alert("Query 5 executed")
           });
          
       } catch(e){
         console.log(e);
         alert("Something went Wrong")
       }}
    

       const handleQ6=async()=>{
  
        try{
        
          await axios.get(`http://localhost:9000/q6`).then((response) => {
             console.log(response.data)      
             alert("Query 6 executed")
             
           });
          
       } catch(e){
         console.log(e);
         alert("Something went Wrong")
       }}
    



return(
<>


<button type="button" className="btn btn-success" onClick={()=>handleQ4()}>Execute Q4 Query</button>    
    <button type="button" className="btn btn-primary" onClick={()=>handleQ5()}>*Execute Q5 Query</button> 
    <button type="button" className="btn btn-dark"  onClick={()=>handleQ6()}>Execute Q6 Query</button>



</>


)


}
