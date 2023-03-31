import React from 'react'
import "./tabs.css"
import { Link } from 'react-router-dom'
const Tabs = ({tab, activeTab, setActiveTab }) => {
    return (
        <Link to={`../explore/${tab.link}`} className={`tab-item absolute-center cursor-point ${activeTab === tab.name && 'active-tab'
            }`} onClick={() => setActiveTab(tab.name)}>
            <div className='tab-name'>{tab.name}</div>
        </Link>
    )
}

export default Tabs
