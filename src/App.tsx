import React, { useState } from 'react';
import { SmoothScrollProvider, useSmoothScroll } from './components/providers/SmoothScrollProvider';
import { HeroInteractionProvider } from './context/HeroInteractionContext';
import { Loader } from './components/sections/Loader';
import { StillHeader } from './components/sections/StillHeader';
import { StillHero } from './components/sections/StillHero';
import { StillCategories } from './components/sections/StillCategories';
import { StillCraftsmanship } from './components/sections/StillCraftsmanship';
import { StillStory } from './components/sections/StillStory';
import { StillStockists } from './components/sections/StillStockists';
import { StillShopQuote } from './components/sections/StillShopQuote';
import { StillFooter } from './components/sections/StillFooter';

const AppContent: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loaderDone, setLoaderDone] = useState(
    () => typeof sessionStorage !== 'undefined' && sessionStorage.getItem('cs_session_loaded') === 'true'
  );

  const handleOpenQuote = (categoryName?: string) => {
    if (categoryName) setSelectedCategory(categoryName);
    scrollTo('#shop', { offset: -72 });
  };

  return (
    <>
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      <div
        className={`min-h-screen bg-bone text-ink selection:bg-alpine selection:text-white flex flex-col transition-opacity duration-500 ${
          loaderDone ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <StillHeader onOpenQuote={() => handleOpenQuote()} />

        <main className="flex-1 flex flex-col">
          <StillHero onOpenQuote={() => handleOpenQuote()} />
          <StillCategories onSelectCategory={(cat) => handleOpenQuote(cat)} />
          <StillCraftsmanship />
          <StillStory />
          <StillStockists />
          <StillShopQuote prefilledCategory={selectedCategory} />
        </main>

        <StillFooter />
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <HeroInteractionProvider>
        <AppContent />
      </HeroInteractionProvider>
    </SmoothScrollProvider>
  );
};

export default App;
