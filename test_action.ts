import { toggleTreinoFeito } from './app/dashboard/actions';
import { getDiarioLogs } from './app/dashboard/diario/actions';
import { getTreinosFeitos } from './app/dashboard/actions';

// mock next/headers and cookies
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: () => ({ value: 'test-user-id' })
  })
}));
