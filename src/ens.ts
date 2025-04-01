import {
  getSubgraphRecords,
  GetSubgraphRecordsReturnType,
} from '@ensdomains/ensjs/subgraph'
import { getRecords, type GetRecordsReturnType } from '@ensdomains/ensjs/public'
import type { ClientWithEns } from '@ensdomains/ensjs/contracts'
import { useAccount, useEnsName, usePublicClient } from 'wagmi'
import { wagmiConfig } from './wagmi'
import { useQuery } from '@tanstack/react-query'
import { GetEnsNameReturnType } from 'viem'

export type ProfileData = {
  records: GetRecordsReturnType
  subgraphRecords: GetSubgraphRecordsReturnType
} | null

export const getProfile = async (
  client: ClientWithEns,
  name?: GetEnsNameReturnType,
): Promise<ProfileData> => {
  if (!name) return null
  const subgraphRecords = await getSubgraphRecords(client, { name })
  const records = (await getRecords(client, {
    name,
    ...subgraphRecords,
  })) as GetRecordsReturnType

  return {
    records,
    subgraphRecords,
  }
}

export const useProfile = () => {
  const client = usePublicClient({ config: wagmiConfig })
  const { address } = useAccount()
  const { data: name, isLoading: isEnsLoading, error: ensError, isSuccess } =
    useEnsName({ address })

  const result = useQuery({
    enabled: !!address && isSuccess && !!name,
    queryKey: [name],
    queryFn: ({ queryKey: [name] }) => getProfile(client, name!),
  })

  return { ...result, isEnsLoading, ensError, name }
}
