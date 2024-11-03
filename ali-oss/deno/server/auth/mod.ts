import { make } from './make.ts'

export
async function make_auth(req: Request) {
  const key_id = Deno.env.get('ali_oss_access_key_id')
  const key_secret = Deno.env.get('ali_oss_access_key_secret')
  const bucket = Deno.env.get('ali_oss_bucket_name')
  const region = Deno.env.get('ali_oss_region')
  if (!key_id || !key_secret || !bucket || !region)
    throw Error('.env is not ready')

  const data = await req.json()
  const suffix = data.suffix // .jpb .png .mp4
  if (typeof(suffix) !== 'string')
    return new Response('invalid file suffix', { status: 400 })

  const now = new Date().toUTCString()
  const obj_name = `aaa/bbb/ccc/${crypto.randomUUID()}${suffix}`
  const signature = await make({
    key_id,
    key_secret,
    date: now,
    resource: {
      bucket,
      object: obj_name,
    }
  })

  return respond_json({
    date: now,
    signature,
    url: `https://${bucket}.${region}.aliyuncs.com/${obj_name}`,
  })
}

function respond_json(data: unknown) {
  return new Response(
    JSON.stringify(data)
  )
}
