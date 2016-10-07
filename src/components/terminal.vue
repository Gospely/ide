<template>

	<div class="terminal-panel">
		<pre class="terminaljs" data-columns="80"></pre>
	</div>

</template>

<script>
	

	export default {

		ready () {

			var containers = document.getElementsByClassName('terminaljs'),
				socket = io('http://120.76.235.234:8888/pty'), term, stream;
			ss.forceBase64 = true;

			for(var i = 0; i < containers.length; i++) {
				containers[i].tabindex = 0;
				term = new Terminal(containers[i].dataset);
				stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});
				ss(socket).emit('new', stream, containers[i].dataset);
				if(containers[i].dataset.exec)
					stream.write(containers[i].dataset.exec + "\n");
				stream.pipe(term).dom(containers[i]).pipe(stream);
			}

		}

	}


</script>

<style>

	.terminaljs {
		background: black;
		color: white;
		font-family: Courier, monospace;
		display:inline-block;
		width: 100%;
		height: 100%;
	}

	.terminal-panel {
		width: 100%;
		height: calc(100% - 16px);
	}

	pre {
		margin: 0px;
	}

</style>
