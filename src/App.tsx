import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Notebook, SectionTab } from './components/Notebook';
import { LockScreen } from './components/LockScreen';
import { CoverPage } from './pages/CoverPage';
import { MemoryPage } from './pages/MemoryPage';
import { TimelinePage } from './pages/TimelinePage';
import { LetterPage } from './pages/LetterPage';
import { QuestionPage } from './pages/QuestionPage';
import { YesEndingPage } from './pages/YesEndingPage';
import { NoEndingPage } from './pages/NoEndingPage';
import { memories } from './data/memories';
import { useKeyboard } from './hooks/useKeyboard';
import { useGestures } from './hooks/useGestures';

type PageId =
  | 'cover'
  | 'memory-1' | 'memory-2' | 'memory-3' | 'memory-4'
  | 'memory-5' | 'memory-6' | 'memory-7'
  | 'timeline'
  | 'letter'
  | 'question'
  | 'yes-ending'
  | 'no-ending';

const BASE_PAGES: PageId[] = [
  'cover',
  'memory-1', 'memory-2', 'memory-3', 'memory-4',
  'memory-5', 'memory-6', 'memory-7',
  'timeline',
  'letter',
  'question',
];

const CHAPTER_LABELS: Record<string, string> = {
  cover: 'Preface',
  'memory-1': 'Memory I',
  'memory-2': 'Memory II',
  'memory-3': 'Memory III',
  'memory-4': 'Memory IV',
  'memory-5': 'Memory V',
  'memory-6': 'Memory VI',
  'memory-7': 'Memory VII',
  timeline: 'Our Story',
  letter: 'A Letter',
  question: 'The Question',
  'yes-ending': 'Forever',
  'no-ending': 'I Understand',
};

/* ─── Coloured section tabs ──────────────────────────────── */
const SECTIONS: SectionTab[] = [
  { id: 'cover',     color: '#b82828', glow: 'rgba(184,40,40,0.55)' },
  { id: 'memories',  color: '#c47820', glow: 'rgba(196,120,32,0.55)' },
  { id: 'timeline',  color: '#7040c0', glow: 'rgba(112,64,192,0.55)' },
  { id: 'letter',    color: '#1870a8', glow: 'rgba(24,112,168,0.55)' },
  { id: 'question',  color: '#2e7d4f', glow: 'rgba(46,125,79,0.55)' },
];

function getSectionForPage(page: PageId): string {
  if (page === 'cover') return 'cover';
  if (page.startsWith('memory-')) return 'memories';
  if (page === 'timeline') return 'timeline';
  if (page === 'letter') return 'letter';
  return 'question';
}

function preloadImages(urls: string[]) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

export default function App() {
  const [locked, setLocked] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('notebook_unlocked') !== '1'
      : true
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  const pages: PageId[] = answer
    ? ([...BASE_PAGES, `${answer}-ending`] as PageId[])
    : BASE_PAGES;

  const currentPage = pages[pageIndex];
  const isEndingPage = currentPage === 'yes-ending' || currentPage === 'no-ending';
  const isQuestionPage = currentPage === 'question';
  const canGoNext = !isEndingPage && !isQuestionPage && pageIndex < pages.length - 1;
  const canGoPrev = pageIndex > 0 && !isEndingPage;

  /* Preload upcoming images */
  useEffect(() => {
    if (currentPage === 'cover')     preloadImages(['/images/FXI-1.webp', '/images/FXI-2.webp']);
    if (currentPage === 'memory-2')  preloadImages(['/images/Qudsaya.jpg']);
    if (currentPage === 'memory-3')  preloadImages(['/images/Royal-1.webp', '/images/Royal-2.webp']);
    if (currentPage === 'memory-5')  preloadImages(['/images/Royal-3.webp', '/images/Car-1.webp']);
  }, [currentPage]);

  const goNext = () => {
    if (!canGoNext) return;
    setDirection(1);
    setPageIndex((p) => p + 1);
  };

  const goPrev = () => {
    if (!canGoPrev) return;
    setDirection(-1);
    setPageIndex((p) => p - 1);
  };

  const handleAnswer = (ans: 'yes' | 'no') => {
    setAnswer(ans);
    setDirection(1);
    setPageIndex(BASE_PAGES.length);
    fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: ans }),
    }).catch(() => {/* fire-and-forget */});
  };

  /* Only horizontal swipe — no vertical auto-advance */
  useGestures({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
    threshold: 55,
  });

  /* Only ← → keys — no up/down */
  useKeyboard({
    onArrowRight: goNext,
    onArrowLeft: goPrev,
    onSpace: goNext,
  });

  const renderPage = () => {
    if (currentPage === 'cover') return <CoverPage />;

    if (currentPage.startsWith('memory-')) {
      const idx = parseInt(currentPage.split('-')[1]) - 1;
      return (
        <MemoryPage
          memory={memories[idx]}
          memoryNumber={idx + 1}
          totalMemories={memories.length}
        />
      );
    }

    if (currentPage === 'timeline')   return <TimelinePage />;
    if (currentPage === 'letter')     return <LetterPage />;
    if (currentPage === 'question')   return <QuestionPage onAnswer={handleAnswer} />;
    if (currentPage === 'yes-ending') return <YesEndingPage />;
    if (currentPage === 'no-ending')  return <NoEndingPage />;
    return null;
  };

  return (
    /* perspective wrapper gives depth to the lock-screen page-flip exit */
    <div style={{ perspective: '1200px', position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {locked ? (
          <LockScreen key="lock" onUnlock={() => setLocked(false)} />
        ) : (
          <motion.div key="app" initial={false} style={{ position: 'absolute', inset: 0 }}>
            <Notebook
              pageNumber={pageIndex + 1}
              totalPages={pages.length}
              onNext={goNext}
              onPrev={goPrev}
              canGoNext={canGoNext}
              canGoPrev={canGoPrev}
              direction={direction}
              pageKey={currentPage}
              chapterLabel={CHAPTER_LABELS[currentPage] ?? ''}
              sections={SECTIONS}
              currentSection={getSectionForPage(currentPage)}
            >
              {renderPage()}
            </Notebook>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
