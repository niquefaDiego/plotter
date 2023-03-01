# Plotter

Tool to plot geometric figures into a canvas.

Features:
- Option to convert the drawn canvas it into PNG.

# Dependencies

- `node 18.14.2`
- `npm 9.5.0`

# Development setup

Install node dependencies:

```
npm i
```

Run in watch mode:
```
npm run dev
```

This will run the webpage in: http://localhost:5000
And bunle analyzer in: http://localhost:8888

# Production setup

```
npm i
npm run build
```

The distribution files will be in the `dist/prod` folder.

# Contributing guidelines

Respect the following file hierarchy in the `src/` folder:

```
|- ts/
|  |- __tests__/*.ts
|  |- *.ts
|  |- parser/*.ts, canvas-drawer/*.ts
|  |- drawer/*.ts
|  |- shape/*.ts
|  |- geo/*.ts
|- html/*
```

A typescript file can only reference code from another typescript file lower in the hierarchy, this prevents cyclic references. For example, `ts/parser/polyline.ts` references `ts/geo/point.ts`, but the other way around violates the hierarchy above since `ts/parser/*ts` appears before `ts/geo/*.ts`

# Deployment

Changes to main branch will be automatically deployed to: https://niquefa-plotter.netlify.app

