/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Owner
// ====================================================

export interface Owner_getOwner_teams_town {
  name: string;
}

export interface Owner_getOwner_teams_league {
  name: string;
}

export interface Owner_getOwner_teams {
  id: string;
  town: Owner_getOwner_teams_town;
  league: Owner_getOwner_teams_league;
}

export interface Owner_getOwner {
  id: string;
  sequence: string;
  name: string;
  email: string;
  teams: (Owner_getOwner_teams | null)[] | null;
}

export interface Owner {
  getOwner: Owner_getOwner | null;
}

export interface OwnerVariables {
  ownerId: string;
}
