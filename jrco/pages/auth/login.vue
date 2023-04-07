<template>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </template>
  
  <script>
  import { reactive } from 'vue'
  import { PrismaClient } from '@prisma/client'
  
  const prisma = new PrismaClient()
  
  export default {
    setup() {
      const state = reactive({
        email: '',
        password: '',
      })
  
      const loginUser = async () => {
        try {
          // Find user in Prisma
          const user = await prisma.user.findUnique({
            where: {
              email: state.email,
            },
          })
  
          if (user && user.password === state.password) {
            alert(`Welcome, ${user.name}!`)
            // Grant user access to the application
          } else {
            alert('Invalid login information.')
          }
        } catch (error) {
          console.error(error)
          alert('Error logging in.')
        }
      }
  
      return {
        state,
        loginUser,
      }
    },
  }
  </script>
  