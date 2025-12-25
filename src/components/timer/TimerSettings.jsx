import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import { TIMER_MODES } from '../../utils/constants';

const TimerSettings = ({ durations, updateDurations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localDurations, setLocalDurations] = useState(durations);

  const handleOpen = () => {
    setLocalDurations(durations); // Sync with current
    setIsOpen(true);
  };

  const handleSave = () => {
    updateDurations(localDurations);
    setIsOpen(false);
  };

  const handleChange = (mode, minutes) => {
    setLocalDurations({
      ...localDurations,
      [mode]: minutes * 60,
    });
  };

  return (
    <>
      <button onClick={handleOpen} style={styles.settingsBtn}>
        <Settings size={20} />
      </button>

      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.header}>
              <h3>Timer Settings</h3>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.body}>
              <div style={styles.inputGroup}>
                <label>Focus (minutes)</label>
                <input
                  type="number"
                  value={localDurations[TIMER_MODES.FOCUS] / 60}
                  onChange={(e) => handleChange(TIMER_MODES.FOCUS, e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Short Break (minutes)</label>
                <input
                  type="number"
                  value={localDurations[TIMER_MODES.SHORT_BREAK] / 60}
                  onChange={(e) => handleChange(TIMER_MODES.SHORT_BREAK, e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Long Break (minutes)</label>
                <input
                  type="number"
                  value={localDurations[TIMER_MODES.LONG_BREAK] / 60}
                  onChange={(e) => handleChange(TIMER_MODES.LONG_BREAK, e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.footer}>
              <button onClick={handleSave} style={styles.saveBtn}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  settingsBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-color)',
    opacity: 0.5,
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'var(--card-bg)',
    padding: '2rem',
    borderRadius: 'var(--border-radius)',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-color)',
    cursor: 'pointer',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
  },
  footer: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  saveBtn: {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontWeight: '600',
  },
};

export default TimerSettings;
