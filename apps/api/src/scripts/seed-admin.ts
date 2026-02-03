import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { Role } from '../common/enums/role.enum';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    const adminExists = await usersService.findByEmail('admin@events.com');

    if (!adminExists) {
      await usersService.create({
        fullName: 'Admin',
        email: 'admin@events.com',
        password: 'admin123',
        role: Role.ADMIN,
      });
      console.log('Admin user created successfully');
      console.log('Email: admin@events.com');
      console.log('Password: admin123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await app.close();
  }
}

seedAdmin();
