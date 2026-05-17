# GovData-BR
![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-18%2B-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-GNU%20GPL%20v3-blue?style=flat)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat)

## 🚀 Deploy

[https://govdata-br.vercel.app](https://govdata-br.vercel.app)

> Dashboard interativo que cruza dados econômicos do IBGE com mandatos políticos brasileiros por estado e período histórico.

## 🎯 O Problema

O Brasil produz dados públicos ricos — mas espalhados, difíceis de acessar e ainda mais difíceis de interpretar. Em tempos de desinformação, cidadãos comuns raramente conseguem verificar por si mesmos o impacto real de um governo na economia.

O GovData-BR resolve isso: uma interface visual que permite a qualquer pessoa, sem conhecimento técnico, explorar indicadores econômicos reais por estado e cruzá-los com os mandatos políticos de cada período. Dados públicos, apresentados com clareza.

## 🛠️ Tech Stack

- **Next.js 15+** (App Router)
- **React 18+**
- **TypeScript** (Strict mode)
- **Tailwind CSS**
- **Framer Motion**
- **HustyCore** (UI Components)
- **API IBGE** (dados econômicos)

## 💻 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm (ou pnpm/yarn)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Husty-09/GovData-BR.git

#2. Navegue até a pasta
cd govdata-br

# 3. Instale as dependências
npm install

# 4. Suba o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build
npm start
```

### Variáveis de ambiente

Nenhuma. A API do IBGE é pública e os dados de políticos são estáticos (`src/lib/politicos.ts`).

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor local com hot reload |
| `npm run build` | Build otimizado para produção |
| `npm start` | Serve o build de produção |
| `npm run lint` | Linting com ESLint |
| `npm test` | Testes com Vitest |

## 👤 Créditos

Desenvolvido por **Matheus Calonico**  
Projeto open source — contribuições são bem-vindas.

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para detalhes.

## 📄 Licença

GNU General Public License v3 — veja [LICENSE](./LICENSE)
