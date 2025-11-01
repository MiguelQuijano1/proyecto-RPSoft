// src/features/contact/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { contactHandlers } from './handlers';

export const worker = setupWorker(...contactHandlers);