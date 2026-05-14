import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DifficultySelector from './components/DifficultySelector';
import MusicCreationStudio from './components/MusicCreationStudio';
import AwardsAndCategory from './components/AwardsAndCategory';
import CollaborationSystem from './components/CollaborationSystem';
import PurchaseSystem from './components/PurchaseSystem';
import ChallengesSystem from './components/ChallengesSystem';
import RandomEvents from './components/RandomEvents';
import Sponsorships from './components/Sponsorships';
import Leaderboard from './components/Leaderboard';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium');
  const [activeTab, setActiveTab] = useState('home');
  const [songHistory, setSongHistory] = useState([]);

  const [artist, setArtist] = useState({
    name: 'Yung Star',
    stage: 'Independent Artist',
    followers: 0,
    streams: 0,
    cash: 500000,
    fame: 'Unknown',
    week: 1,
    foodCost: 30000,
    rent: 200000,
    taxRate: 15,
    reputation: 0,
    collaborations: 0,
    topStreams: 0,
    passiveIncome: 0,
  });

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);

    // Adjust starting resources based on difficulty
    const startingCash = {
      Easy: 1000000,
      Medium: 500000,
      Hard: 250000,
    };

    setArtist({
      ...artist,
      cash: startingCash[selectedDifficulty],
    });

    setGameStarted(true);
    setActiveTab('home');
  };

  const handleSongCreated = (song) => {
    setSongHistory([song, ...songHistory]);

    const diffMultiplier = {
      Easy: 2,
      Medium: 1,
      Hard: 0.5,
    }[difficulty];

    const earnings = Math.floor(song.earnings * diffMultiplier);

    setArtist({
      ...artist,
      streams: artist.streams + (song.streams || 0),
      followers: artist.followers + Math.floor((song.streams || 0) / 10),
      cash: artist.cash + earnings,
      collaborations: artist.collaborations + (song.featuring !== 'Solo' ? 1 : 0),
      topStreams: Math.max(artist.topStreams, song.streams || 0),
    });
  };

  const handleNextWeek = () => {
    const expenses = artist.foodCost + artist.rent;
    const taxes = Math.floor(artist.cash * (artist.taxRate / 100));
    const weeklyPassive = artist.passiveIncome;

    const updatedCash = artist.cash - expenses - taxes + weeklyPassive;

    if (updatedCash < 0) {
      Alert.alert('⚠️ Bankrupt!', 'You ran out of money. Game Over!', [
        {
          text: 'New Game',
          onPress: () => {
            setGameStarted(false);
            setArtist({ ...artist, cash: 500000, week: 1 });
            setSongHistory([]);
          },
        },
      ]);
      return;
    }

    setArtist({
      ...artist,
      cash: updatedCash,
      week: artist.week + 1,
    });

    Alert.alert('✓ Week Advanced', `Expenses: ₦${(expenses + taxes).toLocaleString()}\nPassive Income: ₦${weeklyPassive.toLocaleString()}`);
  };

  if (!gameStarted) {
    return <DifficultySelector onSelectDifficulty={handleDifficultySelect} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {activeTab === 'home' && (
          <View style={styles.homeContent}>
            <Text style={styles.greeting}>Welcome back, {artist.name}!</Text>
            <Text style={styles.difficulty}>📊 Difficulty: {difficulty}</Text>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Followers</Text>
                <Text style={styles.statValue}>{artist.followers.toLocaleString()}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Streams</Text>
                <Text style={styles.statValue}>{artist.streams.toLocaleString()}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Cash</Text>
                <Text style={styles.statValue}>₦{artist.cash.toLocaleString()}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Week</Text>
                <Text style={styles.statValue}>{artist.week}</Text>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.actionButton} onPress={handleNextWeek}>
              <Text style={styles.actionButtonText}>⏭️ Advance 7 Days</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'music' && (
          <MusicCreationStudio
            artist={artist}
            difficulty={difficulty}
            onSongCreated={handleSongCreated}
          />
        )}

        {activeTab === 'awards' && (
          <AwardsAndCategory artist={artist} songHistory={songHistory} />
        )}

        {activeTab === 'collab' && (
          <CollaborationSystem artist={artist} onCollaborate={handleSongCreated} />
        )}

        {activeTab === 'shop' && <PurchaseSystem artist={artist} />}

        {activeTab === 'challenges' && <ChallengesSystem artist={artist} />}

        {activeTab === 'events' && <RandomEvents artist={artist} />}

        {activeTab === 'sponsors' && <Sponsorships artist={artist} />}

        {activeTab === 'leaderboard' && <Leaderboard artist={artist} />}
      </ScrollView>

      {/* Navigation Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'home' && styles.tabActive]}
          onPress={() => setActiveTab('home')}
        >
          <Text style={styles.tabText}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'music' && styles.tabActive]}
          onPress={() => setActiveTab('music')}
        >
          <Text style={styles.tabText}>🎵</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'awards' && styles.tabActive]}
          onPress={() => setActiveTab('awards')}
        >
          <Text style={styles.tabText}>🏆</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'leaderboard' && styles.tabActive]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text style={styles.tabText}>📊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  homeContent: {
    flex: 1,
  },
  greeting: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  difficulty: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderTopWidth: 3,
    borderTopColor: '#2563eb',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  statValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  actionButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderTopWidth: 3,
    borderTopColor: '#2563eb',
  },
  tabText: {
    fontSize: 24,
  },
});
