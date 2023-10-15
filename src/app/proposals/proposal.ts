export interface Proposal {
  id: string;
  name: string;
  description: string;
  imageBase64?: string;
  imageUrl?: string;
  vaultAmount?: number;
  ownerPubkey?: string;
  mintPubkey?: string;
  vaultPubkey?: string;
}
