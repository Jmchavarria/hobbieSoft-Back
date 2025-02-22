import { PrismaClient } from "@prisma/client";
import { dataSeed } from "./data";
import { db } from "../config/db.config";
import bcrypt from 'bcrypt'


const { users } = dataSeed
const prisma = new PrismaClient()
async function main() {


    await db.users.deleteMany()


    
    
    for (const user of users) {
      // Generar el hash de la contraseña
      const hashedPassword = await bcrypt.hash(user.password, 10);
  
      // Crear usuario con contraseña encriptada
      const users = await prisma.users.createMany({
        data:{
            name: user.name, 
            lastName: user.lastName,  
            email: user.email, 
            age: user.age, 
            status: user.status, 
            sex: user.sex, 
            password: hashedPassword
        }
      });}
    }
    

console.log('Seed creado correctamente 🌱')

main().catch((error) => {
    console.error(error)
    process.exit()
}).finally(async () => {
    await prisma.$disconnect
}) 


// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';
// import { users, posts } from './data';

// const prisma = new PrismaClient();



// main()
//   .catch((e) => {
//     console.error('❌ Error seeding the database:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
