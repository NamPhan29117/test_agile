import React,{useEffect,useReducer,useState} from 'react';
import userApi from './api/userApi';
import { ListParams, User } from './models';
import './App.css';
import { Table } from 'react-bootstrap';
import { Item } from './components/Item';
import isEmpty from 'lodash/isEmpty';
import { PaginationComponent } from './components/PaginationComponent';
import { ITEM_PER_PAGE, TOTAL_USER } from './constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'

 interface ActionModel {
   type: string;
   payload?: any
 }


function App() {
  const [params, setParams] = useState<ListParams>({
    page :1,
    limit :ITEM_PER_PAGE
  });
  const initialState = {users: null};
  const userReducer = (state:any, action:ActionModel) => {
    switch (action.type) {
      case 'ONLOAD_SUCCES':
        return {
          ...state,
          users:action.payload
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

  return (
    <div className="App">
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
      <PaginationComponent totalUser={TOTAL_USER} setActiveItem={setActiveItem}/>
      <div className='add-item'>
        <FontAwesomeIcon icon={faCirclePlus} size='2x' color='#0d6efd'/>
        <span>Add New</span>
      </div>
      
    </div>
  );
}

export default App;
