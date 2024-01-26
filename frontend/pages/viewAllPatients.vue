<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-4">All Patients View Page</h1>
      
      <!-- Display all the patients information in a table -->
      <table v-if="patients && patients.length > 0" class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Gender</th>
            <th class="px-4 py-2">Birthday</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.patientId" class="border-b">
            <td class="px-4 py-2">{{ patient.name }}</td>
            <td class="px-4 py-2">{{ patient.email }}</td>
            <td class="px-4 py-2">{{ patient.gender }}</td>
            <td class="px-4 py-2">{{ patient.birthday }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Show message if there are no patients -->
      <div v-else>No patients found.</div>
      
      <!-- Show loading message while data is being fetched -->
      <div v-if="loading">Loading patients...</div>
      
      <!-- Show error message if data fetch fails -->
      <div v-if="error" class="text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllPatientsView',
  data() {
    return {
      patients: null,
      error: null
    };
  },
  mounted() {
    // Fetch every patient data when the component is mounted
    this.fetchPatients();
  },
  methods: {
    async fetchPatients() {
      try {
        // Make HTTP GET request to fetch patient data
        const response = await fetch(`/api/patients/`);
        if (!response.ok) {
          throw new Error('Failed to fetch all patient data');
        }
        // Parse JSON response
        const data = await response.json();
        // Update patients data
        this.patients = data;
      } catch (error) {
        console.error('Error fetching patients:', error.message);
        // Update error message
        this.error = 'Failed to fetch all patient data';
      }
    }
  }
}
</script>