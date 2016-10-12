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
			},

			title: {
				type: String,
				default () {
					return ''
				}
			}
		}
	}

</script>

<style>

</style>
