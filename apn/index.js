const _0x9f8a2c1d = (function() {
  const _0x4b7e9f2a = "TARGET_DOMAIN";
  const _0x8c3d1f6e = "Misconfigured: TARGET_DOMAIN is not set";
  const _0x2a7f9e5b = "Bad Gateway: Tunnel Failed";
  const _0x6d4e8c1f = "relay error:";

  const _0x3f9a2c7b = new Set([
    "host","connection","keep-alive","proxy-authenticate","proxy-authorization",
    "te","trailer","transfer-encoding","upgrade","forwarded",
    "x-forwarded-host","x-forwarded-proto","x-forwarded-port"
  ]);

  const _0x1e5f7a9c = (s) => s ? s.replace(/\/$/, "") : "";

  function _0x8b2d4f6a() {
    const _0xjunk = [0x10, 0x20, 0x30, 0x40];
    return String.fromCharCode(..._0xjunk.map(x => x + Math.floor(Math.random()*5))) + Date.now().toString(36);
  }

  const _0x5c9e3f2d = _0x1e5f7a9c(process.env[_0x4b7e9f2a] || "");

  return async function handler(req) {
    if (!_0x5c9e3f2d) {
      return new Response(_0x8c3d1f6e, { status: 500 });
    }

    try {
      const _0x7a1f9e3c = req.url.indexOf("/", 8);
      const targetUrl = _0x7a1f9e3c === -1 
        ? _0x5c9e3f2d + "/" 
        : _0x5c9e3f2d + req.url.slice(_0x7a1f9e3c);

      const _0x9f3e7a2d = new Headers();
      let _0x1c4f8e6a = null;

      for (const [k, v] of req.headers.entries()) {
        const lk = k.toLowerCase();

        if (_0x3f9a2c7b.has(lk)) continue;
        if (lk.startsWith("x-vercel-")) continue;

        if (lk === "x-real-ip") {
          _0x1c4f8e6a = v;
          continue;
        }
        if (lk === "x-forwarded-for") {
          if (!_0x1c4f8e6a) _0x1c4f8e6a = v;
          continue;
        }

        _0x9f3e7a2d.set(k, v);
      }

      if (_0x1c4f8e6a) _0x9f3e7a2d.set("x-forwarded-for", _0x1c4f8e6a);

      const method = req.method;
      const hasBody = method !== "GET" && method !== "HEAD";

      // Junk code layers
      const _0xnoise = _0x8b2d4f6a();
      if (Math.random() > 0.7) void _0xnoise;

      const fetchOpts = {
        method: method,
        headers: _0x9f3e7a2d,
        body: hasBody ? req.body : undefined,
        duplex: "half",
        redirect: "manual"
      };

      return await fetch(targetUrl, fetchOpts);

    } catch (e) {
      console.error(_0x6d4e8c1f, e);
      return new Response(_0x2a7f9e5b, { status: 502 });
    }
  };
})();

export const config = {
  api: { bodyParser: false },
  supportsResponseStreaming: true,
  maxDuration: 60
};

export default _0x9f8a2c1d;
