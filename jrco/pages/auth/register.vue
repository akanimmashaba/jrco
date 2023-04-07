<template>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </template>
  
  <script>
  import { reactive } from 'vue'
  import { PrismaClient } from '@prisma/client'
  
  const prisma = new PrismaClient()
  
  export default {
    setup() {
      const state = reactive({
        name: '',
        email: '',
        password: '',
      })
  
      const registerUser = async () => {
        // Validate form data
        if (!state.name || !state.email || !state.password) {
          alert('Please fill out all fields.')
          return
        }
  
        try {
          // Create user in Prisma
          const user = await prisma.user.create({
            data: {
              name: state.name,
              email: state.email,
              password: state.password,
            },
          })
  
          alert(`User ${user.name} created!`)
        } catch (error) {
          console.error(error)
          alert('Error creating user.')
        }
      }
  
      return {
        state,
        registerUser,
      }
    },
  }
  </script>
  