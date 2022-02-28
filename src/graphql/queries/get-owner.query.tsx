import {gql} from '@apollo/client';

export const GET_OWNER = gql`
  query Owner($ownerId: ID!) {
    getOwner(id: $ownerId) {
      id
      sequence
      name
      email
      teams {
        id
        town {
          name
        }
        league {
          name
        }
      }
    }
  }
`;
