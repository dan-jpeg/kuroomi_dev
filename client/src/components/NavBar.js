import {NavLink} from "react-router-dom"

function NavBar({ adminMode, currentUser, loggedin }){
    return (
        <nav>
            <div>
                <NavLink to="/">home</NavLink>
            </div>
            <div className="user-nav"> 
                {!loggedin ?
                 <>
                 <NavLink to="/login">login</NavLink>
                 <NavLink to="/add_user">signup</NavLink>
                 </> :  <>welcome <span style={{fontSize: 20}}> {currentUser}</span></> }
                
            </div>
            {adminMode ? <div>
                <NavLink to="/add_owner">new owner</NavLink>
                <NavLink to="/add_property">add</NavLink>
                <NavLink to="/update_property">update</NavLink>
                <NavLink to="/owners">owners</NavLink>
                <NavLink to="/search">search</NavLink>
                </div>
            : <div><NavLink to="/search">search</NavLink></div>}
                 
            </nav>
                ) }

export default NavBar;

