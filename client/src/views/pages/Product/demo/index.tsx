import React from 'react'
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const initState = { count: 2 }
const enum REDUCER_ACTION_TYPE { INCREMENT, DECREMENT }
type ReducerAction = {
  type: REDUCER_ACTION_TYPE
}
const reducer = (state: typeof initState, action: ReducerAction): typeof
  initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 }
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 }
    default:
      throw new Error()
  }
}

const ProductSize = () => {
  const { t } = useTranslation();
  const [state, dispatch] = React.useReducer(reducer, initState);
  const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1>Kết quả: {state.count}</h1>

        <Button variant="outlined" onClick={increment}>
          Tăng
        </Button>
        <Button variant="outlined" color="error" onClick={decrement} style={{ marginLeft: "12px" }}>
          Giảm
        </Button>

        <h2>{t('demo_language')}</h2>
      </div>
      <hr />
    </>
  )
}

export default ProductSize