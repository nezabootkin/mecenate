import {FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card, { ICard } from '../../components/card/card';
import { useCallback, useEffect, useState } from 'react';
import { ENDPOINT_TYPE, fetchData } from '@/apiIntegration/axios/axios';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

const UPDATE_ERROR_MESSAGE = 'Не удалось загрузить публикации';
const UPDATE = 'Повторить';
const UPDATED = 'Обновление';

export default function HomeScreen() {

  const [cardData, setCardData] = useState<ICard[]>();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isHasMore, setIsHasMore] = useState(false);
  const [postLimit, setPostLimit] = useState(10);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetchData(ENDPOINT_TYPE.POSTS, {
        page: 1,
        limit: 10,
      });
      setCardData(response.data.posts);
      setIsHasMore(response.data.hasMore);
    } catch (error) {
      console.error(UPDATE_ERROR_MESSAGE, error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const getCards = await fetchData(ENDPOINT_TYPE.POSTS, {
          page: 1,
          limit: 10,
        });
        setCardData(getCards.data.posts);
        setIsHasMore(getCards.data.hasMore);
      } catch (error ) {
        console.error(UPDATE_ERROR_MESSAGE, error);
      }
    })();
  }, []);

  const loadMorePosts = async () => {
    if (isHasMore) {
      const _page = page + 1;
      const _postLimit = postLimit + 10;
      const newPosts = await fetchData(ENDPOINT_TYPE.POSTS, {
        page: _page,
        limit: _postLimit,
      });
      setPage(_page);
      setPostLimit(_postLimit);
      setCardData(newPosts.data.posts);
      setIsHasMore(newPosts.data.hasMore);
    }
  }

  return (
    <SafeAreaView style={styles.scrollNews}>
      {cardData !== undefined ? (
        <FlatList
          data={cardData}
          keyExtractor={(item) => `${item.id}${page}`}
          renderItem={({ item }) => {
            return (
              <Card
                key={`${item.id}${page}`}
                id={item.id}
                author={item.author}
                title={item.title}
                body={item.body}
                preview={item.preview}
                coverUrl={item.coverUrl}
                likesCount={item.likesCount}
                commentsCount={item.commentsCount}
                isLiked={item.isLiked}
                tier={item.tier}
                createdAt={item.createdAt}
              />
            )
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#6115CD']}
              tintColor={'#6115CD'}
              title={UPDATED}
              titleColor={'#FFFFFF'}
            />
          }
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.3}
        />
      ) : (
        <ThemedView style={styles.emptyPosts}>
          <Image source={require('@/assets/images/illustration_sticker.png')}/>
          <ThemedText style={styles.errorText}>{UPDATE_ERROR_MESSAGE}</ThemedText>
          <TouchableOpacity style={styles.reload}>
            <ThemedText style={styles.reloadButton}>{UPDATE}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollNews: {
    height: "100%",
    backgroundColor: "#F5F8FD",
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  reloadButton: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 15,
    lineHeight: 20,
  },
  emptyPosts: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  reload: {
    width: "100%",
    marginTop: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: '#6115CD',
  }
});
