import React from "react";
import { Container } from "../components";
import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="w-full">
      <Container>
        <div className="mx-auto max-w-2xl py-52 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Writings form your team
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-[#343131] px-3.5 py-2.5 text-sm font-semibold text-[#f5f5f5] shadow-sm hover:bg-[#666] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
