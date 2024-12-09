const createNotebookFactory = () => {
    let notebookId = 1; // Initialize notebook ID counter

    /**
     * Creates a new Notebook object.
     * @param {string} name - The name of the notebook.
     * @returns {Object} - A Notebook object.
     */
    return (name) => ({
      id: notebookId++, // Assign unique ID and increment counter
      name: name || `Notebook ${notebookId - 1}`, // Use provided name or default
      notes: [], // Initialize with empty notes array
    });
  };

  // Instantiate the factory
  export const createNotebook = createNotebookFactory();
