import React from 'react'
import './home.css'
import axios from 'axios'
import { useState,useEffect} from 'react'
import { Link} from 'react-router-dom'
import { toast } from 'react-toastify'

 

const Home = () => {
    const [contact, setContact] = useState([])
    const url = 'https://aqueous-oasis-40007.herokuapp.com/api/get'

    const loadData = async () =>{
        const response = await axios.get(url);
        setContact(response.data)
    }
    

useEffect(() => {
 loadData();

}, [])

const deletecontact=(id)=>{
  if (window.confirm('confirm delete contact!!')) {
    axios.delete(`https://aqueous-oasis-40007.herokuapp.com/api/remove/${id}`);
    toast.success('contact deleted successfully');
    setTimeout(()=>loadData(),500)
  }
}



  return (
    <div>
    <Link to='/addcontact'>
          <a class="f6 link dim ph3 pv2 mb2 dib ma3 br2 black bg-blue" href="#0">Addcontact</a>
          </Link>
    <div class="pa4 pt2">
    <div class="overflow-auto">
      <table class="f6 w-100 mw8 center" cellspacing="0">
        <thead className='bg-green'>
          <tr>
            <th class="fw6 bb b--black-20  pb3 pv2 mr1 bg-green">ID</th>
            <th class="fw6 bb b--black-20  pb3 pv2  bg-green">NAME</th>
            <th class="fw6 bb b--black-20  pb3 pv2  bg-green">EMAIL</th>
            <th class="fw6 bb b--black-20  pb3 pv2  bg-green">NUMBER</th>
            <th class="fw6 bb b--black-20  pb3 pv2  bg-green">ACTIONS</th>
          </tr>
        </thead>
    {
        contact ? contact.map((contacts,idx)=>(
           
      <tbody class="lh-copy">
        <tr key={contact.id} >
          <td class="pv3 pr3 bb b--black-20">{idx+1}</td>
          <td class="pv3 pr3 bb b--black-20">{contacts.name}</td>
          <td class="pv3 pr3 bb b--black-20">{contacts.email}</td>
          <td class="pv3 pr3 bb b--black-20">{contacts.contact}</td>
          <td class="pv3 pr3 bb b--black-20">
          <Link to={`/update/${contacts.id}`}>
          <a class="f6 link dim ph3 pv2 mb2 br2 dib ma3 black bg-light-blue" href="#0">Edit</a>
          </Link>
          <a class="f6 link dim ph3 pv2 mb2 dib br2 ma3 black bg-red" href="#0" onClick={()=>deletecontact(contacts.id)}>Delete</a>
          <Link to={`/view/${contacts.id}`}>
          <a class="f6 link dim ph3 pv2 mb2 dib ma3 br2 black bg-gray" href="#0">view</a>
          </Link>
          </td>
        </tr>
      </tbody>
  
 

         )): null
    }
    

    </table>
    </div>
    </div>
    </div>
  )
}

export default Home