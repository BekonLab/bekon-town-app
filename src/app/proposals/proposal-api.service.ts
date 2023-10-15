import { Injectable, inject } from '@angular/core';
import { BN, Program } from '@coral-xyz/anchor';
import { Metaplex, toMetaplexFile } from '@metaplex-foundation/js';
import { PROGRAM_ID as METADATA_PROGRAM } from '@metaplex-foundation/mpl-token-metadata';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import {
  ComputeBudgetProgram,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
} from '@solana/web3.js';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { parse, stringify, v4 as uuid } from 'uuid';
import { environment } from '../../environments/environment';
import { MetaplexStore, TenderStore } from '../core';
import { Tender } from '../core/tender';
import { urltoFile } from '../utils';
import { Proposal } from './proposal';
import { toProposal } from './to-proposal';

export interface CreateProposalPayload {
  name: string;
  description: string;
}

export interface UpdateProposalPayload {
  name: string;
  description: string;
}

export interface UpdateProposalImagePayload {
  imageBase64: string;
}

export interface DepositProposalPayload {
  ownerPubkey: string;
  proposalId: string;
  amount: number;
}

export interface FindOneProposalFilterById {
  name: 'filterById';
  id: string;
  ownerPubkey: string;
}

export type FindOneProposalFilter = FindOneProposalFilterById;

@Injectable({ providedIn: 'root' })
export class ProposalApiService {
  private readonly _metaplexStore = inject(MetaplexStore);
  private readonly _tenderStore = inject(TenderStore);
  private readonly _pendingProposal: BehaviorSubject<Proposal | null>;

  readonly pendingProposal$: Observable<Proposal | null>;

  constructor() {
    const rawProposal = localStorage.getItem('proposal');
    const parsedProposal = rawProposal ? JSON.parse(rawProposal) : null;
    const proposal = parsedProposal
      ? toProposal(parsedProposal.id, parsedProposal)
      : null;

    this._pendingProposal = new BehaviorSubject(proposal);
    this.pendingProposal$ = this._pendingProposal.asObservable();
  }

  async create(payload: CreateProposalPayload) {
    const proposal: Proposal = {
      id: uuid(),
      name: payload.name,
      description: payload.description,
    };

    localStorage.setItem('proposal', JSON.stringify(proposal));
    this._pendingProposal.next(proposal);

    return proposal;
  }

  async update(payload: UpdateProposalPayload) {
    const rawProposal = localStorage.getItem('proposal');
    const parsedProposal = rawProposal ? JSON.parse(rawProposal) : null;
    const proposal = parsedProposal
      ? toProposal(parsedProposal.id, parsedProposal)
      : null;
    const updatedProposal = toProposal(parsedProposal.id, {
      ...proposal,
      ...payload,
    });

    localStorage.setItem('proposal', JSON.stringify(updatedProposal));
    this._pendingProposal.next(updatedProposal);

    return updatedProposal;
  }

  async updateImage(payload: UpdateProposalImagePayload) {
    const rawProposal = localStorage.getItem('proposal');
    const parsedProposal = rawProposal ? JSON.parse(rawProposal) : null;
    const proposal = parsedProposal
      ? toProposal(parsedProposal.id, parsedProposal)
      : null;
    const updatedProposal = toProposal(parsedProposal.id, {
      ...proposal,
      ...payload,
    });

    localStorage.setItem('proposal', JSON.stringify(updatedProposal));
    this._pendingProposal.next(updatedProposal);

    return updatedProposal;
  }

  async delete() {
    localStorage.removeItem('proposal');
    this._pendingProposal.next(null);
    return true;
  }

