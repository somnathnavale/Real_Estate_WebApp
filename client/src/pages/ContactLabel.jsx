import React from "react";

const ContactLabel = () => {
  return (
    <section className="bg-[rgb(241,245,241)] text-slate-700 p-3 py-6">
      <div className="flex justify-between items-center max-w-6xl mx-auto flex-wrap gap-4 flex-col sm:flex-row">
        <div>
          <p className="font-bold text-lg sm:text-2xl md:text-4xl text-center sm:text-left">
            Do You Have Questions ?
          </p>
          <p className="text-base sm:text-lg md:text-xl text-slate-500">
            We will help you find a suitable property.
          </p>
        </div>
        <div>
          <button className="rounded-full bg-green-500 px-4 sm:px-6 py-2 text-base sm:text-xl font-medium text-white">
            <a href="mailto:navalesomnath1@gmail.com">Contact Us Now</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactLabel;
