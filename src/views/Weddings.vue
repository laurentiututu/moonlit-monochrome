<template>
  <div class="home">
    <div class="background max-size">
      <div class="overlayWedding" />
      <div class="welcome">
        <div class="title__container">
          <span class="title__note">The Parlour</span>
          <h1 class="title__main">Weddings</h1>
          <!-- <p class="title__subtitle">across colorado</p> -->
          <div class="divider" />
          <p class="title__info">{{ info }}</p>
          <div class="title__actions">
            <SfButton class="title__actions--primary" @click="goTo('/locations')">Wedding Services</SfButton>
            <SfButton class="title__actions--secondary sf-button--outline" @click="goTo('/locations')">Contact Us</SfButton>
          </div>
        </div>
        <img class="logo-minimal" src="@/assets/the-parlour-p.svg">
      </div>
    </div>
    <div class="section">
      <div class="services">
        <div class="services__service">
          <h2>Our wedding services</h2>
          <SfTable class="services__table">
            <SfTableHeading>
              <SfTableHeader>Service</SfTableHeader>
              <SfTableHeader>Price</SfTableHeader>
            </SfTableHeading>
            <SfTableRow v-for="(item, i) in services" :key="i">
              <SfTableData>
                {{ item.service }}
              </SfTableData>
              <SfTableData>
                {{ item.price }}
              </SfTableData>
            </SfTableRow>
          </SfTable>
        </div>
        <div class="services__service">
          <div class="services__service--info">
            <h3>Traveling Fees</h3>
            <p>$100 more per service.</p>
            <p>$1 per mile, per stylist, each way.</p>
            <p>Minimum $800 to travel on-site.</p>
            <p>Accommodations are required if starting before 8am or ending after 8pm.</p>
          </div>
        </div>
      </div>
      <div class="services__display">
        <div class="services__display--overlay" />
        <div class="services__display--content">
          <div class="services__display--image">
            <img src="@/assets/parlour-wedding-hair.jpeg">
          </div>
          <!-- <div class="services__display--quote">
            <p>"Giving people the freedom to create their vision of their best self is my idea of success."</p>
            <span>Gene Cahill - The Parlour Owner</span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="section weddingSection">
      <div class="weddingSection__overlay" />
      <div class="weddingSection__content">
        <div class="wedding__content--container">
          <div v-for="(info, i) in infoWedding" :key="i" class="wedding__content">
            <h3>{{ info.title }}</h3>
            <p>{{ info.text }}</p>
          </div>
        </div>
        <div class="wedding__display">
          <img src="@/assets/bouquet.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { SfButton, SfTable } from '@storefront-ui/vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    SfButton,
    SfTable
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
      infoWedding: [
        {
          title: 'The Wedding Team',
          text: 'The Parlour considers education and commitment to excellence paramount to our success. Each member of our wedding team goes through a rigorous certification process to be part of the team. You can trust that when you use our services you will be in the hands of a highly trained professional.'
        },
        {
          title: 'SCHEDULING YOUR WEDDING',
          text: 'Call your preferred Parlour location or complete the form below as soon as you know your wedding date. Brides generally reserve our services 6 to 12 months in advance. A deposit is required at that time to retain our stylist’s services. Practice appointments are generally scheduled 3-4 weeks prior to your wedding day. This allows plenty of time before the wedding should your stylist need to purchase anything special for you before then. We are also available for coloring or cutting appointments if you need one of those services before your wedding.'
        },
        {
          title: 'IN-SALON OR ON-SITE SERVICES',
          text: 'If you are getting married in close proximity to one of our salons, you may want to choose our in-salon services. This option has the benefit of a salon full of stylists to perform many services at the same time, therefore, cutting down on the amount of time you and your wedding party will spend getting ready. If you are getting married out of town, or just want to feel extra pampered, you may want to choose our on-site services. We come to you with all the tools necessary to make you and your bridal party beautiful.'
        },
      ],
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
      info: 'WITH NINE LOCATIONS ACROSS COLORADO, THE PARLOUR IS HERE TO PROVIDE YOU THE HIGHEST LEVEL OF SERVICE FOR YOUR WEDDING.',
      exceptionalService: 'Beginning in Boulder, Colorado, The Parlour has cultivated an environment rich with education and opportunities for the team to thrive. With additional locations in Lower Downtown Denver, West Highlands Denver, Washington Park Denver, Flatirons, Fort Collins, Capitol Hill, and RiNo, The Parlour hair salons are dedicated to providing exceptional service.',
      renownedEducation: 'Advanced education is at the forefront of The Parlour’s philosophy. Our education program covers all aspects of advanced hairdressing as well as customer service, communication, goal setting, and client building. These tools are designed to set our team up for complete success behind the chair. The Parlour is consistently revisiting our curriculum to keep it modern and forward-thinking. Several events are also hosted throughout the year featuring world-renowned guest artists to continue our team’s education.',
      services: [
        {
          service: 'Bridal Hair Practice',
          price: '$175 – $225'
        },
        {
          service: 'Bridal Makeup Practice',
          price: '$125 – $175'
        },
        {
          service: 'Bridal Day of Hair',
          price: '$175 – $225'
        },
        {
          service: 'Briday Day of Makeup',
          price: '$125 – $175'
        },
        {
          service: 'Bridal Party Updo',
          price: '$100 – $150'
        },
        {
          service: 'Bridal Party Makeup',
          price: '$75 – $125'
        },
        {
          service: 'Briday Party Wash & Blowdry',
          price: '$65 (add-on iron curl $20)'
        },
        {
          service: 'Flower Girls',
          price: '$75'
        }
      ]
    }
  },
  methods: {
    getImgUrl(pic) {
      return require(pic)
    },
    goTo(link) {
      this.$router.push(link);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.background {
  position: relative;
  background: url('~@/assets/the-parlour-weddings.jpg');
  background-size: cover;
}
.overlayWedding {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, .4);
}
.welcome {
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 57.9rem;
  transform: translate(-50%, -50%);
}
.max-size {
  max-width: 100vw;
  height: 100vh;
}
.logo-minimal {
  max-width: 10rem;
  margin-left: var(--spacer-2xl);
}
.title {
  &__container {
    text-transform: uppercase;
    text-align: left;
    // width: 50%;
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
    --button-font-size: var(--font-sm);
    &--primary {
      --button-background: #7b6d53;
      --button-color: var(--c-white);
    }
    &--secondary {
      --button-border-color: #7b6d53;
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
    background: url('~@/assets/the-parlour-wedding-bouquet.jpg');
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
.weddingSection {
  background: url('~@/assets/veil.jpg');
  width: 100%;
  height: 50rem;
  position: relative;
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255, .4);
  }
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    padding: 0 var(--spacer-2xl);
  }
}
.wedding {
  &__display {
    max-width: 45%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
  &__content {
    &:not(:last-child) {
      padding-bottom: var(--spacer-xs);
    }
    h3 {
      font-size: 1.75rem;
      text-transform: uppercase;
      font-weight: var(--font-medium);
      font-family: var(--font-family-primary);
      color: #7b6d53;
    }
    p {
      line-height: 1.6;
    }
    &--container {
      max-width: 55%;
      padding: var(--spacer-2xl) var(--spacer-2xl) var(--spacer-2xl) 0;
    }
  }
}
</style>
