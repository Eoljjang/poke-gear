import "../styles/components/Toolbar.css"
function Toolbar(){
    return(
        <div className="toolbar">
            <button className="btn-notebooks-collapse">
                <img src="https://static-00.iconduck.com/assets.00/bookshelf-icon-512x512-t36ntt4o.png" alt="" />
            </button>
            <button className="btn-notes-collapse">
                <img src="https://cdn-icons-png.flaticon.com/512/595/595368.png" alt="" />
            </button>
        </div>
    )
}

export default Toolbar;
