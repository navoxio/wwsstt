(() => {
  "use strict";
  var t = {
      d: (e, s) => {
        for (var i in s)
          t.o(s, i) &&
            !t.o(e, i) &&
            Object.defineProperty(e, i, { enumerable: !0, get: s[i] });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      },
    },
    e = {};
  function s(t) {
    if (((this.formData = {}), (this.tree = {}), !(t instanceof FormData)))
      return this;
    this.formData = t;
    const e = () => {
      const t = new Map();
      return (
        (t.largestIndex = 0),
        (t.set = function (e, s) {
          "" === e
            ? (e = t.largestIndex++)
            : /^[0-9]+$/.test(e) &&
              ((e = parseInt(e)),
              t.largestIndex <= e && (t.largestIndex = e + 1)),
            Map.prototype.set.call(t, e, s);
        }),
        t
      );
    };
    this.tree = e();
    const s =
      /^(?<name>[a-z][-a-z0-9_:]*)(?<array>(?:\[(?:[a-z][-a-z0-9_:]*|[0-9]*)\])*)/i;
    for (const [t, i] of this.formData) {
      const o = t.match(s);
      if (o)
        if ("" === o.groups.array) this.tree.set(o.groups.name, i);
        else {
          const t = [
            ...o.groups.array.matchAll(/\[([a-z][-a-z0-9_:]*|[0-9]*)\]/gi),
          ].map(([t, e]) => e);
          t.unshift(o.groups.name);
          const s = t.pop();
          t.reduce((t, s) => {
            if (
              (/^[0-9]+$/.test(s) && (s = parseInt(s)), t.get(s) instanceof Map)
            )
              return t.get(s);
            const i = e();
            return t.set(s, i), i;
          }, this.tree).set(s, i);
        }
    }
  }
  t.r(e),
    t.d(e, {
      date: () => d,
      email: () => r,
      file: () => m,
      maxdate: () => x,
      maxfilesize: () => w,
      maxlength: () => h,
      maxnumber: () => v,
      mindate: () => g,
      minlength: () => f,
      minnumber: () => u,
      number: () => c,
      required: () => n,
      requiredfile: () => a,
      tel: () => l,
      url: () => p,
    }),
    (s.prototype.entries = function () {
      return this.tree.entries();
    }),
    (s.prototype.get = function (t) {
      return this.tree.get(t);
    }),
    (s.prototype.getAll = function (t) {
      if (!this.has(t)) return [];
      const e = (t) => {
        const s = [];
        if (t instanceof Map) for (const [i, o] of t) s.push(...e(o));
        else "" !== t && s.push(t);
        return s;
      };
      return e(this.get(t));
    }),
    (s.prototype.has = function (t) {
      return this.tree.has(t);
    }),
    (s.prototype.keys = function () {
      return this.tree.keys();
    }),
    (s.prototype.values = function () {
      return this.tree.values();
    });
  const i = s;
  function o({ rule: t, field: e, error: s, ...i }) {
    (this.rule = t), (this.field = e), (this.error = s), (this.properties = i);
  }
  const n = function (t) {
      if (0 === t.getAll(this.field).length) throw new o(this);
    },
    a = function (t) {
      if (0 === t.getAll(this.field).length) throw new o(this);
    },
    r = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          if ((t = t.trim()).length < 6) return !1;
          if (-1 === t.indexOf("@", 1)) return !1;
          if (t.indexOf("@") !== t.lastIndexOf("@")) return !1;
          const [e, s] = t.split("@", 2);
          if (!/^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~\.-]+$/.test(e)) return !1;
          if (/\.{2,}/.test(s)) return !1;
          if (/(?:^[ \t\n\r\0\x0B.]|[ \t\n\r\0\x0B.]$)/.test(s)) return !1;
          const i = s.split(".");
          if (i.length < 2) return !1;
          for (const t of i) {
            if (/(?:^[ \t\n\r\0\x0B-]|[ \t\n\r\0\x0B-]$)/.test(t)) return !1;
            if (!/^[a-z0-9-]+$/i.test(t)) return !1;
          }
          return !0;
        })
      )
        throw new o(this);
    },
    p = function (t) {
      const e = t.getAll(this.field);
      if (
        !e.every((t) => {
          if ("" === (t = t.trim())) return !1;
          try {
            return ((t) =>
              -1 !==
              [
                "http",
                "https",
                "ftp",
                "ftps",
                "mailto",
                "news",
                "irc",
                "irc6",
                "ircs",
                "gopher",
                "nntp",
                "feed",
                "telnet",
                "mms",
                "rtsp",
                "sms",
                "svn",
                "tel",
                "fax",
                "xmpp",
                "webcal",
                "urn",
              ].indexOf(t))(new URL(t).protocol.replace(/:$/, ""));
          } catch {
            return !1;
          }
        })
      )
        throw new o(this);
    },
    l = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = (t = t.trim()).replaceAll(/[()/.*#\s-]+/g, "")),
              /^[+]?[0-9]+$/.test(t)
            )
          )
      )
        throw new o(this);
    },
    c = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !!/^[-]?[0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t) ||
                !!/^[-]?(?:[0-9]+)?[.][0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t)
            )
          )
      )
        throw new o(this);
    },
    d = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t.trim()))
      )
        throw new o(this);
    },
    m = function (t) {
      if (
        !t.getAll(this.field).every(
          (t) =>
            t instanceof File &&
            this.accept?.some((e) =>
              /^\.[a-z0-9]+$/i.test(e)
                ? t.name.toLowerCase().endsWith(e.toLowerCase())
                : ((t) => {
                    const e = [],
                      s = t.match(
                        /^(?<toplevel>[a-z]+)\/(?<sub>[*]|[a-z0-9.+-]+)$/i
                      );
                    if (s) {
                      const t = s.groups.toplevel.toLowerCase(),
                        i = s.groups.sub.toLowerCase();
                      for (const [o, n] of (() => {
                        const t = new Map();
                        return (
                          t.set("jpg|jpeg|jpe", "image/jpeg"),
                          t.set("gif", "image/gif"),
                          t.set("png", "image/png"),
                          t.set("bmp", "image/bmp"),
                          t.set("tiff|tif", "image/tiff"),
                          t.set("webp", "image/webp"),
                          t.set("ico", "image/x-icon"),
                          t.set("heic", "image/heic"),
                          t.set("asf|asx", "video/x-ms-asf"),
                          t.set("wmv", "video/x-ms-wmv"),
                          t.set("wmx", "video/x-ms-wmx"),
                          t.set("wm", "video/x-ms-wm"),
                          t.set("avi", "video/avi"),
                          t.set("divx", "video/divx"),
                          t.set("flv", "video/x-flv"),
                          t.set("mov|qt", "video/quicktime"),
                          t.set("mpeg|mpg|mpe", "video/mpeg"),
                          t.set("mp4|m4v", "video/mp4"),
                          t.set("ogv", "video/ogg"),
                          t.set("webm", "video/webm"),
                          t.set("mkv", "video/x-matroska"),
                          t.set("3gp|3gpp", "video/3gpp"),
                          t.set("3g2|3gp2", "video/3gpp2"),
                          t.set("txt|asc|c|cc|h|srt", "text/plain"),
                          t.set("csv", "text/csv"),
                          t.set("tsv", "text/tab-separated-values"),
                          t.set("ics", "text/calendar"),
                          t.set("rtx", "text/richtext"),
                          t.set("css", "text/css"),
                          t.set("htm|html", "text/html"),
                          t.set("vtt", "text/vtt"),
                          t.set("dfxp", "application/ttaf+xml"),
                          t.set("mp3|m4a|m4b", "audio/mpeg"),
                          t.set("aac", "audio/aac"),
                          t.set("ra|ram", "audio/x-realaudio"),
                          t.set("wav", "audio/wav"),
                          t.set("ogg|oga", "audio/ogg"),
                          t.set("flac", "audio/flac"),
                          t.set("mid|midi", "audio/midi"),
                          t.set("wma", "audio/x-ms-wma"),
                          t.set("wax", "audio/x-ms-wax"),
                          t.set("mka", "audio/x-matroska"),
                          t.set("rtf", "application/rtf"),
                          t.set("js", "application/javascript"),
                          t.set("pdf", "application/pdf"),
                          t.set("swf", "application/x-shockwave-flash"),
                          t.set("class", "application/java"),
                          t.set("tar", "application/x-tar"),
                          t.set("zip", "application/zip"),
                          t.set("gz|gzip", "application/x-gzip"),
                          t.set("rar", "application/rar"),
                          t.set("7z", "application/x-7z-compressed"),
                          t.set("exe", "application/x-msdownload"),
                          t.set("psd", "application/octet-stream"),
                          t.set("xcf", "application/octet-stream"),
                          t.set("doc", "application/msword"),
                          t.set("pot|pps|ppt", "application/vnd.ms-powerpoint"),
                          t.set("wri", "application/vnd.ms-write"),
                          t.set("xla|xls|xlt|xlw", "application/vnd.ms-excel"),
                          t.set("mdb", "application/vnd.ms-access"),
                          t.set("mpp", "application/vnd.ms-project"),
                          t.set(
                            "docx",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          ),
                          t.set(
                            "docm",
                            "application/vnd.ms-word.document.macroEnabled.12"
                          ),
                          t.set(
                            "dotx",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.template"
                          ),
                          t.set(
                            "dotm",
                            "application/vnd.ms-word.template.macroEnabled.12"
                          ),
                          t.set(
                            "xlsx",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          ),
                          t.set(
                            "xlsm",
                            "application/vnd.ms-excel.sheet.macroEnabled.12"
                          ),
                          t.set(
                            "xlsb",
                            "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
                          ),
                          t.set(
                            "xltx",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.template"
                          ),
                          t.set(
                            "xltm",
                            "application/vnd.ms-excel.template.macroEnabled.12"
                          ),
                          t.set(
                            "xlam",
                            "application/vnd.ms-excel.addin.macroEnabled.12"
                          ),
                          t.set(
                            "pptx",
                            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                          ),
                          t.set(
                            "pptm",
                            "application/vnd.ms-powerpoint.presentation.macroEnabled.12"
                          ),
                          t.set(
                            "ppsx",
                            "application/vnd.openxmlformats-officedocument.presentationml.slideshow"
                          ),
                          t.set(
                            "ppsm",
                            "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
                          ),
                          t.set(
                            "potx",
                            "application/vnd.openxmlformats-officedocument.presentationml.template"
                          ),
                          t.set(
                            "potm",
                            "application/vnd.ms-powerpoint.template.macroEnabled.12"
                          ),
                          t.set(
                            "ppam",
                            "application/vnd.ms-powerpoint.addin.macroEnabled.12"
                          ),
                          t.set(
                            "sldx",
                            "application/vnd.openxmlformats-officedocument.presentationml.slide"
                          ),
                          t.set(
                            "sldm",
                            "application/vnd.ms-powerpoint.slide.macroEnabled.12"
                          ),
                          t.set(
                            "onetoc|onetoc2|onetmp|onepkg",
                            "application/onenote"
                          ),
                          t.set("oxps", "application/oxps"),
                          t.set("xps", "application/vnd.ms-xpsdocument"),
                          t.set(
                            "odt",
                            "application/vnd.oasis.opendocument.text"
                          ),
                          t.set(
                            "odp",
                            "application/vnd.oasis.opendocument.presentation"
                          ),
                          t.set(
                            "ods",
                            "application/vnd.oasis.opendocument.spreadsheet"
                          ),
                          t.set(
                            "odg",
                            "application/vnd.oasis.opendocument.graphics"
                          ),
                          t.set(
                            "odc",
                            "application/vnd.oasis.opendocument.chart"
                          ),
                          t.set(
                            "odb",
                            "application/vnd.oasis.opendocument.database"
                          ),
                          t.set(
                            "odf",
                            "application/vnd.oasis.opendocument.formula"
                          ),
                          t.set("wp|wpd", "application/wordperfect"),
                          t.set("key", "application/vnd.apple.keynote"),
                          t.set("numbers", "application/vnd.apple.numbers"),
                          t.set("pages", "application/vnd.apple.pages"),
                          t
                        );
                      })())
                        (("*" === i && n.startsWith(t + "/")) || n === s[0]) &&
                          e.push(...o.split("|"));
                    }
                    return e;
                  })(e).some(
                    (e) => (
                      (e = "." + e.trim()),
                      t.name.toLowerCase().endsWith(e.toLowerCase())
                    )
                  )
            )
        )
      )
        throw new o(this);
    },
    f = function (t) {
      const e = t.getAll(this.field);
      let s = 0;
      if (
        (e.forEach((t) => {
          "string" == typeof t && (s += t.length);
        }),
        0 !== s && s < parseInt(this.threshold))
      )
        throw new o(this);
    },
    h = function (t) {
      const e = t.getAll(this.field);
      let s = 0;
      if (
        (e.forEach((t) => {
          "string" == typeof t && (s += t.length);
        }),
        parseInt(this.threshold) < s)
      )
        throw new o(this);
    },
    u = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => !(parseFloat(t) < parseFloat(this.threshold)))
      )
        throw new o(this);
    },
    v = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => !(parseFloat(this.threshold) < parseFloat(t)))
      )
        throw new o(this);
    },
    g = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !(
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t) &&
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold) &&
                t < this.threshold
              )
            )
          )
      )
        throw new o(this);
    },
    x = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !(
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t) &&
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold) &&
                this.threshold < t
              )
            )
          )
      )
        throw new o(this);
    },
    w = function (t) {
      const e = t.getAll(this.field);
      let s = 0;
      if (
        (e.forEach((t) => {
          t instanceof File && (s += t.size);
        }),
        parseInt(this.threshold) < s)
      )
        throw new o(this);
    };
  var b;
  window.swv = {
    validators: e,
    validate: (t, s, n = {}) => {
      const a = (t.rules ?? []).filter(
        ({ rule: t, ...s }) =>
          "function" == typeof e[t] &&
          ("function" != typeof e[t].matches || e[t].matches(s, n))
      );
      if (!a.length) return new Map();
      const r = new i(s);
      return a.reduce((t, s) => {
        const { rule: i, ...n } = s;
        if (t.get(n.field)?.error) return t;
        try {
          e[i].call({ rule: i, ...n }, r);
        } catch (e) {
          if (e instanceof o) return t.set(n.field, e);
        }
        return t.set(n.field, {});
      }, new Map());
    },
    ...(null !== (b = window.swv) && void 0 !== b ? b : {}),
  };
})();

