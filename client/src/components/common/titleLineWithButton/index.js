import React from 'react'
import './TitleLine.css'

const TitleLineWithButton = ({ titleName, buttonName, svg, button, seemore }) => {
    return (
        <div className='title-line'>
            <h2 className='title'>{titleName}</h2>
            { button &&
                <button className='title-button'>
                    {svg}
                    {buttonName}
                </button>
            }
            { seemore &&
                <button className='button-see-more'>See more</button>
            }
        </div>
    )
}

export default TitleLineWithButton
