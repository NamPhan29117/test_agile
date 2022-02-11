import React from 'react'
import { User } from '../../models'

interface ItemProps {
    item:User;
    key:string | number
}

export const Item = (props: ItemProps) => {
    const {item} = props
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.email}</td>
            <td>{item.position}</td>
          </tr>
    )
}
