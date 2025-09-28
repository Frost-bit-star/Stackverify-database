# StackVerify Database SDK (`@stackverify/db`) A lightweight and beginner-friendly JavaScript SDK for the **StackVerify Database Platform**. Just log in and start using your database — no drivers, no config, everything is handled internally. 
---
 ## 🚀 Installation Using **npm**: 
``` npm install @stackverify/db 

npm add @stackverify/db 
````

 Registration (Done Outside the SDK)

Users create accounts through your dashboard, not through the SDK.

For testing, here’s a cURL example they can use to register:
```
curl -X POST https://db.stackverify.site/api/register \ -H "Content-Type: application/json" \ -d '{ "email": "john@example.com", "password": "test123" }' 
```
 Expected response:

{ "success": true, "schema": "john_example_com_1695800000000" } 

or use https://stackverify-database.vercel.app

After registering, they can use this SDK to log in and interact with their schema.

---

 Quick Start (Most Common Usage)

import StackVerifyDB from "@stackverify/db"; const db = new StackVerifyDB(); async function start() { //  Login (required first) await db.login("john@example.com", "test123"); //  Insert data await db.insert("customers", { name: "Alice", email: "alice@example.com", }); //  Fetch data const rows = await db.read("customers"); console.log(rows); } start(); 

Everything after login is fully managed by the SDK — no tokens, headers, or manual handling needed.

---

 Full API Reference

 Login (Required Before Anything Else)

await db.login("email@example.com", "password123"); 

This stores your token internally for all future requests.

---

 Get User Info

const me = await db.me(); console.log(me); 

---

 List Your Tables

const tables = await db.listTables(); console.log(tables); 

---

 Insert Data

await db.insert("customers", { name: "Alice", email: "alice@example.com", }); 

---

 Read Data

const rows = await db.read("customers", 50); // Optional filter: const filtered = await db.read("customers", 50, { email: "alice@example.com" }); 

---

 Update Rows

await db.update( "customers", { name: "Alice Updated" }, // New values { email: "alice@example.com" } // Where clause ); 

---

 Delete Rows

await db.delete("customers", { email: "alice@example.com", }); 

---

 Run Raw SQL

await db.query(` CREATE TABLE IF NOT EXISTS customers ( id SERIAL PRIMARY KEY, name TEXT, email TEXT ); `); 

Or:

const result = await db.query("SELECT * FROM customers;"); console.log(result); 

---

 Error Handling (Built-In)

You don’t need to manage tokens, headers, or auth — the SDK does this internally.

If you forget to log in:

Error: You must login() before using the database. 

You can also wrap calls manually:

try { const data = await db.read("customers"); console.log(data); } catch (err) { console.error("Error:", err.message); } 

----
 Using in Node.js

import StackVerifyDB from "@stackverify/db"; const db = new StackVerifyDB(); (async () => { await db.login("email", "password"); console.log(await db.listTables()); })(); 

Run:

node index.js 

---

 Using in Frontend (React / Next.js)

import StackVerifyDB from "@stackverify/db"; const db = new StackVerifyDB(); export default async function Page() { await db.login("john@example.com", "test123"); const rows = await db.read("customers"); return <pre>{JSON.stringify(rows, null, 2)}</pre>; } 

---

 Custom API URL (Optional)

const db = new StackVerifyDB("https://custom.domain.com/api"); 

Default URL:

https://db.stackverify.site/api 

---

 That’s It

No config

No manual tokens

No headers

No SQL drivers

Just:

login → insert → read → update → delete → query 

You're ready to build anything with StackVerify Database.
Enjoy! 🚀
