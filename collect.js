window.NOIBUJS_CONFIG = { scriptID: "1.0.101" };
(() => {
  var e = {
      327: (e) => {
        for (var t = [], n = 0; n < 256; ++n)
          t[n] = (n + 256).toString(16).substr(1);
        e.exports = function (e, n) {
          var r = n || 0,
            s = t;
          return [
            s[e[r++]],
            s[e[r++]],
            s[e[r++]],
            s[e[r++]],
            "-",
            s[e[r++]],
            s[e[r++]],
            "-",
            s[e[r++]],
            s[e[r++]],
            "-",
            s[e[r++]],
            s[e[r++]],
            "-",
            s[e[r++]],
            s[e[r++]],
            s[e[r++]],
            s[e[r++]],
            s[e[r++]],
            s[e[r++]],
          ].join("");
        };
      },
      217: (e) => {
        var t =
          ("undefined" != typeof crypto &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)) ||
          ("undefined" != typeof msCrypto &&
            "function" == typeof window.msCrypto.getRandomValues &&
            msCrypto.getRandomValues.bind(msCrypto));
        if (t) {
          var n = new Uint8Array(16);
          e.exports = function () {
            return t(n), n;
          };
        } else {
          var r = new Array(16);
          e.exports = function () {
            for (var e, t = 0; t < 16; t++)
              0 == (3 & t) && (e = 4294967296 * Math.random()),
                (r[t] = (e >>> ((3 & t) << 3)) & 255);
            return r;
          };
        }
      },
      171: (e, t, n) => {
        var r = n(217),
          s = n(327);
        e.exports = function (e, t, n) {
          var i = (t && n) || 0;
          "string" == typeof e &&
            ((t = "binary" === e ? new Array(16) : null), (e = null));
          var o = (e = e || {}).random || (e.rng || r)();
          if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), t))
            for (var a = 0; a < 16; ++a) t[i + a] = o[a];
          return t || s(o);
        };
      },
    },
    t = {};
  function n(r) {
    var s = t[r];
    if (void 0 !== s) return s.exports;
    var i = (t[r] = { exports: {} });
    return e[r](i, i.exports, n), i.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      const e = ["metroplexSocketBase", "metroplexHTTPBase"],
        t = [
          "authorization",
          "from",
          "proxy-authorization",
          "content-md5",
          "cookie",
          "x-forwarded-for",
          "x-real-ip",
          "x-device-id",
          "x-request-id",
          "x-auth-token",
          "x-user-id",
          "x-forwarded-for",
          "x-uidh",
          "set-cookie",
          "forwarded",
        ],
        r = /[0-9]+/g,
        s =
          /\b[a-z0-9!#$%&'*+/=?^_â€˜{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_â€˜{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\b/g,
        i = [
          /\b4\d{12}(?:\d{3})?\b/g,
          /\b(?:5[1-5]\d{2}|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}\b/g,
          /\b3[47]\d{13}\b/g,
          /\b3(?:0[0-5]|[68]\d)\d{11}\b/g,
          /\b6(?:011|5\d{2})\d{12}\b/g,
          /\b(?:2131|1800|35\d{3})\d{11}\b/g,
          s,
          /\b(?!000|666)[0-8]\d{2}[-.â— ]?(?!00)\d{2}[-.â— ]?(?!0000)\d{4}\b/g,
          /\b(\d{3}[-.â— ]?\d{3}[-.â— ]?\d{3})\b/g,
          /\+(?:\dâ—?){6,14}\d\b/g,
          /(\b|\+)?(1[-.â— ]?)?\(?(\d{3})\)?[-.â— ]?(\d{3})[-.â— ]?(\d{4})\b/g,
        ],
        o = /^www\d{0,2}$/,
        a = [
          "Image",
          "EventTarget",
          "Window",
          "Node",
          "ApplicationCache",
          "AudioTrackList",
          "ChannelMergerNode",
          "CryptoOperation",
          "EventSource",
          "FileReader",
          "HTMLUnknownElement",
          "IDBDatabase",
          "IDBRequest",
          "IDBTransaction",
          "KeyOperation",
          "MediaController",
          "MessagePort",
          "ModalWindow",
          "Notification",
          "SVGElementInstance",
          "Screen",
          "TextTrack",
          "TextTrackCue",
          "TextTrackList",
          "WebSocket",
          "WebSocketWorker",
          "Worker",
          "XMLHttpRequest",
          "XMLHttpRequestEventTarget",
          "XMLHttpRequestUpload",
        ];
      function c() {
        return window.NOIBUJS_CONFIG ? window.NOIBUJS_CONFIG : {};
      }
      const l = [
          "i.noibu",
          "i.staging.noibu",
          "input.staging.noibu",
          "input.b.noibu",
          "input.noibu",
          "vf.staging.noibu",
          "vf.noibu",
        ],
        u = ["error", "warn", "log"],
        d = [
          "pagehide",
          "pageshow",
          "focus",
          "blur",
          "popstate",
          "online",
          "offline",
          "messageerror",
          "languagechange",
          "hashchange",
          "beforeprint",
          "afterprint",
          "load",
          "resize",
        ],
        h = [
          "visibilitychange",
          "resume",
          "freeze",
          "readystatechange",
          "cut",
          "copy",
          "paste",
        ],
        p = new Set([
          "--quantum-metric-background-image",
          "--quantum-metric-background-position-x",
          "--quantum-metric-background-position-y",
          "--quantum-metric-background-size",
          "--quantum-metric-background-attachment",
          "--quantum-metric-background-origin",
          "--quantum-metric-background-clip",
          "--quantum-metric-background-color",
          "--quantum-metric-border-image-source",
          "--quantum-metric-border-image-slice",
          "--quantum-metric-border-image-width",
          "--quantum-metric-border-image-outset",
          "--quantum-metric-border-image-repeat",
          "--quantum-metric-border-top-style",
          "--quantum-metric-border-right-style",
          "--quantum-metric-border-bottom-style",
          "--quantum-metric-border-left-style",
          "--quantum-metric-border-top-color",
          "--quantum-metric-border-right-color",
          "--quantum-metric-border-bottom-color",
          "--quantum-metric-border-left-color",
          "--quantum-metric-border-top-width",
          "--quantum-metric-border-right-width",
          "--quantum-metric-border-bottom-width",
          "--quantum-metric-border-left-width",
          "--quantum-metric-flex-wrap",
          "--quantum-metric-list-style-image",
          "--quantum-metric-list-style-position",
          "--quantum-metric-max-width",
          "--quantum-metric-outline-color",
          "--quantum-metric-outline-style",
          "--quantum-metric-outline-width",
          "--quantum-metric-max-height",
          "--quantum-metric-height",
          "--quantum-metric-color",
          "--quantum-metric-border-collapse",
          "--quantum-metric-text-indent",
          "--quantum-metric-width",
          "--quantum-metric-position",
          "--quantum-metric-line-height",
          "--quantum-metric-white-space",
          "--quantum-metric-display",
          "--quantum-metric-top",
          "--quantum-metric-pointer-events",
          "--quantum-metric-right",
          "--quantum-metric-overflow-x",
          "--quantum-metric-overflow-y",
          "--quantum-metric-text-align",
          "--quantum-metric-padding-top",
          "--quantum-metric-padding-bottom",
          "--quantum-metric-padding-right",
          "--quantum-metric-padding-left",
          "--quantum-metric-transform",
          "--quantum-metric-text-decoration-line",
          "--quantum-metric-font-variant-ligatures",
          "--quantum-metric-font-variant-caps",
          "--quantum-metric-font-variant-alternates",
          "--quantum-metric-font-variant-numeric",
          "--quantum-metric-font-variant-east-asian",
          "--quantum-metric-font-variant-position",
        ]);
      function g() {
        const e = c();
        return e.scriptID ? e.scriptID : "default";
      }
      function m() {
        const e = c();
        return !!e.njs_version && "beta" === e.njs_version;
      }
      function f() {
        const e = c();
        return e.att_sel ? e.att_sel : {};
      }
      function y() {
        try {
          const e = m() ? "wss://input.b.noibu.com" : "wss://input.noibu.com";
          return e.endsWith("/") ? e.slice(0, -1) : e;
        } catch (e) {
          return "ws://localhost:3000";
        }
      }
      function v() {
        try {
          const e = m()
            ? "https://input.b.noibu.com"
            : "https://input.noibu.com";
          return e.endsWith("/") ? e.slice(0, -1) : e;
        } catch (e) {
          return "http://localhost:3000";
        }
      }
      function I() {
        return v() + "/pv";
      }
      function b() {
        try {
          return "prod";
        } catch (e) {
          return "test";
        }
      }
      var C = n(171),
        S = n.n(C);
      const w = (e, t, n) => {
          if (!(t in e)) return;
          const r = e[t],
            s = n(r);
          if ("function" == typeof s)
            try {
              (s.prototype = s.prototype || {}),
                Object.defineProperties(s, {
                  __noibu__: { enumerable: !1, value: !0 },
                  __noibu_original__: { enumerable: !1, value: r },
                  __noibu_wrapped__: { enumerable: !1, value: s },
                });
            } catch (e) {}
          e[t] = s;
        },
        A = (e, t) => {
          if (
            !e ||
            !e.hasOwnProperty ||
            !Object.prototype.hasOwnProperty.call(e, t)
          )
            return !1;
          const n = Object.getOwnPropertyDescriptor(e, t);
          if (!n.writable) {
            if (!n.configurable) return !1;
            Object.defineProperty(e, t, { writable: !0 });
          }
          return !0;
        },
        E = (e) => {
          if (!e || !e[Symbol.iterator])
            throw new Error(
              "Object.fromEntries() requires a single iterable argument"
            );
          const t = {};
          for (const [n, r] of e) t[n] = r;
          return t;
        };
      function k(e) {
        return e.split("\n").reduce(function (e, t) {
          var n =
            (function (e) {
              var t = _.exec(e);
              if (!t) return null;
              var n = t[2] && 0 === t[2].indexOf("native"),
                r = t[2] && 0 === t[2].indexOf("eval"),
                s = R.exec(t[2]);
              r && null != s && ((t[2] = s[1]), (t[3] = s[2]), (t[4] = s[3]));
              return {
                file: n ? null : t[2],
                methodName: t[1] || "<unknown>",
                arguments: n ? [t[2]] : [],
                lineNumber: t[3] ? +t[3] : null,
                column: t[4] ? +t[4] : null,
              };
            })(t) ||
            (function (e) {
              var t = T.exec(e);
              if (!t) return null;
              return {
                file: t[2],
                methodName: t[1] || "<unknown>",
                arguments: [],
                lineNumber: +t[3],
                column: t[4] ? +t[4] : null,
              };
            })(t) ||
            (function (e) {
              var t = M.exec(e);
              if (!t) return null;
              var n = t[3] && t[3].indexOf(" > eval") > -1,
                r = N.exec(t[3]);
              n && null != r && ((t[3] = r[1]), (t[4] = r[2]), (t[5] = null));
              return {
                file: t[3],
                methodName: t[1] || "<unknown>",
                arguments: t[2] ? t[2].split(",") : [],
                lineNumber: t[4] ? +t[4] : null,
                column: t[5] ? +t[5] : null,
              };
            })(t) ||
            (function (e) {
              var t = O.exec(e);
              if (!t) return null;
              return {
                file: t[2],
                methodName: t[1] || "<unknown>",
                arguments: [],
                lineNumber: +t[3],
                column: t[4] ? +t[4] : null,
              };
            })(t) ||
            (function (e) {
              var t = D.exec(e);
              if (!t) return null;
              return {
                file: t[3],
                methodName: t[1] || "<unknown>",
                arguments: [],
                lineNumber: +t[4],
                column: t[5] ? +t[5] : null,
              };
            })(t);
          return n && e.push(n), e;
        }, []);
      }
      var _ =
          /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
        R = /\((\S*)(?::(\d+))(?::(\d+))\)/;
      var T =
        /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
      var M =
          /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
        N = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
      var D = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
      var O =
        /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
      function L(e, t = 1024) {
        return e ? (e.length < t ? e : e.substring(0, t)) : e;
      }
      function x() {
        let e = window.location.href;
        return (
          window.location.href.startsWith("http")
            ? (e = window.location.href)
            : window.parent &&
              window.parent.location &&
              window.parent.location.href.startsWith("http") &&
              (e = window.parent.location.href),
          L(e)
        );
      }
      function P(e) {
        let t = [{ line: "_", mname: "_", file: "_" }];
        if ("object" != typeof e || !e) return { frames: t, msg: "" };
        e.stack
          ? (t = k(e.stack).map((e) => {
              const t = { line: "_", mname: "_", file: "_" };
              return (
                e.lineNumber &&
                  "<unknown>" !== e.lineNumber &&
                  (t.line = String(e.lineNumber)),
                e.methodName &&
                  "<unknown>" !== e.methodName &&
                  (t.mname = String(e.methodName)),
                e.file && "<unknown>" !== e.file && (t.file = String(e.file)),
                e.column &&
                  "number" == typeof e.column &&
                  (t.column = e.column),
                t
              );
            }))
          : (e.fileName &&
              "string" == typeof e.fileName &&
              (t[0].file = e.fileName),
            e.lineNumber && (t[0].line = String(e.lineNumber)),
            e.columnNumber &&
              Number.isInteger(e.columnNumber) &&
              (t[0].column = e.columnNumber)),
          t.length >= 50 && (t = t.slice(0, 50));
        return { frames: t, msg: e.message ? L(e.message) : "" };
      }
      function F(e) {
        if (Array.prototype.toJSON) {
          const t = Array.prototype.toJSON;
          delete Array.prototype.toJSON;
          const n = JSON.stringify(e);
          return (Array.prototype.toJSON = t), n;
        }
        return JSON.stringify(e);
      }
      function U(e, t, n, r, s, i) {
        if (i) {
          const e = F(n),
            s = new Blob([e]).size;
          return !window.fetch || s > 59e3
            ? new Promise((e) => {
                e();
              })
            : fetch(t, {
                method: "POST",
                headers: r,
                body: F(n),
                keepalive: !0,
              });
        }
        return new Promise((i, o) => {
          const a = new XMLHttpRequest();
          a.open(e, t),
            (a.timeout = s),
            Object.keys(r).forEach((e) => {
              a.setRequestHeader(e, r[e]);
            }),
            (a.onload = () => {
              a.status >= 200 && a.status < 300
                ? i(a.response)
                : o(new Error("Custom Request failed: " + a.statusText));
            }),
            (a.onerror = () => {
              o(new Error("Custom Request failed: " + a.statusText));
            }),
            n ? a.send(F(n)) : a.send();
        });
      }
      function V() {
        const e = c();
        return e.sel && Array.isArray(e.sel);
      }
      function q() {
        const e = c();
        return (function () {
          const e = c();
          return e.http_re && Array.isArray(e.http_re);
        })()
          ? e.http_re
          : [];
      }
      function G() {
        const e = c(),
          t = [".noibu-blocked", ".creditCard"];
        return V() && t.push(...e.sel), "" + t.join(",");
      }
      function B() {
        const e = "1" === window.navigator.doNotTrack,
          t = (function (e) {
            let t = e;
            return (
              t || (t = window.navigator.userAgent),
              (t = t.toLowerCase()),
              new RegExp(
                "(bot|crawl(er)?|sp(i|y)der|search|worm|fetch|nutch|headless|baidu|teoma|yandex|woorankreview|pingdom|synthetic|dataprovider|qaautomation|morningscore|wappalyzer|foregenix|StatusCake|SpeedCurve|Outlook-iOS|bitdiscovery|testing|webflow|bingpreview|(r|R)igor|facebookexternalhit/\\d+\\.\\d+)",
                "i"
              ).test(t)
            );
          })(null);
        return e || t;
      }
      function W(e) {
        return e ? ("object" == typeof e ? F(e) : String(e)) : "";
      }
      function H(e) {
        let t = L(window.location.href);
        return e && "" !== e.trim() && "undefined" !== e && (t = W(L(e))), t;
      }
      function Z(e, t) {
        try {
          return "function" == typeof t && e instanceof t;
        } catch (e) {
          return !1;
        }
      }
      const j = {
        "input.noibu.com": !0,
        "input.staging.noibu.com": !0,
        "vf.noibu.com": !0,
        "vf.staging.noibu.com": !0,
        "cdn.noibu.com": !0,
      };
      class z {
        constructor(e) {
          this._provider = e;
        }
        static isAvailable(e) {
          let t = !0,
            n = null;
          try {
            const t = e();
            t.setItem("n_key", 0), t.removeItem("n_key");
          } catch (e) {
            (t = !1), (n = e);
          }
          return { result: t, error: n };
        }
        load(e) {
          return this._provider.getItem(e);
        }
        save(e, t) {
          this._provider.setItem(e, t);
        }
        remove(e) {
          this._provider.removeItem(e);
        }
        calculateUsedSize() {
          let e = 0;
          for (let t = 0; t < this._provider.length; t++) {
            const n = this._provider.key(t);
            if (n) {
              e += n.length;
              const t = this._provider.getItem(n);
              t && (e += t.length);
            }
          }
          return e;
        }
      }
      class K extends z {
        constructor() {
          super(window.localStorage);
        }
        static isAvailable() {
          return z.isAvailable(() => window.localStorage);
        }
      }
      class Q extends z {
        constructor() {
          super(window.sessionStorage);
        }
        static isAvailable() {
          return z.isAvailable(() => window.sessionStorage);
        }
      }
      class Y {
        constructor() {
          const e = K.isAvailable(),
            t = Q.isAvailable();
          (this._isLocalStorageAvailable = e.result),
            (this._isSessionStorageAvailable = t.result),
            (this._localStorageError = e.error),
            (this._sessionStorageError = t.error),
            (this._provider = null),
            (this._type = "unavailable"),
            this._isLocalStorageAvailable
              ? ((this._provider = new K()), (this._type = "LocalStorage"))
              : this._isSessionStorageAvailable &&
                ((this._provider = new Q()), (this._type = "SessionStorage"));
        }
        static getInstance() {
          return this._instance || (this._instance = new Y()), this._instance;
        }
        isAvailable() {
          return null != this._provider;
        }
        load(e) {
          return this.isAvailable() ? this._provider.load(e) : null;
        }
        save(e, t) {
          this.isAvailable() && this._provider.save(e, t);
        }
        remove(e) {
          this.isAvailable() && this._provider.remove(e);
        }
        calculateUsedSize() {
          return this.isAvailable() ? this._provider.calculateUsedSize() : 0;
        }
        getDiagnoseInfo() {
          return `storage provider: ${this._type} (localStorage available: ${this._isLocalStorageAvailable}, error: ${this._localStorageError}) (sessionStorage available: ${this._isSessionStorageAvailable}, error: ${this._sessionStorageError})`;
        }
      }
      class J {
        constructor(e) {
          (this.pageVisitId = S()()),
            (this.isClientDisabled = null),
            (this.browserId = null),
            (this.pageVisitSeq = null),
            (this.lastActiveTime = new Date()),
            (this.noibuErrorURL = e),
            this._setupStorageVars(),
            (this.cltErrorPostCounter = 0),
            (this.maxSocketInactiveTime = 2100);
        }
        static configureInstance(e) {
          this.instance ||
            ((this.noibuErrorURL = e),
            (this.instance = new J(e)),
            (this.instance.noibuErrorURL = e));
        }
        static getInstance() {
          if (!this.instance)
            throw new Error("ClientConfig was not configured");
          return this.instance;
        }
        lockClient(e, t) {
          const n = new Date();
          n.setMinutes(n.getMinutes() + e);
          const r = this._getClientState();
          (r.DisabledStatus = !0),
            (r.ClientUnlockTime = n),
            this._storeBrowserData(r),
            this.postNoibuErrorAndOptionallyDisableClient(t, !0, "warn");
        }
        lockClientUntilNextPage(e) {
          this.postNoibuErrorAndOptionallyDisableClient(e, !0, "warn");
        }
        updateLastActiveTime(e) {
          this.lastActiveTime = e;
          const t = this._getLsObject();
          (t.LastActive = e), this._storeBrowserData(t);
        }
        getPageVisitSeq() {
          if (this._pageVisitSeqNeedsReset()) {
            this.pageVisitSeq = 0;
            const e = this._getLsObject();
            (e.CurrentPageVisitCount = this.pageVisitSeq + 1),
              (e.LastActive = new Date()),
              this._storeBrowserData(e);
          }
          return this.pageVisitSeq;
        }
        _getLsObject() {
          const e = Y.getInstance().load("n_browser_data");
          if (!e) return this._generateAndStoreData();
          let t = {};
          try {
            t = JSON.parse(e);
          } catch (e) {
            return this._generateAndStoreData();
          }
          return null == t.BrowserId ||
            null == t.DisabledStatus ||
            null == t.CurrentPageVisitCount ||
            null == t.LastActive
            ? this._generateAndStoreData()
            : t;
        }
        _pageVisitSeqNeedsReset() {
          const e = this._getClientState(),
            t = new Date();
          return t.setMinutes(t.getMinutes() - 45), new Date(e.LastActive) < t;
        }
        _setupStorageVars() {
          const e = Y.getInstance();
          if (!e.isAvailable())
            return void this.postNoibuErrorAndOptionallyDisableClient(
              "Storage is unavailable, disabling client. " +
                e.getDiagnoseInfo(),
              !0,
              "error"
            );
          const t = this._getClientState();
          if (
            (this._pageVisitSeqNeedsReset() && (t.CurrentPageVisitCount = 0),
            (this.browserId = t.BrowserId),
            (this.pageVisitSeq = t.CurrentPageVisitCount),
            (this.isClientDisabled = t.DisabledStatus),
            this.isClientDisabled)
          )
            return;
          if (
            ((t.CurrentPageVisitCount += 1),
            (t.LastActive = new Date()),
            b().includes("video") && (t.pvId = this.pageVisitId),
            t.CurrentPageVisitCount >= 300)
          ) {
            const e = new Date();
            e.setMinutes(e.getMinutes() + 45),
              (t.ClientUnlockTime = e),
              (t.DisabledStatus = !0),
              this.postNoibuErrorAndOptionallyDisableClient(
                "Hit max page visits, disabling client for 45mins",
                !0,
                "error"
              );
          }
          null === this._storeBrowserData(t).BrowserId &&
            (this.postNoibuErrorAndOptionallyDisableClient(
              "Null browser in storage, disabling client",
              !0,
              "error"
            ),
            (this.browserId = null));
        }
        _getClientState() {
          const e = this._getLsObject();
          return (
            e.ClientUnlockTime &&
              new Date(e.ClientUnlockTime) <= new Date() &&
              ((e.ClientUnlockTime = null),
              (e.DisabledStatus = !1),
              this._storeBrowserData(e)),
            e
          );
        }
        _generateAndStoreData() {
          return this._storeBrowserData(this._generateNewBrowserData());
        }
        _generateNewBrowserData() {
          const e = {
            DisabledStatus: !1,
            BrowserId: S()(),
            CurrentPageVisitCount: 0,
            ClientUnlockTime: null,
            LastActive: new Date(),
          };
          return b().includes("video") && (e.pvId = this.pageVisitId), e;
        }
        _storeBrowserData(e) {
          const t = Y.getInstance();
          try {
            return t.save("n_browser_data", F(e)), e;
          } catch (e) {
            this.postNoibuErrorAndOptionallyDisableClient(
              `Error writing browser data to storage, disabling client: ${e.message}, ` +
                t.getDiagnoseInfo(),
              !0,
              "error"
            );
            return {
              DisabledStatus: !0,
              BrowserId: null,
              CurrentPageVisitCount: 0,
            };
          }
        }
        postNoibuErrorAndOptionallyDisableClient(e, t, n, r = !1) {
          if (this.isClientDisabled) return;
          if ((t && (this.isClientDisabled = !0), "warn" === n)) return;
          let s = `Noibu Browser ID(${
            this.browserId ? this.browserId : ""
          }), PV ID ${this.pageVisitId}, Script ID ${g()}, and User Agent ${
            window.navigator.userAgent
          } error: ${W(e)}`;
          if (this.cltErrorPostCounter >= 50) {
            const e = new Date();
            e.setMinutes(e.getMinutes() + 10);
            const t = this._getClientState();
            (t.DisabledStatus = !0),
              (t.ClientUnlockTime = e),
              this._storeBrowserData(t),
              (this.isClientDisabled = !0),
              (s =
                "Shutting collect off, we reached the maximum limit of collect errors sent.");
          }
          const i = { url: window.location.href, err_msg: s, sev: n },
            o = { "content-type": "application/json" };
          r
            ? fetch(this.noibuErrorURL, {
                method: "POST",
                headers: o,
                body: F(i),
                keepalive: !0,
              })
            : U("POST", this.noibuErrorURL, i, o, 2e3, !1).catch(() => {}),
            "error" === n && (this.cltErrorPostCounter += 1);
        }
        isInactive() {
          const e = new Date();
          return (
            e.setSeconds(e.getSeconds() - this.maxSocketInactiveTime),
            this.lastActiveTime < e
          );
        }
      }
      function $(e, t, n, r) {
        if (!e || !t || !n) return;
        const s = (e) => {
          try {
            n(e);
          } catch (e) {
            J.getInstance().postNoibuErrorAndOptionallyDisableClient(
              "addEventListener callback error: " + e.message,
              !1,
              "error"
            );
          }
        };
        try {
          e.addEventListener(t, s, r);
        } catch (n) {
          if (
            n instanceof TypeError &&
            (() => {
              if (!Reflect) return !1;
              try {
                Reflect.get(e, "addEventListener")(t, s, r);
              } catch (e) {
                return !1;
              }
              return !0;
            })()
          )
            return;
          J.getInstance().postNoibuErrorAndOptionallyDisableClient(
            "addEventListener error: " + n.message,
            !1,
            "error"
          );
        }
      }
      class X {
        constructor() {
          (this.expectedVideoLength = 0),
            (this.expectedVfSeq = 0),
            (this.httpSequenceNumber = 0),
            (this.httpOverLimitCount = 0),
            (this.httpDroppedPayloadByTypeCount = 0),
            (this.httpDroppedPayloadByLengthCount = 0),
            (this.httpPayloadCount = 0),
            (this.expectedPvPart = 0),
            (this.videoClicks = 0),
            (this.pvClicks = 0),
            (this.errCount = 0),
            (this.httpCount = 0),
            (this.didCutPv = !1),
            (this.didCutVideo = !1),
            (this.writeTimeout = null),
            (this.didStartVideo = !1),
            this._setupListeners();
        }
        static getInstance() {
          return this.instance || (this.instance = new X()), this.instance;
        }
        addVideoFragData(e, t) {
          (this.expectedVfSeq = e), (this.expectedVideoLength = t);
        }
        setPvPart(e) {
          this.expectedPvPart = e;
        }
        addVideoClick() {
          this.videoClicks += 1;
        }
        addPvClick() {
          this.pvClicks += 1;
        }
        addError() {
          this.errCount += 1;
        }
        addHttpEvent() {
          this.httpCount += 1;
        }
        addHttpData() {
          this.httpSequenceNumber += 1;
        }
        addHttpDataOverLimit() {
          this.httpOverLimitCount += 1;
        }
        addHttpDataDropByType() {
          this.httpDroppedPayloadByTypeCount += 1;
        }
        addHttpDataDropByLength() {
          this.httpDroppedPayloadByLengthCount += 1;
        }
        addHttpDataPayloadCount() {
          this.httpPayloadCount += 1;
        }
        setDidCutVideo() {
          this.didCutVideo = !0;
        }
        setDidStartVideo() {
          this.didStartVideo = !0;
        }
        setDidCutPv() {
          this.didCutPv = !0;
        }
        _setupListeners() {
          $(window, "pagehide", () => {
            this._postMetricsIfActive("pagehide");
          });
        }
        _postMetricsIfActive(e) {
          J.getInstance().isClientDisabled ||
            J.getInstance().isInactive() ||
            this.postMetrics(e);
        }
        postMetrics(e) {
          const t = {
            br_id: J.getInstance().browserId,
            pv_id: J.getInstance().pageVisitId,
            cv: 2,
            v: 1,
            exp_vid_len: this.expectedVideoLength,
            exp_vf_seq: this.expectedVfSeq,
            exp_pc_seq: this.expectedPvPart,
            exp_http_seq: this.httpSequenceNumber,
            http_payloads: this.httpPayloadCount,
            http_drop_oversize: this.httpDroppedPayloadByLengthCount,
            http_drop_type: this.httpDroppedPayloadByTypeCount,
            http_over_limit: this.httpOverLimitCount,
            vid_clicks: this.videoClicks,
            pv_clicks: this.pvClicks,
            did_cut_pv: this.didCutPv,
            did_cut_vid: this.didCutVideo,
            did_start_vid: this.didStartVideo,
            exp_http: this.httpCount,
            exp_err: this.errCount,
            on_url: document.location.href,
          };
          window.dispatchEvent(
            new CustomEvent("noibuPostMetrics", { detail: e })
          ),
            window.fetch &&
              window.fetch(v() + "/metrics", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: F(t),
                keepalive: !0,
              });
        }
      }
      class ee {
        constructor() {
          (this.latestPageVisitFrag = null),
            (this.writeTimeout = null),
            (this.flushedStorage = !1);
          Y.getInstance().isAvailable() && this._postPreviousPageVisit();
        }
        static getInstance() {
          return this.instance || (this.instance = new ee()), this.instance;
        }
        checkAndStoreRetryQueue(e, t) {
          const { type: n, payload: r } = e[e.length - 1];
          if ("p" !== n || !r.pvp) return;
          (r.pvp.events ? r.pvp.events : []).filter(
            (e) => "userstep" === e.type || "err" === e.type || "loc" === e.type
          ).length > 0 && this.writePageVisitsFromRetryQueue(e, t);
        }
        writePageVisitsFromRetryQueue(e, t) {
          const n = [];
          for (let t = 0; t < e.length; t += 1) {
            const { type: r, payload: s } = e[t];
            if ("p" === r) {
              const e = s.pvp;
              n.push(e);
            }
          }
          this._writePageVisitFrags(n, t);
        }
        _writePageVisitFrags(e, t) {
          const n = {
              pageVisitFrags: e,
              pageVisitInfo: t,
              timestamp: new Date(),
            },
            r = Y.getInstance(),
            s = F(n);
          try {
            r.save("n_stored_page_visit", s);
          } catch (e) {
            r.remove("n_stored_page_visit");
            const t = r.calculateUsedSize();
            J.getInstance().postNoibuErrorAndOptionallyDisableClient(
              `Error writing pv to storage: ${e}, json size: ${s.length}, storage size: ${t}, ` +
                r.getDiagnoseInfo(),
              !1,
              "error"
            );
          }
        }
        _getPostData() {
          const e = Y.getInstance(),
            t = e.load("n_stored_page_visit");
          if (!t) return null;
          let n = {};
          try {
            n = JSON.parse(t);
          } catch (n) {
            return (
              e.remove("n_stored_page_visit"),
              J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                `Error parsing page visit string '${t}': ${n}`,
                !1,
                "error"
              ),
              null
            );
          }
          if (n.timestamp) {
            const e = new Date();
            if (
              (e.setSeconds(e.getSeconds() - 2100),
              e >= Date.parse(n.timestamp))
            )
              return null;
          }
          const r = { pvi: n.pageVisitInfo, pvp: [], pvvf: [] };
          r.pvi.last = !0;
          for (let e = 0; e < n.pageVisitFrags.length; e += 1)
            r.pvp.push(n.pageVisitFrags[e]);
          return r;
        }
        _postPreviousPageVisit() {
          this._getPostPageVisitPromise()
            .then(() => {
              this._updateStorageFlushed();
            })
            .catch(() => {
              this._updateStorageFlushed();
            });
        }
        _updateStorageFlushed() {
          this.flushedStorage = !0;
          Y.getInstance().remove("n_stored_page_visit");
        }
        _getPostPageVisitPromise() {
          return new Promise((e, t) => {
            const n = this._getPostData();
            if (!n) return void e();
            U("POST", I(), n, { "content-type": "application/json" }, 2e3, !0)
              .then(() => {
                e();
              })
              .catch((e) => {
                t(new Error("Page visit post request rejected due to: ", e));
              });
          });
        }
      }
      function te() {
        return (
          !("now" in Date) ||
          "number" != typeof Date.now() ||
          !("toISOString" in new Date()) ||
          "string" != typeof new Date().toISOString()
        );
      }
      function ne(e) {
        if ("number" != typeof e && te()) {
          if (
            Date.prototype.hasOwnProperty("valueOf") &&
            "function" == typeof e.valueOf &&
            "number" == typeof e.valueOf()
          )
            return e.valueOf();
          J.getInstance().postNoibuErrorAndOptionallyDisableClient(
            "The date object has been overwritten and can't be processed properly.\n      Client has been disabled.",
            !0,
            "error",
            !0
          );
        }
        return e;
      }
      function re() {
        return window.performance && window.performance.now
          ? window.performance.now()
          : ne(Date.now());
      }
      class se {
        constructor(e) {
          const t = y();
          (this.forceClosed = !1),
            (this.socket = null),
            (this.socketInstanceId = null),
            (this.previousMessageType = ""),
            (this.currentConnectionAttempts = 0),
            (this.connectionCount = 0),
            (this.sessionStartTime = re()),
            (this.connectionPromise = null),
            (this.pageVisitInfoSent = !1),
            (this.connectionURL = t + "/pv_part"),
            (this.postURL = I()),
            (this.messageSequenceNum = 0),
            (this.latestReceivedSeqNumber = -1),
            (this.isRetryLoopDisabled = !1),
            (this.retryMessageQueue = []),
            (this.metroplexTypeLock = {}),
            (this.initialURL = x()),
            (this.initialReferingURL = window.document.referrer
              ? L(window.document.referrer)
              : ""),
            (this.sessionTimestamp = new Date()),
            (this.latestReceivedSeqNumStoredTime = new Date()),
            (this.instanceId = S()()),
            (this.scriptInstanceId = e),
            (this.sessionLength = 0),
            (this.socketCloseCodes = []),
            (this.socketOpens = []),
            (this.ackedOnce = !1),
            (this.metroRetryFrequencyMS = 3e4);
        }
        static getInstance(e) {
          return (
            this.instance ||
              ((this.instance = new se(e)), this.instance.start()),
            this.instance
          );
        }
        start() {
          this.connectSocket(), this._setupOffloadEvents();
        }
        _addSeqNumToPayload(e, t) {
          switch (e) {
            case "p":
              this._setSeqNumInPayloadAndIncrementSeqNum("pvp", t);
              break;
            case "v":
              this._setSeqNumInPayloadAndIncrementSeqNum("pvvf", t);
              break;
            case "h":
              this._setSeqNumInPayloadAndIncrementSeqNum("pvh", t);
              break;
            case "m":
              this._setSeqNumInPayloadAndIncrementSeqNum("pvm", t);
          }
        }
        _setSeqNumInPayloadAndIncrementSeqNum(e, t) {
          (t[e].seq_num = this.messageSequenceNum),
            (this.messageSequenceNum += 1);
        }
        sendMessage(e, t) {
          if (e in this.metroplexTypeLock || J.getInstance().isClientDisabled)
            return !1;
          const n = t;
          if (
            ("wr" !== e &&
              (this._addSeqNumToPayload(e, n),
              this.retryMessageQueue.push({ payload: n, type: e }),
              ee
                .getInstance()
                .checkAndStoreRetryQueue(
                  this.retryMessageQueue,
                  this.getPageInformation()
                )),
            this.isConnected() &&
              this.pageVisitInfoSent &&
              this._sendSocketMessage(n),
            (this.previousMessageType = e),
            "p" === e && t.pvp)
          ) {
            const e = t.pvp.events ? t.pvp.events : [];
            this._updateLatestPvTimestamp(e);
          }
          return !0;
        }
        _updateLatestPvTimestamp(e) {
          e.filter((e) => "userstep" === e.type).length > 0 &&
            J.getInstance().updateLastActiveTime(new Date());
        }
        isConnected() {
          return null !== this.socket && 1 === this.socket.readyState;
        }
        isConnecting() {
          return null !== this.socket && 0 === this.socket.readyState;
        }
        close() {
          (this.forceClosed = !0),
            (this.isConnected() || this.isConnecting()) &&
              this.socket.close(1e3);
        }
        handleConnect(e, t) {
          (t || (!this.isConnected() && !this.isConnecting())) &&
            ((this.currentConnectionAttempts += 1),
            (this.socket = new WebSocket(this.connectionURL)),
            (this.socketInstanceId = S()()),
            (this.socket.onerror = () => {}),
            (this.socket.onclose = (t) => {
              (this.pageVisitInfoSent = !1),
                this.forceClosed ||
                  (this.socketCloseCodes.push(
                    `${te() ? "" : new Date().toISOString()}:${t.code}`
                  ),
                  this.isConnecting() ||
                    (clearInterval(this.retryMetroplexInterval),
                    this.currentConnectionAttempts >=
                    (function () {
                      try {
                        return 20;
                      } catch (e) {
                        return 2;
                      }
                    })()
                      ? J.getInstance().lockClientUntilNextPage(
                          "Too many reconnection attempts, locking until next page"
                        )
                      : this.connectionCount >= 100
                      ? J.getInstance().lockClientUntilNextPage(
                          "Too many connections, locking until next page"
                        )
                      : setTimeout(
                          () => {
                            this.handleConnect(e, !1);
                          },
                          this.currentConnectionAttempts ** 2 *
                            (function () {
                              try {
                                return METROPLEX_CONSECUTIVE_CONNECTION_DELAY;
                              } catch (e) {
                                return 1e3;
                              }
                            })()
                        )));
            }),
            (this.socket.onmessage = (t) => {
              this._onSocketMessage(t, e);
            }),
            (this.socket.onopen = () => {
              this.socketOpens.push(
                "" + (te() ? "" : new Date().toISOString())
              ),
                this._onSocketOpen();
            }));
        }
        connectSocket() {
          return (
            this.isConnected() ||
              this.isConnecting() ||
              (this.connectionPromise = new Promise((e) => {
                this.handleConnect(e, !1),
                  $(window, "visibilitychange", () => {
                    if (J.getInstance().isClientDisabled) return;
                    const t = "visible" === document.visibilityState;
                    t &&
                      ((this.forceClosed = !1),
                      (this.isConnected() || this.isConnecting()) &&
                        ((this.socket.onclose = () => {}),
                        this.socket.close(1e3)),
                      this.handleConnect(e, t));
                  });
              })),
            this.connectionPromise
          );
        }
        addEndTimeToPayload(e, t) {
          const n = Math.ceil(re() - this.sessionStartTime);
          t && (this.sessionLength = n);
          const r = new Date(this.sessionTimestamp.getTime() + n).toISOString();
          e.end_at = r;
        }
        _onSocketOpen() {
          this.isConnected() &&
            !J.getInstance().isClientDisabled &&
            (this._sendSocketMessage(this.getPageInformation()),
            (this.pageVisitInfoSent = !0),
            (this.currentConnectionAttempts = 0),
            (this.previousMessageType = ""),
            this._sendUnconfirmedMessages(!1),
            this.setupRetryMechanism(),
            (this.connectionCount += 1));
        }
        _onSocketMessage(e, t) {
          switch (e.data) {
            case "vid_block":
              (this.metroplexTypeLock.v = !0), X.getInstance().setDidCutVideo();
              break;
            case "pv_block":
              (this.metroplexTypeLock.p = !0), X.getInstance().setDidCutPv();
              break;
            case "full_block":
              J.getInstance().lockClient(1440, "Metroplex blocked script"),
                this.close();
              break;
            case "close_conn":
              this.close();
              break;
            case "ok":
              break;
            default:
              if (e.data.includes("seq_num")) {
                const n = e.data.split("seq_num:");
                if (n.length < 2) {
                  J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                    "Invalid message received from metroplex while clearing retry queue " +
                      e.data,
                    !1,
                    "error"
                  );
                  break;
                }
                const r = parseInt(n[1], 10);
                if (-1 === r) break;
                r <= this.latestReceivedSeqNumber
                  ? (this.isRetryLoopDisabled = !0)
                  : ((this.isRetryLoopDisabled = !1),
                    (this.latestReceivedSeqNumber = r),
                    this._clearRetryQueue(r)),
                  !this.ackedOnce && t && ((this.ackedOnce = !0), t());
              }
              if (this._tryProcessHelpCodeResponse(e.data)) break;
          }
        }
        _messagePayloadHasLargerSeqNum(e, t, n) {
          return (
            e.payload[t] && e.payload[t].seq_num && e.payload[t].seq_num > n
          );
        }
        _clearRetryQueue(e) {
          (this.latestReceivedSeqNumStoredTime = new Date()),
            (this.retryMessageQueue = this.retryMessageQueue.filter(
              (t) =>
                this._messagePayloadHasLargerSeqNum(t, "pvp", e) ||
                this._messagePayloadHasLargerSeqNum(t, "pvvf", e)
            ));
        }
        _sendUnconfirmedMessages(e) {
          if (this.isConnected() && !J.getInstance().isClientDisabled) {
            if (e) {
              const e = new Date();
              if (
                (e.setMilliseconds(
                  e.getMilliseconds() - this.metroRetryFrequencyMS
                ),
                e < this.latestReceivedSeqNumStoredTime)
              )
                return;
              if (this.isRetryLoopDisabled) return;
            }
            this.retryMessageQueue = this.retryMessageQueue.filter(
              (e) => !(e.type in this.metroplexTypeLock)
            );
            for (let e = 0; e < this.retryMessageQueue.length; e += 1) {
              const { type: t, payload: n } = this.retryMessageQueue[e];
              if (!this._sendSocketMessage(n)) break;
              this.previousMessageType = t;
            }
          }
        }
        setupRetryMechanism() {
          this.retryMetroplexInterval = setInterval(() => {
            this._sendUnconfirmedMessages(!0);
          }, 3e4);
        }
        _setupOffloadEvents() {
          $(window, "pagehide", () => {
            this._handleUnload();
          });
        }
        _handleUnload() {
          this.close(),
            J.getInstance().isClientDisabled ||
              J.getInstance().isInactive() ||
              this.postFullPageVisit(59e3);
        }
        postFullPageVisit(e) {
          if (0 === this.retryMessageQueue.length) return;
          const t = [],
            n = { v: 0, p: 0 };
          let r = 0,
            s = {
              pvi: this.getPageInformation(),
              pvp: [],
              pvvf: [],
              pvh: [],
              vpnum: this.connectionCount,
            };
          if (
            ((s.pvi.last = !0),
            this.retryMessageQueue.forEach((i) => {
              let { type: o, payload: a } = i;
              const c = new Blob([F(a)]).size;
              if (c > e) n[o] += 1;
              else {
                if (((r += c), r >= e)) {
                  this.postMessage(s);
                  let e = "Vid: " + s.pvvf.length;
                  (e += " PV: " + s.pvp.length),
                    (e += ` HTTP: ${s.pvh.length},`),
                    t.push(e),
                    (s = {
                      pvi: this.getPageInformation(),
                      pvp: [],
                      pvvf: [],
                      pvh: [],
                      vpnum: s.vpnum,
                    }),
                    (s.pvi.last = !0),
                    (r = c);
                }
                switch (o) {
                  case "v":
                    s.pvvf.push(a.pvvf);
                    break;
                  case "p":
                    s.pvp.push(a.pvp);
                    break;
                  case "h":
                    s.pvh.push(a.pvh);
                }
              }
            }),
            this.postMessage(s),
            this.retryMessageQueue.length > 100)
          ) {
            let e = "Vid: " + s.pvvf.length;
            (e += " PV: " + s.pvp.length),
              (e += ` HTTP: ${s.pvh.length},`),
              t.push(e);
            let r = "POST Full PV complete";
            (r += ", POSTs count: " + t.length),
              (r += ", POSTs info: " + F(t)),
              (r +=
                ", Retry message queue size: " + this.retryMessageQueue.length),
              n.v > 0 && (r += ", Video parts dropped: " + n.v),
              n.p > 0 && (r += ", Page visit parts dropped: " + n.p),
              n.h > 0 && (r += ", HTTP data parts dropped: " + n.h),
              (r += ", Sequence Info: Latest " + this.messageSequenceNum),
              (r += ` Ack'd ${this.latestReceivedSeqNumStoredTime} ${this.latestReceivedSeqNumber}`);
            const i = J.getInstance().isClientDisabled;
            (J.getInstance().isClientDisabled = !1),
              J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                r,
                i,
                "warn"
              );
          }
        }
        postMessage(e) {
          const t = e;
          (t.vpnum += 1),
            "test" === b()
              ? navigator.sendBeacon(this.postURL, F(t))
              : window.fetch &&
                fetch(this.postURL, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: F(t),
                  keepalive: !0,
                });
        }
        _sendSocketMessage(e) {
          return !this.closeIfInactive() && (this.socket.send(F(e)), !0);
        }
        closeIfInactive() {
          const e = J.getInstance().isInactive();
          return (
            e &&
              !J.getInstance().isClientDisabled &&
              (J.getInstance().lockClientUntilNextPage(
                "Session is inactive, locking until next page"
              ),
              this.close(),
              X.getInstance().postMetrics("inactive"),
              this.postFullPageVisit(59e3)),
            e
          );
        }
        getPageInformation() {
          const e = {
              br_id: J.getInstance().browserId,
              pv_id: J.getInstance().pageVisitId,
              v: 5,
              seq: J.getInstance().getPageVisitSeq(),
              on_url: this.initialURL,
              ref_url: this.initialReferingURL,
              start_at: this.sessionTimestamp.toISOString(),
              conc: this.connectionCount,
              cv: 2,
              last: !1,
              script_id: g(),
              script_inst_id: this.scriptInstanceId,
              mp_sock_inst_id: this.instanceId,
              sock_inst_id: this.socketInstanceId,
            },
            t = (function () {
              const e =
                window.navigator.userLanguage || window.navigator.language;
              return "" !== e && e ? e.toLowerCase() : null;
            })();
          return t && (e.lang = t), e;
        }
        _tryProcessHelpCodeResponse(e) {
          if ("string" != typeof e || !e.startsWith("hc:")) return !1;
          const t = e.substring("hc:".length),
            n = /^\d{6}$/.test(t),
            r = new CustomEvent("noibuHelpCode", {
              detail: { success: n, data: t },
            });
          return window.dispatchEvent(r), !0;
        }
      }
      class ie {
        constructor() {
          (this.partCounter = 0),
            (this.pvMap = {}),
            (this.partCounter = 0),
            (this.pvEventLength = 0),
            (this.visibilityChangedCounter = 0),
            (this.totalPvEventLength = 0),
            (this.inDebounceHandle = 0),
            (this.isInAcceleratedPvPostMode = !1);
        }
        static configureInstance() {
          this.instance || (this.instance = new ie());
        }
        static getInstance() {
          if (!this.instance) throw new Error("Pagevisit was never configured");
          return this.instance;
        }
        addPageVisitEvents(e, t) {
          e.forEach((e) => {
            this._addPageVisitEvent(e, t);
          }),
            this._sendPageVisitMessage();
        }
        addPageVisitEvent(e, t) {
          const n = this._addPageVisitEvent(e, t);
          return this._sendPageVisitMessage(), n;
        }
        _addPageVisitEvent(e, t) {
          if (!("occurredAt" in e) || !("event" in e))
            throw new Error("missing attributes in the eventObj");
          const n = { type: t, occ_at: e.occurredAt, [t]: e.event };
          this.pvEventLength >= 200 && this._sendPageVisitMessage();
          const r = S()();
          return (
            (this.pvMap[r] = n),
            (this.pvEventLength += 1),
            (this.totalPvEventLength += 1),
            r
          );
        }
        static makePageVisitFrag(e, t) {
          const n = {};
          return (
            (n.events = e),
            (n.pc = t),
            se.getInstance().addEndTimeToPayload(n, !0),
            n
          );
        }
        _sendPageVisitMessage() {
          const e = Object.keys(this.pvMap).map((e) => this.pvMap[e]);
          if (0 === e.length) return;
          if (this.partCounter >= 1e4)
            return void J.getInstance().lockClientUntilNextPage(
              `NoibuJS will stop processing parts because we reached max parts: 10000. Variables: \n      total Pv Event Length: ${this.totalPvEventLength}\n      visibility Changed Counter: ${this.visibilityChangedCounter}\n      `
            );
          const t = ie.makePageVisitFrag(e, this.partCounter);
          X.getInstance().setPvPart(this.partCounter);
          const n = { pvp: t };
          se.getInstance().sendMessage("p", n),
            (this.pvMap = {}),
            (this.pvEventLength = 0),
            (this.partCounter += 1);
        }
      }
      class oe {
        constructor() {
          (this.eventsToDebounce = {}),
            this.registerInputType("loc", 0),
            this.registerInputType("page", 500),
            this.registerInputType("err", 500),
            this.registerInputType("http", 500),
            this.registerInputType("kbd", 500, "userstep"),
            this._setupUnloadHandler();
        }
        static getInstance() {
          return this.instance || (this.instance = new oe()), this.instance;
        }
        registerInputType(e, t, n = e) {
          e in this.eventsToDebounce ||
            (this.eventsToDebounce[e] = {
              timeout: null,
              events: [],
              debouncePeriod: t,
              eventName: n,
            });
        }
        addEvent(e, t) {
          if (!(t in this.eventsToDebounce))
            throw new Error(`Type: ${t} is not in eventsToDebounce`);
          this.eventsToDebounce[t].events.push({
            event: e,
            occurredAt: new Date(ne(Date.now())).toISOString(),
          }),
            this._debouncePvEvents(t);
        }
        _debouncePvEvents(e) {
          clearTimeout(this.eventsToDebounce[e].timeout),
            (this.eventsToDebounce[e].timeout = setTimeout(() => {
              (this.eventsToDebounce[e].timeout = null),
                ie
                  .getInstance()
                  .addPageVisitEvents(
                    this.eventsToDebounce[e].events,
                    this.eventsToDebounce[e].eventName
                  ),
                (this.eventsToDebounce[e].events = []);
            }, this.eventsToDebounce[e].debouncePeriod));
        }
        _setupUnloadHandler() {
          $(window, "pagehide", () => {
            Object.values(this.eventsToDebounce).forEach((e) => {
              ie.getInstance().addPageVisitEvents(e.events, e.eventName);
            });
          });
        }
      }
      function ae(e) {
        return { url: H(e.filename), type: "js", j_err: P(e.error) };
      }
      function ce(e, t, n) {
        let r = t;
        t.error && t.error.originalError && (r = t.error.originalError);
        let s = {};
        switch (e) {
          case "XMLHttpRequest":
            s = (function (e, t) {
              const n = {
                url: H(e.responseURL),
                type: "http",
                h_code: e.status,
              };
              return (t || 0 === t) && (n.seq = t), n;
            })(r, n);
            break;
          case "ErrorEvent":
            s = ae(r);
            break;
          case "Response":
            s = (function (e, t) {
              const n = { url: H(e.url), type: "http", h_code: e.status };
              return (t || 0 === t) && (n.seq = t), n;
            })(r, n);
            break;
          case "GQLError":
            (e = "Response"),
              (s = (function (e, t) {
                const n = {
                  url: H(window.location.href),
                  type: "gql",
                  gql_err: e,
                };
                return (t || 0 === t) && (n.seq = t), n;
              })(r, n));
            break;
          case "WrappedException":
          case "FetchException":
            s = ae(r);
            break;
          case "ErrorLogEvent":
            s = (function (e) {
              return { url: H(window.location.href), type: "js", j_err: P(e) };
            })(r);
            break;
          case "UnhandledRejectionError":
          case "CustomError":
            s = ae(r);
            break;
          default:
            try {
              (s = ae(r)),
                r instanceof Event &&
                  (!(function (e, t, n) {
                    let r = null;
                    if (n.detail)
                      try {
                        r = F(n.detail);
                      } catch (e) {
                        r = "non-serializable";
                      }
                    let s = `Fire error event of type ${e}.`;
                    null != r && (s += ` Detail: ${r}.`), (t.j_err.msg = L(s));
                  })(e, s, r),
                  (e = "ErrorEvent"));
            } catch (e) {
              return null;
            }
        }
        return (s.err_src = e), s;
      }
      function le(e, t, n) {
        if ("Event" === e) return;
        const r = ce(e, t, n);
        if (!r || !r.url) return;
        const s = r.url;
        if (
          (function (e) {
            try {
              return URL(e), !0;
            } catch (e) {
              return !1;
            }
          })(s)
        ) {
          const e = new URL(s);
          if (e.hostname in j || !e.protocol.startsWith("http")) return;
        }
        (function (e) {
          if ("js" === e.type) {
            if (e.j_err) {
              const t = e.j_err.frames;
              if (t && t.length > 0) {
                const n = t[0].file.toLowerCase(),
                  r = t[0].mname.toLowerCase();
                if (n.includes("noibu") && !r.includes("nbuwrapper"))
                  return (
                    J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                      e,
                      !1,
                      "error"
                    ),
                    !0
                  );
              }
            }
            if (e.msg) {
              const t = e.msg.toLowerCase();
              if (t.includes("input.noibu") || t.includes("input.b.noibu"))
                return (
                  J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                    e,
                    !1,
                    "error"
                  ),
                  !0
                );
            }
          } else if ("http" === e.type && e.url) {
            const t = e.url;
            if ("string" == typeof t)
              for (let n = 0; n < l.length; n += 1) {
                const r = l[n];
                if (t.includes(r))
                  return (
                    J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                      e,
                      !1,
                      "error"
                    ),
                    !0
                  );
              }
          }
          return !1;
        })(r) ||
          (X.getInstance().addError(), oe.getInstance().addEvent(r, "err"));
      }
      let ue = 0;
      function de(e) {
        if ("function" != typeof e) return e;
        try {
          if (e.__noibu__) return e;
          if (e.__noibu_wrapped__) return e.__noibu_wrapped__;
        } catch (t) {
          return e;
        }
        const nbuWrapper = function (...t) {
          try {
            const n = Array.prototype.slice.call(t).map((e) => de(e));
            return e.handleEvent
              ? e.handleEvent.apply(this, n)
              : e.apply(this, n);
          } catch (e) {
            throw (
              (le("WrappedException", { error: e }),
              (ue += 1),
              setTimeout(() => {
                ue -= 1;
              }),
              e)
            );
          }
        };
        try {
          for (const t in e)
            Object.prototype.hasOwnProperty.call(e, t) &&
              (nbuWrapper[t] = e[t]);
        } catch (e) {}
        (nbuWrapper.prototype = e.prototype || {}),
          Object.defineProperty(e, "__noibu_wrapped__", {
            enumerable: !1,
            value: nbuWrapper,
          }),
          Object.defineProperties(nbuWrapper, {
            __noibu__: { enumerable: !1, value: !0 },
            __noibu_original__: { enumerable: !1, value: e },
          });
        try {
          Object.getOwnPropertyDescriptor(nbuWrapper, "name").configurable &&
            Object.defineProperty(nbuWrapper, "name", { get: () => e.name });
        } catch (t) {
          return e;
        }
        return nbuWrapper;
      }
      function he(e) {
        if (!e) return;
        const { message: t, stack: n } = e;
        n && t && le("ErrorLogEvent", { message: t, stack: n });
      }
      function pe(e) {
        e.forEach((e) => {
          e &&
            (Array.isArray(e)
              ? e.forEach((e) => {
                  he(e);
                })
              : he(e));
        });
      }
      function ge(e) {
        e &&
          e.constructor &&
          e.constructor.name &&
          "undefined" !== e.constructor.name &&
          !(ue > 0) &&
          le(e.constructor.name, e);
      }
      function me(e) {
        if (!e.reason) return;
        if (!e.reason.message || !e.reason.stack) return;
        const t = new Error();
        (t.message = e.reason.message), (t.stack = e.reason.stack);
        le("UnhandledRejectionError", { error: t });
      }
      function fe() {
        $(window, "error", ge, !0),
          $(window, "unhandledrejection", me, !0),
          a.forEach((e) => {
            const t = window[e],
              n = t && t.prototype;
            n &&
              n.hasOwnProperty &&
              n.hasOwnProperty("addEventListener") &&
              (w(n, "addEventListener", function (e) {
                return function nbuWrapper(t, n, r) {
                  if (!n) return e.call(this, t, n, r);
                  let s;
                  if (n.handleEvent) {
                    const e = de(n.handleEvent.bind(n));
                    (s = n), (s.handleEvent = e);
                  } else s = de(n);
                  return e.call(this, t, s, r);
                };
              }),
              w(n, "removeEventListener", function (e) {
                return function nbuWrapper(t, n, r) {
                  let s = n;
                  try {
                    s = s && (s.__noibu_wrapped__ || s);
                  } catch (e) {}
                  return e.call(this, t, s, r);
                };
              }));
          }),
          u.forEach((e) => {
            window.console &&
              window.console[e] &&
              w(window.console, e, function (e) {
                return function nbuWrapper() {
                  e.call(window.console, ...arguments),
                    pe(Array.from(arguments));
                };
              });
          });
      }
      function ye(e) {
        return "number" != typeof e || e >= 400 || e <= 0;
      }
      class ve {
        constructor(e, t) {
          const n = e;
          (!n.resp_time || n.resp_time < 0) && (n.resp_time = 0),
            (n.mtd = e.mtd.toUpperCase()),
            (n.url = L(W(n.url))),
            (this.httpEvent = n),
            (this.httpData = t);
        }
        saveHTTPEvent() {
          if (
            this.httpEvent &&
            this.httpEvent.url &&
            "" !== this.httpEvent.url.trim()
          ) {
            if ((X.getInstance().addHttpEvent(), this.httpData)) {
              const e = X.getInstance().httpSequenceNumber;
              if (e < 100) {
                (this.httpData.seq = e),
                  (this.httpEvent.seq = e),
                  X.getInstance().addHttpData();
                const t = {};
                (t.pvh = this.httpData), se.getInstance().sendMessage("h", t);
              } else X.getInstance().addHttpDataOverLimit();
            }
            ye(this.status)
              ? ie
                  .getInstance()
                  .addPageVisitEvent(
                    {
                      event: this.httpEvent,
                      occurredAt: new Date(ne(Date.now())).toISOString(),
                    },
                    "http"
                  )
              : oe.getInstance().addEvent(this.httpEvent, "http");
          }
        }
      }
      class Ie {
        constructor() {
          this.contentTypeReadableRegex = new RegExp(
            "text|json|xml|html|graphql|x-www-form-urlencoded|form-data",
            "i"
          );
          const e = x();
          if (((this.initialURLPartsReversed = []), e && e.length > 0))
            try {
              const t = new URL(e).hostname;
              (this.initialURLPartsReversed = t.split(".")),
                o.test(this.initialURLPartsReversed[0]) &&
                  this.initialURLPartsReversed.shift(),
                this.initialURLPartsReversed.reverse();
            } catch (e) {
              J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                "Unable to determine hostname for initial URL: " + e,
                !1,
                "warn"
              );
            }
          this.httpDataCollectionEnabled = !!c().http_data_collection;
          const t = q();
          (this.httpDataAllowedAbsoluteRegex = Ie.buildAllowedRegex(t, !0)),
            (this.httpDataAllowedRelativeRegex = Ie.buildAllowedRegex(t, !1)),
            (this.fuzzyFieldsToRedact = [
              "password",
              "address",
              "credit",
              "postal",
              "token",
              "phone",
              "mobile",
            ]),
            (this.exactFieldsToRedact = [
              "firstname",
              "lastname",
              "street",
              "fullname",
              "creditcard",
              "postcode",
              "zipcode",
              "city",
              "town",
              "county",
              "cc",
            ]);
        }
        static getInstance() {
          return this.instance || (this.instance = new Ie()), this.instance;
        }
        static buildAllowedRegex(e, t) {
          if (!e) return null;
          const n = e.filter((e) => {
            const n = Ie.isAbsoluteURL(e);
            return t ? n : !n;
          });
          if (n.length > 0) {
            const e = n.map((e) => e.trim().toLowerCase());
            return new RegExp(e.join("|"));
          }
          return null;
        }
        static headersMapFromIterable(e) {
          const t = new Map();
          for (const n of e)
            "string" != typeof n[0] && (n[0] = String(n[0])),
              "string" != typeof n[1] && (n[1] = String(n[1])),
              t.set(n[0].toLowerCase(), n[1]);
          return t;
        }
        static headersMapFromString(e) {
          const t = new Map();
          if (!e || "string" != typeof e) return t;
          return (
            e
              .split("\r\n")
              .filter(Boolean)
              .forEach(function (e) {
                const n = e.split(": ");
                2 === n.length &&
                  n[0].length > 0 &&
                  n[1].length > 0 &&
                  t.set(n[0].toLowerCase(), n[1]);
              }),
            t
          );
        }
        static responseStringFromXHRResponseType(e) {
          if (null == e) return null;
          if (e.response && null === e.response) return "null";
          if ("" === e.responseType || "text" === e.responseType)
            return e.responseText;
          if (
            "document" === e.responseType &&
            e.response &&
            e.response.documentElement &&
            e.response.documentElement.innerHTML
          )
            return e.response.documentElement.innerHTML;
          if ("json" === e.responseType)
            try {
              return JSON.stringify(e.response);
            } catch (e) {
              return (
                J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                  "Unable to stringify JSON response: " + e,
                  !1,
                  "warn"
                ),
                null
              );
            }
          return null;
        }
        isURLSameDomain(e) {
          if (
            "string" != typeof e ||
            !this.initialURLPartsReversed ||
            this.initialURLPartsReversed.length < 1
          )
            return !1;
          let t;
          try {
            t = new URL(e).hostname;
          } catch (e) {
            return (
              J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                "Unable to determine hostname for request URL: " + e,
                !1,
                "warn"
              ),
              !1
            );
          }
          const n = t.split(".");
          return (
            !(n.length < 1) &&
            (o.test(n[0]) && n.shift(),
            !(n.length < this.initialURLPartsReversed.length) &&
              (n.reverse(),
              this.initialURLPartsReversed.every((e, t) => e === n[t])))
          );
        }
        bundleHTTPData(e, t, n, r, s, i, o) {
          if (!this.isValidRequest(e, i, o)) return null;
          let a = "";
          this.shouldCollectPayloadForURL(e) &&
            (a =
              this.dropPayloadIfNecessaryFromHeaders(t) ||
              this.stringFromRequestBody(n));
          const c = t || new Map(),
            l = a || "",
            u = r || new Map(),
            d = s || "";
          if (0 === c.size && 0 === l.length && 0 === u.size && 0 === d.length)
            return null;
          const h = this.restrictPayload(a, e),
            p = this.restrictPayload(s, e),
            g = this.removePIIHeaders(t),
            m = this.removePIIHeaders(r);
          return { rqh: g ? E(g) : {}, rqp: h, rsh: m ? E(m) : {}, rsp: p };
        }
        isValidRequest(e, t, n) {
          return (
            !!this.httpDataCollectionEnabled &&
            !(!t || "string" != typeof t) &&
            !!n
          );
        }
        shouldContinueForURL(e) {
          return (
            !!this.httpDataCollectionEnabled &&
            !(!e || "string" != typeof e || !this.initialURLPartsReversed) &&
            !(
              Ie.isAbsoluteURL(e) &&
              !this.isURLSameDomain(e) &&
              !this.shouldCollectPayloadForURL(e)
            )
          );
        }
        static isAbsoluteURL(e) {
          return (
            !(!e || "string" != typeof e) &&
            (e.indexOf("://") > 0 || 0 === e.indexOf("//"))
          );
        }
        shouldCollectPayloadForURL(e) {
          return (
            !(!e || "string" != typeof e) &&
            (!(
              !this.httpDataAllowedAbsoluteRegex ||
              !this.httpDataAllowedAbsoluteRegex.test(e.toLowerCase())
            ) ||
              !(
                !this.httpDataAllowedRelativeRegex ||
                (Ie.isAbsoluteURL(e) && !this.isURLSameDomain(e)) ||
                !this.httpDataAllowedRelativeRegex.test(e.toLowerCase())
              ))
          );
        }
        restrictPayload(e, t) {
          return e && this.shouldCollectPayloadForURL(t)
            ? "null" === e ||
              e.startsWith("Dropped due to length.") ||
              e.startsWith("Dropped due to unsupported type.")
              ? e
              : e.length > 5e4
              ? (X.getInstance().addHttpDataDropByLength(),
                "Dropped due to length. Payload length: " + e.length)
              : (X.getInstance().addHttpDataPayloadCount(),
                this.removePIIBody(e))
            : "null";
        }
        contentLengthAcceptable(e) {
          const t = this.contentLength(e);
          return (
            t < 0 ||
            !(t > 5e4) ||
            (X.getInstance().addHttpDataDropByLength(), !1)
          );
        }
        contentTypeAcceptable(e) {
          if (!e || !e.get) return !0;
          const t = e.get("content-type");
          return (
            !(t && !this.contentTypeReadableRegex.test(t.toLowerCase())) ||
            (X.getInstance().addHttpDataDropByType(), !1)
          );
        }
        dropPayloadIfNecessaryFromHeaders(e) {
          let t = "";
          return (
            Ie.getInstance().contentTypeAcceptable(e)
              ? Ie.getInstance().contentLengthAcceptable(e) ||
                (t =
                  "Dropped due to length. Payload length: " +
                  Ie.getInstance().contentLength(e))
              : ((t = "Dropped due to unsupported type."),
                e && e.get && (t += " Payload type: " + e.get("content-type"))),
            t
          );
        }
        contentLength(e) {
          if (!e || !e.get) return 0;
          let t = 0;
          const n = e.get("content-length");
          if (!n) return -1;
          try {
            if (((t = parseInt(n, 10)), Number.isNaN(t))) return -1;
          } catch (e) {
            return -1;
          }
          return t;
        }
        stringFromRequestBody(e) {
          if (null == e) return null;
          try {
            const t = e.toString();
            if (!t.includes("[object")) return t;
          } catch (e) {}
          try {
            return e.documentElement.innerHTML;
          } catch (e) {}
          try {
            return (
              e instanceof FormData &&
                (e = Array.from(e.entries()).reduce(
                  (e, [t, n]) => (
                    (e[t] = "string" == typeof n ? n : "non-string value."), e
                  ),
                  {}
                )),
              JSON.stringify(e)
            );
          } catch (e) {
            J.getInstance().postNoibuErrorAndOptionallyDisableClient(
              "Unable to stringify request body: " + e,
              !1,
              "warn"
            );
          }
          return null;
        }
        removePIIHeaders(e) {
          if (!(e instanceof Map)) return null;
          if (e.size < 1) return e;
          const n = new Map(e);
          return (
            n.forEach((e, n, r) => {
              t.includes(n.toLowerCase())
                ? r.set(n, "******")
                : r.set(n, this.removePIIBody(e));
            }),
            n
          );
        }
        removePIIBody(e) {
          if ("string" != typeof e) return null;
          if (e.length < 1) return e;
          let t = this.tryPaseObjectAndRemovePII(e);
          return (
            i.forEach((e) => {
              t = t.replace(e, "******");
            }),
            t
          );
        }
        tryPaseObjectAndRemovePII(e) {
          const t = e[0];
          if (!("{" === t || "[" === t)) return e;
          let n = !1;
          try {
            const t = JSON.parse(e);
            return (
              ((e, t, n = { depth: 5 }) => {
                const r = (e, s) => {
                  if (!(s > n.depth))
                    for (const n in e)
                      try {
                        const i = t(e, n, e[n]);
                        void 0 !== i && (e[n] = i),
                          null !== e[n] &&
                            "object" == typeof e[n] &&
                            r(e[n], s + 1);
                      } catch (e) {}
                };
                r(e, 1);
              })(t, (e, t) => {
                const r = t.toLowerCase();
                return this.exactFieldsToRedact.some((e) => r === e) ||
                  this.fuzzyFieldsToRedact.some((e) => r.includes(e))
                  ? ((n = !0), "******")
                  : void 0;
              }),
              n ? JSON.stringify(t) : e
            );
          } catch (t) {
            return e;
          }
        }
      }
      class be {
        static async fromFetch(e, t, n, r) {
          try {
            if (!(Z(r, Response) && r.ok && !r.bodyUsed)) return null;
            const s = this._getContentTypeFromFetchArguments(t, n);
            if (this._shouldHandleRequest(e, s)) {
              const t = await r.json();
              return this._validate(t, e, []);
            }
          } catch (e) {
            this._isRequestAborted(t, n) || this._postError(e);
          }
          return null;
        }
        static async fromXhr(e, t) {
          try {
            if (!(Z(t, XMLHttpRequest) && t.status >= 200 && t.status <= 299))
              return null;
            let n = null;
            if (
              (t.noibuRequestHeaders &&
                (n = t.noibuRequestHeaders.get("content-type")),
              this._shouldHandleRequest(e, n))
            ) {
              let n = null;
              if ("blob" === t.responseType) {
                if (t.response.text) {
                  const e = await t.response.text();
                  n = this._parseJsonSafely(e);
                }
              } else if ("json" === t.responseType) n = t.response;
              else {
                const e = t.responseText;
                n = this._parseJsonSafely(e);
              }
              if (n) return this._validate(n, e, []);
            }
          } catch (e) {
            this._postError(e);
          }
          return null;
        }
        static _parseJsonSafely(e) {
          try {
            return JSON.parse(e);
          } catch (e) {
            return null;
          }
        }
        static _getContentTypeFromFetchArguments(e, t) {
          let n = null;
          Z(t, Request)
            ? (n = t.headers)
            : e && e.headers && (n = new Headers(e.headers));
          let r = null;
          return n && (r = n.get("content-type")), r;
        }
        static _isRequestAborted(e, t) {
          return Z(t, Request)
            ? t.signal && t.signal.aborted
            : !(!e || !Z(e.signal, AbortSignal)) && e.signal.aborted;
        }
        static _shouldHandleRequest(e, t) {
          t && (t = t.toLowerCase());
          let n = !1;
          return (
            e &&
              (Z(e, URL) && (e = e.toString()),
              (n = e.toLowerCase().includes("graphql"))),
            ("application/json" === t && n) || "application/graphql" === t
          );
        }
        static _validate(e, t, n) {
          let r = null;
          if (e && Array.isArray(e.errors)) {
            r = e.errors;
            for (const e of r) {
              const r = Object.keys(e);
              for (const t of r)
                switch (t) {
                  case "message":
                    this._validateMessage(e);
                    break;
                  case "locations":
                    this._validateLocations(e, n);
                    break;
                  case "path":
                    this._validatePath(e, n);
                    break;
                  case "extensions":
                    this._validateExtensions(e);
                    break;
                  default:
                    delete e[t], n.push("unexpected error." + t);
                }
              e.src = t;
            }
            n.length > 0 && this._postValidationIssues(n);
          }
          return r;
        }
        static _validateMessage(e) {
          e.message = L(e.message, 1e3);
        }
        static _validateExtensions(e) {
          const t = JSON.stringify(e.extensions);
          e.extensions = L(t, 1e3);
        }
        static _validateLocations(e, t) {
          const n = e.locations;
          if (Array.isArray(n))
            for (const e of n) {
              const n = Object.keys(e);
              for (const r of n)
                switch (r) {
                  case "line":
                  case "column":
                    if (!Number.isSafeInteger(e[r])) {
                      const n = e[r];
                      (e[r] = 0), t.push(`unexpected ${r} value '${n}'`);
                    }
                    break;
                  default:
                    delete e[r], t.push("unexpected error.location." + r);
                }
            }
          else delete e.locations, t.push("unexpected error.locations");
        }
        static _validatePath(e, t) {
          const n = e.path;
          Array.isArray(n)
            ? (e.path = e.path.map((e) => e.toString()))
            : (delete e.path, t.push("unexpected error.path"));
        }
        static _postError(e) {
          J.getInstance().postNoibuErrorAndOptionallyDisableClient(
            "GQL parse error: " + e,
            !1,
            "error"
          );
        }
        static _postValidationIssues(e) {
          const t = e.join(",");
          J.getInstance().postNoibuErrorAndOptionallyDisableClient(
            "GQL error validation warning: " + t,
            !1,
            "error"
          );
        }
      }
      function Ce(e, t, n, r, s, i = null) {
        const o = { mtd: t, code: e.status, url: n, r_time: r };
        let a = null;
        const c = null != s,
          l = ye(e.status) || c;
        if (l && Ie.getInstance().shouldContinueForURL(n)) {
          const r = Ie.headersMapFromString(e.getAllResponseHeaders()),
            s = Ie.getInstance().contentLength(r);
          s > 0 && (o.resp_len = s);
          let c = "";
          if (Ie.getInstance().shouldCollectPayloadForURL(n)) {
            c =
              Ie.getInstance().dropPayloadIfNecessaryFromHeaders(r) ||
              Ie.responseStringFromXHRResponseType(e);
          }
          a = Ie.getInstance().bundleHTTPData(
            n,
            e.noibuRequestHeaders,
            i,
            r,
            c,
            t,
            l
          );
        }
        return [o, a];
      }
      async function Se(e, t, n, r, s, i, o, a) {
        const c = { mtd: n, code: t.status, url: r, r_time: i };
        let l = null;
        const u = null != a,
          d = ye(t.status) || u;
        if (d && Ie.getInstance().shouldContinueForURL(r)) {
          if (t && t.headers) {
            const e = Ie.getInstance().contentLength(t.headers);
            e > 0 && (c.resp_len = e);
          }
          let i = "";
          Ie.getInstance().shouldCollectPayloadForURL(r) &&
            t &&
            t instanceof Response &&
            ((i = Ie.getInstance().dropPayloadIfNecessaryFromHeaders(
              t.headers
            )),
            i ||
              (i = t.bodyUsed
                ? "Response data unavailable due to an improperly wrapped fetch call"
                : t.clone().text()));
          const a = [Promise.resolve(i), ...(o ? [o] : [])];
          await Promise.all(a)
            .then((i) =>
              (function (e, t, n, r, s, i, o) {
                let a,
                  c = new Map(),
                  l = new Map();
                return (
                  r[1] &&
                    (([, a] = r),
                    e.headers &&
                      (c = Ie.headersMapFromIterable(e.headers.entries()))),
                  null == a && n && n.body && (a = n.body),
                  c.size < 1 &&
                    n &&
                    n.headers &&
                    (c =
                      n.headers instanceof Headers
                        ? Ie.headersMapFromIterable(n.headers.entries())
                        : Ie.headersMapFromIterable(Object.entries(n.headers))),
                  t &&
                    t.headers &&
                    (l = Ie.headersMapFromIterable(t.headers.entries())),
                  Ie.getInstance().bundleHTTPData(s, c, a, l, r[0], i, o)
                );
              })(e, t, s, i, r, n, d)
            )
            .then((e) => {
              l = e;
            });
        }
        return [c, l];
      }
      function we() {
        const e = window;
        A(e, "fetch") &&
          w(e, "fetch", function (e) {
            return function nbuWrapper(t, n) {
              let r, s, i, o;
              try {
                t
                  ? (t.method
                      ? ((r = t.method), (s = t.url))
                      : ((r = n && n.method ? n.method : "GET"),
                        (s = t.toString() ? t.toString() : "")),
                    Ie.getInstance().shouldCollectPayloadForURL(s) &&
                      t instanceof Request &&
                      ((i = t.clone()), (o = i.text())))
                  : ((r = "GET"), (s = ""));
              } catch (e) {
                J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                  "Error in fetch() wrapper: " + e,
                  !1,
                  "error"
                );
              }
              const a = e.call(this, t, n),
                c = new Date();
              return (
                a
                  .then(async (e) => {
                    try {
                      let t = e,
                        a = e;
                      e.bodyUsed || ((t = e.clone()), (a = e.clone()));
                      const l = await be.fromFetch(s, n, i, t),
                        u = new Date(),
                        d = Math.abs(u - c),
                        [h, p] = await Se(i, a, r, s, n, d, o, l);
                      let g = new ve(h, p);
                      g.saveHTTPEvent();
                      const m = g.httpData && g.httpData.seq;
                      ye(e.status) && le("Response", e, m),
                        l && l.forEach((e) => le("GQLError", e, m)),
                        (g = null);
                    } catch (e) {
                      J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                        "Error in custom fetch() callback: " + e,
                        !1,
                        "error"
                      );
                    }
                  })
                  .catch((e) => {
                    !(function (e, t) {
                      if (!e) return;
                      if (!e.message || !e.stack) return;
                      const n = t || "",
                        r = new Error();
                      r.stack = e.stack;
                      const s = "" === n.trim() ? "" : " on url " + n;
                      (r.message = `${e.message}${s}`),
                        le("FetchException", { error: r });
                    })(e, s);
                  }),
                a
              );
            };
          });
      }
      function Ae() {
        const e = window.XMLHttpRequest,
          t = e && e.prototype,
          n = A(t, "open"),
          r = A(t, "send"),
          s = A(t, "setRequestHeader");
        n &&
          (function (e, t) {
            w(e, "open", function (e) {
              return function nbuWrapper(n, r, s = !0, i = null, o = null) {
                try {
                  try {
                    (this.noibuHttpMethod = n), (this.noibuHttpUrl = r);
                  } catch (e) {
                    J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                      "Unable to set custom properties on XHR object: " + e,
                      !1,
                      "warn"
                    );
                  }
                  if (t) {
                    const e = new Date();
                    $(this, "loadend", async () => {
                      const t = new Date(),
                        s = Math.abs(t - e),
                        i = await be.fromXhr(r, this),
                        [o, a] = Ce(this, n, r, s, i);
                      let c = new ve(o, a);
                      c.saveHTTPEvent();
                      const l = c.httpData && c.httpData.seq;
                      ye(this.status) && le("XMLHttpRequest", this, l),
                        i && i.forEach((e) => le("GQLError", e, l)),
                        (c = null);
                    });
                  }
                } catch (e) {
                  J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                    "Error in XHR.open() wrapper: " + e,
                    !1,
                    "error"
                  );
                }
                return e.call(this, n, r, s, i, o);
              };
            });
          })(t, !r),
          r &&
            (function (e) {
              w(e, "send", function (e) {
                return function nbuWrapper(t) {
                  try {
                    let e;
                    e = this.noibuHttpMethod
                      ? this.noibuHttpMethod
                      : t
                      ? "POST"
                      : "GET";
                    const n = new Date();
                    $(this, "loadend", async () => {
                      const r = new Date(),
                        s = Math.abs(r - n),
                        i = this.noibuHttpUrl || this.responseURL,
                        o = await be.fromXhr(i, this),
                        [a, c] = Ce(this, e, i, s, o, t);
                      let l = new ve(a, c);
                      l.saveHTTPEvent();
                      const u = l.httpData && l.httpData.seq;
                      ye(this.status) && le("XMLHttpRequest", this, u),
                        o && o.forEach((e) => le("GQLError", e, u)),
                        (l = null);
                    });
                  } catch (e) {
                    J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                      "Error in XHR.send() wrapper: " + e,
                      !1,
                      "error"
                    );
                  }
                  return e.call(this, t);
                };
              });
            })(t),
          s &&
            (function (e) {
              w(e, "setRequestHeader", function (e) {
                return function nbuWrapper(t, n) {
                  try {
                    (this.noibuRequestHeaders &&
                      this.noibuRequestHeaders instanceof Map) ||
                      (this.noibuRequestHeaders = new Map());
                    const e = "string" == typeof n ? n : String(n);
                    this.noibuRequestHeaders.set(t.toLowerCase(), e);
                  } catch (e) {
                    J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                      "Error in XHR.setRequestHeader() wrapper: " + e,
                      !1,
                      "error"
                    );
                  }
                  return e.call(this, t, n);
                };
              });
            })(t);
      }
      function Ee(e) {
        const t = e;
        return (t.class = W(t.class)), t;
      }
      const ke = [
          "\\b(view|add|my)\\b.*\\b(cart|bag|basket|bucket|box)\\b",
          "\\b(buy now)\\b",
          "^backorder$",
          "\\b(acquista ora)\\b",
          "\\b(buy this)\\b",
          "\\b(ajouter|mon)\\b.*\\b(panier)\\b",
          "\\b(aggiungi)\\b.*\\b(cart|borsa|carrello)\\b",
          "^ajouter Ã  la shopping bag$",
          "^aggiungi$",
          "^aggiungi alla shopping bag$",
          "\\b(warenkorb)\\b",
          "(^kaufen$)",
          "^ÐºÑƒÐ¿Ð¸Ñ‚ÑŒ$",
          "\\b(agregar)\\b.*\\b(carrito)\\b",
          "\\b(adicionar)\\b.*\\b(carrinho)\\b",
          "^carrinho$",
          "^aÃ±adir al carrito de compras$",
          "(^aÃ±adir al carrito$)",
          "(add another)",
          "(in winkelmand)",
          "(sepete ekle)",
          "(Lagg I Varukorgen)",
          "(Î Î¡ÎŸÎ£Î˜Î—ÎšÎ— Î£Î¤ÎŸ ÎšÎ‘Î›Î‘Î˜Î™)",
          "(LÃ¤gg i varukorgen)",
          "(KÃ¶p)",
          "(ã‚«ãƒ¼ãƒˆã«è¿½åŠ )",
          "^æ·»åŠ è‡³è´­ç‰©è¢‹$",
          "^è´­ä¹°$",
          "^è³¼å…¥ã™ã‚‹$",
          "(Ø£Ø¶Ù Ø§Ù„Ù‰ Ø§Ù„Ø³Ù„Ø©)",
        ],
        _e = [
          "(paypal)",
          "(checkout|payment|check out)",
          "(l.?achat|rÃ¨glement|paiement|la commande)",
          "(passer).*(commande)",
          "valider mon panier",
          "(acheter maintenant)",
          "^caisse$",
          "(gÃ¥ vidare till kassan)",
          "(cassa|acquisto)",
          "^vai alla cassa$",
          "^procedi all.?acquisto$",
          "^procedi al checkout$",
          "^siguiente$",
          "(kasse)",
          "^zur kasse gehen$",
          "^bezahlen$",
          "^weiter zum checkout$",
          "(comprar ahora)",
          "^comprar$",
          "(prosseguir com a compra)",
          "^pasar por la caja$",
          "^afrekenen$",
          "^compre$",
          "(continue to pay)",
          "(naar de kassa)",
          "ÐŸÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ðº Ð¾Ñ„Ð¾Ñ€Ð¼Ð»ÐµÐ½Ð¸ÑŽ Ð·Ð°ÐºÐ°Ð·Ð°",
          "^ÐºÑƒÐ¿Ð¸Ñ‚ÑŒ ÑÐµÐ¹Ñ‡Ð°Ñ$",
          "^bestellen$",
          "(AlÄ±ÅŸveriÅŸi Tamamla)",
          "^Till kassan$",
          "(ãƒã‚§ãƒƒã‚¯ã‚¢ã‚¦ãƒˆã«é€²ã‚€)",
          "^åŽ»ç»“ç®—$",
          "^ä»˜æ¬¾ã€‚$",
          "^ãŠæ”¯æ‰•ã„$",
          "(ØªØ§ÙƒÙŠØ¯ Ø§Ù„Ø·Ù„Ø¨)",
        ],
        Re = [
          "(checkout|continue) (with paypal)",
          "^continue to paypal$",
          "^weiter zu paypal$",
          "^continue to afterpay$",
          "^braintree_paypal$",
          "^pay and place order$",
          "^mit paypal bezahlen$",
          "^continue to payment securely$",
          "(continua su paypal)",
          "(apple pay|applepay)",
          "(amazon pay|amazonpay|continue with amazon)",
          "(sezzlepay)",
          "(place order)",
          "(place your order)",
          "(order confirmation)",
          "(complete purchase)",
          "submit.*order",
          "(pay now)",
          "(^pay it now$)",
          "(make payment)",
          "(^make payment$)",
          "(complete order)",
          "^complete your order$",
          "(fazer pedido)",
          "^encomendar$",
          "((realizar) (pedido|pago))",
          "^finalizar compra$",
          "^pagar$",
          "^jetzt kaufen$",
          "^bestellung aufgeben$",
          "^bestellung prÃ¼fen$",
          "^auftragsbestÃ¤tigung$",
          "^bestelling plaatsen$",
          "^passer la commande$",
          "(je confirme et je paye)",
          "(accÃ©der au paiement)",
          "^passer au paiement$",
          "(Valider et continuer)",
          "^valider la commande$",
          "(^passez la commande$)",
          "^invia ordine$",
          "(effettua ordine)",
          "^effettua l.?ordine$",
          "(conferma acquisto)",
          "^conferma l.?acquisto$",
          "^confirmation de commande$",
          "^confirma l.?ordine$",
          "^conferma l.?ordine$",
          "^conferma ordine$",
          "(SÄ°PARÄ°ÅžÄ° TAMAMLA)",
          "^Ð Ð°Ð·Ð¼ÐµÑÑ‚Ð¸Ñ‚ÑŒ Ð·Ð°ÐºÐ°Ð·$",
          "(SlutfÃ¶r kÃ¶p)",
          "(æ³¨æ–‡ã™ã‚‹)",
          "(Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø·Ù„Ø¨)",
          "(æ³¨æ–‡ã‚’ç¢ºå®š)",
          "^ãŠæ”¯æ‰•ã„ã¸é€²ã‚€$",
          "^ç¡®è®¤ä¸‹å•$",
        ];
      class Te {
        constructor() {
          (this.textCapturedWhiteListRegex = new RegExp(
            ke.concat(_e).concat(Re).join("|"),
            "i"
          )),
            (this.htmlIDWhiteListRegex = new RegExp(
              "method|finance|sagepay|cart|bag|coupon|affirm|karna|sezzle|button",
              "i"
            ));
        }
        static getInstance() {
          return this.instance || (this.instance = new Te()), this.instance;
        }
        monitorClicks() {
          $(window, "click", this._onClickHandle.bind(this), !0);
        }
        _onClickHandle(e) {
          const t = (function () {
            const e = c(),
              t = ["noibu-blocked"];
            return (
              V() &&
                e.sel.forEach((e) => {
                  e.startsWith(".") && e.length > 0 && t.push(e.substring(1));
                }),
              t
            );
          })();
          if (e.srcElement) {
            const n = e.srcElement;
            let i = "";
            i =
              "IMG" === n.tagName
                ? n.alt
                  ? n.alt
                  : ""
                : this._getTextualContentFromEl(n, !0, t);
            let o = this._trimText(i),
              a = "";
            if (n.className) {
              const e = typeof n.className;
              "string" === e
                ? (a = n.className)
                : "object" === e &&
                  "baseVal" in n.className &&
                  (a = n.className.baseVal);
            }
            let c = "";
            n.tagName && (c = n.tagName.toLowerCase());
            let l = n.id ? n.id : "";
            "string" != typeof l && (l = ""),
              this.textCapturedWhiteListRegex.test(o) ||
                this.htmlIDWhiteListRegex.test(l) ||
                ("input" === c
                  ? (!n.type || ("button" !== n.type && "submit" !== n.type)) &&
                    (o = "*")
                  : "textarea" === c && (o = "*")),
              (o = (function (e) {
                return e.replace(s, "******").replace(r, "*");
              })(o));
            const u = {
              src: n.src ? n.src : "",
              txt: o,
              tag: c,
              hid: l,
              type: "click",
              class: a,
            };
            X.getInstance().addPvClick(),
              ie
                .getInstance()
                .addPageVisitEvents(
                  [
                    {
                      event: Ee(u),
                      occurredAt: new Date(ne(Date.now())).toISOString(),
                    },
                  ],
                  "userstep"
                );
          }
        }
        _parseTextFromParentElement(e, t) {
          let n = e;
          const r = [];
          let s = 0;
          for (; n && !(s >= 5) && n.parentNode; )
            (n = n.parentNode), r.push(n), (s += 1);
          for (let e = 0; e < r.length; e += 1) {
            const n = r[e];
            if (n && "BUTTON" === n.tagName)
              return this._getTextualContentFromEl(n, !1, t);
          }
          return "";
        }
        _getTextualContentFromEl(e, t, n) {
          let r = this._parseInnerContent(
            e,
            "",
            100,
            { value: 0, limit: 100 },
            n
          );
          if (t) {
            const t = e.tagName ? e.tagName.toLowerCase() : "";
            if ("" === r) r = this._parseTextFromParentElement(e, n);
            else if ("select" === t) {
              const t = r;
              (r = this._parseTextFromParentElement(e, n)),
                (r = r.replace(t, ""));
            }
          }
          return r;
        }
        _trimText(e) {
          let t = e.trim().replace(/\s+/g, " ");
          if (t.length > 100) {
            const e = t.lastIndexOf(" ", 97);
            t = e > 0 ? t.substring(0, e) + "..." : "...";
          }
          return t;
        }
        _parseInnerContent(e, t, n, r, s) {
          if (t.length >= n) return t;
          if (r.value >= r.limit) return t;
          if (((r.value += 1), e.classList))
            for (const n of e.classList)
              if (s.includes(n)) return t + (t ? " " : "") + "*";
          if (
            e.nodeType === Node.TEXT_NODE &&
            (t = this._parseAndAppendText(t, [e.textContent])).length >= n
          )
            return t;
          let i = !0;
          if (e.nodeType === Node.ELEMENT_NODE) {
            if (
              0 === e.childNodes.length &&
              (t = this._parseAndAppendText(t, [e.value, e.title])).length >= n
            )
              return t;
            if (
              1 === e.childNodes.length &&
              e.childNodes[0].nodeType === Node.TEXT_NODE &&
              ((i = !1),
              (t = this._parseAndAppendText(t, [
                e.textContent,
                e.value,
                e.title,
              ])).length >= n)
            )
              return t;
          }
          if (i)
            for (const i of e.childNodes)
              t = this._parseInnerContent(i, t, n, r, s);
          return t;
        }
        _parseAndAppendText(e, t) {
          const n = [];
          for (const e of t)
            (Number.isFinite(e) || "string" == typeof e) && n.push(e);
          for (let t of n)
            if (((t = ("" + t).trim().replace(/\s+/g, " ")), t.length > 0))
              return e + (e ? " " : "") + t;
          return e;
        }
      }
      class Me {
        monitor() {
          $(window, "input", this._handle);
        }
        _handle(e) {
          const { target: t } = e;
          if ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) return;
          const n = t.placeholder || t.name || t.id;
          n &&
            oe
              .getInstance()
              .addEvent(
                Ee({
                  src: "",
                  txt: n,
                  tag: t.tagName.toLowerCase(),
                  hid: t.id,
                  type: "kbd",
                  class: t.className,
                }),
                "kbd"
              );
        }
      }
      let Ne = window.location.href;
      class De {
        static getInstance() {
          return this.instance || (this.instance = new De()), this.instance;
        }
        monitor() {
          d.forEach((e) => {
            $(window, e, this._onPageEventHandle.bind(this), !0);
          }),
            h.forEach((e) => {
              $(document, e, this._onPageEventHandle.bind(this), !0);
            });
        }
        _onPageEventHandle(e) {
          if (!e || !e.type) return;
          const t = { type: e.type };
          switch (e.type) {
            case "visibilitychange":
              t.data = "state: " + this.getDocumentState();
              break;
            case "readystatechange":
              t.data = "state: " + document.readyState;
              break;
            case "pagehide":
            case "pageshow":
            case "load":
              e.persisted && (t.data = "persisted: " + e.persisted);
              break;
            case "storage":
              e.key && (t.data = "key: " + e.key);
              break;
            case "message":
            case "messageerror":
              e.data &&
                e.origin &&
                (t.data = `origin: ${e.origin} size: ${this.getSizeInBytes(
                  e.data
                )}`);
              break;
            case "hashchange":
              e.newURL && (t.data = "newURL: " + e.newURL);
          }
          oe.getInstance().addEvent(t, "page");
        }
        getDocumentState() {
          return "hidden" === document.visibilityState
            ? "hidden"
            : document.hasFocus()
            ? "active"
            : "passive";
        }
        getSizeInBytes(e) {
          let t = e;
          return "string" != typeof e && (t = JSON.stringify(e)), 2 * t.length;
        }
      }
      var Oe,
        Le,
        xe,
        Pe,
        Fe,
        Ue,
        Ve = -1,
        qe = function (e) {
          addEventListener(
            "pageshow",
            function (t) {
              t.persisted && ((Ve = t.timeStamp), e(t));
            },
            !0
          );
        },
        Ge = function () {
          return (
            window.performance &&
            performance.getEntriesByType &&
            performance.getEntriesByType("navigation")[0]
          );
        },
        Be = function () {
          var e = Ge();
          return (e && e.activationStart) || 0;
        },
        We = function (e, t) {
          var n = Ge(),
            r = "navigate";
          return (
            Ve >= 0
              ? (r = "back-forward-cache")
              : n &&
                (r =
                  document.prerendering || Be() > 0
                    ? "prerender"
                    : document.wasDiscarded
                    ? "restore"
                    : n.type.replace(/_/g, "-")),
            {
              name: e,
              value: void 0 === t ? -1 : t,
              rating: "good",
              delta: 0,
              entries: [],
              id: "v3-"
                .concat(Date.now(), "-")
                .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
              navigationType: r,
            }
          );
        },
        He = function (e, t, n) {
          try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
              var r = new PerformanceObserver(function (e) {
                Promise.resolve().then(function () {
                  t(e.getEntries());
                });
              });
              return (
                r.observe(Object.assign({ type: e, buffered: !0 }, n || {})), r
              );
            }
          } catch (e) {}
        },
        Ze = function (e, t, n, r) {
          var s, i;
          return function (o) {
            t.value >= 0 &&
              (o || r) &&
              ((i = t.value - (s || 0)) || void 0 === s) &&
              ((s = t.value),
              (t.delta = i),
              (t.rating = (function (e, t) {
                return e > t[1]
                  ? "poor"
                  : e > t[0]
                  ? "needs-improvement"
                  : "good";
              })(t.value, n)),
              e(t));
          };
        },
        je = function (e) {
          requestAnimationFrame(function () {
            return requestAnimationFrame(function () {
              return e();
            });
          });
        },
        ze = function (e) {
          var t = function (t) {
            ("pagehide" !== t.type && "hidden" !== document.visibilityState) ||
              e(t);
          };
          addEventListener("visibilitychange", t, !0),
            addEventListener("pagehide", t, !0);
        },
        Ke = function (e) {
          var t = !1;
          return function (n) {
            t || (e(n), (t = !0));
          };
        },
        Qe = -1,
        Ye = function () {
          return "hidden" !== document.visibilityState || document.prerendering
            ? 1 / 0
            : 0;
        },
        Je = function (e) {
          "hidden" === document.visibilityState &&
            Qe > -1 &&
            ((Qe = "visibilitychange" === e.type ? e.timeStamp : 0), Xe());
        },
        $e = function () {
          addEventListener("visibilitychange", Je, !0),
            addEventListener("prerenderingchange", Je, !0);
        },
        Xe = function () {
          removeEventListener("visibilitychange", Je, !0),
            removeEventListener("prerenderingchange", Je, !0);
        },
        et = function () {
          return (
            Qe < 0 &&
              ((Qe = Ye()),
              $e(),
              qe(function () {
                setTimeout(function () {
                  (Qe = Ye()), $e();
                }, 0);
              })),
            {
              get firstHiddenTime() {
                return Qe;
              },
            }
          );
        },
        tt = function (e) {
          document.prerendering
            ? addEventListener(
                "prerenderingchange",
                function () {
                  return e();
                },
                !0
              )
            : e();
        },
        nt = [1800, 3e3],
        rt = function (e, t) {
          (t = t || {}),
            tt(function () {
              var n,
                r = et(),
                s = We("FCP"),
                i = He("paint", function (e) {
                  e.forEach(function (e) {
                    "first-contentful-paint" === e.name &&
                      (i.disconnect(),
                      e.startTime < r.firstHiddenTime &&
                        ((s.value = Math.max(e.startTime - Be(), 0)),
                        s.entries.push(e),
                        n(!0)));
                  });
                });
              i &&
                ((n = Ze(e, s, nt, t.reportAllChanges)),
                qe(function (r) {
                  (s = We("FCP")),
                    (n = Ze(e, s, nt, t.reportAllChanges)),
                    je(function () {
                      (s.value = performance.now() - r.timeStamp), n(!0);
                    });
                }));
            });
        },
        st = [0.1, 0.25],
        it = { passive: !0, capture: !0 },
        ot = new Date(),
        at = function (e, t) {
          Oe ||
            ((Oe = t),
            (Le = e),
            (xe = new Date()),
            ut(removeEventListener),
            ct());
        },
        ct = function () {
          if (Le >= 0 && Le < xe - ot) {
            var e = {
              entryType: "first-input",
              name: Oe.type,
              target: Oe.target,
              cancelable: Oe.cancelable,
              startTime: Oe.timeStamp,
              processingStart: Oe.timeStamp + Le,
            };
            Pe.forEach(function (t) {
              t(e);
            }),
              (Pe = []);
          }
        },
        lt = function (e) {
          if (e.cancelable) {
            var t =
              (e.timeStamp > 1e12 ? new Date() : performance.now()) -
              e.timeStamp;
            "pointerdown" == e.type
              ? (function (e, t) {
                  var n = function () {
                      at(e, t), s();
                    },
                    r = function () {
                      s();
                    },
                    s = function () {
                      removeEventListener("pointerup", n, it),
                        removeEventListener("pointercancel", r, it);
                    };
                  addEventListener("pointerup", n, it),
                    addEventListener("pointercancel", r, it);
                })(t, e)
              : at(t, e);
          }
        },
        ut = function (e) {
          ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(
            function (t) {
              return e(t, lt, it);
            }
          );
        },
        dt = [100, 300],
        ht = 0,
        pt = 1 / 0,
        gt = 0,
        mt = function (e) {
          e.forEach(function (e) {
            e.interactionId &&
              ((pt = Math.min(pt, e.interactionId)),
              (gt = Math.max(gt, e.interactionId)),
              (ht = gt ? (gt - pt) / 7 + 1 : 0));
          });
        },
        ft = function () {
          return Fe ? ht : performance.interactionCount || 0;
        },
        yt = function () {
          "interactionCount" in performance ||
            Fe ||
            (Fe = He("event", mt, {
              type: "event",
              buffered: !0,
              durationThreshold: 0,
            }));
        },
        vt = [200, 500],
        It = 0,
        bt = function () {
          return ft() - It;
        },
        Ct = [],
        St = {},
        wt = function (e) {
          var t = Ct[Ct.length - 1],
            n = St[e.interactionId];
          if (n || Ct.length < 10 || e.duration > t.latency) {
            if (n)
              n.entries.push(e), (n.latency = Math.max(n.latency, e.duration));
            else {
              var r = {
                id: e.interactionId,
                latency: e.duration,
                entries: [e],
              };
              (St[r.id] = r), Ct.push(r);
            }
            Ct.sort(function (e, t) {
              return t.latency - e.latency;
            }),
              Ct.splice(10).forEach(function (e) {
                delete St[e.id];
              });
          }
        },
        At = [2500, 4e3],
        Et = {},
        kt = [800, 1800],
        _t = function (e, t) {
          t = t || {};
          var n = We("TTFB"),
            r = Ze(e, n, kt, t.reportAllChanges);
          !(function e(t) {
            document.prerendering
              ? tt(function () {
                  return e(t);
                })
              : "complete" !== document.readyState
              ? addEventListener(
                  "load",
                  function () {
                    return e(t);
                  },
                  !0
                )
              : setTimeout(t, 0);
          })(function () {
            var s = Ge();
            if (s) {
              var i = s.responseStart;
              if (i <= 0 || i > performance.now()) return;
              (n.value = Math.max(i - Be(), 0)),
                (n.entries = [s]),
                r(!0),
                qe(function () {
                  (n = We("TTFB", 0)),
                    (r = Ze(e, n, kt, t.reportAllChanges))(!0);
                });
            }
          });
        };
      class Rt {
        constructor() {
          (this.startedMonitoring = !1), (this.metricQueue = {});
        }
        static getInstance() {
          return this.instance || (this.instance = new Rt()), this.instance;
        }
        sendMetric(e) {
          if (!e || !e.name) return;
          if (e.name in this.metricQueue) return;
          const { name: t, value: n, rating: r } = e;
          (this.metricQueue[e.name] = {
            name: t,
            value: n.toString(),
            rating: r,
          }),
            ie
              .getInstance()
              .addPageVisitEvent(
                {
                  event: this.metricQueue[e.name],
                  occurredAt: new Date(ne(Date.now())).toISOString(),
                },
                "wv"
              );
        }
        monitor() {
          this.startedMonitoring ||
            ((this.startedMonitoring = !0),
            (function (e, t) {
              (t = t || {}),
                tt(function () {
                  var n,
                    r = et(),
                    s = We("LCP"),
                    i = function (e) {
                      var t = e[e.length - 1];
                      t &&
                        t.startTime < r.firstHiddenTime &&
                        ((s.value = Math.max(t.startTime - Be(), 0)),
                        (s.entries = [t]),
                        n());
                    },
                    o = He("largest-contentful-paint", i);
                  if (o) {
                    n = Ze(e, s, At, t.reportAllChanges);
                    var a = Ke(function () {
                      Et[s.id] ||
                        (i(o.takeRecords()),
                        o.disconnect(),
                        (Et[s.id] = !0),
                        n(!0));
                    });
                    ["keydown", "click"].forEach(function (e) {
                      addEventListener(e, a, !0);
                    }),
                      ze(a),
                      qe(function (r) {
                        (s = We("LCP")),
                          (n = Ze(e, s, At, t.reportAllChanges)),
                          je(function () {
                            (s.value = performance.now() - r.timeStamp),
                              (Et[s.id] = !0),
                              n(!0);
                          });
                      });
                  }
                });
            })(this.sendMetric.bind(this)),
            (function (e, t) {
              (t = t || {}),
                tt(function () {
                  var n,
                    r = et(),
                    s = We("FID"),
                    i = function (e) {
                      e.startTime < r.firstHiddenTime &&
                        ((s.value = e.processingStart - e.startTime),
                        s.entries.push(e),
                        n(!0));
                    },
                    o = function (e) {
                      e.forEach(i);
                    },
                    a = He("first-input", o);
                  (n = Ze(e, s, dt, t.reportAllChanges)),
                    a &&
                      ze(
                        Ke(function () {
                          o(a.takeRecords()), a.disconnect();
                        })
                      ),
                    a &&
                      qe(function () {
                        var r;
                        (s = We("FID")),
                          (n = Ze(e, s, dt, t.reportAllChanges)),
                          (Pe = []),
                          (Le = -1),
                          (Oe = null),
                          ut(addEventListener),
                          (r = i),
                          Pe.push(r),
                          ct();
                      });
                });
            })(this.sendMetric.bind(this)),
            (function (e, t) {
              (t = t || {}),
                rt(
                  Ke(function () {
                    var n,
                      r = We("CLS", 0),
                      s = 0,
                      i = [],
                      o = function (e) {
                        e.forEach(function (e) {
                          if (!e.hadRecentInput) {
                            var t = i[0],
                              n = i[i.length - 1];
                            s &&
                            e.startTime - n.startTime < 1e3 &&
                            e.startTime - t.startTime < 5e3
                              ? ((s += e.value), i.push(e))
                              : ((s = e.value), (i = [e]));
                          }
                        }),
                          s > r.value && ((r.value = s), (r.entries = i), n());
                      },
                      a = He("layout-shift", o);
                    a &&
                      ((n = Ze(e, r, st, t.reportAllChanges)),
                      ze(function () {
                        o(a.takeRecords()), n(!0);
                      }),
                      qe(function () {
                        (s = 0),
                          (r = We("CLS", 0)),
                          (n = Ze(e, r, st, t.reportAllChanges)),
                          je(function () {
                            return n();
                          });
                      }),
                      setTimeout(n, 0));
                  })
                );
            })(this.sendMetric.bind(this)),
            rt(this.sendMetric.bind(this)),
            (function (e, t) {
              (t = t || {}),
                tt(function () {
                  yt();
                  var n,
                    r = We("INP"),
                    s = function (e) {
                      e.forEach(function (e) {
                        e.interactionId && wt(e),
                          "first-input" === e.entryType &&
                            !Ct.some(function (t) {
                              return t.entries.some(function (t) {
                                return (
                                  e.duration === t.duration &&
                                  e.startTime === t.startTime
                                );
                              });
                            }) &&
                            wt(e);
                      });
                      var t,
                        s =
                          ((t = Math.min(Ct.length - 1, Math.floor(bt() / 50))),
                          Ct[t]);
                      s &&
                        s.latency !== r.value &&
                        ((r.value = s.latency), (r.entries = s.entries), n());
                    },
                    i = He("event", s, {
                      durationThreshold: t.durationThreshold || 40,
                    });
                  (n = Ze(e, r, vt, t.reportAllChanges)),
                    i &&
                      (i.observe({ type: "first-input", buffered: !0 }),
                      ze(function () {
                        s(i.takeRecords()),
                          r.value < 0 &&
                            bt() > 0 &&
                            ((r.value = 0), (r.entries = [])),
                          n(!0);
                      }),
                      qe(function () {
                        (Ct = []),
                          (It = ft()),
                          (r = We("INP")),
                          (n = Ze(e, r, vt, t.reportAllChanges));
                      }));
                });
            })(this.sendMetric.bind(this)),
            _t(this.sendMetric.bind(this)));
        }
      }
      class Tt {
        static configure(e) {
          return (
            (this.allowUntrustedEvents = e),
            (this.initialRequest = !1),
            this.instance || (this.instance = new Tt()),
            this.instance
          );
        }
        static getInstance() {
          if (!this.instance) throw new Error("HelpCode was not configured");
          return this.instance;
        }
        constructor() {
          (this.requestContext = null),
            $(window, "hashchange", (e) => this._handleHashChange(e)),
            $(window, "noibuHelpCode", (e) => this._receiveHelpCode(e));
        }
        requestHelpCode(e = !0) {
          if (null != this.requestContext) return this.requestContext.promise;
          const t = {
            alertUser: e,
            resolve: null,
            reject: null,
            promise: null,
          };
          (t.promise = new Promise((e, n) => {
            (t.resolve = e), (t.reject = n);
          })),
            (this.requestContext = t);
          return !1 === this._sendRequest()
            ? ((this.requestContext = null),
              Promise.reject(new Error("noibu connection is unavailable")))
            : this.requestContext.promise;
        }
        checkInitialRequest() {
          window.location.href.toLowerCase().includes("#helpcode") &&
            !1 === Tt.initialRequest &&
            ((Tt.initialRequest = !0), this._sendRequest());
        }
        _handleHashChange(e) {
          if (!e.isTrusted && !Tt.allowUntrustedEvents) return;
          !e.oldURL.toLowerCase().includes("#helpcode") &&
            e.newURL.toLowerCase().includes("#helpcode") &&
            (window.history.back(), this._sendRequest());
        }
        _receiveHelpCode(e) {
          if (null == this.requestContext) return void this._presentHelpCode(e);
          const t = this.requestContext;
          (this.requestContext = null),
            !0 === t.alertUser && this._presentHelpCode(e);
          const { success: n, data: r } = e.detail;
          n ? t.resolve(r) : t.reject(new Error(r));
        }
        _presentHelpCode(e) {
          const { success: t, data: n } = e.detail;
          if (t) window.prompt("", n);
          else {
            const e = "Noibu help code is not available due to " + n;
            window.alert(e),
              J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                e,
                !1,
                "error"
              );
          }
        }
        _sendRequest() {
          return se.getInstance().sendMessage("wr", { wr: "hc" });
        }
      }
      class Mt {
        constructor() {
          (this.customIDs = {}),
            (this.customErrorsCount = 0),
            (this.TOO_MANY_IDS_ADDED_MSG = "TOO_MANY_IDS_ADDED"),
            (this.ID_NAME_ALREADY_ADDED_MSG = "ID_NAME_ALREADY_ADDED"),
            (this.NAME_TOO_LONG_MSG = "NAME_TOO_LONG"),
            (this.VALUE_TOO_LONG_MSG = "VALUE_TOO_LONG"),
            (this.INVALID_NAME_TYPE_MSG = "INVALID_NAME_TYPE"),
            (this.INVALID_VALUE_TYPE_MSG = "INVALID_VALUE_TYPE"),
            (this.NAME_HAS_NO_LENGTH_MSG = "NAME_HAS_NO_LENGTH"),
            (this.VALUE_HAS_NO_LENGTH_MSG = "VALUE_HAS_NO_LENGTH"),
            (this.SUCCESS_MSG = "SUCCESS"),
            (this.ERROR_HAS_NO_MSG_MSG = "ERROR_HAS_NO_MSG"),
            (this.ERROR_HAS_NO_STACK_MSG = "ERROR_HAS_NO_STACK"),
            (this.NULL_CUSTOM_ERR_MSG = "NULL_CUSTOM_ERROR"),
            (this.ERROR_ALREADY_RECEIVED_MSG = "ERROR_ALREADY_RECEIVED"),
            (this.INVALID_ERROR_SOURCE_MSG = "INVALID_ERROR_SOURCE_MSG"),
            (this.TOO_MANY_ERRORS_RECEIVED_PER_PAGEVISIT_MSG =
              "TOO_MANY_ERRORS_RECEIVED_PER_PAGEVISIT");
        }
        static getInstance() {
          return this.instance || (this.instance = new Mt()), this.instance;
        }
        exposeFunctions() {
          const e = this._getSDKWindowObject();
          window.NOIBUJS = e;
        }
        _getSDKWindowObject() {
          return {
            requestHelpCode: this._requestHelpCode.bind(this),
            addCustomAttribute: this._addCustomAttribute.bind(this),
            addError: this._addCustomError.bind(this),
            addJsSdkError: this._addErrorFromJSSdk.bind(this),
          };
        }
        _validateCustomError(e) {
          return e
            ? e.message
              ? e.stack
                ? this.SUCCESS_MSG
                : this.ERROR_HAS_NO_STACK_MSG
              : this.ERROR_HAS_NO_MSG_MSG
            : this.NULL_CUSTOM_ERR_MSG;
        }
        _validateAndSetCustomError(e) {
          if (this.customErrorsCount >= 500)
            return this.TOO_MANY_ERRORS_RECEIVED_PER_PAGEVISIT_MSG;
          const t = this._validateCustomError(e);
          return t !== this.SUCCESS_MSG
            ? t
            : ((this.customErrorsCount += 1), this.SUCCESS_MSG);
        }
        _addErrorFromJSSdk(e, t) {
          const n = this._validateAndSetCustomError(e);
          return n !== this.SUCCESS_MSG
            ? n
            : "ReactError" !== t && "VueError" !== t
            ? this.INVALID_ERROR_SOURCE_MSG
            : (le(t, { error: e }), n);
        }
        _addCustomError(e) {
          const t = this._validateAndSetCustomError(e);
          return t !== this.SUCCESS_MSG || le("CustomError", { error: e }), t;
        }
        _addCustomAttribute(e, t) {
          if (Object.keys(this.customIDs).length >= 10)
            return this.TOO_MANY_IDS_ADDED_MSG;
          const n = this._validateCustomIDInput(e, t);
          return n !== this.SUCCESS_MSG
            ? n
            : e in this.customIDs
            ? this.ID_NAME_ALREADY_ADDED_MSG
            : ((this.customIDs[e] = t),
              se
                .getInstance()
                .sendMessage("m", { pvm: { id_name: e, id_val: t } }),
              this.SUCCESS_MSG);
        }
        _validateCustomIDInput(e, t) {
          return "string" != typeof e
            ? this.INVALID_NAME_TYPE_MSG
            : "string" != typeof t
            ? this.INVALID_VALUE_TYPE_MSG
            : t.length > 500
            ? this.VALUE_TOO_LONG_MSG
            : e.length > 50
            ? this.NAME_TOO_LONG_MSG
            : 0 === t.length
            ? this.VALUE_HAS_NO_LENGTH_MSG
            : 0 === e.length
            ? this.NAME_HAS_NO_LENGTH_MSG
            : this.SUCCESS_MSG;
        }
        _requestHelpCode(e = !0) {
          return Tt.getInstance().requestHelpCode(e);
        }
      }
      class Nt {
        static getInstance() {
          return this.instance || (this.instance = new Nt()), this.instance;
        }
        _safeQueryAll(e, t) {
          const n = e.querySelectorAll(t);
          return n ? Array.from(n) : [];
        }
        _processMatchingElements(e, t) {
          e.forEach((e) => {
            if (!e) return;
            const n = e.textContent;
            n && Mt.getInstance()._addCustomAttribute(t, n);
          });
        }
        _findAndAddMatchingElementsInNodes(e) {
          Object.keys(f()).forEach((t) => {
            const n = f()[t];
            n &&
              e.forEach((e) => {
                if (e.nodeType !== Node.ELEMENT_NODE) return;
                let r = [];
                e.matches(n) && r.push(e);
                const s = this._safeQueryAll(e, n);
                (r = r.concat(s)), this._processMatchingElements(r, t);
              });
          });
        }
        _setupMutationObserver() {
          const e = new MutationObserver((e) => {
            e.forEach((e) => {
              if (
                ("childList" === e.type &&
                  e.addedNodes.length > 0 &&
                  this._findAndAddMatchingElementsInNodes(e.addedNodes),
                "attributes" === e.type)
              ) {
                const t = e.target;
                t.nodeType === Node.ELEMENT_NODE &&
                  this._findAndAddMatchingElementsInNodes([t]);
              }
            });
          });
          e.observe(document.documentElement, {
            childList: !0,
            subtree: !0,
            attributes: !0,
          }),
            (this.observer = e);
        }
        _findAndAddMatchingElements() {
          Object.keys(f()).forEach((e) => {
            const t = f()[e];
            if (!t) return;
            const n = this._safeQueryAll(document, t);
            this._processMatchingElements(n, e);
          });
        }
        monitor() {
          0 !== Object.keys(f()).length &&
            (this._findAndAddMatchingElements(),
            "undefined" != typeof MutationObserver
              ? this._setupMutationObserver()
              : (this.interval = setInterval(() => {
                  this._findAndAddMatchingElements();
                }, 5e3)));
        }
        _disconnectObserver() {
          this.observer &&
            this.observer.disconnect &&
            "function" == typeof this.observer.disconnect &&
            this.observer.disconnect(),
            this.interval && clearInterval(this.interval);
        }
      }
      function Dt(e) {
        return e.nodeType === e.ELEMENT_NODE;
      }
      function Ot(e) {
        var t = null == e ? void 0 : e.host;
        return Boolean((null == t ? void 0 : t.shadowRoot) === e);
      }
      function Lt(e) {
        return "[object ShadowRoot]" === Object.prototype.toString.call(e);
      }
      function xt(e) {
        try {
          var t = e.rules || e.cssRules;
          return t
            ? ((n = Array.from(t).map(Pt).join("")).includes(
                " background-clip: text;"
              ) &&
                !n.includes(" -webkit-background-clip: text;") &&
                (n = n.replace(
                  " background-clip: text;",
                  " -webkit-background-clip: text; background-clip: text;"
                )),
              n)
            : null;
        } catch (e) {
          return null;
        }
        var n;
      }
      function Pt(e) {
        var t = e.cssText;
        if (
          (function (e) {
            return "styleSheet" in e;
          })(e)
        )
          try {
            t = xt(e.styleSheet) || t;
          } catch (e) {}
        return t;
      }
      !(function (e) {
        (e[(e.Document = 0)] = "Document"),
          (e[(e.DocumentType = 1)] = "DocumentType"),
          (e[(e.Element = 2)] = "Element"),
          (e[(e.Text = 3)] = "Text"),
          (e[(e.CDATA = 4)] = "CDATA"),
          (e[(e.Comment = 5)] = "Comment");
      })(Ue || (Ue = {}));
      var Ft = (function () {
        function e() {
          (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
        }
        return (
          (e.prototype.getId = function (e) {
            var t;
            if (!e) return -1;
            var n =
              null === (t = this.getMeta(e)) || void 0 === t ? void 0 : t.id;
            return null != n ? n : -1;
          }),
          (e.prototype.getNode = function (e) {
            return this.idNodeMap.get(e) || null;
          }),
          (e.prototype.getIds = function () {
            return Array.from(this.idNodeMap.keys());
          }),
          (e.prototype.getMeta = function (e) {
            return this.nodeMetaMap.get(e) || null;
          }),
          (e.prototype.removeNodeFromMap = function (e) {
            var t = this,
              n = this.getId(e);
            this.idNodeMap.delete(n),
              e.childNodes &&
                e.childNodes.forEach(function (e) {
                  return t.removeNodeFromMap(e);
                });
          }),
          (e.prototype.has = function (e) {
            return this.idNodeMap.has(e);
          }),
          (e.prototype.hasNode = function (e) {
            return this.nodeMetaMap.has(e);
          }),
          (e.prototype.add = function (e, t) {
            var n = t.id;
            this.idNodeMap.set(n, e), this.nodeMetaMap.set(e, t);
          }),
          (e.prototype.replace = function (e, t) {
            var n = this.getNode(e);
            if (n) {
              var r = this.nodeMetaMap.get(n);
              r && this.nodeMetaMap.set(t, r);
            }
            this.idNodeMap.set(e, t);
          }),
          (e.prototype.reset = function () {
            (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
          }),
          e
        );
      })();
      function Ut(e) {
        var t = e.element,
          n = e.maskInputOptions,
          r = e.tagName,
          s = e.type,
          i = e.value,
          o = e.maskInputFn,
          a = i || "",
          c = s && s.toLowerCase();
        return (
          (n[r.toLowerCase()] || (c && n[c])) &&
            (a = o ? o(a, t) : "*".repeat(a.length)),
          a
        );
      }
      function Vt(e) {
        var t = e.type;
        return e.hasAttribute("data-rr-is-password")
          ? "password"
          : t
          ? t.toLowerCase()
          : null;
      }
      var qt,
        Gt,
        Bt = 1,
        Wt = new RegExp("[^a-z0-9-_:]");
      function Ht() {
        return Bt++;
      }
      var Zt = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
        jt = /^(?:[a-z+]+:)?\/\//i,
        zt = /^www\..*/i,
        Kt = /^(data:)([^,]*),(.*)/i;
      function Qt(e, t) {
        return (e || "").replace(Zt, function (e, n, r, s, i, o) {
          var a,
            c = r || i || o,
            l = n || s || "";
          if (!c) return e;
          if (jt.test(c) || zt.test(c))
            return "url(".concat(l).concat(c).concat(l, ")");
          if (Kt.test(c)) return "url(".concat(l).concat(c).concat(l, ")");
          if ("/" === c[0])
            return "url("
              .concat(l)
              .concat(
                ((a = t),
                (a.indexOf("//") > -1
                  ? a.split("/").slice(0, 3).join("/")
                  : a.split("/")[0]
                ).split("?")[0] + c)
              )
              .concat(l, ")");
          var u = t.split("/"),
            d = c.split("/");
          u.pop();
          for (var h = 0, p = d; h < p.length; h++) {
            var g = p[h];
            "." !== g && (".." === g ? u.pop() : u.push(g));
          }
          return "url(".concat(l).concat(u.join("/")).concat(l, ")");
        });
      }
      var Yt = /^[^ \t\n\r\u000c]+/,
        Jt = /^[, \t\n\r\u000c]+/;
      function $t(e, t) {
        if (!t || "" === t.trim()) return t;
        var n = e.createElement("a");
        return (n.href = t), n.href;
      }
      function Xt() {
        var e = document.createElement("a");
        return (e.href = ""), e.href;
      }
      function en(e, t, n, r) {
        return r
          ? "src" === n ||
            ("href" === n && ("use" !== t || "#" !== r[0])) ||
            ("xlink:href" === n && "#" !== r[0])
            ? $t(e, r)
            : "background" !== n || ("table" !== t && "td" !== t && "th" !== t)
            ? "srcset" === n
              ? (function (e, t) {
                  if ("" === t.trim()) return t;
                  var n = 0;
                  function r(e) {
                    var r,
                      s = e.exec(t.substring(n));
                    return s ? ((r = s[0]), (n += r.length), r) : "";
                  }
                  for (var s = []; r(Jt), !(n >= t.length); ) {
                    var i = r(Yt);
                    if ("," === i.slice(-1))
                      (i = $t(e, i.substring(0, i.length - 1))), s.push(i);
                    else {
                      var o = "";
                      i = $t(e, i);
                      for (var a = !1; ; ) {
                        var c = t.charAt(n);
                        if ("" === c) {
                          s.push((i + o).trim());
                          break;
                        }
                        if (a) ")" === c && (a = !1);
                        else {
                          if ("," === c) {
                            (n += 1), s.push((i + o).trim());
                            break;
                          }
                          "(" === c && (a = !0);
                        }
                        (o += c), (n += 1);
                      }
                    }
                  }
                  return s.join(", ");
                })(e, r)
              : "style" === n
              ? Qt(r, Xt())
              : "object" === t && "data" === n
              ? $t(e, r)
              : r
            : $t(e, r)
          : r;
      }
      function tn(e, t, n) {
        return ("video" === e || "audio" === e) && "autoplay" === t;
      }
      function nn(e, t, n) {
        if (!e) return !1;
        if (e.nodeType !== e.ELEMENT_NODE) return !!n && nn(e.parentNode, t, n);
        for (var r = e.classList.length; r--; ) {
          var s = e.classList[r];
          if (t.test(s)) return !0;
        }
        return !!n && nn(e.parentNode, t, n);
      }
      function rn(e, t, n) {
        try {
          var r = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
          if (null === r) return !1;
          if ("string" == typeof t) {
            if (r.classList.contains(t)) return !0;
            if (r.closest(".".concat(t))) return !0;
          } else if (nn(r, t, !0)) return !0;
          if (n) {
            if (r.matches(n)) return !0;
            if (r.closest(n)) return !0;
          }
        } catch (e) {}
        return !1;
      }
      function sn(e, t) {
        var n = t.doc,
          r = t.mirror,
          s = t.blockClass,
          i = t.blockSelector,
          o = t.maskTextClass,
          a = t.maskTextSelector,
          c = t.inlineStylesheet,
          l = t.maskInputOptions,
          u = void 0 === l ? {} : l,
          d = t.maskTextFn,
          h = t.maskInputFn,
          p = t.dataURLOptions,
          g = void 0 === p ? {} : p,
          m = t.inlineImages,
          f = t.recordCanvas,
          y = t.keepIframeSrcFn,
          v = t.newlyAddedElement,
          I = void 0 !== v && v,
          b = (function (e, t) {
            if (!t.hasNode(e)) return;
            var n = t.getId(e);
            return 1 === n ? void 0 : n;
          })(n, r);
        switch (e.nodeType) {
          case e.DOCUMENT_NODE:
            return "CSS1Compat" !== e.compatMode
              ? { type: Ue.Document, childNodes: [], compatMode: e.compatMode }
              : { type: Ue.Document, childNodes: [] };
          case e.DOCUMENT_TYPE_NODE:
            return {
              type: Ue.DocumentType,
              name: e.name,
              publicId: e.publicId,
              systemId: e.systemId,
              rootId: b,
            };
          case e.ELEMENT_NODE:
            return (function (e, t) {
              for (
                var n = t.doc,
                  r = t.blockClass,
                  s = t.blockSelector,
                  i = t.inlineStylesheet,
                  o = t.maskInputOptions,
                  a = void 0 === o ? {} : o,
                  c = t.maskInputFn,
                  l = t.dataURLOptions,
                  u = void 0 === l ? {} : l,
                  d = t.inlineImages,
                  h = t.recordCanvas,
                  p = t.keepIframeSrcFn,
                  g = t.newlyAddedElement,
                  m = void 0 !== g && g,
                  f = t.rootId,
                  y = (function (e, t, n) {
                    try {
                      if ("string" == typeof t) {
                        if (e.classList.contains(t)) return !0;
                      } else
                        for (var r = e.classList.length; r--; ) {
                          var s = e.classList[r];
                          if (t.test(s)) return !0;
                        }
                      if (n) return e.matches(n);
                    } catch (e) {}
                    return !1;
                  })(e, r, s),
                  v = (function (e) {
                    if (e instanceof HTMLFormElement) return "form";
                    var t = e.tagName.toLowerCase().trim();
                    return Wt.test(t) ? "div" : t;
                  })(e),
                  I = {},
                  b = e.attributes.length,
                  C = 0;
                C < b;
                C++
              ) {
                var S = e.attributes[C];
                tn(v, S.name, S.value) ||
                  (I[S.name] = en(n, v, S.name, S.value));
              }
              if ("link" === v && i) {
                var w = Array.from(n.styleSheets).find(function (t) {
                    return t.href === e.href;
                  }),
                  A = null;
                w && (A = xt(w)),
                  A &&
                    (delete I.rel, delete I.href, (I._cssText = Qt(A, w.href)));
              }
              if (
                "style" === v &&
                e.sheet &&
                !(e.innerText || e.textContent || "").trim().length
              ) {
                (A = xt(e.sheet)) && (I._cssText = Qt(A, Xt()));
              }
              if ("input" === v || "textarea" === v || "select" === v) {
                var E = e.value,
                  k = e.checked;
                if (
                  "radio" !== I.type &&
                  "checkbox" !== I.type &&
                  "submit" !== I.type &&
                  "button" !== I.type &&
                  E
                ) {
                  var _ = Vt(e);
                  I.value = Ut({
                    element: e,
                    type: _,
                    tagName: v,
                    value: E,
                    maskInputOptions: a,
                    maskInputFn: c,
                  });
                } else k && (I.checked = k);
              }
              "option" === v &&
                (e.selected && !a.select
                  ? (I.selected = !0)
                  : delete I.selected);
              if ("canvas" === v && h)
                if ("2d" === e.__context)
                  (function (e) {
                    var t = e.getContext("2d");
                    if (!t) return !0;
                    for (var n = 0; n < e.width; n += 50)
                      for (var r = 0; r < e.height; r += 50) {
                        var s = t.getImageData,
                          i =
                            "__rrweb_original__" in s
                              ? s.__rrweb_original__
                              : s;
                        if (
                          new Uint32Array(
                            i.call(
                              t,
                              n,
                              r,
                              Math.min(50, e.width - n),
                              Math.min(50, e.height - r)
                            ).data.buffer
                          ).some(function (e) {
                            return 0 !== e;
                          })
                        )
                          return !1;
                      }
                    return !0;
                  })(e) || (I.rr_dataURL = e.toDataURL(u.type, u.quality));
                else if (!("__context" in e)) {
                  var R = e.toDataURL(u.type, u.quality),
                    T = document.createElement("canvas");
                  (T.width = e.width), (T.height = e.height);
                  var M = T.toDataURL(u.type, u.quality);
                  R !== M && (I.rr_dataURL = R);
                }
              if ("img" === v && d) {
                qt ||
                  ((qt = n.createElement("canvas")),
                  (Gt = qt.getContext("2d")));
                var N = e,
                  D = N.crossOrigin;
                N.crossOrigin = "anonymous";
                var O = function () {
                  N.removeEventListener("load", O);
                  try {
                    (qt.width = N.naturalWidth),
                      (qt.height = N.naturalHeight),
                      Gt.drawImage(N, 0, 0),
                      (I.rr_dataURL = qt.toDataURL(u.type, u.quality));
                  } catch (e) {
                    console.warn(
                      "Cannot inline img src="
                        .concat(N.currentSrc, "! Error: ")
                        .concat(e)
                    );
                  }
                  D ? (I.crossOrigin = D) : N.removeAttribute("crossorigin");
                };
                N.complete && 0 !== N.naturalWidth
                  ? O()
                  : N.addEventListener("load", O);
              }
              ("audio" !== v && "video" !== v) ||
                ((I.rr_mediaState = e.paused ? "paused" : "played"),
                (I.rr_mediaCurrentTime = e.currentTime));
              m ||
                (e.scrollLeft && (I.rr_scrollLeft = e.scrollLeft),
                e.scrollTop && (I.rr_scrollTop = e.scrollTop));
              if (y) {
                var L = e.getBoundingClientRect(),
                  x = L.width,
                  P = L.height;
                I = {
                  class: I.class,
                  rr_width: "".concat(x, "px"),
                  rr_height: "".concat(P, "px"),
                };
              }
              "iframe" !== v ||
                p(I.src) ||
                (e.contentDocument || (I.rr_src = I.src), delete I.src);
              return {
                type: Ue.Element,
                tagName: v,
                attributes: I,
                childNodes: [],
                isSVG:
                  ((F = e),
                  Boolean("svg" === F.tagName || F.ownerSVGElement) || void 0),
                needBlock: y,
                rootId: f,
              };
              var F;
            })(e, {
              doc: n,
              blockClass: s,
              blockSelector: i,
              inlineStylesheet: c,
              maskInputOptions: u,
              maskInputFn: h,
              dataURLOptions: g,
              inlineImages: m,
              recordCanvas: f,
              keepIframeSrcFn: y,
              newlyAddedElement: I,
              rootId: b,
            });
          case e.TEXT_NODE:
            return (function (e, t) {
              var n,
                r = t.maskTextClass,
                s = t.maskTextSelector,
                i = t.maskTextFn,
                o = t.rootId,
                a = e.parentNode && e.parentNode.tagName,
                c = e.textContent,
                l = "STYLE" === a || void 0,
                u = "SCRIPT" === a || void 0;
              if (l && c) {
                try {
                  e.nextSibling ||
                    e.previousSibling ||
                    ((null === (n = e.parentNode.sheet) || void 0 === n
                      ? void 0
                      : n.cssRules) &&
                      ((d = e.parentNode.sheet),
                      (c = d.cssRules
                        ? Array.from(d.cssRules)
                            .map(function (e) {
                              return e.cssText || "";
                            })
                            .join("")
                        : "")));
                } catch (t) {
                  console.warn(
                    "Cannot get CSS styles from text's parentNode. Error: ".concat(
                      t
                    ),
                    e
                  );
                }
                c = Qt(c, Xt());
              }
              var d;
              u && (c = "SCRIPT_PLACEHOLDER");
              !l &&
                !u &&
                c &&
                rn(e, r, s) &&
                (c = i ? i(c) : c.replace(/[\S]/g, "*"));
              return {
                type: Ue.Text,
                textContent: c || "",
                isStyle: l,
                rootId: o,
              };
            })(e, {
              maskTextClass: o,
              maskTextSelector: a,
              maskTextFn: d,
              rootId: b,
            });
          case e.CDATA_SECTION_NODE:
            return { type: Ue.CDATA, textContent: "", rootId: b };
          case e.COMMENT_NODE:
            return {
              type: Ue.Comment,
              textContent: e.textContent || "",
              rootId: b,
            };
          default:
            return !1;
        }
      }
      function on(e) {
        return null == e ? "" : e.toLowerCase();
      }
      function an(e, t) {
        var n,
          r = t.doc,
          s = t.mirror,
          i = t.blockClass,
          o = t.blockSelector,
          a = t.maskTextClass,
          c = t.maskTextSelector,
          l = t.skipChild,
          u = void 0 !== l && l,
          d = t.inlineStylesheet,
          h = void 0 === d || d,
          p = t.maskInputOptions,
          g = void 0 === p ? {} : p,
          m = t.maskTextFn,
          f = t.maskInputFn,
          y = t.slimDOMOptions,
          v = t.dataURLOptions,
          I = void 0 === v ? {} : v,
          b = t.inlineImages,
          C = void 0 !== b && b,
          S = t.recordCanvas,
          w = void 0 !== S && S,
          A = t.onSerialize,
          E = t.onIframeLoad,
          k = t.iframeLoadTimeout,
          _ = void 0 === k ? 5e3 : k,
          R = t.onStylesheetLoad,
          T = t.stylesheetLoadTimeout,
          M = void 0 === T ? 5e3 : T,
          N = t.keepIframeSrcFn,
          D =
            void 0 === N
              ? function () {
                  return !1;
                }
              : N,
          O = t.newlyAddedElement,
          L = void 0 !== O && O,
          x = t.preserveWhiteSpace,
          P = void 0 === x || x,
          F = sn(e, {
            doc: r,
            mirror: s,
            blockClass: i,
            blockSelector: o,
            maskTextClass: a,
            maskTextSelector: c,
            inlineStylesheet: h,
            maskInputOptions: g,
            maskTextFn: m,
            maskInputFn: f,
            dataURLOptions: I,
            inlineImages: C,
            recordCanvas: w,
            keepIframeSrcFn: D,
            newlyAddedElement: L,
          });
        if (!F) return console.warn(e, "not serialized"), null;
        n = s.hasNode(e)
          ? s.getId(e)
          : !(function (e, t) {
              if (t.comment && e.type === Ue.Comment) return !0;
              if (e.type === Ue.Element) {
                if (
                  t.script &&
                  ("script" === e.tagName ||
                    ("link" === e.tagName &&
                      ("preload" === e.attributes.rel ||
                        "modulepreload" === e.attributes.rel) &&
                      "script" === e.attributes.as) ||
                    ("link" === e.tagName &&
                      "prefetch" === e.attributes.rel &&
                      "string" == typeof e.attributes.href &&
                      e.attributes.href.endsWith(".js")))
                )
                  return !0;
                if (
                  t.headFavicon &&
                  (("link" === e.tagName &&
                    "shortcut icon" === e.attributes.rel) ||
                    ("meta" === e.tagName &&
                      (on(e.attributes.name).match(
                        /^msapplication-tile(image|color)$/
                      ) ||
                        "application-name" === on(e.attributes.name) ||
                        "icon" === on(e.attributes.rel) ||
                        "apple-touch-icon" === on(e.attributes.rel) ||
                        "shortcut icon" === on(e.attributes.rel))))
                )
                  return !0;
                if ("meta" === e.tagName) {
                  if (
                    t.headMetaDescKeywords &&
                    on(e.attributes.name).match(/^description|keywords$/)
                  )
                    return !0;
                  if (
                    t.headMetaSocial &&
                    (on(e.attributes.property).match(/^(og|twitter|fb):/) ||
                      on(e.attributes.name).match(/^(og|twitter):/) ||
                      "pinterest" === on(e.attributes.name))
                  )
                    return !0;
                  if (
                    t.headMetaRobots &&
                    ("robots" === on(e.attributes.name) ||
                      "googlebot" === on(e.attributes.name) ||
                      "bingbot" === on(e.attributes.name))
                  )
                    return !0;
                  if (
                    t.headMetaHttpEquiv &&
                    void 0 !== e.attributes["http-equiv"]
                  )
                    return !0;
                  if (
                    t.headMetaAuthorship &&
                    ("author" === on(e.attributes.name) ||
                      "generator" === on(e.attributes.name) ||
                      "framework" === on(e.attributes.name) ||
                      "publisher" === on(e.attributes.name) ||
                      "progid" === on(e.attributes.name) ||
                      on(e.attributes.property).match(/^article:/) ||
                      on(e.attributes.property).match(/^product:/))
                  )
                    return !0;
                  if (
                    t.headMetaVerification &&
                    ("google-site-verification" === on(e.attributes.name) ||
                      "yandex-verification" === on(e.attributes.name) ||
                      "csrf-token" === on(e.attributes.name) ||
                      "p:domain_verify" === on(e.attributes.name) ||
                      "verify-v1" === on(e.attributes.name) ||
                      "verification" === on(e.attributes.name) ||
                      "shopify-checkout-api-token" === on(e.attributes.name))
                  )
                    return !0;
                }
              }
              return !1;
            })(F, y) &&
            (P ||
              F.type !== Ue.Text ||
              F.isStyle ||
              F.textContent.replace(/^\s+|\s+$/gm, "").length)
          ? Ht()
          : -2;
        var U = Object.assign(F, { id: n });
        if ((s.add(e, U), -2 === n)) return null;
        A && A(e);
        var V = !u;
        if (U.type === Ue.Element) {
          (V = V && !U.needBlock), delete U.needBlock;
          var q = e.shadowRoot;
          q && Lt(q) && (U.isShadowHost = !0);
        }
        if ((U.type === Ue.Document || U.type === Ue.Element) && V) {
          y.headWhitespace &&
            U.type === Ue.Element &&
            "head" === U.tagName &&
            (P = !1);
          for (
            var G = {
                doc: r,
                mirror: s,
                blockClass: i,
                blockSelector: o,
                maskTextClass: a,
                maskTextSelector: c,
                skipChild: u,
                inlineStylesheet: h,
                maskInputOptions: g,
                maskTextFn: m,
                maskInputFn: f,
                slimDOMOptions: y,
                dataURLOptions: I,
                inlineImages: C,
                recordCanvas: w,
                preserveWhiteSpace: P,
                onSerialize: A,
                onIframeLoad: E,
                iframeLoadTimeout: _,
                onStylesheetLoad: R,
                stylesheetLoadTimeout: M,
                keepIframeSrcFn: D,
              },
              B = 0,
              W = Array.from(e.childNodes);
            B < W.length;
            B++
          ) {
            (j = an(W[B], G)) && U.childNodes.push(j);
          }
          if (Dt(e) && e.shadowRoot)
            for (
              var H = 0, Z = Array.from(e.shadowRoot.childNodes);
              H < Z.length;
              H++
            ) {
              var j;
              (j = an(Z[H], G)) &&
                (Lt(e.shadowRoot) && (j.isShadow = !0), U.childNodes.push(j));
            }
        }
        return (
          e.parentNode &&
            Ot(e.parentNode) &&
            Lt(e.parentNode) &&
            (U.isShadow = !0),
          U.type === Ue.Element &&
            "iframe" === U.tagName &&
            (function (e, t, n) {
              var r = e.contentWindow;
              if (r) {
                var s,
                  i = !1;
                try {
                  s = r.document.readyState;
                } catch (e) {
                  return;
                }
                if ("complete" === s) {
                  if (
                    "about:blank" !== r.location.href ||
                    "about:blank" === e.src ||
                    "" === e.src
                  )
                    return setTimeout(t, 0), e.addEventListener("load", t);
                  e.addEventListener("load", t);
                } else {
                  var o = setTimeout(function () {
                    i || (t(), (i = !0));
                  }, n);
                  e.addEventListener("load", function () {
                    clearTimeout(o), (i = !0), t();
                  });
                }
              }
            })(
              e,
              function () {
                var t = e.contentDocument;
                if (t && E) {
                  var n = an(t, {
                    doc: t,
                    mirror: s,
                    blockClass: i,
                    blockSelector: o,
                    maskTextClass: a,
                    maskTextSelector: c,
                    skipChild: !1,
                    inlineStylesheet: h,
                    maskInputOptions: g,
                    maskTextFn: m,
                    maskInputFn: f,
                    slimDOMOptions: y,
                    dataURLOptions: I,
                    inlineImages: C,
                    recordCanvas: w,
                    preserveWhiteSpace: P,
                    onSerialize: A,
                    onIframeLoad: E,
                    iframeLoadTimeout: _,
                    onStylesheetLoad: R,
                    stylesheetLoadTimeout: M,
                    keepIframeSrcFn: D,
                  });
                  n && E(e, n);
                }
              },
              _
            ),
          U.type === Ue.Element &&
            "link" === U.tagName &&
            "stylesheet" === U.attributes.rel &&
            (function (e, t, n) {
              var r,
                s = !1;
              try {
                r = e.sheet;
              } catch (e) {
                return;
              }
              if (!r) {
                var i = setTimeout(function () {
                  s || (t(), (s = !0));
                }, n);
                e.addEventListener("load", function () {
                  clearTimeout(i), (s = !0), t();
                });
              }
            })(
              e,
              function () {
                if (R) {
                  var t = an(e, {
                    doc: r,
                    mirror: s,
                    blockClass: i,
                    blockSelector: o,
                    maskTextClass: a,
                    maskTextSelector: c,
                    skipChild: !1,
                    inlineStylesheet: h,
                    maskInputOptions: g,
                    maskTextFn: m,
                    maskInputFn: f,
                    slimDOMOptions: y,
                    dataURLOptions: I,
                    inlineImages: C,
                    recordCanvas: w,
                    preserveWhiteSpace: P,
                    onSerialize: A,
                    onIframeLoad: E,
                    iframeLoadTimeout: _,
                    onStylesheetLoad: R,
                    stylesheetLoadTimeout: M,
                    keepIframeSrcFn: D,
                  });
                  t && R(e, t);
                }
              },
              M
            ),
          U
        );
      }
      var cn = /([^\\]):hover/;
      new RegExp(cn.source, "g");
      function ln(e, t, n = document) {
        const r = { capture: !0, passive: !0 };
        return (
          n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r)
        );
      }
      const un =
        "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
      let dn = {
        map: {},
        getId: () => (console.error(un), -1),
        getNode: () => (console.error(un), null),
        removeNodeFromMap() {
          console.error(un);
        },
        has: () => (console.error(un), !1),
        reset() {
          console.error(un);
        },
      };
      function hn(e, t, n = {}) {
        let r = null,
          s = 0;
        return function (...i) {
          const o = Date.now();
          s || !1 !== n.leading || (s = o);
          const a = t - (o - s),
            c = this;
          a <= 0 || a > t
            ? (r && (clearTimeout(r), (r = null)), (s = o), e.apply(c, i))
            : r ||
              !1 === n.trailing ||
              (r = setTimeout(() => {
                (s = !1 === n.leading ? 0 : Date.now()),
                  (r = null),
                  e.apply(c, i);
              }, a));
        };
      }
      function pn(e, t, n, r, s = window) {
        const i = s.Object.getOwnPropertyDescriptor(e, t);
        return (
          s.Object.defineProperty(
            e,
            t,
            r
              ? n
              : {
                  set(e) {
                    setTimeout(() => {
                      n.set.call(this, e);
                    }, 0),
                      i && i.set && i.set.call(this, e);
                  },
                }
          ),
          () => pn(e, t, i || {}, !0)
        );
      }
      function gn(e, t, n) {
        try {
          if (!(t in e)) return () => {};
          const r = e[t],
            s = n(r);
          return (
            "function" == typeof s &&
              ((s.prototype = s.prototype || {}),
              Object.defineProperties(s, {
                __rrweb_original__: { enumerable: !1, value: r },
              })),
            (e[t] = s),
            () => {
              e[t] = r;
            }
          );
        } catch (e) {
          return () => {};
        }
      }
      function mn(e) {
        var t, n, r, s, i, o;
        const a = e.document;
        return {
          left: a.scrollingElement
            ? a.scrollingElement.scrollLeft
            : void 0 !== e.pageXOffset
            ? e.pageXOffset
            : (null == a ? void 0 : a.documentElement.scrollLeft) ||
              (null ===
                (n =
                  null === (t = null == a ? void 0 : a.body) || void 0 === t
                    ? void 0
                    : t.parentElement) || void 0 === n
                ? void 0
                : n.scrollLeft) ||
              (null === (r = null == a ? void 0 : a.body) || void 0 === r
                ? void 0
                : r.scrollLeft) ||
              0,
          top: a.scrollingElement
            ? a.scrollingElement.scrollTop
            : void 0 !== e.pageYOffset
            ? e.pageYOffset
            : (null == a ? void 0 : a.documentElement.scrollTop) ||
              (null ===
                (i =
                  null === (s = null == a ? void 0 : a.body) || void 0 === s
                    ? void 0
                    : s.parentElement) || void 0 === i
                ? void 0
                : i.scrollTop) ||
              (null === (o = null == a ? void 0 : a.body) || void 0 === o
                ? void 0
                : o.scrollTop) ||
              0,
        };
      }
      function fn() {
        return (
          window.innerHeight ||
          (document.documentElement && document.documentElement.clientHeight) ||
          (document.body && document.body.clientHeight)
        );
      }
      function yn() {
        return (
          window.innerWidth ||
          (document.documentElement && document.documentElement.clientWidth) ||
          (document.body && document.body.clientWidth)
        );
      }
      function vn(e, t, n, r) {
        if (!e) return !1;
        const s = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
        if (!s) return !1;
        try {
          if ("string" == typeof t) {
            if (s.classList.contains(t)) return !0;
            if (r && null !== s.closest("." + t)) return !0;
          } else if (nn(s, t, r)) return !0;
        } catch (e) {}
        if (n) {
          if (s.matches(n)) return !0;
          if (r && null !== s.closest(n)) return !0;
        }
        return !1;
      }
      function In(e, t) {
        return -2 === t.getId(e);
      }
      function bn(e) {
        return Boolean(e.changedTouches);
      }
      function Cn(e, t) {
        return Boolean("IFRAME" === e.nodeName && t.getMeta(e));
      }
      function Sn(e, t) {
        return Boolean(
          "LINK" === e.nodeName &&
            e.nodeType === e.ELEMENT_NODE &&
            e.getAttribute &&
            "stylesheet" === e.getAttribute("rel") &&
            t.getMeta(e)
        );
      }
      function wn(e) {
        return Boolean(null == e ? void 0 : e.shadowRoot);
      }
      "undefined" != typeof window &&
        window.Proxy &&
        window.Reflect &&
        (dn = new Proxy(dn, {
          get: (e, t, n) => (
            "map" === t && console.error(un), Reflect.get(e, t, n)
          ),
        }));
      class An {
        constructor() {
          (this.id = 1),
            (this.styleIDMap = new WeakMap()),
            (this.idStyleMap = new Map());
        }
        getId(e) {
          var t;
          return null !== (t = this.styleIDMap.get(e)) && void 0 !== t ? t : -1;
        }
        has(e) {
          return this.styleIDMap.has(e);
        }
        add(e, t) {
          if (this.has(e)) return this.getId(e);
          let n;
          return (
            (n = void 0 === t ? this.id++ : t),
            this.styleIDMap.set(e, n),
            this.idStyleMap.set(n, e),
            n
          );
        }
        getStyle(e) {
          return this.idStyleMap.get(e) || null;
        }
        reset() {
          (this.styleIDMap = new WeakMap()),
            (this.idStyleMap = new Map()),
            (this.id = 1);
        }
        generateId() {
          return this.id++;
        }
      }
      function En(e) {
        var t, n;
        let r = null;
        return (
          (null ===
            (n =
              null === (t = e.getRootNode) || void 0 === t
                ? void 0
                : t.call(e)) || void 0 === n
            ? void 0
            : n.nodeType) === Node.DOCUMENT_FRAGMENT_NODE &&
            e.getRootNode().host &&
            (r = e.getRootNode().host),
          r
        );
      }
      function kn(e) {
        const t = e.ownerDocument;
        if (!t) return !1;
        const n = (function (e) {
          let t,
            n = e;
          for (; (t = En(n)); ) n = t;
          return n;
        })(e);
        return t.contains(n);
      }
      function _n(e) {
        const t = e.ownerDocument;
        return !!t && (t.contains(e) || kn(e));
      }
      var Rn = ((e) => (
          (e[(e.DomContentLoaded = 0)] = "DomContentLoaded"),
          (e[(e.Load = 1)] = "Load"),
          (e[(e.FullSnapshot = 2)] = "FullSnapshot"),
          (e[(e.IncrementalSnapshot = 3)] = "IncrementalSnapshot"),
          (e[(e.Meta = 4)] = "Meta"),
          (e[(e.Custom = 5)] = "Custom"),
          (e[(e.Plugin = 6)] = "Plugin"),
          e
        ))(Rn || {}),
        Tn = ((e) => (
          (e[(e.Mutation = 0)] = "Mutation"),
          (e[(e.MouseMove = 1)] = "MouseMove"),
          (e[(e.MouseInteraction = 2)] = "MouseInteraction"),
          (e[(e.Scroll = 3)] = "Scroll"),
          (e[(e.ViewportResize = 4)] = "ViewportResize"),
          (e[(e.Input = 5)] = "Input"),
          (e[(e.TouchMove = 6)] = "TouchMove"),
          (e[(e.MediaInteraction = 7)] = "MediaInteraction"),
          (e[(e.StyleSheetRule = 8)] = "StyleSheetRule"),
          (e[(e.CanvasMutation = 9)] = "CanvasMutation"),
          (e[(e.Font = 10)] = "Font"),
          (e[(e.Log = 11)] = "Log"),
          (e[(e.Drag = 12)] = "Drag"),
          (e[(e.StyleDeclaration = 13)] = "StyleDeclaration"),
          (e[(e.Selection = 14)] = "Selection"),
          (e[(e.AdoptedStyleSheet = 15)] = "AdoptedStyleSheet"),
          e
        ))(Tn || {}),
        Mn = ((e) => (
          (e[(e.MouseUp = 0)] = "MouseUp"),
          (e[(e.MouseDown = 1)] = "MouseDown"),
          (e[(e.Click = 2)] = "Click"),
          (e[(e.ContextMenu = 3)] = "ContextMenu"),
          (e[(e.DblClick = 4)] = "DblClick"),
          (e[(e.Focus = 5)] = "Focus"),
          (e[(e.Blur = 6)] = "Blur"),
          (e[(e.TouchStart = 7)] = "TouchStart"),
          (e[(e.TouchMove_Departed = 8)] = "TouchMove_Departed"),
          (e[(e.TouchEnd = 9)] = "TouchEnd"),
          (e[(e.TouchCancel = 10)] = "TouchCancel"),
          e
        ))(Mn || {}),
        Nn = ((e) => (
          (e[(e.Mouse = 0)] = "Mouse"),
          (e[(e.Pen = 1)] = "Pen"),
          (e[(e.Touch = 2)] = "Touch"),
          e
        ))(Nn || {}),
        Dn = ((e) => (
          (e[(e["2D"] = 0)] = "2D"),
          (e[(e.WebGL = 1)] = "WebGL"),
          (e[(e.WebGL2 = 2)] = "WebGL2"),
          e
        ))(Dn || {});
      function On(e) {
        return "__ln" in e;
      }
      class Ln {
        constructor() {
          (this.length = 0), (this.head = null), (this.tail = null);
        }
        get(e) {
          if (e >= this.length)
            throw new Error("Position outside of list range");
          let t = this.head;
          for (let n = 0; n < e; n++) t = (null == t ? void 0 : t.next) || null;
          return t;
        }
        addNode(e) {
          const t = { value: e, previous: null, next: null };
          if (((e.__ln = t), e.previousSibling && On(e.previousSibling))) {
            const n = e.previousSibling.__ln.next;
            (t.next = n),
              (t.previous = e.previousSibling.__ln),
              (e.previousSibling.__ln.next = t),
              n ? (n.previous = t) : (this.tail = t);
          } else if (
            e.nextSibling &&
            On(e.nextSibling) &&
            e.nextSibling.__ln.previous
          ) {
            const n = e.nextSibling.__ln.previous;
            (t.previous = n),
              (t.next = e.nextSibling.__ln),
              (e.nextSibling.__ln.previous = t),
              n && (n.next = t);
          } else
            this.head ? (this.head.previous = t) : (this.tail = t),
              (t.next = this.head),
              (this.head = t);
          this.length++;
        }
        removeNode(e) {
          const t = e.__ln;
          this.head &&
            (t.previous
              ? ((t.previous.next = t.next),
                t.next
                  ? (t.next.previous = t.previous)
                  : (this.tail = t.previous))
              : ((this.head = t.next),
                this.head && (this.head.previous = null)),
            e.__ln && delete e.__ln,
            this.length--);
        }
      }
      const xn = (e, t) => `${e}@${t}`;
      class Pn {
        constructor() {
          (this.frozen = !1),
            (this.locked = !1),
            (this.texts = []),
            (this.attributes = []),
            (this.removes = []),
            (this.mapRemoves = []),
            (this.movedMap = {}),
            (this.addedSet = new Set()),
            (this.movedSet = new Set()),
            (this.droppedSet = new Set()),
            (this.processMutations = (e) => {
              e.forEach(this.processMutation), this.emit();
            }),
            (this.emit = () => {
              if (this.frozen || this.locked) return;
              const e = [],
                t = new Ln(),
                n = (e) => {
                  let t = e,
                    n = -2;
                  for (; -2 === n; )
                    (t = t && t.nextSibling), (n = t && this.mirror.getId(t));
                  return n;
                },
                r = (r) => {
                  if (!r.parentNode || !_n(r)) return;
                  const s = Ot(r.parentNode)
                      ? this.mirror.getId(En(r))
                      : this.mirror.getId(r.parentNode),
                    i = n(r);
                  if (-1 === s || -1 === i) return t.addNode(r);
                  const o = an(r, {
                    doc: this.doc,
                    mirror: this.mirror,
                    blockClass: this.blockClass,
                    blockSelector: this.blockSelector,
                    maskTextClass: this.maskTextClass,
                    maskTextSelector: this.maskTextSelector,
                    skipChild: !0,
                    newlyAddedElement: !0,
                    inlineStylesheet: this.inlineStylesheet,
                    maskInputOptions: this.maskInputOptions,
                    maskTextFn: this.maskTextFn,
                    maskInputFn: this.maskInputFn,
                    slimDOMOptions: this.slimDOMOptions,
                    dataURLOptions: this.dataURLOptions,
                    recordCanvas: this.recordCanvas,
                    inlineImages: this.inlineImages,
                    onSerialize: (e) => {
                      Cn(e, this.mirror) && this.iframeManager.addIframe(e),
                        Sn(e, this.mirror) &&
                          this.stylesheetManager.trackLinkElement(e),
                        wn(r) &&
                          this.shadowDomManager.addShadowRoot(
                            r.shadowRoot,
                            this.doc
                          );
                    },
                    onIframeLoad: (e, t) => {
                      this.iframeManager.attachIframe(e, t),
                        this.shadowDomManager.observeAttachShadow(e);
                    },
                    onStylesheetLoad: (e, t) => {
                      this.stylesheetManager.attachLinkElement(e, t);
                    },
                  });
                  o && e.push({ parentId: s, nextId: i, node: o });
                };
              for (; this.mapRemoves.length; )
                this.mirror.removeNodeFromMap(this.mapRemoves.shift());
              for (const e of this.movedSet)
                (Un(this.removes, e, this.mirror) &&
                  !this.movedSet.has(e.parentNode)) ||
                  r(e);
              for (const e of this.addedSet)
                Vn(this.droppedSet, e) || Un(this.removes, e, this.mirror)
                  ? Vn(this.movedSet, e)
                    ? r(e)
                    : this.droppedSet.add(e)
                  : r(e);
              let s = null;
              for (; t.length; ) {
                let e = null;
                if (s) {
                  const t = this.mirror.getId(s.value.parentNode),
                    r = n(s.value);
                  -1 !== t && -1 !== r && (e = s);
                }
                if (!e) {
                  let r = t.tail;
                  for (; r; ) {
                    const t = this.mirror.getId(r.value.parentNode);
                    if (-1 !== n(r.value)) {
                      if (-1 !== t) {
                        e = r;
                        break;
                      }
                      {
                        const t = r.value;
                        if (
                          t.parentNode &&
                          t.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
                        ) {
                          const n = t.parentNode.host;
                          if (-1 !== this.mirror.getId(n)) {
                            e = r;
                            break;
                          }
                        }
                      }
                      r = r.previous;
                    } else r = r.previous;
                  }
                }
                if (!e) {
                  for (; t.head; ) t.removeNode(t.head.value);
                  break;
                }
                (s = e.previous), t.removeNode(e.value), r(e.value);
              }
              const i = {
                texts: this.texts
                  .map((e) => ({
                    id: this.mirror.getId(e.node),
                    value: e.value,
                  }))
                  .filter((e) => this.mirror.has(e.id)),
                attributes: this.attributes
                  .map((e) => ({
                    id: this.mirror.getId(e.node),
                    attributes: e.attributes,
                  }))
                  .filter((e) => this.mirror.has(e.id)),
                removes: this.removes,
                adds: e,
              };
              (i.texts.length ||
                i.attributes.length ||
                i.removes.length ||
                i.adds.length) &&
                ((this.texts = []),
                (this.attributes = []),
                (this.removes = []),
                (this.addedSet = new Set()),
                (this.movedSet = new Set()),
                (this.droppedSet = new Set()),
                (this.movedMap = {}),
                this.mutationCb(i));
            }),
            (this.processMutation = (e) => {
              if (!In(e.target, this.mirror))
                switch (e.type) {
                  case "characterData": {
                    const t = e.target.textContent;
                    vn(e.target, this.blockClass, this.blockSelector, !1) ||
                      t === e.oldValue ||
                      this.texts.push({
                        value:
                          rn(
                            e.target,
                            this.maskTextClass,
                            this.maskTextSelector
                          ) && t
                            ? this.maskTextFn
                              ? this.maskTextFn(t)
                              : t.replace(/[\S]/g, "*")
                            : t,
                        node: e.target,
                      });
                    break;
                  }
                  case "attributes": {
                    const t = e.target;
                    let n = e.attributeName,
                      r = e.target.getAttribute(n);
                    if ("value" === n) {
                      const e = Vt(t);
                      r = Ut({
                        element: t,
                        maskInputOptions: this.maskInputOptions,
                        tagName: t.tagName,
                        type: e,
                        value: r,
                        maskInputFn: this.maskInputFn,
                      });
                    }
                    if (
                      vn(e.target, this.blockClass, this.blockSelector, !1) ||
                      r === e.oldValue
                    )
                      return;
                    let s = this.attributes.find((t) => t.node === e.target);
                    if (
                      "IFRAME" === t.tagName &&
                      "src" === n &&
                      !this.keepIframeSrcFn(r)
                    ) {
                      if (t.contentDocument) return;
                      try {
                        e.attributeName = "rr_src";
                      } catch (e) {
                        return;
                      }
                    }
                    if (
                      (s ||
                        ((s = { node: e.target, attributes: {} }),
                        this.attributes.push(s)),
                      "type" === n &&
                        "INPUT" === t.tagName &&
                        "password" === (e.oldValue || "").toLowerCase() &&
                        t.setAttribute("data-rr-is-password", "true"),
                      "style" === n)
                    ) {
                      const n = this.doc.createElement("span");
                      e.oldValue && n.setAttribute("style", e.oldValue),
                        (void 0 !== s.attributes.style &&
                          null !== s.attributes.style) ||
                          (s.attributes.style = {});
                      const r = s.attributes.style;
                      for (const e of Array.from(t.style)) {
                        const s = t.style.getPropertyValue(e),
                          i = t.style.getPropertyPriority(e);
                        (s === n.style.getPropertyValue(e) &&
                          i === n.style.getPropertyPriority(e)) ||
                          (r[e] = "" === i ? s : [s, i]);
                      }
                      for (const e of Array.from(n.style))
                        "" === t.style.getPropertyValue(e) && (r[e] = !1);
                    } else
                      tn(t.tagName, n) ||
                        (s.attributes[n] = en(this.doc, t.tagName, n, r));
                    break;
                  }
                  case "childList":
                    if (vn(e.target, this.blockClass, this.blockSelector, !0))
                      return;
                    e.addedNodes.forEach((t) => this.genAdds(t, e.target)),
                      e.removedNodes.forEach((t) => {
                        const n = this.mirror.getId(t),
                          r = Ot(e.target)
                            ? this.mirror.getId(e.target.host)
                            : this.mirror.getId(e.target);
                        vn(e.target, this.blockClass, this.blockSelector, !1) ||
                          In(t, this.mirror) ||
                          !(function (e, t) {
                            return -1 !== t.getId(e);
                          })(t, this.mirror) ||
                          (this.addedSet.has(t)
                            ? (Fn(this.addedSet, t), this.droppedSet.add(t))
                            : (this.addedSet.has(e.target) && -1 === n) ||
                              (function e(t, n) {
                                if (Ot(t)) return !1;
                                const r = n.getId(t);
                                return (
                                  !n.has(r) ||
                                  ((!t.parentNode ||
                                    t.parentNode.nodeType !==
                                      t.DOCUMENT_NODE) &&
                                    (!t.parentNode || e(t.parentNode, n)))
                                );
                              })(e.target, this.mirror) ||
                              (this.movedSet.has(t) && this.movedMap[xn(n, r)]
                                ? Fn(this.movedSet, t)
                                : this.removes.push({
                                    parentId: r,
                                    id: n,
                                    isShadow:
                                      !(!Ot(e.target) || !Lt(e.target)) ||
                                      void 0,
                                  })),
                          this.mapRemoves.push(t));
                      });
                }
            }),
            (this.genAdds = (e, t) => {
              if (!this.processedNodeManager.inOtherBuffer(e, this)) {
                if (this.mirror.hasNode(e)) {
                  if (In(e, this.mirror)) return;
                  this.movedSet.add(e);
                  let n = null;
                  t && this.mirror.hasNode(t) && (n = this.mirror.getId(t)),
                    n &&
                      -1 !== n &&
                      (this.movedMap[xn(this.mirror.getId(e), n)] = !0);
                } else this.addedSet.add(e), this.droppedSet.delete(e);
                vn(e, this.blockClass, this.blockSelector, !1) ||
                  (e.childNodes.forEach((e) => this.genAdds(e)),
                  wn(e) &&
                    e.shadowRoot.childNodes.forEach((t) => {
                      this.processedNodeManager.add(t, this),
                        this.genAdds(t, e);
                    }));
              }
            });
        }
        init(e) {
          [
            "mutationCb",
            "blockClass",
            "blockSelector",
            "maskTextClass",
            "maskTextSelector",
            "inlineStylesheet",
            "maskInputOptions",
            "maskTextFn",
            "maskInputFn",
            "keepIframeSrcFn",
            "recordCanvas",
            "inlineImages",
            "slimDOMOptions",
            "dataURLOptions",
            "doc",
            "mirror",
            "iframeManager",
            "stylesheetManager",
            "shadowDomManager",
            "canvasManager",
            "processedNodeManager",
          ].forEach((t) => {
            this[t] = e[t];
          });
        }
        freeze() {
          (this.frozen = !0), this.canvasManager.freeze();
        }
        unfreeze() {
          (this.frozen = !1), this.canvasManager.unfreeze(), this.emit();
        }
        isFrozen() {
          return this.frozen;
        }
        lock() {
          (this.locked = !0), this.canvasManager.lock();
        }
        unlock() {
          (this.locked = !1), this.canvasManager.unlock(), this.emit();
        }
        reset() {
          this.shadowDomManager.reset(), this.canvasManager.reset();
        }
      }
      function Fn(e, t) {
        e.delete(t), t.childNodes.forEach((t) => Fn(e, t));
      }
      function Un(e, t, n) {
        return (
          0 !== e.length &&
          (function e(t, n, r) {
            const { parentNode: s } = n;
            if (!s) return !1;
            const i = r.getId(s);
            if (t.some((e) => e.id === i)) return !0;
            return e(t, s, r);
          })(e, t, n)
        );
      }
      function Vn(e, t) {
        return (
          0 !== e.size &&
          (function e(t, n) {
            const { parentNode: r } = n;
            if (!r) return !1;
            if (t.has(r)) return !0;
            return e(t, r);
          })(e, t)
        );
      }
      let qn;
      function Gn(e) {
        qn = e;
      }
      function Bn() {
        qn = void 0;
      }
      const Wn = (e) => {
          if (!qn) return e;
          return (...t) => {
            try {
              return e(...t);
            } catch (e) {
              if (qn && !0 === qn(e)) return;
              throw e;
            }
          };
        },
        Hn = [];
      function Zn(e) {
        try {
          if ("composedPath" in e) {
            const t = e.composedPath();
            if (t.length) return t[0];
          } else if ("path" in e && e.path.length) return e.path[0];
          return e.target;
        } catch (t) {
          return e.target;
        }
      }
      function jn(e, t) {
        var n, r;
        const s = new Pn();
        Hn.push(s), s.init(e);
        let i = window.MutationObserver || window.__rrMutationObserver;
        const o =
          null ===
            (r =
              null ===
                (n =
                  null === window || void 0 === window
                    ? void 0
                    : window.Zone) || void 0 === n
                ? void 0
                : n.__symbol__) || void 0 === r
            ? void 0
            : r.call(n, "MutationObserver");
        o && window[o] && (i = window[o]);
        const a = new i(Wn(s.processMutations.bind(s)));
        return (
          a.observe(t, {
            attributes: !0,
            attributeOldValue: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0,
          }),
          a
        );
      }
      function zn({
        mouseInteractionCb: e,
        doc: t,
        mirror: n,
        blockClass: r,
        blockSelector: s,
        sampling: i,
      }) {
        if (!1 === i.mouseInteraction) return () => {};
        const o =
            !0 === i.mouseInteraction || void 0 === i.mouseInteraction
              ? {}
              : i.mouseInteraction,
          a = [];
        let c = null;
        return (
          Object.keys(Mn)
            .filter(
              (e) =>
                Number.isNaN(Number(e)) &&
                !e.endsWith("_Departed") &&
                !1 !== o[e]
            )
            .forEach((i) => {
              let o = i.toLowerCase();
              const l = ((t) => (i) => {
                const o = Zn(i);
                if (vn(o, r, s, !0)) return;
                let a = null,
                  l = t;
                if ("pointerType" in i) {
                  switch (i.pointerType) {
                    case "mouse":
                      a = Nn.Mouse;
                      break;
                    case "touch":
                      a = Nn.Touch;
                      break;
                    case "pen":
                      a = Nn.Pen;
                  }
                  a === Nn.Touch
                    ? Mn[t] === Mn.MouseDown
                      ? (l = "TouchStart")
                      : Mn[t] === Mn.MouseUp && (l = "TouchEnd")
                    : Nn.Pen;
                } else bn(i) && (a = Nn.Touch);
                null !== a
                  ? ((c = a),
                    ((l.startsWith("Touch") && a === Nn.Touch) ||
                      (l.startsWith("Mouse") && a === Nn.Mouse)) &&
                      (a = null))
                  : Mn[t] === Mn.Click && ((a = c), (c = null));
                const u = bn(i) ? i.changedTouches[0] : i;
                if (!u) return;
                const d = n.getId(o),
                  { clientX: h, clientY: p } = u;
                Wn(e)(
                  Object.assign(
                    { type: Mn[l], id: d, x: h, y: p },
                    null !== a && { pointerType: a }
                  )
                );
              })(i);
              if (window.PointerEvent)
                switch (Mn[i]) {
                  case Mn.MouseDown:
                  case Mn.MouseUp:
                    o = o.replace("mouse", "pointer");
                    break;
                  case Mn.TouchStart:
                  case Mn.TouchEnd:
                    return;
                }
              a.push(ln(o, l, t));
            }),
          Wn(() => {
            a.forEach((e) => e());
          })
        );
      }
      function Kn({
        scrollCb: e,
        doc: t,
        mirror: n,
        blockClass: r,
        blockSelector: s,
        sampling: i,
      }) {
        return ln(
          "scroll",
          Wn(
            hn(
              Wn((i) => {
                const o = Zn(i);
                if (!o || vn(o, r, s, !0)) return;
                const a = n.getId(o);
                if (o === t && t.defaultView) {
                  const n = mn(t.defaultView);
                  e({ id: a, x: n.left, y: n.top });
                } else e({ id: a, x: o.scrollLeft, y: o.scrollTop });
              }),
              i.scroll || 100
            )
          ),
          t
        );
      }
      function Qn(e, t) {
        const n = Object.assign({}, e);
        return t || delete n.userTriggered, n;
      }
      const Yn = ["INPUT", "TEXTAREA", "SELECT"],
        Jn = new WeakMap();
      function $n(e) {
        return (function (e, t) {
          if (
            (nr("CSSGroupingRule") &&
              e.parentRule instanceof CSSGroupingRule) ||
            (nr("CSSMediaRule") && e.parentRule instanceof CSSMediaRule) ||
            (nr("CSSSupportsRule") &&
              e.parentRule instanceof CSSSupportsRule) ||
            (nr("CSSConditionRule") && e.parentRule instanceof CSSConditionRule)
          ) {
            const n = Array.from(e.parentRule.cssRules).indexOf(e);
            t.unshift(n);
          } else if (e.parentStyleSheet) {
            const n = Array.from(e.parentStyleSheet.cssRules).indexOf(e);
            t.unshift(n);
          }
          return t;
        })(e, []);
      }
      function Xn(e, t, n) {
        let r, s;
        return e
          ? (e.ownerNode ? (r = t.getId(e.ownerNode)) : (s = n.getId(e)),
            { styleId: s, id: r })
          : {};
      }
      function er({ mirror: e, stylesheetManager: t }, n) {
        var r, s, i;
        let o = null;
        o = "#document" === n.nodeName ? e.getId(n) : e.getId(n.host);
        const a =
            "#document" === n.nodeName
              ? null === (r = n.defaultView) || void 0 === r
                ? void 0
                : r.Document
              : null ===
                  (i =
                    null === (s = n.ownerDocument) || void 0 === s
                      ? void 0
                      : s.defaultView) || void 0 === i
              ? void 0
              : i.ShadowRoot,
          c = Object.getOwnPropertyDescriptor(
            null == a ? void 0 : a.prototype,
            "adoptedStyleSheets"
          );
        return null !== o && -1 !== o && a && c
          ? (Object.defineProperty(n, "adoptedStyleSheets", {
              configurable: c.configurable,
              enumerable: c.enumerable,
              get() {
                var e;
                return null === (e = c.get) || void 0 === e
                  ? void 0
                  : e.call(this);
              },
              set(e) {
                var n;
                const r =
                  null === (n = c.set) || void 0 === n
                    ? void 0
                    : n.call(this, e);
                if (null !== o && -1 !== o)
                  try {
                    t.adoptStyleSheets(e, o);
                  } catch (e) {}
                return r;
              },
            }),
            Wn(() => {
              Object.defineProperty(n, "adoptedStyleSheets", {
                configurable: c.configurable,
                enumerable: c.enumerable,
                get: c.get,
                set: c.set,
              });
            }))
          : () => {};
      }
      function tr(e, t = {}) {
        const n = e.doc.defaultView;
        if (!n) return () => {};
        !(function (e, t) {
          const {
            mutationCb: n,
            mousemoveCb: r,
            mouseInteractionCb: s,
            scrollCb: i,
            viewportResizeCb: o,
            inputCb: a,
            mediaInteractionCb: c,
            styleSheetRuleCb: l,
            styleDeclarationCb: u,
            canvasMutationCb: d,
            fontCb: h,
            selectionCb: p,
          } = e;
          (e.mutationCb = (...e) => {
            t.mutation && t.mutation(...e), n(...e);
          }),
            (e.mousemoveCb = (...e) => {
              t.mousemove && t.mousemove(...e), r(...e);
            }),
            (e.mouseInteractionCb = (...e) => {
              t.mouseInteraction && t.mouseInteraction(...e), s(...e);
            }),
            (e.scrollCb = (...e) => {
              t.scroll && t.scroll(...e), i(...e);
            }),
            (e.viewportResizeCb = (...e) => {
              t.viewportResize && t.viewportResize(...e), o(...e);
            }),
            (e.inputCb = (...e) => {
              t.input && t.input(...e), a(...e);
            }),
            (e.mediaInteractionCb = (...e) => {
              t.mediaInteaction && t.mediaInteaction(...e), c(...e);
            }),
            (e.styleSheetRuleCb = (...e) => {
              t.styleSheetRule && t.styleSheetRule(...e), l(...e);
            }),
            (e.styleDeclarationCb = (...e) => {
              t.styleDeclaration && t.styleDeclaration(...e), u(...e);
            }),
            (e.canvasMutationCb = (...e) => {
              t.canvasMutation && t.canvasMutation(...e), d(...e);
            }),
            (e.fontCb = (...e) => {
              t.font && t.font(...e), h(...e);
            }),
            (e.selectionCb = (...e) => {
              t.selection && t.selection(...e), p(...e);
            });
        })(e, t);
        const r = jn(e, e.doc),
          s = (function ({ mousemoveCb: e, sampling: t, doc: n, mirror: r }) {
            if (!1 === t.mousemove) return () => {};
            const s = "number" == typeof t.mousemove ? t.mousemove : 50,
              i =
                "number" == typeof t.mousemoveCallback
                  ? t.mousemoveCallback
                  : 500;
            let o,
              a = [];
            const c = hn(
                Wn((t) => {
                  const n = Date.now() - o;
                  e(
                    a.map((e) => ((e.timeOffset -= n), e)),
                    t
                  ),
                    (a = []),
                    (o = null);
                }),
                i
              ),
              l = Wn(
                hn(
                  Wn((e) => {
                    const t = Zn(e),
                      { clientX: n, clientY: s } = bn(e)
                        ? e.changedTouches[0]
                        : e;
                    o || (o = Date.now()),
                      a.push({
                        x: n,
                        y: s,
                        id: r.getId(t),
                        timeOffset: Date.now() - o,
                      }),
                      c(
                        "undefined" != typeof DragEvent &&
                          e instanceof DragEvent
                          ? Tn.Drag
                          : e instanceof MouseEvent
                          ? Tn.MouseMove
                          : Tn.TouchMove
                      );
                  }),
                  s,
                  { trailing: !1 }
                )
              ),
              u = [
                ln("mousemove", l, n),
                ln("touchmove", l, n),
                ln("drag", l, n),
              ];
            return Wn(() => {
              u.forEach((e) => e());
            });
          })(e),
          i = zn(e),
          o = Kn(e),
          a = (function ({ viewportResizeCb: e }) {
            let t = -1,
              n = -1;
            return ln(
              "resize",
              Wn(
                hn(
                  Wn(() => {
                    const r = fn(),
                      s = yn();
                    (t === r && n === s) ||
                      (e({ width: Number(s), height: Number(r) }),
                      (t = r),
                      (n = s));
                  }),
                  200
                )
              ),
              window
            );
          })(e),
          c = (function ({
            inputCb: e,
            doc: t,
            mirror: n,
            blockClass: r,
            blockSelector: s,
            ignoreClass: i,
            maskInputOptions: o,
            maskInputFn: a,
            sampling: c,
            userTriggeredOnInput: l,
          }) {
            function u(e) {
              let n = Zn(e);
              const c = e.isTrusted,
                u = n && n.tagName;
              if (
                (n && "OPTION" === u && (n = n.parentElement),
                !n || !u || Yn.indexOf(u) < 0 || vn(n, r, s, !0))
              )
                return;
              if (n.classList.contains(i)) return;
              let h = n.value,
                p = !1;
              const g = Vt(n) || "";
              "radio" === g || "checkbox" === g
                ? (p = n.checked)
                : (o[u.toLowerCase()] || o[g]) &&
                  (h = Ut({
                    element: n,
                    maskInputOptions: o,
                    tagName: u,
                    type: g,
                    value: h,
                    maskInputFn: a,
                  })),
                d(n, Wn(Qn)({ text: h, isChecked: p, userTriggered: c }, l));
              const m = n.name;
              "radio" === g &&
                m &&
                p &&
                t
                  .querySelectorAll(`input[type="radio"][name="${m}"]`)
                  .forEach((e) => {
                    e !== n &&
                      d(
                        e,
                        Wn(Qn)(
                          { text: e.value, isChecked: !p, userTriggered: !1 },
                          l
                        )
                      );
                  });
            }
            function d(t, r) {
              const s = Jn.get(t);
              if (!s || s.text !== r.text || s.isChecked !== r.isChecked) {
                Jn.set(t, r);
                const s = n.getId(t);
                Wn(e)(Object.assign(Object.assign({}, r), { id: s }));
              }
            }
            const h = (
                "last" === c.input ? ["change"] : ["input", "change"]
              ).map((e) => ln(e, Wn(u), t)),
              p = t.defaultView;
            if (!p)
              return () => {
                h.forEach((e) => e());
              };
            const g = p.Object.getOwnPropertyDescriptor(
                p.HTMLInputElement.prototype,
                "value"
              ),
              m = [
                [p.HTMLInputElement.prototype, "value"],
                [p.HTMLInputElement.prototype, "checked"],
                [p.HTMLSelectElement.prototype, "value"],
                [p.HTMLTextAreaElement.prototype, "value"],
                [p.HTMLSelectElement.prototype, "selectedIndex"],
                [p.HTMLOptionElement.prototype, "selected"],
              ];
            return (
              g &&
                g.set &&
                h.push(
                  ...m.map((e) =>
                    pn(
                      e[0],
                      e[1],
                      {
                        set() {
                          Wn(u)({ target: this, isTrusted: !1 });
                        },
                      },
                      !1,
                      p
                    )
                  )
                ),
              Wn(() => {
                h.forEach((e) => e());
              })
            );
          })(e),
          l = (function ({
            mediaInteractionCb: e,
            blockClass: t,
            blockSelector: n,
            mirror: r,
            sampling: s,
          }) {
            const i = Wn((i) =>
                hn(
                  Wn((s) => {
                    const o = Zn(s);
                    if (!o || vn(o, t, n, !0)) return;
                    const {
                      currentTime: a,
                      volume: c,
                      muted: l,
                      playbackRate: u,
                    } = o;
                    e({
                      type: i,
                      id: r.getId(o),
                      currentTime: a,
                      volume: c,
                      muted: l,
                      playbackRate: u,
                    });
                  }),
                  s.media || 500
                )
              ),
              o = [
                ln("play", i(0)),
                ln("pause", i(1)),
                ln("seeked", i(2)),
                ln("volumechange", i(3)),
                ln("ratechange", i(4)),
              ];
            return Wn(() => {
              o.forEach((e) => e());
            });
          })(e),
          u = (function (
            { styleSheetRuleCb: e, mirror: t, stylesheetManager: n },
            { win: r }
          ) {
            if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype) return () => {};
            const s = r.CSSStyleSheet.prototype.insertRule;
            r.CSSStyleSheet.prototype.insertRule = new Proxy(s, {
              apply: Wn((r, s, i) => {
                const [o, a] = i,
                  { id: c, styleId: l } = Xn(s, t, n.styleMirror);
                return (
                  ((c && -1 !== c) || (l && -1 !== l)) &&
                    e({ id: c, styleId: l, adds: [{ rule: o, index: a }] }),
                  r.apply(s, i)
                );
              }),
            });
            const i = r.CSSStyleSheet.prototype.deleteRule;
            let o, a;
            (r.CSSStyleSheet.prototype.deleteRule = new Proxy(i, {
              apply: Wn((r, s, i) => {
                const [o] = i,
                  { id: a, styleId: c } = Xn(s, t, n.styleMirror);
                return (
                  ((a && -1 !== a) || (c && -1 !== c)) &&
                    e({ id: a, styleId: c, removes: [{ index: o }] }),
                  r.apply(s, i)
                );
              }),
            })),
              r.CSSStyleSheet.prototype.replace &&
                ((o = r.CSSStyleSheet.prototype.replace),
                (r.CSSStyleSheet.prototype.replace = new Proxy(o, {
                  apply: Wn((r, s, i) => {
                    const [o] = i,
                      { id: a, styleId: c } = Xn(s, t, n.styleMirror);
                    return (
                      ((a && -1 !== a) || (c && -1 !== c)) &&
                        e({ id: a, styleId: c, replace: o }),
                      r.apply(s, i)
                    );
                  }),
                }))),
              r.CSSStyleSheet.prototype.replaceSync &&
                ((a = r.CSSStyleSheet.prototype.replaceSync),
                (r.CSSStyleSheet.prototype.replaceSync = new Proxy(a, {
                  apply: Wn((r, s, i) => {
                    const [o] = i,
                      { id: a, styleId: c } = Xn(s, t, n.styleMirror);
                    return (
                      ((a && -1 !== a) || (c && -1 !== c)) &&
                        e({ id: a, styleId: c, replaceSync: o }),
                      r.apply(s, i)
                    );
                  }),
                })));
            const c = {};
            rr("CSSGroupingRule")
              ? (c.CSSGroupingRule = r.CSSGroupingRule)
              : (rr("CSSMediaRule") && (c.CSSMediaRule = r.CSSMediaRule),
                rr("CSSConditionRule") &&
                  (c.CSSConditionRule = r.CSSConditionRule),
                rr("CSSSupportsRule") &&
                  (c.CSSSupportsRule = r.CSSSupportsRule));
            const l = {};
            return (
              Object.entries(c).forEach(([r, s]) => {
                (l[r] = {
                  insertRule: s.prototype.insertRule,
                  deleteRule: s.prototype.deleteRule,
                }),
                  (s.prototype.insertRule = new Proxy(l[r].insertRule, {
                    apply: Wn((r, s, i) => {
                      const [o, a] = i,
                        { id: c, styleId: l } = Xn(
                          s.parentStyleSheet,
                          t,
                          n.styleMirror
                        );
                      return (
                        ((c && -1 !== c) || (l && -1 !== l)) &&
                          e({
                            id: c,
                            styleId: l,
                            adds: [{ rule: o, index: [...$n(s), a || 0] }],
                          }),
                        r.apply(s, i)
                      );
                    }),
                  })),
                  (s.prototype.deleteRule = new Proxy(l[r].deleteRule, {
                    apply: Wn((r, s, i) => {
                      const [o] = i,
                        { id: a, styleId: c } = Xn(
                          s.parentStyleSheet,
                          t,
                          n.styleMirror
                        );
                      return (
                        ((a && -1 !== a) || (c && -1 !== c)) &&
                          e({
                            id: a,
                            styleId: c,
                            removes: [{ index: [...$n(s), o] }],
                          }),
                        r.apply(s, i)
                      );
                    }),
                  }));
              }),
              Wn(() => {
                (r.CSSStyleSheet.prototype.insertRule = s),
                  (r.CSSStyleSheet.prototype.deleteRule = i),
                  o && (r.CSSStyleSheet.prototype.replace = o),
                  a && (r.CSSStyleSheet.prototype.replaceSync = a),
                  Object.entries(c).forEach(([e, t]) => {
                    (t.prototype.insertRule = l[e].insertRule),
                      (t.prototype.deleteRule = l[e].deleteRule);
                  });
              })
            );
          })(e, { win: n }),
          d = er(e, e.doc),
          h = (function (
            {
              styleDeclarationCb: e,
              mirror: t,
              ignoreCSSAttributes: n,
              stylesheetManager: r,
            },
            { win: s }
          ) {
            const i = s.CSSStyleDeclaration.prototype.setProperty;
            s.CSSStyleDeclaration.prototype.setProperty = new Proxy(i, {
              apply: Wn((s, o, a) => {
                var c;
                const [l, u, d] = a;
                if (n.has(l)) return i.apply(o, [l, u, d]);
                const { id: h, styleId: p } = Xn(
                  null === (c = o.parentRule) || void 0 === c
                    ? void 0
                    : c.parentStyleSheet,
                  t,
                  r.styleMirror
                );
                return (
                  ((h && -1 !== h) || (p && -1 !== p)) &&
                    e({
                      id: h,
                      styleId: p,
                      set: { property: l, value: u, priority: d },
                      index: $n(o.parentRule),
                    }),
                  s.apply(o, a)
                );
              }),
            });
            const o = s.CSSStyleDeclaration.prototype.removeProperty;
            return (
              (s.CSSStyleDeclaration.prototype.removeProperty = new Proxy(o, {
                apply: Wn((s, i, a) => {
                  var c;
                  const [l] = a;
                  if (n.has(l)) return o.apply(i, [l]);
                  const { id: u, styleId: d } = Xn(
                    null === (c = i.parentRule) || void 0 === c
                      ? void 0
                      : c.parentStyleSheet,
                    t,
                    r.styleMirror
                  );
                  return (
                    ((u && -1 !== u) || (d && -1 !== d)) &&
                      e({
                        id: u,
                        styleId: d,
                        remove: { property: l },
                        index: $n(i.parentRule),
                      }),
                    s.apply(i, a)
                  );
                }),
              })),
              Wn(() => {
                (s.CSSStyleDeclaration.prototype.setProperty = i),
                  (s.CSSStyleDeclaration.prototype.removeProperty = o);
              })
            );
          })(e, { win: n }),
          p = e.collectFonts
            ? (function ({ fontCb: e, doc: t }) {
                const n = t.defaultView;
                if (!n) return () => {};
                const r = [],
                  s = new WeakMap(),
                  i = n.FontFace;
                n.FontFace = function (e, t, n) {
                  const r = new i(e, t, n);
                  return (
                    s.set(r, {
                      family: e,
                      buffer: "string" != typeof t,
                      descriptors: n,
                      fontSource:
                        "string" == typeof t
                          ? t
                          : JSON.stringify(Array.from(new Uint8Array(t))),
                    }),
                    r
                  );
                };
                const o = gn(t.fonts, "add", function (t) {
                  return function (n) {
                    return (
                      setTimeout(
                        Wn(() => {
                          const t = s.get(n);
                          t && (e(t), s.delete(n));
                        }),
                        0
                      ),
                      t.apply(this, [n])
                    );
                  };
                });
                return (
                  r.push(() => {
                    n.FontFace = i;
                  }),
                  r.push(o),
                  Wn(() => {
                    r.forEach((e) => e());
                  })
                );
              })(e)
            : () => {},
          g = (function (e) {
            const {
              doc: t,
              mirror: n,
              blockClass: r,
              blockSelector: s,
              selectionCb: i,
            } = e;
            let o = !0;
            const a = Wn(() => {
              const e = t.getSelection();
              if (!e || (o && (null == e ? void 0 : e.isCollapsed))) return;
              o = e.isCollapsed || !1;
              const a = [],
                c = e.rangeCount || 0;
              for (let t = 0; t < c; t++) {
                const i = e.getRangeAt(t),
                  {
                    startContainer: o,
                    startOffset: c,
                    endContainer: l,
                    endOffset: u,
                  } = i;
                vn(o, r, s, !0) ||
                  vn(l, r, s, !0) ||
                  a.push({
                    start: n.getId(o),
                    startOffset: c,
                    end: n.getId(l),
                    endOffset: u,
                  });
              }
              i({ ranges: a });
            });
            return a(), ln("selectionchange", a);
          })(e),
          m = [];
        for (const t of e.plugins) m.push(t.observer(t.callback, n, t.options));
        return Wn(() => {
          Hn.forEach((e) => e.reset()),
            r.disconnect(),
            s(),
            i(),
            o(),
            a(),
            c(),
            l(),
            u(),
            d(),
            h(),
            p(),
            g(),
            m.forEach((e) => e());
        });
      }
      function nr(e) {
        return void 0 !== window[e];
      }
      function rr(e) {
        return Boolean(
          void 0 !== window[e] &&
            window[e].prototype &&
            "insertRule" in window[e].prototype &&
            "deleteRule" in window[e].prototype
        );
      }
      class sr {
        constructor(e) {
          (this.generateIdFn = e),
            (this.iframeIdToRemoteIdMap = new WeakMap()),
            (this.iframeRemoteIdToIdMap = new WeakMap());
        }
        getId(e, t, n, r) {
          const s = n || this.getIdToRemoteIdMap(e),
            i = r || this.getRemoteIdToIdMap(e);
          let o = s.get(t);
          return o || ((o = this.generateIdFn()), s.set(t, o), i.set(o, t)), o;
        }
        getIds(e, t) {
          const n = this.getIdToRemoteIdMap(e),
            r = this.getRemoteIdToIdMap(e);
          return t.map((t) => this.getId(e, t, n, r));
        }
        getRemoteId(e, t, n) {
          const r = n || this.getRemoteIdToIdMap(e);
          if ("number" != typeof t) return t;
          const s = r.get(t);
          return s || -1;
        }
        getRemoteIds(e, t) {
          const n = this.getRemoteIdToIdMap(e);
          return t.map((t) => this.getRemoteId(e, t, n));
        }
        reset(e) {
          if (!e)
            return (
              (this.iframeIdToRemoteIdMap = new WeakMap()),
              void (this.iframeRemoteIdToIdMap = new WeakMap())
            );
          this.iframeIdToRemoteIdMap.delete(e),
            this.iframeRemoteIdToIdMap.delete(e);
        }
        getIdToRemoteIdMap(e) {
          let t = this.iframeIdToRemoteIdMap.get(e);
          return (
            t || ((t = new Map()), this.iframeIdToRemoteIdMap.set(e, t)), t
          );
        }
        getRemoteIdToIdMap(e) {
          let t = this.iframeRemoteIdToIdMap.get(e);
          return (
            t || ((t = new Map()), this.iframeRemoteIdToIdMap.set(e, t)), t
          );
        }
      }
      class ir {
        constructor(e) {
          (this.iframes = new WeakMap()),
            (this.crossOriginIframeMap = new WeakMap()),
            (this.crossOriginIframeMirror = new sr(Ht)),
            (this.crossOriginIframeRootIdMap = new WeakMap()),
            (this.mutationCb = e.mutationCb),
            (this.wrappedEmit = e.wrappedEmit),
            (this.stylesheetManager = e.stylesheetManager),
            (this.recordCrossOriginIframes = e.recordCrossOriginIframes),
            (this.crossOriginIframeStyleMirror = new sr(
              this.stylesheetManager.styleMirror.generateId.bind(
                this.stylesheetManager.styleMirror
              )
            )),
            (this.mirror = e.mirror),
            this.recordCrossOriginIframes &&
              window.addEventListener("message", this.handleMessage.bind(this));
        }
        addIframe(e) {
          this.iframes.set(e, !0),
            e.contentWindow &&
              this.crossOriginIframeMap.set(e.contentWindow, e);
        }
        addLoadListener(e) {
          this.loadListener = e;
        }
        attachIframe(e, t) {
          var n;
          this.mutationCb({
            adds: [{ parentId: this.mirror.getId(e), nextId: null, node: t }],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0,
          }),
            null === (n = this.loadListener) || void 0 === n || n.call(this, e),
            e.contentDocument &&
              e.contentDocument.adoptedStyleSheets &&
              e.contentDocument.adoptedStyleSheets.length > 0 &&
              this.stylesheetManager.adoptStyleSheets(
                e.contentDocument.adoptedStyleSheets,
                this.mirror.getId(e.contentDocument)
              );
        }
        handleMessage(e) {
          const t = e;
          if ("rrweb" !== t.data.type || t.origin !== t.data.origin) return;
          if (!e.source) return;
          const n = this.crossOriginIframeMap.get(e.source);
          if (!n) return;
          const r = this.transformCrossOriginEvent(n, t.data.event);
          r && this.wrappedEmit(r, t.data.isCheckout);
        }
        transformCrossOriginEvent(e, t) {
          var n;
          switch (t.type) {
            case Rn.FullSnapshot: {
              this.crossOriginIframeMirror.reset(e),
                this.crossOriginIframeStyleMirror.reset(e),
                this.replaceIdOnNode(t.data.node, e);
              const n = t.data.node.id;
              return (
                this.crossOriginIframeRootIdMap.set(e, n),
                this.patchRootIdOnNode(t.data.node, n),
                {
                  timestamp: t.timestamp,
                  type: Rn.IncrementalSnapshot,
                  data: {
                    source: Tn.Mutation,
                    adds: [
                      {
                        parentId: this.mirror.getId(e),
                        nextId: null,
                        node: t.data.node,
                      },
                    ],
                    removes: [],
                    texts: [],
                    attributes: [],
                    isAttachIframe: !0,
                  },
                }
              );
            }
            case Rn.Meta:
            case Rn.Load:
            case Rn.DomContentLoaded:
              return !1;
            case Rn.Plugin:
              return t;
            case Rn.Custom:
              return (
                this.replaceIds(t.data.payload, e, [
                  "id",
                  "parentId",
                  "previousId",
                  "nextId",
                ]),
                t
              );
            case Rn.IncrementalSnapshot:
              switch (t.data.source) {
                case Tn.Mutation:
                  return (
                    t.data.adds.forEach((t) => {
                      this.replaceIds(t, e, [
                        "parentId",
                        "nextId",
                        "previousId",
                      ]),
                        this.replaceIdOnNode(t.node, e);
                      const n = this.crossOriginIframeRootIdMap.get(e);
                      n && this.patchRootIdOnNode(t.node, n);
                    }),
                    t.data.removes.forEach((t) => {
                      this.replaceIds(t, e, ["parentId", "id"]);
                    }),
                    t.data.attributes.forEach((t) => {
                      this.replaceIds(t, e, ["id"]);
                    }),
                    t.data.texts.forEach((t) => {
                      this.replaceIds(t, e, ["id"]);
                    }),
                    t
                  );
                case Tn.Drag:
                case Tn.TouchMove:
                case Tn.MouseMove:
                  return (
                    t.data.positions.forEach((t) => {
                      this.replaceIds(t, e, ["id"]);
                    }),
                    t
                  );
                case Tn.ViewportResize:
                  return !1;
                case Tn.MediaInteraction:
                case Tn.MouseInteraction:
                case Tn.Scroll:
                case Tn.CanvasMutation:
                case Tn.Input:
                  return this.replaceIds(t.data, e, ["id"]), t;
                case Tn.StyleSheetRule:
                case Tn.StyleDeclaration:
                  return (
                    this.replaceIds(t.data, e, ["id"]),
                    this.replaceStyleIds(t.data, e, ["styleId"]),
                    t
                  );
                case Tn.Font:
                  return t;
                case Tn.Selection:
                  return (
                    t.data.ranges.forEach((t) => {
                      this.replaceIds(t, e, ["start", "end"]);
                    }),
                    t
                  );
                case Tn.AdoptedStyleSheet:
                  return (
                    this.replaceIds(t.data, e, ["id"]),
                    this.replaceStyleIds(t.data, e, ["styleIds"]),
                    null === (n = t.data.styles) ||
                      void 0 === n ||
                      n.forEach((t) => {
                        this.replaceStyleIds(t, e, ["styleId"]);
                      }),
                    t
                  );
              }
          }
        }
        replace(e, t, n, r) {
          for (const s of r)
            (Array.isArray(t[s]) || "number" == typeof t[s]) &&
              (Array.isArray(t[s])
                ? (t[s] = e.getIds(n, t[s]))
                : (t[s] = e.getId(n, t[s])));
          return t;
        }
        replaceIds(e, t, n) {
          return this.replace(this.crossOriginIframeMirror, e, t, n);
        }
        replaceStyleIds(e, t, n) {
          return this.replace(this.crossOriginIframeStyleMirror, e, t, n);
        }
        replaceIdOnNode(e, t) {
          this.replaceIds(e, t, ["id", "rootId"]),
            "childNodes" in e &&
              e.childNodes.forEach((e) => {
                this.replaceIdOnNode(e, t);
              });
        }
        patchRootIdOnNode(e, t) {
          e.type === Ue.Document || e.rootId || (e.rootId = t),
            "childNodes" in e &&
              e.childNodes.forEach((e) => {
                this.patchRootIdOnNode(e, t);
              });
        }
      }
      class or {
        constructor(e) {
          (this.shadowDoms = new WeakSet()),
            (this.restoreHandlers = []),
            (this.mutationCb = e.mutationCb),
            (this.scrollCb = e.scrollCb),
            (this.bypassOptions = e.bypassOptions),
            (this.mirror = e.mirror),
            this.init();
        }
        init() {
          this.reset(),
            (this.active = !0),
            this.patchAttachShadow(Element, document);
        }
        addShadowRoot(e, t) {
          if (!this.active) return;
          if (!Lt(e)) return;
          if (this.shadowDoms.has(e)) return;
          this.shadowDoms.add(e);
          const n = jn(
            Object.assign(Object.assign({}, this.bypassOptions), {
              doc: t,
              mutationCb: this.mutationCb,
              mirror: this.mirror,
              shadowDomManager: this,
            }),
            e
          );
          this.restoreHandlers.push(() => n.disconnect()),
            this.restoreHandlers.push(
              Kn(
                Object.assign(Object.assign({}, this.bypassOptions), {
                  scrollCb: this.scrollCb,
                  doc: e,
                  mirror: this.mirror,
                })
              )
            ),
            setTimeout(() => {
              e.adoptedStyleSheets &&
                e.adoptedStyleSheets.length > 0 &&
                this.bypassOptions.stylesheetManager.adoptStyleSheets(
                  e.adoptedStyleSheets,
                  this.mirror.getId(e.host)
                ),
                this.restoreHandlers.push(
                  er(
                    {
                      mirror: this.mirror,
                      stylesheetManager: this.bypassOptions.stylesheetManager,
                    },
                    e
                  )
                );
            }, 0);
        }
        observeAttachShadow(e) {
          e.contentWindow &&
            e.contentDocument &&
            this.patchAttachShadow(e.contentWindow.Element, e.contentDocument);
        }
        patchAttachShadow(e, t) {
          const n = this;
          gn(e.prototype, "attachShadow", function (e) {
            return function (r) {
              const s = e.call(this, r);
              return (
                this.shadowRoot &&
                  _n(this) &&
                  n.addShadowRoot(this.shadowRoot, t),
                s
              );
            };
          });
        }
        reset() {
          (this.active = !1),
            this.restoreHandlers.forEach((e) => {
              try {
                e();
              } catch (e) {}
            }),
            (this.restoreHandlers = []),
            (this.shadowDoms = new WeakSet());
        }
      }
      function ar(e, t, n, r) {
        return new (n || (n = Promise))(function (s, i) {
          function o(e) {
            try {
              c(r.next(e));
            } catch (e) {
              i(e);
            }
          }
          function a(e) {
            try {
              c(r.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? s(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t);
                    })).then(o, a);
          }
          c((r = r.apply(e, t || [])).next());
        });
      }
      for (
        var cr =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          lr = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
          ur = 0;
        ur < cr.length;
        ur++
      )
        lr[cr.charCodeAt(ur)] = ur;
      const dr = new Map();
      const hr = (e, t, n) => {
        if (!e || (!mr(e, t) && "object" != typeof e)) return;
        const r = (function (e, t) {
          let n = dr.get(e);
          return (
            n || ((n = new Map()), dr.set(e, n)),
            n.has(t) || n.set(t, []),
            n.get(t)
          );
        })(n, e.constructor.name);
        let s = r.indexOf(e);
        return -1 === s && ((s = r.length), r.push(e)), s;
      };
      function pr(e, t, n) {
        if (e instanceof Array) return e.map((e) => pr(e, t, n));
        if (null === e) return e;
        if (
          e instanceof Float32Array ||
          e instanceof Float64Array ||
          e instanceof Int32Array ||
          e instanceof Uint32Array ||
          e instanceof Uint8Array ||
          e instanceof Uint16Array ||
          e instanceof Int16Array ||
          e instanceof Int8Array ||
          e instanceof Uint8ClampedArray
        ) {
          return { rr_type: e.constructor.name, args: [Object.values(e)] };
        }
        if (e instanceof ArrayBuffer) {
          return {
            rr_type: e.constructor.name,
            base64: (function (e) {
              var t,
                n = new Uint8Array(e),
                r = n.length,
                s = "";
              for (t = 0; t < r; t += 3)
                (s += cr[n[t] >> 2]),
                  (s += cr[((3 & n[t]) << 4) | (n[t + 1] >> 4)]),
                  (s += cr[((15 & n[t + 1]) << 2) | (n[t + 2] >> 6)]),
                  (s += cr[63 & n[t + 2]]);
              return (
                r % 3 == 2
                  ? (s = s.substring(0, s.length - 1) + "=")
                  : r % 3 == 1 && (s = s.substring(0, s.length - 2) + "=="),
                s
              );
            })(e),
          };
        }
        if (e instanceof DataView) {
          return {
            rr_type: e.constructor.name,
            args: [pr(e.buffer, t, n), e.byteOffset, e.byteLength],
          };
        }
        if (e instanceof HTMLImageElement) {
          const t = e.constructor.name,
            { src: n } = e;
          return { rr_type: t, src: n };
        }
        if (e instanceof HTMLCanvasElement) {
          return { rr_type: "HTMLImageElement", src: e.toDataURL() };
        }
        if (e instanceof ImageData) {
          return {
            rr_type: e.constructor.name,
            args: [pr(e.data, t, n), e.width, e.height],
          };
        }
        if (mr(e, t) || "object" == typeof e) {
          return { rr_type: e.constructor.name, index: hr(e, t, n) };
        }
        return e;
      }
      const gr = (e, t, n) => [...e].map((e) => pr(e, t, n)),
        mr = (e, t) => {
          const n = [
            "WebGLActiveInfo",
            "WebGLBuffer",
            "WebGLFramebuffer",
            "WebGLProgram",
            "WebGLRenderbuffer",
            "WebGLShader",
            "WebGLShaderPrecisionFormat",
            "WebGLTexture",
            "WebGLUniformLocation",
            "WebGLVertexArrayObject",
            "WebGLVertexArrayObjectOES",
          ].filter((e) => "function" == typeof t[e]);
          return Boolean(n.find((n) => e instanceof t[n]));
        };
      function fr(e, t, n) {
        const r = [];
        try {
          const s = gn(
            e.HTMLCanvasElement.prototype,
            "getContext",
            function (e) {
              return function (r, ...s) {
                return (
                  vn(this, t, n, !0) ||
                    "__context" in this ||
                    (this.__context = r),
                  e.apply(this, [r, ...s])
                );
              };
            }
          );
          r.push(s);
        } catch (e) {
          console.error(
            "failed to patch HTMLCanvasElement.prototype.getContext"
          );
        }
        return () => {
          r.forEach((e) => e());
        };
      }
      function yr(e, t, n, r, s, i, o) {
        const a = [],
          c = Object.getOwnPropertyNames(e);
        for (const i of c)
          if (
            ![
              "isContextLost",
              "canvas",
              "drawingBufferWidth",
              "drawingBufferHeight",
            ].includes(i)
          )
            try {
              if ("function" != typeof e[i]) continue;
              const c = gn(e, i, function (e) {
                return function (...a) {
                  const c = e.apply(this, a);
                  if ((hr(c, o, this), !vn(this.canvas, r, s, !0))) {
                    const e = gr([...a], o, this),
                      r = { type: t, property: i, args: e };
                    n(this.canvas, r);
                  }
                  return c;
                };
              });
              a.push(c);
            } catch (r) {
              const s = pn(e, i, {
                set(e) {
                  n(this.canvas, {
                    type: t,
                    property: i,
                    args: [e],
                    setter: !0,
                  });
                },
              });
              a.push(s);
            }
        return a;
      }
      function vr(e, t, n) {
        var r = void 0 === t ? null : t,
          s = (function (e, t) {
            var n = atob(e);
            if (t) {
              for (
                var r = new Uint8Array(n.length), s = 0, i = n.length;
                s < i;
                ++s
              )
                r[s] = n.charCodeAt(s);
              return String.fromCharCode.apply(null, new Uint16Array(r.buffer));
            }
            return n;
          })(e, void 0 !== n && n),
          i = s.indexOf("\n", 10) + 1,
          o = s.substring(i) + (r ? "//# sourceMappingURL=" + r : ""),
          a = new Blob([o], { type: "application/javascript" });
        return URL.createObjectURL(a);
      }
      var Ir,
        br,
        Cr,
        Sr,
        wr =
          ((Ir =
            "Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLg0KDQogICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55DQogICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLg0KDQogICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgNCiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkNCiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsDQogICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NDQogICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1INCiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SDQogICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4NCiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqLw0KDQogICAgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikgew0KICAgICAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH0NCiAgICAgICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7DQogICAgICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfQ0KICAgICAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpOw0KICAgICAgICB9KTsNCiAgICB9CgogICAgLyoKICAgICAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj4KICAgICAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+CiAgICAgKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZQogICAgICovCiAgICB2YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7CiAgICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguCiAgICB2YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpOwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykgewogICAgICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7CiAgICB9CiAgICB2YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7CiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnOwogICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykgewogICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTsKICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107CiAgICAgICAgfQogICAgICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nOwogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JzsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGJhc2U2NDsKICAgIH07CgogICAgY29uc3QgbGFzdEJsb2JNYXAgPSBuZXcgTWFwKCk7DQogICAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gbmV3IE1hcCgpOw0KICAgIGZ1bmN0aW9uIGdldFRyYW5zcGFyZW50QmxvYkZvcih3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucykgew0KICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgICAgICAgICAgY29uc3QgaWQgPSBgJHt3aWR0aH0tJHtoZWlnaHR9YDsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgaWYgKHRyYW5zcGFyZW50QmxvYk1hcC5oYXMoaWQpKQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNwYXJlbnRCbG9iTWFwLmdldChpZCk7DQogICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsNCiAgICAgICAgICAgICAgICBvZmZzY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0geWllbGQgYmxvYi5hcnJheUJ1ZmZlcigpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7DQogICAgICAgICAgICAgICAgdHJhbnNwYXJlbnRCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZTY0Ow0KICAgICAgICAgICAgfQ0KICAgICAgICAgICAgZWxzZSB7DQogICAgICAgICAgICAgICAgcmV0dXJuICcnOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9KTsNCiAgICB9DQogICAgY29uc3Qgd29ya2VyID0gc2VsZjsNCiAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHsNCiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgY29uc3QgeyBpZCwgYml0bWFwLCB3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucyB9ID0gZS5kYXRhOw0KICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zKTsNCiAgICAgICAgICAgICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IG9mZnNjcmVlbi5nZXRDb250ZXh0KCcyZCcpOw0KICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYml0bWFwLCAwLCAwKTsNCiAgICAgICAgICAgICAgICBiaXRtYXAuY2xvc2UoKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBibG9iLnR5cGU7DQogICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSB5aWVsZCBibG9iLmFycmF5QnVmZmVyKCk7DQogICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gZW5jb2RlKGFycmF5QnVmZmVyKTsNCiAgICAgICAgICAgICAgICBpZiAoIWxhc3RCbG9iTWFwLmhhcyhpZCkgJiYgKHlpZWxkIHRyYW5zcGFyZW50QmFzZTY0KSA9PT0gYmFzZTY0KSB7DQogICAgICAgICAgICAgICAgICAgIGxhc3RCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkIH0pOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7DQogICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgaWQsDQogICAgICAgICAgICAgICAgICAgIHR5cGUsDQogICAgICAgICAgICAgICAgICAgIGJhc2U2NCwNCiAgICAgICAgICAgICAgICAgICAgd2lkdGgsDQogICAgICAgICAgICAgICAgICAgIGhlaWdodCwNCiAgICAgICAgICAgICAgICB9KTsNCiAgICAgICAgICAgICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfSk7DQogICAgfTsKCn0pKCk7Cgo="),
          (br = null),
          (Cr = !1),
          function (e) {
            return (Sr = Sr || vr(Ir, br, Cr)), new Worker(Sr, e);
          });
      class Ar {
        constructor(e) {
          (this.pendingCanvasMutations = new Map()),
            (this.rafStamps = { latestId: 0, invokeId: null }),
            (this.frozen = !1),
            (this.locked = !1),
            (this.processMutation = (e, t) => {
              (!(
                this.rafStamps.invokeId &&
                this.rafStamps.latestId !== this.rafStamps.invokeId
              ) &&
                this.rafStamps.invokeId) ||
                (this.rafStamps.invokeId = this.rafStamps.latestId),
                this.pendingCanvasMutations.has(e) ||
                  this.pendingCanvasMutations.set(e, []),
                this.pendingCanvasMutations.get(e).push(t);
            });
          const {
            sampling: t = "all",
            win: n,
            blockClass: r,
            blockSelector: s,
            recordCanvas: i,
            dataURLOptions: o,
          } = e;
          (this.mutationCb = e.mutationCb),
            (this.mirror = e.mirror),
            i && "all" === t && this.initCanvasMutationObserver(n, r, s),
            i &&
              "number" == typeof t &&
              this.initCanvasFPSObserver(t, n, r, s, { dataURLOptions: o });
        }
        reset() {
          this.pendingCanvasMutations.clear(),
            this.resetObservers && this.resetObservers();
        }
        freeze() {
          this.frozen = !0;
        }
        unfreeze() {
          this.frozen = !1;
        }
        lock() {
          this.locked = !0;
        }
        unlock() {
          this.locked = !1;
        }
        initCanvasFPSObserver(e, t, n, r, s) {
          const i = fr(t, n, r),
            o = new Map(),
            a = new wr();
          a.onmessage = (e) => {
            const { id: t } = e.data;
            if ((o.set(t, !1), !("base64" in e.data))) return;
            const { base64: n, type: r, width: s, height: i } = e.data;
            this.mutationCb({
              id: t,
              type: Dn["2D"],
              commands: [
                { property: "clearRect", args: [0, 0, s, i] },
                {
                  property: "drawImage",
                  args: [
                    {
                      rr_type: "ImageBitmap",
                      args: [
                        {
                          rr_type: "Blob",
                          data: [{ rr_type: "ArrayBuffer", base64: n }],
                          type: r,
                        },
                      ],
                    },
                    0,
                    0,
                  ],
                },
              ],
            });
          };
          const c = 1e3 / e;
          let l,
            u = 0;
          const d = (e) => {
            (u && e - u < c) ||
              ((u = e),
              (() => {
                const e = [];
                return (
                  t.document.querySelectorAll("canvas").forEach((t) => {
                    vn(t, n, r, !0) || e.push(t);
                  }),
                  e
                );
              })().forEach((e) =>
                ar(this, void 0, void 0, function* () {
                  var t;
                  const n = this.mirror.getId(e);
                  if (o.get(n)) return;
                  if (
                    (o.set(n, !0), ["webgl", "webgl2"].includes(e.__context))
                  ) {
                    const n = e.getContext(e.__context);
                    !1 ===
                      (null ===
                        (t = null == n ? void 0 : n.getContextAttributes()) ||
                      void 0 === t
                        ? void 0
                        : t.preserveDrawingBuffer) &&
                      (null == n || n.clear(n.COLOR_BUFFER_BIT));
                  }
                  const r = yield createImageBitmap(e);
                  a.postMessage(
                    {
                      id: n,
                      bitmap: r,
                      width: e.width,
                      height: e.height,
                      dataURLOptions: s.dataURLOptions,
                    },
                    [r]
                  );
                })
              )),
              (l = requestAnimationFrame(d));
          };
          (l = requestAnimationFrame(d)),
            (this.resetObservers = () => {
              i(), cancelAnimationFrame(l);
            });
        }
        initCanvasMutationObserver(e, t, n) {
          this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
          const r = fr(e, t, n),
            s = (function (e, t, n, r) {
              const s = [],
                i = Object.getOwnPropertyNames(
                  t.CanvasRenderingContext2D.prototype
                );
              for (const o of i)
                try {
                  if (
                    "function" != typeof t.CanvasRenderingContext2D.prototype[o]
                  )
                    continue;
                  const i = gn(
                    t.CanvasRenderingContext2D.prototype,
                    o,
                    function (s) {
                      return function (...i) {
                        return (
                          vn(this.canvas, n, r, !0) ||
                            setTimeout(() => {
                              const n = gr([...i], t, this);
                              e(this.canvas, {
                                type: Dn["2D"],
                                property: o,
                                args: n,
                              });
                            }, 0),
                          s.apply(this, i)
                        );
                      };
                    }
                  );
                  s.push(i);
                } catch (n) {
                  const r = pn(t.CanvasRenderingContext2D.prototype, o, {
                    set(t) {
                      e(this.canvas, {
                        type: Dn["2D"],
                        property: o,
                        args: [t],
                        setter: !0,
                      });
                    },
                  });
                  s.push(r);
                }
              return () => {
                s.forEach((e) => e());
              };
            })(this.processMutation.bind(this), e, t, n),
            i = (function (e, t, n, r, s) {
              const i = [];
              return (
                i.push(
                  ...yr(
                    t.WebGLRenderingContext.prototype,
                    Dn.WebGL,
                    e,
                    n,
                    r,
                    0,
                    t
                  )
                ),
                void 0 !== t.WebGL2RenderingContext &&
                  i.push(
                    ...yr(
                      t.WebGL2RenderingContext.prototype,
                      Dn.WebGL2,
                      e,
                      n,
                      r,
                      0,
                      t
                    )
                  ),
                () => {
                  i.forEach((e) => e());
                }
              );
            })(this.processMutation.bind(this), e, t, n, this.mirror);
          this.resetObservers = () => {
            r(), s(), i();
          };
        }
        startPendingCanvasMutationFlusher() {
          requestAnimationFrame(() => this.flushPendingCanvasMutations());
        }
        startRAFTimestamping() {
          const e = (t) => {
            (this.rafStamps.latestId = t), requestAnimationFrame(e);
          };
          requestAnimationFrame(e);
        }
        flushPendingCanvasMutations() {
          this.pendingCanvasMutations.forEach((e, t) => {
            const n = this.mirror.getId(t);
            this.flushPendingCanvasMutationFor(t, n);
          }),
            requestAnimationFrame(() => this.flushPendingCanvasMutations());
        }
        flushPendingCanvasMutationFor(e, t) {
          if (this.frozen || this.locked) return;
          const n = this.pendingCanvasMutations.get(e);
          if (!n || -1 === t) return;
          const r = n.map((e) =>
              (function (e, t) {
                var n = {};
                for (var r in e)
                  Object.prototype.hasOwnProperty.call(e, r) &&
                    t.indexOf(r) < 0 &&
                    (n[r] = e[r]);
                if (
                  null != e &&
                  "function" == typeof Object.getOwnPropertySymbols
                ) {
                  var s = 0;
                  for (r = Object.getOwnPropertySymbols(e); s < r.length; s++)
                    t.indexOf(r[s]) < 0 &&
                      Object.prototype.propertyIsEnumerable.call(e, r[s]) &&
                      (n[r[s]] = e[r[s]]);
                }
                return n;
              })(e, ["type"])
            ),
            { type: s } = n[0];
          this.mutationCb({ id: t, type: s, commands: r }),
            this.pendingCanvasMutations.delete(e);
        }
      }
      class Er {
        constructor(e) {
          (this.trackedLinkElements = new WeakSet()),
            (this.styleMirror = new An()),
            (this.mutationCb = e.mutationCb),
            (this.adoptedStyleSheetCb = e.adoptedStyleSheetCb);
        }
        attachLinkElement(e, t) {
          "_cssText" in t.attributes &&
            this.mutationCb({
              adds: [],
              removes: [],
              texts: [],
              attributes: [{ id: t.id, attributes: t.attributes }],
            }),
            this.trackLinkElement(e);
        }
        trackLinkElement(e) {
          this.trackedLinkElements.has(e) ||
            (this.trackedLinkElements.add(e),
            this.trackStylesheetInLinkElement(e));
        }
        adoptStyleSheets(e, t) {
          if (0 === e.length) return;
          const n = { id: t, styleIds: [] },
            r = [];
          for (const t of e) {
            let e;
            if (this.styleMirror.has(t)) e = this.styleMirror.getId(t);
            else {
              e = this.styleMirror.add(t);
              const n = Array.from(t.rules || CSSRule);
              r.push({
                styleId: e,
                rules: n.map((e, t) => ({ rule: Pt(e), index: t })),
              });
            }
            n.styleIds.push(e);
          }
          r.length > 0 && (n.styles = r), this.adoptedStyleSheetCb(n);
        }
        reset() {
          this.styleMirror.reset(), (this.trackedLinkElements = new WeakSet());
        }
        trackStylesheetInLinkElement(e) {}
      }
      class kr {
        constructor() {
          (this.nodeMap = new WeakMap()),
            (this.loop = !0),
            this.periodicallyClear();
        }
        periodicallyClear() {
          requestAnimationFrame(() => {
            this.clear(), this.loop && this.periodicallyClear();
          });
        }
        inOtherBuffer(e, t) {
          const n = this.nodeMap.get(e);
          return n && Array.from(n).some((e) => e !== t);
        }
        add(e, t) {
          this.nodeMap.set(e, (this.nodeMap.get(e) || new Set()).add(t));
        }
        clear() {
          this.nodeMap = new WeakMap();
        }
        destroy() {
          this.loop = !1;
        }
      }
      function _r(e) {
        return Object.assign(Object.assign({}, e), { timestamp: Date.now() });
      }
      let Rr,
        Tr,
        Mr,
        Nr = !1;
      const Dr = new Ft();
      function Or(e = {}) {
        const {
          emit: t,
          checkoutEveryNms: n,
          checkoutEveryNth: r,
          blockClass: s = "rr-block",
          blockSelector: i = null,
          ignoreClass: o = "rr-ignore",
          maskTextClass: a = "rr-mask",
          maskTextSelector: c = null,
          inlineStylesheet: l = !0,
          maskAllInputs: u,
          maskInputOptions: d,
          slimDOMOptions: h,
          maskInputFn: p,
          maskTextFn: g,
          hooks: m,
          packFn: f,
          sampling: y = {},
          dataURLOptions: v = {},
          mousemoveWait: I,
          recordCanvas: b = !1,
          recordCrossOriginIframes: C = !1,
          recordAfter: S = "DOMContentLoaded" === e.recordAfter
            ? e.recordAfter
            : "load",
          userTriggeredOnInput: w = !1,
          collectFonts: A = !1,
          inlineImages: E = !1,
          plugins: k,
          keepIframeSrcFn: _ = () => !1,
          ignoreCSSAttributes: R = new Set([]),
          errorHandler: T,
        } = e;
        Gn(T);
        const M = !C || window.parent === window;
        let N = !1;
        if (!M)
          try {
            window.parent.document && (N = !1);
          } catch (e) {
            N = !0;
          }
        if (M && !t) throw new Error("emit function is required");
        void 0 !== I && void 0 === y.mousemove && (y.mousemove = I), Dr.reset();
        const D =
            !0 === u
              ? {
                  color: !0,
                  date: !0,
                  "datetime-local": !0,
                  email: !0,
                  month: !0,
                  number: !0,
                  range: !0,
                  search: !0,
                  tel: !0,
                  text: !0,
                  time: !0,
                  url: !0,
                  week: !0,
                  textarea: !0,
                  select: !0,
                  password: !0,
                }
              : void 0 !== d
              ? d
              : { password: !0 },
          O =
            !0 === h || "all" === h
              ? {
                  script: !0,
                  comment: !0,
                  headFavicon: !0,
                  headWhitespace: !0,
                  headMetaSocial: !0,
                  headMetaRobots: !0,
                  headMetaHttpEquiv: !0,
                  headMetaVerification: !0,
                  headMetaAuthorship: "all" === h,
                  headMetaDescKeywords: "all" === h,
                }
              : h || {};
        let L;
        !(function (e = window) {
          "NodeList" in e &&
            !e.NodeList.prototype.forEach &&
            (e.NodeList.prototype.forEach = Array.prototype.forEach),
            "DOMTokenList" in e &&
              !e.DOMTokenList.prototype.forEach &&
              (e.DOMTokenList.prototype.forEach = Array.prototype.forEach),
            Node.prototype.contains ||
              (Node.prototype.contains = (...e) => {
                let t = e[0];
                if (!(0 in e)) throw new TypeError("1 argument is required");
                do {
                  if (this === t) return !0;
                } while ((t = t && t.parentNode));
                return !1;
              });
        })();
        let x = 0;
        const P = (e) => {
          for (const t of k || [])
            t.eventProcessor && (e = t.eventProcessor(e));
          return f && !N && (e = f(e)), e;
        };
        Rr = (e, s) => {
          var i;
          if (
            (!(null === (i = Hn[0]) || void 0 === i ? void 0 : i.isFrozen()) ||
              e.type === Rn.FullSnapshot ||
              (e.type === Rn.IncrementalSnapshot &&
                e.data.source === Tn.Mutation) ||
              Hn.forEach((e) => e.unfreeze()),
            M)
          )
            null == t || t(P(e), s);
          else if (N) {
            const t = {
              type: "rrweb",
              event: P(e),
              origin: window.location.origin,
              isCheckout: s,
            };
            window.parent.postMessage(t, "*");
          }
          if (e.type === Rn.FullSnapshot) (L = e), (x = 0);
          else if (e.type === Rn.IncrementalSnapshot) {
            if (e.data.source === Tn.Mutation && e.data.isAttachIframe) return;
            x++;
            const t = r && x >= r,
              s = n && e.timestamp - L.timestamp > n;
            (t || s) && Tr(!0);
          }
        };
        const F = (e) => {
            Rr(
              _r({
                type: Rn.IncrementalSnapshot,
                data: Object.assign({ source: Tn.Mutation }, e),
              })
            );
          },
          U = (e) =>
            Rr(
              _r({
                type: Rn.IncrementalSnapshot,
                data: Object.assign({ source: Tn.Scroll }, e),
              })
            ),
          V = (e) =>
            Rr(
              _r({
                type: Rn.IncrementalSnapshot,
                data: Object.assign({ source: Tn.CanvasMutation }, e),
              })
            ),
          q = new Er({
            mutationCb: F,
            adoptedStyleSheetCb: (e) =>
              Rr(
                _r({
                  type: Rn.IncrementalSnapshot,
                  data: Object.assign({ source: Tn.AdoptedStyleSheet }, e),
                })
              ),
          }),
          G = new ir({
            mirror: Dr,
            mutationCb: F,
            stylesheetManager: q,
            recordCrossOriginIframes: C,
            wrappedEmit: Rr,
          });
        for (const e of k || [])
          e.getMirror &&
            e.getMirror({
              nodeMirror: Dr,
              crossOriginIframeMirror: G.crossOriginIframeMirror,
              crossOriginIframeStyleMirror: G.crossOriginIframeStyleMirror,
            });
        const B = new kr();
        Mr = new Ar({
          recordCanvas: b,
          mutationCb: V,
          win: window,
          blockClass: s,
          blockSelector: i,
          mirror: Dr,
          sampling: y.canvas,
          dataURLOptions: v,
        });
        const W = new or({
          mutationCb: F,
          scrollCb: U,
          bypassOptions: {
            blockClass: s,
            blockSelector: i,
            maskTextClass: a,
            maskTextSelector: c,
            inlineStylesheet: l,
            maskInputOptions: D,
            dataURLOptions: v,
            maskTextFn: g,
            maskInputFn: p,
            recordCanvas: b,
            inlineImages: E,
            sampling: y,
            slimDOMOptions: O,
            iframeManager: G,
            stylesheetManager: q,
            canvasManager: Mr,
            keepIframeSrcFn: _,
            processedNodeManager: B,
          },
          mirror: Dr,
        });
        Tr = (e = !1) => {
          Rr(
            _r({
              type: Rn.Meta,
              data: { href: window.location.href, width: yn(), height: fn() },
            }),
            e
          ),
            q.reset(),
            W.init(),
            Hn.forEach((e) => e.lock());
          const t = (function (e, t) {
            var n = t || {},
              r = n.mirror,
              s = void 0 === r ? new Ft() : r,
              i = n.blockClass,
              o = void 0 === i ? "rr-block" : i,
              a = n.blockSelector,
              c = void 0 === a ? null : a,
              l = n.maskTextClass,
              u = void 0 === l ? "rr-mask" : l,
              d = n.maskTextSelector,
              h = void 0 === d ? null : d,
              p = n.inlineStylesheet,
              g = void 0 === p || p,
              m = n.inlineImages,
              f = void 0 !== m && m,
              y = n.recordCanvas,
              v = void 0 !== y && y,
              I = n.maskAllInputs,
              b = void 0 !== I && I,
              C = n.maskTextFn,
              S = n.maskInputFn,
              w = n.slimDOM,
              A = void 0 !== w && w,
              E = n.dataURLOptions,
              k = n.preserveWhiteSpace,
              _ = n.onSerialize,
              R = n.onIframeLoad,
              T = n.iframeLoadTimeout,
              M = n.onStylesheetLoad,
              N = n.stylesheetLoadTimeout,
              D = n.keepIframeSrcFn;
            return an(e, {
              doc: e,
              mirror: s,
              blockClass: o,
              blockSelector: c,
              maskTextClass: u,
              maskTextSelector: h,
              skipChild: !1,
              inlineStylesheet: g,
              maskInputOptions:
                !0 === b
                  ? {
                      color: !0,
                      date: !0,
                      "datetime-local": !0,
                      email: !0,
                      month: !0,
                      number: !0,
                      range: !0,
                      search: !0,
                      tel: !0,
                      text: !0,
                      time: !0,
                      url: !0,
                      week: !0,
                      textarea: !0,
                      select: !0,
                      password: !0,
                    }
                  : !1 === b
                  ? { password: !0 }
                  : b,
              maskTextFn: C,
              maskInputFn: S,
              slimDOMOptions:
                !0 === A || "all" === A
                  ? {
                      script: !0,
                      comment: !0,
                      headFavicon: !0,
                      headWhitespace: !0,
                      headMetaDescKeywords: "all" === A,
                      headMetaSocial: !0,
                      headMetaRobots: !0,
                      headMetaHttpEquiv: !0,
                      headMetaAuthorship: !0,
                      headMetaVerification: !0,
                    }
                  : !1 === A
                  ? {}
                  : A,
              dataURLOptions: E,
              inlineImages: f,
              recordCanvas: v,
              preserveWhiteSpace: k,
              onSerialize: _,
              onIframeLoad: R,
              iframeLoadTimeout: T,
              onStylesheetLoad: M,
              stylesheetLoadTimeout: N,
              keepIframeSrcFn:
                void 0 === D
                  ? function () {
                      return !1;
                    }
                  : D,
              newlyAddedElement: !1,
            });
          })(document, {
            mirror: Dr,
            blockClass: s,
            blockSelector: i,
            maskTextClass: a,
            maskTextSelector: c,
            inlineStylesheet: l,
            maskAllInputs: D,
            maskTextFn: g,
            slimDOM: O,
            dataURLOptions: v,
            recordCanvas: b,
            inlineImages: E,
            onSerialize: (e) => {
              Cn(e, Dr) && G.addIframe(e),
                Sn(e, Dr) && q.trackLinkElement(e),
                wn(e) && W.addShadowRoot(e.shadowRoot, document);
            },
            onIframeLoad: (e, t) => {
              G.attachIframe(e, t), W.observeAttachShadow(e);
            },
            onStylesheetLoad: (e, t) => {
              q.attachLinkElement(e, t);
            },
            keepIframeSrcFn: _,
          });
          if (!t) return console.warn("Failed to snapshot the document");
          Rr(
            _r({
              type: Rn.FullSnapshot,
              data: { node: t, initialOffset: mn(window) },
            }),
            e
          ),
            Hn.forEach((e) => e.unlock()),
            document.adoptedStyleSheets &&
              document.adoptedStyleSheets.length > 0 &&
              q.adoptStyleSheets(
                document.adoptedStyleSheets,
                Dr.getId(document)
              );
        };
        try {
          const e = [],
            t = (e) => {
              var t;
              return Wn(tr)(
                {
                  mutationCb: F,
                  mousemoveCb: (e, t) =>
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: { source: t, positions: e },
                      })
                    ),
                  mouseInteractionCb: (e) =>
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: Object.assign({ source: Tn.MouseInteraction }, e),
                      })
                    ),
                  scrollCb: U,
                  viewportResizeCb: (e) =>
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: Object.assign({ source: Tn.ViewportResize }, e),
                      })
                    ),
                  inputCb: (e) =>
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: Object.assign({ source: Tn.Input }, e),
                      })
                    ),
                  mediaInteractionCb: (e) =>
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: Object.assign({ source: Tn.MediaInteraction }, e),
                      })
                    ),
                  styleSheetRuleCb: (e) =>
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: Object.assign({ source: Tn.StyleSheetRule }, e),
                      })
                    ),
                  styleDeclarationCb: (e) =>
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: Object.assign({ source: Tn.StyleDeclaration }, e),
                      })
                    ),
                  canvasMutationCb: V,
                  fontCb: (e) =>
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: Object.assign({ source: Tn.Font }, e),
                      })
                    ),
                  selectionCb: (e) => {
                    Rr(
                      _r({
                        type: Rn.IncrementalSnapshot,
                        data: Object.assign({ source: Tn.Selection }, e),
                      })
                    );
                  },
                  blockClass: s,
                  ignoreClass: o,
                  maskTextClass: a,
                  maskTextSelector: c,
                  maskInputOptions: D,
                  inlineStylesheet: l,
                  sampling: y,
                  recordCanvas: b,
                  inlineImages: E,
                  userTriggeredOnInput: w,
                  collectFonts: A,
                  doc: e,
                  maskInputFn: p,
                  maskTextFn: g,
                  keepIframeSrcFn: _,
                  blockSelector: i,
                  slimDOMOptions: O,
                  dataURLOptions: v,
                  mirror: Dr,
                  iframeManager: G,
                  stylesheetManager: q,
                  shadowDomManager: W,
                  processedNodeManager: B,
                  canvasManager: Mr,
                  ignoreCSSAttributes: R,
                  plugins:
                    (null ===
                      (t = null == k ? void 0 : k.filter((e) => e.observer)) ||
                    void 0 === t
                      ? void 0
                      : t.map((e) => ({
                          observer: e.observer,
                          options: e.options,
                          callback: (t) =>
                            Rr(
                              _r({
                                type: Rn.Plugin,
                                data: { plugin: e.name, payload: t },
                              })
                            ),
                        }))) || [],
                },
                m
              );
            };
          G.addLoadListener((n) => {
            try {
              e.push(t(n.contentDocument));
            } catch (e) {
              console.warn(e);
            }
          });
          const n = () => {
            Tr(), e.push(t(document)), (Nr = !0);
          };
          return (
            "interactive" === document.readyState ||
            "complete" === document.readyState
              ? n()
              : (e.push(
                  ln("DOMContentLoaded", () => {
                    Rr(_r({ type: Rn.DomContentLoaded, data: {} })),
                      "DOMContentLoaded" === S && n();
                  })
                ),
                e.push(
                  ln(
                    "load",
                    () => {
                      Rr(_r({ type: Rn.Load, data: {} })), "load" === S && n();
                    },
                    window
                  )
                )),
            () => {
              e.forEach((e) => e()), B.destroy(), (Nr = !1), Bn();
            }
          );
        } catch (e) {
          console.warn(e);
        }
      }
      (Or.addCustomEvent = (e, t) => {
        if (!Nr)
          throw new Error("please add custom event after start recording");
        Rr(_r({ type: Rn.Custom, data: { tag: e, payload: t } }));
      }),
        (Or.freezePage = () => {
          Hn.forEach((e) => e.freeze());
        }),
        (Or.takeFullSnapshot = (e) => {
          if (!Nr)
            throw new Error("please take full snapshot after start recording");
          Tr(e);
        }),
        (Or.mirror = Dr);
      var Lr = Uint8Array,
        xr = Uint16Array,
        Pr = Uint32Array,
        Fr = new Lr([
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
          4, 5, 5, 5, 5, 0, 0, 0, 0,
        ]),
        Ur = new Lr([
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
          10, 11, 11, 12, 12, 13, 13, 0, 0,
        ]),
        Vr = new Lr([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]),
        qr = function (e, t) {
          for (var n = new xr(31), r = 0; r < 31; ++r)
            n[r] = t += 1 << e[r - 1];
          var s = new Pr(n[30]);
          for (r = 1; r < 30; ++r)
            for (var i = n[r]; i < n[r + 1]; ++i) s[i] = ((i - n[r]) << 5) | r;
          return [n, s];
        },
        Gr = qr(Fr, 2),
        Br = Gr[0],
        Wr = Gr[1];
      (Br[28] = 258), (Wr[258] = 28);
      for (
        var Hr = qr(Ur, 0), Zr = (Hr[0], Hr[1]), jr = new xr(32768), zr = 0;
        zr < 32768;
        ++zr
      ) {
        var Kr = ((43690 & zr) >>> 1) | ((21845 & zr) << 1);
        (Kr =
          ((61680 & (Kr = ((52428 & Kr) >>> 2) | ((13107 & Kr) << 2))) >>> 4) |
          ((3855 & Kr) << 4)),
          (jr[zr] = (((65280 & Kr) >>> 8) | ((255 & Kr) << 8)) >>> 1);
      }
      var Qr = function (e, t, n) {
          for (var r = e.length, s = 0, i = new xr(t); s < r; ++s)
            ++i[e[s] - 1];
          var o,
            a = new xr(t);
          for (s = 0; s < t; ++s) a[s] = (a[s - 1] + i[s - 1]) << 1;
          if (n) {
            o = new xr(1 << t);
            var c = 15 - t;
            for (s = 0; s < r; ++s)
              if (e[s])
                for (
                  var l = (s << 4) | e[s],
                    u = t - e[s],
                    d = a[e[s] - 1]++ << u,
                    h = d | ((1 << u) - 1);
                  d <= h;
                  ++d
                )
                  o[jr[d] >>> c] = l;
          } else
            for (o = new xr(r), s = 0; s < r; ++s)
              o[s] = jr[a[e[s] - 1]++] >>> (15 - e[s]);
          return o;
        },
        Yr = new Lr(288);
      for (zr = 0; zr < 144; ++zr) Yr[zr] = 8;
      for (zr = 144; zr < 256; ++zr) Yr[zr] = 9;
      for (zr = 256; zr < 280; ++zr) Yr[zr] = 7;
      for (zr = 280; zr < 288; ++zr) Yr[zr] = 8;
      var Jr = new Lr(32);
      for (zr = 0; zr < 32; ++zr) Jr[zr] = 5;
      var $r = Qr(Yr, 9, 0),
        Xr = Qr(Jr, 5, 0),
        es = function (e) {
          return ((e / 8) >> 0) + (7 & e && 1);
        },
        ts = function (e, t, n) {
          (null == t || t < 0) && (t = 0),
            (null == n || n > e.length) && (n = e.length);
          var r = new (e instanceof xr ? xr : e instanceof Pr ? Pr : Lr)(n - t);
          return r.set(e.subarray(t, n)), r;
        },
        ns = function (e, t, n) {
          n <<= 7 & t;
          var r = (t / 8) >> 0;
          (e[r] |= n), (e[r + 1] |= n >>> 8);
        },
        rs = function (e, t, n) {
          n <<= 7 & t;
          var r = (t / 8) >> 0;
          (e[r] |= n), (e[r + 1] |= n >>> 8), (e[r + 2] |= n >>> 16);
        },
        ss = function (e, t) {
          for (var n = [], r = 0; r < e.length; ++r)
            e[r] && n.push({ s: r, f: e[r] });
          var s = n.length,
            i = n.slice();
          if (!s) return [new Lr(0), 0];
          if (1 == s) {
            var o = new Lr(n[0].s + 1);
            return (o[n[0].s] = 1), [o, 1];
          }
          n.sort(function (e, t) {
            return e.f - t.f;
          }),
            n.push({ s: -1, f: 25001 });
          var a = n[0],
            c = n[1],
            l = 0,
            u = 1,
            d = 2;
          for (n[0] = { s: -1, f: a.f + c.f, l: a, r: c }; u != s - 1; )
            (a = n[n[l].f < n[d].f ? l++ : d++]),
              (c = n[l != u && n[l].f < n[d].f ? l++ : d++]),
              (n[u++] = { s: -1, f: a.f + c.f, l: a, r: c });
          var h = i[0].s;
          for (r = 1; r < s; ++r) i[r].s > h && (h = i[r].s);
          var p = new xr(h + 1),
            g = is(n[u - 1], p, 0);
          if (g > t) {
            r = 0;
            var m = 0,
              f = g - t,
              y = 1 << f;
            for (
              i.sort(function (e, t) {
                return p[t.s] - p[e.s] || e.f - t.f;
              });
              r < s;
              ++r
            ) {
              var v = i[r].s;
              if (!(p[v] > t)) break;
              (m += y - (1 << (g - p[v]))), (p[v] = t);
            }
            for (m >>>= f; m > 0; ) {
              var I = i[r].s;
              p[I] < t ? (m -= 1 << (t - p[I]++ - 1)) : ++r;
            }
            for (; r >= 0 && m; --r) {
              var b = i[r].s;
              p[b] == t && (--p[b], ++m);
            }
            g = t;
          }
          return [new Lr(p), g];
        },
        is = function (e, t, n) {
          return -1 == e.s
            ? Math.max(is(e.l, t, n + 1), is(e.r, t, n + 1))
            : (t[e.s] = n);
        },
        os = function (e) {
          for (var t = e.length; t && !e[--t]; );
          for (
            var n = new xr(++t),
              r = 0,
              s = e[0],
              i = 1,
              o = function (e) {
                n[r++] = e;
              },
              a = 1;
            a <= t;
            ++a
          )
            if (e[a] == s && a != t) ++i;
            else {
              if (!s && i > 2) {
                for (; i > 138; i -= 138) o(32754);
                i > 2 &&
                  (o(i > 10 ? ((i - 11) << 5) | 28690 : ((i - 3) << 5) | 12305),
                  (i = 0));
              } else if (i > 3) {
                for (o(s), --i; i > 6; i -= 6) o(8304);
                i > 2 && (o(((i - 3) << 5) | 8208), (i = 0));
              }
              for (; i--; ) o(s);
              (i = 1), (s = e[a]);
            }
          return [n.subarray(0, r), t];
        },
        as = function (e, t) {
          for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
          return n;
        },
        cs = function (e, t, n) {
          var r = n.length,
            s = es(t + 2);
          (e[s] = 255 & r),
            (e[s + 1] = r >>> 8),
            (e[s + 2] = 255 ^ e[s]),
            (e[s + 3] = 255 ^ e[s + 1]);
          for (var i = 0; i < r; ++i) e[s + i + 4] = n[i];
          return 8 * (s + 4 + r);
        },
        ls = function (e, t, n, r, s, i, o, a, c, l, u) {
          ns(t, u++, n), ++s[256];
          for (
            var d = ss(s, 15),
              h = d[0],
              p = d[1],
              g = ss(i, 15),
              m = g[0],
              f = g[1],
              y = os(h),
              v = y[0],
              I = y[1],
              b = os(m),
              C = b[0],
              S = b[1],
              w = new xr(19),
              A = 0;
            A < v.length;
            ++A
          )
            w[31 & v[A]]++;
          for (A = 0; A < C.length; ++A) w[31 & C[A]]++;
          for (
            var E = ss(w, 7), k = E[0], _ = E[1], R = 19;
            R > 4 && !k[Vr[R - 1]];
            --R
          );
          var T,
            M,
            N,
            D,
            O = (l + 5) << 3,
            L = as(s, Yr) + as(i, Jr) + o,
            x =
              as(s, h) +
              as(i, m) +
              o +
              14 +
              3 * R +
              as(w, k) +
              (2 * w[16] + 3 * w[17] + 7 * w[18]);
          if (O <= L && O <= x) return cs(t, u, e.subarray(c, c + l));
          if ((ns(t, u, 1 + (x < L)), (u += 2), x < L)) {
            (T = Qr(h, p, 0)), (M = h), (N = Qr(m, f, 0)), (D = m);
            var P = Qr(k, _, 0);
            ns(t, u, I - 257),
              ns(t, u + 5, S - 1),
              ns(t, u + 10, R - 4),
              (u += 14);
            for (A = 0; A < R; ++A) ns(t, u + 3 * A, k[Vr[A]]);
            u += 3 * R;
            for (var F = [v, C], U = 0; U < 2; ++U) {
              var V = F[U];
              for (A = 0; A < V.length; ++A) {
                var q = 31 & V[A];
                ns(t, u, P[q]),
                  (u += k[q]),
                  q > 15 && (ns(t, u, (V[A] >>> 5) & 127), (u += V[A] >>> 12));
              }
            }
          } else (T = $r), (M = Yr), (N = Xr), (D = Jr);
          for (A = 0; A < a; ++A)
            if (r[A] > 255) {
              q = (r[A] >>> 18) & 31;
              rs(t, u, T[q + 257]),
                (u += M[q + 257]),
                q > 7 && (ns(t, u, (r[A] >>> 23) & 31), (u += Fr[q]));
              var G = 31 & r[A];
              rs(t, u, N[G]),
                (u += D[G]),
                G > 3 && (rs(t, u, (r[A] >>> 5) & 8191), (u += Ur[G]));
            } else rs(t, u, T[r[A]]), (u += M[r[A]]);
          return rs(t, u, T[256]), u + M[256];
        },
        us = new Pr([
          65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560,
          2117632,
        ]),
        ds = new Lr(0),
        hs = function (e, t, n, r, s) {
          return (function (e, t, n, r, s, i) {
            var o = e.length,
              a = new Lr(r + o + 5 * (1 + Math.floor(o / 7e3)) + s),
              c = a.subarray(r, a.length - s),
              l = 0;
            if (!t || o < 8)
              for (var u = 0; u <= o; u += 65535) {
                var d = u + 65535;
                d < o
                  ? (l = cs(c, l, e.subarray(u, d)))
                  : ((c[u] = i), (l = cs(c, l, e.subarray(u, o))));
              }
            else {
              for (
                var h = us[t - 1],
                  p = h >>> 13,
                  g = 8191 & h,
                  m = (1 << n) - 1,
                  f = new xr(32768),
                  y = new xr(m + 1),
                  v = Math.ceil(n / 3),
                  I = 2 * v,
                  b = function (t) {
                    return (e[t] ^ (e[t + 1] << v) ^ (e[t + 2] << I)) & m;
                  },
                  C = new Pr(25e3),
                  S = new xr(288),
                  w = new xr(32),
                  A = 0,
                  E = 0,
                  k = ((u = 0), 0),
                  _ = 0,
                  R = 0;
                u < o;
                ++u
              ) {
                var T = b(u),
                  M = 32767 & u,
                  N = y[T];
                if (((f[M] = N), (y[T] = M), _ <= u)) {
                  var D = o - u;
                  if ((A > 7e3 || k > 24576) && D > 423) {
                    (l = ls(e, c, 0, C, S, w, E, k, R, u - R, l)),
                      (k = A = E = 0),
                      (R = u);
                    for (var O = 0; O < 286; ++O) S[O] = 0;
                    for (O = 0; O < 30; ++O) w[O] = 0;
                  }
                  var L = 2,
                    x = 0,
                    P = g,
                    F = (M - N) & 32767;
                  if (D > 2 && T == b(u - F))
                    for (
                      var U = Math.min(p, D) - 1,
                        V = Math.min(32767, u),
                        q = Math.min(258, D);
                      F <= V && --P && M != N;

                    ) {
                      if (e[u + L] == e[u + L - F]) {
                        for (var G = 0; G < q && e[u + G] == e[u + G - F]; ++G);
                        if (G > L) {
                          if (((L = G), (x = F), G > U)) break;
                          var B = Math.min(F, G - 2),
                            W = 0;
                          for (O = 0; O < B; ++O) {
                            var H = (u - F + O + 32768) & 32767,
                              Z = (H - f[H] + 32768) & 32767;
                            Z > W && ((W = Z), (N = H));
                          }
                        }
                      }
                      F += ((M = N) - (N = f[M]) + 32768) & 32767;
                    }
                  if (x) {
                    C[k++] = 268435456 | (Wr[L] << 18) | Zr[x];
                    var j = 31 & Wr[L],
                      z = 31 & Zr[x];
                    (E += Fr[j] + Ur[z]),
                      ++S[257 + j],
                      ++w[z],
                      (_ = u + L),
                      ++A;
                  } else (C[k++] = e[u]), ++S[e[u]];
                }
              }
              (l = ls(e, c, i, C, S, w, E, k, R, u - R, l)),
                i || (l = cs(c, l, ds));
            }
            return ts(a, 0, r + es(l) + s);
          })(
            e,
            null == t.level ? 6 : t.level,
            null == t.mem
              ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length))))
              : 12 + t.mem,
            n,
            r,
            !s
          );
        };
      function ps(e, t) {
        void 0 === t && (t = {});
        var n = (function () {
          var e = 1,
            t = 0;
          return {
            p: function (n) {
              for (var r = e, s = t, i = n.length, o = 0; o != i; ) {
                for (var a = Math.min(o + 5552, i); o < a; ++o) s += r += n[o];
                (r %= 65521), (s %= 65521);
              }
              (e = r), (t = s);
            },
            d: function () {
              return (
                (((e >>> 8) << 16) | ((255 & t) << 8) | (t >>> 8)) +
                2 * ((255 & e) << 23)
              );
            },
          };
        })();
        n.p(e);
        var r = hs(e, t, 2, 4);
        return (
          (function (e, t) {
            var n = t.level,
              r = 0 == n ? 0 : n < 6 ? 1 : 9 == n ? 3 : 2;
            (e[0] = 120), (e[1] = (r << 6) | (r ? 32 - 2 * r : 1));
          })(r, t),
          (function (e, t, n) {
            for (; n; ++t) (e[t] = n), (n >>>= 8);
          })(r, r.length - 4, n.d()),
          r
        );
      }
      const gs = (e) => {
          const t = Object.assign(Object.assign({}, e), { v: "v1" });
          return (function (e, t) {
            var n = "";
            if (!t && "undefined" != typeof TextDecoder)
              return new TextDecoder().decode(e);
            for (var r = 0; r < e.length; ) {
              var s = e[r++];
              s < 128 || t
                ? (n += String.fromCharCode(s))
                : s < 224
                ? (n += String.fromCharCode(((31 & s) << 6) | (63 & e[r++])))
                : s < 240
                ? (n += String.fromCharCode(
                    ((15 & s) << 12) | ((63 & e[r++]) << 6) | (63 & e[r++])
                  ))
                : ((s =
                    (((15 & s) << 18) |
                      ((63 & e[r++]) << 12) |
                      ((63 & e[r++]) << 6) |
                      (63 & e[r++])) -
                    65536),
                  (n += String.fromCharCode(
                    55296 | (s >> 10),
                    56320 | (1023 & s)
                  )));
            }
            return n;
          })(
            ps(
              (function (e, t) {
                var n = e.length;
                if (!t && "undefined" != typeof TextEncoder)
                  return new TextEncoder().encode(e);
                for (
                  var r = new Lr(e.length + (e.length >>> 1)),
                    s = 0,
                    i = function (e) {
                      r[s++] = e;
                    },
                    o = 0;
                  o < n;
                  ++o
                ) {
                  if (s + 5 > r.length) {
                    var a = new Lr(s + 8 + ((n - o) << 1));
                    a.set(r), (r = a);
                  }
                  var c = e.charCodeAt(o);
                  c < 128 || t
                    ? i(c)
                    : c < 2048
                    ? (i(192 | (c >>> 6)), i(128 | (63 & c)))
                    : c > 55295 && c < 57344
                    ? (i(
                        240 |
                          ((c =
                            (65536 + (1047552 & c)) |
                            (1023 & e.charCodeAt(++o))) >>>
                            18)
                      ),
                      i(128 | ((c >>> 12) & 63)),
                      i(128 | ((c >>> 6) & 63)),
                      i(128 | (63 & c)))
                    : (i(224 | (c >>> 12)),
                      i(128 | ((c >>> 6) & 63)),
                      i(128 | (63 & c)));
                }
                return ts(r, 0, s);
              })(JSON.stringify(t))
            ),
            !0
          );
        },
        { addCustomEvent: ms } = Or,
        { freezePage: fs } = Or;
      class ys {
        constructor() {
          (this.eventBuffer = []),
            (this.vfCounter = 0),
            (this.didSetupRecorder = !1),
            (this.recordStopper = null),
            (this.firstRecordedTimestamp = null),
            (this.lastRecordedTimestamp = null),
            (this.invalidVideoLength = !1),
            (this.lastFragPostTimestamp = new Date()),
            (this.pauseTimeout = !1),
            (this.freezingEvents = !1),
            (this.cssURLs = new Map()),
            (this.pageStateHistory = []),
            (this.lastRRWebEvent = null),
            this.setupUnloadHandler(),
            this.setupPostMetricsHandler();
        }
        static configureInstance() {
          this.instance ||
            ((this.instance = new ys()),
            $(window, "click", () => {
              this.instance.handleFragPost();
            }));
        }
        static getInstance() {
          if (!this.instance)
            throw new Error("SessionRecorder was not configured");
          return this.instance;
        }
        addCSSURLs(e) {
          this.cssURLs.get(e) ||
            this.cssURLs.set(e, {
              seq_sent: se.getInstance().messageSequenceNum,
              received: !1,
            });
        }
        searchObjectForCSSUrls(e) {
          Object.keys(e).forEach((t) => {
            const n = e[t];
            if (null !== n)
              if (
                "href" === t &&
                "string" == typeof n &&
                n.length > 0 &&
                (n.includes(".css") ||
                  (Object.prototype.hasOwnProperty.call(e, "type") &&
                    "text/css" === e.type))
              ) {
                const e = n.replace(/['"]/g, "");
                this.addCSSURLs(e);
              } else
                "object" == typeof n &&
                  null !== n &&
                  this.searchObjectForCSSUrls(n);
          });
        }
        checkForCSSURLs(e) {
          (3 !== e.type && 2 !== e.type) || this.searchObjectForCSSUrls(e);
        }
        getCSSURLsNotReceived() {
          const { latestReceivedSeqNumber: e } = se.getInstance(),
            t = [];
          return (
            this.cssURLs.forEach((n, r) => {
              if (!n.received && n.seq_sent < e) {
                const e = n;
                (e.received = !0), this.cssURLs.set(r, e);
              } else n.received || t.push(r);
            }),
            t
          );
        }
        setupUnloadHandler() {
          ["pagehide", "visibilitychange"].forEach((e) =>
            $(window, e, () => {
              this.pageStateHistory.push(
                `${te() ? "" : new Date().toISOString()}: ${e}`
              ),
                "pagehide" === e && this.handleFragPost();
            })
          );
        }
        setupPostMetricsHandler() {
          $(window, "noibuPostMetrics", (e) => {
            const t = e.detail,
              n =
                null === this.lastRecordedTimestamp ||
                null === this.firstRecordedTimestamp
                  ? 0
                  : this.lastRecordedTimestamp - this.firstRecordedTimestamp,
              r = se.getInstance().sessionLength
                ? se.getInstance().sessionLength
                : 0;
            if (se.getInstance().retryMessageQueue.length > 100) {
              const e = this.buildDebugMessage(t, n, r),
                s = J.getInstance().isClientDisabled;
              (J.getInstance().isClientDisabled = !1),
                J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                  e,
                  s,
                  "warn"
                );
            }
          });
        }
        recordUserSession() {
          if (se.getInstance().closeIfInactive() || X.getInstance().didCutVideo)
            return;
          if (this.didSetupRecorder) return;
          const e = this,
            t = {
              emit(t) {
                e.handleNewRRwebEvent(t, 2e3);
              },
              inlineStylesheet: !1,
              maskAllInputs: !0,
              maskTextSelector: G(),
              ignoreCSSAttributes: p,
            };
          X.getInstance().setDidStartVideo(),
            (e.recordStopper = Or(t)),
            (this.didSetupRecorder = !0);
        }
        handleNewRRwebEvent(e, t) {
          if (
            se.getInstance().closeIfInactive() ||
            X.getInstance().didCutVideo
          ) {
            if (this.recordStopper)
              try {
                this.recordStopper();
              } catch (e) {
                J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                  "Error during handleNewRRwebEvent in recordStopper: " + e,
                  !0,
                  "error"
                );
              }
            return;
          }
          if (5 === e.type && "unfreeze" === e.data.tag) return;
          if (
            ((3 === e.type && 0 === e.data.source) ||
              (this.pauseTimeout &&
                (clearTimeout(this.pauseTimeout), (this.freezingEvents = !1)),
              (this.pauseTimeout = setTimeout(function () {
                (ys.getInstance().freezingEvents = !0), Or.freezePage();
              }, t))),
            (e.timestamp = ne(e.timestamp)),
            this.firstRecordedTimestamp ||
              (this.firstRecordedTimestamp = e.timestamp),
            (!this.lastRecordedTimestamp ||
              e.timestamp > this.lastRecordedTimestamp) &&
              (this.lastRecordedTimestamp = e.timestamp),
            this.firstRecordedTimestamp &&
              e.timestamp < this.firstRecordedTimestamp)
          )
            return void J.getInstance().postNoibuErrorAndOptionallyDisableClient(
              "Detected time rewind. Client has been disabled.",
              !0,
              "error",
              !0
            );
          this.eventBuffer.push(gs(e)),
            (this.lastRRWebEvent = e),
            this.checkForCSSURLs(e),
            3 !== e.type ||
              2 !== e.data.source ||
              (2 !== e.data.type && 4 !== e.data.type) ||
              X.getInstance().addVideoClick();
          const n = new Date();
          n.setMilliseconds(n.getMilliseconds() - 500),
            (this.eventBuffer.length >= 10 || this.lastFragPostTimestamp < n) &&
              this.handleFragPost();
        }
        buildDebugMessage(e, t, n) {
          let r = "Posting metrics, logging due to large retry message queue";
          return (
            (r += ", URL: " + document.location.href),
            (r += ", Session Length: " + n),
            (r += ", Video Length: " + t),
            (r += ", Length Delta: " + (t - n)),
            (r +=
              ", Session Start: " +
              new Date(se.getInstance().sessionTimestamp)),
            null !== this.firstRecordedTimestamp &&
              ((r += ", Video Start: " + new Date(this.firstRecordedTimestamp)),
              (r +=
                ", Start Delta: " +
                (this.firstRecordedTimestamp -
                  se.getInstance().sessionTimestamp))),
            (r += ", Last active time: " + J.getInstance().lastActiveTime),
            (r += ", Visibility: " + document.visibilityState),
            this.pageStateHistory.length > 0 &&
              (r += ", Page States: " + this.pageStateHistory),
            (r += `, Socket: Connected ${se
              .getInstance()
              .isConnected()} Count ${
              se.getInstance().connectionCount
            } Buffer: ${
              se.getInstance().socket && se.getInstance().socket.bufferedAmount
            }`),
            se.getInstance().socketCloseCodes.length > 0 &&
              (r += " Closure Codes: " + se.getInstance().socketCloseCodes),
            se.getInstance().socketOpens.length > 0 &&
              (r += " Opens: " + se.getInstance().socketOpens),
            null !== this.lastRRWebEvent &&
              (r += `, Last rrweb event: Type ${
                this.lastRRWebEvent.type
              } Data Source ${
                this.lastRRWebEvent.data &&
                void 0 !== this.lastRRWebEvent.data.source
                  ? this.lastRRWebEvent.data.source
                  : -1
              } Data Type ${
                this.lastRRWebEvent.data &&
                void 0 !== this.lastRRWebEvent.data.type
                  ? this.lastRRWebEvent.data.type
                  : -1
              } Time: ${new Date(this.lastRRWebEvent.timestamp)}`),
            se.getInstance().retryMessageQueue.length > 0 &&
              (r +=
                ", Retry queue length: " +
                se.getInstance().retryMessageQueue.length),
            (r += `, Sequence Info: Latest ${this.lastFragPostTimestamp} ${
              se.getInstance().messageSequenceNum
            } Ack'd ${se.getInstance().latestReceivedSeqNumStoredTime} ${
              se.getInstance().latestReceivedSeqNumber
            }`),
            e && (r += ", Event: " + e),
            r
          );
        }
        handleFragPost() {
          if (
            !se.getInstance().closeIfInactive() &&
            this.didSetupRecorder &&
            0 !== this.eventBuffer.length
          ) {
            try {
              let e = 0;
              this.firstRecordedTimestamp &&
                this.lastRecordedTimestamp &&
                !this.invalidVideoLength &&
                (e = this.lastRecordedTimestamp - this.firstRecordedTimestamp),
                !this.invalidVideoLength &&
                  (e < 0 || e >= Number.MAX_SAFE_INTEGER) &&
                  (J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                    `video lengthMS is invalid: ${e}, start time: ${this.firstRecordedTimestamp}, end time: ` +
                      this.lastRecordedTimestamp,
                    !1,
                    "error"
                  ),
                  (this.invalidVideoLength = !0),
                  (e = 0)),
                (this.vfCounter += 1);
              const t = {};
              (t.vid = F(this.eventBuffer)),
                (t.seq = this.vfCounter),
                (t.len = e),
                (t.css_urls = this.getCSSURLsNotReceived()),
                se.getInstance().addEndTimeToPayload(t, !1),
                X.getInstance().addVideoFragData(this.vfCounter, e);
              const n = {};
              (n.pvvf = t),
                se.getInstance().sendMessage("v", n),
                (this.lastFragPostTimestamp = new Date());
            } catch (e) {
              if (
                (J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                  "video frag socket closed with err: " + e.message,
                  !1,
                  "error"
                ),
                this.recordStopper)
              )
                try {
                  this.recordStopper();
                } catch (e) {
                  J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                    "Error during handleFragPost in recordStopper: " + e,
                    !1,
                    "error"
                  );
                }
            }
            this.eventBuffer = [];
          }
        }
        unfreeze() {
          this.freezingEvents && ms("unfreeze", {});
        }
      }
      !(function (t) {
        if (B()) return;
        if (
          (function (t) {
            for (let n = 0; n < e.length; n += 1) {
              if (!t[e[n]]) return !0;
            }
            return !1;
          })(t)
        )
          return;
        if (!window.location.href.startsWith("http")) return;
        if (
          (function () {
            const e = void 0 !== window.noibuJSLoaded;
            return (window.noibuJSLoaded = !0), e;
          })()
        )
          return;
        const n = t.metroplexHTTPBase + "/collect_error";
        J.configureInstance(n);
        try {
          const e = S()();
          if (J.getInstance().isClientDisabled) return;
          Tt.configure(!1);
          const t = se.getInstance(e);
          ys.configureInstance(), ie.configureInstance();
          const n = ys.getInstance();
          ee.getInstance();
          const r = new Me(),
            s = Te.getInstance(),
            i = De.getInstance(),
            o = Rt.getInstance(),
            a = Nt.getInstance();
          Ie.getInstance(),
            fe(),
            Ae(),
            we(),
            s.monitorClicks(),
            setInterval(function () {
              if (Ne !== window.location.href) {
                Ne = window.location.href;
                const e = { url: x() };
                oe.getInstance().addEvent(e, "loc");
              }
            }, 1e3),
            r.monitor(),
            i.monitor(),
            o.monitor(),
            a.monitor(),
            Promise.all([
              new Promise((e) => {
                function t() {
                  "complete" === document.readyState &&
                    (window.removeEventListener("load", t),
                    document.removeEventListener("readystatechange", t),
                    e());
                }
                "complete" === document.readyState
                  ? e()
                  : ($(window, "load", t), $(document, "readystatechange", t));
              }),
              t.connectionPromise,
            ])
              .then(() => {
                n.recordUserSession(), Tt.getInstance().checkInitialRequest();
              })
              .catch((e) => {
                J.getInstance().postNoibuErrorAndOptionallyDisableClient(
                  "Error during recordUserSession: " + e,
                  !1,
                  "error"
                );
              }),
            Mt.getInstance().exposeFunctions();
        } catch (e) {
          J.getInstance().postNoibuErrorAndOptionallyDisableClient(
            "Error during globalInit: " + e,
            !0,
            "error"
          );
        }
      })({ metroplexSocketBase: y(), metroplexHTTPBase: v() });
    })();
})();
