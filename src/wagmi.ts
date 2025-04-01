import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { createConfig } from 'wagmi'
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets'
import { mainnet } from 'viem/chains'
import { createClient, http, HttpTransport } from 'viem'
import { addEnsContracts } from '@ensdomains/ensjs'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 1, // 1 hour
    },
  },
})

export const wagmiConfig = createConfig({
  syncConnectedChain: false,
  ssr: true,
  multiInjectedProviderDiscovery: true,
  chains: [addEnsContracts(mainnet)],
  connectors: connectorsForWallets([{
    groupName: 'Popular',
    wallets: [injectedWallet],
  }], { projectId: 'YOUR_PROJECT_ID', appName: 'demo' }),
  client: ({ chain }) => {
    return createClient<HttpTransport, typeof chain>({
      chain,
      transport: http(
        'https://lb.drpc.org/ogrpc?network=ethereum&dkey=AgBISc2US0WgjMYhz9MRMJZsJaE8hzcR76fgOpXEh2H0',
      ),
    })
  },
})
