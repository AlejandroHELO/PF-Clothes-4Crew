import React from 'react'
import st from './HomeAdmin.module.css'
import FeaturedInfo from './FeaturedInfo'
import Chart from './Chart'
import SmallWidget from './Widgets/SmallWidget'
import LargeWidget from './Widgets/LargeWidget'
import { userData } from '../../../dummyData'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchases,getUsers } from '../../../redux/actions'
import { useAuth0 } from '@auth0/auth0-react'

export default function HomeAdmin() {
const dispatch=useDispatch()
const purchases =useSelector(f=>f.purchases)
const {getAccessTokenSilently} = useAuth0()
const userLogged = useSelector(state=>state.userLogged)

React.useEffect(() => {
    dispatch(getUsers(getAccessTokenSilently ,userLogged._id))
}, [getUsers, userLogged])
let user=[]
const allUsers = useSelector((state) => state.users)
user=allUsers.reverse().slice(0,4)
let [data,setdata]=React.useState([])
let filterpurchases=purchases.slice(0,5)
React.useEffect(()=>{
    !purchases.length?dispatch(getPurchases()):console.log('epa')
    purchases.length&&!data.length?setdata(userData(purchases,new Date().getFullYear())):console.log('FALTA ALGUN DATO')
},[data,purchases,dispatch])

    return (
        <div className={st.HomeAdmin}>
            <FeaturedInfo />
            <Chart
                title="Purchases Analytics"
                data={data}
                dataKey="Active users"
                grid
            />
            <div className={st.homeWidgets}>
               {user.length? <SmallWidget user={user} />:null}
                {filterpurchases.length?<LargeWidget
                    compras={filterpurchases}
                />:null}
            </div>
        </div>
    )
}
