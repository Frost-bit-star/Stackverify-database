import StackVerifyDB from "@stackverify/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const db = new StackVerifyDB();
    const data = await db.login(email, password);
    return new Response(JSON.stringify({ token: data.token }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 401 });
  }
}