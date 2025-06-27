<template>
	<div>
		<Navbar @login-status-checked="onNavbarReady" />
		<SidePanel />
	</div>
</template>
<script>
	import Navbar from '../components/Navbar.vue'
	import SidePanel from '../components/SidePanel.vue'

	export default {

	  components: {
	    Navbar,
	    SidePanel
	  },

}
</script>