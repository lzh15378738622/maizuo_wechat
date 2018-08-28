function n() {
  wx.getNetworkType({
    success: function (n) {
      y.networkType = n.networkType
    }
  })
}

function e() {
  wx.getSystemInfo({
    success: function (n) {
      y.systemInfo = n
    }
  })
}

function o() {
  wx.getLocation({
    type: "wgs84",
    success: function (n) {
      y.locationInfo = n
    }
  })
}

function t() {
  wx.getUserInfo({
    success: function (n) {
      y.userInfo = n.userInfo
    }
  })
}

function r() {
  var n = getCurrentPages();
  if (n.length) return n[n.length - 1]
}

function s(n) {
  d.push(n), d.length > 20 && d.shift()
}

function i(n, e, o) {
  var t = n[e];
  n[e] = function (n) {
    return o.call(this, n), t && t.call(this, n)
  }
}

function u(r) {
  var i = {
    type: "function",
    time: h(),
    belong: "App",
    method: "onLaunch",
    path: r.path,
    query: r.query,
    scene: r.scene
  };
  n(), l.setSystemInfo && e(), l.setLocation && o(), l.setUserInfo && t(), s(i)
}

function c(n) {
  y.scene = n.scene;
  var e = {
    type: "function",
    time: h(),
    belong: "App",
    method: "onShow",
    path: n.path,
    query: n.query,
    scene: n.scene
  };
  s(e)
}

function a() {
  var n = {
    type: "function",
    time: h(),
    belong: "App",
    method: "onHide",
    route: v.route,
    options: v.options
  };
  s(n)
}

function f(n, e) {
  var o = n[e];
  n[e] = function () {
    "onLoad" !== e && "onShow" !== e || (v = r());
    var n = {
      type: "function",
      time: h(),
      belong: "Page",
      method: e,
      route: v && v.route,
      options: v && v.options
    };
    return "onLoad" === e && (n.args = arguments), l.monitorMethodArguments && !S.includes(e) && (n.args = arguments), p(e) && s(n), o && o.apply(this, arguments)
  }
}

function p(n) {
  var e = l.methodWhitelist,
    o = l.methodBlacklist;
  return "onPageScroll" !== n && (e && e.length ? Boolean(e.includes(n)) : !o || !o.length || Boolean(!o.includes(n)))
}

function h() {
  return (new Date).getTime()
}
var l = {
  silent: !1
},
  g = 5,
  m = "0.1.3",
  y = {
    notifierVersion: m
  },
  d = [];
l.notifyError = function (n) {
  if (l.apikey && n && g && !l.silent) {
    g-- , y.apikey = l.apikey, y.releaseStage = l.releaseStage || "production", y.appVersion = l.appVersion, y.metaData = l.metaData, l.systemInfo && (y.systemInfo = l.systemInfo), l.userInfo && (y.userInfo = l.userInfo), y.breadcrumbs = d, y.error = n, y.time = h();
    wx.request({
      url: "https://fundebug.com/wxjs/",
      method: "POST",
      data: y
    })
  }
};
var w = {
  onLaunch: u,
  onShow: c,
  onHide: a,
  onError: l.notifyError
},
  I = App;
App = function (n) {
  Object.keys(w).forEach(function (e) {
    i(n, e, w[e])
  }), I(n)
};
var v = {},
  S = ["onLoad", "onShow", "onReady", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage"],
  b = Page;
Page = function (n) {
  S.forEach(function (e) {
    n[e] && f(n, e)
  }), l.monitorMethodCall && Object.keys(n).forEach(function (e) {
    "function" != typeof n[e] || S.includes(e) || f(n, e)
  }), b(n)
}, module.exports = l;