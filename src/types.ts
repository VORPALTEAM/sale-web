declare global {
    interface Window {
      ethereum: any
    }
  }

export type iconProps = {
    width: number,
    height: number
}

export type btnProps = {
    text: string,
    onClick: any
}

export type stringAction = {
    type: string,
    payload: string
}

export type numberAction = {
    type: string,
    payload: number
}

export type boolAction = {
    type: string,
    payload: boolean
}


