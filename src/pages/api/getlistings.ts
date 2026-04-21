import type { APIRoute } from "astro";
import testData from "../../../data/pf-test.json";

const SHOW_TEST_LISTINGS = (import.meta.env.SHOW_TEST_LISTINGS ?? "false") === 'true';

const getHandler = async () => {
  if (SHOW_TEST_LISTINGS) {
    return new Response(
      JSON.stringify({
        success: true,
        data: testData
      }),
      { status: 200 }
    );
  } else {
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
}

//export const GET: APIRoute = rateLimiter(1, 20 * 1000)(getHandler);
export const GET: APIRoute = getHandler;