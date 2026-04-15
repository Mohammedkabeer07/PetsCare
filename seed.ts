import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const animals = [
  {
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 2,
    description: 'Luna is a bundle of joy who loves to play fetch and swim. She is great with kids and other dogs.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    createdAt: serverTimestamp()
  },
  {
    name: 'Oliver',
    species: 'Cat',
    breed: 'Tabby',
    age: 1,
    description: 'Oliver is a curious little explorer who enjoys climbing and napping in sunny spots.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    createdAt: serverTimestamp()
  },
  {
    name: 'Bella',
    species: 'Dog',
    breed: 'Beagle',
    age: 4,
    description: 'Bella is a gentle soul with a keen nose. She loves long walks and sniffing out adventures.',
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    createdAt: serverTimestamp()
  },
  {
    name: 'Milo',
    species: 'Cat',
    breed: 'Siamese',
    age: 3,
    description: 'Milo is very vocal and loves to be the center of attention. He is a loyal companion.',
    imageUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    createdAt: serverTimestamp()
  },
  {
    name: 'Daisy',
    species: 'Rabbit',
    breed: 'Holland Lop',
    age: 1,
    description: 'Daisy is a sweet rabbit who loves carrots and being gently petted.',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    createdAt: serverTimestamp()
  },
  {
    name: 'Charlie',
    species: 'Dog',
    breed: 'French Bulldog',
    age: 2,
    description: 'Charlie is a playful pup with a big personality. He loves cuddles and short walks.',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    createdAt: serverTimestamp()
  }
];

async function seed() {
  console.log('Seeding animals...');
  for (const animal of animals) {
    try {
      await addDoc(collection(db, 'animals'), animal);
      console.log(`Added ${animal.name}`);
    } catch (e) {
      console.error(`Error adding ${animal.name}:`, e);
    }
  }
  console.log('Seeding complete!');
}

seed();
