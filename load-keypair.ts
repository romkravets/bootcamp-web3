import { Keypair } from "@solana/web3.js";
import "dotenv/config";


const secretKey = process.env.SECRET_KEY ? JSON.parse(process.env.SECRET_KEY) : null;


if (!secretKey || !Array.isArray(secretKey) || secretKey.length !== 64) {
    console.error("❌ Secret key має неправильний формат або розмір:", secretKey.length);
    process.exit(1);
}

const secretKeyUint8Array = new Uint8Array(secretKey);
const keypair = Keypair.fromSecretKey(secretKeyUint8Array);


console.log("✅ Public Key:", keypair.publicKey.toBase58());
console.log("✅ Secret Key (Uint8Array):", keypair.secretKey);