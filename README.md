How to run the application locally:
- Run npm install
- Create .env file and add the entry API_KEY=YOUR_API_KEY
- Run npm run dev
- For production you must run npm run build --> npm run start

Basic Information about the app:
I used celsius for the temperature
I decided to round the temperature to the nearest degree
The external api call first goes to the server through /api/weather to proxy the request
I decided to start the project using create-jstack-app for a solid template. The main reason I decided to do this was for good typescript integration. I was also planning on using zod to regex the city name to prevent pointless api calls, but decided that it wasn't worth it. Using the template did make it so I could have a decent looking app without doing anything, which is nice since the focus was supposed to be on functionality.
I also ended up using tanstack/react-query, but I don't have a solid reasoning for that besides that it was part of the template.

DISCLAIMER:
I have never used React before today and therefore have not used Next.js. I am entirely uncertain about what the best practices are and what level of comments are normally used. I tried to keep comments minimal in the html-like side of things because I normally would not comment on html code unless I was doing something strange.
I found Next to be pretty cool and quite similar to Nuxt.
Unfortunately I had a hard time coming up with reasons why I used tanstack/react-query and that is mostly because I don't know what the standard is. Perhaps I should have just used the default Next template, but I had to atleast attempt to get bonus points.