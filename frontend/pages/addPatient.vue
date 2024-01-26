<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <form @submit.prevent="addPatient" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
        <!-- Name Input -->
        <div class="name-input mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input v-model="name" type="text" id="name" placeholder="Name" class="...">
          <span class="text-xs text-red-700" id="nameHelp"></span>
        </div>

        <!-- Email Input -->
        <div class="email-input mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input v-model="email" type="email" id="email" placeholder="Email" class="...">
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <!-- Gender Dropdown -->
        <div class="gender-input mb-4">
          <label for="gender" class="block text-gray-700 text-sm font-bold mb-2">Gender</label>
          <select v-model="gender" id="gender" class="...">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <span class="text-xs text-red-700" id="genderHelp"></span>
        </div>

        <!-- Birthday Input -->
        <div class="birthday-input mb-4">
          <label for="birthday" class="block text-gray-700 text-sm font-bold mb-2">Birthday</label>
          <input v-model="birthday" type="date" id="birthday" class="...">
          <span class="text-xs text-red-700" id="birthdayHelp"></span>
        </div>

        <!-- Register Button -->
        <div class="flex items-center justify-between">
          <button type="submit" class="...">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      gender: 'Male',
      birthday: ''
    };
  },
  methods: {
    async addPatient() {
      try {
        const response = await fetch('/api/patients/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            gender: this.gender,
            birthday: this.birthday
          })
        });

        const data = await response.json();
        console.log(data); 
      } catch (error) {
        console.error('Error registering patient:', error);
      }
    }
  }
};
</script>
