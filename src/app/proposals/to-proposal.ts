import { assertIsNumber, assertIsString } from '../utils';
import { Proposal } from './proposal';

export function toProposal(id: string, data: any): Proposal {
  const {
    name,
    description,
    imageBase64,
    imageUrl,
    vaultAmount,
    ownerPubkey,
    mintPubkey,
    vaultPubkey,
  } = data;

  assertIsString(name);
  assertIsString(description);

  if (imageBase64) {
    assertIsString(imageBase64);
  }

  if (imageUrl) {
    assertIsString(imageUrl);
  }

  if (vaultAmount !== undefined) {
    assertIsNumber(vaultAmount);
  }

  if (ownerPubkey) {
    assertIsString(ownerPubkey);
  }

  if (mintPubkey) {
    assertIsString(mintPubkey);
  }

  if (vaultPubkey) {
    assertIsString(vaultPubkey);
  }

  return {
    id,
    name,
    description,
    ...(imageBase64 ? { imageBase64 } : {}),
    ...(imageUrl ? { imageUrl } : {}),
    ...(vaultAmount !== undefined ? { vaultAmount } : {}),
    ...(ownerPubkey ? { ownerPubkey } : {}),
    ...(mintPubkey ? { mintPubkey } : {}),
    ...(vaultPubkey ? { vaultPubkey } : {}),
  };
}
