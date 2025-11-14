# agenciAI_testTask

## Reasoning behind the approach

**Tech stack:** Next.js — easier (literally three clicks) deploy, easier backend/frontend communication (using API interface of the framework), no CORS-related issues.

At first, I thought about parsing the PDF file and only then sending the request to Gemini — it probably would've cost less (but I'm not sure since I didn't really research it). Then I decided to send the whole file directly, since the model can also analyze structure and get something from it. For example, if there was a picture in the PDF and we extracted only text, we could've missed something important.

Also, at first I required the user to paste their token, to not use mine. Then I thought that it's a bad idea for now, when I want everything to work "out of the box" (aka you just go on the website and can check if it works). So if the token isn't provided (which you still can do), it will fallback to the default one — mine (it gets it securely from an environment variable).

---

## Running locally

1. `npm install`  
2. Paste your environment variable into the `.env` file (you have an example in `.env.example`)  
3. Run:
   - `npm run dev` — for development  
   - `npm run build && npm run start` — to run the production build  

---

## Deployment

Deployed here: [https://agenciai-testtask.onrender.com/](https://agenciai-testtask.onrender.com/)

---

## Project structure

```

app/          - the whole application
  api/        - backend
    summarize/route.ts  - /api/summarize endpoint
page.tsx      - main page
styles.css    - styles for the page

```


---

## How it works

1. **User Action:** The user uploads a PDF via the form.  
2. **Data Submission:** The front-end sends the file to the `/api/summarize` endpoint.  
3. **Validation:** The back-end validates the file type and content.  
4. **AI Request:** The back-end sends the PDF to the Gemini API for summarization.  
5. **Response Handling:** The back-end receives the summary from Gemini.  
6. **Result Delivery:** The summary is returned to the front-end and displayed to the user.  

