import { isEmpty } from 'lodash';
import React,{useState,useEffect, useMemo} from 'react'
import { Pagination } from 'react-bootstrap';
import { ITEM_PER_PAGE } from '../../constants';
import { User } from '../../models';
import './style.css'

interface PaginationProps {
    totalUser: number,
    setActiveItem:(activeNumber:number)=>void
}





export const PaginationComponent = (props: PaginationProps) => {
    const {totalUser,setActiveItem} = props
    const [pageCount, setPageCount] = useState(1)
    const [active, setActive] = useState(1)
    useEffect(()=>{
        if(totalUser){
            setPageCount(Math.ceil(totalUser / ITEM_PER_PAGE));
        }
    },[totalUser])



    const ItemPagination = useMemo(()=>{
        let items = [];
        for (let number = 1; number <= pageCount; number++) {
            items.push(
              <Pagination.Item key={number} active={number === active} onClick={()=>{
                setActive(number)
                setActiveItem(number)
              }}>
                {number}
              </Pagination.Item>,
            )
          }
          return items
    },[pageCount,active,setActiveItem])


    return (
        <div className='custom-pagination'>
            <Pagination>{ItemPagination}</Pagination>
        </div>
    )
}
