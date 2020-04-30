(function() {
function UnbounceAnalytics(commands) {
  this.trackingUrl =
    ('https:' == document.location.protocol ? 'https://' : 'http://') +
    "t.unbounce.com/trk"+"?";
  this.commands = commands;
  this.visitorId = null;
  this.pageId = null;
}

UnbounceAnalytics.prototype.setAccount = function(account) {
    this.appendParam('a', account);
};

UnbounceAnalytics.prototype.trackGoal = function(goal) {
  this.track('g', goal);
};

UnbounceAnalytics.prototype.track = function(action, value) {
  this.addVisitorId();
  this.addExcludedPageId();
  if (this.visitorId != null) {
      this.appendParam(action, value);
      var script = document.createElement("script");
      script.src=this.trackingUrl;
      script.type="text/javascript";
      script.async=true;
      document.body.appendChild(script);
  }
};

UnbounceAnalytics.prototype.addExcludedPageId = function() {
    var pageCookie = this.getCookieValue('ubpv');
    if (pageCookie != null && this.pageId == null) {
        var cookieValues = unescape(pageCookie).split(",");
        if(cookieValues.length > 1) {
            this.pageId = cookieValues[1];
            this.appendParam('xp', this.pageId);
        }
    }
}

UnbounceAnalytics.prototype.addVisitorId = function() {
  this.visitorId = this.getCookieValue('ubvt');
  if (this.visitorId != null) {
    this.appendParam('v', this.visitorId);
  }
};

UnbounceAnalytics.prototype.appendParam = function(name, value) {
  if (this.haveSomeParamsAlready()) {
    this.trackingUrl = this.trackingUrl + "&";
  }
  this.trackingUrl = this.trackingUrl + name + "=" + value;
};

UnbounceAnalytics.prototype.execCommand = function(command) {
  var command_code = this.toCode(command);
  eval(command_code);
};

UnbounceAnalytics.prototype.getCookieValue = function(cookieName) {
  var cookies = document.cookie;
  var cookieValue = null;
  var pos = cookies.indexOf(cookieName + '=');
  if (pos > -1) {
    var start = pos + cookieName.length + 1;
    var end = cookies.indexOf(';', start);
    end = end > -1 ? end : cookies.length;
    cookieValue = cookies.substring(start, end);
  }
  return cookieValue;
};

UnbounceAnalytics.prototype.haveSomeParamsAlready = function() {
  return this.trackingUrl.charAt(this.trackingUrl.length-1) != "?";
};

UnbounceAnalytics.prototype.toCode = function(command) {
  return "this." + command[0] + "('" + command[1] + "')";
};

UnbounceAnalytics.prototype.execCommands = function() {
  if (this.commands != null) {
    for(var i = 0; i < this.commands.length; i++) {
      this.execCommand(this.commands[i]);
    }
  }
};

ua = new UnbounceAnalytics(_ubaq);
ua.execCommands();

}) ();
