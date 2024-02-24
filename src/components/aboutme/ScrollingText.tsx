import { Kanit, Noto_Sans_JP } from 'next/font/google';

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

const ScrollingText = () => {
  return (
    <div className="flex animate-fade-in flex-col justify-center overflow-hidden">
      <div className="mt-12 flex animate-puff-out-center flex-col justify-evenly text-base font-semibold !opacity-90 animation-delay-1000 *:text-center dark:text-white sm:text-lg md:text-xl lg:text-2xl">
        <p className="animate-slide-text-right-5">NextJS</p>
        <p className="animate-slide-text-left-2 text-lg font-bold text-BLUE animation-delay-1000 sm:text-xl md:text-2xl lg:text-3xl">
          Hi! I&apos;m dulapahv~💕
        </p>
        <p className="animate-slide-text-left-4">TypeScript</p>
        <p className="animate-slide-text-right-4 animation-delay-400">
          <span className={KanitFont}>สวัสดี</span>! dulapahv{' '}
          <span className={KanitFont}>เองน้า</span>~💕
        </p>
        <p className="animate-slide-text-left-2 animation-delay-700">Python</p>
        <p className="animate-slide-text-right-5">PostgreSQL</p>
        <p className="animate-slide-text-left-1">HTML</p>
        <p className="animate-slide-text-right-1 text-lg font-bold text-RED sm:text-xl md:text-2xl lg:text-3xl">
          A frontend developer🖼️
        </p>
        <p className="animate-slide-text-right-2">CSS</p>
        <p className="animate-slide-text-right-3 animation-delay-1000">
          <span className={NotoSansJPFont}>こんにちは</span>! dulapahv{' '}
          <span className={NotoSansJPFont}>です</span>~💕
        </p>
        <p className="animate-slide-text-left-3 animation-delay-900">
          JavaScript
        </p>
        <p className="animate-slide-text-right-2">C</p>
        <p className="animate-slide-text-left-5 animation-delay-300">C++</p>
        <p className="animate-slide-text-right-3 animation-delay-200">
          <span className={KanitFont}>เราคือ</span> Frontend Developer{' '}
          <span className={KanitFont}>นะ</span>~🖼️
        </p>
        <p className="animate-slide-text-right-5 animation-delay-600">Java</p>
        <p className="animate-slide-text-right-1 animation-delay-1000">
          ReactJS
        </p>
        <p className="animate-slide-text-left-1 text-lg font-bold text-YELLOW animation-delay-200 sm:text-xl md:text-2xl lg:text-3xl">
          Pursuing fullstack developer💯
        </p>
        <p className="animate-slide-text-right-4 animation-delay-200">
          <span className={NotoSansJPFont}>
            わたしはフロントエンドデベロッパーです
          </span>
          ~🖼️
        </p>
        <p className="animate-slide-text-left-2 animation-delay-400">NGINX</p>
        <p className="animate-slide-text-right-5 text-right animation-delay-1000">
          <span className={KanitFont}>เรากำลังเรียนรู้เพื่อเป็น</span> Fullstack
          Developer💯
        </p>
        <p className="animate-slide-text-right-2 animation-delay-600">Linux</p>
        <p className="animate-slide-text-right-1 text-right animation-delay-800">
          <span className={NotoSansJPFont}>
            わたしはフルスタックデベロッパーになりたいです
          </span>
          ~💯
        </p>
        <p className="animate-slide-text-left-3">Figma</p>
        <p className="animate-slide-text-right-2 text-lg font-bold text-PURPLE animation-delay-100 sm:text-xl md:text-2xl lg:text-3xl">
          Thanks for visiting my website!😊
        </p>
        <p className="animate-slide-text-left-5">TailwindCSS</p>
        <p className="animate-slide-text-right-3 animation-delay-1000">
          <span className={KanitFont}>
            ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของเรานะ
          </span>
          ~😊
        </p>
        <p className="animate-slide-text-left-4 animation-delay-200">UX/UI</p>
        <p className="animate-slide-text-right-4 animation-delay-400">
          <span className={NotoSansJPFont}>
            私のウェブサイトをご覧いただきありがとうございます
          </span>
          ~😊
        </p>
      </div>
    </div>
  );
};

export default ScrollingText;
