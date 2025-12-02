import { AlertCircle, Clock, Plus } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../../contexts/DataContext';

const DistractionLog = () => {
  const { addDistraction } = useData();
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      const durationMinutes = parseInt(duration) || 0;
      addDistraction(note, durationMinutes);
      setNote('');
      setDuration('');
      setIsExpanded(false);
    }
  };

  return (
    <div style={styles.container}>
      {!isExpanded ? (
        <button onClick={() => setIsExpanded(true)} style={styles.logBtn}>
          <AlertCircle size={18} />
          <span>Log Distraction</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What distracted you?"
            autoFocus
            style={styles.input}
          />
          <div style={styles.durationInput}>
            <Clock size={16} color="var(--text-color)" opacity={0.6} />
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration (minutes)"
              min="0"
              style={{...styles.input, flex: 1}}
            />
          </div>
          <div style={styles.actions}>
            <button type="button" onClick={() => setIsExpanded(false)} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              <Plus size={16} />
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  logBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '50px',
    border: '2px solid var(--text-color)',
    background: 'transparent',
    color: 'var(--text-color)',
    opacity: 0.6,
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
    maxWidth: '350px',
    backgroundColor: 'var(--card-bg)',
    padding: '1.25rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    width: '100%',
    fontSize: '0.95rem',
  },
  durationInput: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  cancelBtn: {
    padding: '0.5rem 1rem',
    border: 'none',
    background: 'none',
    color: 'var(--text-color)',
    opacity: 0.7,
    cursor: 'pointer',
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default DistractionLog;
