<template>
  <div class="home">
    <div class="location__background">
      <img :src="getCoverImage(location.pictures)">
      <!-- <div class="location__background--overlay" /> -->
      <div class="location__info" :style="`background: ${location.colors[0]}`">
        <span>Estabilished in {{ location.release_year }}</span>
        <h3>The Parlour</h3>
        <h2>{{ location.name }}</h2>
        <div class="location__info--contact">
          <img src="@/assets/icons/telephone.png">
          <span>{{ location.phone }}</span>
        </div>
        <div class="location__info--contact">
          <img src="@/assets/icons/location.png">
          <span>{{ location.address }}</span>
        </div>
        <div class="location__divider" />
        <SfButton class="sf-button--full-width location__action location__action--primary" @click="scrollToSection('bookingSection')">Book Online</SfButton>
        <SfButton class="sf-button--full-width location__action location__action--secondary" @click="scrollToSection('servicesSection')">Services</SfButton>
      </div>
    </div>

    <div class="section">
      <div class="services">
        <div class="services__service">
          <h2 ref="servicesSection">Our services</h2>
          <SfTable class="services__table">
            <SfTableHeading>
              <SfTableHeader>Service</SfTableHeader>
              <SfTableHeader>Price</SfTableHeader>
            </SfTableHeading>
            <SfTableRow v-for="(item, i) in services" :key="i">
              <SfTableData>
                {{ item.details.name }}
              </SfTableData>
              <SfTableData>
                {{ item.details.price + ' Lei' }}
              </SfTableData>
            </SfTableRow>
          </SfTable>
        </div>
        <div class="services__service">
          <h2>Schedule</h2>
          <SfTable class="services__table">
            <SfTableHeading>
              <SfTableHeader>Day</SfTableHeader>
              <SfTableHeader>Start Hour</SfTableHeader>
              <SfTableHeader>Finish Hour</SfTableHeader>
            </SfTableHeading>
            <SfTableRow v-for="(item, key) in location.program" :key="key">
              <SfTableData>
                {{ key }}
              </SfTableData>
              <SfTableData>
                {{ item.start }}
              </SfTableData>
              <SfTableData>
                {{ item.end }}
              </SfTableData>
            </SfTableRow>
          </SfTable>
        </div>
        <!-- <div class="services__service">
          <div class="services__service--info">
            <h3>Exceptional Service</h3>
            <p>{{ exceptionalService }}</p>
            <SfButton>Meet our team</SfButton>
          </div>
        </div> -->
      </div>
      <div class="services__display">
        <div class="services__display--overlay" />
        <div ref="bookingSection" class="services__display--content">
          <SfSteps
            class="bookingSteps"
            :active="currentStep"
            :steps="steps.map(step => step.name)"
            @change="changeStep"
          >
            <SfStep name="Service">
              <div class="step step__service">
                <div v-if="isClient">
                  <h4>What service would you like to make an appointment for?</h4>
                  <SfSelect
                    v-model="booking.service"
                    class="employees__employee--role"
                    name="service"
                    label="Select service"
                  >
                    <SfSelectOption
                      v-for="(service, i) in services"
                      :key="i"
                      :value="service.details.id"
                    >
                      {{ service.details.name }}
                    </SfSelectOption>
                  </SfSelect>
                  <SfButton class="step__button" :disabled="!booking.service" @click="makeAppointment()">Next</SfButton>
                </div>
                <div class="loginCase" v-else>
                  Please Log In in order to make an appointment.
                  <SfButton class="step__button" @click="login()">Login</SfButton>
                </div>
              </div>
            </SfStep>
            <SfStep name="Employee">
              <div class="step step__employee">
                <div v-if="isClient">
                  <h4>What employee would you like to perform for you?</h4>
                  <SfSelect
                    v-if="booking.service"
                    v-model="booking.employee"
                    class="employees__employee--role"
                    name="employee"
                    label="Select service"
                  >
                    <SfSelectOption
                      v-for="(employee, i) in getEmployeesByService"
                      :key="i"
                      :value="employee.id"
                    >
                      {{ employee.name }}
                    </SfSelectOption>
                  </SfSelect>
                  <SfButton class="step__button" :disabled="!booking.employee" @click="makeAppointment()">Next</SfButton>
                </div>
                <div class="loginCase" v-else>
                  Please Log In in order to make an appointment.
                  <SfButton class="step__button" @click="login()">Login</SfButton>
                </div>
              </div>
            </SfStep>
            <SfStep name="Date">
              <div class="step step__date">
                <div v-if="isClient">
                  <h4>Select a date for the appointment</h4>
                  <SfInput
                    v-model="booking.date"
                    type="date"
                    label="Select date"
                    @change="getAvailableHours()"
                  />
                  <SfSelect
                    v-if="booking.date"
                    v-model="booking.hour"
                    class="employees__employee--role"
                    name="hour"
                    label="Select hour"
                    :key="availableHours.length"
                  >
                    <SfSelectOption
                      v-for="(hour, i) in availableHours"
                      :key="i"
                      :value="hour"
                    >
                      {{ hour }}
                    </SfSelectOption>
                  </SfSelect>
                  <SfButton class="step__button" :disabled="!booking.hour" @click="makeAppointment()">{{currentStep == 2 ? 'Make Appointment' : 'Next'}}</SfButton>
                </div>
                <div class="loginCase" v-else>
                  Please Log In in order to make an appointment.
                  <SfButton class="step__button" @click="login()">Login</SfButton>
                </div>
              </div>
            </SfStep>
          </SfSteps>
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
      <h3 class="sectionTitle">Gallery</h3>
      <SfCarousel
        class="m-product-carousel"
        :settings="sliderSettings"
      >
        <SfCarouselItem v-for="(image, i) in location.pictures" :key="i">
          <div class="imageContainer">
            <img class="autoCenter" :src="getImage(image.filePath)" />
          </div>
        </SfCarouselItem>
      </SfCarousel>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { SfButton, SfTable, SfCarousel, SfSteps, SfSelect, SfInput } from '@storefront-ui/vue'
