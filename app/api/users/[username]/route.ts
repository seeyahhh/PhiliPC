import {getUser} from '@/app/lib/user';

export async function GET(req, {params}){
  const {username} = await params;
  const user = await getUser(username);

  return Response.json(user);
}