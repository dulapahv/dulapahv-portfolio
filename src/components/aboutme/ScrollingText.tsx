import { scrollingText } from '@/constants';
import { ScrollShadow } from '@nextui-org/react';
import { Kanit, Noto_Sans_JP } from 'next/font/google';
import { useState } from 'react';

const kanit = Kanit({
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'thai'],
});

const noto_sans_jp = Noto_Sans_JP({
  weight: ['600', '700'],
  style: ['normal'],
  subsets: ['latin', 'latin'],
});

const KanitFont = kanit.className;
const NotoSansJPFont = noto_sans_jp.className;

const delays = [
  'animation-delay-0',
  'animation-delay-75',
  'animation-delay-100',
  'animation-delay-150',
  'animation-delay-200',
  'animation-delay-300',
  'animation-delay-400',
  'animation-delay-500',
  'animation-delay-600',
  'animation-delay-700',
  'animation-delay-800',
  'animation-delay-900',
  'animation-delay-1000',
].sort(() => Math.random() - 0.5);
const colors = [
  'text-RED',
  'dark:text-white text-BLACK',
  'dark:text-white text-BLACK',
  'text-YELLOW',
  'text-BLUE',
  'dark:text-white text-BLACK',
  'dark:text-white text-BLACK',
  'text-PURPLE',
  'dark:text-white text-BLACK',
  'dark:text-white text-BLACK',
].sort(() => Math.random() - 0.5);
const fontSizes = ['text-lg', 'text-xl', 'text-2xl', 'text-3xl'].sort(
  () => Math.random() - 0.5
);
const animations = [
  'animate-slide-text-right-1',
  'animate-slide-text-right-2',
  'animate-slide-text-right-3',
  'animate-slide-text-right-4',
  'animate-slide-text-right-5',
  'animate-slide-text-left-1',
  'animate-slide-text-left-2',
  'animate-slide-text-left-3',
  'animate-slide-text-left-4',
  'animate-slide-text-left-5',
].sort(() => Math.random() - 0.5);

const ScrollingText = () => {
  const [currentIndex, setCurrentIndex] = useState(
    Array.from({ length: 28 }, () =>
      Math.floor(Math.random() * scrollingText.length)
    )
  );

  const handleAnimationIter = (index: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = [...prevIndex];
      newIndex[index] = (newIndex[index] + 1) % scrollingText.length;
      return newIndex;
    });
  };

  const getTextFontClass = (text: string) => {
    if (text.match(/[\u0E00-\u0E7F]/)) {
      // Thai character range
      return KanitFont;
    } else if (text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/)) {
      // Japanese character ranges
      return NotoSansJPFont;
    }
    return '';
  };

  const renderText = (text: string, index: number) => {
    return (
      <p
        key={index}
        className={`text-nowrap ${animations[index % animations.length]} ${getTextFontClass(text)} ${delays[index % delays.length]} ${fontSizes[index % fontSizes.length]} ${colors[index % colors.length]}`}
        onAnimationIteration={() => handleAnimationIter(index)}
      >
        {text}
      </p>
    );
  };

  return (
    <ScrollShadow
      orientation="horizontal"
      visibility="both"
      size={80}
      hideScrollBar
      className="flex w-screen animate-fade-in flex-col justify-center overflow-hidden"
    >
      <div className="mt-12 flex animate-puff-out-center flex-col justify-evenly text-base font-semibold !opacity-90 animation-delay-1000 *:text-center">
        {currentIndex.map((_, index) =>
          renderText(scrollingText[currentIndex[index]], index)
        )}
      </div>
    </ScrollShadow>
  );
};

export default ScrollingText;
