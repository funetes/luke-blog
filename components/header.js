import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <header>
      <div className="container">
        <Link href="/">
          <h2>Dev blog</h2>
        </Link>
      </div>
    </header>
  );
};

export default Header;
