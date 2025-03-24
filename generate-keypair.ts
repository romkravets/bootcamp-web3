import { Keypair } from "@solana/web3.js";
import "dotenv/config"
import fs from "fs";

const keypair  = Keypair.generate();

fs.writeFileSync("keypair.json", JSON.stringify(Array.from(keypair.secretKey)));

const pk = process.env.PK


console.log(keypair, 'keypair')
console.log(keypair.publicKey.toBase58(), 'keypair.publicKey.toBase58()')
console.log(keypair.secretKey, 'keypair.secretKey')

//8WHkQUxkr6oDVUtMGfU9DpUkd2QQeAz5KiJdfY3X43HL

//39AXXZxkDcaReatm51Y2z3XXwHhnXnJyJKk9RbFvSZJE

//39AXXZxkDcaReatm51Y2z3XXwHhnXnJyJKk9RbFvSZJE