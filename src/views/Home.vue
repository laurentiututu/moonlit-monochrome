<template>
  <div class="home">
    <div class="background max-size">
      <div class="welcome">
        <div class="title__container">
          <span class="title__note">established in 1989</span>
          <h1 class="title__main">8 salons</h1>
          <p class="title__subtitle">across colorado</p>
          <div class="divider" />
          <p class="title__info">{{ info }}</p>
          <div class="title__actions">
            <SfButton class="title__actions--primary" @click="goTo('/locations')">Find a location</SfButton>
            <SfButton class="title__actions--secondary sf-button--outline" @click="goTo('/locations')">Book Online</SfButton>
          </div>
        </div>
        <img class="logo-minimal" src="@/assets/mxm-logo-minimal.png">
      </div>
    </div>
    <div class="section">
      <div class="services">
        <div class="services__service">
          <h2>Our services</h2>
          <SfTable class="services__table">
            <SfTableHeading>
              <SfTableHeader>Service</SfTableHeader>
              <SfTableHeader>Price</SfTableHeader>
            </SfTableHeading>
            <SfTableRow v-for="(service, i) in services" :key="i">
              <SfTableData>
                {{ service.name }}
              </SfTableData>
              <SfTableData>
                {{ service.price + ' Lei' }}
              </SfTableData>
            </SfTableRow>
          </SfTable>
        </div>
        <div class="services__service">
          <div class="services__service--info">
            <h3>Exceptional Service</h3>
            <p>{{ exceptionalService }}</p>
            <SfButton @click="$router.push('/team')">Meet our team</SfButton>
          </div>
        </div>
      </div>
      <div class="services__display">
        <div class="services__display--overlay" />
        <div class="services__display--content">
          <div class="services__display--image">
            <img src="@/assets/salon-work.jpg">
          </div>
          <div class="services__display--quote">
            <p>"Giving people the freedom to create their vision of their best self is my idea of success."</p>
            <span>Gene Cahill - The Parlour Owner</span>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="services__display">
        <div class="services__display--overlay" />
        <div class="services__display--content">
          <div class="services__display--image">
            <img src="@/assets/salon-work.jpg">
          </div>
          <div class="services__display--quote">
            <p>"Giving people the freedom to create their vision of their best self is my idea of success."</p>
            <span>Gene Cahill - The Parlour Owner</span>
          </div>
        </div>
      </div>
      <div class="services">
        <div class="services__service">
          <div class="services__service--info">
            <h3>RENOWNED EDUCATION</h3>
            <p>{{ renownedEducation }}</p>
            <SfButton>Learn More</SfButton>
          </div>
        </div>
      </div>
    </div>

    <div class="partnerSection">
      <h3 class="sectionTitle">Our Partners</h3>
      <SfCarousel
        class="m-product-carousel"
        :settings="sliderSettings"
      >
        <SfCarouselItem v-for="(partner, i) in partners" :key="i">
          <SfImage class="autoCenter" :src="partner.image" />
        </SfCarouselItem>
      </SfCarousel>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { SfButton, SfTable, SfImage, SfCarousel } from '@storefront-ui/vue'
