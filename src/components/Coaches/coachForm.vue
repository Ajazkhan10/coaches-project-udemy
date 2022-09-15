<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid:!firstName.isvalid}">
      <label for="firstName">First Name</label>
      <input type="text" id="firsName" placeholder="FirstName" v-model.trim="firstName.val" @blur="clearVlaidate('firstName')" />
      <p v-if="!firstName.isvalid">FirstName is Not Valid</p>
    </div>
    <div class="form-control" :class="{invalid:!lastName.isvalid}">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" placeholder="LastName" v-model.trim="lastName.val" @blur="clearVlaidate('lastName')" />
      <p v-if="!lastName.isvalid">LastName is Not Valid</p>
    </div>
    <div class="form-control" :class="{invalid:!description.isvalid}" >
      <label for="description">Description</label>
      <textarea type="text" id="description" row="5" v-model.trim="description.val" @blur="clearVlaidate('description')" />
      <p v-if="!description.isvalid">Description is Not Valid</p>

    </div>
    <div class="form-control" :class="{invalid:!rate.isvalid}">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate.val"  @blur="clearVlaidate('rate')"/>
       <p v-if="!rate.isvalid">rate Expertize must be greator than 0</p>
    </div>
    <div class="form-control" :class="{invalid:!areas.isvalid}" >
      <h3>Area of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend"  v-model="areas.val" @blur="clearVlaidate('areas')"/>
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend"  v-model="areas.val" @blur="clearVlaidate('areas')" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career"  v-model="areas.val" @blur="clearVlaidate('areas')" />
        <label for="career">Career Adivsoory</label>
      </div>
       <p v-if="!areas.isvalid">tleast one should be slected</p>

    </div>
    <p v-if="!formValidation
    ">PLEASE FIX THE ABOVE ERROR AND SUBMIT THE FORM AGAIN</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isvalid: true
      },
      lastName: {
        val: "",
        isvalid: true
      },
      description: {
        val: "",
        isvalid: true
      },
      rate: {
        val: null,
        isvalid: true
      },
      areas: {
        val: [],
        isvalid: true
      },
      formIsValid: true
    };
  },
  methods: {
    clearVlaidate(input){
      this[input].isvalid=true
    },
    formValidation() {
      this.formIsValid = true;
      if (this.firstName.val === "") {
        this.firstName.isvalid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isvalid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isvalid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isvalid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isvalid = false;
        this.formIsValid = false;
      }
    },

    submitForm() {
      this.formValidation();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      };
      this.$emit("save-data", formData);
      console.log(formData);
      (this.firstName.val = ""),
        (this.lastName.val = ""),
        (this.description.val = ""),
        (this.rate.val = null),
        (this.areas.val = []);
    }
  }
};
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>