"use client";
import Navbar from "../(components)/navbar";
import Footer from "../(components)/footer";
export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
}