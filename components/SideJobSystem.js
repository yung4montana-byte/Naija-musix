import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ProgressBarAndroid,
} from 'react-native';

const SIDE_JOBS = [
  {
    id: 1,
    title: 'Studio Session Musician',
    description: 'Play instruments for other artists',
    salary: 50000,
    difficulty: 'Easy',
    time: '10 hours/week',
    icon: '🎹',
    requirements: 'Min 100 followers',
  },
  {
    id: 2,
    title: 'Music Teacher',
    description: 'Teach music production to beginners',
    salary: 75000,
    difficulty: 'Easy',
    time: '15 hours/week',
    icon: '📚',
    requirements: 'Min 500 followers',
  },
  {
    id: 3,
    title: 'Audio Engineer',
    description: 'Mix and master tracks in studio',
    salary: 100000,
    difficulty: 'Medium',
    time: '20 hours/week',
    icon: '🎚️',
    requirements: 'Min 1K followers',
  },
  {
    id: 4,
    title: 'Freelance Beat Producer',
    description: 'Produce beats for streaming platforms',
    salary: 120000,
    difficulty: 'Medium',
    time: '25 hours/week',
    icon: '🎛️',
    requirements: 'Min 2K followers',
  },
  {
    id: 5,
    title: 'Music Consultant',
    description: 'Advise labels on new talent',
    salary: 150000,
    difficulty: 'Hard',
    time: '30 hours/week',
    icon: '💼',
    requirements: 'Min 5K followers',
  },
  {
    id: 6,
    title: 'Live Performance Gigs',
    description: 'Perform at events and concerts',
    salary: 180000,
    difficulty: 'Hard',
    time: '35 hours/week',
    icon: '🎤',
    requirements: 'Min 10K followers',
  },
  {
    id: 7,
    title: 'Sound Designer',
    description: 'Create sound effects for media',
    salary: 90000,
    difficulty: 'Medium',
    time: '18 hours/week',
    icon: '🔊',
    requirements: 'Min 1.5K followers',
  },
  {
    id: 8,
    title: 'DJ at Clubs',
    description: 'DJ at nightclubs and events',
    salary: 135000,
    difficulty: 'Medium',
    time: '28 hours/week',
    icon: '🎧',
    requirements: 'Min 3K followers',
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return '#22c55e';
    case 'Medium':
      return '#fbbf24';
    case 'Hard':
      return '#ef4444';
    default:
      return '#9ca3af';
  }
};

const checkJobRequirements = (job, followers) => {
  const required = parseInt(job.requirements.split(' ')[1].replace('K', '000'));
  return followers >= required;
};

