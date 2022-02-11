import React,{useRef, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import useHanlderClickOutSide from '../../hooks/useHanlderClickOutSide'

export default function SideBar() {
  const [showSideBar, setShowSidebar] = useState(false)
  const funcHanlderOutSide = () =>{
    setShowSidebar(false)
  }
  const wrapperRef = useRef(null);
  useHanlderClickOutSide(wrapperRef, funcHanlderOutSide);
  return (
    <div className='side-bar'>
        <div className='icon' onClick={()=>{
            setShowSidebar(!showSideBar)
        }}>
            <FontAwesomeIcon icon={faBars} size="lg" color={showSideBar ? "#999e99" : "black"}/>
        </div>
        <div className={showSideBar ? "wrap-list active" : "wrap-list"} ref={wrapperRef}>
            <div className="list">
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>
        </div>
       
        
    </div>
  )
}
