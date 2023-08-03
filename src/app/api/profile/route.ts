import { User } from "@/app/types";
const f = require('randopeep')





export async function GET(request: Request) {
  try {
    // generate random name
    const fullname = f.name({
      'origin': 'english',
      'last': true,
      'prefix': false
    })

    const fakeUser: User = {
      firstname: fullname.split(' ')[0],
      lastname: fullname.split(' ')[1],
      email: f.internet.email(fullname),
      occupation: f.job(1)
    }
    const auth: any = JSON.parse(request.headers.get('Authorization') || '');

    if (auth.token === '123') {
      return new Response(JSON.stringify(fakeUser), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Bad Request" }), { status: 400 });
  }
}