import React from 'react'
import { Link, useNavigate, useParams, } from 'react-router-dom'
import { useEffect } from 'react'
import './addcontact.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState} from 'react'

const initialstate = {
  name: '',
  email: '',
  contact: '',
}

const Addcontact = () => {
    const [state, setState] = useState(initialstate)

    const {name,email,contact}= state;
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
      
    axios.get(`https://aqueous-oasis-40007.herokuapp.com/api/get/${id}`)
    .then((resp)=> setState({...resp.data[0]}))
     
    }, [id])
    

    const submitform =(e)=>{

        e.preventDefault();
        
    if(!name || !email || !contact) {
      toast.error('input value into each fields');
    }else {
      if (!id) {
        axios.post('https://aqueous-oasis-40007.herokuapp.com/api/post',{
        name,email,contact
      }).then(()=>{
        setState({name:'',email:'',contact:''});
      }).catch((err)=>toast.error(err.response.data));
      toast.success('Contact Added Successfully')
      setTimeout(()=>navigate('/'),500);
      } else {
        axios.put(`https://aqueous-oasis-40007.herokuapp.com/api/update/${id}`,{
        name,email,contact
      }).then(()=>{
        setState({name:'',email:'',contact:''});
      }).catch((err)=>toast.error(err.response.data));
      toast.success('Contact Updated Successfully')
      setTimeout(()=>navigate('/'),500);
      }
      
    }
  }


  const handleclick = (e)=>{
    const {name,value}= e.target;
    setState({...state,[name]:value})
  }

  


  return (
    <div>
    <article class="pa4 black-80">
  <form action="sign-up_submit" onSubmit={submitform}>
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
      <div class="mt3">
      <label class="db fw4 lh-copy f6" for="name">Name</label>
      <input class="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name" value={name || ""}  id="name" onChange={handleclick}/>
    </div>
      <div class="mt3">
        <label class="db fw4 lh-copy f6" for="email-address">Email address</label>
        <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" value={email || ''} id="email-address" onChange={handleclick}/>
      </div>
      <div class="mt3">
        <label class="db fw4 lh-copy f6" for="password">Contact</label>
        <input class=" pa2 input-reset ba bg-transparent w-100 measure" type="text" name="contact" value={contact || ''}  id="contact" onChange={handleclick}/>
      </div>
    </fieldset>
    <div class="mt3"><input class=" ph3 pv2 input-reset ba b--black  grow pointer f6 w-100 measure bg-green" type="submit" value={id ? 'update contact': 'save'} /></div>
    <Link to='/'>
    <div class="mt3"><input class=" ph3 pv2 input-reset ba b--black white grow pointer f6 w-100 measure bg-black" type="submit" value="Go Back"/></div>
    </Link>
   
    
  </form>
</article>

    </div>
  )
}

export default Addcontact