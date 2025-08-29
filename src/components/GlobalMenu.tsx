import { fetchStrapi } from '@/fns/fetchStrapi'
import { TStrapiMenu, TStrapiRes } from '@/types/strapi.type'
import { keyBy } from 'lodash'
import qs from 'qs'
import { RootMenus } from './RootMenus'

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
    <>
      <div className='h-8 bg-white'></div>
      <RootMenus menus={formatted} />
      <div className='h-8 bg-white'></div>
    </>
  )
}
