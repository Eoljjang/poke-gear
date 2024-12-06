import "../styles/components/ActiveNote.css";
function ActiveNote({activeNote}){
    if (activeNote){
        return(
            <>
                <div className="active-note-heading">
                    <div className="active-note-header">
                        {activeNote.title}
                    </div>
                    <div className="active-note-subheader">
                        Date created here.
                    </div>
                </div>

                <div className="active-note-content">
                    <p>{activeNote.content}</p>
                </div>
            </>
        )
    }
    else{
        return( /* Return an empty page if no note is selected. */
            <>
            
            </>
        )
    }

}

export default ActiveNote;