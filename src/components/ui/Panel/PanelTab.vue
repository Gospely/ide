<template>

	<div class="panel-item" v-bind:class="{'active': active}">
		<slot></slot>
	</div>

</template>

<script>

	export default {

		props: {

			active: {
				type: Boolean,
				default () {
					return false;
				}
			}

		}

	}

</script>

<style>

</style>
