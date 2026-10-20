import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;
    const newNote = {
      id: Date.now(),
      title: title.trim(),
      text: text.trim(),
      tag: tag.trim() || 'без тега',
      date: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setTitle('');
    setText('');
    setTag('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const allTags = [...new Set(notes.map((n) => n.tag))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.text.toLowerCase().includes(search.toLowerCase());
    const matchesTag = filterTag ? note.tag === filterTag : true;
    return matchesSearch && matchesTag;
  });

  return (
    <main data-testid="app" className="app">
      <h1>Мои заметки</h1>

      <form onSubmit={addNote} className="form">
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-testid="note-title"
        />
        <textarea
          placeholder="Текст заметки"
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-testid="note-text"
        />
        <input
          type="text"
          placeholder="Тег (необязательно)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          data-testid="note-tag"
        />
        <button type="submit" data-testid="add-note">
          Добавить заметку
        </button>
      </form>

      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по заметкам..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="search"
        />
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          data-testid="filter-tag"
        >
          <option value="">Все теги</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="notes-list" data-testid="notes-list">
        {filteredNotes.length === 0 && <p>Заметок пока нет.</p>}
        {filteredNotes.map((note) => (
          <div key={note.id} className="note-card" data-testid="note-card">
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <div className="note-meta">
              <span className="tag">{note.tag}</span>
              <span>{note.date}</span>
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              data-testid="delete-note"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
