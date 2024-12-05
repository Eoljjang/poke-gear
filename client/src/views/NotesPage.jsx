import '../styles/views/NotesPage.css'
import Notebook from '../components/Notebook';

const dummyData = [
    {
      id: 1,
      name: 'Notebook 1',
      notes: [
        { id: 1, title: 'Note 1', content: 'Content of note 1' },
        { id: 2, title: 'Note 2', content: 'Content of note 2' },
      ],
    },
    {
      id: 2,
      name: 'Notebook 2',
      notes: [
        { id: 1, title: 'Note 1', content: 'Content of note 1' },
        { id: 2, title: 'Note 2', content: 'Content of note 2' },
      ],
    },
  ];

function NotesPage() {
    return (
        <div className="notes-page-container">
            <div className="text-modifiers">This will be where the RTF modifiers go</div>

            <div className="notes-content">
                {/* 1) Notebook selector*/}
                <div className="notebooks-section">
                    {dummyData.map((notebook) => (
                        <Notebook key={notebook.id} notebook={notebook}/>
                    ))
                    }
                </div>

                {/* 2) Specific note selector. This should only appear once you select a note. */}
                <div className="notes-section">

                </div>

                {/* 3) Section where you actually edit / write the note.*/}
                <div className="note-editor-section">

                </div>
            </div>

        </div>
    )
}

export default NotesPage;
