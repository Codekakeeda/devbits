import React from 'react'
import "./tabOptions.css";
import Tabs from './tabs';

const tabs = [
  {
    id: 1,
    name: 'Stocks',
    link: 'stocks',
  },
  {
    id: 2,
    name: 'Crypto',
    link: 'crypto',
  },
  {
    id: 3,
    name: 'US Stocks',
    link: 'us-stocks',
  },
]
const TabOptions = ({ activeTab, setActiveTab }) => {
  return (
    <div className='tab-options'>
      <div className='max-width options-wrapper'>
        {
          tabs.map(
            (tab) => {
              return (
                  <Tabs tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} key={tab.id} />
              );
            }
          )
        }
      </div>
    </div>
  )
}

export default TabOptions
