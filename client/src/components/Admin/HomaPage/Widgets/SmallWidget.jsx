import React from 'react'
import st from './SmWidget.module.css'
import { Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function SmallWidget({user}) {
    const nav=useNavigate()
    const onButton=(id)=>{
        nav('/adminView/user/'+id)
    }
    return (
        <div className={st.SmWidget}>
            <span className={st.SmWidgetTitle}>New Joining Users</span>
            <ul className={st.SmWidgetList}>
                {user.length?user?.map(p=>{
                    return(
                        <li className={st.SmWidgetListItem}>
                        {p.image?<img
                            src={p.image}
                            alt="Foto de perfil"
                            className={st.SmWidgetImg}
                        />:<img
                        src="https://cdn-images.livecareer.es/pages/foto_cv_lc_es_4.jpg"
                        alt="Foto de perfil"
                        className={st.SmWidgetImg}
                    />}
                       
                        <div className={st.SmWidgetUser}>
                            <span className={st.SmWidgetUsername}>
                            {p.fullName}
                            </span>
                            <span className={st.SmWidgetUserCountry}>Colombia</span>
                        </div>
                        <button onClick={()=>{onButton(p.id)}} className={st.SmWidgetButton}>
                            <Visibility className={st.SmWidgetIcon}
                             />
                            Profile
                        </button>
                    </li>
                    )
                })
                
                :null}               
            </ul>
        </div>
    )
}