import axios from 'axios'
import config from '../../config/local.json'
export default {
  name: 'Home',
  components: {
    // HelloWorld
    SfButton,
    SfTable,
    SfImage,
    SfCarousel
  },
  data () {
    return {
      sliderSettings: {
        type: 'carousel',
        rewind: true,
        autoplay: 3000,
        perView: 5,
        slidePerPage: false,
        gap: 50,
        focusAt: 'center'
      },
      partners: [
        {
          image: require('@/assets/partners/american-crew.png')
        },
        {
          image: require('@/assets/partners/brazilian-blowout.png')
        },
        {
          image: require('@/assets/partners/k18.png')
        },
        {
          image: require('@/assets/partners/kerastase.png')
        },
        {
          image: require('@/assets/partners/leaf-and-flower.webp')
        },
        {
          image: require('@/assets/partners/r-and-co.png')
        },
        {
          image: require('@/assets/partners/wella.png')
        }
      ],
      info: 'Since 1989, The Parlour Hair Salon has committed to the highest level of quality in the salon industry. We are locally owned and grown in Colorado.',
      exceptionalService: 'Beginning in Boulder, Colorado, The Parlour has cultivated an environment rich with education and opportunities for the team to thrive. With additional locations in Lower Downtown Denver, West Highlands Denver, Washington Park Denver, Flatirons, Fort Collins, Capitol Hill, and RiNo, The Parlour hair salons are dedicated to providing exceptional service.',
      renownedEducation: 'Advanced education is at the forefront of The Parlour’s philosophy. Our education program covers all aspects of advanced hairdressing as well as customer service, communication, goal setting, and client building. These tools are designed to set our team up for complete success behind the chair. The Parlour is consistently revisiting our curriculum to keep it modern and forward-thinking. Several events are also hosted throughout the year featuring world-renowned guest artists to continue our team’s education.',
      services: []
    }
  },
  mounted () {
    this.getServices()
  },
  methods: {
    getImgUrl(pic) {
      return require(pic)
    },
    goTo(link) {
      this.$router.push(link);
    },
    getServices () {
      axios
      .get(config.api.url + config.services.all_endpoint)
      .then(res => {
        this.services = res.data.data.services
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.background {
  background: #c7b99f;
}
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.max-size {
  max-width: 100vw;
  height: 100vh;
}
.logo-minimal {
  max-width: 10rem;
}
.title {
  &__container {
    text-transform: uppercase;
    text-align: left;
    width: 50%;
  }
  &__note {
    font-family: var(--font-family-primary);
    font-size: var(--font-base);
    font-weight: var(--font-medium);
  }
  &__main {
    margin: var(--spacer-sm) 0 var(--spacer-xs);
    font-size: 7rem;
    font-family: var(--font-family-secondary);
    font-weight: var(--font-semibold);
    line-height: 1;
    color: var(--c-black);
  }
  &__subtitle {
    margin: 0;
    font-family: var(--font-family-secondary);
    font-weight: var(--font-semibold);
    font-size: 3.36rem;
    color: var(--c-black);
  }
  &__info {
    margin: 0;
    line-height: 1.6;
    font-family: var(--font-family-secondary);
    text-transform: none;
    font-size: var(--font-base);
    max-width: 36rem;
  }
  &__actions {
    display: flex;
    width: 60%;
    justify-content: space-between;
    margin: var(--spacer-sm) 0;
    --button-border: solid var(--c-primary);
    --button-border-width: 1px;
    --button-font-size: var(--font-sm);
    &--primary {
      transition: all .25s ease;
      --button-box-shadow: none;
      --button-color: var(--c-white);
      --button-width: 14rem;
      &:hover {
        --button-background: transparent;
        --button-color: var(--c-primary);
      }
    }
    &--secondary {
      transition: all .25s ease;
      --button-box-shadow: none;
      --button-border-width: 1px;
      --button-color: var(--c-primary);
      &:hover {
        --button-background: var(--c-primary);
        --button-color: var(--c-white);
      }
    }
  }
}
.divider {
  width: 60%;
  height: 15px;
  background: #7b6d53;
  margin: var(--spacer-lg) 0;
}

.section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacer-2xl) 0;
}
.services {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 var(--spacer-xl);
  height: 70rem;
  // align-items: center;

  &__service {
    h2 {
      margin: 0 0 var(--spacer-lg) 0;
      font-family: var(--font-family-primary);
      font-weight: var(--font-medium);
      font-size: 1.5rem;
      text-transform: uppercase;
    }
    &--info {
      padding: 4rem;
      background: var(--c-text);
      color: var(--c-white);
      --button-background: #7b6d53;
      h3 {
        margin: 0 0 var(--spacer-lg) 0;
        font-family: var(--font-family-primary);
        text-transform: uppercase;
        font-weight: var(--font-light);
        font-size: 1.55rem;
      }
      p {
        line-height: 1.6;
        font-size: var(--font-lg);
        font-weight: var(--font-light);
      }
    }
  }
  &__table {
    --table-heading-background: var(--c-text);
    --table-header-color: var(--c-white);
    --table-header-font-weight: var(--font-bold);
    --table-row-padding: var(--spacer-2xs) var(--spacer-sm);

    &::v-deep .sf-table__row {
      --table-row-background: #e0dfdf;
      &:nth-child(odd) {
        --table-row-background: #ededed;
      }
    }
  }

  &__display {
    flex: 1 1 60%;
    background: url('~@/assets/salon-equipment.jpg');
    width: 60%;
    height: 70rem;
    background-size: cover;
    background-position-x: center;
    position: relative;

    &--overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0, .5);
    }
    &--content {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    &--image {
      max-width: 80%;
      max-height: 80%;
      overflow: hidden;

      img {
        max-width: 100%;
      }
    }
    &--quote {
      max-width: 80%;
      margin-top: var(--spacer-xl);
      color: var(--c-white);
      p {
        font-size: var(--font-xl);
        border-left: 2px solid #7b6d53;
        padding-left: var(--spacer-lg);
      }
    }
  }
}
.sectionTitle {
  margin: 0 0 var(--spacer-lg) 0;
  font-weight: var(--font-light);
  font-family: var(--font-family-primary);
  text-align: center;
  text-transform: uppercase;
  font-size: var(--font-xl);
}
.partnerSection {
  padding: var(--spacer-2xl) 0;
}
</style>
