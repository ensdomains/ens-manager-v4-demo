import { fromPromise, okAsync, ResultAsync } from 'neverthrow'
import {
  getSubgraphRecords,
  GetSubgraphRecordsReturnType,
} from '@ensdomains/ensjs/subgraph'
import { getRecords, type GetRecordsReturnType } from '@ensdomains/ensjs/public'
import type { ClientWithEns } from '@ensdomains/ensjs/contracts'
import type { GetEnsNameReturnType } from 'viem'
import { GetRecordsError, GetSubgraphRecordsError } from './errors'

export type ProfileData = {
  records: GetRecordsReturnType
  subgraphRecords: GetSubgraphRecordsReturnType
} | null

export const getProfile = (
  client: ClientWithEns,
  name?: GetEnsNameReturnType,
): ResultAsync<ProfileData, Error> => {
  if (!name) {
    return okAsync<ProfileData, Error>(null)
  }

  return fromPromise(
    getSubgraphRecords(client, { name }),
    (e) => new GetSubgraphRecordsError({ cause: e }),
  ).andThen((subgraphRecords) =>
    fromPromise(
      getRecords(client, { name, ...subgraphRecords }),
      (e) => new GetRecordsError({ cause: e }),
    )
      .map(
        (records): ProfileData => ({
          records: records as GetRecordsReturnType,
          subgraphRecords,
        }),
      )
  )
}
