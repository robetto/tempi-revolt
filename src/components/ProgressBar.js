import React, { useEffect } from 'react'

import useStorage from '../hooks/useStorage'

const ProgressBar = ( {file, setFile })=> {
    const {url, progress} = useStorage(file)
    // console.log(progress, url);

    useEffect( ()=> {
        // url ci arriva quando il file è completamente caricato.
        // quando il file è completamente caricato facciamo scomparire la barra di caricamento
        if (url) {
            setFile(null)
        }
    }, [url, setFile])

    return (
        <div className='progress-bar'>
            <span style={{ width: progress + '%'}}></span>
        </div>
    )
}

export default ProgressBar;