import type { APIRoute } from "astro";

const getHandler = async () => {
  const response = await fetch("http://api.miyei.me:7050/listings/ucob", {
    method: 'GET',
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