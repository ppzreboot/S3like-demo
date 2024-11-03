import { encodeBase64 } from '@std/encoding'
import { hmac_sha1 } from './hmac-sha1.ts'

interface I_make_auth_opts {
  key_id: string
  key_secret: string

  md5: string // ''
  date: string // new Date().toUTCString()

  resource: {
    bucket: string
    object: string
  }
}

function make_canonicalized(bucket?: string, object?: string) {
  let result = '/'
  if (bucket)
    result += bucket + '/'
  if (object)
    result += object
  return result
}

export
async function make(opts: I_make_auth_opts) {
  return `OSS ${opts.key_id}:${
    encodeBase64(
      await hmac_sha1(
        opts.key_secret,
        `PUT\n${opts.md5}\napplication/octet-stream\n${opts.date}\n${
          make_canonicalized(opts.resource.bucket, opts.resource.object)
        }`
      )
    )
  }`
}
