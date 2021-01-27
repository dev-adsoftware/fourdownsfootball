import React from 'react';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCog,
  faSearch,
  faUserCheck,
  faUserEdit,
  faUserPlus,
  faUserTimes,
  faCheckCircle,
  faSquare,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

type IconProps = {
  icon?: IconDefinition;
  color: string;
  size:
    | 'xs'
    | 'lg'
    | 'sm'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'
    | undefined
    | number;
  opacity?: number;
};

const Icon = ({ icon, color, size, opacity }: IconProps) => {
  let sizeNumber: number;
  if (size === '3x') {
    sizeNumber = 32;
  } else if (size === '2x') {
    sizeNumber = 24;
  } else if (size == 'lg') {
    sizeNumber = 16;
  } else {
    sizeNumber = 8;
  }
  return (
    <FontAwesomeIcon
      icon={icon as IconDefinition}
      color={color}
      size={sizeNumber}
      style={{ opacity: opacity ?? 1.0 }}
    />
  );
};

export const CheckIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faCheck, color, size, opacity });
};

export const ChevronLeftIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faChevronLeft, color, size, opacity });
};

export const ChevronRightIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faChevronRight, color, size, opacity });
};

export const CogIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faCog, color, size, opacity });
};

export const SearchIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faSearch, color, size, opacity });
};

export const UserCheckIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faUserCheck, color, size, opacity });
};

export const UserEditIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faUserEdit, color, size, opacity });
};

export const UserPlusIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faUserPlus, color, size, opacity });
};

export const UserTimesIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faUserTimes, color, size, opacity });
};

export const CircleIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faCircle, color, size, opacity });
};

export const CircleCheckIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faCheckCircle, color, size, opacity });
};

export const SquareIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faSquare, color, size, opacity });
};

export const SquareCheckIcon = ({ color, size, opacity }: IconProps) => {
  return Icon({ icon: faCheckSquare, color, size, opacity });
};
