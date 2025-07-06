# LeetCode Database Sync

JavaScript script to sync LeetCode company problems from GitHub to PostgreSQL database. This script **requires Bun runtime** and will not work with Node.js.

## Prerequisites

### Install Bun Runtime

This script only works with Bun runtime. Install Bun on your system:

**Linux/macOS:**

```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows:**

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

**Verify installation:**

```bash
bun --version
```

## Setup

1. Install dependencies:

```bash
bun install
```

1. Copy environment file:

```bash
cp .env.example .env
```

1. Update `.env` with your database credentials, GitHub repo URL, and GitHub token

1. Create database schema:

```bash
bun run setup
```

## Usage

### Manual sync

```bash
bun run sync
```

### Cron job setup

```bash
# Edit crontab
crontab -e

# Add this line to run weekly on Sunday at 2 AM:
0 2 * * 0 cd /path/to/sync && bun run sync

# Or daily at 3 AM:
0 3 * * * cd /path/to/sync && bun run sync
```

## Database Schema

- `companies` table: stores company information
- `problems` table: stores problem details with foreign key to companies
- Optimized indexes for search and filtering

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `GITHUB_RAW_URL`: GitHub raw content URL for your repo
- `GITHUB_API_URL`: GitHub api URL for your repo
- `GITHUB_TOKEN`: GitHub personal access token (optional, but recommended for higher rate limits)

## GitHub Token Setup

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `repo` access (if private) or `public_repo` access (if public)
3. Add the token to your `.env` file as `GITHUB_TOKEN`

**Note**: The token is optional but recommended to avoid GitHub API rate limiting (60 requests/hour without token vs 5000 requests/hour with token).
