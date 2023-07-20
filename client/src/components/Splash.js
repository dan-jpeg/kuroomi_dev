import {useState, useEffect} from 'react'

function Splash({ searchFilters, handleInputChange, handleClick }) {

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
            {!dark ? <h1>ku<span>room</span>i</h1> : <h1>kuroomi</h1>}
            </div>
            <div className='splash-search-div'>
            <form classname="splash-search-form">
                <input id="neighborhood-input" type="text" name="borough" placeholder="borough" value={searchFilters.borough } onChange={handleInputChange} />
                <input id="budget-input" type="text" name="price" placeholder="budget" value={searchFilters.price} onChange={handleInputChange} />
                <button type='button' onClick={handleClick}>search</button>
            </form>
        </div>
        </div>
        </>
    )
}

export default Splash