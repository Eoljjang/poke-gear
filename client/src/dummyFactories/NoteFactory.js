const createNoteFactory = () => {
    let noteId = 0; // Initialize note ID counter

    /**
     * Creates a new Note object.
     * @param {string} title - The title of the note.
     * @param {string} content - The content of the note.
     * @returns {Object} - A Note object.
     */
    return (title, content) => ({
      id: noteId++, // Assign unique ID and increment counter
      title: title || `Deck ${noteId - 1}`, // Use provided title or default
      content: content || `Content of note ${noteId - 1}`, // Use provided content or default
    });
  };

  // Instantiate the factory
  export const createNote = createNoteFactory();
