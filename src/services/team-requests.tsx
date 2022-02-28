import {API} from 'aws-amplify';
import {Town, TownsService} from './towns';

export interface TeamRequest {
  id: string;
  ownerId: string;
  townId: string;
  town: Town;
  nickname: string;
  primaryColor: string;
  secondaryColor?: string;
  stripeColor?: string;
  teamEmphasis: string;
  offenseStyle: string;
  defenseStyle: string;
  status?: string;
}

class Service {
  constructor() {}

  public mapApiToTeamRequest(input: any): TeamRequest {
    return {
      id: input.id,
      ownerId: input.ownerId,
      townId: input.townId,
      town: new TownsService().mapApiToTown(input.town),
      nickname: input.nickname,
      primaryColor: input.primaryColor,
      secondaryColor: input.secondaryColor,
      stripeColor: input.stripeColor,
      teamEmphasis: input.teamEmphasis,
      offenseStyle: input.offenseStyle,
      defenseStyle: input.defenseStyle,
      status: input.status,
    };
  }

  public mapTeamRequestToApi(input: TeamRequest): any {
    return {
      id: input.id,
      ownerId: input.ownerId,
      townId: input.town.id,
      nickname: input.nickname,
      primaryColor: input.primaryColor,
      secondaryColor: input.secondaryColor,
      stripeColor: input.stripeColor,
      teamEmphasis: input.teamEmphasis,
      offenseStyle: input.offenseStyle,
      defenseStyle: input.defenseStyle,
      status: input.status,
    };
  }

  public async get(id: string): Promise<TeamRequest> {
    try {
      const result = await API.get('fourdowns', `/team-requests/${id}`, {
        queryStringParameters: {
          detailType: 'full',
        },
      });
      return this.mapApiToTeamRequest(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByOwner(
    ownerId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: TeamRequest[]}> {
    try {
      const result = await API.get(
        'fourdowns',
        `/owners/${ownerId}/team-requests`,
        {
          queryStringParameters: {
            ...queryStringParameters,
            ...{detailType: 'full'},
          },
        },
      );
      return {
        items: await Promise.all(
          result.items.map(async (item: any) => {
            return this.mapApiToTeamRequest(item);
          }),
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: TeamRequest): Promise<TeamRequest> {
    console.log('POST /team-requests');
    try {
      const result = await API.post('fourdowns', '/team-requests', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapTeamRequestToApi(body),
        },
        queryStringParameters: {
          detailType: 'full',
        },
      });
      return this.mapApiToTeamRequest(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<TeamRequest> {
    try {
      const result = await API.patch('fourdowns', `/team-requests/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {
          updateMask: updateKeys.join(','),
          detailType: 'full',
        },
      });
      return this.mapApiToTeamRequest(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as TeamRequestsService};
