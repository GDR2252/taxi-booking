import {ErrorRequestHandler} from 'express'


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // descriptive error code
    let errorCode
  
    if (err.status === 400) errorCode = 'BAD_REQUEST'
    if (err?.code) errorCode = err.code
  
    // log error only if unexpected
    if (!err?.status || `${err.status}`.startsWith('5'))
      console.error(err)
  
    res.status(err.status || 500).json({
      success: false,   
      message: err.message,
      error: err?.error || err?.errors?.[0] || err?.name || null,
      code: errorCode || 'UNIDENTIFIED_ERROR'
      })
  
    next()
  }
  
  export default errorHandler
  