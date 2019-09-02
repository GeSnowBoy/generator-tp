declare module '*.less';

declare namespace QRModel {
  interface _MStore {
    channelList: Group[];
    selectChannelId: string;
    miniCodeList: MiniCode[];
  }
  interface MStore extends _MStore {
    update(fn: React.Dispatch<_MStore>);
  }
  type PageReq = null | {
    page?: number;
    size?: number;
  };
  type ResponseArray<T = any> = Promise<{
    total: number;
    results: T[];
  }>;
  export interface Group {
    id: string;
    created_at: number;
    updated_at: number;
    name: string;
    description: string;
    comment: string;
  }

  export interface MiniCode {
    id: string;
    created_at: number;
    updated_at: number;
    name: string;
    description: string;
    path: string;
    group_id: string;
  }
}
