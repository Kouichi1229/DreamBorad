import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as TextIcon } from '../icons/text-icon.svg';
import { ReactComponent as ImageIcon } from '../icons/image-icon.svg';
import { ReactComponent as TrashIcon } from '../icons/trash-can-solid.svg';

interface Note {
  id: string;
  content: string;
  x: number;
  y: number;
  type: 'text' | 'image';
  src?: string;
}

const DreamBoard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const addTextNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: '',
      x: Math.random() * (window.innerWidth - 200),
      y: Math.random() * (window.innerHeight - 200),
      type: 'text',
    };
    setNotes([...notes, newNote]);
  };

  const addImageNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newNote: Note = {
          id: Date.now().toString(),
          content: '',
          x: Math.random() * (window.innerWidth - 200),
          y: Math.random() * (window.innerHeight - 200),
          type: 'image',
          src: e.target?.result as string,
        };
        setNotes([...notes, newNote]);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateNote = (id: string, content: string) => {
    setNotes(notes.map(note => note.id === id ? { ...note, content } : note));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const onMouseDown = (event: React.MouseEvent, id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setDragging(id);
      setDragOffset({
        x: event.clientX - note.x,
        y: event.clientY - note.y,
      });
    }
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (dragging) {
      setNotes(notes.map(note => 
        note.id === dragging
          ? { ...note, x: event.clientX - dragOffset.x, y: event.clientY - dragOffset.y }
          : note
      ));
    }
  };

  const onMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove as any);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove as any);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, dragOffset]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {notes.map(note => (
        <div key={note.id} style={{
          position: 'absolute',
          left: note.x,
          top: note.y,
          width: 200,
          height: 200,
          backgroundColor: '#ffff88',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'move',
        }} onMouseDown={(e) => onMouseDown(e, note.id)}>
          {note.type === 'text' ? (
            <textarea
              value={note.content}
              onChange={(e) => updateNote(note.id, e.target.value)}
              style={{ width: '100%', height: '80%', backgroundColor: 'transparent', border: 'none', resize: 'none' }}
            />
          ) : (
            <img src={note.src} alt="Note" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          <button onClick={() => deleteNote(note.id)} style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}>
            <TrashIcon width="8" height="8" />
          </button>
        </div>
      ))}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        <button onClick={addTextNote} style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'rgba(76, 175, 80, 0.7)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TextIcon width="24" height="24" />
        </button>
        <label style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'rgba(33, 150, 243, 0.7)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <input type="file" accept="image/*" onChange={addImageNote} style={{ display: 'none' }} />
          <ImageIcon width="24" height="24" />
        </label>
      </div>
    </div>
  );
};

export default DreamBoard;