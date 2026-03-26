import { neon, NeonQueryFunction } from '@neondatabase/serverless'

let _sql: NeonQueryFunction<false, false> | null = null

export const sql: NeonQueryFunction<false, false> = new Proxy(
  function () {} as unknown as NeonQueryFunction<false, false>,
  {
    apply(_target, _thisArg, args) {
      if (!_sql) _sql = neon(process.env.DATABASE_URL!)
      return (_sql as Function)(...args)
    },
    get(_target, prop) {
      if (!_sql) _sql = neon(process.env.DATABASE_URL!)
      return Reflect.get(_sql, prop)
    },
  }
)
