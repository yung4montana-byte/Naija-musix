import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const producers = [
  ['Don Jazzy', 'Nigeria', '₦25M'],
  ['Metro Boomin', 'USA', '₦250M'],
  ['Pheelz', 'Nigeria', '₦20M'],
  ['DJ Maphorisa', 'South Africa', '₦35M'],
  ['Rvssian', 'Jamaica', '₦70M'],
  ['P-Square', 'Nigeria', '₦45M'],
  ['Timbaland', 'USA', '₦500M'],
];

const labels = [
  ['Mavin Records', 'Nigeria', '₦120M'],
  ['YBNL Nation', 'Nigeria', '₦85M'],
  ['Empire Distribution', 'USA', '₦150M'],
  ['Republic Records', 'USA', '₦400M'],
  ['Bad Boy Records', 'USA', '₦300M'],
];

const artists = [
  ['Asake', '₦109.7M'],
  ['Rema', '₦137.1M'],
  ['Davido', '₦164.5M'],
  ['Wizkid', '₦205.6M'],
  ['Drake', '₦411M'],
  ['The Weeknd', '₦450M'],
];

export default function CollaborationSystem({ artist, onCollaborate }) {
  const handleCollaboration = (item) => {
    const cost = parseInt(item[item.length - 1].replace(/[₦,M]/g, '')) * 1000000;
    if (artist.cash < cost) {
      Alert.alert('Insufficient Funds', `You need ₦${(cost - artist.cash).toLocaleString()} more`);
      return;
    }
    onCollaborate(item);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Collaboration System</Text>
      <Text style={styles.subtitle}>Partner with artists, producers, and labels to boost your career</Text>

      <Text style={styles.sectionTitle}>🎹 Feature Producers</Text>
      <Text style={styles.info}>Work with talented producers to enhance your sound</Text>
      {producers.map((producer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemCard}
          onPress={() => handleCollaboration(producer)}
        >
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{producer[0]}</Text>
            <Text style={styles.cost}>{producer[2]}</Text>
          </View>
          <Text style={styles.itemLocation}>📍 {producer[1]}</Text>
          <Text style={styles.benefit}>+2-3M streams | +20% followers</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>🏢 Record Labels</Text>
      <Text style={styles.info}>Sign with a label for distribution and marketing</Text>
      {labels.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemCard}
          onPress={() => handleCollaboration(label)}
        >
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{label[0]}</Text>
            <Text style={styles.cost}>{label[2]}</Text>
          </View>
          <Text style={styles.itemLocation}>📍 {label[1]}</Text>
          <Text style={styles.benefit}>+50% earnings | Passive income +₦500K/week</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>🎤 Feature Artists</Text>
      <Text style={styles.info}>Collaborate with established artists</Text>
      {artists.map((featureArtist, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemCard}
          onPress={() => handleCollaboration(featureArtist)}
        >
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{featureArtist[0]}</Text>
            <Text style={styles.cost}>{featureArtist[1]}</Text>
          </View>
          <Text style={styles.benefit}>+5-10M streams | Reputation +30</Text>
        </TouchableOpacity>
      ))}

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
    marginBottom: 10,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  info: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#06b6d4',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cost: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemLocation: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 6,
  },
  benefit: {
    color: '#fbbf24',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
  spacer: {
    height: 30,
  },
});
