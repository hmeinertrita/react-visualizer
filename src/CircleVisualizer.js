import React from 'react'
import { useSmoothedAverage } from './AudioSpectrumContext'

const CircleVisualizer = props => {
    const radiusFrequency = useSmoothedAverage(props.frequency || 0.2, props.sampleSize || 0.1, 30)
    const spreadFrequency = useSmoothedAverage(0.6, 0.1, 15)
    return <div className={'circleVisualizer' + (props.mirror ? ' mirror' : '')} style={{
        '--radiusFrequency': props.disabled ? 0 : radiusFrequency,
        '--spreadFrequency': props.wild ? spreadFrequency : 0
    }}>
        <div className={'circleVisualizer circle magenta'}></div>
        <div className={'circleVisualizer circle yellow'}></div>
        <div className={'circleVisualizer circle cyan'}></div>
        <div className={'circleVisualizer circle magenta'}></div>
    </div>
}

export default CircleVisualizer