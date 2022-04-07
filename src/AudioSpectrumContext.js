import React, {useRef, useEffect, createContext, useContext, useState} from 'react'
import useAnimationFrame from './useAnimationFrame'

const audioSpectrumContext = createContext({})
const AudioContextClass = (window.AudioContext || window.webkitAudioContext)

const AudioSpectrumProvider = (props) => {
    const audioAnalyserRef = useRef()
    const audioElementRef = useRef()
    const [frequencyData, setFrequencyData] = useState(new Uint8Array(props.resolution))
    const [deltaTime, setDeltaTime] = useState(0)

    useAnimationFrame(newDeltaTime => {
        let newFrequencyData = new Uint8Array(props.resolution)
        audioAnalyserRef.current.getByteFrequencyData(newFrequencyData)
        setFrequencyData(newFrequencyData)
        setDeltaTime(newDeltaTime)
    })

    const initializeAudio = src => {
        if (audioElementRef.current) {
            audioElementRef.current.pause()
        }
        const newAudioElement = new Audio()
        newAudioElement.src = src
        newAudioElement.volume = 0.5
        newAudioElement.onended = () => { 
            //buttonText.textContent = 'PLAY'
            //playButton.classList.remove('paused')
            console.log('ended')
            newAudioElement.currentTime = 0
        }

        const audioContext = new AudioContextClass()
        const source = audioContext.createMediaElementSource(newAudioElement)
        const newAnalyser = audioContext.createAnalyser()
        source.connect(newAnalyser)
        newAnalyser.connect(audioContext.destination)

        audioAnalyserRef.current = newAnalyser
        audioElementRef.current = newAudioElement
    }

    useEffect(() => {
        initializeAudio(props.src)
    }, [props.src])

    useEffect(() => {
        if (audioElementRef.current) {
            if (props.playing) {
                audioElementRef.current.play()
            }
            else {
                audioElementRef.current.pause()
            }
        }
    }, [props.playing])

    return <audioSpectrumContext.Provider value={{
        audioElement: audioElementRef.current,
        audioAnalyser: audioAnalyserRef.current,
        frequencyData: frequencyData,
        deltaTime: deltaTime
    }}>{props.children}</audioSpectrumContext.Provider>
}

const useAudioSpectrum = resolution => {
    const { frequencyData, audioAnalyser } = useContext(audioSpectrumContext)
    if (!resolution) {
        return frequencyData
    }
    
    let newFrequencyData = new Uint8Array(resolution)
    if (audioAnalyser) {
        audioAnalyser.getByteFrequencyData(newFrequencyData)
    }
    return newFrequencyData
}

const useSmoothedSpectrum = (smoothedFrames, resolution) => {
    const meansRef = useRef([])
    const smoothedData = []
    const frequencyData = useAudioSpectrum(resolution)
    
    if (frequencyData.length !== meansRef.current.length) {
        meansRef.current = []
        for (let i = 0; i < frequencyData.length; i++) {
            meansRef.current.push([])
        }
        return frequencyData
    }
    else {
        for (let i = 0; i < frequencyData.length; i++) {
            meansRef.current[i].push(frequencyData[i])
            while (meansRef.current[i].length > smoothedFrames) {
                meansRef.current[i].shift()
            }

            let sum = 0
            for (let j = 0; j < meansRef.current[i].length; j++) {
                sum += meansRef.current[i][j]
            }

            const smoothedFrequency = sum / meansRef.current[i].length
            smoothedData.push(!isNaN(smoothedFrequency) ? smoothedFrequency : 0)
        }
        return smoothedData
    }
}

const useSmoothedAverage = (mean, sampleSize, smoothedFrames) => {
    const smoothedData = useSmoothedSpectrum(smoothedFrames)
    const meanIndex = Math.floor(smoothedData.length * mean)
    const sampleLength = Math.floor(smoothedData.length * sampleSize)
    const startIndex = Math.max(Math.floor(meanIndex - (sampleLength / 2)), 0)
    const endIndex = Math.min(Math.ceil(meanIndex + (sampleLength / 2)), smoothedData.length)
    let sum = 0
    for (let i = startIndex; i < endIndex; i++) {
        sum += smoothedData[i]
    }
    return sum / (endIndex - startIndex)
}

const useDeltaTime = () => {
    return useContext(audioSpectrumContext).deltaTime
}

export { useAudioSpectrum, useSmoothedSpectrum, useSmoothedAverage, useDeltaTime, AudioSpectrumProvider }