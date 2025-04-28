import { ConnectButton } from '@rainbow-me/rainbowkit'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { err, fromPromise, fromThrowable, ok, safeTry } from 'neverthrow'
import { Suspense } from 'react'
import type { Address } from 'viem/accounts'
import { getEnsName, GetEnsNameErrorType } from 'viem/actions'
import { useAccount } from 'wagmi'
import { Profile } from '~/components/Profile'
import { getProfile, ProfileData } from '~/ens'
import { getClient } from '~/wagmi'

const profileQueryOptions = (address: Address) =>
  queryOptions({
    enabled: Boolean(address),
    queryKey: [address],
    queryFn: async ({ queryKey: [address] }) => {
      const result = await safeTry(async function* () {
        const client = yield* getClient()
        const name = yield* fromPromise(getEnsName(client, { address }), (e) =>
          err<never, GetEnsNameErrorType>(e as GetEnsNameErrorType))
        const profile = yield* getProfile(client, name)

        return ok({ ...profile, name } as ProfileData & { name: string })
      })
      if (result.isErr()) {
        throw result.error
      }
      return result.value
    },
  })

export const Route = createFileRoute('/profile/')({
  component: RouteComponent,
})

const AccountProfile = ({ address }: { address: Address }) => {
  const { data, error } = useSuspenseQuery(profileQueryOptions(address))

  if (error) throw error

  const { name, ...profile } = data

  return <Profile name={name} data={profile} />
}

function RouteComponent() {
  const { address, isConnecting, isDisconnected } = useAccount()

  if (isDisconnected) {
    return (
      <main>
        <h1>Connect your wallet</h1>
        <ConnectButton />
      </main>
    )
  }

  if (!address || isConnecting) return <>Connecting wallet...</>

  return (
    <Suspense fallback={<>Loading...</>}>
      <AccountProfile address={address} />
    </Suspense>
  )
}
