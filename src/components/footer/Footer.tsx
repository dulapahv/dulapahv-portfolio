const Footer = () => {
  return (
    <footer className="relative">
      <p className="flex justify-center">
        With&nbsp;<span className="text-RED">❤</span>&nbsp;from&nbsp;
        <button className="btn btn-ghost h-6 min-h-0 select-text border-0 p-0 text-base font-normal underline hover:bg-transparent">
          <a
            href="https://github.com/dulapahv/"
            target="_blank"
            rel="noopener noreferrer"
          >
            dulapahv
          </a>
        </button>
      </p>
      <time className="btn btn-ghost mx-auto flex h-[18px] min-h-0 w-fit select-text border-0 p-0 text-xs font-normal underline hover:bg-transparent md:absolute md:bottom-0">
        <a
          href="https://github.com/dulapahv/dulapahv-portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Last updated: 29/01/2023 - 19.00 GMT
        </a>
      </time>
    </footer>
  );
};

export default Footer;
