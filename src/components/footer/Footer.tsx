import { Link } from '@nextui-org/react';

const Footer = () => {
  return (
    <footer className="relative w-full">
      <p className="flex justify-center">
        With&nbsp;<span className="text-RED">❤</span>&nbsp;from&nbsp;
        <Link
          href="https://github.com/dulapahv/"
          isExternal
          showAnchorIcon
          underline="hover"
          color="foreground"
        >
          dulapahv
        </Link>
      </p>
      <Link
        href="https://github.com/dulapahv/dulapahv-portfolio"
        isExternal
        showAnchorIcon
        underline="hover"
        color="foreground"
        className="bottom-0.5 mx-auto flex w-fit pt-1 text-xs md:absolute"
      >
        Last updated: 11/04/2023 - 21.30 BST
      </Link>
    </footer>
  );
};

export default Footer;
