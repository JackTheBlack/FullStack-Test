import React,{useState,useEffect} from "react"
import axios from "axios"


export default function Task3(){



    const [facility,setFacility]=useState(null);
    const [facilities,setFacilities]=useState(null);
    const [nurses,setNurses]=useState(null);
  
    useEffect(() => {
      if(facilities===null){
       try{
        
        axios.get(`http://localhost:9000/q1`).then((response) => {
          setFacilities([...response.data]);      
          
             
          
        });
       
    } catch(e){
      console.log(e);
    }}
    });


    
  const handleSubmit=async( facility_id )=>{
    try{
      
      await axios.get(`http://localhost:9000/q2`,{params:{facility_id:facility_id}}).then((response) => {
         setNurses([...response.data]);      
         
       
         
       });
      
   } catch(e){
     console.log(e);
   }}


 


  const  handleChange=(event)=> {
      setFacility( event.target.value);
    
    }





return(
<>


    {facilities===null?<>cargando....</>:<>
   
    <div>
     
    
    
          <select name="facilities"  onChange={handleChange}>
          <option value="">Select option</option>
            {facilities.map((op)=><option value={op.facility_id}> {op.facility_id} </option>)}
           
           
          </select>
          
            <p >{facility}</p>
              <br/>
       
           <button type="button" className="btn btn-primary" onClick={()=>handleSubmit(facility)}>Choose</button>
             
    
       
    
          {nurses===null?
          <>
          </>:
          <>
    <table>
    <tr>
    <th>Facility Name</th>
    <th>Nurce Id</th>
    <th>Score</th>
    </tr>
    
    {nurses.map((n)=><tr>
    <td>{n.facility_name} </td>
    <td>{n.nurse_id} </td>
    <td>{n.score} </td>
    </tr>)}
    
    
    </table>
    
          </>}
    
        </div>
    </>}

</>


)





}

