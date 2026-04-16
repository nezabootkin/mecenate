import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground, View } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ICON_COLOR: string = '#57626F';

const PAID_CONTENT_TEXT = 'Контент скрыт пользователем.\nДоступ откроется после доната';
const SEND_DONATE = 'Отправить донат';

interface IAuthor {
  id: string,
  username: string,
  displayName: string,
  avatarUrl: string,
  bio: string,
  subscribersCount: number,
  isVerified: boolean
}

enum TIER {
  FREE = 'free',
  PAID = 'paid',
}

export interface ICard {
  id: string,
  author: IAuthor,
  title: string,
  body: string,
  preview: string,
  coverUrl: string,
  likesCount: number,
  commentsCount: number,
  isLiked: boolean,
  tier: TIER,
  createdAt: Date
}

export default function card(props: ICard) {
  const {
    author,
    title,
    preview,
    coverUrl,
    likesCount,
    commentsCount,
    tier,
  } = props;

  const tierCard = () => (
    <>
      <ThemedView>
        <ImageBackground style={[styles.coverUrl, styles.backgroundImage]} source={{uri: coverUrl}} blurRadius={16}>
          <View style={styles.paidIcon}>
            <FontAwesome5 name="donate" size={20} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.paidText}>{PAID_CONTENT_TEXT}</ThemedText>
          <TouchableOpacity style={styles.paidButton}>
            <ThemedText style={styles.paidButtonText}>{SEND_DONATE}</ThemedText>
          </TouchableOpacity>
        </ImageBackground>
        <ThemedView style={[styles.bluredTitle, styles.bluredBlock]}/>
        <ThemedView style={[styles.bluredPreview, styles.bluredBlock]}/>
      </ThemedView>
      <></>
    </>
  );

  const untierCard = () => (
    <>
      <ThemedView>
        {coverUrl ? <Image style={styles.coverUrl} source={{uri: coverUrl}}/> : <></>}
      </ThemedView>
      <ThemedView style={styles.cardText}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.subtext}>{preview}</ThemedText>
        <ThemedView style={styles.cardButtons}>
          <TouchableOpacity style={styles.touchable}>
            <MaterialIcons name="favorite-border" size={24} color={ICON_COLOR} />
            <ThemedText style={styles.buttonText}>{likesCount}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}>
            <FontAwesome name="comment" size={20} color={ICON_COLOR} />
            <ThemedText style={styles.buttonText}>{commentsCount}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </>
  );

  return (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.topOfCard}>
        <Image style={styles.avatar} source={{uri: author.avatarUrl}} />
        <ThemedText style={styles.namePerson}>{author.displayName}</ThemedText>
      </ThemedView>
      {tier === TIER.PAID ? tierCard() : untierCard()}
    </ThemedView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  bluredPreview: {
    height: 40,
    marginBottom: 12,
  },
  bluredTitle: {
    height: 26,
    width: '40%',
  },
  bluredBlock: {
    borderRadius: 16,
    backgroundColor: '#EEEFF1',
    marginHorizontal: 16,
    marginTop: 8,
  },
  paidButton: {
    borderRadius: 16,
    backgroundColor: '#6115CD',
  },
  paidButtonText: {
    color: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 56,
  },
  paidIcon: {
    width: 42,
    height: 42,
    backgroundColor: '#6115CD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  paidText: {
    marginTop: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 600,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  card: {
    borderRadius: 16,
    marginVertical: 8,
  },
  avatar: {
    width: 40,
    borderRadius: 20,
    height: 40,
  },
  coverUrl: {
    height: width,
    width: width,
  },
  topOfCard: {
    display: "flex",
    flexDirection: "row",
    margin: 16,
  },
  namePerson: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "bold",
    marginLeft: 12,
    alignSelf: "center",
  },
  cardText: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardButtons: {
    flexDirection: "row",
  },
  touchable: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: '#EFF2F7',
    marginRight: 8,
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 18,
    marginLeft: 8,
    alignSelf: "center",
  },
});