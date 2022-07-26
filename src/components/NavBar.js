const NavBar = ({setUserInput}) => {
    
    return (
        <nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>
            <div className="container-fluid">
                <a className="navbar-brand">Country Weather</a>
                <span className="d-flex" role="search">
                    <input 
                        className="form-control me-2" 
                        placeholder="Search Country"
                        onChange={(e) => {setUserInput(e.target.value)}}
                        type="search" 
                        aria-label="Search" 
                    />
                </span>
            </div>
        </nav>
    )
}

export default NavBar
