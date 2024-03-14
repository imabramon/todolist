import { useEffect, useRef } from 'react'

const useComponentWillUnmount = (cleanupCallback = () => {}) => {
  const callbackRef = useRef(cleanupCallback)
  callbackRef.current = cleanupCallback
  useEffect(() => () => callbackRef.current(), [])
}

/*
    Хук работает так, когда вызывается функция компонента туда передается колбек,
    Юз эффект вызовется только один раз и последним переданным колбеком (который блаодаря use ref содержит самые последний стейт компонента)
*/

export default useComponentWillUnmount
