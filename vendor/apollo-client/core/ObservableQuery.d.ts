import { GraphQLError } from 'graphql';
import { NetworkStatus } from './networkStatus';
import { Observable } from '../util/Observable';
import { QueryScheduler } from '../scheduler/scheduler';
import { ApolloError } from '../errors/ApolloError';
import { ApolloQueryResult, OperationVariables } from './types';
import { ModifiableWatchQueryOptions, WatchQueryOptions, FetchMoreQueryOptions, SubscribeToMoreOptions, ErrorPolicy } from './watchQueryOptions';
import { QueryStoreValue } from '../data/queries';
export declare type ApolloCurrentResult<T> = {
    data: T | {};
    errors?: GraphQLError[];
    loading: boolean;
    networkStatus: NetworkStatus;
    error?: ApolloError;
    partial?: boolean;
};
export interface FetchMoreOptions<TData = any, TVariables = OperationVariables> {
    updateQuery: (previousQueryResult: TData, options: {
        fetchMoreResult?: TData;
        variables?: TVariables;
    }) => TData;
}
export interface UpdateQueryOptions<TVariables> {
    variables?: TVariables;
}
export declare const hasError: (storeValue: QueryStoreValue, policy?: ErrorPolicy) => true | Error | null | undefined;
export declare class ObservableQuery<TData = any, TVariables = OperationVariables> extends Observable<ApolloQueryResult<TData>> {
    options: WatchQueryOptions<TVariables>;
    queryId: string;
    variables: TVariables;
    private isCurrentlyPolling;
    private shouldSubscribe;
    private isTornDown;
    private scheduler;
    private queryManager;
    private observers;
    private subscriptionHandles;
    private lastResult;
    private lastResultSnapshot;
    private lastError;
    constructor({ scheduler, options, shouldSubscribe, }: {
        scheduler: QueryScheduler<any>;
        options: WatchQueryOptions<TVariables>;
        shouldSubscribe?: boolean;
    });
    result(): Promise<ApolloQueryResult<TData>>;
    currentResult(): ApolloCurrentResult<TData>;
    isDifferentFromLastResult(newResult: ApolloQueryResult<TData>): boolean;
    getLastResult(): ApolloQueryResult<TData>;
    getLastError(): ApolloError;
    resetLastResults(): void;
    refetch(variables?: TVariables): Promise<ApolloQueryResult<TData>>;
    fetchMore<K extends keyof TVariables>(fetchMoreOptions: FetchMoreQueryOptions<TVariables, K> & FetchMoreOptions<TData, TVariables>): Promise<ApolloQueryResult<TData>>;
    subscribeToMore<TSubscriptionData = TData>(options: SubscribeToMoreOptions<TData, TVariables, TSubscriptionData>): () => void;
    setOptions(opts: ModifiableWatchQueryOptions): Promise<ApolloQueryResult<TData>>;
    setVariables(variables: TVariables, tryFetch?: boolean, fetchResults?: boolean): Promise<ApolloQueryResult<TData>>;
    updateQuery(mapFn: (previousQueryResult: TData, options: UpdateQueryOptions<TVariables>) => TData): void;
    stopPolling(): void;
    startPolling(pollInterval: number): void;
    private onSubscribe;
    private setUpQuery;
    private tearDownQuery;
}
//# sourceMappingURL=ObservableQuery.d.ts.map