## Getting Started

First, clone this repository:

```bash
git clone https://github.com/SeRiice/bruno_gomes-peixoto_blog
```

Then, move to the directory and install all packages:

```bash
cd ./bruno_gomes-peixoto_blog
npm install
```

Then, create a .env.local file at the root of the project (based on the template) to fill in your environment variables:

```bash
DB__CONNECTION=
SECURITY__PASSWORD__ITERATIONS=
SECURITY__PASSWORD__KEYLEN=
SECURITY__JWT__SECRET=
SECURITY__JWT__EXPIRES_IN=
NEXT_PUBLIC_SECURITY__SESSION__KEY=
```

Then, execute the following commands to start the migrations and seed your database (just seed your database once, otherwise it will delete all your existing records):

```bash
npx knex migration:latest
npx knex seed:run
```

Finally, run the project with the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
