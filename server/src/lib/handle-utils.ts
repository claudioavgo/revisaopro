const adjectives = [
  'happy',
  'smart',
  'fast',
  'brave',
  'calm',
  'brilliant',
  'wise',
  'good',
  'strong',
  'cool',
  'wild',
  'free',
  'pure',
  'true',
  'intelligent',
  'peaceful',
  'lucky',
  'quick',
  'sharp',
  'tuned',
  'speedy',
  'better',
  'hot',
  'soft',
  'hard',
  'deep',
  'tall',
  'short',
  'new',
  'old',
  'young',
  'rich',
  'poor',
  'dark',
  'light',
  'long',
  'brief',
];

const animals = [
  'panda',
  'tiger',
  'eagle',
  'wolf',
  'bear',
  'lion',
  'fox',
  'deer',
  'falcon',
  'owl',
  'cat',
  'dog',
  'bird',
  'fish',
  'duck',
  'swan',
  'seal',
  'whale',
  'shark',
  'dolphin',
  'otter',
  'beaver',
  'rabbit',
  'hare',
  'rat',
  'mouse',
  'snake',
  'toad',
  'frog',
  'turtle',
  'crab',
  'lobster',
  'ant',
  'bee',
  'wasp',
  'moth',
  'fly',
  'insect',
  'worm',
  'slug',
];

/**
 * Generates a random handle that is between 3 and 20 characters long.
 * The handle will be in the format: adjective-animal-number
 * Example: happy-panda-42
 */
export function generateRandomUsername(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomNumber = Math.floor(Math.random() * 1000);

  const handle = `${randomAdjective}-${randomAnimal}-${randomNumber}`;
  if (handle.length > 20) {
    return `${randomAdjective.slice(0, 3)}-${randomAnimal.slice(0, 3)}-${randomNumber}`;
  }

  return handle;
}
