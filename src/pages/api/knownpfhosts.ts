import type { APIRoute } from "astro";
import { rateLimiter } from "../middleware/rateLimiter";

const API_KEY = import.meta.env.YHUMI_API_KEY;
const YHUMI_API_BASE = 'https://api.miyei.me:7049/api';
const YHUMI_API_KNOWN_PF_HOSTS = `${YHUMI_API_BASE}/ucob/pfhosts`;

const getHandler = async () => {
  const response = await fetch(YHUMI_API_KNOWN_PF_HOSTS, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    }
  });

  return new Response(
    JSON.stringify({
      success: true,
      data: await response.json()
    }),
    { status: 200 }
  );
}

//export const GET: APIRoute = rateLimiter(1, 20 * 1000)(getHandler);
export const GET: APIRoute = getHandler;