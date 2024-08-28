import { lazy, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import React from 'react';
/**
 * Lazily load the mentioned component which resides in the page directory
 * This method will be used in routes so that the files are loaded only
 * When users are on that route
 */
export function lazyLoadRoutes(componentName: string) {
  const LazyElement = lazy(() => import(`./${componentName}.tsx`));

  // Wrapping around the suspense component is mandatory
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyElement />
    </Suspense>
  );
}