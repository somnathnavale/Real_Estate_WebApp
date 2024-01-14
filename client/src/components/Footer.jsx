import { memo } from "react";

const Footer = memo(() => {
  const date = new Date();
  return (
    <section className="bg-slate-700 text-white p-3">
      <div className="flex justify-center items-center max-w-6xl mx-auto flex-wrap flex-col">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-wider font-serif">
          NextGen Estate Private Ltd
        </p>
        <p className="text-base sm:text-lg font-thin">
          All Rights Reserved &copy; {date.getFullYear()}
        </p>
      </div>
    </section>
  );
});

Footer.displayName="Footer";

export default Footer;
