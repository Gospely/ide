export default {
    /**
     * 简单通知窗口
     */
    alert (msg, type) {
		window.noty = window.noty || [];

		var current = window.noty.length - 1;

    	type = type || 'success';
		var timestamp = Date.parse(new Date());
		var body = document.body;
		var div = document.createElement("div");
		div.className = "ui-snackbar ui-snackbar-toggle-transition notification noty animated bounceIn is-" + type;
		div.id = 'noty-' + timestamp;
		// div.innerHTML = "<button onclick='javascript:var noty=document.getElementById(\"noty-" + timestamp + "\");noty.className=\"notification noty animated bounceOut is-" + type + " \";window.noty.splice(" + current + ", 1);setTimeout(function() {noty.parentNode.removeChild(noty)}, 2000)' class='delete'></button>" + msg;
		div.innerHTML = msg;
		window.noty.push(div);
		body.appendChild(div);

		setTimeout(function() {
			div.className = "ui-snackbar ui-snackbar-toggle-transition notification noty animated bounceOut is-" + type;
			window.noty.splice(current, 1);
			setTimeout(function() {
				div.parentNode.removeChild(div);
			}, 2000)
		}, 2000);
    },

    error (msg) {
    	this.alert(msg, 'danger');
    },

    pin: function(data) {
    	if(data.code != 200) {
    		this.alert(data.message);
    	}
    }

}
