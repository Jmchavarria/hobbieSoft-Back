import { dataSeed } from "./data";
import { connectDB, db } from "../config";
import { generateHashPassword } from "../utils/hashpassword.utils";// import { Module, Privilege } from "../types";
import { Privilege } from "@prisma/client";

const main = async () => {
  try {
    const {
      Roles: seedRoles,
      Modules: seedModules,
      Permissions: seedPermissions,
      Users: seedUsers,
    } = dataSeed;
    await connectDB();

    // Se eliminan los datos existentes en las tablas 
    await db.users.deleteMany();
    await db.permissions.deleteMany();
    await db.modules.deleteMany();
    await db.roles.deleteMany();

    // se crean los datos en las tablas 
    await db.roles.createMany({
      data: seedRoles,
    });

    await db.modules.createMany({
      data: seedModules,
    });



    // Se buscan los roles y modulos
    const roles = await db.roles.findMany();
    const modules = await db.modules.findMany();


    const adminRoleId = await db.roles.findMany(
      {
        where: {
          name: 'cocinero'
        }
      }
    )


    console.log('VAMOS A VER', adminRoleId)


    // Se inicializa una constante de tipo array 
    const permissionsData: any[] = [];

    // modules.map(module => ({
    //   roleId: 
    // }))





    // Se iteran los modules y permisos y se crea un nuevo objeto con los datos de los permisos y modulos y se agrega al array de permisos
    modules.forEach((module: any) => {
      seedPermissions.forEach((permission: any) => {
        permissionsData.push({
          roleId: roles[0].id,
          moduleId: module.id,
          status: permission.status,
          privilege: permission.privilege as Privilege,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    await db.permissions.createMany({ data: permissionsData });

    console.log(permissionsData)

    // Seeding users  
    const usersData = seedUsers.map((user: any) => ({
      ...user,
      password: generateHashPassword(user.password),
      roleId: roles[0].id,
    }));
    await db.users.createMany({ data: usersData });

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.$disconnect();
  }
};

main();
