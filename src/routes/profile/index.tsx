import { ConnectButton } from '@rainbow-me/rainbowkit'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Address } from 'viem'
import { getEnsName } from 'viem/actions'
import { useAccount } from 'wagmi'
import { Profile } from '~/components/Profile'
import { getProfile, useProfile } from '~/ens'
import { queryClient, wagmiConfig } from '~/wagmi'

const profileQueryOptions = (address: Address) =>
  queryOptions({
    enabled: Boolean(address),
    queryKey: [address],
    queryFn: async ({ queryKey: [address] }) => {
      const client = wagmiConfig.getClient()
      const name = await getEnsName(client, { address })
      return await getProfile(client, name)
    },
  })

export const Route = createFileRoute('/profile/')({
  component: RouteComponent,
})

const AccountProfile = ({ address }: { address: Address }) => {
  const { data, error } = useSuspenseQuery(profileQueryOptions(address))

  if (error) throw error

  return <Profile name={address} data={data} />
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
