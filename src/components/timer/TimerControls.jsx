import { Pause, Play, RotateCcw } from 'lucide-react';

const TimerControls = ({ isActive, toggleTimer, resetTimer }) => {
  return (
    <div style={styles.container}>
      <button onClick={toggleTimer} style={styles.mainButton}>
        {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
      </button>
      <button onClick={resetTimer} style={styles.secondaryButton} aria-label="Reset Timer">
        <RotateCcw size={24} />
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  mainButton: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
    transition: 'transform 0.1s, box-shadow 0.1s',
  },
  secondaryButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '2px solid var(--text-color)',
    backgroundColor: 'transparent',
    color: 'var(--text-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    transition: 'opacity 0.2s',
  },
};

export default TimerControls;
