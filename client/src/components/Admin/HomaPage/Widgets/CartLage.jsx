import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers,getUsersAddress } from '../../../../redux/actions'
import './LgWidget.css'

export function CartLarge({userId,time}){

    const Button = ({ type }) => {
        return <button className={`LgWidgetButton ${type}`}>{type}</button>
    }
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useDispatch()
    const userLogged = useSelector(state=>state.userLogged)

    React.useEffect(() => {
        dispatch(getUsers(getAccessTokenSilently ,userLogged._id))
    }, [getUsers, userLogged])
    let user=[]
    const allUsers = useSelector((state) => state.users)
    allUsers.length&&!user.length?user=allUsers.filter(f=>f.id===userId):console.log('falta usuarios')
    // const address = useSelector((state) => state.address)
    // address.length?addres=address.filter(f=>f._id===addresss):console.log('falta usuarios')
    // console.log('soy el usuario',user, 'soy el addres ',addres)
    return(
        user.length?<tr className="LgWidgetTr">
        <td className="LgWidgetUser">
               {user[0].image?<img
                            src={user[0].image}
                            alt="Foto de perfil"
                            className="LgWidgetImg"
                        />:<img
                        src="https://cdn-images.livecareer.es/pages/foto_cv_lc_es_4.jpg"
                        alt="Foto de perfil"
                     className="LgWidgetImg"
                    />}
            <span className="LgWidgetName">
                {user[0].fullName}
            </span>
        </td>
        <td className="LgWidgetDate">{time}</td>
        {/* <td className="LgWidgetCountry">{addres[0].city}</td> */}
        <td className="LgWidgetStatus">
            <Button type="Approved" />
        </td>
    </tr>:
    <>cargando</>
  
    )
}