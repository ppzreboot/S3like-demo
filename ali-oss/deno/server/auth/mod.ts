import { make } from './make.ts'

export
async function make_auth(req: Request) {
  const key_id = Deno.env.get('ali_oss_access_key_id')
  const key_secret = Deno.env.get('ali_oss_access_key_secret')
  const bucket = Deno.env.get('ali_oss_bucket_name')
  if (!key_id || !key_secret || !bucket)
    throw Error('.env is not ready')

  const data = await req.json()
  const suffix = data.suffix // .jpb .png .mp4
  if (typeof(suffix) !== 'string')
    return new Response('invalid file suffix', { status: 400 })
  const md5 = data.md5
  if (typeof(md5) !== 'string')
    return new Response('invalid md5', { status: 400 })

  const now = new Date().toUTCString()
  const signature = await make({
    key_id,
    key_secret,
    md5,
    date: now,
    resource: {
      bucket,
      object: `aaa/bbb/ccc/${crypto.randomUUID()}${suffix}`,
    }
  })

  return respond_json({
    date: now,
    signature,
  })
}

function respond_json(data: unknown) {
  return new Response(
    JSON.stringify(data)
  )
}
