## How to run the application locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file and add your API key:
   ```bash
   API_KEY=YOUR_API_KEY
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. For production deployment:
   ```bash
   npm run build
   npm run start
   ```

## Basic Information

* Temperature is displayed in Celsius, rounded to the nearest degree
* Weather data is fetched through `/api/weather` endpoint which acts as a proxy
* Project was bootstrapped with create-jstack-app template for:
  * TypeScript integration
  * Pre-configured styling
  * Quick setup focusing on functionality
* Uses tanstack/react-query for data fetching (included in template)
