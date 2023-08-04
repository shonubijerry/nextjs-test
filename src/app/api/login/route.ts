import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECTER as string;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // catch errors first
    if (body.username !== "admin" || body.password !== "admin") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    return new Response(JSON.stringify({ token: jwt.sign("123", secretKey) }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Bad Request" }), { status: 400 });
  }
}
