'use client';

import { Button } from './Button';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'react-feather';
import { cn } from '@/ui/libs';

const routes = [
  {
    routes: [
      {
        title: 'Agendamentos',
        url: '/agendamentos',
      },
      { title: 'Clientes', url: '/clientes' },
      {
        title: 'Serviços',
        url: '/servicos',
      },
      {
        title: 'Funcionários',
        url: '/funcionarios',
      },
    ],
  },
];

export const Navbar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  function handleDrawer() {
    setOpenSideBar(!openSideBar);
  }

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
        <h1 className="text-center text-2xl font-semibold leading-tight tracking-tight text-pink-500">
          Agenda
        </h1>
        <Button variant="secondary" onClick={handleDrawer}>
          <Menu size={24} />
        </Button>
      </div>
      {/* Navegação */}
      <div
        className={cn([
          'fixed left-0 top-0 z-20 h-full w-full bg-gray-200 p-5 transition-all duration-500',
          { '-translate-x-full': !openSideBar },
          { '-translate-x-0': openSideBar },
        ])}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-500">Navegação</p>
          <Button variant="secondary" onClick={handleDrawer}>
            <X size={24} />
          </Button>
        </div>

        {routes.map((route, index) => (
          <div className="sidebar-section" key={index}>
            {route.routes.map((item) => (
              <Link
                href={item.url}
                key={item.url}
                onClick={handleDrawer}
                className="group mb-2 flex items-center gap-4 rounded-lg p-2 font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <p>{item.title}</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
