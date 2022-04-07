import React from 'react'
import { useSmoothedAverage } from './AudioSpectrumContext'

const BorderVisualizer = props => {
    const cyanFrequency = useSmoothedAverage(0.6, 0.01, 10)
    const magentaFrequency = useSmoothedAverage(0.65, 0.01, 10)
    const yellowFrequency = useSmoothedAverage(0.7, 0.01, 10)
    return <div className={'borderVisualizer'} style={{
        '--cyanFrequency': props.wild ? cyanFrequency : 0,
        '--magentaFrequency': props.wild ? magentaFrequency : 0,
        '--yellowFrequency': props.wild ? yellowFrequency : 0
    }}>
        <div className={'borderVisualizer-container'}>
            <div className={'borderVisualizer-shake cyan screen'}></div>
            <div className={'borderVisualizer-shake magenta screen'}></div>
            <div className={'borderVisualizer-shake yellow screen'}></div>
            {props.children}
        </div>
    </div>
}

export default BorderVisualizer