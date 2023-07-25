## General info

The api is used to coordinate with the frontend page [Ecommerce Shop](https://freeway26tw.github.io/ecommerce-vue/)

The api is deployed on render.com [here](https://ecommerce-vg1b.onrender.com/api).

## Prerequisites
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en) v18.14.2
* [Prisma](https://www.prisma.io/)
* [MySQL](https://www.mysql.com/)

## How to install
### Using Git
```
git clone https://github.com/freeway26tw/ecommerce.git
```
### Install npm dependencies and initialize database setting
```
cd ecommerce
npm install
npm start
```

### Setting up environments
1. You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
`cp .env.example .env`
3. The file `.env` is already ignored, so you never commit your credentials.
4. Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.


## How to run
```
npm run dev
```
You can check if the server is running from the message below
```
Server is listening on port 3000!
Press CTRL + C to stop the process.
```


## Bugs or improvements
Every project needs improvements, Feel free to report any bugs or improvements. Pull requests are always welcome.