import TimerControls from '../components/timer/TimerControls';
import TimerDisplay from '../components/timer/TimerDisplay';
import TimerSettings from '../components/timer/TimerSettings';
import DailySummary from '../components/tracker/DailySummary';
import DistractionLog from '../components/tracker/DistractionLog';
import useTimer from '../hooks/useTimer';
import { TIMER_MODES } from '../utils/constants';

const Home = () => {
  const {
    timeLeft,
    isActive,
    mode,
    durations,
    progress,
    toggleTimer,
    resetTimer,
    switchMode,
    updateDurations,
  } = useTimer();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.card}>
          <TimerSettings durations={durations} updateDurations={updateDurations} />
          
          <div style={styles.tabs}>
            <button 
              style={{...styles.tab, ...(mode === TIMER_MODES.FOCUS ? styles.activeTab : {})}}
              onClick={() => switchMode(TIMER_MODES.FOCUS)}
            >
              Focus
            </button>
            <button 
              style={{...styles.tab, ...(mode === TIMER_MODES.SHORT_BREAK ? styles.activeTab : {})}}
              onClick={() => switchMode(TIMER_MODES.SHORT_BREAK)}
            >
              Short Break
            </button>
            <button 
              style={{...styles.tab, ...(mode === TIMER_MODES.LONG_BREAK ? styles.activeTab : {})}}
              onClick={() => switchMode(TIMER_MODES.LONG_BREAK)}
            >
              Long Break
            </button>
          </div>

          <TimerDisplay timeLeft={timeLeft} progress={progress} mode={mode} />
          <TimerControls isActive={isActive} toggleTimer={toggleTimer} resetTimer={resetTimer} />
        </div>

        <DistractionLog />
        <DailySummary />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '80vh',
    paddingTop: '2rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    padding: '0 1rem',
  },
  card: {
    backgroundColor: 'var(--card-bg)',
    padding: '3rem',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
    position: 'relative',
    width: '100%',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '3rem',
    backgroundColor: 'var(--bg-color)',
    padding: '0.5rem',
    borderRadius: '50px',
    width: 'fit-content',
    margin: '0 auto 3rem auto',
    flexWrap: 'wrap',
  },
  tab: {
    background: 'none',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    color: 'var(--text-color)',
    opacity: 0.7,
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  activeTab: {
    backgroundColor: 'var(--card-bg)',
    opacity: 1,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: 'var(--primary-color)',
  },
};

// Add media query styles
if (window.innerWidth <= 768) {
  styles.container.paddingTop = '1rem';
  styles.card.padding = '2rem 1.5rem';
  styles.tabs.gap = '0.25rem';
  styles.tab.padding = '0.4rem 0.75rem';
  styles.tab.fontSize = '0.85rem';
}

export default Home;
