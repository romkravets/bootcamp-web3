import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import {
    airdropIfRequired,
  } from "@solana-developers/helpers";
  

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`⚡️ Connected to devnet`);

const publicKey = new PublicKey("G8h1dTdv4jXYa3oKGFmBBXguGMUHjCyFhzh6Wvabg5th");

//first

const airdrop1 = await airdropIfRequired(
    connection,
    publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL
  );

console.log('AirDrop', airdrop1)

//second
//await connection.requestAirdrop(publicKey, 1*LAMPORTS_PER_SOL)

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 The balance for the wallet at address ${publicKey} is: ${balanceInSOL}`
);

