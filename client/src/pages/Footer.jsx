import React from "react";

const Footer = () => {
    const date=new Date();
  return (
    <section className="bg-slate-700 text-white p-3 py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto flex-wrap flex-col sm:flex-row">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-wider">NextGen Estate Private Ltd</p>
        <p className="text-base sm:text-lg">All Rights Reserved &copy; {date.getFullYear()}</p>
      </div>
    </section>
  );
};

export default Footer;