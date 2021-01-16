import type {
  BucketObject,
  BucketStore,
  EntityCallback,
  EntitiesCallback,
} from 'simperium';
import * as S from '../../';
import * as T from '../../../types';

export class AccountBucket implements BucketStore<T.Account> {
  store: S.Store;

  constructor(store: S.Store) {
    this.store = store;
  }

  get(id: T.EntityId, callback: EntityCallback<BucketObject<T.Note>>) {
    const data = this.store.getState().data.account.get(id);

    callback(null, { id, data });
  }

  find(query: {}, callback: EntitiesCallback<BucketObject<T.Account>>) {
    callback(
      null,
      [...this.store.getState().data.account.entries()].map(([id, data]) => ({
        id,
        data,
      }))
    );
  }

  remove(id: T.EntityId, callback: (error: null) => void) {
    this.store.dispatch({
      type: 'ACCOUNT_BUCKET_REMOVE',
      id,
    });
    callback(null);
  }

  update(
    id: T.EntityId,
    data: T.Account,
    isIndexing: boolean,
    callback: EntityCallback<BucketObject<T.Account>>
  ) {
    this.store.dispatch({
      type: 'ACCOUNT_BUCKET_UPDATE',
      id,
      data,
      isIndexing,
    });
    callback(null, { id, data });
  }
}