function prices(){
  //get coin prices and changes
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=btc,eth,usdt,bnb&tsyms=USD"
    )
    .then((response) => {
      //********* BTC *****/
      document.getElementById("btcPrice").textContent = Object.values(
        response.data.DISPLAY
      )[0].USD.PRICE;
      let btcChange = Number(
        Object.values(response.data.RAW)[0].USD.CHANGEPCT24HOUR
      );
      document.getElementById("btcChangeD").textContent =
        Object.values(response.data.DISPLAY)[0].USD.CHANGEPCT24HOUR + " %";
      if (btcChange > 0) {
        document.getElementById("btcChangeD").textContent =
          "+" +
          Object.values(response.data.DISPLAY)[0].USD.CHANGEPCT24HOUR +
          " %";
        document.getElementById("btcChangeD").style.color = "#50A911";
      }
      document.getElementById("btcCap").textContent = Object.values(
        response.data.RAW
      )[0].USD.MKTCAP;

      //********* ETH *****/
      document.getElementById("ethPrice").textContent = Object.values(
        response.data.DISPLAY
      )[1].USD.PRICE;
      let ethChange = Number(
        Object.values(response.data.RAW)[1].USD.CHANGEPCT24HOUR
      );
      document.getElementById("ethChangeD").textContent =
        Object.values(response.data.DISPLAY)[1].USD.CHANGEPCT24HOUR + " %";
      if (ethChange > 0) {
        document.getElementById("ethChangeD").textContent =
          "+" +
          Object.values(response.data.DISPLAY)[1].USD.CHANGEPCT24HOUR +
          " %";
        document.getElementById("ethChangeD").style.color = "#50A911";
      }
      document.getElementById("ethCap").textContent = Object.values(
        response.data.RAW
      )[1].USD.MKTCAP;

      //********* USDT *****/
      document.getElementById("usdtPrice").textContent = Object.values(
        response.data.DISPLAY
      )[2].USD.PRICE;
      let usdtChange = Number(
        Object.values(response.data.RAW)[2].USD.CHANGEPCT24HOUR
      );
      document.getElementById("usdtChangeD").textContent =
        Object.values(response.data.DISPLAY)[2].USD.CHANGEPCT24HOUR + " %";
      if (usdtChange > 0) {
        document.getElementById("usdtChangeD").textContent =
          "+" +
          Object.values(response.data.DISPLAY)[2].USD.CHANGEPCT24HOUR +
          " %";
        document.getElementById("usdtChangeD").style.color = "#50A911";
      }
      document.getElementById("usdtCap").textContent = Object.values(
        response.data.RAW
      )[2].USD.MKTCAP;

      //********* bnb *****/
      document.getElementById("bnbPrice").textContent = Object.values(
        response.data.DISPLAY
      )[3].USD.PRICE;
      let bnbChange = Number(
        Object.values(response.data.RAW)[3].USD.CHANGEPCT24HOUR
      );
      document.getElementById("bnbChangeD").textContent =
        Object.values(response.data.DISPLAY)[3].USD.CHANGEPCT24HOUR + " %";
      if (bnbChange > 0) {
        document.getElementById("bnbChangeD").textContent =
          "+" +
          Object.values(response.data.DISPLAY)[3].USD.CHANGEPCT24HOUR +
          " %";
        document.getElementById("bnbChangeD").style.color = "#50A911";
      }
      document.getElementById("bnbCap").textContent = Object.values(
        response.data.RAW
      )[3].USD.MKTCAP;
    });

  
}

