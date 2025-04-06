import "dotenv/config";
import {
  Connection, clusterApiUrl, Keypair, PublicKey, sendAndConfirmTransaction, Transaction,
} from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

let privateKey = process.env["SECRET_KEY"];
if (!privateKey) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const user = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const tokenMintAccount = new PublicKey(
  "Ajb4desiF2H1W4vv3cQsS8Sku7PKDLvPUDPjViRAJ8ZN"
);

const metadataData = {
  name: "ROM-12",
  symbol: "RK-12",
  uri: "https://ipfs.io/ipfs/bafkreieugoauwrhdazkhcsyjsgomv6hvcrucabunwrmc6obirs36cvmzqq",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const [metadataPDA] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

const transaction = new Transaction();
const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
  {
    metadata: metadataPDA,
    mint: tokenMintAccount,
    mintAuthority: user.publicKey,
    payer: user.publicKey,
    updateAuthority: user.publicKey,
  },
  {
    createMetadataAccountArgsV3: {
      collectionDetails: null,
      data: metadataData,
      isMutable: true,
    },
  }
);
transaction.add(createMetadataAccountInstruction);

await sendAndConfirmTransaction(connection, transaction, [user]);

const tokenMintLink = getExplorerLink("address", tokenMintAccount.toString(), "devnet");
console.log(`✅ Metadata added! View on Solana Explorer: ${tokenMintLink}`);
