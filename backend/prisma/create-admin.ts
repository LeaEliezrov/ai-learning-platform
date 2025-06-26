import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('🔍 Checking for existing admin users...');
    
    // בדיקה אם משתמש אדמין כבר קיים
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('👤 Name:', existingAdmin.name);
      console.log('📱 Phone:', existingAdmin.phone);
      console.log('🎯 Use these credentials to login as admin');
      return existingAdmin;
    }

    console.log('🆕 Creating new admin user...');
    
    // יצירת משתמש אדמין חדש עם ערכי ברירת מחדל
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        phone: '0500000000',
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('� LOGIN CREDENTIALS:');
    console.log('   �👤 Name: ' + adminUser.name);
    console.log('   📱 Phone: ' + adminUser.phone);
    console.log('   👑 Role: ' + adminUser.role);
    console.log('');
    console.log('🎯 You can now login to the platform with these credentials!');
    console.log('💡 Once logged in, you will see an "Admin Dashboard" button');
    
    return adminUser;
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    console.error('💡 Make sure your database is running and accessible');
    throw error;
  }
}

async function main() {
  console.log('🚀 Admin User Creation Script');
  console.log('================================');
  
  try {
    await createAdminUser();
    console.log('');
    console.log('✅ Script completed successfully!');
  } catch (error) {
    console.error('❌ Script failed:', error);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  }
}

main();
