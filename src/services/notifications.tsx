import {API} from 'aws-amplify';

export interface Notification {
  id: string;
  lastUpdateDate: string;
  ownerId: string;
  message: string;
  title: string;
  recordType: string;
  recordId: string;
  isRead?: boolean;
}

class Service {
  constructor() {}

  public mapApiToNotification(input: any): Notification {
    return {
      id: input.id,
      lastUpdateDate: input.lastUpdateDate,
      ownerId: input.ownerId,
      message: input.message,
      title: input.title,
      recordType: input.recordType,
      recordId: input.recordId,
      isRead: input.isRead,
    };
  }

  public mapNotificationToApi(input: Notification): any {
    return {
      id: input.id,
      lastUpdateDate: input.lastUpdateDate,
      ownerId: input.ownerId,
      message: input.message,
      title: input.title,
      recordType: input.recordType,
      recordId: input.recordId,
      isRead: input.isRead,
    };
  }

  public async get(id: string): Promise<Notification> {
    try {
      const result = await API.get('fourdowns', `/notifications/${id}`, {});
      return this.mapApiToNotification(result);
    } catch (e) {
      throw e;
    }
  }

  public async listByOwner(
    ownerId: string,
    queryStringParameters?: Record<string, unknown>,
  ): Promise<{items: Notification[]}> {
    try {
      const result = await API.get(
        'fourdowns',
        `/owners/${ownerId}/notifications`,
        {
          queryStringParameters,
        },
      );
      return {
        items: result.items.map((item: any) => {
          return this.mapApiToNotification(item);
        }),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(body: Notification): Promise<Notification> {
    console.log('POST /notifications');
    try {
      const result = await API.post('fourdowns', '/notifications', {
        body: {
          sequence: '0',
          lastUpdateDate: new Date().toISOString(),
          lastUpdatedBy: 'system',
          ...this.mapNotificationToApi(body),
        },
      });
      return this.mapApiToNotification(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(
    id: string,
    updateKeys: string[],
    updates: Record<string, unknown>,
  ): Promise<Notification> {
    try {
      const result = await API.patch('fourdowns', `/notifications/${id}`, {
        body: {
          ...updates,
          sequence: String(Number(updates.sequence) + 1),
        },
        queryStringParameters: {updateMask: updateKeys.join(',')},
      });
      return this.mapApiToNotification(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export {Service as NotificationsService};
