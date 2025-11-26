import { z, ZodType } from 'zod'

export interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | boolean>
}

export async function api<T>(
    url: string,
    schema: ZodType<T>,
    options?: RequestInit
): Promise<T> {

    const res = await fetch(url, options)

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
    }

    const json = await res.json()

    const parsed = schema.safeParse(json)

    if (!parsed.success) {
        console.error('Zod validation failed:', parsed.error)
        throw new Error('Invalid API response shape')
    }

    return parsed.data
}
