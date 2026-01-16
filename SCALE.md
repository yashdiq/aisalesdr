## Answers to your questions

### Architecture & Scaling

- Replace the database with PostgreSQL + PgBouncer with multi-replicas (for better alternative after 1M+ we can consider using Database sharding like YugaByte)
- Database optimizations with Indexing, etc. Can be also improved by enhancing the ORM used by the FastAPI
- Connection pooling and query optimizations
- Implement load balancing on API side and Microservices implementations
- Use k3s for Containerization with auto-scale and node self-healing
- Rate-limiting and implement cache strategy with Redis and CDN for assets that might be required in the platform (Cloudflare, etc)
- Implement queue with Celery task
- Proper retry logic and error handlers
- Event-driven architecture (Pub/sub and webhook)
- Campaign performance tracking and analytics, we can use 3rd party or develop it in-house

### Team & Process

- **First 90-day engineering priorities** - Check all the platforms used by us, fix and improve all the issues to make it better and implement the above strategy to optimize and scale the platform. The motto I usually use is: Make it works -> make it right -> make it fast.
- **Team structure (who to hire first), assuming you are the only engineer now** - QA Engineer (manual tests sometimes take times.)
- **Dev process (CI/CD, reviews, releases)** - Need to setup the branches and server for both staging and productions, setup pipelines with e2e, smoke, integration tests, build, and deployment.

### Tradeoffs

- MVP focused on core functionality to speed up the development
- Focus on architecture pattern
- Manual tests
- Atomic functionalities and structures to maintain the scalability in the future and easy to read the code blocks
