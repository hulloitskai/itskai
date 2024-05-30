import type { FieldPolicy } from "@apollo/client";
import type { Reference } from "@apollo/client/utilities";

export type TCollectionMetadata = {
  currentPage?: number;
  limitValue?: number;
  totalCount?: number;
  totalPages?: number;
};

export type TExistingCollection<T> = Readonly<{
  collection: T[];
  metadata: TCollectionMetadata;
}>;

export type TIncomingCollection<T> = {
  collection?: T[];
  metadata?: TCollectionMetadata;
};

export type CollectionFieldPolicy<TNode> = FieldPolicy<
  TExistingCollection<TNode>,
  TIncomingCollection<TNode>
>;

type KeyArgs = FieldPolicy<any>["keyArgs"];

export const collectionPagination = <T = Reference>(
  keyArgs: KeyArgs = false,
): CollectionFieldPolicy<T> => ({
  keyArgs,
  merge: (existing, incoming) => {
    if (!existing) {
      existing = makeEmptyData();
    }
    if (!incoming) {
      return existing;
    }

    const metadata = { ...existing.metadata, ...incoming.metadata };
    const collection = [...existing.collection];

    // Drop existing collection if limitValue changes.
    if (metadata.limitValue !== existing.metadata.limitValue) {
      return { collection: incoming.collection ?? [], metadata };
    }
    if (incoming.collection) {
      if (metadata.currentPage && metadata.limitValue) {
        const startIndex = metadata.limitValue * (metadata.currentPage - 1);
        incoming.collection.forEach((item, index) => {
          collection[startIndex + index] = item;
        });
      } else {
        collection.push(...incoming.collection);
      }
    }

    return { collection, metadata };
  },
});

const makeEmptyData = <T>(): TExistingCollection<T> => ({
  collection: [],
  metadata: {
    currentPage: 1,
    limitValue: 0,
    totalCount: 0,
    totalPages: 0,
  },
});
