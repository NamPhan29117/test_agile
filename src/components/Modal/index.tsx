import React,{useEffect, useState} from 'react'
import { Button,Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { User } from '../../models';
import './style.scss'

interface ModalAddProps {
    show: boolean;
    handleClose: ()=>void;
    onsubmitAddUser: (infoUser:User)=>void;
    isAddSuccess: boolean
}

function ModalAdd(props:ModalAddProps) {
 const {show,handleClose,onsubmitAddUser,isAddSuccess} = props
 const { register, handleSubmit, formState: { errors },reset  } = useForm();
 const onSubmit = (data:any) => {
    onsubmitAddUser(data);

  };

  useEffect(()=>{
    if(isAddSuccess){
      reset({
        email:"",
        position:""
    })
    }
  },[isAddSuccess,reset])

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal Add item</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='custom-input'>
            <input placeholder='Please enter email' {...register("email", { required: true })} />
            {errors.email && <p>This field is required</p>}  
          </div>
          <div className='custom-input'>
            <input placeholder='Please enter position' {...register("position", { required: true })} />
            {errors.position && <p>This field is required</p>}
          </div>   
          <div className='btn-sbmit'>
            <input type="submit" />
          </div>
        </form>
    </Modal.Body>
    </Modal>
  )
}
export default ModalAdd