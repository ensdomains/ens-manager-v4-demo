import { ConnectButton } from '@rainbow-me/rainbowkit'
import { createFileRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className='p-2'>
      <h1>Home</h1>
      <ConnectButton />
    </div>
  )
}
