import { prisma } from ".";
import bcrypt from "bcrypt"

export const createUser = (userData) => {
    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }

    return prisma.user.create({
        data: finalUserData
    })
}


export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username:username
        }
    })
}

export const getUserByEmail = (email) => {
    return prisma.user.findUnique({
        where: {
            email:email
        }
    })
}

export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}

if (getUserByEmail) {
    // Step 3: Generate and store reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now
  
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })
  
    // Step 4: Send password reset email
    const resetUrl = `https://example.com/reset-password?token=${resetToken}`
    await sendResetEmail(user.email, resetUrl)
  }
  
  // Step 6: Update password if reset token is valid
  const user = await prisma.user.findUnique({
    where: {
      resetToken: 'abcd1234',
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  })
  
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: 'newpassword',
        resetToken: null,
        resetTokenExpiry: null,
      },
    })
  }