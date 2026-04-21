export { renderers } from '../../renderers.mjs';

const API_KEY = undefined                             ;
const YHUMI_API_BASE = "https://api.miyei.me:7049/api";
const YHUMI_API_KNOWN_PF_HOSTS = `${YHUMI_API_BASE}/ucob/pfhosts`;
const getHandler = async () => {
  const response = await fetch(YHUMI_API_KNOWN_PF_HOSTS, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  });
  return new Response(
    JSON.stringify({
      success: true,
      data: await response.json()
    }),
    { status: 200 }
  );
};
const GET = getHandler;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
