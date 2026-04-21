export { renderers } from '../../renderers.mjs';

const getHandler = async () => {
  const response = await fetch("http://api.miyei.me:7050/listings/ucob", {
    method: "GET"
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