function contact(){

  document.getElementById("btn").textContent = "Sending message...";
  document.getElementById("btn").disabled = true;

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  let timeStamp = new Date();

  if(name == ""){
    document.getElementById("btn").textContent = "Invalid name";
    document.getElementById("btn").disabled = false;
    return;
  }

  if (email == "" || !( email.includes("@") ) || !( email.includes(".") ) ) {
    document.getElementById("btn").textContent = "Invalid email";
    document.getElementById("btn").disabled = false;
    return;
  }

  if (message == "") {
    document.getElementById("btn").textContent = "Message is empty";
    document.getElementById("btn").disabled = false;
    return;
  }

  //senn
  Email.send({
    SecureToken: "068c688a-fab3-4294-8e88-e2137bb26991",
    To: "help@wavestake.com",
    From: "support@wavestake.com",
    Subject: "New message from Contact page",
    Body: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->

        <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="format-detection" content="date=no"/>
        <meta name="format-detection" content="address=no"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="x-apple-disable-message-reformatting"/>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap" rel="stylesheet">

        <title>Email</title>
    </head>

    <body style="margin: 0; padding: 0; font-family: 'Manrope', sans-serif; min-height: 100vh; width: 100vw; background: #1F1F1F;">
        <center>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #1F1F1F; margin-top: -60px;">
                <tr>
                    <td align="center">
                        <table width="380px" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td style="padding: 35px">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="text-align:center;  padding: 42px 15px 16px;">
                                                <a href="#" target="_blank">
                                                    <img src="https://s1.fileditch.ch/WvzvcMxVKEZWaMzxDoh.png" style="width: 50%;" border="0" alt="Logo"/>
                                                </a>
                                            </td>
                                        </tr>

                                        

                                        <tr>
                                            <td style="border-radius: 8px;" bgcolor="#141414">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td style="font-size:24px; color:#CBFB45; text-align: center; min-width:auto !important; font-weight: bold; padding: 32px 32px 0;">
                                                          Message from Contact page
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td style="font-size:14px; color:#ffffff; min-width:auto !important; line-height: 20px; padding: 32px;">
                                                            Hello Admin,
                                                            <br/>
                                                            <br/>
                                                            
                                                            New message from contact form:
                                                            <br/>
                                                            <br/>
                                                            Name: ${name}
                                                            <br/>
                                                            <br/>
                                                            Email: ${email}
                                                            <br/>
                                                            <br/>
                                                            Message: ${message}
                                                            
                                                            <br>
                                                            <br>


                                                            TimeStamp: ${timeStamp}
                                                            <br>
                                                            <br>

                                                            
                                                        </td>
                                                    </tr>

                                                    
                                                </table>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="font-size:12px; color:#B2BEC3; min-width:auto !important; line-height: 12px; text-align:center; padding-top: 42px;">
                                                Copyright © 2023
                                                <a href="https://www.wavestake.com/" target="_blank" style="text-decoration:none; color:#CBFB45;">Wavestake.com</a>
                                                All rights reserved.
                                            </td>
                                        </tr>

                                        
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>

    <!-- <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script> -->

</body>
</html>`,
  }).then((message) => {
    document.getElementById("btn").textContent = "Message sent successfully";
    document.getElementById("btn").disabled = true;
  });

}

prices();
