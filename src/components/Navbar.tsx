import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  return (
    <nav className="fixed w-full  md:px-6 md:pt-12  px-0  pt-6">
      <MaxWidthWrapper>
        <div className="flex justify-between h-28 items-center">
          <Link href="/"> HOME</Link>

          <div className="w-24 h-full bg-red-800" />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
