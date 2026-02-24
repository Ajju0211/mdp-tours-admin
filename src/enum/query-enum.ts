export const QueryStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED',
  SPAM: 'SPAM',
} as const



export type QueryStatus =
  (typeof QueryStatus)[keyof typeof QueryStatus]