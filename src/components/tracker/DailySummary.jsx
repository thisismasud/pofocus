import { useData } from '../../contexts/DataContext';
import { formatTime } from '../../utils/time';

const DailySummary = () => {
  const { getDailyStats } = useData();
  const today = new Date().toISOString().split('T')[0];
  const stats = getDailyStats(today);

  return (
    <div style={styles.container}>
      <div style={styles.statItem}>
        <span style={styles.label}>Sessions</span>
        <span style={styles.value}>{stats.sessionsCount}</span>
      </div>
      <div style={styles.divider} />
      <div style={styles.statItem}>
        <span style={styles.label}>Focus Time</span>
        <span style={styles.value}>{formatTime(stats.totalFocusTime)}</span>
      </div>
      <div style={styles.divider} />
      <div style={styles.statItem}>
        <span style={styles.label}>Distractions</span>
        <span style={styles.value}>{stats.distractionsCount}</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'var(--card-bg)',
    padding: '1.5rem',
    borderRadius: '16px',
    marginTop: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    width: '100%',
    maxWidth: '500px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  label: {
    fontSize: '0.85rem',
    color: 'var(--text-color)',
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  value: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--primary-color)',
  },
  divider: {
    width: '1px',
    height: '40px',
    backgroundColor: 'var(--text-color)',
    opacity: 0.1,
  },
};

export default DailySummary;
