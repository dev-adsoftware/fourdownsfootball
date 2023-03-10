import React from 'react';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {PlaySnapshotDto} from '../../services/dtos';
import {IconButton} from '../buttons/icon-button';
import {ToggleButton} from '../buttons/toggle-button';
import {HorizontalSeparator} from '../separators/horizontal-separator';

interface PlayCallConfiguratorProps {
  play: PlaySnapshotDto;
  onSelect: (
    targets?: string[],
    timeOut?: boolean,
    noHuddle?: boolean,
    hurryUp?: boolean,
  ) => void;
}

export const PlayCallConfigurator: React.FC<
  PlayCallConfiguratorProps
> = props => {
  const [calledTimeout, setCalledTimeout] = React.useState(false);
  const [isNoHuddle, setIsNoHuddle] = React.useState(false);
  const [isHurryUp, setIsHurryUp] = React.useState(false);

  return (
    <View row flex={1} w="full" alignItems="center" justifyContent="center">
      <View flex={1}>
        <View
          flex={1}
          w="full"
          p={14}
          alignItems="flex-start"
          justifyContent="flex-start">
          <View flex={1} w="full">
            <View row alignItems="center">
              <View>
                <Icon icon="users-cog" color="primary" size={10} />
              </View>
              <Text
                ml={5}
                flex={1}
                borderBottomColor="darkText"
                borderBottomWidth={1}
                text="Pass Targets"
                color="primary"
                typeFace="sourceSansProSemibold"
                fontSize={15}
              />
            </View>
            <View row ml={10} mt={5} alignItems="center">
              <Text
                ml={5}
                flex={1}
                text="X Deep Out (#82)"
                color="darkText"
                typeFace="sourceSansProSemibold"
                fontSize={13}
              />
              <View ml={0}>
                <Icon icon="caret-up" color="darkText" size={12} />
              </View>
              <View ml={5}>
                <Icon icon="caret-down" color="darkText" size={12} />
              </View>
            </View>
            <View ml={10}>
              <HorizontalSeparator />
            </View>
            <View row ml={10} mt={0} alignItems="center">
              <Text
                ml={5}
                flex={1}
                text="Y Curl (#84)"
                color="darkText"
                typeFace="sourceSansProSemibold"
                fontSize={13}
              />
              <View ml={0}>
                <Icon icon="caret-up" color="darkText" size={12} />
              </View>
              <View ml={5}>
                <Icon icon="caret-down" color="darkText" size={12} />
              </View>
            </View>
            <View ml={10}>
              <HorizontalSeparator />
            </View>
            <View row ml={10} mt={0} alignItems="center">
              <Text
                ml={5}
                flex={1}
                text="Z Corner (#88)"
                color="darkText"
                typeFace="sourceSansProSemibold"
                fontSize={13}
              />
              <View ml={0}>
                <Icon icon="caret-up" color="darkText" size={12} />
              </View>
              <View ml={5}>
                <Icon icon="caret-down" color="darkText" size={12} />
              </View>
            </View>
            <View ml={10}>
              <HorizontalSeparator />
            </View>
            <View row ml={10} mt={0} alignItems="center">
              <Text
                ml={5}
                flex={1}
                text="A Flat (#23)"
                color="darkText"
                typeFace="sourceSansProSemibold"
                fontSize={13}
              />
              <View ml={0}>
                <Icon icon="caret-up" color="darkText" size={12} />
              </View>
              <View ml={5}>
                <Icon icon="caret-down" color="darkText" size={12} />
              </View>
            </View>
            <View ml={10}>
              <HorizontalSeparator />
            </View>
            <View row ml={10} mt={0} alignItems="center">
              <Text
                ml={5}
                flex={1}
                text="B Middle Curl (#42)"
                color="darkText"
                typeFace="sourceSansProSemibold"
                fontSize={13}
              />
              <View ml={0}>
                <Icon icon="caret-up" color="darkText" size={12} />
              </View>
              <View ml={5}>
                <Icon icon="caret-down" color="darkText" size={12} />
              </View>
            </View>
          </View>
          <View w="full">
            <View row alignItems="center">
              <View>
                <Icon icon="stopwatch" color="primary" size={10} />
              </View>
              <Text
                ml={5}
                flex={1}
                borderBottomColor="darkText"
                borderBottomWidth={1}
                text="Time Management"
                color="primary"
                typeFace="sourceSansProSemibold"
                fontSize={15}
              />
            </View>
            <View>
              <View row mt={5} alignItems="center">
                <View
                  row
                  alignItems="center"
                  onPress={() => {
                    setCalledTimeout(!calledTimeout);
                  }}>
                  <View>
                    <Icon icon="history" color="darkText" size={8} />
                  </View>
                  <View ml={5}>
                    <ToggleButton isOn={calledTimeout} />
                  </View>
                </View>

                <View
                  row
                  alignItems="center"
                  onPress={() => {
                    setIsNoHuddle(isHurryUp || !isNoHuddle);
                  }}>
                  <View ml={20}>
                    <Icon icon="users-slash" color="darkText" size={8} />
                  </View>
                  <View ml={5}>
                    <ToggleButton isOn={isNoHuddle} />
                  </View>
                </View>

                <View
                  row
                  alignItems="center"
                  onPress={() => {
                    setIsNoHuddle(true);
                    setIsHurryUp(!isHurryUp);
                  }}>
                  <View ml={20}>
                    <Icon icon="running" color="darkText" size={10} />
                  </View>
                  <View ml={5}>
                    <ToggleButton isOn={isHurryUp} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View flex={1} w="full" justifyContent="flex-end">
          <View p={10}>
            <IconButton
              icon="arrow-alt-circle-right"
              color="primary"
              size={22}
              onPress={() => {
                props.onSelect([], calledTimeout, isNoHuddle, isHurryUp);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
