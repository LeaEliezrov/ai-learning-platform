import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function seedCategories() {
  console.log('🌱 Starting to seed categories and subcategories...');

  try {
    // Clear existing data first
    await prisma.subCategory.deleteMany({});
    await prisma.category.deleteMany({});
    console.log('🧹 Cleared existing categories and subcategories');

    // Mathematics
    const mathematics = await prisma.category.create({
      data: {
        name: 'Mathematics',
        subCategories: {
          create: [
            { name: 'Algebra' },
            { name: 'Geometry' },
            { name: 'Calculus' },
            { name: 'Statistics' },
            { name: 'Probability' },
            { name: 'Linear Algebra' },
            { name: 'Discrete Mathematics' },
            { name: 'Number Theory' },
            { name: 'Trigonometry' },
            { name: 'Mathematical Analysis' }
          ]
        }
      }
    });

    // Computer Science
    const computerScience = await prisma.category.create({
      data: {
        name: 'Computer Science',
        subCategories: {
          create: [
            { name: 'Programming Fundamentals' },
            { name: 'Data Structures' },
            { name: 'Algorithms' },
            { name: 'Database Systems' },
            { name: 'Computer Networks' },
            { name: 'Operating Systems' },
            { name: 'Software Engineering' },
            { name: 'Cybersecurity' },
            { name: 'Machine Learning' },
            { name: 'Artificial Intelligence' },
            { name: 'Web Development' },
            { name: 'Mobile Development' }
          ]
        }
      }
    });

    // Natural Sciences
    const physics = await prisma.category.create({
      data: {
        name: 'Physics',
        subCategories: {
          create: [
            { name: 'Classical Mechanics' },
            { name: 'Thermodynamics' },
            { name: 'Electromagnetism' },
            { name: 'Quantum Physics' },
            { name: 'Relativity' },
            { name: 'Nuclear Physics' },
            { name: 'Optics' },
            { name: 'Acoustics' },
            { name: 'Solid State Physics' },
            { name: 'Astrophysics' }
          ]
        }
      }
    });

    const chemistry = await prisma.category.create({
      data: {
        name: 'Chemistry',
        subCategories: {
          create: [
            { name: 'Organic Chemistry' },
            { name: 'Inorganic Chemistry' },
            { name: 'Physical Chemistry' },
            { name: 'Analytical Chemistry' },
            { name: 'Biochemistry' },
            { name: 'Environmental Chemistry' },
            { name: 'Polymer Chemistry' },
            { name: 'Medicinal Chemistry' },
            { name: 'Materials Chemistry' },
            { name: 'Industrial Chemistry' }
          ]
        }
      }
    });

    const biology = await prisma.category.create({
      data: {
        name: 'Biology',
        subCategories: {
          create: [
            { name: 'Cell Biology' },
            { name: 'Molecular Biology' },
            { name: 'Genetics' },
            { name: 'Ecology' },
            { name: 'Evolution' },
            { name: 'Anatomy' },
            { name: 'Physiology' },
            { name: 'Microbiology' },
            { name: 'Botany' },
            { name: 'Zoology' },
            { name: 'Marine Biology' },
            { name: 'Biotechnology' }
          ]
        }
      }
    });

    // Engineering
    const engineering = await prisma.category.create({
      data: {
        name: 'Engineering',
        subCategories: {
          create: [
            { name: 'Mechanical Engineering' },
            { name: 'Electrical Engineering' },
            { name: 'Civil Engineering' },
            { name: 'Chemical Engineering' },
            { name: 'Aerospace Engineering' },
            { name: 'Environmental Engineering' },
            { name: 'Industrial Engineering' },
            { name: 'Biomedical Engineering' },
            { name: 'Materials Engineering' },
            { name: 'Robotics Engineering' }
          ]
        }
      }
    });

    // Business & Economics
    const business = await prisma.category.create({
      data: {
        name: 'Business & Economics',
        subCategories: {
          create: [
            { name: 'Microeconomics' },
            { name: 'Macroeconomics' },
            { name: 'Finance' },
            { name: 'Accounting' },
            { name: 'Marketing' },
            { name: 'Management' },
            { name: 'International Business' },
            { name: 'Entrepreneurship' },
            { name: 'Operations Management' },
            { name: 'Business Analytics' },
            { name: 'Supply Chain Management' },
            { name: 'Human Resources' }
          ]
        }
      }
    });

    // Languages & Literature
    const languages = await prisma.category.create({
      data: {
        name: 'Languages & Literature',
        subCategories: {
          create: [
            { name: 'English Literature' },
            { name: 'Creative Writing' },
            { name: 'Linguistics' },
            { name: 'Spanish Language' },
            { name: 'French Language' },
            { name: 'German Language' },
            { name: 'Chinese Language' },
            { name: 'Arabic Language' },
            { name: 'Hebrew Language' },
            { name: 'Translation Studies' },
            { name: 'Comparative Literature' },
            { name: 'Poetry & Prose' }
          ]
        }
      }
    });

    // Social Sciences
    const socialSciences = await prisma.category.create({
      data: {
        name: 'Social Sciences',
        subCategories: {
          create: [
            { name: 'Psychology' },
            { name: 'Sociology' },
            { name: 'Anthropology' },
            { name: 'Political Science' },
            { name: 'International Relations' },
            { name: 'Social Work' },
            { name: 'Criminology' },
            { name: 'Public Administration' },
            { name: 'Urban Planning' },
            { name: 'Gender Studies' }
          ]
        }
      }
    });

    // History & Humanities
    const history = await prisma.category.create({
      data: {
        name: 'History & Humanities',
        subCategories: {
          create: [
            { name: 'Ancient History' },
            { name: 'Medieval History' },
            { name: 'Modern History' },
            { name: 'World War Studies' },
            { name: 'Art History' },
            { name: 'Philosophy' },
            { name: 'Ethics' },
            { name: 'Religious Studies' },
            { name: 'Archaeology' },
            { name: 'Cultural Studies' },
            { name: 'Museum Studies' },
            { name: 'Historical Research Methods' }
          ]
        }
      }
    });

    // Medicine & Health Sciences
    const medicine = await prisma.category.create({
      data: {
        name: 'Medicine & Health Sciences',
        subCategories: {
          create: [
            { name: 'Human Anatomy' },
            { name: 'Physiology' },
            { name: 'Pathology' },
            { name: 'Pharmacology' },
            { name: 'Internal Medicine' },
            { name: 'Surgery' },
            { name: 'Pediatrics' },
            { name: 'Psychiatry' },
            { name: 'Radiology' },
            { name: 'Emergency Medicine' },
            { name: 'Public Health' },
            { name: 'Nursing' },
            { name: 'Physical Therapy' },
            { name: 'Nutrition' }
          ]
        }
      }
    });

    // Arts & Design
    const arts = await prisma.category.create({
      data: {
        name: 'Arts & Design',
        subCategories: {
          create: [
            { name: 'Fine Arts' },
            { name: 'Graphic Design' },
            { name: 'Industrial Design' },
            { name: 'Interior Design' },
            { name: 'Architecture' },
            { name: 'Digital Art' },
            { name: 'Photography' },
            { name: 'Film Studies' },
            { name: 'Music Theory' },
            { name: 'Theater Arts' },
            { name: 'Fashion Design' },
            { name: 'Animation' }
          ]
        }
      }
    });

    // Environmental Sciences
    const environmental = await prisma.category.create({
      data: {
        name: 'Environmental Sciences',
        subCategories: {
          create: [
            { name: 'Climate Science' },
            { name: 'Environmental Chemistry' },
            { name: 'Conservation Biology' },
            { name: 'Renewable Energy' },
            { name: 'Environmental Policy' },
            { name: 'Waste Management' },
            { name: 'Water Resources' },
            { name: 'Sustainability Studies' },
            { name: 'Environmental Impact Assessment' },
            { name: 'Green Technology' }
          ]
        }
      }
    });

    // Law & Legal Studies
    const law = await prisma.category.create({
      data: {
        name: 'Law & Legal Studies',
        subCategories: {
          create: [
            { name: 'Constitutional Law' },
            { name: 'Criminal Law' },
            { name: 'Civil Law' },
            { name: 'International Law' },
            { name: 'Corporate Law' },
            { name: 'Environmental Law' },
            { name: 'Intellectual Property Law' },
            { name: 'Human Rights Law' },
            { name: 'Tax Law' },
            { name: 'Legal Research' }
          ]
        }
      }
    });

    // Education & Pedagogy
    const education = await prisma.category.create({
      data: {
        name: 'Education & Pedagogy',
        subCategories: {
          create: [
            { name: 'Early Childhood Education' },
            { name: 'Elementary Education' },
            { name: 'Secondary Education' },
            { name: 'Higher Education' },
            { name: 'Special Education' },
            { name: 'Educational Psychology' },
            { name: 'Curriculum Development' },
            { name: 'Educational Technology' },
            { name: 'Adult Education' },
            { name: 'Distance Learning' }
          ]
        }
      }
    });

    console.log('✅ Categories and subcategories seeded successfully!');
    console.log(`Created 15 main categories with their subcategories:`);
    console.log('📊 Mathematics, Computer Science, Physics, Chemistry, Biology');
    console.log('🔧 Engineering, Business & Economics, Languages & Literature');
    console.log('👥 Social Sciences, History & Humanities, Medicine & Health Sciences');
    console.log('🎨 Arts & Design, Environmental Sciences, Law & Legal Studies, Education & Pedagogy');

    // Count total subcategories
    const totalSubcategories = await prisma.subCategory.count();
    console.log(`📈 Total subcategories created: ${totalSubcategories}`);

  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// הרץ את הseeding
seedCategories();
