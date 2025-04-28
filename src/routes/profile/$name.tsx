import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { safeTry } from 'neverthrow'
import { Profile } from '~/components/Profile'
import { getProfile } from '~/ens'
import { getClient, queryClient } from '~/wagmi'

const profileQueryOptions = (name: string) =>
  queryOptions({
    queryKey: [name],
    queryFn: async ({ queryKey: [name] }) => {
      const result = await safeTry(async function* () {
        const client = yield* getClient()
        return await getProfile(client, name)
      })
      if (result.isErr()) throw result.error
      return result.value
    },
  })

export const Route = createFileRoute('/profile/$name')({
  component: RouteComponent,
  loader: ({ params: { name } }) =>
    queryClient.ensureQueryData(profileQueryOptions(name)),
  staleTime: 1000 * 60 * 60 * 1,
  errorComponent: ({ error }) => (
    <main>
      <h1>Failed to fetch a profile</h1>
      <summary>
        Full error message
        <details>{error.message}</details>
      </summary>
    </main>
  ),
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const { name } = Route.useParams()

  return <Profile name={name} data={data} />
}
