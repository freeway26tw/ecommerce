const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      account: 'rabbit',
      password: 'titaner',
      name: 'yoooo',
    },
  })
  const seller = await prisma.user.create({
    data: {
      account: 'titaner',
      password: 'titaner',
      name: 'yoooo',
      type: 'seller',
    },
  })
  const category = await prisma.category.create({
    data: {
      name: '兔兔專屬',
      picture:
        'https://res.cloudinary.com/dvobyld0o/image/upload/v1690129977/Ecommerce/71croVPqVuL_e9itf2.jpg',
      desc: '兔兔專屬',
      SubCategory: {
        create: {
          name: '監獄兔專區',
          picture:
            'https://res.cloudinary.com/dvobyld0o/image/upload/v1690130211/Ecommerce/j6bxdnsxglvbgrrnzg3p.jpg',
          desc: '監獄兔專區',
        },
      },
    },
  })

  const subCategory = await prisma.subCategory.findFirst({
    where: {
      categoryId: category.id,
    },
  })

  await prisma.product.create({
    data: {
      sellerId: seller.id,
      name: '夢幻級帆布鞋',
      image:
        'https://res.cloudinary.com/dvobyld0o/image/upload/v1690131589/Ecommerce/06edf467b8ae66a111078716a1f3b033_l10prh.jpg',
      categoryId: category.id,
      subCategoryId: subCategory.id,
      active: true,
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
