import React from "react";
import Link from "next/link";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className="bg-gray-800 text-primary w-56 h-screen fixed top-0 left-0 mt-16 border-r border-gray-600">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/app/">
              <span className="block">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/app/team">
              <span className="block">Meu Time</span>
            </Link>
          </li>
          <li>
            <Link href="/app/players">
              <span className="block">Jogadores</span>
            </Link>
          </li>
          <li>
            <Link href="/app/profile">
              <span className="block">Perfil</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
