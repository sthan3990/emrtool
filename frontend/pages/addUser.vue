<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <form @submit.prevent="addUsers" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <!-- Username Input -->
        <div class="identity-input mb-4">
          <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input v-model="email" type="email" id="identity" placeholder="Email" class="...">
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <!-- Password Input -->
        <div class="password-input mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input v-model="password" type="password" id="password" placeholder="*******" class="...">
          <span class="text-xs text-red-700" id="passwordHelp"></span>
        </div>

        <!-- Role Dropdown -->
        <div class="role-input mb-6">
          <label for="role" class="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <select v-model="role" id="role" class="...">
            <option value="ADMIN">ADMIN</option>
            <option value="DOCTOR">DOCTOR</option>
            <option value="CLINIC_ASSISTANT">CLINIC ASSISTANT</option>
          </select>
          <span class="text-xs text-red-700" id="roleHelp"></span>
        </div>

        <!-- Sign In Button -->
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
      email: '',
      password: '',
      role: 'CLINIC_ASSISTANT'
    };
  },
 methods: {
  async addUsers() {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          role: this.role
        })
      });

      const data = await response.json();
      console.log(data); // Handle response from backend
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
};
</script>