import { Keypair } from "@solana/web3.js";
import "dotenv/config"

const keypair  = Keypair.generate();

console.log(keypair, 'keypair')
console.log(keypair.publicKey.toBase58(), 'keypair.publicKey.toBase58()')
console.log(keypair.secretKey, 'keypair.secretKey')


//C7Bcb8j7CWx8rUhm8JvVJofmrFbU9u7xfYccTEREzXc2