import React, { useRef } from 'react'
import { useSmoothedAverage, useDeltaTime } from './AudioSpectrumContext'

const TextVisualizer = props => {
    const waveFrequency = useSmoothedAverage(0.4, 0.05, 10)
    const deltaTime = useDeltaTime()
    const scrollRef = useRef(0)

    const letterWidth = props.letterWidth || 16
    const text = props.scrollSpeed ? '     ' + props.text : props.text
    scrollRef.current = (scrollRef.current + (deltaTime * (props.scrollSpeed || 0) / 1000)) % (text.length * letterWidth)

    const letters = []
    const wavelength = 7
    if (props.text) {
        for (let i = 0; i < text.length * 2; i++) {
            const index = i % text.length
            const character = text.charAt(index)
            const sinX = (index + (scrollRef.current / 10)) % wavelength / wavelength
            const sin = Math.sin(sinX * Math.PI * 2)
            letters.push(
                <div className={'letter' + (character === ' ' ? ' space' : '')} style={{
                    '--sin': sin,
                    width: letterWidth + 'px'
                }}>
                    <div className='letter-color'>
                        <div className='shake cyan'>{character}</div>
                        <div className='shake magenta'>{character}</div>
                        <div className='shake yellow'>{character}</div>
                    </div>
                </div>
            )
        }
    }
    

    return <div className={'textVisualizer'} style={{
        '--waveFrequency': props.wild ? waveFrequency : 0
    }}>
        <div className={'textVisualizer-letters'} style={{
            '--scroll': '-' + scrollRef.current + 'px'
        }}>
            {letters}
        </div>
    </div>
}

export default TextVisualizer