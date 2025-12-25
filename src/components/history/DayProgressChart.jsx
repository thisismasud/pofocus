import { Clock, Coffee, Zap } from 'lucide-react';

const DayProgressChart = ({ stats }) => {
  const { focusHours, distractionHours, idleHours } = stats;
  
  // Calculate percentages
  const focusPercent = (focusHours / 24) * 100;
  const distractionPercent = (distractionHours / 24) * 100;
  const idlePercent = (idleHours / 24) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Clock size={20} color="var(--primary-color)" />
        <h4 style={styles.title}>24-Hour Breakdown</h4>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        {focusPercent > 0 && (
          <div 
            style={{
              ...styles.segment,
              width: `${focusPercent}%`,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
            title={`Focus: ${focusHours.toFixed(1)}h`}
          />
        )}
        {distractionPercent > 0 && (
          <div 
            style={{
              ...styles.segment,
              width: `${distractionPercent}%`,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            }}
            title={`Distracted: ${distractionHours.toFixed(1)}h`}
          />
        )}
        {idlePercent > 0 && (
          <div 
            style={{
              ...styles.segment,
              width: `${idlePercent}%`,
              backgroundColor: '#e0e0e0',
            }}
            title={`Idle: ${idleHours.toFixed(1)}h`}
          />
        )}
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <Zap size={16} color="#667eea" />
          <span style={styles.legendLabel}>Focus</span>
          <span style={styles.legendValue}>{focusHours.toFixed(1)}h</span>
        </div>
        <div style={styles.legendItem}>
          <Coffee size={16} color="#f5576c" />
          <span style={styles.legendLabel}>Distracted</span>
          <span style={styles.legendValue}>{distractionHours.toFixed(1)}h</span>
        </div>
        <div style={styles.legendItem}>
          <Clock size={16} color="#999" />
          <span style={styles.legendLabel}>Idle</span>
          <span style={styles.legendValue}>{idleHours.toFixed(1)}h</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'var(--card-bg)',
    padding: '1.75rem',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  progressBar: {
    display: 'flex',
    width: '100%',
    height: '40px',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: '1.5rem',
  },
  segment: {
    height: '100%',
    transition: 'width 0.5s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.85rem',
  },
  legend: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  legendLabel: {
    fontSize: '0.9rem',
    color: 'var(--text-color)',
    opacity: 0.7,
  },
  legendValue: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--text-color)',
    marginLeft: 'auto',
  },
};

export default DayProgressChart;
