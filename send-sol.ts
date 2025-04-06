import "dotenv/config";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
  TransactionInstruction
} from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";

// 🔐 Завантаження ключа з .env
const secretKey = process.env.SECRET_KEY ? JSON.parse(process.env.SECRET_KEY) : null;

if (!secretKey || !Array.isArray(secretKey) || secretKey.length !== 64) {
  console.error("❌ Invalid SECRET_KEY in .env");
  process.exit(1);
}

const secretKeyUint8Array = new Uint8Array(secretKey);
const keypair = Keypair.fromSecretKey(secretKeyUint8Array);

// 🔌 Підключення до devnet
const connection = new Connection(clusterApiUrl("devnet"));

const rec = new PublicKey('Hh2Ho83HMZuch7Tf5rxHqpqHytpzxQX18Yb8MnfVtD5x');

const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
const memoText = "Hello from Solana Roman Kravets!";

// 🧾 MEMO інструкція
const addMemoInstruction = new TransactionInstruction({
  keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: true }],
  data: Buffer.from(memoText, "utf-8"),
  programId: memoProgram,
});

(async () => {
  try {
    const tx = new Transaction();

    const sendSolIx = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: rec,
      lamports: 5_000_000,
    });

    tx.add(sendSolIx).add(addMemoInstruction);

    const signature = await sendAndConfirmTransaction(connection, tx, [keypair]);

    console.log(`📝 Memo is: ${memoText}`);
    console.log("✅ Transaction signature:", signature);
  } catch (error) {
    console.error("🚨 Error sending transaction:", error);
  }
})();
