## Instruction how to run service

npm install
node index.js

## Why Repository Pattern?

The decision to implement the repository pattern was made to separate concerns and improve the maintainability of the application. By abstracting the data access layer with repositories, we achieve the following benefits:

- **Modularity**: Repositories encapsulate the logic for accessing data, making it easier to swap out data storage mechanisms without affecting other parts of the application.
- **Database Agnostic**: By decoupling the application from specific data storage solutions, such as in-memory arrays, we pave the way for future integration with databases like MongoDB or SQL databases. This flexibility enables us to scale the application as the data storage requirements evolve.
