<template>
  <div class="myAcccount" id="myAccount">
    <div class="myAccount__container" :key="trigger">
      <div class="myAccount__profile">
        <div class="myAccount__profile--image">
          <div class="myAccount__profile--image-container">
            <img
              v-if="accountDetails.picturePath"
              :src="getAvatar(accountDetails.picturePath)"
            />
            <img v-else src="@/assets/userIcon.png" />
            <div class="editAvatar" @click="editAvatar()">change Picture</div>
          </div>
          <input
            type="file"
            class="inputPicture"
            ref="fileInput"
            @change="changePicture"
          />
          <div
            v-if="accountDetails.role !== 'user'"
            class="myAccount__profile--image-orders"
          >
            <img src="@/assets/icons/schedule.png" />
            <span>{{ bookingsCompleted }}</span>
          </div>
        </div>
        <div class="myAccount__profile--name">
          <p>{{ accountDetails.name }}</p>
        </div>
        <div class="myAccount__profile--services">
          <!-- <span>Services</span> -->
          <p>{{ accountDetails.hobbies }}</p>
        </div>
        <div class="myAccount__profile--actions">
          <SfButton
            class="myAccount__profile--actions-primary"
            @click="logout()"
            >Log Out</SfButton
          >
          <SfButton
            class="sf-button--text myAccount__profile--actions-secondary"
            >Delete this account</SfButton
          >
        </div>
      </div>

      <div class="myAccount__details">
        <SfTabs :openTab="1">
          <SfTab title="Personal Information">
            <div class="myAccount__details--tab" v-if="!editDetails">
              <div class="myAccount__details--carrier">
                <b>Hometown: </b>
                <span>{{ accountDetails.description }}</span>
              </div>
              <div class="myAccount__details--carrier">
                <b>{{
                  accountDetails.role !== "user"
                    ? "When I started doing hair: "
                    : "When I became a client: "
                }}</b>
                <span>{{ accountDetails.start_carrier }}</span>
              </div>
              <div
                v-if="accountDetails.role !== 'user'"
                class="myAccount__details--carrier"
              >
                <b>When I started working here: </b>
                <span>{{ accountDetails.start_company }}</span>
              </div>
              <h4>
                {{
                  accountDetails.role !== "user"
                    ? "What inspires/motivates me in the industry:"
                    : "What I like about this company:"
                }}
              </h4>
              <p>{{ accountDetails.inspiration }}</p>
              <h4>What else you should know about me:</h4>
              <p>{{ accountDetails.about_me }}</p>
              <SfButton class="editInformation" @click="editInformation()"
                >Edit Information</SfButton
              >
            </div>
            <div v-if="editDetails">
              <SfInput
                v-model="details.hobbies"
                name="First Name"
                :label="accountDetails.role !== 'user' ? 'Job:' : 'Hobbies:'"
                class="form__element form__element--half"
              />
              <SfInput
                v-model="details.hometown"
                name="First Name"
                label="Hometown:"
                class="form__element form__element--half"
              />
              <SfInput
                v-model="details.start_carrier"
                type="number"
                name="Start Career"
                :label="
                  accountDetails.role !== 'user'
                    ? 'When I started doing hair:'
                    : 'When I became a client:'
                "
                class="form__element form__element--half"
              />
              <SfInput
                v-if="accountDetails.role !== 'user'"
                v-model="details.start_company"
                type="number"
                name="Start Company"
                label="When I started working here:"
                class="form__element form__element--half"
              />
              <SfInput
                v-model="details.inspiration"
                name="Inspiration"
                :label="
                  accountDetails.role !== 'user'
                    ? 'What inspires/motivates me in the industry:'
                    : 'What I like about this company:'
                "
                class="form__element form__element--half"
              />
              <SfInput
                v-model="details.about_me"
                name="About Me"
                label="What else you should know about me:"
                class="form__element form__element--half"
              />
              <div class="flex">
                <SfButton
                  class="editInformation"
                  @click="updateInfo()"
                  :disabled="!formFilled"
                  >Update</SfButton
                >
                <SfButton
                  class="editInformation sf-button--text"
                  @click="editInformation()"
                  >Cancel</SfButton
                >
              </div>
            </div>
          </SfTab>
          <SfTab title="Bookings">
            <div v-if="accountDetails.role !== 'user'" class="bookings__admin">
              <SfTable class="services__table">
                <SfTableHeading>
                  <SfTableHeader>Service Name</SfTableHeader>
                  <SfTableHeader>Date</SfTableHeader>
                  <SfTableHeader>Location</SfTableHeader>
                  <SfTableHeader>Price</SfTableHeader>
                  <SfTableHeader>Payment</SfTableHeader>
                  <SfTableHeader>Action</SfTableHeader>
                </SfTableHeading>
                <SfTableRow v-for="(booking, i) in adminBookings" :key="i">
                  <SfTableData>
                    <p class="employees__employee--name bookings__primary">
                      {{ booking.service_name }}
                    </p>
                    <span class="employees__employee--email">{{
                      "asked by " + booking.user.name
                    }}</span>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--name bookings__primary">
                      {{ booking.date }}
                    </p>
                    <span class="employees__employee--email">{{
                      "@ " + booking.hour
                    }}</span>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--date bookings__primary">
                      {{ booking.location.name }}
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--date bookings__primary">
                      {{ booking.price + " Lei" }}
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--name">
                      {{ booking.payment }}
                    </p>
                    <span
                      class="employees__employee--email"
                      :class="{
                        success: booking.payment_status == 'paid',
                        warning: booking.payment_status == 'pending',
                        danger: booking.payment_status == 'fail',
                      }"
                    >
                      {{ booking.payment_status }}
                    </span>
                    <!-- <p
                      class="employees__employee--email bookings__primary bookings__primary--status"
                      :class="{
                        'success': booking.payment_status == 'paid',
                        'warning': booking.payment_status == 'pending',
                        'danger': booking.payment_status == 'fail'
                      }"
                    >
                      {{booking.payment_status}}
                    </p> -->
                  </SfTableData>
                  <SfTableData>
                    <div class="bookings__edit">
                      <SfButton
                        v-if="booking.payment_status !== 'fail'"
                        :disabled="booking.status == 'closed'"
                        class="bookings__button"
                        @click="closeOrder(booking.id)"
                      >
                        {{
                          booking.status !== "closed"
                            ? "Finish Order"
                            : "Closed"
                        }}
                      </SfButton>
                    </div>
                  </SfTableData>
                </SfTableRow>
              </SfTable>
            </div>
            <div v-else class="bookings__client">
              <div v-if="refreshRequired" class="bookings__client--refresh">
                <SfButton @click="refreshOrders()">
                  Refresh Orders
                </SfButton>
              </div>
              <SfTable class="services__table">
                <SfTableHeading>
                  <SfTableHeader>Service Name</SfTableHeader>
                  <SfTableHeader>Date</SfTableHeader>
                  <SfTableHeader>Location</SfTableHeader>
                  <SfTableHeader>Price</SfTableHeader>
                  <SfTableHeader>Payment</SfTableHeader>
                  <SfTableHeader>Action</SfTableHeader>
                </SfTableHeading>
                <SfTableRow v-for="(booking, i) in userBookings" :key="i">
                  <SfTableData>
                    <p class="employees__employee--name bookings__primary">
                      {{ booking.service_name }}
                    </p>
                    <span class="employees__employee--email">{{
                      "done by " + booking.employee.name
                    }}</span>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--name bookings__primary">
                      {{ booking.date }}
                    </p>
                    <span class="employees__employee--email">{{
                      "@ " + booking.hour
                    }}</span>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--date bookings__primary">
                      {{ booking.location.name }}
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--date bookings__primary">
                      {{ booking.price + " Lei" }}
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <p
                      class="employees__employee--email bookings__primary bookings__primary--status"
                      :class="{
                        success: booking.payment_status == 'paid',
                        warning: booking.payment_status == 'pending',
                        danger: booking.payment_status == 'fail',
                      }"
                    >
                      {{ booking.payment_status }}
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <div class="bookings__edit">
                      <SfButton
                        v-if="booking.payment_status !== 'fail'"
                        :disabled="booking.payment_status == 'paid'"
                        class="bookings__button"
                        @click="payOrder(booking.id)"
                      >
                        Pay now
                      </SfButton>
                    </div>
                  </SfTableData>
                </SfTableRow>
              </SfTable>
            </div>
          </SfTab>
          <SfTab v-if="userType === 'admin'" title="Employees">
            <div class="employees__section">
              <SfTable class="services__table">
                <SfTableHeading>
                  <SfTableHeader>Thumbnail</SfTableHeader>
                  <SfTableHeader>Name</SfTableHeader>
                  <SfTableHeader>Employment Date</SfTableHeader>
                  <SfTableHeader>Role</SfTableHeader>
                </SfTableHeading>
                <SfTableRow v-for="(employee, i) in employees" :key="i">
                  <SfTableData>
                    <div class="employees__employee--thumbnail">
                      <img
                        v-if="employee.picturePath"
                        :src="getAvatar(employee.picturePath)"
                      />
                      <img v-else src="@/assets/userIcon.png" />
                    </div>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--name">{{ employee.name }}</p>
                    <span class="employees__employee--email">{{
                      employee.email
                    }}</span>
                  </SfTableData>
                  <SfTableData>
                    <p class="employees__employee--date">
                      {{
                        employee.start_company
                          ? employee.start_company
                          : "Not Set"
                      }}
                    </p>
                  </SfTableData>
                  <SfTableData>
                    <SfSelect
                      v-model="employee.roleToChange"
                      class="employees__employee--role"
                      name="role"
                      @change="changeRole(employee.id, employee.roleToChange)"
                    >
                      <SfSelectOption
                        v-for="(role, i) in roles"
                        :key="i"
                        :value="role"
                      >
                        {{ role }}
                      </SfSelectOption>
                    </SfSelect>
                  </SfTableData>
                </SfTableRow>
              </SfTable>
            </div>
          </SfTab>
          <SfTab v-if="userType === 'admin'" title="Locations">
            <div v-if="!location && !addNewLocation" class="locations">
              <div v-for="(location, i) in locations" :key="i" class="location">
                <div class="location__image--container">
                  <img
                    class="location__image"
                    :src="getCoverImage(location.pictures)"
                  />
                  <div
                    class="location__image--overlay"
                    :style="`background:${location.colors[0]}`"
                  />
                </div>
                <div class="location__content">
                  <h2 class="location__title">{{ location.name }}</h2>
                  <SfButton
                    class="location__action"
                    @click="setLocation(location)"
                    >View</SfButton
                  >
                </div>
              </div>
              <div class="location">
                <div class="location__image--container">
                  <img
                    class="location__image location__image--add"
                    src="@/assets/location/boulder.jpg"
                  />
                  <div
                    class="location__image--overlay location__image--overlay-add"
                  />
                </div>
                <div class="location__content">
                  <h2 class="location__title">Add Location</h2>
                  <SfButton
                    class="location__action"
                    @click="toggleAddLocation()"
                    >Add</SfButton
                  >
                </div>
              </div>
            </div>
            <div v-if="location">
              <div class="locationPage">
                <div
                  class="locationPage__info"
                  :style="`background: ${location.colors[0]}`"
                >
                  <span class="releaseYear"
                    >Established in
                    <span v-if="!editLocationDetails">{{
                      location.release_year
                    }}</span>
                    <input
                      v-else
                      v-model="locationDetails.release_year"
                      type="number"
                      name="locationYear"
                    />
                  </span>
                  <h3>The Parlour</h3>
                  <h2 v-if="!editLocationDetails">{{ location.name }}</h2>
                  <input
                    v-else
                    v-model="locationDetails.name"
                    type="text"
                    name="locationName"
                    class="locationNameInput"
                  />
                  <div class="locationPage__info--contact">
                    <img src="@/assets/icons/telephone.png" />
                    <span v-if="!editLocationDetails">{{
                      location.phone
                    }}</span>
                    <input
                      v-else
                      v-model="locationDetails.phone"
                      type="text"
                      name="locationPhone"
                      class="locationContactInput"
                    />
                  </div>
                  <div class="locationPage__info--contact">
                    <img src="@/assets/icons/location.png" />
                    <span v-if="!editLocationDetails">{{
                      location.address
                    }}</span>
                    <input
                      v-else
                      v-model="locationDetails.address"
                      type="text"
                      name="locationAddress"
                      class="locationContactInput"
                    />
                  </div>
                  <div class="locationPage__divider" />
                  <SfButton
                    class="sf-button--full-width locationPage__action locationPage__action--primary"
                    @click="setLocation('')"
                  >
                    Go back
                  </SfButton>
                  <SfButton
                    class="sf-button--full-width locationPage__action locationPage__action--secondary"
                    @click="
                      editLocationDetails
                        ? editLocation()
                        : toggleEditLocation()
                    "
                  >
                    {{
                      editLocationDetails ? "Update Details" : "Edit Details"
                    }}
                  </SfButton>
                </div>
                <div class="locationPage__schedule">
                  <SfTable class="services__table">
                    <SfTableHeading>
                      <SfTableHeader>Day</SfTableHeader>
                      <SfTableHeader>Start</SfTableHeader>
                      <SfTableHeader>End</SfTableHeader>
                      <SfTableHeader>Action</SfTableHeader>
                    </SfTableHeading>
                    <SfTableRow
                      v-for="(schedule, key) in location.program"
                      :key="key"
                    >
                      <SfTableData>
                        <span class="capitalizeKey">{{ key }}</span>
                      </SfTableData>
                      <SfTableData>
                        <input
                          v-if="editScheduleKey === key"
                          type="text"
                          class="scheduleInput"
                          name="scheduleStart"
                          v-model="scheduleToEdit.start"
                        />
                        <span v-else>{{ schedule.start }}</span>
                      </SfTableData>
                      <SfTableData>
                        <input
                          v-if="editScheduleKey === key"
                          type="text"
                          class="scheduleInput"
                          name="scheduleEnd"
                          v-model="scheduleToEdit.end"
                        />
                        <span v-else>{{ schedule.end }}</span>
                      </SfTableData>
                      <SfTableData>
                        <div class="editService">
                          <img
                            v-if="editScheduleKey === key"
                            src="@/assets/icons/basic-tick.png"
                            @click="updateSchedule(key)"
                          />
                          <img
                            v-else
                            src="@/assets/icons/draw.png"
                            @click="editSchedule(key)"
                          />
                        </div>
                      </SfTableData>
                    </SfTableRow>
                  </SfTable>
                  <h4 class="locationPage__title">Color Palette</h4>
                  <div class="locationPage__colors">
                    <div
                      v-for="(color, i) in location.colors"
                      :key="i"
                      :style="`background: ${color}`"
                      class="locationPage__colors--color"
                      @click="removeColor(color)"
                    >
                      <div class="locationPage__colors--color-overlay">
                        <img src="@/assets/icons/delete.png" />
                      </div>
                    </div>
                    <div
                      class="locationPage__colors--color locationPage__colors--color-add"
                      :style="
                        colorToAdd ? `background: ${colorToAdd} !important` : ''
                      "
                      @click="setNewColor = !setNewColor"
                    >
                      <img v-if="!setNewColor" src="@/assets/icons/add.png" />
                      <img
                        v-else
                        src="@/assets/icons/basic-tick.png"
                        @click="addColor()"
                      />
                    </div>
                    <input
                      v-if="setNewColor"
                      v-model="colorToAdd"
                      type="text"
                      name="newColor"
                      placeholder="#hexcode"
                    />
                  </div>
                  <h4 class="locationPage__title">Services</h4>
                  <SfTable v-if="location.employees" class="services__table">
                    <SfTableHeading>
                      <SfTableHeader>Employee</SfTableHeader>
                      <SfTableHeader>Services Performed</SfTableHeader>
                      <SfTableHeader>Action</SfTableHeader>
                    </SfTableHeading>
                    <SfTableRow
                      v-for="(employee, i) in location.employees"
                      :key="i"
                    >
                      <SfTableData>
                        <span class="capitalizeKey">{{
                          employee.user.name
                        }}</span>
                      </SfTableData>
                      <SfTableData>
                        <span>{{
                          formatEmployeeServices(employee.services)
                        }}</span>
                      </SfTableData>
                      <SfTableData>
                        <div class="editService">
                          <img
                            src="@/assets/icons/delete.png"
                            @click="deleteAssignedEmployee(employee.user.id)"
                          />
                        </div>
                      </SfTableData>
                    </SfTableRow>
                  </SfTable>
                  <div v-else>
                    <p>No employees assigned.</p>
                  </div>
                  <SfButton
                    @click="assignerToggler = !assignerToggler"
                    class="userToAssign__button"
                    >Add/Edit Employee</SfButton
                  >
                  <div v-if="assignerToggler">
                    <div class="userToAssign">
                      <div class="employeeAssign employeeAssign__name">
                        <span class="employeeAssign__title"
                          >Select employee</span
                        >
                        <SfSelect
                          v-model="userToAssign.id"
                          class="employees__employee--role userToAssign__item"
                          name="role"
                        >
                          <SfSelectOption
                            v-for="(employee, i) in usersEmployed"
                            :key="i"
                            :value="employee.id"
                          >
                            {{ employee.name }}
                          </SfSelectOption>
                        </SfSelect>
                      </div>
                      <div class="employeeAssign employeeAssign__services">
                        <span class="employeeAssign__title"
                          >Select services</span
                        >
                        <div
                          class="servicesAvailable__container userToAssign__item"
                        >
                          <span
                            v-for="(service, i) in services"
                            :key="i"
                            :class="{ selectedItem: service.isSelected }"
                            @click="assignServiceToEmployee(service)"
                          >
                            {{ service.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <SfButton
                      @click="assignEmployeeToLocation()"
                      class="userToAssign__button--add"
                    >
                      Update Location Employees
                    </SfButton>
                  </div>
                </div>
              </div>
              <div class="locationPage__gallery--container">
                <h4>Gallery</h4>
                <div class="locationPage__gallery">
                  <div
                    v-for="(image, i) in location.pictures"
                    :key="i"
                    class="locationPage__gallery--image"
                    :class="{
                      'locationPage__gallery--image-cover': image.cover,
                    }"
                  >
                    <img :src="getImage(image.filePath)" />
                    <div
                      v-if="image.cover"
                      class="locationPage__gallery--image-overlay"
                    >
                      Current Cover
                    </div>
                    <div v-else class="locationPage__gallery--image-overlay">
                      <span
                        class="setCoverImage"
                        @click="setCoverPicture(image._id)"
                        >Set Cover</span
                      >
                      <span
                        class="deleteImage"
                        @click="deletePicture(image._id)"
                        >Delete Image</span
                      >
                    </div>
                  </div>
                  <div
                    class="locationPage__gallery--image locationPage__gallery--image-new"
                  >
                    <img src="@/assets/icons/image.png" />
                    <div class="locationPage__gallery--image-overlay">
                      <span
                        class="setCoverImage"
                        @click="$refs.newImage.click()"
                        >Add Image</span
                      >
                    </div>
                    <input
                      class="hidden"
                      type="file"
                      name="newPicture"
                      ref="newImage"
                      @change="addNewPicture"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="addNewLocation" class="">
              <div class="locationPage">
                <div
                  :key="newLocationDataUpdate"
                  class="locationPage__info locationPage__info--new"
                  :style="
                    `background: ${addLocationDetails.colors[0]} !important`
                  "
                >
                  <span class="releaseYear"
                    >Established in
                    <input
                      v-model="addLocationDetails.release_year"
                      type="number"
                      name="locationYear"
                    />
                  </span>
                  <h3>The Parlour</h3>
                  <input
                    v-model="addLocationDetails.name"
                    type="text"
                    name="locationName"
                    class="locationNameInput"
                  />
                  <div class="locationPage__info--contact">
                    <img src="@/assets/icons/telephone.png" />
                    <input
                      v-model="addLocationDetails.phone"
                      type="text"
                      name="locationPhone"
                      class="locationContactInput"
                    />
                  </div>
                  <div class="locationPage__info--contact">
                    <img src="@/assets/icons/location.png" />
                    <input
                      v-model="addLocationDetails.address"
                      type="text"
                      name="locationAddress"
                      class="locationContactInput"
                    />
                  </div>
                  <div class="locationPage__divider" />
                  <SfButton
                    class="sf-button--full-width locationPage__action locationPage__action--primary"
                    @click="toggleAddLocation()"
                  >
                    Cancel
                  </SfButton>
                  <SfButton
                    class="sf-button--full-width locationPage__action locationPage__action--secondary"
                    @click="addLocation()"
                  >
                    {{ "Add Location" }}
                  </SfButton>
                </div>
                <div class="locationPage__schedule">
                  <SfTable class="services__table">
                    <SfTableHeading>
                      <SfTableHeader>Day</SfTableHeader>
                      <SfTableHeader>Start</SfTableHeader>
                      <SfTableHeader>End</SfTableHeader>
                    </SfTableHeading>
                    <SfTableRow
                      v-for="(schedule, key) in addLocationDetails.program"
                      :key="key"
                    >
                      <SfTableData>
                        <span class="capitalizeKey">{{ key }}</span>
                      </SfTableData>
                      <SfTableData>
                        <input
                          type="text"
                          class="scheduleInput"
                          name="scheduleStart"
                          v-model="schedule.start"
                        />
                      </SfTableData>
                      <SfTableData>
                        <input
                          type="text"
                          class="scheduleInput"
                          name="scheduleEnd"
                          v-model="schedule.end"
                        />
                      </SfTableData>
                    </SfTableRow>
                  </SfTable>
                  <h4 class="locationPage__title">Color Palette</h4>
                  <div
                    class="locationPage__colors"
                    :key="newLocationDataUpdate"
                  >
                    <div
                      v-for="(color, i) in addLocationDetails.colors"
                      :key="i"
                      :style="`background: ${color}`"
                      class="locationPage__colors--color"
                      @click="newLocationRemoveColor(color)"
                    >
                      <div class="locationPage__colors--color-overlay">
                        <img src="@/assets/icons/delete.png" />
                      </div>
                    </div>
                    <div
                      class="locationPage__colors--color locationPage__colors--color-add"
                      :style="
                        colorToAdd ? `background: ${colorToAdd} !important` : ''
                      "
                      @click="setNewColor = !setNewColor"
                    >
                      <img v-if="!setNewColor" src="@/assets/icons/add.png" />
                      <img
                        v-else
                        src="@/assets/icons/basic-tick.png"
                        @click="newLocationAddColor()"
                      />
                    </div>
                    <input
                      v-if="setNewColor"
                      v-model="colorToAdd"
                      type="text"
                      name="newColor"
                      placeholder="#hexcode"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SfTab>
          <SfTab v-if="userType === 'admin'" title="Services">
            <SfTable class="services__table">
              <SfTableHeading>
                <SfTableHeader>Service</SfTableHeader>
                <SfTableHeader>Duration</SfTableHeader>
                <SfTableHeader>Price</SfTableHeader>
                <SfTableHeader>Action</SfTableHeader>
              </SfTableHeading>
              <SfTableRow v-for="service in services" :key="service.id">
                <SfTableData>
                  <input
                    v-if="editServiceId === service.id"
                    type="text"
                    name="serviceName"
                    v-model="serviceToEdit.name"
                  />
                  <span v-else>{{ service.name }}</span>
                </SfTableData>
                <SfTableData>
                  <input
                    v-if="editServiceId === service.id"
                    type="text"
                    name="serviceDuration"
                    v-model="serviceToEdit.duration"
                  />
                  <span v-else>{{ service.duration + " min" }}</span>
                </SfTableData>
                <SfTableData>
                  <input
                    v-if="editServiceId === service.id"
                    type="text"
                    name="servicePrice"
                    v-model="serviceToEdit.price"
                  />
                  <span v-else>{{ service.price + " Lei" }}</span>
                </SfTableData>
                <SfTableData>
                  <div class="editService">
                    <img
                      v-if="editServiceId === service.id"
                      src="@/assets/icons/basic-tick.png"
                      @click="updateService(service.id)"
                    />
                    <img
                      v-else
                      src="@/assets/icons/draw.png"
                      @click="editService(service)"
                    />
                  </div>
                </SfTableData>
              </SfTableRow>
              <SfTableRow>
                <SfTableData>
                  <input
                    v-if="addService"
                    type="text"
                    name="serviceName"
                    v-model="serviceToEdit.name"
                  />
                  <!-- <span v-else></span> -->
                </SfTableData>
                <SfTableData>
                  <input
                    v-if="addService"
                    type="text"
                    name="serviceDuration"
                    v-model="serviceToEdit.duration"
                  />
                  <!-- <span v-else>{{ service.duration + ' min' }}</span> -->
                </SfTableData>
                <SfTableData>
                  <input
                    v-if="addService"
                    type="text"
                    name="servicePrice"
                    v-model="serviceToEdit.price"
                  />
                  <!-- <span v-else>{{ service.price + ' Lei' }}</span> -->
                </SfTableData>
                <SfTableData>
                  <div class="editService">
                    <img
                      v-if="addService"
                      src="@/assets/icons/basic-tick.png"
                      @click="addNewService()"
                    />
                    <img
                      v-else
                      src="@/assets/icons/add.png"
                      @click="addService = !addService"
                    />
                  </div>
                </SfTableData>
              </SfTableRow>
            </SfTable>
          </SfTab>
        </SfTabs>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../config/local.json";
import axios from "axios";
import {
  SfButton,
  SfInput,
  SfTabs,
  SfTable,
  SfSelect,
} from "@storefront-ui/vue";
import FormData from "form-data";

export default {
  components: {
    SfButton,
    SfInput,
    SfTabs,
    SfTable,
    SfSelect,
  },
  data() {
    return {
      refreshRequired: false,
      bookingsCompleted: 0,
      adminBookings: [],
      userBookings: [],
      usersEmployed: [],
      assignerToggler: false,
      userToAssign: {
        id: "",
        services: [],
      },
      addNewLocation: false,
      editLocationDetails: false,
      newLocationDataUpdate: 0,
      addLocationDetails: {
        name: "",
        address: "",
        colors: [],
        phone: "",
        release_year: 0,
        program: {
          monday: {
            start: "",
            end: "",
          },
          tuesday: {
            start: "",
            end: "",
          },
          wednesday: {
            start: "",
            end: "",
          },
          thursday: {
            start: "",
            end: "",
          },
          friday: {
            start: "",
            end: "",
          },
          saturday: {
            start: "",
            end: "",
          },
          sunday: {
            start: "",
            end: "",
          },
        },
      },
      locationDetails: {
        release_year: 0,
        name: "",
        phone: "",
        address: "",
      },
      editDetails: false,
      editServiceId: "",
      addService: false,
      setNewColor: false,
      colorToAdd: "",
      editScheduleKey: "",
      scheduleToEdit: {
        start: "",
        end: "",
      },
      serviceToEdit: {
        name: "",
        duration: "",
        price: "",
      },
      details: {
        hometown: "",
        start_carrier: "",
        start_company: "",
        inspiration: "",
        about_me: "",
        hobbies: "",
      },
      token: "",
      trigger: 0,
      accountDetails: {},
      employees: [],
      services: [],
      locations: [],
      location: "",
      selectedRole: "",
      roles: ["admin", "employee", "user"],
    };
  },
  mounted() {
    this.getAccountDetails();
    if (this.userType === "admin") {
      this.getUsers();
      this.getServices();
      this.getLocations();
    }
  },
  watch: {
    locations() {
      let updatedLocation = this.locations.find(
        (location) => location.id === this.location.id
      );
      this.setLocation(updatedLocation);
    },
    addLocationDetails() {
      this.newLocationDataUpdate = this.newLocationDataUpdate + 1;
    },
  },
  computed: {
    formFilled() {
      if (!this.details.hometown) {
        return false;
      } else if (!this.details.start_carrier) {
        return false;
      } else if (
        !this.details.start_company &&
        this.accountDetails.role !== "user"
      ) {
        return false;
      } else if (!this.details.inspiration) {
        return false;
      } else if (!this.details.about_me) {
        return false;
      }
      return true;
    },
    userType() {
      return localStorage.getItem("userRole");
    },
  },
  methods: {
    refreshOrders() {
      this.getUserBookings();
      this.refreshRequired = false;
    },
    payOrder(id) {
      let token = localStorage.getItem("userToken");
      axios
        .get(
          config.api.url +
            config.bookings.checkout_endpoint.replace("{{id}}", id),
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          window.open(res.data.url, "_blank");
          this.refreshRequired = true;
        });
    },
    closeOrder(id) {
      let token = localStorage.getItem("userToken");
      let data = {
        payment_status: "paid",
        status: "closed",
      };
      axios
        .patch(
          config.api.url +
            config.bookings.update_endpoint.replace("{{id}}", id),
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.$store.dispatch("spawnNotification", {
            type: "success",
            message: "Order closed successfully.",
            action1: { label: "OK" },
          });
          this.getAdminBookings();
          this.getPaidAdminBookings();
        });
    },
    getUserBookings() {
      let token = localStorage.getItem("userToken");
      axios
        .get(config.api.url + config.bookings.endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          this.userBookings = res.data.data.bookings;
        });
    },
    getAdminBookings() {
      let token = localStorage.getItem("userToken");
      axios
        .get(
          config.api.url +
            config.bookings.admin_endpoint +
            `?employee=${this.accountDetails.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res);
          this.adminBookings = res.data.data.bookings;
        });
    },
    getPaidAdminBookings() {
      let token = localStorage.getItem("userToken");
      axios
        .get(
          config.api.url +
            config.bookings.admin_endpoint +
            `?employee=${this.accountDetails.id}&status=closed`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          this.bookingsCompleted = res.data.data.all;
        });
    },
    assignEmployeeToLocation() {
      let services = [];
      this.userToAssign.services.forEach((service) =>
        services.push(service.id)
      );

      let token = localStorage.getItem("userToken");

      axios
        .patch(
          config.api.url +
            config.locations.employee_endpoint
              .replace("{{id}}", this.location.id)
              .replace("{{employee}}", this.userToAssign.id),
          services,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.setLocation(this.location);
        });
    },
    deleteAssignedEmployee(employee) {
      let token = localStorage.getItem("userToken");
      axios
        .delete(
          config.api.url +
            config.locations.employee_endpoint
              .replace("{{id}}", this.location.id)
              .replace("{{employee}}", employee),
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.setLocation(this.location);
        });
    },
    assignServiceToEmployee(service) {
      let serviceIsSelected = false;
      if (this.userToAssign.services.length) {
        this.userToAssign.services.forEach((item) => {
          serviceIsSelected = item.id === service.id;
        });
      } else {
        serviceIsSelected = false;
      }
      if (!serviceIsSelected) {
        this.userToAssign.services.push(service);
        service.isSelected = true;
      } else {
        this.userToAssign.services = this.userToAssign.services.filter(
          (item) => {
            return item.id !== service.id;
          }
        );
        service.isSelected = false;
      }
    },
    formatEmployeeServices(services) {
      let performedServices = "";
      services.forEach(
        (service) =>
          (performedServices = performedServices + service.name + ", ")
      );

      return performedServices.slice(0, -2);
    },
    changeRole(employee, role) {
      let token = localStorage.getItem("userToken");
      let data = { role: role };
      axios
        .patch(
          config.api.url +
            config.users.id_admin_endpoint.replace("{{id}}", employee),
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.$store.dispatch("spawnNotification", {
            type: "success",
            message: "Role updated successfully.",
            action1: { label: "OK" },
          });
        });
    },
    toggleAddLocation() {
      this.addNewLocation = !this.addNewLocation;
    },
    addLocation() {
      let token = localStorage.getItem("userToken");
      axios
        .post(
          config.api.url + config.locations.new_endpoint,
          this.addLocationDetails,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.getLocations();
          this.addNewLocation = !this.addNewLocation;
          this.$store.dispatch("spawnNotification", {
            type: "success",
            message: "Location added successfully.",
            action1: { label: "OK" },
          });
        });
    },
    newLocationAddColor() {
      if (this.colorToAdd === "") {
        this.setNewColor = !this.setNewColor;
      } else {
        this.addLocationDetails.colors.push(this.colorToAdd);
        this.colorToAdd = "";
      }
    },
    newLocationRemoveColor(color) {
      let filteredColors = this.addLocationDetails.colors.filter(
        (item) => item !== color
      );
      this.addLocationDetails.colors = filteredColors;
    },
    toggleEditLocation() {
      this.editLocationDetails = !this.editLocationDetails;
      this.locationDetails.release_year = this.location.release_year;
      this.locationDetails.name = this.location.name;
      this.locationDetails.phone = this.location.phone;
      this.locationDetails.address = this.location.address;
    },
    editLocation() {
      let token = localStorage.getItem("userToken");
      axios
        .patch(
          config.api.url +
            config.locations.id_admin_update_endpoint.replace(
              "{{id}}",
              this.location.id
            ),
          this.locationDetails,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.getLocations();
          this.editLocationDetails = !this.editLocationDetails;
          this.$store.dispatch("spawnNotification", {
            type: "success",
            message: "Location updated successfully.",
            action1: { label: "OK" },
          });
        });
    },
    seePage(slug) {
      this.$router.push("/locations/" + slug);
    },
    getCoverImage(images) {
      const picture = images.find((image) => image.cover === true);
      if (picture !== undefined) {
        return config.api.url + picture.filePath;
      }
    },
    addColor() {
      if (this.colorToAdd === "") {
        this.setNewColor = !this.setNewColor;
      } else {
        let token = localStorage.getItem("userToken");
        let colors = this.location.colors;
        colors.push(this.colorToAdd);
        let data = {
          colors: colors,
        };
        axios
          .patch(
            config.api.url +
              config.locations.id_admin_update_endpoint.replace(
                "{{id}}",
                this.location.id
              ),
            data,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            this.getLocations();
            this.setNewColor = !this.setNewColor;
            this.colorToAdd = "";
            this.$store.dispatch("spawnNotification", {
              type: "success",
              message: "Color added successfully.",
              action1: { label: "OK" },
            });
          });
      }
    },
    removeColor(color) {
      let token = localStorage.getItem("userToken");
      let colors = this.location.colors.filter((item) => item !== color);
      let data = {
        colors: colors,
      };
      axios
        .patch(
          config.api.url +
            config.locations.id_admin_update_endpoint.replace(
              "{{id}}",
              this.location.id
            ),
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.getLocations();
          this.$store.dispatch("spawnNotification", {
            type: "success",
            message: "Color removed successfully.",
            action1: { label: "OK" },
          });
        });
    },
    addNewPicture(e) {
      let imageFile = e.target.files[0];
      let formData = new FormData();
      formData.append("pictures", imageFile);

      let token = localStorage.getItem("userToken");
      axios
        .put(
          config.api.url +
            config.locations.add_picture_endpoint.replace(
              "{{id}}",
              this.location.id
            ),
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          this.getLocations();
        });
    },
    deletePicture(id) {
      let token = localStorage.getItem("userToken");
      axios
        .delete(
          config.api.url +
            config.locations.pictures_admin_endpoint
              .replace("{{id}}", this.location.id)
              .replace("{{pictureId}}", id),
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.getLocations();
        });
    },
    setCoverPicture(id) {
      let token = localStorage.getItem("userToken");
      axios
        .patch(
          config.api.url +
            config.locations.pictures_admin_endpoint
              .replace("{{id}}", this.location.id)
              .replace("{{pictureId}}", id),
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.getLocations();
        });
    },
    getImage(imagePath) {
      return config.api.url + imagePath;
    },
    editSchedule(key) {
      this.editScheduleKey = key;
    },
    updateSchedule(day) {
      let updatedSchedule = this.location.program;
      updatedSchedule[day].start = this.scheduleToEdit.start;
      updatedSchedule[day].end = this.scheduleToEdit.end;

      let token = localStorage.getItem("userToken");
      axios
        .patch(
          config.api.url +
            config.locations.id_admin_update_endpoint.replace(
              "{{id}}",
              this.location.id
            ),
          updatedSchedule,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.editScheduleKey = "";
          this.getServices();
          this.$store.dispatch("spawnNotification", {
            type: "success",
            message: "Schedule updated successfully.",
            action1: { label: "OK" },
          });
        });
    },
    editService(service) {
      this.editServiceId = service.id;
      this.serviceToEdit.name = service.name;
      this.serviceToEdit.duration = service.duration;
      this.serviceToEdit.price = service.price;
    },
    addNewService() {
      if (
        this.serviceToEdit.name === "" ||
        this.serviceToEdit.duration === "" ||
        this.serviceToEdit.price === ""
      ) {
        this.addService = !this.addService;
      } else {
        let token = localStorage.getItem("userToken");
        axios
          .post(
            config.api.url + config.services.all_endpoint,
            this.serviceToEdit,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            this.addService = !this.addService;
            this.serviceToEdit.name = "";
            this.serviceToEdit.duration = "";
            this.serviceToEdit.price = "";
            this.getServices();
            this.$store.dispatch("spawnNotification", {
              type: "success",
              message: "Service added successfully.",
              action1: { label: "OK" },
            });
          });
      }
    },
    updateService(id) {
      let token = localStorage.getItem("userToken");
      axios
        .patch(
          config.api.url +
            config.services.id_admin_endpoint.replace("{{id}}", id),
          this.serviceToEdit,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          this.editServiceId = "";
          this.getServices();
          this.$store.dispatch("spawnNotification", {
            type: "success",
            message: "Service updated successfully.",
            action1: { label: "OK" },
          });
        });
    },
    getAvatar(path) {
      return config.api.url + path;
    },
    editAvatar() {
      this.$refs.fileInput.click();
    },
    changePicture(e) {
      let token = localStorage.getItem("userToken");
      axios
        .delete(config.api.url + config.users.profilePicture_endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.setProfilePicture(e);
        })
        .catch((err) => {
          console.log(err);
          this.setProfilePicture(e);
        });
    },
    setProfilePicture(e) {
      let imageFile = e.target.files[0];
      let formData = new FormData();
      formData.append("picture", imageFile);

      let token = localStorage.getItem("userToken");
      axios
        .put(config.api.url + config.users.profilePicture_endpoint, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.getAccountDetails();
        });
    },
    editInformation() {
      this.details.hometown = this.accountDetails.description;
      this.details.start_carrier = this.accountDetails.start_carrier;
      this.details.start_company = this.accountDetails.start_company;
      this.details.inspiration = this.accountDetails.inspiration;
      this.details.about_me = this.accountDetails.about_me;
      this.details.hobbies = this.accountDetails.hobbies;
      this.editDetails = !this.editDetails;
    },
    updateInfo() {
      let token = localStorage.getItem("userToken");
      let data = {
        description: this.details.hometown,
        start_carrier: this.details.start_carrier,
        start_company: this.details.start_company,
        inspiration: this.details.inspiration,
        about_me: this.details.about_me,
        hobbies: this.details.hobbies,
      };
      axios
        .patch(config.api.url + config.users.me_endpoint, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.getAccountDetails();
          this.editDetails = !this.editDetails;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAccountDetails() {
      let token = localStorage.getItem("userToken");
      axios
        .get(config.api.url + config.users.me_endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          this.accountDetails = res.data.data.user;
          this.trigger = this.trigger + 1;
          if (this.userType === "user") {
            this.getUserBookings();
          }
          if (this.userType !== "user") {
            this.getAdminBookings();
            this.getPaidAdminBookings();
          }
        })
        .catch(() => {
          this.refreshSession();
        });
      this.trigger = this.trigger + 1;
    },
    refreshSession() {
      let token = localStorage.getItem("userToken");
      axios
        .patch(
          config.api.url + config.auth.refreshToken_endpoint,
          { refreshToken: localStorage.getItem("refreshToken") },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            this.getAccountDetails();
          }
        })
        .catch(() => {
          localStorage.setItem("userToken", "");
          localStorage.setItem("refreshToken", "");
          localStorage.setItem("userRole", "");
          this.$router.push("/login");
          this.$store.dispatch("spawnNotification", {
            type: "warning",
            message: "Something went wrong. You've been logged out.",
            action1: { label: "OK" },
          });
        });
    },
    logout() {
      localStorage.setItem("userToken", "");
      localStorage.setItem("refreshToken", "");
      localStorage.setItem("userRole", "");
      this.$router.push("/");
      this.$store.dispatch("spawnNotification", {
        type: "success",
        message: "You logged out.",
        action1: { label: "OK" },
      });
    },
    getUsers() {
      let token = localStorage.getItem("userToken");
      axios
        .get(config.api.url + config.users.all_admin_endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          let users = res.data.data.users;
          users.forEach((user) => (user.roleToChange = user.role));
          this.employees = users;
          this.userToAssign.id = users[0].id;
        });
    },
    getEmployedUsers(location) {
      let token = localStorage.getItem("userToken");
      axios
        .get(
          config.api.url +
            config.users.all_admin_endpoint +
            `?&location=${location}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          this.usersEmployed = res.data.data.users;
        });
    },
    getServices() {
      axios.get(config.api.url + config.services.all_endpoint).then((res) => {
        let formattedServices = res.data.data.services;
        formattedServices.forEach((service) => {
          service.isSelected = false;
        });
        this.services = formattedServices;
      });
    },
    getLocations() {
      axios
        .get(
          config.api.url +
            config.locations.all_endpoint
              .replace("{{page}}", 1)
              .replace("{{limit}}", 25)
        )
        .then((res) => {
          this.locations = res.data.data.locations;
        });
    },
    setLocation(location) {
      let token = localStorage.getItem("userToken");
      let url = location.id
        ? config.api.url +
          config.locations.id_admin_endpoint.replace("{{id}}", location.id)
        : config.api.url +
          config.locations.all_endpoint
            .replace("{{page}}", 1)
            .replace("{{limit}}", 25);
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (location.id) {
            this.location = res.data.data.location;
            this.getEmployedUsers(res.data.data.location.id);
          } else {
            this.location = location;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#myAccount {
  background: var(--c-light);
  padding: var(--spacer-xl) 0;
}
.myAccount {
  background: var(--c-light);
  padding: var(--spacer-xl) 0;

  &__container {
    display: flex;
    max-width: 84%;
    justify-content: center;
    margin: 0 auto;
  }
  &__profile {
    background: var(--c-white);
    padding: var(--spacer-xl) var(--spacer-lg);
    margin-right: var(--spacer-lg);
    min-height: 25rem;
    &--image {
      &-container {
        position: relative;
        width: 12rem;
        overflow: hidden;
        border-radius: 50%;
        margin: 0 auto;
        background: var(--c-light);
        min-width: 12rem;
        min-height: 12rem;

        img {
          display: block;
          position: absolute;
          width: 100%;
        }
        .editAvatar {
          opacity: 0;
          background: rgba(0, 0, 0, 0.5);
          color: var(--c-white);
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.25s ease;
          &:hover {
            opacity: 1;
          }
        }
      }
      &-orders {
        width: 6rem;
        text-align: center;
        border-radius: 50px;
        margin: 0 auto;
        background: var(--c-primary);
        color: var(--c-white);
        transform: translateY(-75%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacer-2xs) 0;

        img {
          width: 1.25rem;
          margin-right: var(--spacer-xs);
          filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(152deg)
            brightness(103%) contrast(103%);
        }
      }
    }
    &--name {
      text-align: center;
      text-transform: capitalize;
      font-weight: var(--font-semibold);
      font-size: var(--font-lg);
      p {
        margin: 0;
        padding-top: var(--spacer-sm);
      }
    }
    &--services {
      text-align: center;
      margin-bottom: var(--spacer-base);
      p {
        text-transform: uppercase;
        margin: 0 var(--spacer-sm);
        font-size: var(--font-xs);
      }
    }
    &--actions {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: calc(100% - (2.5rem + 220px + 22px + 15px));
      &-primary {
        margin: 0 auto;
        margin-bottom: var(--spacer-sm);
        --button-font-size: var(--font-sm);
        --button-font-weight: var(--font-normal);
        --button-height: var(--spacer-lg);
        --button-padding: var(--spacer-xs) var(--spacer-xl);
      }
      &-secondary {
        text-transform: uppercase;
        font-size: var(--font-2xs);
        text-decoration: none;
        color: var(--c-danger);
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  &__details {
    background: var(--c-white);
    padding: var(--spacer-xl) var(--spacer-lg);
    min-width: 25rem;
    &--carrier {
      &:not(:last-child) {
        margin-bottom: var(--spacer-sm);
      }
      b {
        font-weight: var(--font-semibold);
      }
    }
    h4 {
      font-weight: var(--font-semibold);
    }
    &--tab {
      font-family: var(--font-family-secondary);
    }
  }
}
.editInformation {
  margin-top: var(--spacer-xl);
  --button-font-size: var(--font-xs);
  --button-font-weight: var(--font-medium);
  --button-height: 2.5rem;
}
.form {
  &__element {
    --input-label-font-size: var(--font-base);
  }
}
.flex {
  display: flex;
  width: 12rem;
  justify-content: space-between;
}
.inputPicture {
  display: none;
}
.services {
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
      .sf-table__data {
        input {
          background: var(--c-light);
          border: none;
          font-family: var(--font-family-secondary);
          max-width: 10rem;
        }
        .scheduleInput {
          max-width: 4rem;
        }
        &:not(:first-child) {
          text-align: center;
          input {
            text-align: center;
          }
        }
      }
    }
    &::v-deep .sf-table__heading {
      .sf-table__header {
        &:not(:first-child) {
          text-align: center;
        }
      }
    }
  }
}
.editService {
  max-width: 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
  img {
    width: 100%;
    cursor: pointer;
  }
}
.locations {
  display: flex;
  flex-wrap: wrap;
}
.location {
  position: relative;
  max-width: 33.33%;
  max-height: 10rem;
  overflow: hidden;
  flex: 1 1 33.33%;
  &__image {
    width: 100%;
    &--add {
      opacity: 0;
    }
    &--container {
      position: relative;
      max-height: 9rem;
      margin: var(--spacer-sm) var(--spacer-xs);
    }
    &--overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      // background: rgba(0,0,0,.5);
      opacity: 0.5;
      top: 0;
      left: 0;
      &-add {
        opacity: 1;
        background: var(--c-gray);
      }
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
    font-size: 1.75rem;
    margin: 0 0 var(--spacer-sm);
    width: 10rem;
  }
  &__action {
    --button-background: var(--c-black);
    --button-font-size: var(--font-xs);
    --button-font-weight: var(--font-normal);
    --button-height: 2rem;
    --button-border-width: 1px;
    --button-border: solid var(--c-black);
    --button-box-shadow: none;
    margin: 0 auto;
    transition: 0.3s all ease;

    &:hover {
      --button-background: rgba(155, 155, 155, 0.25);
      --button-color: var(--c-black);
    }
  }
}
.locationPage {
  display: flex;
  &__colors {
    display: flex;
    flex-wrap: wrap;
    &--color {
      position: relative;
      max-width: 2rem;
      height: 2rem;
      flex: 1 1 15%;
      margin-right: var(--spacer-xs);
      cursor: pointer;
      &-overlay {
        background: rgba(0, 0, 0, 0.15);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        transition: all 0.3s ease;
        img {
          width: 100%;
          transform: scale(0.5);
          // filter: invert(99%) sepia(0%) saturate(359%) hue-rotate(90deg) brightness(117%) contrast(100%);
        }
        &:hover {
          opacity: 1;
        }
      }
      &-add {
        background: var(--c-light);
        cursor: pointer;
        transition: 0.3s all ease;
        &:hover {
          background: var(--c-light-darken);
        }
        img {
          width: 100%;
          transform: scale(0.25);
        }
      }
    }
  }
  &__title {
    font-size: 2rem;
    font-family: var(--font-family-secondary);
    margin-bottom: var(--spacer-xs);
    text-transform: uppercase;
  }
  &__schedule {
    width: 100%;
  }
  &__gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &--container {
      h4 {
        font-size: 2rem;
        font-family: var(--font-family-secondary);
        margin-bottom: var(--spacer-xs);
        text-transform: uppercase;
      }
    }
    &--image {
      position: relative;
      max-width: 32.33%;
      flex: 1 1 32.33%;
      height: 10rem;
      overflow: hidden;
      margin-bottom: var(--spacer-xs);
      background: var(--c-light);
      img {
        height: 11rem;
        width: auto;
      }
      &-new {
        img {
          transform: scale(0.25) translateY(-25%);
          display: block;
          margin: 0 auto;
        }
      }
      &-cover {
        outline: 5px solid var(--c-black);
        outline-offset: -5px;
      }
      &-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        color: var(--c-white);
        transition: all 0.25s ease;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
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
    &--new {
      background: var(--c-gray);
    }
    margin-right: var(--spacer-sm);
    padding: var(--spacer-lg);
    color: var(--c-white);
    // min-width: 15.5rem;
    font-family: var(--font-family-secondary);
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
        filter: invert(100%) sepia(5%) saturate(0%) hue-rotate(18deg)
          brightness(108%) contrast(105%);
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
    transition: all 0.25s ease;
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

.setCoverImage {
  margin: var(--spacer-sm) 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.deleteImage {
  margin: var(--spacer-sm) 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.releaseYear {
  display: flex;
  align-items: center;
  input {
    width: 3rem;
    height: 1rem;
    margin-left: var(--spacer-sm);
  }
}
.locationNameInput {
  width: 100%;
  height: 2rem;
  text-align: center;
}
.locationContactInput {
  height: 1.5rem;
}
.capitalizeKey {
  text-transform: capitalize;
}
.employees {
  &__employee {
    &--thumbnail {
      display: flex;
      align-items: center;
      max-width: 2.5rem;
      border-radius: 50%;
      height: 100%;
      min-height: 2.5rem;
      min-width: 2.5rem;
      position: relative;
      overflow: hidden;
      img {
        display: block;
        border-radius: 50%;
        min-height: 2.5rem;
        width: 100%;
        position: absolute;
      }
    }
    &--name {
      margin: var(--spacer-2xs) 0 0;
      line-height: 1;
    }
    &--email {
      font-size: var(--font-2xs);
    }
    &--date {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      margin: 0;
    }
    &--role {
      padding: 0;
      --select-height: 2rem;
      --product-option-font-size: var(--font-sm);
      --select-selected-padding: var(--spacer-xs) var(--spacer-sm) 0
        var(--spacer-2xs);
      --select-label-font-size: var(--font-sm);
      --select-option-font-family: var(--font-family-secondary);
      &::v-deep .sf-select-option {
        --select-option-font-size: var(--font-sm);
      }
    }
  }
}
.servicesAvailable {
  &__container {
    display: flex;
    flex-wrap: wrap;

    button {
      max-width: 4rem;
    }
  }
}
.userToAssign {
  display: flex;
  margin-top: var(--spacer-sm);
  &__button {
    --button-font-size: var(--font-sm);
    --button-height: 2.5rem;
    // --button-width: 100%;
    --button-background: var(--c-text);
    margin: var(--spacer-sm) 0 0;

    &--add {
      --button-font-size: var(--font-sm);
      --button-height: 2.5rem;
      --button-width: 100%;
      --button-background: var(--c-text);
      margin-top: var(--spacer-sm);
    }
  }
  &__item {
    flex: 1 1 50%;

    span {
      background: var(--c-light);
      padding: 0 var(--spacer-2xs);
      border-radius: 3px;
      margin: var(--spacer-2xs);
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .selectedItem {
      background: var(--c-primary) !important;
      color: var(--c-white);
      transition: all 0.15s ease;
    }
  }
}
.employeeAssign {
  &__name {
    flex: 1 1 40%;
  }
  &__services {
    flex: 1 1 60%;
    padding-left: var(--spacer-sm);
  }
  &__title {
  }
}
.bookings {
  &__client {
    position: relative;

    &--refresh {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__button {
    --button-font-size: var(--font-xs);
    --button-height: 1.75rem;
    --button-padding: var(--spacer-xs) var(--spacer-sm);
    --button-background: var(--c-text);
    margin: 0;
  }
  &__edit {
    display: flex;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
  }
  &__primary {
    font-weight: var(--font-medium);
    text-transform: uppercase;

    &--status {
      max-width: 5rem;
      height: 1rem;
      margin: var(--spacer-xs) auto 0;
    }
  }
}
.success {
  padding: var(--spacer-2xs);
  background: var(--c-primary);
  color: var(--c-white);
  border-radius: 2px;
}
.warning {
  padding: var(--spacer-2xs);
  background: var(--c-warning-darken);
  color: var(--c-white);
  border-radius: 2px;
}
.danger {
  padding: var(--spacer-2xs);
  background: var(--c-danger-darken);
  color: var(--c-white);
  border-radius: 2px;
}
</style>
