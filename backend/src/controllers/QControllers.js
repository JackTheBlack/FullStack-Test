const client =require("../conexion/config");
const { response } = require('express');

const q1=  async (req, res)=>{

  const response=  await  client.query("select * from facilities")
  
  res.status(200).json(response.rows);
  

}


const q2=async(req,res)=>{


  try{
  const response=await client.query(`select f.facility_name, nurse_id, (sum(case when worked_shift then 1 else 0 end))-(sum(case when call_out then 1 else 0 end)*3)- (sum(case when no_call_no_show then 1 else 0 end)*5) as score   from clinician_work_history as c inner join facilities as f on f.facility_id=c.facility_id where c.facility_id=${req.query.facility_id} group by nurse_id, f.facility_name order by score desc  `)
  
 const aux=response.rows

    let nurseScore=[]

   /** for(let x=0;x<=aux.length-1;x++){
          let score=0;
          score=score+(aux[x].worked_shift)-(aux[x].call_out*3)-(aux[x].no_call_no_show*5)
        nurseScore.push({
          facility_name:aux[x].facility_name,
          nurse_id:aux[x].nurse_id,
          score:score
        })

    }
*/


res.status(200).json(response.rows)
}catch(e){
      console.log("ERROR!!",e);
    }
  

//      score=score+(response.rows[x].worked_shift*1)-(response.rows[x].call_out*3)      
      

           
    }
  

    const q4=  async (req, res)=>{

      const response=  await  client.query("select j.job_id, j.total_number_nurses_needed - count(nh.nurse_id) as jobs_not_covered from jobs as j inner join nurse_hired_jobs as nh on j.job_id=nh.job_id group by j.job_id order by j.job_id ASC")
      console.log(response.rows)
      res.status(200).json(response.rows);
      
    
    }
    
    const q5=async()=>{

      const response=await client.query("select n.nurse_id, n.nurse_name, n.nurse_type, count(j.job_id)- from nurses  as n inner join jobs as j on n.nurse_type=j.nurse_type_needed inner join nurse_hired_jobs as jh on jh.job_id=j.job_id  group by n.nurse_id, n.nurse_name")
      console.log(response.rows)
      res.status(200).json(response.rows);
      

    }

    const q6=async()=>{

      const response=await client.query("select n.nurse_id, n.nurse_name, n.nurse_type, count(j.job_id)- from nurses  as n inner join jobs as j on n.nurse_type=j.nurse_type_needed inner join nurse_hired_jobs as jh on jh.job_id=j.job_id  group by n.nurse_id, n.nurse_name")
      console.log(response.rows)
      res.status(200).json(response.rows);
      

    }

module.exports = {q1,q2,q4,q5,q6 };