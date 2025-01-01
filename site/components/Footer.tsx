"use client";

const Footer = () => {
  const date = new Date();
  return (
    <section className="border-t border-color py-6 flex items-center justify-center gap-12 opacity-50">
      <span>&copy; Copyright {date.getFullYear()}. All Rights Reserved.</span>
    </section>
  );
};
export default Footer;
