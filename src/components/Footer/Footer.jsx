import React from "react";
import {
    GitHubLogoIcon,
    LinkedInLogoIcon,
  } from "@radix-ui/react-icons";

export default function Footer(){
    const currentYear = new Date().getFullYear();

    const icons = [
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/prathmesh-gandhale-44421a203/",
        icon: <LinkedInLogoIcon height="20" width="20" />,
      },
      {
        title: "Github",
        href: "https://github.com/Shadowgit98",
        icon: <GitHubLogoIcon height="20" width="20" />,
      },
    ];

    return (
        <footer className="mx-auto w-full cursor-default items-center justify-center backdrop-blur-sm py-4 text-center shadow-xl md:px-0 text-green-300">
          <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-y-4 shadow-xl md:flex-row md:gap-y-0">
            <a href="/#">
              <span className="text-lg font-bold flex flex-row items-center justify-center gap-2">
                BlogHub
              </span>
            </a>
    
            <p className="text-xs font-bold">
              &copy; {currentYear} Made by Prathmesh Gandhale
            </p>
    
            <div className="flex gap-4">
              {icons.map((icon, index) => (
                <a href={icon.href} target="_blank" key={index}>
                  {icon.icon}
                </a>
              ))}
            </div>
          </section>
        </footer>
      );

}