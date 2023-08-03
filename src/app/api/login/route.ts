export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.username === "admin" && body.password === "admin") {
      return new Response(JSON.stringify({ token: "123" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Bad Request" }), { status: 400 });
  }
}
