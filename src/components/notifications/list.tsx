import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {DataSetSegment} from '../../providers/data';
import {Notification} from '../../services/notifications';
import {NotificationsStackParamList} from '../../stacks/notifications';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  notifications: DataSetSegment<Notification>;
  navigation: NativeStackNavigationProp<NotificationsStackParamList>;
}

const Component: React.FC<Properties> = props => {
  const {notifications, theme} = props;

  const styles = StyleSheet.create({
    loadingContainer: {
      marginTop: 20,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    oopsCircle: {
      borderWidth: 2,
      borderColor: theme.colors.error,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      marginVertical: 10,
    },
    oopsIcon: {marginTop: 12},
    oopsText: {color: theme.colors.text, marginBottom: 20},
    createButton: {
      backgroundColor: theme.colors.blue,
      marginVertical: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    createButtonIcon: {
      marginRight: 10,
    },
    listContainer: {
      backgroundColor: theme.colors.secondaryBackground,
    },
    groupContainer: {
      backgroundColor: theme.colors.background,
      marginTop: 5,
      marginHorizontal: 3,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {width: 0, height: 3},
      elevation: 3,
      padding: 15,
    },
    groupHeader: {
      paddingBottom: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
    },
    groupHeaderText: {
      ...theme.typography.footnote,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    itemContentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // itemAvatar: {
    //   borderWidth: 1,
    //   borderColor: theme.colors.black,
    //   width: 50,
    //   height: 50,
    //   borderRadius: 25,
    //   alignItems: 'center',
    //   paddingTop: 14,
    //   marginRight: 10,
    // },
    // itemAvatarText: {
    //   color: theme.colors.white,
    //   ...theme.typography.body,
    // },
    itemTeamIdentifierBorder: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.separator,
      paddingRight: 10,
      marginRight: 10,
      width: 180,
    },
    itemNotificationText: {
      color: theme.colors.text,
      ...theme.typography.body,
    },
    itemDateText: {
      color: theme.colors.secondaryText,
      ...theme.typography.caption1,
    },
    unReadMarker: {
      marginRight: 10,
    },
    footerPadding: {
      backgroundColor: theme.colors.secondaryBackground,
      height: 1,
      marginTop: 10,
    },
  });

  const renderItem = ({
    item,
  }: {
    item: {groupHeader: string; groupItems: Notification[]};
  }) => {
    return (
      <View style={[styles.groupContainer]}>
        <View style={[styles.groupHeader]}>
          <Text style={[styles.groupHeaderText]}>{item.groupHeader}</Text>
        </View>
        {item.groupItems.map((groupItem: Notification, index: number) => {
          return (
            <View key={`${item.groupHeader}-${groupItem.id}-${index}`}>
              <Pressable style={[styles.itemContentRow]} onPress={() => {}}>
                {!groupItem.isRead ? (
                  <FontAwesome5Icon
                    style={[styles.unReadMarker]}
                    name="circle"
                    solid
                    color={theme.colors.blue}
                  />
                ) : (
                  <></>
                )}
                <View>
                  <Text style={[styles.itemNotificationText]}>
                    {groupItem.message}
                  </Text>
                  <Text style={[styles.itemDateText]}>
                    {moment
                      .duration(moment(groupItem.lastUpdateDate).diff(moment()))
                      .humanize(true)}
                  </Text>
                </View>
              </Pressable>
              {index < item.groupItems.length - 1 ? (
                <SectionListItemSeparator />
              ) : (
                <></>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <FlatList
      style={[styles.listContainer]}
      data={[
        {
          groupHeader: 'RECENT',
          groupItems: notifications.items.sort(
            (a: Notification, b: Notification) => {
              return a.lastUpdateDate > b.lastUpdateDate ? -1 : 1;
            },
          ),
        },
      ]}
      keyExtractor={item => item.groupHeader}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={notifications.isLoading}
          onRefresh={() => {
            notifications.refresh();
          }}
        />
      }
      ListEmptyComponent={
        <View style={[styles.emptyContainer]}>
          <View style={[styles.oopsCircle]}>
            <FontAwesome5Icon
              style={[styles.oopsIcon]}
              name="exclamation"
              color={theme.colors.error}
              size={24}
            />
          </View>
          <Text style={[styles.oopsText]}>
            You don't have any recent notifications.
          </Text>
        </View>
      }
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export const NotificationsList = withTheme(Component);
