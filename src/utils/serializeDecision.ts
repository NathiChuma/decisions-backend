import { Timestamp } from 'firebase-admin/firestore';

const toIso = (value: unknown): string | undefined => {
  if (!value) return undefined;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return undefined;
};

export const serializeDecision = (data: FirebaseFirestore.DocumentData) => {
  return {
    ...data,
    createdAt: toIso(data.createdAt),
    lockedAt: toIso(data.lockedAt),
    completedAt: toIso(data.completedAt),
  };
};