import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error: err, event }) => {
  console.error('Server error:', err);
  console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace');
  console.error('Request URL:', event.url.pathname);
  console.error('Request method:', event.request.method);
  
  // Return error details - SvelteKit will handle form actions properly
  return {
    message: err instanceof Error ? err.message : 'An error occurred',
    status: 500
  };
};
