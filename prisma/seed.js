const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

async function main() {
  const password = 'titaner'
  const bcryptPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      account: 'rabbit',
      password: bcryptPassword,
      name: 'yoooo',
    },
  })
  const seller = await prisma.user.create({
    data: {
      account: 'titaner',
      password: 'titaner',
      name: 'yoooo',
      type: 'Seller',
    },
  })
  const category = await prisma.category.create({
    data: {
      name: '兔兔專屬',
      picture:
        'https://res.cloudinary.com/dvobyld0o/image/upload/v1690277179/Ecommerce/draw-banner-cute-bunny-easter-spring_45130-1604_wikhot.jpg',
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

  const product = await prisma.product.create({
    data: {
      sellerId: seller.id,
      name: '夢幻級帆布鞋',
      picture:
        'https://res.cloudinary.com/dvobyld0o/image/upload/v1690131589/Ecommerce/06edf467b8ae66a111078716a1f3b033_l10prh.jpg',
      categoryId: category.id,
      subCategoryId: subCategory.id,
      active: true,
      ProductVariant: {
        create: {
          name: '夢幻級帆布鞋',
          price: 299,
          quantity: 50,
          desc: '珍藏好物',
          picture:
            'https://res.cloudinary.com/dvobyld0o/image/upload/v1690195490/Ecommerce/1338948666-1043553915_lk4khy.jpg',
        },
      },
    },
  })

  const newProductVariant = await prisma.productVariant.findFirst({
    where: {
      productId: product.id
    }
  })

  await prisma.order.create({
    data: {
      userId: user.id,
      OrderDetail: {
        create: {
          productVariantId: newProductVariant.id,
          quantity: 1
        },
      },
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
