"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import Svg from '../svg/Svg';
import { set } from 'lodash';

interface BreadcrumbItem {
  title: string;
  href: string;
  iconLeft?: StaticImageData;
  iconRight?: StaticImageData;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  iconLeft?: boolean;
  iconRight?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, iconLeft, iconRight }) => {
  const [asPath, setAsPath] = useState('');
  const [hover, setHover] = useState<number | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setAsPath(path);
    }
  }, []);

  const handleMouseEnter = (index:number) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };


  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-2 text-b2 font-medium items-center">
        {items.map((item, index) => (
          <span key={item.title} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} className='flex items-center gap-2'>
          <li
            className={`${
              index === items.length - 1 ? 'active' : ''
            }`}
              >
            
            {index === items.length - 1 ? (
              <span className='text-neutral-400'>{item.title}</span>
            ) : (
              <Link href={item.href}>
                <div className='flex items-center gap-1'>
                {iconLeft && item.iconLeft && <Svg icon={item.iconLeft} color={index === items.length -1 ? "text-neutral-400" : index === hover ? "text-neutral-700" : "text-neutral-500"} width={14} height={14} />}
                <p className={hover === index ? "text-neutral-700" : "text-neutral-500"}>
                  {item.title}
                </p>
                {iconRight && item.iconRight && <Svg icon={item.iconRight} color={index === items.length -1 ? "text-neutral-400" : index === hover ? "text-neutral-700" : "text-neutral-500"} width={14} height={14} />}
                </div>
              </Link>
            )}
            
          </li>
          {index !== items.length - 1 ? (
            <span className='h-1 w-1 rounded-full bg-neutral-300'></span>
          ) : ""}
          </span>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;



// use Breadcrumb like this:
//
// const breadcrumbItems = [
//   { title: 'Home', href: '/', iconLeft: Icon2  },
//   { title: 'Products', href: '/products', iconLeft: Icon2 },
//   { title: 'Category', href: '/products/category', iconLeft: Icon2 },
// ];
//
// <Breadcrumb items={breadcrumbItems} iconLeft />
//
// or
//
// <Breadcrumb items={breadcrumbItems} iconRight />
//
// or
//
// <Breadcrumb items={breadcrumbItems} iconLeft iconRight />
//
// or
//
// <Breadcrumb items={breadcrumbItems} />