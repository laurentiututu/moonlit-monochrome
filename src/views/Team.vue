<template>
  <div class="team">
  	<div class="locations">
  	  <span v-for="(location, i) in locations" :key="i" @click="setLocation(location.slug)">
  	  	{{ location.name }}
  	  </span>
  	</div>
  	<div v-if="employees.length" class="employees">
  	  <div v-for="(employee, i) in employees" :key="i" class="employee" @click="goTo(employee.slug)">
  	  	<img :src="getImage(employee.picturePath)">
  	  	<div class="employee__overlay">
  	  	  <p>{{ employee.name + ' - ' + employee.hobbies }}</p>
  	  	</div>
  	  </div>
  	</div>
    <div v-else class="employees__not-found">No employees found.</div>
  </div>
</template>
<script>
import axios from 'axios'
import config from '../../config/local.json'

export default {
	data () {
	  return {
	  	location: 'show-all',
      locations: [],
	  	employees: []
	  }
	},
  mounted () {
    this.getLocations()
    this.getEmployeesByLocation(this.location)
  },
  watch: {
    location () {
      this.getEmployeesByLocation(this.location)
    }
  },
	computed: {
	  getEmployees () {
	  	let filteredEmployees = []
	  	this.employees.forEach(employee => {
	  	  if (this.location !== 'Show all') {
	  	  	if (employee.location === this.location) {
	  	      filteredEmployees.push(employee)
	  	    }
	  	  } else {
	  	  	filteredEmployees.push(employee)
	  	  }    
	  	})
	  	return filteredEmployees
	  }
	},
	methods: {
	  getRequiredImg(url) {
      return require(`@/assets/employees/${url}.jpg`)
    },
    setLocation (location) {
    	this.location = location
    },
    goTo(link) {
      this.$router.push(`/team/${link}`);
    },
    getImage(imagePath) {
      return config.api.url + imagePath
    },
    getLocations () {
      axios
      .get(config.api.url + config.locations.all_endpoint)
      .then(res => {
        res.data.data.locations.forEach(location => {
          const data = {
            name: location.name,
            slug: location.slug
          }
          this.locations.push(data)
        })
        this.locations.unshift({name: 'Show all', slug: 'show-all'})
        console.log(this.locations)
      })
    },
    getEmployeesByLocation (location) {
      let configuredUrl = location == 'show-all'
      ? config.api.url + config.users.all_endpoint
      : config.api.url + config.users.all_endpoint + `?location=${location}`
      axios
      .get(configuredUrl)
      .then(res => {
        this.employees = res.data.data.users
        console.log(this.employees)
      })
    }
	}
}
</script>
<style lang="scss" scoped>
.team {
  margin-top: var(--spacer-2xl);
}
.locations {
  display: flex;
  flex-wrap: wrap;
  margin: 0 var(--spacer-2xl) var(--spacer-lg);
  justify-content: center;
  span {
  	text-transform: uppercase;
    font-size: var(--font-2xs);
    font-weight: var(--font-medium);
    padding: 0 var(--spacer-xs);
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
    	opacity: .5;
    }
  }
}
.employees {
  display: flex;
  flex-wrap: wrap;
  &__not-found {
    text-align: center;
    margin: var(--spacer-2xl);
  }
  .employee {
  	flex: 1 1 16.666%;
  	max-width: 16.666%;
  	overflow: hidden;
  	position: relative;
  	img {
  	  width: 100%;
  	  height: 100%;
  	}
  	&__overlay {
  	  position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.65);
      top: 0;
      color: var(--c-white);
      left: 0;
      font-size: var(--font-lg);
      font-family: var(--font-family-primary);
      font-weight: var(--font-medium);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0;
      transition: .35s all ease;
      p {
      	padding: var(--spacer-sm);
      	margin: 0;
        text-align: center;
      }

      &:hover {
      	opacity: 1;
      }
  	}
  }
}
</style>