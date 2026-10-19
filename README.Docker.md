### Building and running your application

Start the API and its MySQL database from the project folder:

```bash
docker compose up --build
```

The API is available at `http://localhost:3000`. MySQL creates the task table
automatically in development mode, and the `mysql_data` volume keeps tasks
between container restarts.

### Tasks API

- `GET /tareas` returns all tasks, including `id_tarea`, `titulo`,
  `descripcion`, and `estado`.
- `GET /tareas/1` returns the task with ID 1.
- `POST /tareas` creates a task. Send a JSON body such as:

```json
{
  "titulo": "Primera tarea",
  "descripcion": "Tarea de ejemplo para comprobar la API",
  "estado": "Pendiente"
}
```

The allowed `estado` values are `Pendiente`, `En proceso`, and `Completado`.
If omitted, it defaults to `Pendiente`. Create a task from PowerShell with:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/tareas `
  -ContentType "application/json" `
  -Body '{"titulo":"Primera tarea","descripcion":"Tarea de ejemplo para comprobar la API","estado":"Pendiente"}'
```

Then run `Invoke-RestMethod -Uri http://localhost:3000/tareas` to see it.
The default credentials in `compose.yaml` are for local development only;
set `DB_PASSWORD` and `DB_ROOT_PASSWORD` in a `.env` file for your environment.

`synchronize` is enabled only when `NODE_ENV` is not `production`. Use migrations
instead of schema synchronization for production deployments.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)