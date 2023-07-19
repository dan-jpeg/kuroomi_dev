import {NavLink} from "react-router-dom"

function NavBar({ adminMode, currentUser, loggedin }){
    return (
        <nav>
            <div>
                <NavLink to="/">home</NavLink>
            </div>
            <div>
                { !loggedin ? 
                <NavLink to="/add_user">signup</NavLink>
                : <span>welcome {currentUser}</span>
                }
                </div>
            {adminMode ? <div>
                <NavLink to="/add_owner">new owner</NavLink>
                <NavLink to="/add_property">add</NavLink>
                <NavLink to="/update_property">update</NavLink>
                <NavLink to="/owners">owners</NavLink>
                </div>
            :'' }
            </nav>
                ) }

export default NavBar;

