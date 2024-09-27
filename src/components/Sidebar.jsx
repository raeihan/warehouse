import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden p-4 text-white bg-yellow-200"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M6 18L18 6M6 6l12 12"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" stroke="green" strokeWidth="2" />
          </svg>
        )}
      </button>
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block md:w-1/5 w-full bg-yellow-200 text-white h-full md:h-auto fixed md:relative z-50`}
      >
        <div className="h-20 shadow-lg flex justify-center items-center">
        <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-green-700 max-md:mr-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="green"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" stroke="green" strokeWidth="2" />
            </svg>
          </button>

          <h2 className="flex items-center text-2xl font-bold gap-4 text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M240 184h-8V57.9l9.67-2.08a8 8 0 1 0-3.35-15.64l-224 48A8 8 0 0 0 16 104a8.16 8.16 0 0 0 1.69-.18l6.31-1.35V184h-8a8 8 0 0 0 0 16h224a8 8 0 0 0 0-16ZM40 99l176-37.67V184h-24v-56a8 8 0 0 0-8-8H72a8 8 0 0 0-8 8v56H40Zm136 53H80v-16h96Zm-96 16h96v16H80Z"
              />
            </svg>{" "}
            Lieblingslogistik
          </h2>
          
        </div>

        <nav className="flex justify-center pt-10">
          <ul className="flex flex-col gap-8 text-green-700">
            <li>
              <LinkSideBar link={"/"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M13 9V3h8v6h-8ZM3 13V3h8v10H3Zm10 8V11h8v10h-8ZM3 21v-6h8v6H3Zm2-10h4V5H5v6Zm10 8h4v-6h-4v6Zm0-12h4V5h-4v2ZM5 19h4v-2H5v2Zm4-8Zm6-4Zm0 6Zm-6 4Z"
                  />
                </svg>
                Dashboard
              </LinkSideBar>
            </li>
            <li>
              <LinkSideBar link={"/table"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M1.364 5.138v12.02h17.272V5.138H1.364ZM.909 1.5h18.182c.502 0 .909.4.909.895v15.21a.902.902 0 0 1-.91.895H.91c-.503 0-.91-.4-.91-.895V2.395C0 1.9.407 1.5.91 1.5Zm5.227 1.759c0-.37.306-.671.682-.671c.377 0 .682.3.682.671v13.899c0 .37-.305.67-.682.67a.676.676 0 0 1-.682-.67V3.259Zm6.96-.64c.377 0 .682.3.682.67v4.995h4.91c.377 0 .683.301.683.672c0 .37-.306.671-.682.671l-4.911-.001v3.062h5.002c.377 0 .682.3.682.671c0 .37-.305.671-.682.671h-5.002v3.158a.676.676 0 0 1-.682.671a.676.676 0 0 1-.681-.67l-.001-3.159H1.001a.676.676 0 0 1-.682-.67c0-.371.305-.672.682-.672h11.413V9.626L.909 9.627a.676.676 0 0 1-.682-.671c0-.37.306-.671.682-.671l11.505-.001V3.289c0-.37.306-.67.682-.67Z"
                  />
                </svg>{" "}
                Item Table
              </LinkSideBar>
            </li>
            <li>
              <LinkSideBar link={"/allproduct"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M464 144c8.837 0 16 7.163 16 16v304c0 8.836-7.163 16-16 16H160c-8.837 0-16-7.164-16-16V160c0-8.837 7.163-16 16-16zm-52 68H212v200h200zm493.333 87.686c6.248 6.248 6.248 16.379 0 22.627l-181.02 181.02c-6.248 6.248-16.378 6.248-22.627 0l-181.019-181.02c-6.248-6.248-6.248-16.379 0-22.627l181.02-181.02c6.248-6.248 16.378-6.248 22.627 0zm-84.853 11.313L713 203.52L605.52 311L713 418.48zM464 544c8.837 0 16 7.164 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V560c0-8.836 7.163-16 16-16zm-52 68H212v200h200zm452-68c8.837 0 16 7.164 16 16v304c0 8.837-7.163 16-16 16H560c-8.837 0-16-7.163-16-16V560c0-8.836 7.163-16 16-16zm-52 68H612v200h200z"
                  />
                </svg>
                All Product
              </LinkSideBar>
            </li>
            <li>
              <LinkSideBar link={"/supplier"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 14 14"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m.91 12.56l-.41-7A.5.5 0 0 1 1 5h4.61a.51.51 0 0 1 .49.38L6.5 7H13a.5.5 0 0 1 .5.54l-.39 5a1 1 0 0 1-1 .92H1.91a1 1 0 0 1-1-.9ZM3.5 3V1A.5.5 0 0 1 4 .5h8.5a.5.5 0 0 1 .5.5v4M7.5 3h3"
                  />
                </svg>
                Supplier
              </LinkSideBar>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

const LinkSideBar = ({ link, children }) => {
  const location = useLocation();
  return (
    <Link
      to={link}
      className={`${
        location.pathname === `${link}` ? `text-green-900` : ``
      } flex items-center gap-2 text-xl`}
    >
      {children}
    </Link>
  );
};

export default Sidebar;
