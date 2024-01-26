<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-4">Patient View Page</h1>
      
      <!-- Display patient information -->
      <div v-if="patient">
        <p><strong>Name:</strong> {{ patient.name }}</p>
        <p><strong>Email:</strong> {{ patient.email }}</p>
        <p><strong>Gender:</strong> {{ patient.gender }}</p>
        <p><strong>Birthday:</strong> {{ patient.birthday }}</p>
      </div>
      
      <!-- Show loading message while data is being fetched -->
      <div v-else>Loading patient information...</div>
      
      <!-- Show error message if data fetch fails -->
      <div v-if="error" class="text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientView',
  data() {
    return {
      patient: null,
      error: null
    };
  },
  mounted() {
    // Fetch patient data when the component is mounted
    this.fetchPatient();
  },
  methods: {
    async fetchPatient() {
      try {
        // Make HTTP GET request to fetch patient data
        const response = await fetch(`/api/patients/${this.$route.params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        // Parse JSON response
        const data = await response.json();
        // Update patient data
        this.patient = data;
      } catch (error) {
        console.error('Error fetching patient:', error.message);
        // Update error message
        this.error = 'Failed to fetch patient data';
      }
    }
  }
}
</script>