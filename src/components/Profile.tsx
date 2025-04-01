import { GetEnsNameReturnType } from 'viem'
import type { ProfileData } from '~/ens'
import * as styles from './Profile.css'

export const Profile = (
  { name, data }: { name: GetEnsNameReturnType; data: ProfileData },
) => {
  if (data === null) {
    return (
      <main className={styles.main}>
        <h1>{name}</h1>
        <section>no profile data</section>
      </main>
    )
  }
  return (
    <main className={styles.main}>
      <h1>{name}</h1>
      <section>
        <h2>Resolved Address</h2>
        {data.records.resolverAddress && (
          <div className={styles.address}>{data.records.resolverAddress}</div>
        )}
      </section>
      <section>
        <h2>Texts</h2>
        <ul>
          {data.records.texts
            ? data.records.texts.map((param) => (
              <li>
                <strong>{param.key}</strong>: {param.value}
              </li>
            ))
            : undefined}
        </ul>
      </section>
      <section>
        <h2>Coins</h2>
        <ul>
          {data.records.texts
            ? data.records.coins.map((param) => (
              <li>
                <strong>{param.name}</strong>:{' '}
                <span className={styles.address}>{param.value}</span>
              </li>
            ))
            : undefined}
        </ul>
      </section>
    </main>
  )
}
