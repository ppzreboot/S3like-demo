Deno.serve(async req => {
  const url = new URL(req.url)
  switch (url.pathname) {
    case '/':
      return await serve_static()
    case '/api/auth':
      return new Response('hello')
    default:
      return new Response('Not Found', { status: 404 })
  }
})

async function serve_static() {
  const webapp = await Deno.open('./app/client/index.html', {
    read: true,
  })
  return new Response(webapp.readable)
}
