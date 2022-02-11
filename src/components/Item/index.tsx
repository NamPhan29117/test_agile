import React from 'react'
import { User } from '../../models'

interface ItemProps {
    item:User;
    key:string | number
}

const Item = (props: ItemProps) => {
    const {item} = props
    console.log("render", item.id)

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.email}</td>
            <td>{item.position}</td>
          </tr>
    )
}

export default React.memo(Item)