export default function SideJobSystem({ artist, onJobAccepted }) {
  const [activeJob, setActiveJob] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [weekCount, setWeekCount] = useState(0);

  const handleAcceptJob = (job) => {
    const meetsRequirements = checkJobRequirements(job, artist.followers);

    if (!meetsRequirements) {
      Alert.alert(
        '❌ Requirements Not Met',
        `You need ${job.requirements} to apply for this job.\nCurrent followers: ${artist.followers.toLocaleString()}`
      );
      return;
    }

    if (currentJob) {
      Alert.alert(
        '⚠️ Job Already Active',
        `You're currently working as a ${currentJob.title}.\n\nQuit this job to accept another?`,
        [
          { text: 'Cancel', onPress: () => {} },
          {
            text: 'Quit & Accept New',
            onPress: () => {
              setCurrentJob(job);
              setWeekCount(0);
              setActiveJob(null);
              Alert.alert('✓ Job Started', `You're now working as a ${job.title}!\n\nYou'll earn ₦${job.salary.toLocaleString()} weekly.`);
            },
          },
        ]
      );
      return;
    }

    setCurrentJob(job);
    setWeekCount(0);
    setActiveJob(null);
    Alert.alert(
      '✓ Job Accepted',
      `You're now working as a ${job.title}!\n\nYou'll earn ₦${job.salary.toLocaleString()} every week.`
    );
  };

  const handleQuitJob = () => {
    Alert.alert('⚠️ Quit Job?', `Are you sure you want to quit as ${currentJob.title}?`, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Quit',
        onPress: () => {
          setCurrentJob(null);
          setWeekCount(0);
          Alert.alert('✓ Job Quit', 'You no longer have a side job.');
        },
      },
    ]);
  };

  const handleCollectWeeklyPay = () => {
    if (!currentJob) {
      Alert.alert('No Active Job', 'You need to have a side job to collect payment.');
      return;
    }

    onJobAccepted({
      type: 'weekly_payment',
      amount: currentJob.salary,
      jobTitle: currentJob.title,
    });

    setWeekCount(weekCount + 1);
    Alert.alert(
      '💰 Payment Received',
      `You earned ₦${currentJob.salary.toLocaleString()} from your side job as ${currentJob.title}!`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💼 Side Jobs</Text>
      <Text style={styles.subtitle}>Earn extra cash while building your music career</Text>

      {currentJob ? (
        <View style={styles.activeJobCard}>
          <View style={styles.activeJobHeader}>
            <Text style={styles.activeJobIcon}>{currentJob.icon}</Text>
            <View style={styles.activeJobInfo}>
              <Text style={styles.activeJobTitle}>{currentJob.title}</Text>
              <Text style={styles.activeJobDescription}>{currentJob.description}</Text>
            </View>
          </View>

          <View style={styles.activeJobDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>💰 Weekly Salary:</Text>
              <Text style={styles.detailValue}>₦{currentJob.salary.toLocaleString()}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>⏱️ Hours:</Text>
              <Text style={styles.detailValue}>{currentJob.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>📊 Difficulty:</Text>
              <Text style={[styles.detailValue, { color: getDifficultyColor(currentJob.difficulty) }]}>
                {currentJob.difficulty}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>📈 Weeks Worked:</Text>
              <Text style={styles.detailValue}>{weekCount}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.collectButton} onPress={handleCollectWeeklyPay}>
            <Text style={styles.collectButtonText}>💸 Collect Weekly Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quitButton} onPress={handleQuitJob}>
            <Text style={styles.quitButtonText}>❌ Quit Job</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noJobCard}>
          <Text style={styles.noJobText}>No Active Job</Text>
          <Text style={styles.noJobSubtext}>Select a job below to start earning extra cash</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Available Jobs</Text>

      {SIDE_JOBS.map((job) => {
        const meetsRequirements = checkJobRequirements(job, artist.followers);
        const isActive = currentJob?.id === job.id;

        return (
          <TouchableOpacity
            key={job.id}
            style={[
              styles.jobCard,
              !meetsRequirements && styles.jobCardLocked,
              isActive && styles.jobCardActive,
            ]}
            onPress={() => {
              if (meetsRequirements) {
                handleAcceptJob(job);
              }
            }}
            disabled={!meetsRequirements && !isActive}
          >
            <View style={styles.jobHeader}>
              <Text style={styles.jobIcon}>{job.icon}</Text>
              <View style={styles.jobContent}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobDescription}>{job.description}</Text>
              </View>
              {isActive && <Text style={styles.activeLabel}>✓ ACTIVE</Text>}
            </View>

            <View style={styles.jobDetails}>
              <View style={styles.detailPill}>
                <Text style={styles.detailPillText}>💰 ₦{job.salary.toLocaleString()}/wk</Text>
              </View>
              <View style={styles.detailPill}>
                <Text style={[styles.detailPillText, { color: getDifficultyColor(job.difficulty) }]}>
                  {job.difficulty}
                </Text>
              </View>
              <View style={styles.detailPill}>
                <Text style={styles.detailPillText}>⏱️ {job.time}</Text>
              </View>
            </View>

            <View style={styles.requirementBar}>
              <Text style={styles.requirementText}>{job.requirements}</Text>
              <View
                style={[
                  styles.requirementIndicator,
                  { backgroundColor: meetsRequirements ? '#22c55e' : '#ef4444' },
                ]}
              >
                <Text style={styles.requirementStatus}>
                  {meetsRequirements ? '✓ Eligible' : '🔒 Locked'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 20,
  },
  activeJobCard: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  activeJobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activeJobIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  activeJobInfo: {
    flex: 1,
  },
  activeJobTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeJobDescription: {
    color: '#d1d5db',
    fontSize: 13,
    marginTop: 4,
  },
  activeJobDetails: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#9ca3af',
    fontSize: 13,
  },
  detailValue: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: 'bold',
  },
  collectButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  collectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quitButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  quitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noJobCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  noJobText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noJobSubtext: {
    color: '#9ca3af',
    fontSize: 13,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  jobCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
  },
  jobCardLocked: {
    opacity: 0.6,
    borderLeftColor: '#6b7280',
  },
  jobCardActive: {
    borderLeftColor: '#22c55e',
    backgroundColor: '#0f6e3d',
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobIcon: {
    fontSize: 32,
    marginRight: 10,
  },
  jobContent: {
    flex: 1,
  },
  jobTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobDescription: {
    color: '#d1d5db',
    fontSize: 12,
    marginTop: 2,
  },
  activeLabel: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#064e3b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  jobDetails: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  detailPill: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  detailPillText: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '600',
  },
  requirementBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 10,
  },
  requirementText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  requirementIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  requirementStatus: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  spacer: {
    height: 30,
  },
});
