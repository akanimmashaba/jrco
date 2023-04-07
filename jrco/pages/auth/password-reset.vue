<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <label>
          Email:
          <input type="email" v-model="email" required>
        </label>
        <button type="submit">Reset Password</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        message: ''
      };
    },
    methods: {
      async handleSubmit() {
        const response = await this.$axios.post('/api/reset-password', { email: this.email });
  
        if (response.status === 200) {
          this.message = 'Password reset email sent';
        } else {
          this.message = 'User not found';
        }
      }
    }
  };
  </script>
  