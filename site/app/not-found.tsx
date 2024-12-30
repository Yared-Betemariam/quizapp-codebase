import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Page not found",
};

const notFound = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1">
        <section className="wrapper my-auto flex flex-col  gap-3">
          <h1 className="h1">404: Page not Found</h1>
          <p className="body max-w-[46ch]">
            Sorry, The page you are looking for can&apos;t be found. It might
            have been delected or had never existed.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default notFound;
