import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_C-G_pKdr.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CxQoZdwR.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/runner/work/ucob-party/ucob-party/","cacheDir":"file:///home/runner/work/ucob-party/ucob-party/node_modules/.astro/","outDir":"file:///home/runner/work/ucob-party/ucob-party/dist/","srcDir":"file:///home/runner/work/ucob-party/ucob-party/src/","publicDir":"file:///home/runner/work/ucob-party/ucob-party/public/","buildClientDir":"file:///home/runner/work/ucob-party/ucob-party/dist/client/","buildServerDir":"file:///home/runner/work/ucob-party/ucob-party/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/getlistings","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/getlistings\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"getlistings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/getlistings.ts","pathname":"/api/getlistings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/knownpfhosts","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/knownpfhosts\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"knownpfhosts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/knownpfhosts.ts","pathname":"/api/knownpfhosts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/middleware/ratelimiter","isIndex":false,"type":"endpoint","pattern":"^\\/middleware\\/rateLimiter\\/?$","segments":[[{"content":"middleware","dynamic":false,"spread":false}],[{"content":"rateLimiter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/middleware/rateLimiter.js","pathname":"/middleware/rateLimiter","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.D3MNWEIC.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://ucob.miyei.me","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/runner/work/ucob-party/ucob-party/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/getlistings@_@ts":"pages/api/getlistings.astro.mjs","\u0000@astro-page:src/pages/api/knownpfhosts@_@ts":"pages/api/knownpfhosts.astro.mjs","\u0000@astro-page:src/pages/middleware/rateLimiter@_@js":"pages/middleware/ratelimiter.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C66Npz4X.mjs","/home/runner/work/ucob-party/ucob-party/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/home/runner/work/ucob-party/ucob-party/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BwWmLZSh.mjs","/home/runner/work/ucob-party/ucob-party/src/components/Control":"_astro/Control.DqXZZoSA.js","/home/runner/work/ucob-party/ucob-party/src/components/PF":"_astro/PF.B_Cq-UhP.js","/home/runner/work/ucob-party/ucob-party/src/components/Footer":"_astro/Footer.D99f_oVb.js","@astrojs/react/client.js":"_astro/client.BBSbk7kw.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/tank.CVQzo81M.png","/_astro/healer.BimYdW6w.png","/_astro/dps.DpUnVSbN.png","/_astro/any.BXHz4VNM.png","/_astro/tank_healer.DLa4u-pG.png","/_astro/healer_dps.BL-aHUPs.png","/_astro/tank_dps.Q898e8DY.png","/_astro/dowm.DXLHZwnz.png","/_astro/remaining.DPbweZ_G.svg","/_astro/creator.2z9uJ28W.svg","/_astro/updated.CFaddB90.svg","/_astro/server.FGLuVuuV.svg","/_astro/info.wKxulsi0.svg","/_astro/war.1jwJ78oU.png","/_astro/pld.BgL0lCxM.png","/_astro/drk.wUzIfpUU.png","/_astro/gnb.b0vJidBu.png","/_astro/whm.C221AGgO.png","/_astro/sch.DDy-14WZ.png","/_astro/ast.esifqdPj.png","/_astro/mnk.DIKPk82i.png","/_astro/sge.Cwv5oNc5.png","/_astro/drg.BqvnRDib.png","/_astro/nin.DU78amGF.png","/_astro/sam.C77zHfCf.png","/_astro/rpr.lScgbal-.png","/_astro/brd.DqPW1G9R.png","/_astro/mch.Bx5rFs7a.png","/_astro/dnc.Dvz0yBJU.png","/_astro/smn.Bu7GoDrd.png","/_astro/rdm.BthNENtZ.png","/_astro/blm.CwEE2n5f.png","/_astro/blu.B06AyE2Z.png","/_astro/arc.BoG2NPff.png","/_astro/acn.CbJvMHCT.png","/_astro/cnj.DfbO-1qP.png","/_astro/pgl.DOCb1tmt.png","/_astro/lnc.D_bpLbOU.png","/_astro/rog.J2DKFK9G.png","/_astro/thm.COnvp0aJ.png","/_astro/crp.ekQU4wme.png","/_astro/arm.mJJ3gTmG.png","/_astro/bsm.lgnp1HzI.png","/_astro/gsm.BDQwpWoC.png","/_astro/wvr.COmduPI6.png","/_astro/ltw.DjsW_tge.png","/_astro/alc.BMaVf0OJ.png","/_astro/cul.Du9O96Fv.png","/_astro/btn.BAt-HS1n.png","/_astro/min.CoNanVI3.png","/_astro/fsh.CTPd3f5b.png","/_astro/index.D3MNWEIC.css","/favicon.png","/robots.txt","/_astro/Control.DqXZZoSA.js","/_astro/Footer.D99f_oVb.js","/_astro/PF.B_Cq-UhP.js","/_astro/Typography.Ce1SD-MB.js","/_astro/client.BBSbk7kw.js","/_astro/index.DMmN9p2R.js","/_astro/index.Dz22F4ty.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/react-tooltip.min.DItW5K23.js"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"serverIslandNameMap":[],"key":"PI2HN0ylb8YEq/yH4EyfLcqxoyTWM3c6+6Xu4yknj2s=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/runner/work/ucob-party/ucob-party/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
