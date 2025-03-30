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

import fs from "fs";
import bs58 from "bs58";

const secretKeyArray = [
  74, 102, 117, 56, 173, 83, 203, 181, 79, 153, 185, 126, 217, 245, 21, 187, 
  199, 217, 10, 73, 113, 199, 212, 42, 211, 134, 182, 50, 83, 197, 112, 163, 
  165, 6, 10, 184, 70, 159, 111, 52, 118, 44, 8, 45, 96, 61, 224, 28, 34, 107, 
  105, 120, 94, 189, 13, 172, 110, 77, 159, 187, 112, 42, 5, 31
];

// Convert secret key to Base58 format
const secretKeyBase58 = bs58.encode(new Uint8Array(secretKeyArray));

const walletData = {
  name: "Solana Wallet",
  secretKeyBase58: secretKeyBase58,
  secretKeyArray: secretKeyArray
};

// Save to JSON file
fs.writeFileSync("solana-wallet.json", JSON.stringify(walletData, null, 2));

console.log("✅ Wallet saved as solana-wallet.json");

