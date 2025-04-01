import { Link } from '@tanstack/react-router'
import * as styles from './Nav.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link
        to='/'
        activeProps={{
          className: 'font-bold',
        }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>{' '}
      <Link to='/profile'>
        My profile
      </Link>
      <Link to='/profile/$name' params={{ name: 'nick.eth' }}>
        nick.eth Profile
      </Link>
    </nav>
  )
}
