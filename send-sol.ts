import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
  import { Keypair } from "@solana/web3.js";


  const secretKey = process.env.SECRET_KEY ? JSON.parse(process.env.SECRET_KEY) : null;

if (!secretKey || !Array.isArray(secretKey) || secretKey.length !== 64) {
    console.error("❌ Secret key має неправильний формат або розмір:", secretKey.length);
    process.exit(1);
}

const secretKeyUint8Array = new Uint8Array(secretKey);
const keypair = Keypair.fromSecretKey(secretKeyUint8Array);

const connection = new Connection(clusterApiUrl("devnet"));
//HTDpDKuxL31cKmhpN8Y2hQF8K1gAcsyKATos75YCYzi

const rec =  new PublicKey('HTDpDKuxL31cKmhpN8Y2hQF8K1gAcsyKATos75YCYzi')

const tx = new Transaction()
const sendSolIx = SystemProgram.transfer({
    fromPubkey:keypair.publicKey,
    toPubkey: rec,
    lamports: 5_000_000
})

tx.add(sendSolIx)

const signature = await connection.sendTransaction(tx, [keypair])

console.log(signature)