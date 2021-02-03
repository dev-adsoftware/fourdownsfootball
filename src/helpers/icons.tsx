import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faHome,
  faFootballBall,
  faColumns,
  faList,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

export function init() {
  library.add(fab, faHome, faFootballBall, faColumns, faList, faCog);
}
