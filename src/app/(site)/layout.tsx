import { type PropsWithChildren } from "react";

import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-background h-screen overflow-hidden">
      <Header />
      <main className="h-full overflow-y-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
