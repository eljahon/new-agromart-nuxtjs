import io from 'socket.io-client'
let STRAPI_ENDPOINT

if (process.env.NODE_ENV !== 'production') {
  STRAPI_ENDPOINT = 'https://socket.agsat.uz'
} else {
  STRAPI_ENDPOINT = 'https://socket.agsat.uz'
}

export const socket = io(STRAPI_ENDPOINT)
