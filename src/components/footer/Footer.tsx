const Footer = () => {
  return (
    <footer className="relative">
      <p className="flex justify-start md:justify-center">
        With&nbsp;<span className="text-RED">❤</span>&nbsp;from&nbsp;
        <button className="btn btn-ghost h-[24px] min-h-0 select-text border-0 p-0 text-base font-normal underline hover:bg-transparent">
          <a
            href="https://github.com/dulapahv/"
            target="_blank"
            rel="noopener noreferrer"
          >
            dulapahv
          </a>
        </button>
      </p>
      <button className="btn btn-ghost flex h-[18px] min-h-0 select-text border-0 p-0 text-xs font-normal underline hover:bg-transparent md:absolute md:bottom-0">
        <a
          href="https://github.com/dulapahv/dulapahv-portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Last updated: 29/12/2023 - 22.00 GMT
        </a>
      </button>
    </footer>
  );
};

export default Footer;
