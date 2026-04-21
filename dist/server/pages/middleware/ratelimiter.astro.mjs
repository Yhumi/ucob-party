export { renderers } from '../../renderers.mjs';

const rateLimit = new Map();

function rateLimiter(limit, windowMs) {
  return (handler) => {
    return async (context) => {
      const { request } = context;
      const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();

      const userLimit = rateLimit.get(ip) || { count: 0, resetTime: now + windowMs };

      if (now > userLimit.resetTime) {
        userLimit.count = 1;
        userLimit.resetTime = now + windowMs;
      } else {
        userLimit.count++;
      }

      rateLimit.set(ip, userLimit);

      if (userLimit.count > limit) {
        return new Response(JSON.stringify({ error: 'Too Many Requests, please wait a moment..' }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            //"Retry-After": Math.ceil((userLimit.resetTime - now) / 1000)
          }
        });
      }

      return handler(context);
    };
  };
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  rateLimiter
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
