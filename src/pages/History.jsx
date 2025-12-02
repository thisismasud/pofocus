import { AlertCircle, Calendar, Clock, Flame, Target, Trash2, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { formatDate, formatTime } from '../utils/time';
import './History.css';
import DayProgressChart from '../components/history/DayProgressChart';

const History = () => {
  const { sessions, distractions, getDailyStats, clearDayData } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearData = () => {
    clearDayData(selectedDate);
    setShowClearConfirm(false);
  };

  // Get unique dates from sessions and distractions
  const dates = [...new Set([
    ...sessions.map(s => s.date.split('T')[0]),
    ...distractions.map(d => d.date.split('T')[0])
  ])].sort((a, b) => new Date(b) - new Date(a));

  const stats = getDailyStats(selectedDate);

  // Calculate productivity score (0-100)
  const productivityScore = stats.sessionsCount > 0 
    ? Math.min(100, Math.round((stats.sessionsCount * 20) - (stats.distractionsCount * 5)))
    : 0;

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <Calendar size={24} color="var(--primary-color)" />
          <h2 style={styles.title}>History</h2>
        </div>
        <div style={styles.dateList}>
          {dates.length === 0 && (
            <div style={styles.emptyState}>
              <Flame size={32} color="var(--primary-color)" opacity={0.3} />
              <p style={styles.emptyText}>Start your first session to build your streak!</p>
            </div>
          )}
          {dates.map(date => {
            const dayStats = getDailyStats(date);
            const isToday = date === new Date().toISOString().split('T')[0];
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                style={{
                  ...styles.dateBtn,
                  ...(selectedDate === date ? styles.activeDateBtn : {})
                }}
              >
                <div style={styles.dateBtnContent}>
                  <div style={styles.dateBtnLeft}>
                    <Calendar size={16} />
                    <span style={styles.dateBtnText}>
                      {isToday ? 'Today' : new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div style={styles.dateBadge}>
                    {dayStats.sessionsCount}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h3 style={styles.contentTitle}>{formatDate(selectedDate)}</h3>
          <div style={styles.headerActions}>
            <div style={styles.scoreContainer}>
              <div style={styles.scoreCircle}>
                <span style={styles.scoreValue}>{productivityScore}</span>
                <span style={styles.scoreLabel}>Score</span>
              </div>
            </div>
            {(stats.sessionsCount > 0 || stats.distractionsCount > 0) && (
              <button 
                onClick={() => setShowClearConfirm(true)} 
                style={styles.clearBtn}
                title="Clear this day's data"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <div style={styles.statCardContent}>
              <Clock size={28} color="white" />
              <div style={styles.statInfo}>
                <span style={styles.statLabelWhite}>Total Focus Time</span>
                <span style={styles.statValueWhite}>{formatTime(stats.totalFocusTime)}</span>
              </div>
            </div>
          </div>
          
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
            <div style={styles.statCardContent}>
              <Target size={28} color="white" />
              <div style={styles.statInfo}>
                <span style={styles.statLabelWhite}>Sessions Completed</span>
                <span style={styles.statValueWhite}>{stats.sessionsCount}</span>
              </div>
            </div>
          </div>
          
          <div style={{...styles.statCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
            <div style={styles.statCardContent}>
              <AlertCircle size={28} color="white" />
              <div style={styles.statInfo}>
                <span style={styles.statLabelWhite}>Distractions</span>
                <span style={styles.statValueWhite}>{stats.distractionsCount}</span>
              </div>
            </div>
          </div>
        </div>

        <DayProgressChart stats={stats} />

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <TrendingUp size={20} color="var(--primary-color)" />
            <h4 style={styles.sectionTitle}>Focus Sessions</h4>
          </div>
          {stats.sessions.length === 0 ? (
            <div style={styles.emptySection}>
              <Clock size={40} color="var(--text-color)" opacity={0.2} />
              <p style={styles.emptyText}>No sessions recorded for this day</p>
            </div>
          ) : (
            <div style={styles.list}>
              {stats.sessions.map((session, index) => (
                <div key={session.id} style={styles.listItem}>
                  <div style={styles.sessionNumber}>{index + 1}</div>
                  <div style={styles.listItemContent}>
                    <span style={styles.time}>
                      {new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div style={styles.sessionDetails}>
                      <span style={styles.duration}>{formatTime(session.duration)}</span>
                      <span style={styles.tag}>{session.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <AlertCircle size={20} color="var(--secondary-color)" />
            <h4 style={styles.sectionTitle}>Distractions Log</h4>
          </div>
          {stats.distractions.length === 0 ? (
            <div style={styles.emptySection}>
              <Target size={40} color="var(--text-color)" opacity={0.2} />
              <p style={styles.emptyText}>Great focus! No distractions logged</p>
            </div>
          ) : (
            <div style={styles.list}>
              {stats.distractions.map(distraction => (
                <div key={distraction.id} style={styles.distractionItem}>
                  <AlertCircle size={16} color="var(--secondary-color)" opacity={0.6} />
                  <span style={styles.time}>
                    {new Date(distraction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span style={styles.note}>{distraction.note}</span>
                  {distraction.duration > 0 && (
                    <span style={styles.distractionDuration}>
                      {Math.round(distraction.duration / 60)}min
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Clear Data?</h3>
            <p>Are you sure you want to delete all data for {formatDate(selectedDate)}? This action cannot be undone.</p>
            <div style={styles.modalActions}>
              <button onClick={() => setShowClearConfirm(false)} style={styles.modalCancelBtn}>
                Cancel
              </button>
              <button onClick={handleClearData} style={styles.modalConfirmBtn}>
                <Trash2 size={16} />
                Clear Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: '2rem',
    minHeight: '80vh',
  },
  sidebar: {
    backgroundColor: 'var(--card-bg)',
    padding: '1.5rem',
    borderRadius: '20px',
    height: 'fit-content',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid var(--bg-color)',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  dateList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  dateBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.875rem',
    borderRadius: '12px',
    border: 'none',
    background: 'none',
    color: 'var(--text-color)',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  dateBtnContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dateBtnLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  dateBtnText: {
    fontSize: '0.95rem',
  },
  dateBadge: {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  activeDateBtn: {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  contentTitle: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: '700',
  },
  scoreContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  scoreCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  scoreValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
  },
  scoreLabel: {
    fontSize: '0.7rem',
    color: 'white',
    opacity: 0.9,
    textTransform: 'uppercase',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  statCard: {
    padding: '1.75rem',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  statCardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  statLabelWhite: {
    fontSize: '0.85rem',
    color: 'white',
    opacity: 0.9,
    fontWeight: '500',
  },
  statValueWhite: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'white',
  },
  section: {
    backgroundColor: 'var(--card-bg)',
    padding: '1.75rem',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '12px',
    transition: 'transform 0.2s',
  },
  sessionNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  listItemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  time: {
    opacity: 0.6,
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  sessionDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  duration: {
    fontWeight: '700',
    fontSize: '1rem',
  },
  tag: {
    padding: '0.35rem 0.85rem',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 107, 107, 0.1) 100%)',
    color: 'var(--primary-color)',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  distractionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '12px',
    borderLeft: '3px solid var(--secondary-color)',
  },
  note: {
    flex: 1,
    fontSize: '0.95rem',
  },
  distractionDuration: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    backgroundColor: 'rgba(78, 205, 196, 0.15)',
    color: 'var(--secondary-color)',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  emptySection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1rem',
    textAlign: 'center',
  },
  emptyText: {
    opacity: 0.5,
    fontStyle: 'italic',
    marginTop: '0.5rem',
    fontSize: '0.9rem',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  clearBtn: {
    padding: '0.75rem',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    color: 'var(--primary-color)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'var(--card-bg)',
    padding: '2rem',
    borderRadius: '20px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
    justifyContent: 'flex-end',
  },
  modalCancelBtn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    cursor: 'pointer',
    fontWeight: '600',
  },
  modalConfirmBtn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

export default History;
