import React,{useEffect,useReducer,useState} from 'react';
import userApi from './api/userApi';
import { ListParams, User } from './models';
import './App.scss';
import { Table } from 'react-bootstrap';
import Item from './components/Item';
import isEmpty from 'lodash/isEmpty';
import { PaginationComponent } from './components/PaginationComponent';
import { ITEM_PER_PAGE, TOTAL_USER } from './constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import ModalAdd from './components/Modal';
import SideBar from './components/SideBar';

 interface ActionModel {
   type: string;
   payload?: any
 }


function App() {
  const [params, setParams] = useState<ListParams>({
    page :1,
    limit :ITEM_PER_PAGE
  });
  const [show, setShow] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false)
  const initialState = {users: null};
  const userReducer = (state:any, action:ActionModel) => {
    switch (action.type) {
      case 'ONLOAD_SUCCES':
        return {
          ...state,
          users:action.payload
        }
      case 'ADD_USER_SUCCESS':
        return {
          ...state,
          users:[action.payload, ...state.users]
        }  
      default:
        throw new Error("Load data error");
    }
  }
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUserData = async (params:ListParams) => {
    const data_params:ListParams = {
      page:params.page,
      limit:params.limit
    }
    const res = await userApi.getAll(data_params)
    if(res){
      dispatch({
        type : "ONLOAD_SUCCES",
        payload : res
      })
    }
  }

  useEffect(()=>{
    try {
      getUserData(params)
    } catch (error) {
      console.log(error)
    }
    
  },[params])


  const setActiveItem = (activeNumber:number) =>{
    setParams({
      ...params,
      page:activeNumber
    })
  }

  const handleShow = async () =>{
    setShow(true)
    setIsAddSuccess(false)
  }

  const handleClose = () =>{
    setShow(false)
  }

  const onsubmitAddUser = async(infoUser:User) =>{
      const res = await userApi.add({
        email: infoUser.email,
        position:infoUser.position
      })

    if(res && !isEmpty(res)){
      dispatch({
        type: "ADD_USER_SUCCESS",
        payload: res
      })
      setIsAddSuccess(true)
      handleClose()
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='EXAMPLE_1'>
          <h3>Example css</h3>
          <SideBar />
        </div>
        <div className='EXAMPLE_2'>
          <h3>Example typescript</h3>
          <div className='custome-table'>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    state && !isEmpty(state.users) && state.users.map((item:User)=>{
                      return <Item key={item.id} item={item}/>
                    })
                  }
                </tbody>
              </Table>
              <div className='sc-add-item'>
                <div className='add-item' onClick={handleShow}>
                  <FontAwesomeIcon icon={faCirclePlus} size='2x' color='#fff'/>
                  <span>Add New</span>
              </div>     
            </div>
          </div>
          <PaginationComponent totalUser={TOTAL_USER} setActiveItem={setActiveItem}/>
          <ModalAdd show={show} handleClose={handleClose} isAddSuccess={isAddSuccess} onsubmitAddUser={onsubmitAddUser}/>
        </div>
      
      </div>
      

      
    </div>
  );
}

export default App;
