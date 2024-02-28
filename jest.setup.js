import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom'
import 'cross-fetch/polyfill'

jest.mock('uuid', () => ({ v4: () => Math.random().toString() }));
