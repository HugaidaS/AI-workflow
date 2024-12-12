import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const AboutPage = () => {
  return (
    <BackgroundBeamsWithCollision>
      <div className="py-12 px-6 sm:px-12 md:px-24 lg:px-48">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-500">
              About Me
            </h1>
            <p className="mt-4 text-lg text-dark_light">
              With over 5 years of full-stack development experience, <br /> I
              specialize in Next JS, React Tailwind, Nest JS, REST and GraphQL.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text_gradient_primary">
                Skills & Expertise
              </h2>
              <ul className="mt-4 space-y-2 list-disc list-inside text-dark_light">
                <li>Full-stack development with Next.js, React, and Nest.js</li>
                <li>Responsive web design with Tailwind CSS</li>
                <li>Smart-contracts development with Solidity</li>
                <li>Web3 development with Viem and Ethers.js</li>
                <li>Cloud architecture and AWS integration</li>
                <li>Blockchain technology for crypto startups</li>
                <li>RESTful and GraphQL API design</li>
                <li>Mentoring junior developers</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text_gradient_secondary">
                Accomplishments
              </h2>
              <ul className="mt-4 space-y-2 list-disc list-inside text-dark_light">
                <li>
                  Designed scalable solutions for B2B companies and crypto
                  startups
                </li>
                <li>
                  Led the architecture and implementation of high-performance
                  B2B products
                </li>
                <li>
                  Built a positive learning culture within development teams
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text_gradient_tertiary">
                Community & Writing
              </h2>
              <p className="mt-4 text-dark_light">
                I actively contribute to the developer community through
                technical writing on dev.to and by participating in the Women
                Techmakers Google community.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text_gradient_quaternary">
                Education
              </h2>
              <p className="mt-4 text-dark_light">
                I hold a bachelor’s degree in economics and am currently
                pursuing a master’s in computer science.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text_gradient_quinary">
                Always Learning
              </h2>
              <p className="mt-4 text-dark_light">
                I’m constantly exploring new technologies and staying up-to-date
                with the latest trends in web development.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-dark_light">
              Always open to connecting for a chat, gig, or consultation.
            </p>
            <a
              href="https://www.linkedin.com/in/toriatovawebdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 btn_gradient_primary text-white font-medium rounded-md shadow"
            >
              Reach Out
            </a>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};
export default AboutPage;
