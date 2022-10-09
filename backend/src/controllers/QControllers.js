const client =require("../conexion/config");
const { response } = require('express');

const q1=  async (req, res)=>{

  const response=  await  client.query("select * from facilities")
  
  res.status(200).json(response.rows);
  

}


const q2=async(req,res)=>{


  try{
  const response=await client.query(`select f.facility_name, nurse_id, (sum(case when worked_shift then 1 else 0 end))-(sum(case when call_out then 1 else 0 end)*3)- (sum(case when no_call_no_show then 1 else 0 end)*5) as score   from clinician_work_history as c inner join facilities as f on f.facility_id=c.facility_id where c.facility_id=${req.query.facility_id} group by nurse_id, f.facility_name order by score desc , nurse_id desc  `)


res.status(200).json(response.rows)
}catch(e){
      console.log("ERROR!!",e);
    }    
           
    }
  

    const q4=  async (req, res)=>{

      const response=  await  client.query("select j.job_id, j.total_number_nurses_needed - count(nh.nurse_id) as jobs_not_covered from jobs as j inner join nurse_hired_jobs as nh on j.job_id=nh.job_id group by j.job_id order by j.job_id ASC")
      console.log(response.rows)
      res.status(200).json(response.rows);
      
    
    }
    
    const q5=async(req,res)=>{

      const response=await client.query(`
      select * from 
      
      (select q1.nurse_id, q1.nurse_name, q1.nurse_type, (ja-jh)as ja from
            (select n.nurse_id, n.nurse_name, n.nurse_type, count(j.job_id)as ja from nurses  as n
            inner join jobs as j on n.nurse_type=j.nurse_type_needed
            inner join nurse_hired_jobs as jh on jh.job_id=j.job_id 
            group by n.nurse_id, n.nurse_name) as q1
            
            inner join 
            (select nurse_id ,count (nurse_id) as jh from nurse_hired_jobs
            group by nurse_id order by nurse_id asc) as q2
            on q2.nurse_id=q1.nurse_id  
      
      union
      
      select q5.nurse_id,nurse_name,nurse_type, ja from (   select case when n.nurse_id not in (select nurse_id from nurse_hired_jobs group by nurse_id) 
                     then n.nurse_id end as nurse_id from nurses as n  group by nurse_id) as q5
               
        inner join
          (select n.nurse_id, n.nurse_name, n.nurse_type, count(j.job_id)as ja from nurses  as n
            inner join jobs as j on n.nurse_type=j.nurse_type_needed
            inner join nurse_hired_jobs as jh on jh.job_id=j.job_id 
            group by n.nurse_id, n.nurse_name) as q1 on q1.nurse_id=q5.nurse_id) as finalq order by nurse_id asc
          
          
      `)
      console.log(response.rows)
      res.status(200).json(response.rows);
      

    }

    const q6=async(req,res)=>{

      const response=await client.query(`
      select facility_name, n.nurse_name, mp from (
      
      select j.facility_id, nj.nurse_id,count(nj.nurse_id) as mp 
      from  nurse_hired_jobs as nj
      inner join jobs as j on j.job_id=nj.job_id 	
      group by j.facility_id, nj.nurse_id
      order by mp desc)  as q
      
      inner join facilities as f on f.facility_id=q.facility_id 
      inner join nurses as n on n.nurse_id=q.nurse_id
      group by facility_name, nurse_name,mp
      order by  mp DESC ,facility_name asc 
      limit (select count (*) from facilities)
      `)
      console.log(response.rows)
      res.status(200).json(response.rows);
      

    }

module.exports = {q1,q2,q4,q5,q6 };