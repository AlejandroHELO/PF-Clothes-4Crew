import React from 'react'
import { CartLarge } from './CartLage'
import './LgWidget.css'

export default function LargeWidget({compras}) {
    const Button = ({ type }) => {
        return <button className={`LgWidgetButton ${type}`}>{type}</button>
    }

    return (
        <div className="LgWidget">
            <h3 className="LgWidgetTitle">Latest purchases</h3>
            <table className="LgWidgetTable">
                <tr className="LgWidgetTr">
                    <th className="LgWidgetTh">User</th>
                    <th className="LgWidgetTh">Date</th>
                    {/* <th className="LgWidgetTh">Country</th> */}
                    <th className="LgWidgetTh">Status</th>
                </tr>
                {   compras.length?compras?.map(p=>{
                    return(
                        <CartLarge
                        userId={p.userId}
                        state={p.state}
                        addresss={p.addresId}
                        time={p.time}
                        />
                    )
                    })  
                    : 
                    null
                }
            </table>
        </div>
    )
}
