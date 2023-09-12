import React from 'react';
import '@testing-library/jest-dom';

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

global.React = React;
global.ResizeObserver = ResizeObserver;
