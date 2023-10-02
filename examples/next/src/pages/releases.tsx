import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import { useInfiniteQuery, gql, invalidateOperations, resetOperations } from '../client/query';
import { ReleasesTestDocument } from '../generated/documents';
import { ReleaseType } from '../generated/types';

gql`
  query releasesTest(
    $filter: ReleasesCursorFilterArgs!
    $pagination: ReleasesCursorConnectionArgs!
  ) {
    releases(filter: $filter, pagination: $pagination) {
      edges {
        node {
          id
          title
          artist {
            id
            name
          }
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export default function Releases() {
  const {
    data: dataPaginated,
    fetchNextPage,
    fetchPreviousPage,
    firstPage,
    lastPage,
    orderedList: flatList,
  } = useInfiniteQuery(ReleasesTestDocument, {
    staleTime: 0,
    getNextPageParam(lastPage) {
      return {
        after: lastPage.data.releases.pageInfo.endCursor,
      };
    },
    getPreviousPageParam(firstPage) {
      return {
        before: firstPage.data.releases.pageInfo.startCursor,
      };
    },
    variables({ pageParam = null }) {
      return {
        pagination: pageParam?.before
          ? {
              last: 10,
              before: pageParam.before,
            }
          : {
              first: 10,
              after: pageParam?.after ?? null,
              skip: pageParam?.after == null ? 20 : null,
            },
        filter: {
          releaseType: [ReleaseType.AlbumTrack, ReleaseType.Single],
        },
      };
    },
    list(result) {
      return result.releases.edges.map(edge => edge.node);
    },
    order: [v => v.title, 'asc'],
    uniq(entity) {
      return entity.id;
    },
    filterQueryKey: {},
  });

  const [autoFetch, setAutoFetch] = useState(false);

  useEffect(() => {
    if (lastPage?.data.releases.pageInfo.hasNextPage && autoFetch) {
      fetchNextPage();
    }
  }, [
    lastPage?.data.releases.pageInfo.endCursor,
    lastPage?.data.releases.pageInfo.hasNextPage,
    autoFetch,
  ]);

  return (
    <>
      <Link href="/classic">
        <h2>Classic</h2>
      </Link>

      <br />
      <br />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 'fit-content',
        }}
      >
        <span>
          <input
            checked={autoFetch}
            type="checkbox"
            onChange={() => setAutoFetch(checked => !checked)}
          />
          <label>Auto fetch</label>
        </span>

        <button
          onClick={() => {
            invalidateOperations({
              operations: [ReleasesTestDocument, 'query Test{__typename now}'],
            });
          }}
        >
          Refetch
        </button>

        <button
          onClick={() => {
            resetOperations({
              operations: [ReleasesTestDocument, 'query Test{__typename now}'],
              filters: {
                type: 'all',
              },
            });
          }}
        >
          Clear
        </button>

        <h2>Manual pagination</h2>

        <button
          disabled={!firstPage?.data.releases.pageInfo.startCursor}
          onClick={() => fetchPreviousPage()}
        >
          Prev Page
        </button>
        <button
          disabled={!lastPage?.data.releases.pageInfo.endCursor}
          onClick={() => fetchNextPage()}
        >
          Next Page
        </button>
      </div>

      <h1>Data following arbitrary order</h1>
      <ol>
        {flatList.map(edge => {
          return (
            <li key={edge.id}>
              {edge.title} - {edge.artist.name}
            </li>
          );
        })}
      </ol>

      <h1>Data following pages</h1>
      <ol>
        {dataPaginated?.pages?.flatMap((list, index) => {
          return (
            <Fragment key={index}>
              <h4>{index}</h4>
              {list.data.releases.edges.map(edge => {
                return (
                  <li key={edge.node.id}>
                    {edge.node.title} - {edge.node.artist.name}
                  </li>
                );
              })}
              <br />
            </Fragment>
          );
        })}
      </ol>
    </>
  );
}
