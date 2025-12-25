import { motion } from 'framer-motion';
import { formatTime } from '../../utils/time';

const TimerDisplay = ({ timeLeft, progress, mode }) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * progress; // Invert logic if needed

  const getColor = () => {
    switch (mode) {
      case 'focus': return 'var(--primary-color)';
      case 'shortBreak': return 'var(--secondary-color)';
      case 'longBreak': return '#45b7d1';
      default: return 'var(--primary-color)';
    }
  };

  return (
    <div style={styles.container}>
      <svg width="300" height="300" viewBox="0 0 300 300" style={styles.svg}>
        {/* Background Circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="var(--text-color)"
          strokeWidth="8"
          opacity="0.1"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 150 150)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div style={styles.timeWrapper}>
        <motion.div
          key={timeLeft}
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.time}
        >
          {formatTime(timeLeft)}
        </motion.div>
        <div style={styles.modeText}>
          {mode === 'focus' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '300px',
    height: '300px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  timeWrapper: {
    textAlign: 'center',
    zIndex: 10,
  },
  time: {
    fontSize: '4rem',
    fontWeight: '700',
    color: 'var(--text-color)',
    fontVariantNumeric: 'tabular-nums',
  },
  modeText: {
    fontSize: '1.2rem',
    color: 'var(--text-color)',
    opacity: 0.7,
    marginTop: '0.5rem',
    textTransform: 'capitalize',
  },
};

export default TimerDisplay;
