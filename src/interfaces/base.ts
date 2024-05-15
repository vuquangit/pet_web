interface IError {
  code: string | null
  message: string | null
}

export interface IMeta {
  path: string
  perPage: number
  currentPage: number
  lastPage: number
  from: number | null // the page's first record order number
  to: number | null // the page's last record order number
  total: number // total number of records in the database
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IBaseResponse<T = any> {
  status?: number
  success?: boolean
  data?: T
  meta?: IMeta
  error?: IError
}
