FROM node:16-alpine as builder
COPY . .

RUN npm i
RUN npm run build

FROM nginx:1.21.0-alpine as production
COPY --from=builder /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]