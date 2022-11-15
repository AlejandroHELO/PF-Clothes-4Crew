import React from 'react'
import st from './HomeAdmin.module.css'
import FeaturedInfo from './FeaturedInfo'
import Chart from './Chart'
import SmallWidget from './Widgets/SmallWidget'
import LargeWidget from './Widgets/LargeWidget'
import { userData } from '../../../dummyData'
import { useSelector } from 'react-redux'

export default function HomeAdmin() {

const purchases =useSelector(f=>f.purchases)


    return (
        <div className={st.HomeAdmin}>
            <FeaturedInfo />
            <Chart
                title="User Analytics"
                data={userData(purchases,2022)}
                dataKey="Active users"
                grid
            />
            <div className={st.homeWidgets}>
                <SmallWidget />
                <LargeWidget />
            </div>
        </div>
    )
}
