<template>
	<div id="main">
		<Navbar @login-status-checked="onNavbarReady" />
		<SidePanel />
		<div id = "container">
    		<Card v-for="card in cards" :imageUrl ="card.imageUrl" :post-id="card.postId" :title = "card.title"/>
    	</div>
	</div>
</template>
<script>
	import Navbar from '../components/Navbar.vue'
	import SidePanel from '../components/SidePanel.vue'
	import Card from '../components/Card.vue'
	import axiosObj from '../axios-config';

	export default {

	  components: {
	    Navbar,
	    SidePanel,
	    Card
	  },


	  data() {
	    return {
	      cards: [],
	      page: 1,
	      loading: true,
	    }
	  },

	  methods: {

	    async onNavbarReady() {
	      await this.fetchCards()
	    },

	    async fetchCards() {
	      try {
	        const response = await axiosObj.get('/gallery') 
	        this.cards = response.data
	        console.log(this.cards)

	        this.loading = false
	      } catch (err) {
	        console.error('Error fetching cards:', err)
	      }
	    },

	    async loadMoreCards() {
	      try {
	        const response = await axiosObj.get(`/gallery/${this.page}`)
	        const newCards = response.data.cards
	        this.cards.push(...newCards)
	        this.page++
	      } catch (err) {
	        console.error('Error loading more cards:', err)
	      }
	    }
	  }


}
</script>

<style scoped>

	#main{
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	#container{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: 90%;
		margin-top: 60px;
		gap: 3px;
	}


	@media (max-width: 767px) 
	{
		#container{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 60px;
		gap: 3px;
	}
	}

</style>