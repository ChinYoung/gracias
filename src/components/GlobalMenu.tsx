import { fetchStrapi } from '@/fns/fetchStrapi'
import { TStrapiMenu, TStrapiRes } from '@/types/strapi.type'
import { keyBy } from 'lodash'
import Link from 'next/link'
import qs from 'qs'
import { FC } from 'react'

const MenuItem: FC<{ menu: TStrapiMenu; prefix: string }> = ({
  menu,
  prefix,
}) => {
  const thisPath =
    menu.path === '/' ? '/' : `${prefix ? prefix : '/'}${menu.path}/`
  return (
    <div className='px-4 py-2 hover:scale-110 w-full h-fit rounded-lg cursor-pointer'>
      <Link href={thisPath} className='text-blue-500'>
        {menu.name}
      </Link>
    </div>
  )
}

const RootMenu: FC<{ menu: TStrapiMenu }> = ({ menu }) => {
  return (
    <div key={menu.documentId} className='relative w-full group'>
      {/* root */}
      <MenuItem menu={menu} prefix='/' />
      {/* sub paths */}
      {menu.children && menu.children.length > 0 && (
        <div className='shadow-2xl px-4 rounded-lg absolute left-full top-0 hidden opacity-0 group-hover:block group-hover:opacity-100 transition-discrete transition-all duration-800'>
          {menu.children.map((child) => (
            <div
              key={child.documentId}
              className='border-b border-gray-300 p-1 last:border-none'
            >
              {generateMenu(child, `/${menu.path}/`)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function generateMenu(menu: TStrapiMenu, prefix: string) {
  return (
    <div key={menu.documentId} className='flex gap-2'>
      {/* root */}
      <MenuItem menu={menu} prefix={prefix} />
      {/* sub paths */}
      <div>
        {menu.children &&
          menu.children.length > 0 &&
          menu.children.map((child) => (
            <div key={child.documentId}>
              {generateMenu(child, `${prefix ? prefix : '/'}${menu.path}/`)}
            </div>
          ))}
      </div>
    </div>
  )
}

function linkMenus(menus: TStrapiMenu[]) {
  const menuMap = keyBy(menus, 'documentId')
  return menus.map((menu) => {
    if (menu.children) {
      menu.children = menu.children.map((child) => menuMap[child.documentId])
    }
    return menu
  })
}

export default async function GlobalMenu() {
  const queryString = qs.stringify({
    populate: ['children', 'parent'],
  })

  const res = await fetchStrapi(`menus?${queryString}`)
  const jsonData = await res.json<TStrapiRes<TStrapiMenu[]>>()
  const formatted = linkMenus(jsonData.data)

  return (
    <div className='flex flex-col gap-2 w-fit'>
      {formatted
        .filter((i) => !i.parent)
        .map((menu) => (
          <RootMenu key={menu.documentId} menu={menu} />
        ))}
    </div>
  )
}
