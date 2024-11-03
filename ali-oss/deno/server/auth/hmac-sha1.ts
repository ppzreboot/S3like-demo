export
async function hmac_sha1(key: string, msg: string) {
  const key_obj = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(key),
    { name: 'HMAC', hash: { name: 'SHA-1' } },
    false,
    ['sign'],
  )

  return await crypto.subtle.sign(
    'HMAC',
    key_obj,
    new TextEncoder().encode(msg),
  )
}
