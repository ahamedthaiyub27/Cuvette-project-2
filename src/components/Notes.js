import React, { useState, useEffect } from 'react';
import styles from './Notes.module.css';
import { useParams } from 'react-router-dom';
import { LuSendHorizontal } from "react-icons/lu";

const Notes = () => {
  const { groupId } = useParams();
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
      setGroups(savedGroups);
      
      const group = savedGroups.find(g => g.id === parseInt(groupId));
      if (group) {
        setCurrentGroup(group);
        setNotes(group.notes || []);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }, [groupId]);

  const handleAddNote = () => {
    try {
      if (noteContent.trim() === "") return;

      const newNote = {
        id: Date.now(),
        content: noteContent,
        createdAt: new Date().toISOString()
      };

      const updatedGroups = groups.map(group => {
        if (group.id === parseInt(groupId)) {
          return {
            ...group,
            notes: [...(group.notes || []), newNote]
          };
        }
        return group;
      });

      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      setCurrentGroup(updatedGroups.find(g => g.id === parseInt(groupId)));
      setNotes(updatedGroups.find(g => g.id === parseInt(groupId)).notes || []);
      setNoteContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return "";
    }
  };

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return "";
    }
  };

  return (
    <div className={styles['notes-container']}>
      {currentGroup ? (
        <>
          <div className={styles['notes-header']}>
            <div 
              className={styles['group-avatar']}
              style={{ backgroundColor: currentGroup.color }}
            >
              {currentGroup.name
                .split(' ')
                .map(w => w[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <h2>{currentGroup.name}</h2>
          </div>

          <div className={styles['notes-list']}>
            {notes.map(note => (
              <div key={note.id} className={styles.note}>
                <p>{note.content}</p>
                <div className={styles['note-footer']}>
                  <span className={styles['note-time']}>{formatTime(note.createdAt)}</span>
                  <span className={styles['note-date']}>{formatDate(note.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles['note-input']}>
            <textarea
              placeholder="Enter your text here........."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <button 
              onClick={handleAddNote} 
              disabled={noteContent.trim() === ""}
              className={noteContent.trim() === "" ? styles.disabled : ""}
            >
              <LuSendHorizontal style={{color:"#001F8B", fontSize:"25px", textAlign:"center"}}/>
            </button>
          </div>
        </>
      ) : (
        <div className={styles['empty-state']}>
          <p>Select a group to view or add notes</p>
        </div>
      )}
    </div>
  );
};

export default Notes;