  async publish() {
    const pendingProposal = await firstValueFrom(this.pendingProposal$);
    const metaplex = await firstValueFrom(this._metaplexStore.metaplex$);
    const program = await firstValueFrom(this._tenderStore.program$);
    const provider = await firstValueFrom(this._tenderStore.provider$);

    if (!pendingProposal) {
      throw new Error('Pending proposal is not defined');
    }

    if (!pendingProposal.imageBase64) {
      throw new Error('Pending proposal image is not defined');
    }

    if (!metaplex) {
      throw new Error('Metaplex is not defined');
    }

    if (!program || !provider) {
      throw new Error('Program or provider is not defined');
    }

    // upload image to arweave
    const imageFile = await urltoFile(
      pendingProposal.imageBase64,
      `proposal-${pendingProposal.id}.png`,
      'image/png'
    );
    const imageArrayBuffer = await imageFile.arrayBuffer();
    const imageUrl = await metaplex.storage().upload(
      toMetaplexFile(imageArrayBuffer, `proposal-${pendingProposal.id}.png`, {
        contentType: 'image/png',
        tags: [],
        extension: 'png',
        displayName: `proposal-${pendingProposal.id}`,
        uniqueName: pendingProposal.id,
      })
    );

    // upload metadata to arweave
    const { uri: metadataUri } = await metaplex.nfts().uploadMetadata({
      name: pendingProposal.name,
      image: imageUrl,
      symbol: 'PPSL',
      attributes: [],
      external_url: 'https://www.ppsl.io',
      description: pendingProposal.description,
    });

    // init proposal on-chain
    const proposalId = parse(pendingProposal.id);
    const [proposal] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('proposal', 'utf-8'),
        provider.publicKey.toBuffer(),
        proposalId,
      ],
      program.programId
    );
    const [proposalVault] = PublicKey.findProgramAddressSync(
      [Buffer.from('vault', 'utf-8'), proposal.toBuffer()],
      program.programId
    );
    const [proposalMint] = PublicKey.findProgramAddressSync(
      [Buffer.from('proposal_mint', 'utf-8'), proposal.toBuffer()],
      program.programId
    );
    const [proposalMetadata] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata', 'utf-8'),
        METADATA_PROGRAM.toBuffer(),
        proposalMint.toBuffer(),
      ],
      METADATA_PROGRAM
    );
    const [proposalMasterEdition] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata', 'utf-8'),
        METADATA_PROGRAM.toBuffer(),
        proposalMint.toBuffer(),
        Buffer.from('edition', 'utf-8'),
      ],
      METADATA_PROGRAM
    );
    const userVault = getAssociatedTokenAddressSync(
      proposalMint,
      provider.publicKey,
      true
    );

    const proposalAccounts = {
      signer: provider.publicKey,
      networkOrigin: new PublicKey(environment.networkCreator),
      network: new PublicKey(environment.network),
      proposal,
      vault: proposalVault,
      paymentMint: new PublicKey(environment.paymentMint),
      proposalCollection: new PublicKey(environment.proposalCollection),
      proposalCollectionMetadata: new PublicKey(
        environment.proposalCollectionMetadata
      ),
      proposalCollectionMasterEdition: new PublicKey(
        environment.proposalCollectionMasterEdition
      ),
      proposalMint,
      proposalMetadata,
      proposalMasterEdition,
      userVault,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: METADATA_PROGRAM,
    };
    const proposalParams = {
      id: [...proposalId],
      name: pendingProposal.name,
      description: pendingProposal.description,
      proposalUri: metadataUri,
    };
    await program.methods
      .initProposal(proposalParams)
      .accounts(proposalAccounts)
      .preInstructions([
        ComputeBudgetProgram.setComputeUnitLimit({ units: 300000 }),
      ])
      .rpc();

    return true;
  }

  async deposit(payload: DepositProposalPayload) {
    const program = await firstValueFrom(this._tenderStore.program$);
    const provider = await firstValueFrom(this._tenderStore.provider$);

    if (!program || !provider) {
      throw new Error('Program or provider is not defined');
    }

    const [proposal] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('proposal', 'utf-8'),
        new PublicKey(payload.ownerPubkey).toBuffer(),
        parse(payload.proposalId),
      ],
      program.programId
    );
    const [proposalVault] = PublicKey.findProgramAddressSync(
      [Buffer.from('vault', 'utf-8'), proposal.toBuffer()],
      program.programId
    );
    const depositorVault = getAssociatedTokenAddressSync(
      new PublicKey(environment.paymentMint),
      provider.publicKey,
      false
    );
    const receiverVault = getAssociatedTokenAddressSync(
      new PublicKey(environment.networkMint),
      provider.publicKey,
      false
    );

    const depositAccounts = {
      signer: provider.publicKey,
      network: new PublicKey(environment.network),
      proposal,
      proposalVault,
      depositVault: depositorVault,
      receiverVault,
      paymentMint: new PublicKey(environment.paymentMint),
      networkMint: new PublicKey(environment.networkMint),
      tokenProgram: TOKEN_PROGRAM_ID,
    };

    await program.methods
      .deposit(new BN(payload.amount))
      .accounts(depositAccounts)
      .rpc();

    return true;
  }

  async find(program: Program<Tender>): Promise<Proposal[]> {
    const proposalAccounts = await program.account.proposal.all();
    const metaplex = new Metaplex(program.provider.connection);

    const proposals = await Promise.all(
      proposalAccounts.map(async (proposalAccount) => {
        const [proposalMint] = PublicKey.findProgramAddressSync(
          [
            Buffer.from('proposal_mint', 'utf-8'),
            proposalAccount.publicKey.toBuffer(),
          ],
          program.programId
        );

        const proposalNft = await metaplex
          .nfts()
          .findByMint({ mintAddress: proposalMint });

        const proposalVaultAccount = await getAccount(
          program.provider.connection,
          proposalAccount.account.vault
        );

        return toProposal(stringify(proposalAccount.account.id), {
          name: proposalNft.json?.name,
          description: proposalNft.json?.description,
          imageUrl: proposalNft.json?.image,
          vaultAmount: Number(proposalVaultAccount.amount),
          ownerPubkey: proposalAccount.account.authority.toBase58(),
          mintPubkey: proposalMint.toBase58(),
          vaultPubkey: proposalAccount.account.vault.toBase58(),
        });
      })
    );

    return proposals;
  }

  async findOne(
    program: Program<Tender>,
    filters: FindOneProposalFilter
  ): Promise<Proposal | null> {
    const [proposalPubkey] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('proposal', 'utf-8'),
        new PublicKey(filters.ownerPubkey).toBuffer(),
        parse(filters.id),
      ],
      program.programId
    );

    const proposalAccount = await program.account.proposal.fetchNullable(
      proposalPubkey
    );

    if (proposalAccount === null) {
      return null;
    }

    const metaplex = new Metaplex(program.provider.connection);
    const [proposalMint] = PublicKey.findProgramAddressSync(
      [Buffer.from('proposal_mint', 'utf-8'), proposalPubkey.toBuffer()],
      program.programId
    );
    const proposalNft = await metaplex
      .nfts()
      .findByMint({ mintAddress: proposalMint });
    const proposalVaultAccount = await getAccount(
      program.provider.connection,
      proposalAccount.vault
    );

    return toProposal(stringify(proposalAccount.id), {
      name: proposalNft.json?.name,
      description: proposalNft.json?.description,
      imageUrl: proposalNft.json?.image,
      vaultAmount: Number(proposalVaultAccount.amount),
      ownerPubkey: filters.ownerPubkey,
      mintPubkey: proposalMint.toBase58(),
      vaultPubkey: proposalAccount.vault.toBase58(),
    });
  }
}
