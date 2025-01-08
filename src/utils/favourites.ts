import { Cocktail } from '@custom-types/cocktails';
import { WebTypeEnum } from '@custom-types/enums';

export const generateCocktailHash = async (
  cocktail: Cocktail,
  webType: WebTypeEnum
): Promise<string> => {
  const encoder = new TextEncoder(); // 1. Create a text encoder to handle string input.
  const data = encoder.encode(`${webType}${cocktail.id}`); // 2. Convert the input string into a byte array.
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // 3. Generate a SHA-256 hash.
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // 4. Convert the hash buffer into a byte array.
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(''); // 5. Convert each byte to a hexadecimal string and join them.
  return hashHex; // 6. Return the resulting hexadecimal hash.
};
