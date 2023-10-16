export type Tender = {
  version: '0.1.0';
  name: 'tender';
  instructions: [
    {
      name: 'acceptRequest';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: 'denyRequest';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: 'deposit';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'network';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'depositVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'receiverVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'networkMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        }
      ];
    },
    {
      name: 'doRequest';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'request';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'price';
          type: 'u64';
        }
      ];
    },
    {
      name: 'initCouncilMember';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'receiver';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'network';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilCollection';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilCollectionMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilCollectionMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'receiverVault';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'initNetwork';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'network';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'networkMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilCollection';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceCollection';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalCollection';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalCollectionVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalCollectionMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'proposalCollectionUri';
          type: 'string';
        }
      ];
    },
    {
      name: 'initProposal';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'network';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'proposalCollection';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalCollectionMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalCollectionMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposalMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'InitProposalParams';
          };
        }
      ];
    },
    {
      name: 'initRoles';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'network';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilCollection';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilCollectionVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilCollectionMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'councilCollectionMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceCollection';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceCollectionVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceCollectionMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceCollectionMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'InitRolesParams';
          };
        }
      ];
    },
    {
      name: 'initServiceProvider';
      accounts: [
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'receiver';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'network';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceCollection';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceCollectionMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceCollectionMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'serviceMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'receiverVault';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'network';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'councilCollection';
            type: 'publicKey';
          },
          {
            name: 'serviceCollection';
            type: 'publicKey';
          },
          {
            name: 'proposalCollection';
            type: 'publicKey';
          },
          {
            name: 'networkMint';
            type: 'publicKey';
          },
          {
            name: 'councilCollectionBump';
            type: 'u8';
          },
          {
            name: 'serviceCollectionBump';
            type: 'u8';
          },
          {
            name: 'proposalCollectionBump';
            type: 'u8';
          },
          {
            name: 'mintBump';
            type: 'u8';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'proposal';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'id';
            type: {
              array: ['u8', 16];
            };
          },
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'vault';
            type: 'publicKey';
          },
          {
            name: 'state';
            type: {
              defined: 'RequestState';
            };
          },
          {
            name: 'vaultBump';
            type: 'u8';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'request';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'paymentMint';
            type: 'u64';
          },
          {
            name: 'state';
            type: {
              defined: 'RequestState';
            };
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'InitProposalParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'id';
            type: {
              array: ['u8', 16];
            };
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'proposalUri';
            type: 'string';
          }
        ];
      };
    },
    {
      name: 'InitRolesParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'serviceCollectionUri';
            type: 'string';
          },
          {
            name: 'councilCollectionUri';
            type: 'string';
          }
        ];
      };
    },
    {
      name: 'RequestState';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'SigningOff';
          },
          {
            name: 'Voting';
          },
          {
            name: 'Succeeded';
          },
          {
            name: 'Completed';
          },
          {
            name: 'Cancelled';
          },
          {
            name: 'Defeated';
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'IncorrectAuthority';
      msg: 'Wrong authority';
    },
    {
      code: 6001;
      name: 'IncorrectOwner';
      msg: 'Wrong owner on a token account';
    },
    {
      code: 6002;
      name: 'IncorrectMint';
      msg: 'Wrong mint on a token account';
    },
    {
      code: 6003;
      name: 'CreateAccountError';
      msg: 'Error create account';
    },
    {
      code: 6004;
      name: 'ErrorInitNotTransferable';
      msg: 'Error not transferable mint cpi';
    },
    {
      code: 6005;
      name: 'ExtensionNotSupported';
      msg: 'Extension not supported';
    },
    {
      code: 6006;
      name: 'InitMintError';
      msg: 'Error init mint cpi';
    },
    {
      code: 6007;
      name: 'IncorrectSeeds';
      msg: 'Incorrect seeds';
    }
  ];
};

export const IDL: Tender = {
  version: '0.1.0',
  name: 'tender',
  instructions: [
    {
      name: 'acceptRequest',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: 'denyRequest',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: 'deposit',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'network',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiverVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'networkMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'doRequest',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'request',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'price',
          type: 'u64',
        },
      ],
    },
    {
      name: 'initCouncilMember',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'receiver',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'network',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilCollection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilCollectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilCollectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiverVault',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'initNetwork',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'network',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'networkMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilCollection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceCollection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalCollection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalCollectionVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalCollectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'proposalCollectionUri',
          type: 'string',
        },
      ],
    },
    {
      name: 'initProposal',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'network',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'proposalCollection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalCollectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalCollectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposalMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'InitProposalParams',
          },
        },
      ],
    },
    {
      name: 'initRoles',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'network',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilCollection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilCollectionVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilCollectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'councilCollectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceCollection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceCollectionVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceCollectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceCollectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'InitRolesParams',
          },
        },
      ],
    },
    {
      name: 'initServiceProvider',
      accounts: [
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'receiver',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'network',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceCollection',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceCollectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceCollectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'serviceMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiverVault',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'network',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'councilCollection',
            type: 'publicKey',
          },
          {
            name: 'serviceCollection',
            type: 'publicKey',
          },
          {
            name: 'proposalCollection',
            type: 'publicKey',
          },
          {
            name: 'networkMint',
            type: 'publicKey',
          },
          {
            name: 'councilCollectionBump',
            type: 'u8',
          },
          {
            name: 'serviceCollectionBump',
            type: 'u8',
          },
          {
            name: 'proposalCollectionBump',
            type: 'u8',
          },
          {
            name: 'mintBump',
            type: 'u8',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'proposal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            type: {
              array: ['u8', 16],
            },
          },
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'vault',
            type: 'publicKey',
          },
          {
            name: 'state',
            type: {
              defined: 'RequestState',
            },
          },
          {
            name: 'vaultBump',
            type: 'u8',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'request',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'paymentMint',
            type: 'u64',
          },
          {
            name: 'state',
            type: {
              defined: 'RequestState',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'InitProposalParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            type: {
              array: ['u8', 16],
            },
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'proposalUri',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'InitRolesParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'serviceCollectionUri',
            type: 'string',
          },
          {
            name: 'councilCollectionUri',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'RequestState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'SigningOff',
          },
          {
            name: 'Voting',
          },
          {
            name: 'Succeeded',
          },
          {
            name: 'Completed',
          },
          {
            name: 'Cancelled',
          },
          {
            name: 'Defeated',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'IncorrectAuthority',
      msg: 'Wrong authority',
    },
    {
      code: 6001,
      name: 'IncorrectOwner',
      msg: 'Wrong owner on a token account',
    },
    {
      code: 6002,
      name: 'IncorrectMint',
      msg: 'Wrong mint on a token account',
    },
    {
      code: 6003,
      name: 'CreateAccountError',
      msg: 'Error create account',
    },
    {
      code: 6004,
      name: 'ErrorInitNotTransferable',
      msg: 'Error not transferable mint cpi',
    },
    {
      code: 6005,
      name: 'ExtensionNotSupported',
      msg: 'Extension not supported',
    },
    {
      code: 6006,
      name: 'InitMintError',
      msg: 'Error init mint cpi',
    },
    {
      code: 6007,
      name: 'IncorrectSeeds',
      msg: 'Incorrect seeds',
    },
  ],
};
