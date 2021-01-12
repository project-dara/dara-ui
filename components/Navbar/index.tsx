import React from "react";
import Link from 'next/link'
import Wallet from "../wallet";

export const Navbar = () => {

  return (
    <div className="py-2 border-b">
        <div className="flex justify-between items-center">
            <Link href="/"><span className="text-3xl styled-font cursor-pointer">D</span></Link>
            <div className="flex justify-between items-center">
                {/* <div className="mx-2"><Link href="/whitepaper">Whitepaper</Link></div> */}
                <Wallet />
            </div>
        </div>
    </div>
  );
};

export default Navbar;
