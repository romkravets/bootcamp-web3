import { Keypair } from "@solana/web3.js";
import "dotenv/config"
import fs from "fs";


const pk = process.env.PK

console.log(pk, 'pk')

if (!pk) {
    console.log('No key')
    process.exit(1)
}

const keypairData = JSON.parse(fs.readFileSync("keypair.json", "utf8"));
const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));

console.log(keypair.publicKey.toBase58())