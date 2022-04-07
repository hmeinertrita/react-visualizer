import React, { useState } from 'react'
import africa from './music/africa.mp3';
import that_way from './music/want_it_that_way.mp3';
import lay_down from './music/lay_down.mp3';
import oops from './music/oops_britney.mp3';
import seven from './music/seven_nation_army.mp3';
import old_town from './music/old_town.mp3';
import come_together from './music/come_together.mp3';
import { AudioSpectrumProvider } from './AudioSpectrumContext';
import BorderVisualizer from './BorderVisualizer';
import CircleVisualizer from './CircleVisualizer';
import SpectrumVisualizer from './SpectrumVisualizer';
import TextVisualizer from './TextVisualizer';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const DEFAULTS = {
    mirrored: false,
    spectrumSmoothing: 10,
    spectrumResolution: 128,
    circleLeftFrequency: 0.2,
    circleLeftSampleSize: 0.1,
    circleRightFrequency: 0.2,
    circleRightSampleSize: 0.1,
    spectrumWidthFrequency: 0.75,
    spectrumWidthSampleSize: 0.05,
    spectrumHeightFrequency: 0.25,
    spectrumHeightSampleSize: 0.05,
}

const SONGS = [
    {
        string: 'Want It That Way - Backstreet Boys',
        song: that_way
    },
    {
        string: 'Africa - Toto',
        song: africa
    },
    {
        string: 'Lay Down - Caravan Palace',
        song: lay_down
    },
    {
        string: 'Oops!...I Did It Again - Britney Spears',
        song: oops
    },
    {
        string: 'Seven Nation Army - The White Stripes',
        song: seven
    },
    {
        string: 'Old Town Road - Lil Nas X',
        song: old_town
    },
    {
        string: 'Come Together - The Beatles',
        song: come_together
    },
]

