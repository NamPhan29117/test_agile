import React,{useCallback, useRef, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import useHanlderClickOutSide from '../../hooks/useHanlderClickOutSide'

export default function SideBar() {
  const [showSideBar, setShowSidebar] = useState(false)
  const wrapperRef = useRef(null);

  const funcHanlderOutSide = () =>{
    setShowSidebar(false)
  }

  const hanlderClick = useCallback(() =>{
    setShowSidebar((prevState)=> !prevState)
  },[])

  useHanlderClickOutSide(wrapperRef, funcHanlderOutSide);
  

  return (
    <div className='side-bar' ref={wrapperRef}>
        <div className='icon' onClick={hanlderClick}>
            <FontAwesomeIcon icon={faBars} size="lg" color={showSideBar ? "#999e99" : "black"}/>
        </div>
        <div className={showSideBar ? "wrap-list active" : "wrap-list"}>
            <div className="list">
                <ul>
                    <li>
                      <a href='https://www.usnews.com/'> link 1</a>
                    </li>
                    <li>
                      <a href='https://www.theknot.com/'>link 2</a>
                    </li>
                    <li>
                      <a href='https://blog.logrocket.com/'>link 3</a>
                    </li>
                    <li>
                      <a href='https://www.udemy.com/'> link 4</a>
                    </li>
                    <li>
                      <a href='https://developer.android.com/'>link 5</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
