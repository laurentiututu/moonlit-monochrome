<template>
	<div class="header" :class="{'header__background': currentRoute}">
		<img class="logo" :src="logo" @click="goTo('/')">
		<div class="actions">
			<div class="actions__buttons">
				<SfButton
					v-for="(button, i) in buttons"
					:key="i"
					class="actions__buttons--button"
					@click="goTo(button.link)"
				>
				{{ button.title }}
				</SfButton>
			</div>
			<div class="actions__socials" @click="setMyAccount()">
				<SfIcon
                	key="profile"
                	icon="profile"
                	size="20px"
                	color="black"
              	/>
				<!-- <img class="actions__socials--social" src="@/assets/socials/facebook.svg"> -->
				<!-- <img class="actions__socials--social" src="@/assets/socials/instagram.svg"> -->
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { SfButton, SfIcon } from '@storefront-ui/vue';

export default {
	components: {
		SfButton,
		SfIcon
	},
	data () {
		return {
			logo: require('@/assets/mxm-logo.png'),
			buttons: [
				{
					title: 'Book Online',
					link: '/locations'
				},
				{
					title: 'Locations',
					link: '/locations'
				},
				{
					title: 'Our Team',
					link: '/team'
				},
				{
					title: 'Services',
					link: '/'
				},
				{
					title: 'Weddings',
					link: '/weddings'
				}
			]
		}
	},
	computed: {
		currentRoute() {
			if (this.$route.name === 'Home') {
				return true
			} else {
				return false
			}
		},
		...mapGetters({
			locations: 'getLocations'
		})
	},
	methods: {
		...mapActions({
			fetchLocations: 'fetchLocations'
		}),
		goTo(link) {
			this.$router.push(link);
		},
		getLocations () {
			console.log(this.locations)
		},
		setMyAccount () {
			this.$router.push('/my-account')
		}
	},
	beforeMount () {
		this.fetchLocations()
	}
}
</script>
<style lang="scss" scoped>
.header {
	display: flex;
    justify-content: space-between;
    padding: var(--spacer-sm) var(--spacer-lg);
    &__background {
   		background: #c7b99f;
    }
	
	.logo {
		max-width: 13rem;
		cursor: pointer;
	}
}
.actions {
	display: flex;

	&__buttons {
		display: flex;
		justify-content: space-between;

		&--button {
			--button-background: var(--c-text);
			--button-font-size: var(--font-sm);
			--button-font-weight: var(--font-semibold);
			--button-padding: var(--spacer-xs) var(--spacer-base);
			--button-height: var(--spacer-xl);
			--button-box-shadow: none;
			--button-border: solid var(--c-text);
			--button-border-width: 1px;
			transition: all .25s ease;
			&:hover {
				--button-background: transparent;
				--button-color: var(--c-text);
			}
			&:not(:first-child) {
				--button-background: transparent;
				--button-color: var(--c-text);
				--button-border: none;
				--button-font-weight: var(--font-semibold);
				&:hover {
					--button-color: var(--c-primary);
				}
			}
		}
	}
	&__socials {
		width: 3rem;
		display: flex;
		justify-content: space-between;
		margin-left: var(--spacer-sm);
		align-items: center;
		cursor: pointer;
		&--social {
			max-width: 1rem;
			cursor: pointer;
		}
	}
}
</style>