import {useState, useEffect} from 'react'

function Splash() {

    const [dark, setDark] = useState(false)

    const toggleDark = () => {
    
    setDark(!dark) 
  }

    const lb = '['
    const rb = ']'
    return (
        <>
        <div onMouseEnter={toggleDark} onMouseLeave={toggleDark} className={!dark ? "splash-div" : "splash-div-dark"}>
            <div classname='title-div'>
            {!dark ? <h1>ku<span>roomi</span></h1> : <h1>kuroomi</h1>}
            </div>
            <div className='splash-search-div'>
            <form classname="splash-search-form">
                <input type="text" name="neighborhood" placeholder="neighborhood" required />
                <input type="numeric" name="budget" placeholder="budget" required />
            </form>
        </div>
        </div>
        </>
    )
}

export default Splash