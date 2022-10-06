import React,{useState,useEffect} from "react"
import axios from "axios";
function App() {


  const [facility,setFacility]=useState(null);
  const [facilities,setFacilities]=useState(null);
  const [nurses, setNurses]=useState(null);

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

    const handleQ4=async()=>{

      try{
      
        await axios.get(`http://localhost:9000/q4`).then((response) => {
           console.log(response.data)      
           
         
           
         });
        
     } catch(e){
       console.log(e);
     }}
  

  return (
    <>
   <div>
    {facilities===null?<>cargando....</>:<>
   
    <div>
     
   
 
          <select name="facilities"  defaultValue=" " onChange={handleChange}>
           
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

    <button type="button" className="btn btn-success" onClick={()=>handleQ4()}>Execute Q4 Query</button>    
        <button type="button" className="btn btn-primary" onClick={()=>console.log("q5")}>Execute Q5 Query</button> 
        <button type="button" className="btn btn-primary" onClick={()=>console.log("q5")}>Execute Q6 Query</button>

    </div>

    </>
  );
}

export default App;