import config from '../../config/local.json'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    SfButton,
    SfTable,
    SfCarousel,
    SfSteps,
    SfSelect,
    SfInput
  },
  data () {
    return {
      currentStep: 0,
      booking: {
        location: '',
        service: '',
        employee: '',
        date: '',
        hour: ''
      },
      availableHours: [],
      steps: [
        {
          key: 0,
          name: 'Service'
        },
        {
          key: 1,
          name: 'Employee'
        },
        {
          key: 2,
          name: 'Date'
        }
      ],
      location: {},
      locationTrigger: false,
      services: [],
      sliderSettings: {
        type: 'carousel',
        rewind: true,
        autoplay: 5000,
        perView: 3,
        slidePerPage: false,
        gap: 10,
        focusAt: 'center'
      },
      info: 'Since 1989, The Parlour Hair Salon has committed to the highest level of quality in the salon industry. We are locally owned and grown in Colorado.',
      exceptionalService: 'Beginning in Boulder, Colorado, The Parlour has cultivated an environment rich with education and opportunities for the team to thrive. With additional locations in Lower Downtown Denver, West Highlands Denver, Washington Park Denver, Flatirons, Fort Collins, Capitol Hill, and RiNo, The Parlour hair salons are dedicated to providing exceptional service.',
      renownedEducation: 'Advanced education is at the forefront of The Parlour’s philosophy. Our education program covers all aspects of advanced hairdressing as well as customer service, communication, goal setting, and client building. These tools are designed to set our team up for complete success behind the chair. The Parlour is consistently revisiting our curriculum to keep it modern and forward-thinking. Several events are also hosted throughout the year featuring world-renowned guest artists to continue our team’s education.'
    }
  },
  computed: {
    getEmployeesByService () {
      let serviceSelected = this.services.find(service => service.details.id === this.booking.service)
      return serviceSelected.employees
    },
    isClient () {
      return localStorage.getItem('userToken')
    }
  },  
  methods: {
    scrollToSection(section) {
      this.$refs[section].scrollIntoView({ behavior: 'smooth' });
    },
    getAvailableHours () {
      let token = localStorage.getItem('userToken');
      axios
      .get(
        config.api.url + config.bookings.available_endpoint + `?location=${this.location.id}&employee=${this.booking.employee}&service=${this.booking.service}&date=${this.booking.date}`,
        { headers: {"Authorization" : `Bearer ${token}`} }
      )
      .then(res => {
        this.availableHours = res.data.data.available
      })
      .catch(err => {
        console.log(err)
        this.refreshSession(this.getAvailableHours)
      })
    },
    setBookingItem (id) {
      console.log(id)
    },
    makeAppointment () {
      this.booking.location = this.location.id
      if (this.currentStep < 2) {
        this.currentStep++
      } else {
        let token = localStorage.getItem('userToken');
        axios
        .post(
          config.api.url + config.bookings.endpoint,
          this.booking,
          { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then(res => {
          console.log(res)
          this.$store.dispatch('spawnNotification', {
            type: 'success',
            message: 'Appointment made successfully.',
            action1: { label: 'OK' }
          });
          this.currentStep = 0
          this.booking = {
            location: '',
            service: '',
            employee: '',
            date: '',
            hour: ''
          }
        })
        .catch(() => {
          this.refreshSession(this.getAvailableHours)
        })
      }
    },
    changeStep (nextStep) {
        this.currentStep = this.steps[nextStep].key;
    },
    getImage(imagePath) {
      return config.api.url + imagePath
    },
    getCoverImage(images) {
      const picture = images.find(image => image.cover === true)
      if (picture !== undefined) {
        console.log(config.api.url + picture.filePath)
        return config.api.url + picture.filePath
      }
    },
    getCarouselImages(url) {
      return require(`@/assets/location/boulder/${url}.jpg`)
    },
    getEmployeesImages(url) {
      return require(`@/assets/location/boulder/employees/${url}.jpg`)
    },
    goTo(link) {
      this.$router.push(link);
    },
    getCurrentLocation() {
      axios
      .get(config.api.url + config.locations.slug_endpoint.replace('{{slug}}', this.$route.params.slug))
      .then(res => {
        this.location = res.data.data.location
        this.services = res.data.data.services
        this.locationTrigger = true
        console.log(this.location)
        console.log(this.services)
      })
    },
    login () {
      this.$router.push('/login')
    },
    refreshSession (callbackFunction) {
      let token = localStorage.getItem('userToken');
      axios
      .patch(
        config.api.url + config.auth.refreshToken_endpoint,
        { "refreshToken": localStorage.getItem('refreshToken')},
        { headers: {"Authorization" : `Bearer ${token}`}}
      )
      .then(res => {
        if (res.status == 200) {
          localStorage.setItem('userToken', res.data.token)
          localStorage.setItem('refreshToken', res.data.refreshToken)
          callbackFunction()
        }
      })
      .catch(() => {
        localStorage.setItem('userToken', '');
        localStorage.setItem('refreshToken', '');
        localStorage.setItem('userRole', '');
        this.$router.push('/login')
        this.$store.dispatch('spawnNotification', {
          type: 'warning',
          message: 'Something went wrong. You\'ve been logged out.',
          action1: { label: 'OK' }
        });
      })
    }
  },
  mounted () {
    this.getCurrentLocation()
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
      text-transform: capitalize;
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


.location {
  &__background {
    width: 100%;
    overflow: hidden;
    max-height: 62rem;
    position: relative;

    img {
      width: 100%;
    }
  }
  &__info {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-75%, -50%);
    padding: var(--spacer-lg);
    color: var(--c-white);
    width: 15.5rem;
    span {
      font-family: var(--font-family-primary);
      font-size: var(--font-lg);
      text-transform: uppercase;
      font-weight: var(--font-semibold);
    }
    h3 {
      text-transform: uppercase;
      font-size: 2rem;
      text-align: center;
      margin-bottom: 0;
      font-weight: var(--font-semibold);
      line-height: 1.4;
    }
    h2 {
      text-transform: uppercase;
      font-size: 3rem;
      text-align: center;
      margin: 0;
      font-weight: var(--font-semibold);
      line-height: 1;
    }
    &--contact {
      display: flex;
      align-items: center;
      margin: var(--spacer-lg) 0;
      span {
        font-size: 1.25rem;
        font-family: var(--font-family-secondary);
        font-weight: var(--font-light);
        text-transform: none;
      }
      img {
        max-width: 2rem;
        margin-right: var(--spacer-sm);
        filter: invert(100%) sepia(5%) saturate(0%) hue-rotate(18deg) brightness(108%) contrast(105%);
      }
    }
  }
  &__divider {
    width: 100%;
    height: 8px;
    background: var(--c-black);
    margin: var(--spacer-xl) 0;
  }
  &__action {
    --button-border: solid var(--c-black);
    --button-border-width: 1px;
    --button-font-size: var(--font-sm);
    --button-box-shadow: none;
    transition: all .25s ease;
    &:not(:last-child) {
      margin: var(--spacer-lg) 0;
    }
    &--primary {
      --button-background: transparent;
      --button-color: var(--c-black);

      &:hover {
        --button-background: var(--c-black);
        --button-color: var(--c-white);
      }
    }
    &--secondary {
      --button-background: var(--c-black);
      --button-color: var(--c-white);

      &:hover {
        --button-background: transparent;
        --button-color: var(--c-black);
      }
    }
  }
}
.bookingSteps {
  background: var(--c-white);
  padding: var(--spacer-xl) var(--spacer-2xl);
  width: 28rem;
  min-height: 25rem;
  position: relative;
}
.step {
  --select-option-font-family: var(--font-family-secondary);
  h4 {
    font-weight: var(--font-medium);
    font-size: var(--font-lg);
    text-transform: uppercase;
    padding-bottom: var(--spacer-sm);
  }
  &__service {

  }
  &__employee {

  }
  &__date {

  }
  &__button {
    --button-height: 2.5rem;
    --button-font-size: var(--font-sm);
    --button-font-weight: var(--font-medium);
    --button-width: calc(100% - 10rem);
    position: absolute;
    bottom: var(--spacer-2xl);
  }
}
.loginCase {
  text-align: center;
  margin: var(--spacer-xl) 0;
}
.imageContainer {
  height: 13.5rem;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
