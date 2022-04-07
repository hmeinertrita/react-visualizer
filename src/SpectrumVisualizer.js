import React from 'react'
import { useSmoothedSpectrum, useAudioSpectrum, useSmoothedAverage } from './AudioSpectrumContext'

const SpectrumVisualizer = props => {
    const widthFrequency = useSmoothedAverage(props.widthFrequency || 0.75, props.widthSampleSize || 0.05, props.smoothing || 10)
    const heightFrequency = useSmoothedAverage(props.heightFrequency || 0.25, props.heightSampleSize || 0.05, props.smoothing || 10)
    const smoothedSpectrum = useSmoothedSpectrum(props.smoothing || 10, props.resolution || 512)
    const audioSpectrum = useAudioSpectrum(props.resolution || 512)

    let spectrum  = props.smoothed ? smoothedSpectrum : audioSpectrum

    if (props.mirror) {
        const newAudioSpectrum = []
        for (let i = 0; i < spectrum.length; i += 2) {
            newAudioSpectrum.push(spectrum[i])
            newAudioSpectrum.unshift(spectrum[i])
        }
        spectrum = newAudioSpectrum
    }

    const bars = []
    for (let i = 0; i < audioSpectrum.length; i++) {
        bars.push(
            <div className='spectrumVisualizer-bar' style={{
                '--frequency': spectrum[i]
            }}>
                <div className='spectrumVisualizer-barColor cyan screen'></div>
                <div className='spectrumVisualizer-barColor magenta screen'></div>
                <div className='spectrumVisualizer-barColor yellow screen'></div>
            </div>
        )
    }

    return <div className={'spectrumVisualizer'} style={{
        '--widthFrequency': props.widthDisabled ? 0 : widthFrequency,
        '--heightFrequency': props.heightDisabled ? 0 : heightFrequency
    }}>
        <div className={'spectrumVisualizer-shake cyan'}></div>
        <div className={'spectrumVisualizer-shake magenta'}></div>
        <div className={'spectrumVisualizer-shake yellow'}></div>
        <div className={'spectrumVisualizer-spectrum'}>{bars}</div>
    </div>
}

export default SpectrumVisualizer