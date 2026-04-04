import React, { useState, useEffect } from 'react'
import { getMedia } from '@/lib/idb'

export const resolveIdbMedia = async (url: string): Promise<string> => {
  if (!url?.startsWith('idb://')) return url
  const key = url.replace('idb://', '')
  try {
    const data = await getMedia(key)
    if (data instanceof Blob) {
      return URL.createObjectURL(data)
    } else if (typeof data === 'string') {
      return data
    }
  } catch (e) {
    console.error('Failed to resolve IDB media', e)
  }
  return url
}

export function IdbImage({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [resolvedSrc, setResolvedSrc] = useState<string | undefined>(
    src?.startsWith('idb://') ? undefined : src,
  )

  useEffect(() => {
    if (src?.startsWith('idb://')) {
      let objectUrl = ''
      resolveIdbMedia(src).then((res) => {
        objectUrl = res
        setResolvedSrc(res)
      })
      return () => {
        if (objectUrl && objectUrl.startsWith('blob:')) {
          URL.revokeObjectURL(objectUrl)
        }
      }
    } else {
      setResolvedSrc(src)
    }
  }, [src])

  return <img src={resolvedSrc} {...props} />
}

export function IdbAudio({ src, ...props }: React.AudioHTMLAttributes<HTMLAudioElement>) {
  const [resolvedSrc, setResolvedSrc] = useState<string | undefined>(
    src?.startsWith('idb://') ? undefined : src,
  )

  useEffect(() => {
    if (src?.startsWith('idb://')) {
      let objectUrl = ''
      resolveIdbMedia(src).then((res) => {
        objectUrl = res
        setResolvedSrc(res)
      })
      return () => {
        if (objectUrl && objectUrl.startsWith('blob:')) {
          URL.revokeObjectURL(objectUrl)
        }
      }
    } else {
      setResolvedSrc(src)
    }
  }, [src])

  if (!resolvedSrc) return null

  return <audio src={resolvedSrc} {...props} />
}