const Controls = props => {
    const [phase, setPhase] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [song, setSong] = useState(0)

    const [mirrored, setMirrored] = useState(DEFAULTS.mirrored)
    const [smoothed, setSmoothed] = useState(DEFAULTS.mirrored)
    const [spectrumSmoothing, setSpectrumSmoothing] = useState(DEFAULTS.spectrumSmoothing)
    const [spectrumResolution, setSpectrumResolution] = useState(DEFAULTS.spectrumResolution)
    const [spectrumWidthFrequency, setSpectrumWidthFrequency] = useState(DEFAULTS.spectrumWidthFrequency)
    const [spectrumWidthSampleSize, setSpectrumWidthSampleSize] = useState(DEFAULTS.spectrumWidthSampleSize)
    const [spectrumHeightFrequency, setSpectrumHeightFrequency] = useState(DEFAULTS.spectrumHeightFrequency)
    const [spectrumHeightSampleSize, setSpectrumHeightSampleSize] = useState(DEFAULTS.spectrumHeightSampleSize)
    const [circleLeftFrequency, setCircleLeftFrequency] = useState(DEFAULTS.circleLeftFrequency)
    const [circleLeftSampleSize, setCircleLeftSampleSize] = useState(DEFAULTS.circleLeftSampleSize)
    const [circleRightFrequency, setCircleRightFrequency] = useState(DEFAULTS.circleRightFrequency)
    const [circleRightSampleSize, setCircleRightSampleSize] = useState(DEFAULTS.circleRightSampleSize)
    const [wild, setWild] = useState(false)
    const [leftDisabled, setLeftDisabled] = useState(true)
    const [rightDisabled, setRightDisabled] = useState(true)
    const [widthDisabled, setWidthDisabled] = useState(true)
    const [heightDisabled, setHeightDisabled] = useState(true)

    const handleMirrorChange = (e, value) => {
        setMirrored(value)
    }
    const handleSmoothChange = (e, value) => {
        setSmoothed(value)
    }
    const handleSmoothingChange = (e, value) => {
        setSpectrumSmoothing(value)
    }
    const handleResolutionChange = (e, value) => {
        setSpectrumResolution(value)
    }

    const handleLeftFrequencyChange = (e, value) => {
        setCircleLeftFrequency(value / spectrumResolution)
    }
    const handleLeftSampleSizeChange = (e, value) => {
        setCircleLeftSampleSize(value)
    }
    const handleRightFrequencyChange = (e, value) => {
        setCircleRightFrequency(value / spectrumResolution)
    }
    const handleRightSampleSizeChange = (e, value) => {
        setCircleRightSampleSize(value)
    }

    const handleWidthFrequencyChange = (e, value) => {
        setSpectrumWidthFrequency(value / spectrumResolution)
    }
    const handleWidthSampleSizeChange = (e, value) => {
        setSpectrumWidthSampleSize(value)
    }
    const handleHeightFrequencyChange = (e, value) => {
        setSpectrumHeightFrequency(value / spectrumResolution)
    }
    const handleHeightSampleSizeChange = (e, value) => {
        setSpectrumHeightSampleSize(value)
    }

    const handleWildChange = (e, value) => {
        setWild(value)
    }

    const handleLeftDisableChange = (e, value) => {
        setLeftDisabled(value)
    }
    const handleRightDisableChange = (e, value) => {
        setRightDisabled(value)
    }
    const handleWidthDisableChange = (e, value) => {
        setWidthDisabled(value)
    }
    const handleHeightDisableChange = (e, value) => {
        setHeightDisabled(value)
    }

    const controlPhases = [
        <>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Resolution</label>
                <Slider value={spectrumResolution} onChangeCommitted={handleResolutionChange} min={8} max={256} step={4} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Smoothing</label>
                <Slider value={spectrumSmoothing} onChangeCommitted={handleSmoothingChange} min={0} max={30} step={1} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Smooth</label>
                <Switch checked={smoothed} onChange={handleSmoothChange} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Mirror</label>
                <Switch checked={mirrored} onChange={handleMirrorChange} />
            </div>
        </>,
        <>
            <h2 className='phasecontrols-section'>Left Circle</h2>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Disable</label>
                <Switch checked={leftDisabled} onChange={handleLeftDisableChange} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Frequency</label>
                <Slider value={Math.floor(circleLeftFrequency * spectrumResolution)} onChangeCommitted={handleLeftFrequencyChange} min={0} max={spectrumResolution} step={1} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Sample Size</label>
                <Slider value={circleLeftSampleSize} onChangeCommitted={handleLeftSampleSizeChange} min={0} max={0.5} step={0.01} />
            </div>
            <h2 className='phasecontrols-section'>Right Circle</h2>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Disable</label>
                <Switch checked={rightDisabled} onChange={handleRightDisableChange} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Frequency</label>
                <Slider value={Math.floor(circleRightFrequency * spectrumResolution)} onChangeCommitted={handleRightFrequencyChange} min={0} max={spectrumResolution} step={1} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Sample Size</label>
                <Slider value={circleRightSampleSize} onChangeCommitted={handleRightSampleSizeChange} min={0} max={0.5} step={0.01} />
            </div>
        </>,
        <>
            <h2 className='phasecontrols-section'>Width</h2>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Disable</label>
                <Switch checked={widthDisabled} onChange={handleWidthDisableChange} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Frequency</label>
                <Slider value={Math.floor(spectrumWidthFrequency * spectrumResolution)} onChangeCommitted={handleWidthFrequencyChange} min={0} max={spectrumResolution} step={1} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Sample Size</label>
                <Slider value={spectrumWidthSampleSize} onChangeCommitted={handleWidthSampleSizeChange} min={0} max={0.5} step={0.01} />
            </div>
            <h2 className='phasecontrols-section'>Height</h2>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Disable</label>
                <Switch checked={heightDisabled} onChange={handleHeightDisableChange} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Frequency</label>
                <Slider value={Math.floor(spectrumHeightFrequency * spectrumResolution)} onChangeCommitted={handleHeightFrequencyChange} min={0} max={spectrumResolution} step={1} />
            </div>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Sample Size</label>
                <Slider value={spectrumHeightSampleSize} onChangeCommitted={handleHeightSampleSizeChange} min={0} max={0.5} step={0.01} />
            </div>
        </>,
        <>
            <div className='phasecontrols-control'>
                <label className='phasecontrols-label'>Go Wild</label>
                <Switch checked={wild} onChange={handleWildChange} />
            </div>
        </>
    ]

    const titlePhases = [
        "Step 1: Spectrum",
        "Step 2: Sampling",
        "Step 3: Mess Around",
        "Step 4: Go Wild"
    ]

    const menuItems = () => {
        const menuItems = []
        for (let i = 0; i < SONGS.length; i++) {
            menuItems.push(<MenuItem key={i} value={i}>{SONGS[i].string}</MenuItem>)
        }
        return [menuItems]
    }

    const nextPhase = () => {
        setPhase(Math.min(phase + 1, 3))
    }
    const prevPhase = () => {
        setPhase(Math.max(phase - 1, 0))
    }
    const togglePlaying = () => {
        setPlaying(!playing)
    }
    const handleSongChange = e => {
        setSong(e.target.value)
        setPlaying(false)
    }

    return <div className='root'>
        <div className='visualizer'>
            <AudioSpectrumProvider resolution={1024} src={SONGS[song].song} playing={playing}>
                <BorderVisualizer wild={wild}>
                    <CircleVisualizer disabled={leftDisabled} wild={wild} frequency={circleLeftFrequency} sampleSize={circleLeftSampleSize}/>
                    <SpectrumVisualizer  
                        wild={wild} 
                        smoothed={smoothed}
                        resolution={spectrumResolution} 
                        smoothing={spectrumSmoothing} 
                        widthFrequency={spectrumWidthFrequency}
                        widthSampleSize={spectrumWidthSampleSize}
                        heightFrequency={spectrumHeightFrequency}
                        heightSampleSize={spectrumHeightSampleSize}
                        widthDisabled={widthDisabled}
                        heightDisabled={heightDisabled}
                        mirror={mirrored} 
                    />
                    <CircleVisualizer disabled={rightDisabled} wild={wild} frequency={circleRightFrequency} sampleSize={circleRightSampleSize} mirror />
                    <TextVisualizer wild={wild} text={SONGS[song].string} scrollSpeed={10} />
                </BorderVisualizer>
            </AudioSpectrumProvider>
        </div>
        <div className='controls'>
            <h1 className='controls-phasetitle'>{titlePhases[phase]}</h1>
            <div className='controls-nav'>
                <Button className='controls-navbutton' onClick={prevPhase} disabled={phase <= 0}>{'<'}</Button>
                <Button className='controls-navbutton' onClick={nextPhase} disabled={phase >= 3}>{'>'}</Button>
            </div>
            <div className='controls-phasecontrols'>
                {controlPhases[phase]}
            </div>
            <div className='controls-songcontrols'>
                <Button onClick={togglePlaying}>{playing ? 'Pause' : 'Play'}</Button>
                <Select
                    fullWidth
                    value={song}
                    label={'Song'}
                    onChange={handleSongChange}
                    variant={'standard'}
                >
                    {menuItems()}
                </Select>
            </div>
        </div>
    </div>
}

export default Controls