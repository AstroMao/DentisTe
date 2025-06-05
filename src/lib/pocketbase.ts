import PocketBase from 'pocketbase';

export const PB_URL = 'http://10.1.1.3'; // Your Pocketbase server URL

const pb = new PocketBase(PB_URL);

// Optional: To see auth store changes in real-time
pb.authStore.onChange((token, model) => {
  console.log('Auth store changed:', token, model);
});

export default pb;