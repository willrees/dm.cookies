(function($) {
	dm.globalComponentFactory("cookies", function($) {
		
		return {
			set: function (cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays*24*60*60*1000));
				var expires = "expires="+d.toUTCString();
				document.cookie = cname + "=" + cvalue + "; " + expires;
			},
			get: function (cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for(var i=0; i<ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1);
					if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
				}
				return undefined;
			},
			delete: function(cname) {
				document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			},
			enabled: function() {
				var result = false;
				
				this.set("cookietest", true, 1);
				var cookie = this.get("cookietest") !== undefined;
				
				if (cookie !== undefined && cookie === true) {
					result = true;
					this.delete("cookietest");
				}
				
				return result;
			}
		}
		
	}, null, []);
})(jQuery);