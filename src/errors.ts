export class GetSubgraphRecordsError extends Error {
  constructor(readonly cause: unknown) {
    super('Failed to get subgraph records', { cause })
  }
}

export class GetRecordsError extends Error {
  constructor(readonly cause: unknown) {
    super('Failed to get fetch record values', { cause })
  }
}
