<template>
  <div class="locations">
    <div v-for="(location, i) in locations" :key="i" class="location">
      <div class="location__image--container">
        <img class="location__image" :src="getCoverImage(location.pictures)">
        <div class="location__image--overlay" :style="`background:${location.colors[0]}`" />
      </div>
      <div class="location__content">
        <h2 class="location__title">{{ location.name }}</h2>
        <SfButton class="location__action" @click="goTo(location.slug)">Book Now</SfButton>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { SfButton } from '@storefront-ui/vue'
import { mapGetters, mapActions } from 'vuex'
import config from '../../config/local.json'

export default {
  name: 'Locations',
  components: {
    SfButton
  },
  beforeMount() {
    this.fetchLocations()
  },
  computed: {
    ...mapGetters({
      locations: 'getLocations'
    })
  },
  methods: {
    ...mapActions(['fetchLocations']),
    getRequiredImg(url) {
      return require(`@/assets/locations/${url}.jpg`)
    },
    getCoverImage(images) {
      const picture = images.find(image => image.cover === true)
      if (picture !== undefined) {
        console.log(config.api.url + picture.filePath)
        return config.api.url + picture.filePath
      }
    },
    goTo(link) {
      this.$router.push(this.$route.fullPath + '/' + link);
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.locations {
  padding: var(--spacer-lg);
  display: flex;
  flex-wrap: wrap;
}
.location {
  position: relative;
  max-width: 33.33%;
  max-height: 13rem;
  overflow: hidden;
  flex: 1 1 33.33%;
  &__image {
    width: 100%;
    &--container {
      position: relative;
      max-height: 12rem;
      margin: var(--spacer-sm) var(--spacer-xs);
    }
    &--overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      // background: rgba(0,0,0,.5);
      opacity: .5;
      top: 0;
      left: 0;
    }
  }
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__title {
    text-align: center;
    color: var(--c-white);
    font-family: var(--font-family-primary);
    font-size: 2.2rem;
    margin: 0 0 var(--spacer-lg);
    width: 20rem;
  }
  &__action {
    --button-background: var(--c-black);
    --button-font-size: var(--font-sm);
    --button-height: 3rem;
    --button-border-width: 1px;
    --button-border: solid var(--c-black);
    --button-box-shadow: none;
    margin: 0 auto;
    transition: .3s all ease;

    &:hover {
      --button-background: rgba(155, 155, 155, .25);
      --button-color: var(--c-black);
    }
  }
}
</style>
