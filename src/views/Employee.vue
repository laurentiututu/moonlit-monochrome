<template>
  <div class="employee">
  	<div class="employee__image">
  	  <div class="employee__image--container">
  	  	<span>{{ employee.name }}</span>
  	  	<img :src="getImage(employee.picturePath)">
  	  	<!-- <SfButton class="sf-button--outline bookButton">Book with me</SfButton> -->
  	  </div>
  	</div>
  	<div class="employee__details">
  	  <div class="employee__details--container">
  	    <span class="employee__details--job">{{ employee.hobbies }}</span>
  	    <h2>About Me</h2>
  	    <div class="employee__details--section1">
  	    	<b>Hometown: </b>{{ employee.description }}
  	    </div>
  	    <div class="employee__details--section1">
  	    	<b>When I started at the Parlour: </b>{{ employee.start_carrier }}
  	    </div>
  	    <div class="employee__details--section2">
  	    	<h4>What inspires/motivates me in the industry:</h4>
  	    	<p>{{ employee.inspiration }}</p>
  	    </div>
  	    <div class="employee__details--section2">
  	    	<h4>What else you should know about me:</h4>
  	    	<p>{{ employee.about_me }}</p>
  	    </div>
  	  </div>
  	</div>
  </div>
</template>
<script>
// import { SfButton } from '@storefront-ui/vue'
import axios from 'axios'
import config from '../../config/local.json'

export default {
  components: {
  	// SfButton
  },
  data () {
  	return {
  	  employee: {}
  	}
  },
  mounted () {
    this.getEmployee()
  },
  methods: {
  	getImage(imagePath) {
      return config.api.url + imagePath
    },
    getEmployee () {
      axios
      .get(config.api.url + config.users.slug_endpoint.replace('{{slug}}',this.$route.params.id))
      .then(res => {
        this.employee = res.data.data.user
        console.log(this.employee)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.employee {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: var(--spacer-2xl) 0;

  &__image, &__details {
  	flex: 1 1 50%;
  }
  &__image {
  	&--container {
  	  max-width: 60%;
      margin-left: 40%;
      position: relative;
      span {
      	display: block;
	    position: absolute;
	    transform: rotate(-90deg) translate(-100%, -50%);
      transform-origin: center left;
	    font-size: 1.75rem;
    	font-weight: var(--font-semibold);
      }
      img {
      	width: 100%;
      }
  	}
  }
  &__details {
  	margin-left: var(--spacer-2xl);
  	&--container {
  	  margin-right: 40%;
  	}
  	&--job {
  	  font-size: var(--font-2xs);
      font-weight: var(--font-medium);
  	}
  	h2 {
  	  font-family: var(--font-family-primary);
      font-size: 2rem;
      font-weight: var(--font-light);
  	}
  	&--section1 {
  	  margin: var(--spacer-base) 0;
  	  b {
  		font-weight: var(--font-semibold);
  	  }
  	}
  	&--section2 {
  	  h4 {
  	  	font-weight: var(--font-semibold);
  	  }
  	}
  }
}
.bookButton {
  --button-font-size: var(--font-sm);
  --button-border-width: 1px;
  --button-box-shadow: none;
  --button-color: var(--c-primary);
  margin: 0 auto;
  margin-top: var(--spacer-lg);
  transition: all .25s ease;

  &:hover {
  	--button-background: var(--c-primary);
  	--button-color: var(--c-white);
  }
}
</style>