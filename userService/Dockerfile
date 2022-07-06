FROM denoland/deno:1.23.3

EXPOSE 80
WORKDIR /app
USER deno

COPY src/ ./
RUN deno cache deps.ts

CMD ["run", "--allow-net", "--allow-env" , "main.ts"]